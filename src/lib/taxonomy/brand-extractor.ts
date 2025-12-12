// Brand Extractor - Extraer y organizar marcas de productos
// V7MPC Brand Management System
// Sistema para extraer marcas únicas y generar filtros dinámicos

import type { Brand } from '@/types/taxonomy';
import type { NormalizedProduct } from '@/types/taxonomy';

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Convierte texto a slug (URL-friendly)
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remover caracteres especiales
    .replace(/[\s_-]+/g, '-') // Reemplazar espacios y guiones bajos con -
    .replace(/^-+|-+$/g, ''); // Remover guiones al inicio y final
}

/**
 * Normaliza el nombre de una marca
 */
function normalizeBrandName(brand: string): string {
  return brand
    .trim()
    .replace(/\s+/g, ' ') // Normalizar espacios
    .replace(/®/g, '')    // Remover marca registrada
    .replace(/™/g, '');   // Remover trademark
}

// ============================================================================
// BRAND EXTRACTION
// ============================================================================

/**
 * Extrae todas las marcas únicas de un array de productos
 * @param products Array de productos normalizados
 * @returns Array de marcas con conteo de productos
 */
export function extractBrands(products: NormalizedProduct[]): Brand[] {
  // Map para almacenar marcas únicas con conteo
  const brandMap = new Map<string, {
    name: string;
    count: number;
    slug: string;
  }>();

  // Iterar sobre todos los productos
  products.forEach(product => {
    // Obtener la marca del producto
    const brand = product.brand;

    if (!brand || brand.trim() === '') {
      // Si no hay marca, saltar
      return;
    }

    // Normalizar nombre de marca
    const normalizedName = normalizeBrandName(brand);
    const slug = slugify(normalizedName);

    // Si la marca ya existe, incrementar contador
    if (brandMap.has(slug)) {
      const existing = brandMap.get(slug)!;
      existing.count += 1;
    } else {
      // Nueva marca, agregar al map
      brandMap.set(slug, {
        name: normalizedName,
        count: 1,
        slug
      });
    }
  });

  // Convertir Map a Array de Brand
  const brands: Brand[] = Array.from(brandMap.values()).map(brandData => ({
    id: brandData.slug,
    name: brandData.name,
    slug: brandData.slug,
    productCount: brandData.count
  }));

  // Ordenar por nombre alfabéticamente
  brands.sort((a, b) => a.name.localeCompare(b.name));

  return brands;
}

/**
 * Obtiene las marcas más populares (por número de productos)
 * @param products Array de productos
 * @param limit Número máximo de marcas a retornar
 * @returns Array de marcas ordenadas por popularidad
 */
export function getTopBrands(
  products: NormalizedProduct[],
  limit: number = 10
): Brand[] {
  const brands = extractBrands(products);

  // Ordenar por productCount descendente
  brands.sort((a, b) => b.productCount - a.productCount);

  // Retornar solo el límite solicitado
  return brands.slice(0, limit);
}

/**
 * Busca una marca por su slug
 * @param brands Array de marcas
 * @param slug Slug de la marca a buscar
 * @returns Marca encontrada o null
 */
export function findBrandBySlug(brands: Brand[], slug: string): Brand | null {
  return brands.find(brand => brand.slug === slug) || null;
}

/**
 * Filtra productos por marca
 * @param products Array de productos
 * @param brandSlug Slug de la marca
 * @returns Productos de la marca especificada
 */
export function filterProductsByBrand(
  products: NormalizedProduct[],
  brandSlug: string
): NormalizedProduct[] {
  return products.filter(product => {
    const productBrandSlug = slugify(normalizeBrandName(product.brand || ''));
    return productBrandSlug === brandSlug;
  });
}

/**
 * Filtra productos por múltiples marcas
 * @param products Array de productos
 * @param brandSlugs Array de slugs de marcas
 * @returns Productos que coinciden con alguna de las marcas
 */
