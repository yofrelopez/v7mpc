// ============================================================================
// SANMAR PRODUCT CATALOG - Top Products Selection
// ============================================================================
// Curated list of ~120 best-selling products from SanMar
// Focus: Quality, popularity, and variety across all categories
// Brands: Sport-Tek, Port Authority, OGIO, New Era, Nike, Carhartt, District

export interface SanMarProductConfig {
  style: string;
  brand: string;
  category: string;
  subcategory?: string;
  notes?: string;
}

// ============================================================================
// T-SHIRTS (~25 products)
// ============================================================================

export const TSHIRTS_PRODUCTS: SanMarProductConfig[] = [
  // Sport-Tek T-Shirts (Best sellers)
  { style: 'ST350', brand: 'Sport-Tek', category: 't-shirts', notes: 'PosiCharge Competitor Tee - #1 Best Seller' },
  { style: 'ST360', brand: 'Sport-Tek', category: 't-shirts', notes: 'PosiCharge Competitor Sleeve-Blocked Tee' },
  { style: 'ST370', brand: 'Sport-Tek', category: 't-shirts', notes: 'PosiCharge Competitor Cotton Touch Tee' },
  { style: 'ST450', brand: 'Sport-Tek', category: 't-shirts', notes: 'PosiCharge Competitor Cotton Touch Tee' },
  { style: 'ST340', brand: 'Sport-Tek', category: 't-shirts', notes: 'PosiCharge RacerMesh Tee' },

  // Port & Company T-Shirts (Value line)
  { style: 'PC54', brand: 'Port & Company', category: 't-shirts', notes: 'Core Cotton Tee - Popular basic' },
  { style: 'PC61', brand: 'Port & Company', category: 't-shirts', notes: 'Essential Tee' },
  { style: 'PC099', brand: 'Port & Company', category: 't-shirts', notes: 'Pigment-Dyed Tee' },
  { style: 'PC55', brand: 'Port & Company', category: 't-shirts', notes: 'Core Cotton Long Sleeve' },

  // District T-Shirts (Modern fit)
  { style: 'DT6000', brand: 'District', category: 't-shirts', notes: 'Very Important Tee' },
  { style: 'DT104', brand: 'District', category: 't-shirts', notes: 'Perfect Weight Tee' },
  { style: 'DT6001', brand: 'District', category: 't-shirts', notes: 'Very Important Tee V-Neck' },

  // Gildan T-Shirts
  { style: 'G500', brand: 'Gildan', category: 't-shirts', notes: 'Heavy Cotton Tee' },
  { style: 'G200', brand: 'Gildan', category: 't-shirts', notes: 'Ultra Cotton Tee' },

  // Hanes T-Shirts
  { style: '5250', brand: 'Hanes', category: 't-shirts', notes: 'Authentic Tee' },
  { style: '5280', brand: 'Hanes', category: 't-shirts', notes: 'ComfortSoft Cotton Tee' },

  // Women's T-Shirts
  { style: 'LST350', brand: 'Sport-Tek', category: 't-shirts', subcategory: 'womens', notes: 'Ladies PosiCharge Competitor Tee' },
  { style: 'LPC54', brand: 'Port & Company', category: 't-shirts', subcategory: 'womens', notes: 'Ladies Core Cotton Tee' },
  { style: 'DM130L', brand: 'District', category: 't-shirts', subcategory: 'womens', notes: 'Ladies Perfect Tri Tee' },

  // Youth T-Shirts
  { style: 'YST350', brand: 'Sport-Tek', category: 't-shirts', subcategory: 'youth', notes: 'Youth PosiCharge Competitor Tee' },
  { style: 'YPC54', brand: 'Port & Company', category: 't-shirts', subcategory: 'youth', notes: 'Youth Core Cotton Tee' },

  // Premium/Performance
  { style: 'ST700', brand: 'Sport-Tek', category: 't-shirts', notes: 'Ultimate Performance Crew' },
  { style: 'PC380', brand: 'Port & Company', category: 't-shirts', notes: 'Performance Blend Tee' },
  { style: 'ST690', brand: 'Sport-Tek', category: 't-shirts', notes: 'PosiCharge Active Textured Crew' },
  { style: 'ST680', brand: 'Sport-Tek', category: 't-shirts', notes: 'PosiCharge Micro-Mesh Crew' },
];

