
// ============================================================================
// SANMAR CLIENT FOR SCRIPTS (No server-only, No strict config check)
// ============================================================================

import dotenv from 'dotenv';
import path from 'path';

// Load env vars if not loaded
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config();

import { getStandardEndpoint, validateEnvironment } from '../../src/lib/api/sanmar.endpoints';
import { parseSanMarXmlResponse, ParsedSanMarProduct } from '../../src/lib/api/sanmar-parser';
// We do NOT import sanMarProductToProduct from parser because we overdrive it
import { Product, ContentBlock } from '../../src/types/products';
import { getProductConfigByStyle } from '../../src/lib/api/sanmar-products';
import { getCategoryBySlug } from '../../src/lib/data/categories';

// ============================================================================
// REPLICATED FROM sanmar.ts
// ============================================================================

const ENV = validateEnvironment(process.env.SANMAR_ENV);
const SANMAR_CUSTOMER_NUMBER = process.env.SANMAR_CUSTOMER_NUMBER!;
const SANMAR_USERNAME = process.env.SANMAR_USERNAME!;
const SANMAR_PASSWORD = process.env.SANMAR_PASSWORD!;

if (!SANMAR_CUSTOMER_NUMBER || !SANMAR_USERNAME || !SANMAR_PASSWORD) {
    // console.warn('Missing required SanMar Standard credentials');
}

function toXml(headers: Record<string, string>, body: string): string {
    const headerString = Object.entries(headers)
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ');

    return `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ${headerString}>
  <soapenv:Header/>
  <soapenv:Body>
    ${body}
  </soapenv:Body>
</soapenv:Envelope>`;
}

async function postSoap(url: string, xml: string): Promise<string> {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/xml; charset=utf-8',
                'SOAPAction': '""',
            },
            body: xml,
        });
        const responseText = await response.text();
        if (!response.ok) {
            throw new Error(`SOAP HTTP ${response.status}: ${responseText.slice(0, 500)}`);
        }
        return responseText;
    } catch (error: any) {
        throw new Error(`SOAP Request Failed: ${error.message}`);
    }
}

export async function std_getProductInfoByStyleColorSize(params: {
    style: string;
    color?: string;
    size?: string;
}): Promise<string> {
    const url = getStandardEndpoint('productInfo', ENV);
    const headers = { 'xmlns:impl': 'http://impl.webservice.integration.sanmar.com/' };

    const arg0 = `
    <arg0>
      <style>${params.style}</style>
      ${params.size ? `<size>${params.size}</size>` : ''}
      ${params.color ? `<color>${params.color}</color>` : ''}
    </arg0>
  `;

    const arg1 = `
    <arg1>
      <sanMarCustomerNumber>${SANMAR_CUSTOMER_NUMBER}</sanMarCustomerNumber>
      <sanMarUserName>${SANMAR_USERNAME}</sanMarUserName>
      <sanMarUserPassword>${SANMAR_PASSWORD}</sanMarUserPassword>
      <senderId></senderId>
      <senderPassword></senderPassword>
    </arg1>
  `;

    const body = `<impl:getProductInfoByStyleColorSize>${arg0}${arg1}</impl:getProductInfoByStyleColorSize>`;
    return postSoap(url, toXml(headers, body));
}

// ============================================================================
// CUSTOM PARSER FOR DISCOVERY (Bypasses strict config)
// ============================================================================

