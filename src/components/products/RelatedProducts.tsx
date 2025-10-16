import Link from 'next/link';
import { mockProducts } from '@/lib/data/mockData';
import { Product } from '@/types/products';
import ProductCard from './ProductCard';

interface RelatedProductsProps {
  currentProduct: Product;
  maxItems?: number;
}

export default function RelatedProducts({ currentProduct, maxItems = 4 }: RelatedProductsProps) {
  // Get products from the same category, excluding the current product
  const relatedProducts = mockProducts
    .filter(product => 
      product.category.slug === currentProduct.category.slug && 
      product.id !== currentProduct.id
    )
    .slice(0, maxItems);

  // If not enough products in same category, fill with products from other categories
  if (relatedProducts.length < maxItems) {
    const additionalProducts = mockProducts
      .filter(product => 
        product.category.slug !== currentProduct.category.slug && 
        product.id !== currentProduct.id
      )
      .slice(0, maxItems - relatedProducts.length);
    
    relatedProducts.push(...additionalProducts);
  }

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Related Products
        </h2>
        <Link 
          href="/productos" 
          className="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors"
        >
          View all products →
        </Link>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Category Navigation */}
      <div className="mt-8 text-center">
        <p className="text-slate-600 mb-4">
          Explore more products in <strong>{currentProduct.category.name}</strong>
        </p>
        <Link
          href={`/productos?category=${currentProduct.category.slug}`}
          className="inline-flex items-center px-4 py-2 bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 transition-colors font-medium"
        >
          Browse {currentProduct.category.name}
        </Link>
      </div>
    </section>
  );
}