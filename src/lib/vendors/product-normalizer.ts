// Product Normalizer - Normalizar productos de proveedores
// V7MPC Vendor Abstraction Layer
// Convierte productos crudos de proveedores a formato normalizado

import type {
  RawVendorProduct,
  NormalizationConfig,
  NormalizationResult
} from '@/types/vendors';

import type { NormalizedProduct } from '@/types/taxonomy';

import { filterVendorInfo } from './vendor-filter';

// ============================================================================
// CONFIGURATION
// ============================================================================

/**
 * Configuración por defecto para normalización
 */
const DEFAULT_NORMALIZATION_CONFIG: NormalizationConfig = {
  hideVendorName: true,         // Ocultar nombre de proveedor
  preserveBrands: true,         // Preservar marcas de productos
  defaultBrand: 'V7MPC',        // Marca por defecto
  imageOptimization: false,     // Optimizar imágenes (no implementado aún)
  priceRounding: false          // Redondear precios (no implementado aún)
};

// ============================================================================
// BRAND MAPPING
// ============================================================================

/**
 * Mapeo de marcas de proveedor a marcas V7MPC
 * Solo se usa si la marca del proveedor no es reconocida
 */
const BRAND_MAPPING: Record<string, string> = {
  // Dejar vacío por ahora - las marcas se preservan tal cual
  // Solo agregar aquí si necesitamos renombrar alguna marca específica
};

/**
 * Obtiene la marca normalizada de un producto
 */
function getNormalizedBrand(rawBrand: string | undefined, vendorId: string): string {
  if (!rawBrand || rawBrand.trim() === '') {
    return DEFAULT_NORMALIZATION_CONFIG.defaultBrand;
  }

  // Limpiar marca
  const cleanBrand = rawBrand.trim()
    .replace(/®/g, '')
    .replace(/™/g, '')
    .trim();

  // Verificar si hay mapeo personalizado
  const mappingKey = `${vendorId}:${cleanBrand.toLowerCase()}`;
  if (BRAND_MAPPING[mappingKey]) {
    return BRAND_MAPPING[mappingKey];
  }

  // Retornar marca limpia tal cual (preservada)
  return cleanBrand;
}

// ============================================================================
// IMAGE PROCESSING
// ============================================================================

/**
 * Procesa URLs de imágenes
 */
function processImages(rawImages: string[] | undefined): string[] {
  if (!rawImages || rawImages.length === 0) {
    return [];
  }

  // Por ahora, retornar tal cual
  // TODO: Implementar optimización de imágenes en el futuro
  return rawImages.filter(img => img && img.trim() !== '');
}

// ============================================================================
// TEXT PROCESSING
// ============================================================================

/**
 * Limpia y normaliza texto
 */
function cleanText(text: string | undefined): string {
  if (!text) return '';

  return text
    .trim()
    .replace(/\s+/g, ' ')           // Normalizar espacios
    .replace(/\n\s*\n/g, '\n\n')    // Normalizar saltos de línea
    .trim();
}

/**
 * Genera descripción corta a partir de descripción completa
 */
function generateShortDescription(
  description: string | undefined,
  maxLength: number = 150
): string | undefined {
  if (!description) return undefined;

  const cleaned = cleanText(description);
  if (cleaned.length <= maxLength) {
    return cleaned;
  }

  // Truncar en la última palabra completa antes del límite
  const truncated = cleaned.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');

  return lastSpace > 0
    ? truncated.substring(0, lastSpace) + '...'
    : truncated + '...';
}

// ============================================================================
// PRODUCT NORMALIZATION
// ============================================================================

/**
 * Normaliza un producto crudo de proveedor a formato V7MPC
 * @param rawProduct Producto crudo del proveedor
 * @param config Configuración de normalización
 * @returns Resultado de normalización
 */
