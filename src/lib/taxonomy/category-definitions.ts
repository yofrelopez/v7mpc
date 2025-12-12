// Category Definitions - Jerarquía de categorías de productos
// V7MPC Product Taxonomy System
// Sistema de clasificación y organización de productos

import type { Category, CategoryRule, CategoryTaxonomy } from '@/types/taxonomy';

// ============================================================================
// CATEGORY RULES - Reglas de categorización
// ============================================================================

/**
 * Reglas para categoría T-Shirts
 */
const T_SHIRTS_RULES: CategoryRule = {
  keywords: [
    'tee',
    't-shirt',
    't shirt',
    'tshirt',
    'crew',
    'crewneck',
    'v-neck',
    'vneck',
    'pocket tee'
  ],
  exclude: [
    'polo',
    'henley',
    'tank',
    'hoodie',
    'sweatshirt',
    'jacket'
  ],
  minConfidence: 0.3,
  patterns: [
    /\bt[-\s]?shirt\b/i,
    /\btee\b/i,
    /\bcrewneck\b/i
  ]
};

/**
 * Reglas para categoría Polos/Knits
 */
const POLOS_RULES: CategoryRule = {
  keywords: [
    'polo',
    'pique',
    'golf',
    'sport shirt',
    'knit',
    'performance polo'
  ],
  exclude: [
    't-shirt',
    'tee',
    'hoodie',
    'jacket'
  ],
  minConfidence: 0.4,
  patterns: [
    /\bpolo\b/i,
    /\bpique\b/i,
    /\bgolf\b/i
  ]
};

/**
 * Reglas para categoría Hoodies & Sweatshirts
 */
const HOODIES_RULES: CategoryRule = {
  keywords: [
    'hoodie',
    'hoody',
    'sweatshirt',
    'pullover',
    'zip hoodie',
    'full-zip',
    'quarter-zip',
    'fleece'
  ],
  exclude: [
    't-shirt',
    'polo',
    'jacket',
    'coat'
  ],
  minConfidence: 0.4,
  patterns: [
    /\bhoodie\b/i,
    /\bsweatshirt\b/i,
    /\bfleece\b/i
  ]
};

/**
 * Reglas para categoría Jackets & Outerwear
 */
const OUTERWEAR_RULES: CategoryRule = {
  keywords: [
    'jacket',
    'coat',
    'windbreaker',
    'soft shell',
    'insulated',
    'parka',
    'vest',
    'rainwear'
  ],
  exclude: [
    'hoodie',
    'sweatshirt'
  ],
  minConfidence: 0.4,
  patterns: [
    /\bjacket\b/i,
    /\bcoat\b/i,
    /\bvest\b/i
  ]
};

/**
 * Reglas para categoría Caps/Headwear
 */
const CAPS_RULES: CategoryRule = {
  keywords: [
    'cap',
    'hat',
    'beanie',
    'snapback',
    'trucker',
    'fitted',
    'visor',
    'headwear'
  ],
  exclude: [],
  minConfidence: 0.3,
  patterns: [
    /\bcap\b/i,
    /\bhat\b/i,
    /\bbeanie\b/i
  ]
};

/**
 * Reglas para categoría Bottoms
 */
const BOTTOMS_RULES: CategoryRule = {
  keywords: [
    'pant',
    'pants',
    'short',
    'shorts',
    'jeans',
    'jogger',
    'sweatpants',
    'cargo'
  ],
  exclude: [],
  minConfidence: 0.4,
  patterns: [
    /\bpant(s)?\b/i,
    /\bshort(s)?\b/i,
    /\bjeans\b/i
  ]
};

/**
 * Reglas para categoría Activewear
 */
const ACTIVEWEAR_RULES: CategoryRule = {
  keywords: [
    'sport',
    'athletic',
    'performance',
    'moisture wicking',
    'dri-fit',
    'tech',
    'running',
    'workout'
  ],
  exclude: [],
  minConfidence: 0.3,
  features: [
    'moisture wicking',
    'breathable',
    'quick dry'
  ]
};

