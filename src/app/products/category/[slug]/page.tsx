// Dynamic Category Page
// Route: /products/category/[slug]
// Example: /products/category/t-shirts

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
  categories?: Array<{
    categoryId: string;
    subcategoryId: string;
    confidence: number;
  }>;
}

interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  icon?: string;
}

interface CategoryPageResponse {
  success: boolean;
  category: Category;
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
      `${siteUrl}/api/products/category/${params.slug}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!response.ok) {
      return {
        title: 'Category Not Found | V7MPC',
        description: 'The requested category could not be found.',
      };
    }

    const data: CategoryPageResponse = await response.json();

    if (!data.success || !data.category) {
      return {
        title: 'Category Not Found | V7MPC',
        description: 'The requested category could not be found.',
      };
    }

    const { category, totalProducts } = data;

    return {
      title: `${category.name} | V7MPC Products`,
      description:
        category.description ||
        `Browse our selection of ${totalProducts} ${category.name.toLowerCase()} products. Custom branded merchandise from V7 Marketplace Corporation.`,
      keywords: [
        category.name,
        'custom products',
        'promotional items',
        'branded merchandise',
        'V7MPC',
      ],
      openGraph: {
        type: 'website',
        url: `${siteUrl}/products/category/${params.slug}`,
        title: `${category.name} | V7MPC`,
        description: category.description || `Browse ${totalProducts} ${category.name.toLowerCase()} products`,
        siteName: 'V7 Marketplace Corporation',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${category.name} | V7MPC`,
        description: category.description || `Browse ${totalProducts} ${category.name.toLowerCase()} products`,
      },
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `${siteUrl}/products/category/${params.slug}`,
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

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(
      `${siteUrl}/api/products/category/${params.slug}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!response.ok) {
      notFound();
    }

    const data: CategoryPageResponse = await response.json();

    if (!data.success || !data.category) {
      notFound();
    }

    const { category, products } = data;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        {/* Category Hero */}
        <section className="relative bg-gradient-to-r from-slate-600 to-slate-700 text-white py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {category.name}
              </h1>
              {category.description && (
                <p className="text-lg md:text-xl text-slate-200">
                  {category.description}
                </p>
              )}
              <p className="mt-4 text-sm text-slate-300">
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
              categoryName={category.name}
              showSorting={true}
              showViewToggle={true}
              itemsPerPage={12}
            />
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error('Error loading category page:', error);
    notFound();
  }
}
