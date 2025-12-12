// Dynamic Brand Page
// Route: /products/brand/[slug]
// Example: /products/brand/sport-tek

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CategoryGrid from '@/components/products/CategoryGrid';

// ============================================================================
// TYPES
// ============================================================================

interface Product {
  id: string;
  name: string;
  brand?: string;
  shortDescription?: string;
  category: {
    id: string;
    slug: string;
    name: string;
  };
  images: string[];
  features: string[];
  isCustomizable: boolean;
}

interface Brand {
  id: string;
  slug: string;
  name: string;
  description?: string;
}

interface BrandPageResponse {
  success: boolean;
  brand: Brand;
  products: Product[];
  totalProducts: number;
}

// ============================================================================
// METADATA
// ============================================================================

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.v7mpc.com';
    const response = await fetch(
      `${siteUrl}/api/products/brand/${params.slug}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!response.ok) {
      return {
        title: 'Brand Not Found | V7MPC',
        description: 'The requested brand could not be found.',
      };
    }

    const data: BrandPageResponse = await response.json();

    if (!data.success || !data.brand) {
      return {
        title: 'Brand Not Found | V7MPC',
        description: 'The requested brand could not be found.',
      };
    }

    const { brand, totalProducts } = data;

    return {
      title: `${brand.name} Products | V7MPC`,
      description:
        brand.description ||
        `Browse our selection of ${totalProducts} ${brand.name} products. Custom branded merchandise from V7 Marketplace Corporation.`,
      keywords: [
        brand.name,
        'custom products',
        'promotional items',
        'branded merchandise',
        'V7MPC',
      ],
      openGraph: {
        type: 'website',
        url: `${siteUrl}/products/brand/${params.slug}`,
        title: `${brand.name} | V7MPC`,
        description: brand.description || `Browse ${totalProducts} ${brand.name} products`,
        siteName: 'V7 Marketplace Corporation',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${brand.name} | V7MPC`,
        description: brand.description || `Browse ${totalProducts} ${brand.name} products`,
      },
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `${siteUrl}/products/brand/${params.slug}`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Products | V7MPC',
      description: 'Browse our product catalog',
    };
  }
}

// ============================================================================
// PAGE COMPONENT
// ============================================================================

export default async function BrandPage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(
      `${siteUrl}/api/products/brand/${params.slug}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!response.ok) {
      notFound();
    }

    const data: BrandPageResponse = await response.json();

    if (!data.success || !data.brand) {
      notFound();
    }

    const { brand, products } = data;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        {/* Brand Hero */}
        <section className="relative bg-gradient-to-r from-amber-600 to-amber-700 text-white py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl">
              <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-4">
                Brand
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {brand.name}
              </h1>
              {brand.description && (
                <p className="text-lg md:text-xl text-amber-100">
                  {brand.description}
                </p>
              )}
              <p className="mt-4 text-sm text-amber-200">
                {products.length} {products.length === 1 ? 'product' : 'products'} available
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6">
            <CategoryGrid
              products={products}
              categoryName={`${brand.name} Products`}
              showSorting={true}
              showViewToggle={true}
              itemsPerPage={12}
            />
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error('Error loading brand page:', error);
    notFound();
  }
}