// ============================================================================
// POLOS (~20 products)
// ============================================================================

export const POLOS_PRODUCTS: SanMarProductConfig[] = [
  // Port Authority Polos (Most popular)
  { style: 'K500', brand: 'Port Authority', category: 'polos', notes: 'Silk Touch Polo - #1 Polo Seller' },
  { style: 'K540', brand: 'Port Authority', category: 'polos', notes: 'Silk Touch Performance Polo' },
  { style: 'K510', brand: 'Port Authority', category: 'polos', notes: 'Stain-Resistant Polo' },
  { style: 'K420', brand: 'Port Authority', category: 'polos', notes: 'Pique Knit Polo' },
  { style: 'K8000', brand: 'Port Authority', category: 'polos', notes: 'EZCotton Polo' },

  // Sport-Tek Polos (Performance)
  { style: 'ST650', brand: 'Sport-Tek', category: 'polos', notes: 'Micropique Sport-Wick Polo' },
  { style: 'ST640', brand: 'Sport-Tek', category: 'polos', notes: 'PosiCharge RacerMesh Polo' },
  { style: 'ST659', brand: 'Sport-Tek', category: 'polos', notes: 'Sport-Wick Fleece Polo' },
  { style: 'ST660', brand: 'Sport-Tek', category: 'polos', notes: 'Heather Contender Polo' },

  // Nike Polos (Premium)
  { style: 'NKBV6042', brand: 'Nike', category: 'polos', notes: 'Nike Dri-FIT Micro Pique Polo' },
  { style: 'NKAA1848', brand: 'Nike', category: 'polos', notes: 'Nike Dri-FIT Players Modern Fit Polo' },

  // Women's Polos
  { style: 'L500', brand: 'Port Authority', category: 'polos', subcategory: 'womens', notes: 'Ladies Silk Touch Polo' },
  { style: 'L540', brand: 'Port Authority', category: 'polos', subcategory: 'womens', notes: 'Ladies Silk Touch Performance Polo' },
  { style: 'LST650', brand: 'Sport-Tek', category: 'polos', subcategory: 'womens', notes: 'Ladies Micropique Sport-Wick Polo' },

  // Long Sleeve Polos
  { style: 'K500LS', brand: 'Port Authority', category: 'polos', subcategory: 'long-sleeve', notes: 'Silk Touch Long Sleeve Polo' },
  { style: 'K8000LS', brand: 'Port Authority', category: 'polos', subcategory: 'long-sleeve', notes: 'EZCotton Long Sleeve Polo' },

  // Value Polos
  { style: 'KP55', brand: 'Port & Company', category: 'polos', notes: 'Core Blend Pique Polo' },
  { style: 'PC55P', brand: 'Port & Company', category: 'polos', notes: 'Core Blend Jersey Knit Polo' },

  // Youth Polos
  { style: 'Y500', brand: 'Port Authority', category: 'polos', subcategory: 'youth', notes: 'Youth Silk Touch Polo' },
  { style: 'YST650', brand: 'Sport-Tek', category: 'polos', subcategory: 'youth', notes: 'Youth Micropique Sport-Wick Polo' },
];

// ============================================================================
// HOODIES & SWEATSHIRTS (~18 products)
// ============================================================================

