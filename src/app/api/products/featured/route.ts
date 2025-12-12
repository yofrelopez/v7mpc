// API Route: Get featured products
// Endpoint: GET /api/products/featured
// Returns: New arrivals, on sale, and best sellers

import { NextResponse } from 'next/server';
import { fetchAllSanMarProducts } from '@/lib/api/sanmar-fetcher';
import { normalizeVendorProductsBatch } from '@/lib/vendors/product-normalizer';
import { ProductCategorizer, getProductsByCategory } from '@/lib/taxonomy/product-categorizer';
import type { RawVendorProduct } from '@/types/vendors';

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

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

function formatProduct(p: any) {
  return {
    id: p.id,
    name: p.name,
    brand: p.brand, // ✅ Visible
    shortDescription: p.shortDescription,
    images: p.images,
    features: p.features,
    isCustomizable: p.isCustomizable
    // ❌ _vendor NOT included
  };
}

// ============================================================================
// GET HANDLER
// ============================================================================

export async function GET() {
  try {
    // 1. Fetch products from SanMar
    const sanMarProducts = await fetchAllSanMarProducts();

    // 2. Convert and normalize
    const rawProducts = sanMarProducts.map(sanMarToRawVendorProduct);
    const { successful: normalizedProducts } = normalizeVendorProductsBatch(rawProducts);

    // 3. Categorize all products
    const categorizer = new ProductCategorizer();
    normalizedProducts.forEach(product => {
      product.categories = categorizer.categorizeProduct(product);
    });

    // 4. Get featured products
    const newArrivals = getProductsByCategory(normalizedProducts, 'featured', 'new-arrivals');
    const onSale = getProductsByCategory(normalizedProducts, 'featured', 'on-sale');
    const bestSellers = getProductsByCategory(normalizedProducts, 'featured', 'best-sellers');

    // 5. Return response
    return NextResponse.json(
      {
        success: true,
        featured: {
          newArrivals: newArrivals.slice(0, 12).map(formatProduct),
          onSale: onSale.slice(0, 12).map(formatProduct),
          bestSellers: bestSellers.slice(0, 12).map(formatProduct)
        },
        stats: {
          newArrivalsCount: newArrivals.length,
          onSaleCount: onSale.length,
          bestSellersCount: bestSellers.length
        }
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=43200' // 6h cache, 12h stale
        }
      }
    );

  } catch (error) {
    console.error('Error in /api/products/featured:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch featured products',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
