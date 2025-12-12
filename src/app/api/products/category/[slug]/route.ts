// API Route: Get products by category
// Endpoint: GET /api/products/category/[slug]
// Example: GET /api/products/category/t-shirts

import { NextRequest, NextResponse } from 'next/server';
import { fetchAllSanMarProducts } from '@/lib/api/sanmar-fetcher';
import { normalizeVendorProductsBatch } from '@/lib/vendors/product-normalizer';
import { ProductCategorizer, getProductsByCategory } from '@/lib/taxonomy/product-categorizer';
import { getSubcategoryBySlug } from '@/lib/taxonomy/category-definitions';
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
    const slug = params.slug;

    // 1. Find category by slug
    // Try by-type first
    let category = getSubcategoryBySlug('by-type', slug);
    let categoryId = 'by-type';

    // If not found, try featured
    if (!category) {
      category = getSubcategoryBySlug('featured', slug);
      categoryId = 'featured';
    }

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          error: 'Category not found',
          message: `No category found with slug: ${slug}`
        },
        { status: 404 }
      );
    }

    // 2. Fetch products from SanMar
    const sanMarProducts = await fetchAllSanMarProducts();

    // 3. Convert and normalize
    const rawProducts = sanMarProducts.map(sanMarToRawVendorProduct);
    const { successful: normalizedProducts } = normalizeVendorProductsBatch(rawProducts);

    // 4. Categorize all products
    const categorizer = new ProductCategorizer();
    normalizedProducts.forEach(product => {
      product.categories = categorizer.categorizeProduct(product);
    });

    // 5. Filter products by category
    const categoryProducts = getProductsByCategory(
      normalizedProducts,
      categoryId,
      slug
    );

    // 6. Return response
    return NextResponse.json(
      {
        success: true,
        category: {
          id: category.id,
          slug: category.slug,
          name: category.name,
          description: category.description,
          icon: category.icon
        },
        products: categoryProducts.map(p => ({
          id: p.id,
          name: p.name,
          brand: p.brand, // ✅ Visible (Sport-Tek, Port Authority, etc.)
          shortDescription: p.shortDescription,
          images: p.images,
          features: p.features,
          isCustomizable: p.isCustomizable,
          categories: p.categories?.map(c => ({
            categoryId: c.categoryId,
            subcategoryId: c.subcategoryId,
            confidence: c.confidence
          }))
          // ❌ _vendor is NOT included (hidden from API)
        })),
        totalProducts: categoryProducts.length
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=43200, stale-while-revalidate=86400' // 12h cache, 24h stale
        }
      }
    );

  } catch (error) {
    console.error(`Error in /api/products/category/${params.slug}:`, error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch category products',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
