import { mockProducts } from '@/lib/data/mockData';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import ProductsPageClient from './ProductsPageClient';
import { fetchAllSanMarProducts } from '@/lib/api/sanmar-fetcher';

// Generate metadata for the products page
export const metadata = {
  title: 'Professional Products & Custom Solutions',
  description: 'Browse our complete catalog of professional promotional products, custom apparel, recognition items, and branded merchandise. Quality products for businesses and organizations.',
  keywords: [
    'promotional products',
    'custom apparel', 
    'branded merchandise',
    'corporate gifts',
    'recognition items',
    'business products',
    'custom printing',
    'promotional items catalog'
  ],
  openGraph: {
    title: 'Professional Products & Custom Solutions | V7MPC',
    description: 'Browse our complete catalog of professional promotional products, custom apparel, and branded merchandise.',
    type: 'website',
    images: [
      {
        url: 'https://www.v7mpc.com/images/og/solutions-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Professional Products & Custom Solutions | V7MPC',
      },
    ],
  },
};

export default async function ProductsPage() {
  // Generate breadcrumb data for structured data
  const breadcrumbItems = [
    {
      name: 'Home',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://v7mpc.com'
    },
    {
      name: 'Products',
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://v7mpc.com'}/products`
    }
  ];

  // Fetch SanMar products (server-side, cached)
  let sanMarProducts: Awaited<ReturnType<typeof fetchAllSanMarProducts>> = [];
  try {
    sanMarProducts = await fetchAllSanMarProducts();
  } catch (error) {
    console.error('Error loading SanMar products:', error);
    sanMarProducts = [];
  }

  // Combine mock products with SanMar products
  const allProducts = [...mockProducts, ...sanMarProducts];

  return (
    <>
      {/* Structured Data */}
      <BreadcrumbJsonLd items={breadcrumbItems} />
      
      {/* Main Content */}
      <ProductsPageClient products={allProducts} />
    </>
  );
}