/**
 * Reglas para categoría Workwear
 */
const WORKWEAR_RULES: CategoryRule = {
  keywords: [
    'work',
    'industrial',
    'safety',
    'durable',
    'coverall',
    'utility',
    'pocket',
    'reinforced'
  ],
  exclude: [],
  minConfidence: 0.4,
  features: [
    'pockets',
    'reinforced',
    'durable'
  ]
};

/**
 * Reglas para categoría Bags & Accessories
 */
const BAGS_RULES: CategoryRule = {
  keywords: [
    'bag',
    'backpack',
    'tote',
    'duffel',
    'messenger',
    'briefcase',
    'laptop bag',
    'gym bag'
  ],
  exclude: [],
  minConfidence: 0.4,
  patterns: [
    /\bbag\b/i,
    /\bbackpack\b/i,
    /\btote\b/i
  ]
};

// ============================================================================
// FEATURED CATEGORIES RULES
// ============================================================================

/**
 * Reglas para New Arrivals (productos nuevos)
 * Basado en fecha de creación
 */
const NEW_ARRIVALS_RULES: CategoryRule = {
  keywords: [],
  exclude: [],
  minConfidence: 0.5
  // Lógica especial: createdAt >= (now - 30 days)
};

/**
 * Reglas para On Sale (productos en oferta)
 * Basado en precio de venta vs precio regular
 */
const ON_SALE_RULES: CategoryRule = {
  keywords: ['sale', 'clearance', 'discount'],
  exclude: [],
  minConfidence: 0.3
  // Lógica especial: salePrice < regularPrice && discount >= 10%
};

/**
 * Reglas para Best Sellers (más vendidos)
 * Basado en popularidad/ventas
 */
const BEST_SELLERS_RULES: CategoryRule = {
  keywords: ['popular', 'best seller', 'top rated'],
  exclude: [],
  minConfidence: 0.3
  // Lógica especial: sales count o rating
};

// ============================================================================
// CATEGORY TAXONOMY - Estructura completa de categorías
// ============================================================================

/**
 * Taxonomía completa del sistema de categorización
 * Incluye todas las categorías y subcategorías
 */
