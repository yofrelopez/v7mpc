
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables immediately
dotenv.config({ path: '.env.local' });
dotenv.config(); // Fallback to .env

// Use the local script client which bypasses server-only
import { fetchSanMarProductByStyle } from './lib/sanmar-client-script';

// ============================================================================
// CONFIGURATION
// ============================================================================
const OUTPUT_FILE = path.join(process.cwd(), 'src', 'data', 'products-catalog.json');
const BATCH_SIZE = 5;
const DELAY_MS = 200;

// ============================================================================
// CANDIDATE GENERATION
// ============================================================================

// Base styles known to exist or be popular
const BASE_STYLES = [
    // T-SHIRTS
    'PC54', 'PC61', 'PC55', 'PC55LS', 'PC450', 'PC455', 'PC380', 'PC147',
    'ST350', 'ST350LS', 'ST351', 'ST360', 'ST370', 'ST340', 'ST450',
    'DT6000', 'DT104', 'DT6001', 'DT6500', 'DT6600',
    'G500', 'G200', 'G800', 'G5000', 'G2000', 'G640',
    '5180', '5250', '5280', '4980', '5170',

    // POLOS
    'K500', 'K500LS', 'K500P', 'K510', 'K540', 'K420', 'K100', 'K110',
    'ST650', 'ST640', 'ST660', 'ST655', 'ST680', 'ST690',
    'KP55', 'PC55P',
    'OG101', 'OG109', 'OG120', 'OG122',

    // FLEECE & OUTERWEAR
    'PC78', 'PC78H', 'PC78ZH', 'PC90', 'PC90H',
    'ST254', 'ST258', 'ST253', 'ST280', 'ST290', 'ST230', 'ST850',
    'G185', 'G186',
    'J317', 'J325', 'J754', 'J328',
    'JST73', 'JST75',

    // CAPS & BAGS
    'C112', 'C112P', 'C815', 'C801', 'NE200', 'NE201', 'NE400',
    'BG85', 'BG86', 'BG99', 'OG410', 'OG411'
];

function expandRange(prefix: string, start: number, end: number, suffix: string = ''): string[] {
    const arr: string[] = [];
    for (let i = start; i <= end; i++) {
        arr.push(`${prefix}${i}${suffix}`);
    }
    return arr;
}

// Generate the massive list
const CANDIDATES = [
    ...BASE_STYLES,
    // Detailed expansions based on SanMar catalog logic
    ...expandRange('PC', 50, 100), // Port & Company Basics
    ...expandRange('K', 400, 600), // Port Authority Polos
    ...expandRange('ST', 200, 400), // Sport-Tek Active
    ...expandRange('DT', 100, 200), // District
    ...expandRange('L', 300, 600), // Ladies variants (very common)
    ...expandRange('Y', 300, 600), // Youth variants
    ...expandRange('J', 700, 800), // Jackets
];

// Deduplicate
const UNIQUE_CANDIDATES = Array.from(new Set(CANDIDATES));

// ============================================================================
// MAIN LOGIC
// ============================================================================

async function main() {
    console.log(`Starting Catalog Generation`);
    console.log(`Candidates: ${UNIQUE_CANDIDATES.length} items`);
    console.log(`Output: ${OUTPUT_FILE}`);

    // Ensure directory exists
    const dir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const validProducts: any[] = [];
    let processed = 0;

    for (let i = 0; i < UNIQUE_CANDIDATES.length; i += BATCH_SIZE) {
        const batch = UNIQUE_CANDIDATES.slice(i, i + BATCH_SIZE);

        // Process batch
        const promises = batch.map(async (style) => {
            try {
                // Fetch using the project's existing fetcher
                const products = await fetchSanMarProductByStyle(style);

                if (products && products.length > 0) {
                    // Flatten: Ensure we get a single clean object per style
                    return products[0];
                }
            } catch (error) {
                // Ignore specific failed items, just log concise error
                // console.error(`Failed ${style}`); 
            }
            return null;
        });

        const results = await Promise.all(promises);

        // Filter valid
        results.forEach(r => {
            if (r) validProducts.push(r);
        });

        processed += batch.length;
        process.stdout.write(`\rProgress: ${processed}/${UNIQUE_CANDIDATES.length} | Found: ${validProducts.length}`);

        // Rate limit delay
        await new Promise(resolve => setTimeout(resolve, DELAY_MS));
    }

    console.log('\n\nGeneration Complete!');
    console.log(`Total Valid Products: ${validProducts.length}`);

    // Save to file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(validProducts, null, 2));
    console.log(`Saved to ${OUTPUT_FILE}`);
}

main().catch(err => {
    console.error('\nFatal Error:', err);
    process.exit(1);
});
