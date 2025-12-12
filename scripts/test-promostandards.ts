
import { getProductDateModified, getProduct } from './lib/promostandards-client';

async function main() {
    console.log('🧪 Testing PromoStandards Discovery...');

    try {
        // 1. Try to get ALL products by using an old date
        console.log('📡 Fetching Master Index (Changes since 2024-01-01)...');
        const productIds = await getProductDateModified('2024-01-01T00:00:00Z');

        console.log(`✅ Success! Found ${productIds.length} changed products.`);
        if (productIds.length > 0) {
            console.log('Sample IDs:', productIds.slice(0, 10).join(', '));

            // 2. Fetch details for the first one
            const sampleId = productIds[0];
            console.log(`\n📡 Fetching details for ${sampleId}...`);
            const details = await getProduct(sampleId);

            console.log('✅ Details fetched (XML length):', details.length);

            // Write raw XML to file for analysis (avoiding console/shell encoding issues)
            const fs = require('fs');
            fs.writeFileSync('scripts/debug_xml.xml', details);
            console.log('💾 Saved full XML to scripts/debug_xml.xml');

            // Log first part for quick check
            console.log('--- XML START ---');
            console.log(details.slice(0, 1000));
            console.log('--- XML END ---');
        } else {
            console.warn('⚠️ No products found. Credentials might be wrong or date too recent.');
        }

    } catch (error: any) {
        console.error('❌ Error:', error.message);
        if (error.message.includes('Authentication failed')) {
            console.error('💡 Check PROMOSTD_USERNAME/PASSWORD in .env.local');
        }
    }
}

main();
