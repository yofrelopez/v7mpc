// Rule Matcher - Motor de coincidencia de reglas de categorización
// V7MPC Categorization Engine
// Sistema inteligente para categorizar productos automáticamente

import type { CategoryRule, RuleMatchResult, NormalizedProduct } from '@/types/taxonomy';

// ============================================================================
// CONFIGURATION
// ============================================================================

/**
 * Pesos para el cálculo de confidence
 */
const CONFIDENCE_WEIGHTS = {
  keyword: 0.40,      // 40% - Coincidencia de keywords
  pattern: 0.30,      // 30% - Coincidencia de patrones regex
  feature: 0.15,      // 15% - Coincidencia de características
  context: 0.15       // 15% - Contexto (precio, fecha, etc.)
};

// ============================================================================
// RULE MATCHER CLASS
// ============================================================================

/**
 * Motor de matching de reglas
 * Evalúa si un producto coincide con las reglas de una categoría
 */
export class RuleMatcher {
  /**
   * Evalúa si un producto coincide con una regla
   * @param product Producto a evaluar
   * @param rule Regla de categorización
   * @returns Resultado del matching
   */
  matchRule(product: NormalizedProduct, rule: CategoryRule): RuleMatchResult {
    // 1. Verificar exclusiones primero
    if (this.hasExcludedKeywords(product, rule)) {
      return {
        matched: false,
        confidence: 0,
        matchedKeywords: [],
        matchType: 'keyword'
      };
    }

    // 2. Calcular coincidencia de keywords
    const keywordMatch = this.matchKeywords(product, rule);

    // 3. Calcular coincidencia de patrones
    const patternMatch = this.matchPatterns(product, rule);

    // 4. Calcular coincidencia de características
    const featureMatch = this.matchFeatures(product, rule);

    // 5. Calcular contexto (precio, fecha, etc.)
    const contextMatch = this.matchContext(product, rule);

    // 6. Calcular confidence total
    const confidence =
      (keywordMatch.score * CONFIDENCE_WEIGHTS.keyword) +
      (patternMatch.score * CONFIDENCE_WEIGHTS.pattern) +
      (featureMatch.score * CONFIDENCE_WEIGHTS.feature) +
      (contextMatch.score * CONFIDENCE_WEIGHTS.context);

    // 7. Determinar si coincide
    const matched = confidence >= rule.minConfidence;

    // 8. Determinar tipo de coincidencia
    let matchType: RuleMatchResult['matchType'] = 'composite';
    if (keywordMatch.score > 0.8) matchType = 'keyword';
    else if (patternMatch.score > 0.8) matchType = 'pattern';
    else if (featureMatch.score > 0.8) matchType = 'feature';

    return {
      matched,
      confidence: Math.min(confidence, 1.0), // Cap at 1.0
      matchedKeywords: keywordMatch.matched,
      matchType
    };
  }

  /**
   * Verifica si el producto contiene keywords excluidas
   */
  private hasExcludedKeywords(
    product: NormalizedProduct,
    rule: CategoryRule
  ): boolean {
    if (!rule.exclude || rule.exclude.length === 0) {
      return false;
    }

    const searchText = this.getSearchableText(product).toLowerCase();

    return rule.exclude.some(keyword =>
      searchText.includes(keyword.toLowerCase())
    );
  }

  /**
   * Calcula coincidencia de keywords
   */
  private matchKeywords(
    product: NormalizedProduct,
    rule: CategoryRule
  ): { score: number; matched: string[] } {
    if (!rule.keywords || rule.keywords.length === 0) {
      return { score: 0, matched: [] };
    }

    const searchText = this.getSearchableText(product).toLowerCase();
    const matchedKeywords: string[] = [];

    rule.keywords.forEach(keyword => {
      if (searchText.includes(keyword.toLowerCase())) {
        matchedKeywords.push(keyword);
      }
    });

    const score = matchedKeywords.length / rule.keywords.length;

    return { score, matched: matchedKeywords };
  }

  /**
   * Calcula coincidencia de patrones regex
   */
  private matchPatterns(
    product: NormalizedProduct,
    rule: CategoryRule
  ): { score: number; matched: string[] } {
    if (!rule.patterns || rule.patterns.length === 0) {
      return { score: 0, matched: [] };
    }

    const searchText = this.getSearchableText(product);
    const matchedPatterns: string[] = [];

    rule.patterns.forEach(pattern => {
      if (pattern.test(searchText)) {
        matchedPatterns.push(pattern.source);
      }
    });

    const score = matchedPatterns.length / rule.patterns.length;

    return { score, matched: matchedPatterns };
  }

  /**
   * Calcula coincidencia de características
   */
  private matchFeatures(
    product: NormalizedProduct,
    rule: CategoryRule
  ): { score: number; matched: string[] } {
    if (!rule.features || rule.features.length === 0) {
      return { score: 0, matched: [] };
    }

    if (!product.features || product.features.length === 0) {
      return { score: 0, matched: [] };
    }

    const productFeatures = product.features.map(f => f.toLowerCase());
    const matchedFeatures: string[] = [];

    rule.features.forEach(feature => {
      if (productFeatures.some(pf => pf.includes(feature.toLowerCase()))) {
        matchedFeatures.push(feature);
      }
    });

    const score = matchedFeatures.length / rule.features.length;

    return { score, matched: matchedFeatures };
  }

