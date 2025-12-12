// API Route: Get products by brand
// Endpoint: GET /api/products/brand/[slug]
// Example: GET /api/products/brand/sport-tek

import { NextRequest, NextResponse } from 'next/server';
import { fetchAllSanMarProducts } from '@/lib/api/sanmar-fetcher';
import { normalizeVendorProductsBatch } from '@/lib/vendors/product-normalizer';
import { filterProductsByBrand, findBrandBySlug, extractBrands } from '@/lib/taxonomy/brand-extractor';
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

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const brandSlug = params.slug;

    // 1. Fetch products from SanMar
    const sanMarProducts = await fetchAllSanMarProducts();

    // 2. Convert and normalize
    const rawProducts = sanMarProducts.map(sanMarToRawVendorProduct);
    const { successful: normalizedProducts } = normalizeVendorProductsBatch(rawProducts);

    // 3. Extract all brands
    const allBrands = extractBrands(normalizedProducts);

    // 4. Find requested brand
    const brand = findBrandBySlug(allBrands, brandSlug);

    if (!brand) {
      return NextResponse.json(
        {
          success: false,
          error: 'Brand not found',
          message: `No brand found with slug: ${brandSlug}`
        },
        { status: 404 }
      );
    }

    // 5. Filter products by brand
    const brandProducts = filterProductsByBrand(normalizedProducts, brandSlug);

    // 6. Return response
    return NextResponse.json(
      {
        success: true,
        brand: {
          id: brand.id,
          slug: brand.slug,
          name: brand.name, // ✅ Visible (Sport-Tek, Port Authority, etc.)
          productCount: brand.productCount
        },
        products: brandProducts.map(p => ({
          id: p.id,
          name: p.name,
          brand: p.brand, // ✅ Visible
          shortDescription: p.shortDescription,
          images: p.images,
          features: p.features,
          isCustomizable: p.isCustomizable
          // ❌ _vendor NOT included
        })),
        totalProducts: brandProducts.length
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=43200, stale-while-revalidate=86400' // 12h cache, 24h stale
        }
      }
    );

  } catch (error) {
    console.error(`Error in /api/products/brand/${params.slug}:`, error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch brand products',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
