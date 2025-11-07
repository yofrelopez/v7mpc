import { mockProducts } from '@/lib/data/mockData';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import ProductsPageClient from './ProductsPageClient';

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
  },
};

export default function ProductsPage() {
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

  return (
    <>
      {/* Structured Data */}
      <BreadcrumbJsonLd items={breadcrumbItems} />
      
      {/* Main Content */}
      <ProductsPageClient />
    </>
  );
}