export const HOODIES_PRODUCTS: SanMarProductConfig[] = [
  // Sport-Tek Hoodies
  { style: 'ST254', brand: 'Sport-Tek', category: 'hoodies', notes: 'Pullover Hooded Sweatshirt' },
  { style: 'ST258', brand: 'Sport-Tek', category: 'hoodies', notes: 'Full-Zip Hooded Sweatshirt' },
  { style: 'ST850', brand: 'Sport-Tek', category: 'hoodies', notes: 'Sport-Wick Fleece Full-Zip Hooded Jacket' },
  { style: 'ST290', brand: 'Sport-Tek', category: 'hoodies', notes: 'Repel Hoodie' },
  { style: 'F281', brand: 'Sport-Tek', category: 'hoodies', notes: 'Super Heavyweight Pullover Hooded Sweatshirt' },

  // Port & Company Hoodies
  { style: 'PC78H', brand: 'Port & Company', category: 'hoodies', notes: 'Core Fleece Pullover Hooded Sweatshirt' },
  { style: 'PC78ZH', brand: 'Port & Company', category: 'hoodies', notes: 'Core Fleece Full-Zip Hooded Sweatshirt' },
  { style: 'PC90H', brand: 'Port & Company', category: 'hoodies', notes: 'Essential Fleece Pullover Hooded Sweatshirt' },

  // Gildan Hoodies
  { style: 'G185', brand: 'Gildan', category: 'hoodies', notes: 'Heavy Blend Hooded Sweatshirt' },
  { style: 'G186', brand: 'Gildan', category: 'hoodies', notes: 'Heavy Blend Full-Zip Hooded Sweatshirt' },

  // Women's Hoodies
  { style: 'LST254', brand: 'Sport-Tek', category: 'hoodies', subcategory: 'womens', notes: 'Ladies Pullover Hooded Sweatshirt' },
  { style: 'LST258', brand: 'Sport-Tek', category: 'hoodies', subcategory: 'womens', notes: 'Ladies Full-Zip Hooded Sweatshirt' },
  { style: 'LPC78H', brand: 'Port & Company', category: 'hoodies', subcategory: 'womens', notes: 'Ladies Core Fleece Pullover Hooded Sweatshirt' },

  // Youth Hoodies
  { style: 'YST254', brand: 'Sport-Tek', category: 'hoodies', subcategory: 'youth', notes: 'Youth Pullover Hooded Sweatshirt' },
  { style: 'YPC78', brand: 'Port & Company', category: 'hoodies', subcategory: 'youth', notes: 'Youth Core Fleece Pullover Hooded Sweatshirt' },

  // Premium/Tech Hoodies
  { style: 'ST263', brand: 'Sport-Tek', category: 'hoodies', notes: 'Heather Colorblock Raglan Hooded Wind Shirt' },
  { style: 'JST73', brand: 'Sport-Tek', category: 'hoodies', notes: 'Wind & Water Resistant Pullover' },
  { style: 'ST238', brand: 'Sport-Tek', category: 'hoodies', notes: 'Sport-Wick Fleece Hooded Pullover' },
];

// ============================================================================
// JACKETS & OUTERWEAR (~15 products)
// ============================================================================

export const JACKETS_PRODUCTS: SanMarProductConfig[] = [
  // Sport-Tek Jackets
  { style: 'JST73', brand: 'Sport-Tek', category: 'jackets', notes: 'Wind & Water Resistant 1/2-Zip Pullover' },
  { style: 'JST75', brand: 'Sport-Tek', category: 'jackets', notes: 'Rival Tech Fleece Full-Zip Hooded Jacket' },
  { style: 'J706', brand: 'Sport-Tek', category: 'jackets', notes: 'Insulated Vest' },

  // Port Authority Jackets
  { style: 'J317', brand: 'Port Authority', category: 'jackets', notes: 'Core Soft Shell Jacket' },
  { style: 'J754', brand: 'Port Authority', category: 'jackets', notes: 'Challenger Jacket' },
  { style: 'J328', brand: 'Port Authority', category: 'jackets', notes: 'Charger Jacket' },

  // Eddie Bauer Jackets (Premium)
  { style: 'EB520', brand: 'Eddie Bauer', category: 'jackets', notes: 'Fleece Vest' },
  { style: 'EB530', brand: 'Eddie Bauer', category: 'jackets', notes: 'Fleece Jacket' },

  // Carhartt Jackets (Workwear)
  { style: 'CTJ131', brand: 'Carhartt', category: 'jackets', notes: 'Washed Duck Active Jacket' },
  { style: 'CT105933', brand: 'Carhartt', category: 'jackets', notes: 'Rain Defender Hooded Jacket' },

  // Women's Jackets
  { style: 'L317', brand: 'Port Authority', category: 'jackets', subcategory: 'womens', notes: 'Ladies Core Soft Shell Jacket' },
  { style: 'LST850', brand: 'Sport-Tek', category: 'jackets', subcategory: 'womens', notes: 'Ladies Sport-Wick Fleece Full-Zip Hooded Jacket' },

  // Vests
  { style: 'J325', brand: 'Port Authority', category: 'jackets', subcategory: 'vests', notes: 'Core Soft Shell Vest' },
  { style: 'F219', brand: 'Port Authority', category: 'jackets', subcategory: 'vests', notes: 'Value Fleece Vest' },
  { style: 'J709', brand: 'Sport-Tek', category: 'jackets', subcategory: 'vests', notes: 'Pocketless Wind & Water Resistant Vest' },
];

