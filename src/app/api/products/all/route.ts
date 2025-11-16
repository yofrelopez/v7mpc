import { NextResponse } from 'next/server';
import { mockProducts } from '@/lib/data/mockData';
import { fetchAllSanMarProducts } from '@/lib/api/sanmar-fetcher';

/**
 * GET /api/products/all
 * Returns all products (mock + SanMar combined)
 * Cached for 5 minutes for performance
 */
export async function GET() {
  try {
    // Fetch SanMar products
    let sanMarProducts: Awaited<ReturnType<typeof fetchAllSanMarProducts>> = [];
    
    try {
      sanMarProducts = await fetchAllSanMarProducts();
    } catch (sanMarError) {
      console.error('Error fetching SanMar products (continuing with mock only):', sanMarError);
      // Continue with just mock products if SanMar fails
    }

    // Combine both sources
    const allProducts = [...mockProducts, ...sanMarProducts];

    // Return with cache headers (5 minutes)
    return NextResponse.json(
      {
        success: true,
        count: allProducts.length,
        products: allProducts
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (error) {
    console.error('Error in /api/products/all:', error);
    
    // Fallback to mock products only
    return NextResponse.json(
      {
        success: true,
        count: mockProducts.length,
        products: mockProducts,
        warning: 'Using mock products only due to API error'
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=60',
        },
      }
    );
  }
}

// Enable static optimization where possible
export const dynamic = 'force-dynamic';
export const revalidate = 300; // 5 minutes
