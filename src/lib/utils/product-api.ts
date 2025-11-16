/**
 * Product API Client
 * Centralized client for fetching products from API
 */

import { Product } from '@/types/products';

interface ProductsApiResponse {
  success: boolean;
  count: number;
  products: Product[];
  warning?: string;
}

/**
 * Fetches all products from the API (mock + SanMar combined)
 * Includes client-side caching
 */
export async function fetchAllProducts(): Promise<Product[]> {
  try {
    const response = await fetch('/api/products/all', {
      // Use Next.js cache for 5 minutes
      next: { revalidate: 300 }
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: ProductsApiResponse = await response.json();

    if (data.warning) {
      console.warn('Products API warning:', data.warning);
    }

    return data.products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

/**
 * Searches products by query string
 * Client-side filtering for immediate feedback
 */
export function searchProducts(products: Product[], query: string): Product[] {
  if (!query.trim()) return products;

  const lowercaseQuery = query.toLowerCase();
  
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.shortDescription?.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    product.category.name.toLowerCase().includes(lowercaseQuery)
  );
}

/**
 * Filters products by category
 */
export function filterProductsByCategory(
  products: Product[], 
  categorySlug: string
): Product[] {
  if (categorySlug === 'all') return products;
  return products.filter(p => p.category.slug === categorySlug);
}