// ============================================================================
// CAPS & HEADWEAR (~15 products)
// ============================================================================

export const CAPS_PRODUCTS: SanMarProductConfig[] = [
  // New Era Caps (Premium)
  { style: 'NE200', brand: 'New Era', category: 'caps', notes: 'Snapback Trucker Cap' },
  { style: 'NE205', brand: 'New Era', category: 'caps', notes: 'Snapback Flat Bill Cap' },
  { style: 'NE1000', brand: 'New Era', category: 'caps', notes: '39THIRTY Stretch Cotton Cap' },
  { style: 'NE201', brand: 'New Era', category: 'caps', notes: 'Snapback Contrast Front Cap' },

  // Port Authority Caps
  { style: 'C112', brand: 'Port Authority', category: 'caps', notes: 'Snapback Trucker Cap' },
  { style: 'C815', brand: 'Port Authority', category: 'caps', notes: 'Mesh Back Cap' },
  { style: 'C801', brand: 'Port Authority', category: 'caps', notes: 'Solid Enhanced Visibility Cap' },
  { style: 'CP80', brand: 'Port Authority', category: 'caps', notes: 'Sandwich Bill Cap' },

  // Sport-Tek Caps
  { style: 'STC17', brand: 'Sport-Tek', category: 'caps', notes: 'Pom Pom Team Beanie' },
  { style: 'STC12', brand: 'Sport-Tek', category: 'caps', notes: 'Beanie Cap' },

  // Value Caps
  { style: 'CP45', brand: 'Port & Company', category: 'caps', notes: 'Five-Panel Mesh Back Cap' },
  { style: 'CP77', brand: 'Port & Company', category: 'caps', notes: 'Snapback Trucker Cap' },

  // Beanies
  { style: 'CP90', brand: 'Port & Company', category: 'caps', subcategory: 'beanies', notes: 'Fleece-Lined Beanie Cap' },
  { style: 'CP91', brand: 'Port & Company', category: 'caps', subcategory: 'beanies', notes: 'Beanie Cap' },
  { style: 'STC21', brand: 'Sport-Tek', category: 'caps', subcategory: 'beanies', notes: 'Spectator Beanie' },
];

// ============================================================================
// BAGS (~12 products)
// ============================================================================

export const BAGS_PRODUCTS: SanMarProductConfig[] = [
  // OGIO Bags (Premium)
  { style: 'OG701', brand: 'OGIO', category: 'bags', notes: 'Pulse Cinch Pack' },
  { style: 'OG410', brand: 'OGIO', category: 'bags', notes: 'Endurance Duffel' },
  { style: 'OG5000', brand: 'OGIO', category: 'bags', notes: 'Surge RSS Pack' },
  { style: 'OG500', brand: 'OGIO', category: 'bags', notes: 'Caliber Polo' },

  // Port Authority Bags
  { style: 'BG86', brand: 'Port Authority', category: 'bags', notes: 'Gym Bag' },
  { style: 'BG260', brand: 'Port Authority', category: 'bags', notes: 'Lunch Cooler Messenger' },
  { style: 'BG211', brand: 'Port Authority', category: 'bags', notes: 'Laptop Computer Backpack' },

  // Port & Company Bags (Value)
  { style: 'BG85', brand: 'Port & Company', category: 'bags', notes: 'Colorblock Sport Duffel' },
  { style: 'BG407', brand: 'Port & Company', category: 'bags', notes: 'Gym Bag' },

  // Specialty Bags
  { style: 'BG970', brand: 'Port Authority', category: 'bags', subcategory: 'coolers', notes: '12-Pack Cooler' },
  { style: 'BG500', brand: 'Port Authority', category: 'bags', subcategory: 'backpacks', notes: 'Backpack' },
];

// ============================================================================
// WORKWEAR (~10 products)
// ============================================================================