export function filterProductsByBrands(
  products: NormalizedProduct[],
  brandSlugs: string[]
): NormalizedProduct[] {
  if (brandSlugs.length === 0) {
    return products;
  }

  return products.filter(product => {
    const productBrandSlug = slugify(normalizeBrandName(product.brand || ''));
    return brandSlugs.includes(productBrandSlug);
  });
}

/**
 * Obtiene estadísticas de marcas
 * @param products Array de productos
 * @returns Objeto con estadísticas
 */
export function getBrandStatistics(products: NormalizedProduct[]): {
  totalBrands: number;
  totalProducts: number;
  averageProductsPerBrand: number;
  topBrand: Brand | null;
  brands: Brand[];
} {
  const brands = extractBrands(products);

  const totalBrands = brands.length;
  const totalProducts = products.length;
  const averageProductsPerBrand = totalBrands > 0
    ? Math.round(totalProducts / totalBrands)
    : 0;

  const topBrand = brands.length > 0
    ? brands.reduce((prev, current) =>
        current.productCount > prev.productCount ? current : prev
      )
    : null;

  return {
    totalBrands,
    totalProducts,
    averageProductsPerBrand,
    topBrand,
    brands
  };
}

/**
 * Crea un índice de marcas para búsqueda rápida
 * @param products Array de productos
 * @returns Map con slug de marca como clave y productos como valor
 */
export function createBrandIndex(
  products: NormalizedProduct[]
): Map<string, NormalizedProduct[]> {
  const brandIndex = new Map<string, NormalizedProduct[]>();

  products.forEach(product => {
    const brand = product.brand;
    if (!brand || brand.trim() === '') {
      return;
    }

    const slug = slugify(normalizeBrandName(brand));

    if (brandIndex.has(slug)) {
      brandIndex.get(slug)!.push(product);
    } else {
      brandIndex.set(slug, [product]);
    }
  });

  return brandIndex;
}

/**
 * Valida que una marca tenga al menos un producto
 * @param brand Marca a validar
 * @param products Array de productos
 * @returns true si la marca tiene productos, false si no
 */
export function validateBrand(
  brand: Brand,
  products: NormalizedProduct[]
): boolean {
  const productsInBrand = filterProductsByBrand(products, brand.slug);
  return productsInBrand.length > 0;
}

/**
 * Actualiza el contador de productos de una marca
 * @param brand Marca a actualizar
 * @param products Array de productos
 * @returns Marca actualizada
 */
export function updateBrandProductCount(
  brand: Brand,
  products: NormalizedProduct[]
): Brand {
  const productsInBrand = filterProductsByBrand(products, brand.slug);
  return {
    ...brand,
    productCount: productsInBrand.length
  };
}

// ============================================================================
// BRAND SEARCH
// ============================================================================

/**
 * Busca marcas por nombre (búsqueda fuzzy)
 * @param brands Array de marcas
 * @param query Término de búsqueda
 * @returns Marcas que coinciden con la búsqueda
 */
export function searchBrands(brands: Brand[], query: string): Brand[] {
  if (!query || query.trim() === '') {
    return brands;
  }

  const lowerQuery = query.toLowerCase().trim();

  return brands.filter(brand =>
    brand.name.toLowerCase().includes(lowerQuery) ||
    brand.slug.includes(lowerQuery)
  );
}

// ============================================================================
// EXPORTS
// ============================================================================

export { slugify, normalizeBrandName };

// Usage:
// import { extractBrands, filterProductsByBrand } from '@/lib/taxonomy/brand-extractor';
//
// const brands = extractBrands(products);
// console.log('Brands:', brands);
// // [
// //   { id: 'sport-tek', name: 'Sport-Tek', slug: 'sport-tek', productCount: 15 },
// //   { id: 'port-authority', name: 'Port Authority', slug: 'port-authority', productCount: 12 }
// // ]
//
// const sportTekProducts = filterProductsByBrand(products, 'sport-tek');
