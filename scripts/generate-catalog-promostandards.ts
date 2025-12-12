
// ============================================================================
// GENERATE CATALOG VIA PROMOSTANDARDS (Full Index)
// ============================================================================

import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { getProductDateModified, getProduct } from './lib/promostandards-client';
import { Product, ContentBlock } from '../src/types/products';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config();

const OUTPUT_FILE = path.resolve(process.cwd(), 'src/data/products-catalog.json');

// Helper to extract value from XML
function extractValue(xml: string, tag: string): string {
    const regex = new RegExp(`<${tag}>(.*?)</${tag}>`, 'i'); // Simple regex, assumes no nested tags with same name in local scope
    // For proper parsing we should use a namespace aware parser, but for scripts regex is faster/easier dependency-wise
    // For PromoStandards, tags are usually <ns1:element> or <element> depending on response

    // Try with namespace prefix wildcard
    const nsRegex = new RegExp(`<[a-z0-9]+:${tag}>(.*?)</[a-z0-9]+:${tag}>`, 'i');

    let match = xml.match(regex);
    if (!match) match = xml.match(nsRegex);

    return match ? match[1] : '';
}

// Extract description (often in CDATA)
function extractDescription(xml: string): string {
    // Look for description
    // Look for description (handling multi-line with [\s\S]*?)
    const match = xml.match(/<description>([\s\S]*?)<\/description>/i) || xml.match(/:description>([\s\S]*?)<\/[a-z]+:description>/i);
    if (!match) return '';

    let content = match[1];
    // Remove CDATA wrapper if present (using [\s\S] for dotAll)
    content = content.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/, '$1');
    return content.trim();
}

// Helper to infer internal category slug from metadata
function inferCategorySlug(sanmarCategory: string, title: string): string {
    const text = (sanmarCategory + ' ' + title).toLowerCase();

    if (text.includes('polo')) return 'polos';
    if (text.includes('t-shirt') || text.includes('tee ') || text.includes('short sleeve')) return 't-shirts';
    if (text.includes('cap') || text.includes('hat') || text.includes('beanie') || text.includes('visor')) return 'caps';
    if (text.includes('bag') || text.includes('tote') || text.includes('backpack') || text.includes('duffel')) return 'bags';
    if (text.includes('fleece') || text.includes('sweatshirt') || text.includes('hoodie') || text.includes('pullover')) return 'hoodies';
    if (text.includes('jacket') || text.includes('vest') || text.includes('coat') || text.includes('parka')) return 'jackets';
    if (text.includes('pant') || text.includes('short') || text.includes('apron') || text.includes('bib') || text.includes('overall') || text.includes('work')) return 'workwear';

    if (text.includes('promotional') || text.includes('towel') || text.includes('blanket')) return 'promos';
    if (text.includes('sign') || text.includes('banner')) return 'signs-displays';

    // Default fallback based on high-level type
    if (text.includes('knit') || text.includes('woven') || text.includes('dress shirt')) return 'apparel';

    return 'other';
}

function parsePromoProduct(xml: string, id: string): Product | null {
    try {
        const productId = extractValue(xml, 'productId');
        const productName = extractValue(xml, 'productName');

        // If we can't find basic info, skip
        if (!productName) return null;

        // FIX: specific field names based on XML debug
        const brand = extractValue(xml, 'productBrand') || 'SanMar';
        const descriptionText = extractDescription(xml);
        const sanmarCategory = extractValue(xml, 'category') || '';
        const subCategory = extractValue(xml, 'subCategory') || '';

        // Images: Look for primaryImageUrl first
        const primaryImage = extractValue(xml, 'primaryImageUrl');

        // Also scan for any other url-like patterns if needed, but primary is safest
        const imageMatches = [...xml.matchAll(/<url>(.*?)<\/url>/g)];
        const extraImages = imageMatches
            .map(m => m[1])
            .filter(url => url.includes('http') && (url.includes('.jpg') || url.includes('.png')));

        const images = Array.from(new Set(
            [primaryImage, ...extraImages].filter(Boolean)
        ));

        // Infer our internal category
        const categorySlug = inferCategorySlug(sanmarCategory + ' ' + subCategory, productName);

        const features = [
            `Brand: ${brand}`,
            sanmarCategory ? `Category: ${sanmarCategory}` : '',
            subCategory ? `Type: ${subCategory}` : '',
            `Style Code: ${productId}`
        ].filter(Boolean);

        const product: Product = {
            id: `sanmar-${productId.toLowerCase()}`,
            slug: productId.toLowerCase(),
            name: productName,
            shortDescription: `${brand} - ${productName}`,
            description: [{ type: 'text', content: descriptionText }],
            category: {
                id: categorySlug,
                slug: categorySlug,
                name: categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1),
                description: '',
                image: images[0] || '',
                productCount: 0
            },
            tags: [
                'sanmar',
                brand.toLowerCase(),
                categorySlug,
                sanmarCategory.toLowerCase(),
                subCategory.toLowerCase()
            ].filter(t => t && t.length > 2),
            images: images.length > 0 ? images : ['/images/placeholder.jpg'],
            features: features,
            isCustomizable: true,
            technicalSpecifications: [
                { type: 'text', content: `Manufacturer Code: ${productId}` }
            ],
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        return product;
    } catch (e) {
        // console.warn(`Failed to parse ${id}`, e);
        return null;
    }
}

async function main() {
    console.log('🚀 Starting Full Catalog Generation (PromoStandards)...');

    try {
        // 1. Get ALL Product IDs
        console.log('📦 Fetching Product Index...');
        // Using 2010 to presumably get EVERYTHING active
        const productIds = await getProductDateModified('2010-01-01T00:00:00Z');
        console.log(`✅ Found ${productIds.length} total products.`);

        // 2. Fetch Details in Parallel (Batched)
        const BATCH_SIZE = 20;
        const products: Product[] = [];

        for (let i = 0; i < productIds.length; i += BATCH_SIZE) {
            const batchIds = productIds.slice(i, i + BATCH_SIZE);
            const batchPromises = batchIds.map(async (id) => {
                try {
                    const xml = await getProduct(id);
                    return parsePromoProduct(xml, id);
                } catch (e) {
                    console.error(`Error fetching ${id}:`, e);
                    return null;
                }
            });

            const results = await Promise.all(batchPromises);
            const validProducts = results.filter((p): p is Product => p !== null);
            products.push(...validProducts);

            process.stdout.write(`\rProgress: ${products.length}/${productIds.length} | Current: ${batchIds[0]}`);
        }

        console.log('\n✨ Parsing complete. Saving to file...');

        // 3. Save to JSON
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(products, null, 2));
        console.log(`✅ Saved ${products.length} products to ${OUTPUT_FILE}`);

    } catch (error) {
        console.error('❌ Fatal Error:', error);
    }
}

main();
