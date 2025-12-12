// Product Categorizer - Orquestador de categorización de productos
// V7MPC Auto-Categorization System
// Sistema principal que coordina la categorización automática

import type {
  CategorizationResult,
  NormalizedProduct,
  CategorizerConfig,
  Category
} from '@/types/taxonomy';

import {
  CATEGORY_TAXONOMY,
  getAllSubcategories
} from './category-definitions';

import {
  RuleMatcher,
  matchNewArrivals,
  matchOnSale,
  matchBestSellers
} from './rule-matcher';

import { slugify } from './brand-extractor';

// ============================================================================
// CONFIGURATION
// ============================================================================

/**
 * Configuración por defecto del categorizador
 */
const DEFAULT_CONFIG: CategorizerConfig = {
  minConfidence: 0.3,           // Confianza mínima global
  allowMultipleCategories: true, // Permitir múltiples categorías
  maxCategories: 5              // Máximo de categorías por producto
};

// ============================================================================
// PRODUCT CATEGORIZER CLASS
// ============================================================================

/**
 * Categorizador principal de productos
 * Orquesta la categorización automática de productos
 */
export class ProductCategorizer {
  private matcher: RuleMatcher;
  private config: CategorizerConfig;

  constructor(config: Partial<CategorizerConfig> = {}) {
    this.matcher = new RuleMatcher();
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Categoriza un solo producto
   * @param product Producto a categorizar
   * @returns Array de resultados de categorización
   */
  categorizeProduct(product: NormalizedProduct): CategorizationResult[] {
    const results: CategorizationResult[] = [];

    // 1. Categorizar por tipo de producto (by-type)
    const typeResults = this.categorizeByType(product);
    results.push(...typeResults);

    // 2. Categorizar productos destacados (featured)
    const featuredResults = this.categorizeFeatured(product);
    results.push(...featuredResults);

    // 3. Categorizar por marca (by-brand)
    const brandResult = this.categorizeByBrand(product);
    if (brandResult) {
      results.push(brandResult);
    }

    // 4. Filtrar por confianza mínima
    const filtered = results.filter(
      result => result.confidence >= this.config.minConfidence
    );

    // 5. Ordenar por confianza descendente
    filtered.sort((a, b) => b.confidence - a.confidence);

    // 6. Limitar número de categorías si está configurado
    if (!this.config.allowMultipleCategories) {
      return filtered.slice(0, 1);
    } else if (this.config.maxCategories) {
      return filtered.slice(0, this.config.maxCategories);
    }

    return filtered;
  }

  /**
   * Categoriza múltiples productos en batch
   * @param products Array de productos
   * @returns Map con slug de categoría como clave y productos como valor
   */
  categorizeProducts(
    products: NormalizedProduct[]
  ): Map<string, NormalizedProduct[]> {
    const categoryMap = new Map<string, NormalizedProduct[]>();

    products.forEach(product => {
      const categories = this.categorizeProduct(product);

      categories.forEach(catResult => {
        const key = `${catResult.categoryId}/${catResult.subcategoryId}`;

        if (categoryMap.has(key)) {
          categoryMap.get(key)!.push(product);
        } else {
          categoryMap.set(key, [product]);
        }
      });
    });

    return categoryMap;
  }

  /**
   * Categoriza un producto por tipo (t-shirts, polos, etc.)
   */
  private categorizeByType(product: NormalizedProduct): CategorizationResult[] {
    const results: CategorizationResult[] = [];
    const subcategories = CATEGORY_TAXONOMY.byType.subcategories;

    subcategories.forEach(subcategory => {
      const matchResult = this.matcher.matchRule(product, subcategory.rules);

      if (matchResult.matched) {
        results.push({
          categoryId: 'by-type',
          subcategoryId: subcategory.id,
          confidence: matchResult.confidence,
          matchedRules: matchResult.matchedKeywords
        });
      }
    });

    return results;
  }

  /**
   * Categoriza un producto en featured (new arrivals, on sale, etc.)
   */
  private categorizeFeatured(product: NormalizedProduct): CategorizationResult[] {
    const results: CategorizationResult[] = [];

    // New Arrivals
    const newArrivalResult = matchNewArrivals(product, 30);
    if (newArrivalResult.matched) {
      results.push({
        categoryId: 'featured',
        subcategoryId: 'new-arrivals',
        confidence: newArrivalResult.confidence,
        matchedRules: newArrivalResult.matchedKeywords
      });
    }

    // On Sale
    const onSaleResult = matchOnSale(product, 10);
    if (onSaleResult.matched) {
      results.push({
        categoryId: 'featured',
        subcategoryId: 'on-sale',
        confidence: onSaleResult.confidence,
        matchedRules: onSaleResult.matchedKeywords
      });
    }

    // Best Sellers
    const bestSellerResult = matchBestSellers(product);
    if (bestSellerResult.matched) {
      results.push({
        categoryId: 'featured',
        subcategoryId: 'best-sellers',
        confidence: bestSellerResult.confidence,
        matchedRules: bestSellerResult.matchedKeywords
      });
    }

    return results;
  }

  /**
   * Categoriza un producto por marca
   */
  private categorizeByBrand(product: NormalizedProduct): CategorizationResult | null {
    if (!product.brand || product.brand.trim() === '') {
      return null;
    }

    const brandSlug = slugify(product.brand);

    return {
      categoryId: 'by-brand',
      subcategoryId: brandSlug,
      confidence: 1.0, // Marca siempre tiene 100% confianza
      matchedRules: ['brand-match']
    };
  }

  /**
   * Actualiza la configuración del categorizador
   */
  updateConfig(config: Partial<CategorizerConfig>) {
    this.config = { ...this.config, ...config };
  }

  /**
   * Obtiene la configuración actual
   */
  getConfig(): CategorizerConfig {
    return { ...this.config };
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Crea un índice de categorías para acceso rápido
 * @param products Array de productos categorizados
 * @returns Map con categoría/subcategoría como clave
 */
export function createCategoryIndex(
  products: NormalizedProduct[]
): Map<string, { category: Category; products: NormalizedProduct[] }> {
  const categorizer = new ProductCategorizer();
  const categoryMap = categorizer.categorizeProducts(products);

  const index = new Map();

  categoryMap.forEach((prods, key) => {
    const [categoryId, subcategoryId] = key.split('/');

    // Obtener categoría
    let category: Category | null = null;
    if (categoryId === 'featured') category = CATEGORY_TAXONOMY.featured;
    else if (categoryId === 'by-type') category = CATEGORY_TAXONOMY.byType;
    else if (categoryId === 'by-brand') category = CATEGORY_TAXONOMY.byBrand;

    if (category) {
      index.set(key, {
        category,
        products: prods
      });
    }
  });

  return index;
}

/**
 * Obtiene productos de una categoría específica
 * @param products Array de productos
 * @param categoryId ID de la categoría
 * @param subcategoryId ID de la subcategoría
 * @returns Productos que pertenecen a la categoría
 */
export function getProductsByCategory(
  products: NormalizedProduct[],
  categoryId: string,
  subcategoryId: string
): NormalizedProduct[] {
  const categorizer = new ProductCategorizer();
  const results: NormalizedProduct[] = [];

  products.forEach(product => {
    const categories = categorizer.categorizeProduct(product);

    const hasCategory = categories.some(
      cat => cat.categoryId === categoryId && cat.subcategoryId === subcategoryId
    );

    if (hasCategory) {
      results.push(product);
    }
  });

  return results;
}

/**
 * Obtiene estadísticas de categorización
 * @param products Array de productos
 * @returns Objeto con estadísticas
 */
export function getCategorizationStatistics(products: NormalizedProduct[]): {
  totalProducts: number;
  categorizedProducts: number;
  uncategorizedProducts: number;
  averageCategoriesPerProduct: number;
  categoryDistribution: Map<string, number>;
} {
  const categorizer = new ProductCategorizer();
  const categoryDistribution = new Map<string, number>();
  let totalCategories = 0;
  let categorizedCount = 0;

  products.forEach(product => {
    const categories = categorizer.categorizeProduct(product);

    if (categories.length > 0) {
      categorizedCount++;
      totalCategories += categories.length;

      categories.forEach(cat => {
        const key = `${cat.categoryId}/${cat.subcategoryId}`;
        categoryDistribution.set(key, (categoryDistribution.get(key) || 0) + 1);
      });
    }
  });

  return {
    totalProducts: products.length,
    categorizedProducts: categorizedCount,
    uncategorizedProducts: products.length - categorizedCount,
    averageCategoriesPerProduct: categorizedCount > 0
      ? totalCategories / categorizedCount
      : 0,
    categoryDistribution
  };
}

/**
 * Valida que un producto esté correctamente categorizado
 * @param product Producto a validar
 * @returns true si está categorizado, false si no
 */
export function validateProductCategorization(
  product: NormalizedProduct
): {
  isValid: boolean;
  categories: CategorizationResult[];
  issues: string[];
} {
  const categorizer = new ProductCategorizer();
  const categories = categorizer.categorizeProduct(product);
  const issues: string[] = [];

  if (categories.length === 0) {
    issues.push('Product has no categories');
  }

  if (categories.length > 10) {
    issues.push(`Product has too many categories (${categories.length})`);
  }

  const hasByType = categories.some(cat => cat.categoryId === 'by-type');
  if (!hasByType) {
    issues.push('Product has no type category (by-type)');
  }

  const hasBrand = categories.some(cat => cat.categoryId === 'by-brand');
  if (!hasBrand && product.brand) {
    issues.push('Product has brand but no brand category');
  }

  return {
    isValid: issues.length === 0,
    categories,
    issues
  };
}

/**
 * Re-categoriza productos cuando cambian las reglas
 * @param products Array de productos
 * @param config Nueva configuración opcional
 * @returns Productos con categorías actualizadas
 */
export function recategorizeProducts(
  products: NormalizedProduct[],
  config?: Partial<CategorizerConfig>
): NormalizedProduct[] {
  const categorizer = new ProductCategorizer(config);

  return products.map(product => ({
    ...product,
    categories: categorizer.categorizeProduct(product)
  }));
}

// ============================================================================
// EXPORTS
// ============================================================================

export { DEFAULT_CONFIG as DEFAULT_CATEGORIZER_CONFIG };

// Usage:
// import { ProductCategorizer, getProductsByCategory } from '@/lib/taxonomy/product-categorizer';
//
// const categorizer = new ProductCategorizer({
//   minConfidence: 0.4,
//   allowMultipleCategories: true
// });
//
// const categories = categorizer.categorizeProduct(product);
// console.log('Categories:', categories);
// // [
// //   { categoryId: 'by-type', subcategoryId: 't-shirts', confidence: 0.85, matchedRules: ['tee', 't-shirt'] },
// //   { categoryId: 'by-brand', subcategoryId: 'sport-tek', confidence: 1.0, matchedRules: ['brand-match'] },
// //   { categoryId: 'featured', subcategoryId: 'new-arrivals', confidence: 0.90, matchedRules: ['new-arrival'] }
// // ]
//
// // Batch categorization
// const categoryMap = categorizer.categorizeProducts(products);
// const tShirts = categoryMap.get('by-type/t-shirts');
