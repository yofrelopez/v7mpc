// ============================================================================
// SANMAR PRODUCT FETCHER - Load products from SanMar API
// ============================================================================
'use server';

import { Product } from '@/types/products';
import { std_getProductInfoByStyleColorSize } from './sanmar';
import { parseSanMarXmlResponse, sanMarProductToProduct } from './sanmar-parser';
import { getAllStyleCodes, getStyleCodesByCategory } from './sanmar-products';

// ============================================================================
// FETCH FUNCTIONS
// ============================================================================

/**
 * Fetch a single product from SanMar API by style code
 */
export async function fetchSanMarProductByStyle(style: string): Promise<Product[]> {
  try {
    const xmlResponse = await std_getProductInfoByStyleColorSize({
      style: style.trim(),
    });
    
    const parsedProducts = parseSanMarXmlResponse(xmlResponse);
    const products = sanMarProductToProduct(parsedProducts);
    
    return products;
  } catch (error) {
    console.error(`Error fetching SanMar product ${style}:`, error);
    return [];
  }
}

/**
 * Fetch multiple products by style codes
 */
export async function fetchSanMarProductsByStyles(styles: string[]): Promise<Product[]> {
  const fetchPromises = styles.map(style => fetchSanMarProductByStyle(style));
  const results = await Promise.allSettled(fetchPromises);
  
  const products: Product[] = [];
  
  for (const result of results) {
    if (result.status === 'fulfilled') {
      products.push(...result.value);
    } else {
      console.error('Error fetching product:', result.reason);
    }
  }
  
  return products;
}

/**
 * Fetch all configured SanMar products (36 products)
 */
export async function fetchAllSanMarProducts(): Promise<Product[]> {
  const styleCodes = getAllStyleCodes();
  return fetchSanMarProductsByStyles(styleCodes);
}

/**
 * Fetch products by category slug
 */
export async function fetchSanMarProductsByCategory(
  categorySlug: 'workwear' | 'activewear' | 'woven-shirts' | 'personal-protection'
): Promise<Product[]> {
  const styleCodes = getStyleCodesByCategory(categorySlug);
  return fetchSanMarProductsByStyles(styleCodes);
}

// ============================================================================
// BATCH LOADING WITH PROGRESS
// ============================================================================

export interface ProductFetchProgress {
  total: number;
  loaded: number;
  products: Product[];
}

/**
 * Fetch products in batches with progress tracking
 */
export async function fetchSanMarProductsWithProgress(
  styles: string[],
  batchSize: number = 5,
  onProgress?: (progress: ProductFetchProgress) => void
): Promise<Product[]> {
  const total = styles.length;
  const allProducts: Product[] = [];
  
  for (let i = 0; i < styles.length; i += batchSize) {
    const batch = styles.slice(i, i + batchSize);
    const products = await fetchSanMarProductsByStyles(batch);
    
    allProducts.push(...products);
    
    if (onProgress) {
      onProgress({
        total,
        loaded: Math.min(i + batchSize, total),
        products: allProducts,
      });
    }
  }
  
  return allProducts;
}