function scriptSanMarProductToProduct(sanmarProducts: ParsedSanMarProduct[]): Product[] {
    // Group by style
    const groupedByStyle = new Map<string, ParsedSanMarProduct[]>();

    for (const product of sanmarProducts) {
        const existing = groupedByStyle.get(product.style) || [];
        existing.push(product);
        groupedByStyle.set(product.style, existing);
    }

    const products: Product[] = [];

    for (const [style, variants] of groupedByStyle) {
        const primary = variants[0];

        // TRY to get config, but fallback to auto-discovery
        let config = getProductConfigByStyle(style);

        if (!config) {
            // AUTO-DISCOVERY MODE
            config = {
                style: style,
                brand: primary.brandName,
                category: inferCategory(primary.category, primary.productTitle),
                notes: 'Auto-discovered'
            };
        }

        const category = getCategoryBySlug('apparel') || { id: 'apparel', slug: 'apparel', name: 'Apparel', productCount: 0, image: '', description: '' };

        // Images
        const images = Array.from(new Set([
            primary.colorProductImage,
            primary.frontModel,
            primary.backModel,
            primary.sideModel,
            primary.frontFlat,
            primary.backFlat,
            primary.productImage,
        ].filter(Boolean)));

        const description: ContentBlock[] = [
            { type: 'text', content: primary.productDescription }
        ];

        if (primary.frontModel) {
            description.push({
                type: 'image',
                src: primary.frontModel,
                alt: `${primary.productTitle} - Front view`,
                caption: `${primary.brandName} - ${primary.productTitle}`
            });
        }

        const sizes = Array.from(new Set(variants.map(v => v.size).filter(Boolean)));
        const colors = Array.from(new Set(variants.map(v => v.color).filter(Boolean)));

        const features: string[] = [
            `Brand: ${primary.brandName}`,
            `Available Sizes: ${primary.availableSizes || sizes.join(', ')}`,
            `Available Colors: ${colors.length} color${colors.length !== 1 ? 's' : ''}`,
            `Weight: ${primary.pieceWeight} lbs`,
        ];

        if (primary.pieceSalePrice) {
            features.push(`On Sale: $${primary.pieceSalePrice} (Regular $${primary.piecePrice})`);
        } else {
            features.push(`Price: Starting at $${primary.piecePrice}`);
        }

        const technicalSpecifications: ContentBlock[] = [
            {
                type: 'text',
                content: `
          <h3>Product Specifications</h3>
          <ul>
            <li><strong>Style Code:</strong> ${style}</li>
            <li><strong>Brand:</strong> ${primary.brandName}</li>
            <li><strong>Category:</strong> ${config.category}</li>
            <li><strong>Weight:</strong> ${primary.pieceWeight} lbs per piece</li>
          </ul>
        `
            }
        ];

        // Inject discovered category into tags/features
        const finalCategoryStr = config.category || primary.category || 'Uncategorized';

        const product: Product = {
            id: `sanmar-${style.toLowerCase()}`,
            slug: style.toLowerCase(),
            name: primary.productTitle,
            shortDescription: `${primary.brandName} ${style} - ${finalCategoryStr} - Available in ${colors.length} colors`,
            description,
            category, // We map everything to 'Apparel' top level, but use tags for filtering
            tags: [
                'sanmar',
                primary.brandName.toLowerCase(),
                finalCategoryStr.toLowerCase(),
                ...(primary.keywords ? primary.keywords.slice(0, 5) : [])
            ].filter(Boolean),
            images,
            features,
            isCustomizable: true,
            technicalSpecifications,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        // HACK: Store the inferred category inside the product object property for filtering later?
        // The Product type might not have a field for "sub-type".
        // We put it in Metadata/Tags.

        products.push(product);
    }

    return products;
}

function inferCategory(sanmarCategory: string, title: string): string {
    const text = (sanmarCategory + ' ' + title).toLowerCase();
    if (text.includes('polo')) return 'polos';
    if (text.includes('t-shirt') || text.includes('tee')) return 't-shirts';
    if (text.includes('cap') || text.includes('hat') || text.includes('beanie')) return 'caps';
    if (text.includes('bag') || text.includes('pack') || text.includes('duffel')) return 'bags';
    if (text.includes('fleece') || text.includes('sweatshirt') || text.includes('hoodie')) return 'hoodies';
    if (text.includes('jacket') || text.includes('vest') || text.includes('coat')) return 'jackets';
    if (text.includes('pant') || text.includes('short') || text.includes('work')) return 'workwear';
    return 'other';
}

// ============================================================================
// FETCHER
// ============================================================================

export async function fetchSanMarProductByStyle(style: string) {
    try {
        const xmlResponse = await std_getProductInfoByStyleColorSize({
            style: style.trim(),
        });

        const parsedProducts = parseSanMarXmlResponse(xmlResponse);
        // USE CUSTOM PARSER
        const products = scriptSanMarProductToProduct(parsedProducts);

        return products;
    } catch (error: any) {
        // console.warn(`SKIP ${style}: ${error.message}`);
        return [];
    }
}
