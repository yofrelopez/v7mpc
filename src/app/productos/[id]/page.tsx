import { notFound } from 'next/navigation';
import { mockProducts } from '@/lib/data/mockData';
import ProductDetailView from '@/components/products/ProductDetailView';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = mockProducts.find(p => p.id === params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}

// Generate static params for all products (optional - for better performance)
export async function generateStaticParams() {
  return mockProducts.map((product) => ({
    id: product.id,
  }));
}