export const WORKWEAR_PRODUCTS: SanMarProductConfig[] = [
  // Red Kap Workwear
  { style: 'SP14', brand: 'Red Kap', category: 'workwear', notes: 'Short Sleeve Industrial Work Shirt' },
  { style: 'SP24', brand: 'Red Kap', category: 'workwear', notes: 'Long Sleeve Industrial Work Shirt' },
  { style: 'PT20', brand: 'Red Kap', category: 'workwear', notes: 'Industrial Cargo Pant' },

  // CornerStone Workwear
  { style: 'CS501', brand: 'CornerStone', category: 'workwear', notes: 'Micropique Polo' },
  { style: 'CS430', brand: 'CornerStone', category: 'workwear', notes: 'WorkPant' },
  { style: 'CS10', brand: 'CornerStone', category: 'workwear', notes: 'Duck Cloth Work Jacket' },
  { style: 'CS400', brand: 'CornerStone', category: 'workwear', notes: 'Industrial Pocketless Pique Polo' },

  // Carhartt Workwear
  { style: 'CTTK087', brand: 'Carhartt', category: 'workwear', notes: 'Force Cotton Delmont Short Sleeve T-Shirt' },
  { style: 'CTK87', brand: 'Carhartt', category: 'workwear', notes: 'Workwear Pocket T-Shirt' },
  { style: 'CTB290', brand: 'Carhartt', category: 'workwear', notes: 'Fleece Crewneck Sweatshirt' },
];

// ============================================================================
// MASTER PRODUCT LIST (~125 products)
// ============================================================================

export const ALL_SANMAR_PRODUCTS: SanMarProductConfig[] = [
  ...TSHIRTS_PRODUCTS,        // ~25
  ...POLOS_PRODUCTS,          // ~20
  ...HOODIES_PRODUCTS,        // ~18
  ...JACKETS_PRODUCTS,        // ~15
  ...CAPS_PRODUCTS,           // ~15
  ...BAGS_PRODUCTS,           // ~12
  ...WORKWEAR_PRODUCTS,       // ~10
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get all style codes (for batch API calls)
 */
export function getAllStyleCodes(): string[] {
  return ALL_SANMAR_PRODUCTS.map(p => p.style);
}

/**
 * Get style codes by category
 */
export function getStyleCodesByCategory(category: string): string[] {
  return ALL_SANMAR_PRODUCTS
    .filter(p => p.category === category)
    .map(p => p.style);
}

/**
 * Get style codes by brand
 */
export function getStyleCodesByBrand(brand: string): string[] {
  return ALL_SANMAR_PRODUCTS
    .filter(p => p.brand.toLowerCase() === brand.toLowerCase())
    .map(p => p.style);
}

/**
 * Get product config by style code
 */
export function getProductConfigByStyle(style: string): SanMarProductConfig | undefined {
  return ALL_SANMAR_PRODUCTS.find(p => p.style === style);
}

/**
 * Get all brands
 */
export function getAllBrands(): string[] {
  const brands = new Set(ALL_SANMAR_PRODUCTS.map(p => p.brand));
  return Array.from(brands).sort();
}

/**
 * Get all categories
 */
export function getAllCategories(): string[] {
  const categories = new Set(ALL_SANMAR_PRODUCTS.map(p => p.category));
  return Array.from(categories).sort();
}

/**
 * Get product count by category
 */
export function getProductCountByCategory(): Record<string, number> {
  const counts: Record<string, number> = {};

  ALL_SANMAR_PRODUCTS.forEach(p => {
    counts[p.category] = (counts[p.category] || 0) + 1;
  });

  return counts;
}

/**
 * Get product count by brand
 */
export function getProductCountByBrand(): Record<string, number> {
  const counts: Record<string, number> = {};

  ALL_SANMAR_PRODUCTS.forEach(p => {
    counts[p.brand] = (counts[p.brand] || 0) + 1;
  });

  return counts;
}

// ============================================================================
// STATS
// ============================================================================

console.log('SanMar Product Catalog Loaded:');
console.log(`  Total Products: ${ALL_SANMAR_PRODUCTS.length}`);
console.log(`  Categories: ${getAllCategories().join(', ')}`);
console.log(`  Brands: ${getAllBrands().join(', ')}`);
