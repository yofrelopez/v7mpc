// ============================================================================
// SANMAR PRODUCTS SERVER ACTIONS - Next.js Server Actions with Cache
// ============================================================================
'use server';

import { unstable_cache } from 'next/cache';
import { fetchAllSanMarProducts, fetchSanMarProductsByCategory } from './sanmar-server-loader';
import type { Product } from '@/types/products';

// ============================================================================
// CACHE CONFIGURATION
// ============================================================================

const CACHE_TAGS = {
  ALL_SANMAR_PRODUCTS: 'sanmar-all-products',
  WORKWEAR: 'sanmar-workwear',
  ACTIVEWEAR: 'sanmar-activewear',
  WOVEN_SHIRTS: 'sanmar-woven-shirts',
  PERSONAL_PROTECTION: 'sanmar-personal-protection',
} as const;

const CACHE_REVALIDATE = 60 * 60 * 24; // 24 hours

// ============================================================================
// CACHED FETCH FUNCTIONS
// ============================================================================

/**
 * Get all SanMar products with cache (36 products)
 * Cache: 24 hours
 */
export const getSanMarProducts = unstable_cache(
  async (): Promise<Product[]> => {
    try {
      console.log('🔄 Fetching all SanMar products from API...');
      const products = await fetchAllSanMarProducts();
      console.log(`✅ Fetched ${products.length} SanMar products`);
      return products;
    } catch (error) {
      console.error('❌ Error fetching SanMar products:', error);
      return [];
    }
  },
  ['sanmar-all-products'],
  {
    revalidate: CACHE_REVALIDATE,
    tags: [CACHE_TAGS.ALL_SANMAR_PRODUCTS],
  }
);

/**
 * Get Workwear products with cache (9 products)
 */
export const getWorkwearProducts = unstable_cache(
  async (): Promise<Product[]> => {
    try {
      console.log('🔄 Fetching Workwear products from API...');
      const products = await fetchSanMarProductsByCategory('workwear');
      console.log(`✅ Fetched ${products.length} Workwear products`);
      return products;
    } catch (error) {
      console.error('❌ Error fetching Workwear products:', error);
      return [];
    }
  },
  ['sanmar-workwear'],
  {
    revalidate: CACHE_REVALIDATE,
    tags: [CACHE_TAGS.WORKWEAR],
  }
);

/**
 * Get Activewear products with cache (9 products)
 */
export const getActivewearProducts = unstable_cache(
  async (): Promise<Product[]> => {
    try {
      console.log('🔄 Fetching Activewear products from API...');
      const products = await fetchSanMarProductsByCategory('activewear');
      console.log(`✅ Fetched ${products.length} Activewear products`);
      return products;
    } catch (error) {
      console.error('❌ Error fetching Activewear products:', error);
      return [];
    }
  },
  ['sanmar-activewear'],
  {
    revalidate: CACHE_REVALIDATE,
    tags: [CACHE_TAGS.ACTIVEWEAR],
  }
);

/**
 * Get Woven Shirts products with cache (9 products)
 */
export const getWovenShirtsProducts = unstable_cache(
  async (): Promise<Product[]> => {
    try {
      console.log('🔄 Fetching Woven Shirts products from API...');
      const products = await fetchSanMarProductsByCategory('woven-shirts');
      console.log(`✅ Fetched ${products.length} Woven Shirts products`);
      return products;
    } catch (error) {
      console.error('❌ Error fetching Woven Shirts products:', error);
      return [];
    }
  },
  ['sanmar-woven-shirts'],
  {
    revalidate: CACHE_REVALIDATE,
    tags: [CACHE_TAGS.WOVEN_SHIRTS],
  }
);

/**
 * Get Personal Protection products with cache (9 products)
 */
export const getPersonalProtectionProducts = unstable_cache(
  async (): Promise<Product[]> => {
    try {
      console.log('🔄 Fetching Personal Protection products from API...');
      const products = await fetchSanMarProductsByCategory('personal-protection');
      console.log(`✅ Fetched ${products.length} Personal Protection products`);
      return products;
    } catch (error) {
      console.error('❌ Error fetching Personal Protection products:', error);
      return [];
    }
  },
  ['sanmar-personal-protection'],
  {
    revalidate: CACHE_REVALIDATE,
    tags: [CACHE_TAGS.PERSONAL_PROTECTION],
  }
);

// ============================================================================
// CACHE INVALIDATION (For future use - e.g., admin panel)
// ============================================================================

/**
 * Manually revalidate cache for all SanMar products
 * Usage: Call this from an admin panel or cron job
 */
export async function revalidateSanMarCache() {
  const { revalidateTag } = await import('next/cache');

  Object.values(CACHE_TAGS).forEach(tag => {
    revalidateTag(tag);
  });

  return { success: true, message: 'SanMar product cache invalidated' };
}
