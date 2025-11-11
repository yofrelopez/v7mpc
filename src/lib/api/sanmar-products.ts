// ============================================================================
// SANMAR PRODUCT CATALOG - Style Codes Configuration
// ============================================================================
// This file defines which SanMar products to display in each category
// Total: 36 products (9 per category)

export interface SanMarProductConfig {
  style: string;
  categorySlug: 'workwear' | 'activewear' | 'woven-shirts' | 'personal-protection';
  subcategory?: string;
  notes?: string;
}

// ============================================================================
// WORKWEAR CATEGORY (9 products)
// ============================================================================

export const WORKWEAR_PRODUCTS: SanMarProductConfig[] = [
  {
    style: 'CS501',
    categorySlug: 'workwear',
    subcategory: 'Industrial Shirts',
    notes: 'CornerStone Industrial Work Shirt'
  },
  {
    style: 'SP14',
    categorySlug: 'workwear',
    subcategory: 'Industrial Shirts',
    notes: 'Red Kap Short Sleeve Work Shirt'
  },
  {
    style: 'SP24',
    categorySlug: 'workwear',
    subcategory: 'Industrial Shirts',
    notes: 'Red Kap Long Sleeve Industrial Work Shirt'
  },
  {
    style: 'TLJ754',
    categorySlug: 'workwear',
    subcategory: 'Work Jackets',
    notes: 'CornerStone Duck Cloth Work Jacket'
  },
  {
    style: 'CSJ40',
    categorySlug: 'workwear',
    subcategory: 'Work Jackets',
    notes: 'CornerStone Washed Duck Cloth Flannel-Lined Work Jacket'
  },
  {
    style: 'CT102',
    categorySlug: 'workwear',
    subcategory: 'Work Tees',
    notes: 'CornerStone Pocket Tee'
  },
  {
    style: 'CS430',
    categorySlug: 'workwear',
    subcategory: 'Work Pants',
    notes: 'CornerStone WorkPant'
  },
  {
    style: 'TLCS410',
    categorySlug: 'workwear',
    subcategory: 'Overalls',
    notes: 'CornerStone Duckcloth Bib Overall'
  },
  {
    style: 'J763H',
    categorySlug: 'workwear',
    subcategory: 'Work Jackets',
    notes: 'Red Kap Slash Pocket Jacket'
  },
];

// ============================================================================
// ACTIVEWEAR CATEGORY (9 products)
// ============================================================================

export const ACTIVEWEAR_PRODUCTS: SanMarProductConfig[] = [
  {
    style: 'ST350',
    categorySlug: 'activewear',
    subcategory: 'Performance Tees',
    notes: 'Sport-Tek PosiCharge Competitor Tee - Best seller'
  },
  {
    style: 'ST400',
    categorySlug: 'activewear',
    subcategory: 'Hoodies',
    notes: 'Sport-Tek PosiCharge Tech Fleece Hooded Sweatshirt'
  },
  {
    style: 'ST241',
    categorySlug: 'activewear',
    subcategory: 'Jackets',
    notes: 'Sport-Tek Sport-Wick Fleece Full-Zip Hooded Jacket'
  },
  {
    style: 'YST350',
    categorySlug: 'activewear',
    subcategory: 'Youth',
    notes: 'Sport-Tek Youth PosiCharge Competitor Tee'
  },
  {
    style: 'LPST560',
    categorySlug: 'activewear',
    subcategory: 'Women\'s Performance',
    notes: 'Sport-Tek Ladies PosiCharge Tri-Blend Wicking Raglan Tee'
  },
  {
    style: 'ST850',
    categorySlug: 'activewear',
    subcategory: 'Pants & Shorts',
    notes: 'Sport-Tek Sport-Wick Fleece Pant'
  },
  {
    style: 'PST74',
    categorySlug: 'activewear',
    subcategory: 'Performance Tops',
    notes: 'Sport-Tek PosiCharge Tri-Blend Wicking 1/4-Zip Pullover'
  },
  {
    style: 'JST75',
    categorySlug: 'activewear',
    subcategory: 'Jackets',
    notes: 'Sport-Tek Rival Tech Fleece Full-Zip Hooded Jacket'
  },
  {
    style: 'ST340',
    categorySlug: 'activewear',
    subcategory: 'Polos',
    notes: 'Sport-Tek PosiCharge RacerMesh Polo'
  },
];

// ============================================================================
// WOVEN SHIRTS CATEGORY (9 products)
// ============================================================================