export function normalizeVendorProduct(
  rawProduct: RawVendorProduct,
  config: Partial<NormalizationConfig> = {}
): NormalizationResult {
  const cfg = { ...DEFAULT_NORMALIZATION_CONFIG, ...config };
  const errors: string[] = [];
  const warnings: string[] = [];

  try {
    // 1. Validar producto crudo
    if (!rawProduct.vendorProductId) {
      errors.push('Missing vendorProductId');
    }
    if (!rawProduct.rawProductTitle) {
      errors.push('Missing rawProductTitle');
    }

    if (errors.length > 0) {
      return { success: false, errors, warnings };
    }

    // 2. Filtrar información de proveedor
    const { filtered } = filterVendorInfo(rawProduct, {
      removeVendorName: cfg.hideVendorName,
      removeVendorIds: true,
      removeVendorMetadata: true,
      preserveBrands: cfg.preserveBrands
    });

    // 3. Obtener marca normalizada
    const brand = getNormalizedBrand(
      filtered.rawBrandName,
      filtered._vendor?.source || 'unknown'
    );

    // 4. Procesar imágenes
    const images = processImages(filtered.rawImages);
    if (images.length === 0) {
      warnings.push('No images available');
    }

    // 5. Limpiar textos
    const name = cleanText(filtered.rawProductTitle);
    const description = cleanText(filtered.rawDescription) || name;
    const shortDescription = generateShortDescription(description);

    // 6. Procesar características
    const features = filtered.rawFeatures || [];

    // 7. Procesar tags
    const tags = filtered.rawTags || [];

    // 8. Generar ID único para V7MPC
    const vendorSource = filtered._vendor?.source || 'unknown';
    const vendorProductId = filtered._vendor?.vendorProductId || rawProduct.vendorProductId;
    const id = `v7mpc-${vendorSource}-${vendorProductId}`;

    // 9. Crear producto normalizado
    const normalizedProduct: NormalizedProduct = {
      id,
      name,
      brand,
      shortDescription,
      description,
      images,
      features,
      isCustomizable: filtered.isCustomizable || true, // Por defecto, sí
      tags,
      categories: [], // Se asignarán después con el categorizador
      _vendor: {
        source: vendorSource,
        vendorName: rawProduct.vendorName,
        originalBrand: rawProduct.rawBrandName,
        vendorProductId,
        hidden: true
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return {
      success: true,
      product: normalizedProduct,
      errors: [],
      warnings
    };

  } catch (error) {
    errors.push(error instanceof Error ? error.message : 'Unknown error');
    return { success: false, errors, warnings };
  }
}

/**
 * Normaliza múltiples productos en batch
 * @param rawProducts Array de productos crudos
 * @param config Configuración de normalización
 * @returns Array de productos normalizados exitosos
 */
export function normalizeVendorProductsBatch(
  rawProducts: RawVendorProduct[],
  config: Partial<NormalizationConfig> = {}
): {
  successful: NormalizedProduct[];
  failed: Array<{ product: RawVendorProduct; errors: string[] }>;
  warnings: string[];
} {
  const successful: NormalizedProduct[] = [];
  const failed: Array<{ product: RawVendorProduct; errors: string[] }> = [];
  const allWarnings: string[] = [];

  rawProducts.forEach(rawProduct => {
    const result = normalizeVendorProduct(rawProduct, config);

    if (result.success && result.product) {
      successful.push(result.product as NormalizedProduct);
      if (result.warnings && result.warnings.length > 0) {
        allWarnings.push(...result.warnings);
      }
    } else {
      failed.push({
        product: rawProduct,
        errors: result.errors || ['Unknown error']
      });
    }
  });

  return {
    successful,
    failed,
    warnings: allWarnings
  };
}

/**
 * Actualiza un producto normalizado existente con nueva información
 * @param existing Producto normalizado existente
 * @param raw Producto crudo actualizado
 * @returns Producto normalizado actualizado
 */
export function updateNormalizedProduct(
  existing: NormalizedProduct,
  raw: RawVendorProduct
): NormalizationResult {
  const result = normalizeVendorProduct(raw);

  if (!result.success || !result.product) {
    return result;
  }

  const updated = result.product as NormalizedProduct;

  // Preservar categorías existentes si las hay
  if (existing.categories && existing.categories.length > 0) {
    updated.categories = existing.categories;
  }

  // Preservar fecha de creación
  updated.createdAt = existing.createdAt;

  // Actualizar fecha de modificación
  updated.updatedAt = new Date();

  return {
    success: true,
    product: updated,
    errors: [],
    warnings: result.warnings
  };
}

/**
 * Valida que un producto normalizado sea correcto
 * @param product Producto a validar
 * @returns Resultado de validación
 */
export function validateNormalizedProduct(product: NormalizedProduct): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validaciones críticas
  if (!product.id) errors.push('Missing id');
  if (!product.name) errors.push('Missing name');
  if (!product.brand) errors.push('Missing brand');

  // Validar que no haya información de proveedor expuesta
  if (!product._vendor) {
    errors.push('Missing _vendor info');
  } else if (!product._vendor.hidden) {
    errors.push('Vendor info not marked as hidden');
  }

  // Validaciones de advertencia
  if (!product.shortDescription) warnings.push('Missing shortDescription');
  if (!product.description) warnings.push('Missing description');
  if (!product.images || product.images.length === 0) warnings.push('No images');
  if (!product.features || product.features.length === 0) warnings.push('No features');

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  DEFAULT_NORMALIZATION_CONFIG,
  BRAND_MAPPING
};

// Usage:
// import { normalizeVendorProduct, normalizeVendorProductsBatch } from '@/lib/vendors/product-normalizer';
//
// // Normalizar un producto
// const result = normalizeVendorProduct(rawProduct);
// if (result.success) {
//   console.log('Normalized product:', result.product);
// } else {
//   console.error('Errors:', result.errors);
// }
//
// // Normalizar múltiples productos
// const batchResult = normalizeVendorProductsBatch(rawProducts);
// console.log(`Successful: ${batchResult.successful.length}`);
// console.log(`Failed: ${batchResult.failed.length}`);
