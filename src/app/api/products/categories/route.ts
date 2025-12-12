// API Route: Get all product categories
// Endpoint: GET /api/products/categories
// Returns: Categorized product structure with counts

import { NextResponse } from 'next/server';
import { fetchAllSanMarProducts } from '@/lib/api/sanmar-fetcher';
import { normalizeVendorProductsBatch } from '@/lib/vendors/product-normalizer';
import { ProductCategorizer } from '@/lib/taxonomy/product-categorizer';
import { extractBrands } from '@/lib/taxonomy/brand-extractor';
import { CATEGORY_TAXONOMY } from '@/lib/taxonomy/category-definitions';
import type { RawVendorProduct } from '@/types/vendors';

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Convert SanMar Product to RawVendorProduct
 */
function sanMarToRawVendorProduct(product: any): RawVendorProduct {
  return {
    vendorId: 'sanmar',
    vendorName: 'SanMar',
    vendorProductId: product.id || 'unknown',
    rawBrandName: product.category?.name || 'Unknown',
    rawProductTitle: product.name,
    rawDescription: typeof product.description === 'string' ? product.description : '',
    rawImages: product.images || [],
    rawFeatures: product.features || [],
    rawTags: product.tags || [],
    isCustomizable: product.isCustomizable || true
  };
}

// ============================================================================
// GET HANDLER
// ============================================================================

export async function GET() {
  try {
    // 1. Fetch products from SanMar
    const sanMarProducts = await fetchAllSanMarProducts();

    // 2. Convert to RawVendorProduct format
    const rawProducts = sanMarProducts.map(sanMarToRawVendorProduct);

    // 3. Normalize products (hide vendor, preserve brands)
    const { successful: normalizedProducts } = normalizeVendorProductsBatch(rawProducts);

    // 4. Categorize products
    const categorizer = new ProductCategorizer();
    normalizedProducts.forEach(product => {
      product.categories = categorizer.categorizeProduct(product);
    });

    // 5. Extract brands
    const brands = extractBrands(normalizedProducts);

    // 6. Count products per category
    const categoryMap = categorizer.categorizeProducts(normalizedProducts);

    // 7. Build response
    const categories = [
      // Featured Products
      {
        id: 'featured',
        slug: 'featured',
        name: 'Featured Products',
        description: 'New arrivals, on sale, and best sellers',
        subcategories: CATEGORY_TAXONOMY.featured.subcategories.map(sub => ({
          id: sub.id,
          slug: sub.slug,
          name: sub.name,
          description: sub.description,
          icon: sub.icon,
          productCount: categoryMap.get(`featured/${sub.id}`)?.length || 0
        }))
      },

      // By Type
      {
        id: 'by-type',
        slug: 'by-type',
        name: 'By Type',
        description: 'Browse products by category',
        subcategories: CATEGORY_TAXONOMY.byType.subcategories.map(sub => ({
          id: sub.id,
          slug: sub.slug,
          name: sub.name,
          description: sub.description,
          icon: sub.icon,
          productCount: categoryMap.get(`by-type/${sub.id}`)?.length || 0
        }))
      },

      // By Brand
      {
        id: 'by-brand',
        slug: 'by-brand',
        name: 'By Brand',
        description: 'Browse products by brand',
        subcategories: brands.map(brand => ({
          id: brand.id,
          slug: brand.slug,
          name: brand.name,
          description: `Products from ${brand.name}`,
          productCount: brand.productCount
        }))
      }
    ];

    return NextResponse.json(
      {
        success: true,
        categories,
        stats: {
          totalProducts: normalizedProducts.length,
          totalBrands: brands.length,
          totalCategories: categories.reduce((sum, cat) => sum + cat.subcategories.length, 0)
        }
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=172800' // 24h cache, 48h stale
        }
      }
    );

  } catch (error) {
    console.error('Error in /api/products/categories:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch product categories',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