export const WOVEN_SHIRTS_PRODUCTS: SanMarProductConfig[] = [
  {
    style: 'W100',
    categorySlug: 'woven-shirts',
    subcategory: 'Women\'s Long Sleeve',
    notes: 'Port Authority Ladies Long Sleeve Carefree Poplin Shirt'
  },
  {
    style: 'LW100',
    categorySlug: 'woven-shirts',
    subcategory: 'Women\'s Short Sleeve',
    notes: 'Port Authority Ladies Short Sleeve Carefree Poplin Shirt'
  },
  {
    style: 'LW700',
    categorySlug: 'woven-shirts',
    subcategory: 'Women\'s Long Sleeve',
    notes: 'Port Authority Ladies Long Sleeve SuperPro Oxford Shirt'
  },
  {
    style: 'S608',
    categorySlug: 'woven-shirts',
    subcategory: 'Men\'s Long Sleeve',
    notes: 'Port Authority Men\'s Long Sleeve Easy Care Shirt - Popular'
  },
  {
    style: 'S500',
    categorySlug: 'woven-shirts',
    subcategory: 'Men\'s Polos',
    notes: 'Port Authority Men\'s Short Sleeve Silk Touch Polo'
  },
  {
    style: 'W640',
    categorySlug: 'woven-shirts',
    subcategory: 'Women\'s Long Sleeve',
    notes: 'Port Authority Ladies Crosshatch Easy Care Shirt'
  },
  {
    style: 'S100',
    categorySlug: 'woven-shirts',
    subcategory: 'Men\'s Long Sleeve',
    notes: 'Port Authority Men\'s Long Sleeve Value Poplin Shirt'
  },
  {
    style: 'TLS608',
    categorySlug: 'woven-shirts',
    subcategory: 'Men\'s Tall',
    notes: 'Port Authority Tall Long Sleeve Easy Care Shirt'
  },
  {
    style: 'S663',
    categorySlug: 'woven-shirts',
    subcategory: 'Men\'s Long Sleeve',
    notes: 'Port Authority SuperPro Twill Shirt'
  },
];

// ============================================================================
// PERSONAL PROTECTION CATEGORY (9 products)
// ============================================================================

export const PERSONAL_PROTECTION_PRODUCTS: SanMarProductConfig[] = [
  {
    style: 'CS401',
    categorySlug: 'personal-protection',
    subcategory: 'Safety Vests',
    notes: 'CornerStone ANSI Class 2 Safety Vest'
  },
  {
    style: 'CSV405',
    categorySlug: 'personal-protection',
    subcategory: 'Safety Vests',
    notes: 'CornerStone ANSI Class 3 Mesh Back Safety Vest'
  },
  {
    style: 'SV02',
    categorySlug: 'personal-protection',
    subcategory: 'Safety Vests',
    notes: 'CornerStone ANSI Compliant Safety Vest'
  },
  {
    style: 'CS802',
    categorySlug: 'personal-protection',
    subcategory: 'Safety Vests',
    notes: 'CornerStone ANSI Mesh Back Safety Vest with Reflective Trim'
  },
  {
    style: 'ANSI107CSW100',
    categorySlug: 'personal-protection',
    subcategory: 'Safety Shirts',
    notes: 'CornerStone ANSI Class 2 Long Sleeve Safety T-Shirt'
  },
  {
    style: 'CSV407',
    categorySlug: 'personal-protection',
    subcategory: 'Safety Vests',
    notes: 'CornerStone ANSI Class 3 Mesh Back Breakaway Vest'
  },
  {
    style: 'CSV400',
    categorySlug: 'personal-protection',
    subcategory: 'Safety Vests',
    notes: 'CornerStone ANSI Class 2 Mesh Back Safety Vest'
  },
  {
    style: 'SV05',
    categorySlug: 'personal-protection',
    subcategory: 'Safety Vests',
    notes: 'CornerStone ANSI Zippered Mesh Vest'
  },
  {
    style: 'CS403',
    categorySlug: 'personal-protection',
    subcategory: 'Safety Vests',
    notes: 'CornerStone ANSI Class 3 Lightweight Snag-Resistant Reflective Vest'
  },
];

// ============================================================================
// MASTER PRODUCT LIST (All 36 products)
// ============================================================================

export const ALL_SANMAR_PRODUCTS: SanMarProductConfig[] = [
  ...WORKWEAR_PRODUCTS,
  ...ACTIVEWEAR_PRODUCTS,
  ...WOVEN_SHIRTS_PRODUCTS,
  ...PERSONAL_PROTECTION_PRODUCTS,
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
export function getStyleCodesByCategory(categorySlug: string): string[] {
  return ALL_SANMAR_PRODUCTS
    .filter(p => p.categorySlug === categorySlug)
    .map(p => p.style);
}

/**
 * Get product config by style code
 */
export function getProductConfigByStyle(style: string): SanMarProductConfig | undefined {
  return ALL_SANMAR_PRODUCTS.find(p => p.style === style);
}

// ============================================================================
// CATEGORY MAPPING (for creating Product objects)
// ============================================================================

export const CATEGORY_SLUG_MAP = {
  'workwear': 'apparel',
  'activewear': 'apparel', 
  'woven-shirts': 'apparel',
  'personal-protection': 'apparel',
} as const;
