// API Route: Get all product brands
// Endpoint: GET /api/products/brands
// Returns: List of all brands with product counts

import { NextResponse } from 'next/server';
import { fetchAllSanMarProducts } from '@/lib/api/sanmar-fetcher';
import { normalizeVendorProductsBatch } from '@/lib/vendors/product-normalizer';
import { extractBrands, getTopBrands } from '@/lib/taxonomy/brand-extractor';
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

    // 3. Extract all brands
    const allBrands = extractBrands(normalizedProducts);
    const topBrands = getTopBrands(normalizedProducts, 10);

    // 4. Return response
    return NextResponse.json(
      {
        success: true,
        brands: allBrands.map(brand => ({
          id: brand.id,
          slug: brand.slug,
          name: brand.name, // ✅ Visible (Sport-Tek, Port Authority, etc.)
          productCount: brand.productCount
        })),
        topBrands: topBrands.map(brand => ({
          id: brand.id,
          slug: brand.slug,
          name: brand.name,
          productCount: brand.productCount
        })),
        stats: {
          totalBrands: allBrands.length,
          totalProducts: normalizedProducts.length
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
    console.error('Error in /api/products/brands:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch product brands',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