  /**
   * Calcula coincidencia de contexto (precio, fecha, etc.)
   */
  private matchContext(
    product: NormalizedProduct,
    rule: CategoryRule
  ): { score: number; matched: string[] } {
    let score = 0;
    const matched: string[] = [];

    // Contexto de precio (si hay sale)
    // const hasDiscount = product.salePrice && product.regularPrice &&
    //   product.salePrice < product.regularPrice;
    // if (hasDiscount) {
    //   score += 0.5;
    //   matched.push('has-discount');
    // }

    // Contexto de fecha (nuevo)
    const daysSinceCreated = this.getDaysSinceCreation(product);
    if (daysSinceCreated <= 30) {
      score += 0.5;
      matched.push('is-new');
    }

    return { score: Math.min(score, 1.0), matched };
  }

  /**
   * Obtiene texto searchable del producto
   */
  private getSearchableText(product: NormalizedProduct): string {
    const parts: string[] = [
      product.name || '',
      product.shortDescription || '',
      typeof product.description === 'string' ? product.description : '',
      product.brand || '',
      ...(product.tags || []),
      ...(product.features || [])
    ];

    return parts.join(' ').toLowerCase();
  }

  /**
   * Calcula días desde la creación del producto
   */
  private getDaysSinceCreation(product: NormalizedProduct): number {
    if (!product.createdAt) {
      return Infinity;
    }

    const now = new Date();
    const created = new Date(product.createdAt);
    const diffMs = now.getTime() - created.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    return diffDays;
  }
}

// ============================================================================
// SPECIALIZED MATCHERS - Lógica especial para categorías específicas
// ============================================================================

/**
 * Matcher especializado para "New Arrivals"
 * Basado en fecha de creación
 */
export function matchNewArrivals(
  product: NormalizedProduct,
  daysThreshold: number = 30
): RuleMatchResult {
  const matcher = new RuleMatcher();
  const daysSince = matcher['getDaysSinceCreation'](product);

  const isNew = daysSince <= daysThreshold;
  const confidence = isNew
    ? Math.max(1.0 - (daysSince / daysThreshold), 0.5)
    : 0;

  return {
    matched: isNew,
    confidence,
    matchedKeywords: isNew ? ['new-arrival'] : [],
    matchType: 'composite'
  };
}

/**
 * Matcher especializado para "On Sale"
 * Basado en precio de venta vs precio regular
 */
export function matchOnSale(
  product: NormalizedProduct,
  minDiscountPercent: number = 10
): RuleMatchResult {
  // Por ahora, no tenemos precios en NormalizedProduct
  // Esta lógica se implementará cuando agreguemos pricing

  // Placeholder: buscar keywords de "sale" en tags
  const hasSaleTag = (product.tags || []).some(tag =>
    tag.toLowerCase().includes('sale') ||
    tag.toLowerCase().includes('clearance') ||
    tag.toLowerCase().includes('discount')
  );

  return {
    matched: hasSaleTag,
    confidence: hasSaleTag ? 0.7 : 0,
    matchedKeywords: hasSaleTag ? ['sale'] : [],
    matchType: 'keyword'
  };
}

/**
 * Matcher especializado para "Best Sellers"
 * Basado en popularidad (placeholder)
 */
export function matchBestSellers(
  product: NormalizedProduct
): RuleMatchResult {
  // Placeholder: buscar keywords de "popular" o "best seller" en tags
  const isBestSeller = (product.tags || []).some(tag =>
    tag.toLowerCase().includes('popular') ||
    tag.toLowerCase().includes('best seller') ||
    tag.toLowerCase().includes('top rated')
  );

  return {
    matched: isBestSeller,
    confidence: isBestSeller ? 0.8 : 0,
    matchedKeywords: isBestSeller ? ['best-seller'] : [],
    matchType: 'keyword'
  };
}

// ============================================================================
// BATCH MATCHING
// ============================================================================

/**
 * Evalúa múltiples productos contra una regla
 */
export function matchProductsBatch(
  products: NormalizedProduct[],
  rule: CategoryRule
): Map<string, RuleMatchResult> {
  const matcher = new RuleMatcher();
  const results = new Map<string, RuleMatchResult>();

  products.forEach(product => {
    const result = matcher.matchRule(product, rule);
    if (result.matched) {
      results.set(product.id, result);
    }
  });

  return results;
}

/**
 * Encuentra los mejores matches para una regla
 */
export function findBestMatches(
  products: NormalizedProduct[],
  rule: CategoryRule,
  limit: number = 10
): Array<{ product: NormalizedProduct; result: RuleMatchResult }> {
  const matcher = new RuleMatcher();
  const matches: Array<{ product: NormalizedProduct; result: RuleMatchResult }> = [];

  products.forEach(product => {
    const result = matcher.matchRule(product, rule);
    if (result.matched) {
      matches.push({ product, result });
    }
  });

  // Ordenar por confidence descendente
  matches.sort((a, b) => b.result.confidence - a.result.confidence);

  // Retornar solo el límite solicitado
  return matches.slice(0, limit);
}

// ============================================================================
// EXPORTS
// ============================================================================

export { CONFIDENCE_WEIGHTS };

// Usage:
// import { RuleMatcher, matchNewArrivals } from '@/lib/taxonomy/rule-matcher';
//
// const matcher = new RuleMatcher();
// const result = matcher.matchRule(product, rule);
//
// if (result.matched) {
//   console.log(`Product matches with ${result.confidence} confidence`);
//   console.log('Matched keywords:', result.matchedKeywords);
// }
//
// // Specialized matchers
// const newArrivalResult = matchNewArrivals(product);
// const onSaleResult = matchOnSale(product, 15); // 15% minimum discount
