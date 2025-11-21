import { notFound } from 'next/navigation';
import { mockProducts } from '@/lib/data/mockData';
import { fetchAllSanMarProducts } from '@/lib/api/sanmar-fetcher';
import ProductDetailView from '@/components/products/ProductDetailView';
import { ContentBlock } from '@/types/products';
import { ProductJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export default async function ProductPage(props: PageProps<'/products/[id]'>) {
  const { id } = await props.params;
  
  // Find product by ID in mockProducts first
  let product = mockProducts.find(p => p.id === id);

  // If not found in mock, try SanMar products
  if (!product) {
    try {
      const sanMarProducts = await fetchAllSanMarProducts();
      product = sanMarProducts.find(p => p.id === id);
    } catch (error) {
      console.error('Error fetching SanMar products:', error);
    }
  }

  // If product not found in either source, show 404
  if (!product) {
    notFound();
  }

  // Generate breadcrumb data for structured data
  const breadcrumbItems = [
    {
      name: 'Home',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://v7mpc.com'
    },
    {
      name: 'Products',
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://v7mpc.com'}/products`
    },
    {
      name: product.category.name,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://v7mpc.com'}/products?category=${product.category.slug}`
    },
    {
      name: product.name,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://v7mpc.com'}/products/${product.id}`
    }
  ];

  return (
    <>
      {/* Structured Data */}
      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      
      {/* Main Content */}
      <ProductDetailView product={product} />
    </>
  );
}

// Generate metadata for SEO
export async function generateMetadata(props: PageProps<'/products/[id]'>) {
  const { id } = await props.params;
  
  // Find product in mockProducts first
  let product = mockProducts.find(p => p.id === id);

  // If not found, try SanMar
  if (!product) {
    try {
      const sanMarProducts = await fetchAllSanMarProducts();
      product = sanMarProducts.find(p => p.id === id);
    } catch (error) {
      console.error('Error fetching SanMar products for metadata:', error);
    }
  }

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }

  // Extract text content from description array
  const textContent = Array.isArray(product.description)
    ? product.description
        .filter((block: ContentBlock) => block.type === 'text')
        .map((block: ContentBlock) => block.content)
        .join(' ')
    : product.description;
  
  const metaDescription = textContent.length > 160 
    ? textContent.substring(0, 157) + '...'
    : textContent || product.shortDescription;

  // Get the first image for OG
  const productImage = product.images[0] || 'https://www.v7mpc.com/images/og/solutions-hero.jpg';

  return {
    title: product.name,
    description: metaDescription,
    keywords: [
      ...product.tags,
      product.category.name,
      'custom',
      'professional',
      'high-quality',
      'V7MPC'
    ],
    openGraph: {
      title: `${product.name} | V7MPC`,
      description: metaDescription,
      images: [
        {
          url: productImage,
          width: 1200,
          height: 630,
          alt: `${product.name} - Professional custom product by V7MPC`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | V7MPC`,
      description: metaDescription,
      images: [productImage],
    },
    // Additional product metadata
    other: {
      'product:brand': 'V7MPC',
      'product:availability': product.isCustomizable ? 'in_stock' : 'available_for_order',
      'product:category': product.category.name,
      'product:condition': 'new',
    },
  };
}

// Generate static paths for better performance (optional)
export async function generateStaticParams() {
  return mockProducts.map((product) => ({
    id: product.id,
  }));
}