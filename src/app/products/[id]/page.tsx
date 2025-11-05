import { notFound } from 'next/navigation';
import { mockProducts } from '@/lib/data/mockData';
import ProductDetailView from '@/components/products/ProductDetailView';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  // Find product by ID in mockProducts
  const product = mockProducts.find(p => p.id === params.id);

  // If product not found, show 404
  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps) {
  const product = mockProducts.find(p => p.id === params.id);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} | V7MPC`,
    description: product.shortDescription || product.name,
  };
}

// Generate static paths for better performance (optional)
export async function generateStaticParams() {
  return mockProducts.map((product) => ({
    id: product.id,
  }));
}