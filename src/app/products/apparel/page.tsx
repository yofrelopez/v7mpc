import { mockProducts } from '@/lib/data/mockData';
import { fetchAllSanMarProducts } from '@/lib/api/sanmar-fetcher';
import ApparelContent from './ApparelContent';

export default async function ApparelPage() {
  // Fetch SanMar products (server-side)
  let sanMarProducts: Awaited<ReturnType<typeof fetchAllSanMarProducts>> = [];
  try {
    sanMarProducts = await fetchAllSanMarProducts();
  } catch (error) {
    console.error('Error loading SanMar products:', error);
  }

  // Combine mock products with SanMar products
  const allProducts = [...mockProducts, ...sanMarProducts];
  
  // Filter to only apparel category
  const categoryProducts = allProducts.filter(
    product => product.category.slug === 'apparel'
  );

  return <ApparelContent products={categoryProducts} />;
}