export const CATEGORY_TAXONOMY: CategoryTaxonomy = {
  // ========================================
  // FEATURED PRODUCTS - Productos Destacados
  // ========================================
  featured: {
    id: 'featured',
    slug: 'featured',
    name: 'Featured Products',
    description: 'Productos destacados y ofertas especiales',
    subcategories: [
      {
        id: 'new-arrivals',
        slug: 'new-arrivals',
        name: 'New Arrivals',
        description: 'Productos nuevos agregados en los últimos 30 días',
        icon: 'Sparkles',
        rules: NEW_ARRIVALS_RULES
      },
      {
        id: 'on-sale',
        slug: 'on-sale',
        name: 'On Sale',
        description: 'Productos con descuento especial',
        icon: 'Tag',
        rules: ON_SALE_RULES
      },
      {
        id: 'best-sellers',
        slug: 'best-sellers',
        name: 'Best Sellers',
        description: 'Productos más populares',
        icon: 'TrendingUp',
        rules: BEST_SELLERS_RULES
      }
    ]
  },

  // ========================================
  // BY TYPE - Por Tipo de Producto
  // ========================================
  byType: {
    id: 'by-type',
    slug: 'by-type',
    name: 'By Type',
    description: 'Navegar productos por tipo/categoría',
    subcategories: [
      {
        id: 't-shirts',
        slug: 't-shirts',
        name: 'T-Shirts',
        description: 'Camisetas de manga corta y larga',
        icon: 'Shirt',
        rules: T_SHIRTS_RULES
      },
      {
        id: 'polos',
        slug: 'polos',
        name: 'Polos/Knits',
        description: 'Polos y camisas tipo golf',
        icon: 'Shirt',
        rules: POLOS_RULES
      },
      {
        id: 'hoodies',
        slug: 'hoodies',
        name: 'Hoodies & Sweatshirts',
        description: 'Sudaderas con y sin capucha',
        icon: 'Wind',
        rules: HOODIES_RULES
      },
      {
        id: 'outerwear',
        slug: 'outerwear',
        name: 'Jackets & Outerwear',
        description: 'Chaquetas, abrigos y ropa exterior',
        icon: 'CloudRain',
        rules: OUTERWEAR_RULES
      },
      {
        id: 'caps',
        slug: 'caps',
        name: 'Caps/Headwear',
        description: 'Gorras, sombreros y accesorios para la cabeza',
        icon: 'Circle',
        rules: CAPS_RULES
      },
      {
        id: 'bottoms',
        slug: 'bottoms',
        name: 'Bottoms',
        description: 'Pantalones y shorts',
        icon: 'Circle',
        rules: BOTTOMS_RULES
      },
      {
        id: 'activewear',
        slug: 'activewear',
        name: 'Activewear',
        description: 'Ropa deportiva y de rendimiento',
        icon: 'Zap',
        rules: ACTIVEWEAR_RULES
      },
      {
        id: 'workwear',
        slug: 'workwear',
        name: 'Workwear',
        description: 'Ropa de trabajo y seguridad',
        icon: 'HardHat',
        rules: WORKWEAR_RULES
      },
      {
        id: 'bags',
        slug: 'bags',
        name: 'Bags & Accessories',
        description: 'Bolsos, mochilas y accesorios',
        icon: 'Briefcase',
        rules: BAGS_RULES
      }
    ]
  },

  // ========================================
  // BY BRAND - Por Marca (dinámico)
  // ========================================
  byBrand: {
    id: 'by-brand',
    slug: 'by-brand',
    name: 'By Brand',
    description: 'Navegar productos por marca',
    isDynamic: true,
    subcategories: []
    // Se puebla dinámicamente con extractBrands()
  }
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Obtiene todas las categorías principales
 */
export function getAllCategories(): Category[] {
  return [
    CATEGORY_TAXONOMY.featured,
    CATEGORY_TAXONOMY.byType,
    CATEGORY_TAXONOMY.byBrand
  ];
}

/**
 * Obtiene una categoría por su slug
 */
export function getCategoryBySlug(slug: string): Category | null {
  const categories = getAllCategories();
  return categories.find(cat => cat.slug === slug) || null;
}

/**
 * Obtiene todas las subcategorías de tipo "by-type"
 */
export function getProductTypeSubcategories() {
  return CATEGORY_TAXONOMY.byType.subcategories;
}

/**
 * Obtiene una subcategoría por su slug
 */
export function getSubcategoryBySlug(
  categorySlug: string,
  subcategorySlug: string
): any {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return null;

  return category.subcategories.find(sub => sub.slug === subcategorySlug) || null;
}

/**
 * Obtiene todas las subcategorías (flat list)
 */
export function getAllSubcategories() {
  const categories = getAllCategories();
  return categories.flatMap(cat => cat.subcategories);
}

/**
 * Busca subcategorías por keywords
 */
export function findSubcategoriesByKeyword(keyword: string) {
  const lowerKeyword = keyword.toLowerCase();
  return getAllSubcategories().filter(sub =>
    sub.name.toLowerCase().includes(lowerKeyword) ||
    sub.rules.keywords.some(kw => kw.includes(lowerKeyword))
  );
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  T_SHIRTS_RULES,
  POLOS_RULES,
  HOODIES_RULES,
  OUTERWEAR_RULES,
  CAPS_RULES,
  BOTTOMS_RULES,
  ACTIVEWEAR_RULES,
  WORKWEAR_RULES,
  BAGS_RULES,
  NEW_ARRIVALS_RULES,
  ON_SALE_RULES,
  BEST_SELLERS_RULES
};

// Usage:
// import { CATEGORY_TAXONOMY, getAllCategories } from '@/lib/taxonomy/category-definitions';
//
// const categories = getAllCategories();
// const tShirtsCategory = getSubcategoryBySlug('by-type', 't-shirts');
