'use client';

import { useState } from 'react';
import { ArrowLeft, Share2, Heart, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Product } from '@/types/products';
import ProductImageGallery from './ProductImageGallery';
import ProductSpecifications from './ProductSpecifications';
import ProductCustomization from './ProductCustomization';
import RelatedProducts from './RelatedProducts';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

interface ProductDetailViewProps {
  product: Product;
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const router = useRouter();
  const [selectedQuantity, setSelectedQuantity] = useState(100);

  const handleRequestQuote = () => {
    const params = new URLSearchParams({
      product: product.name,
      productId: product.id,
      quantity: selectedQuantity.toString()
    });
    router.push(`/cotizacion?${params.toString()}`);
  };

  const handleBackToProducts = () => {
    router.push('/productos');
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumbs */}
        <Breadcrumbs 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/productos' },
            { label: product.category.name, href: `/productos?category=${product.category.slug}` },
            { label: product.name, href: '#', current: true }
          ]}
        />

        {/* Back Button */}
        <button
          onClick={handleBackToProducts}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </button>

        {/* Main Product Section - 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <ProductImageGallery product={product} />
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Category Badge */}
            <div className="flex items-center gap-3">
              <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">
                {product.category.name}
              </span>
              <div className="flex items-center gap-2">
                <button className="text-slate-400 hover:text-slate-600 transition-colors">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="text-slate-400 hover:text-slate-600 transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Product Title */}
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-3">
                {product.name}
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Key Features */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Key Features
              </h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-slate-600 rounded-full mt-2 shrink-0" />
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity Selection */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Minimum Order Quantity
              </h3>
              <div className="flex items-center gap-4">
                <select
                  value={selectedQuantity}
                  onChange={(e) => setSelectedQuantity(Number(e.target.value))}
                  className="border border-slate-300 rounded-md px-4 py-2 text-slate-700 focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                >
                  <option value={50}>50 units</option>
                  <option value={100}>100 units</option>
                  <option value={250}>250 units</option>
                  <option value={500}>500 units</option>
                  <option value={1000}>1,000 units</option>
                  <option value={2500}>2,500 units</option>
                </select>
                <span className="text-sm text-slate-500">
                  Bulk pricing available
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 pt-4">
              <button
                onClick={handleRequestQuote}
                className="w-full bg-slate-600 text-white py-3 px-6 rounded-md hover:bg-slate-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <ShoppingCart className="h-5 w-5" />
                Request Quote for {selectedQuantity} units
              </button>
              
              <button className="w-full border border-slate-300 text-slate-700 py-3 px-6 rounded-md hover:bg-slate-50 transition-colors font-medium">
                Contact for Bulk Orders
              </button>
            </div>

            {/* Quick Info */}
            <div className="bg-slate-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">Lead Time:</span>
                <span className="font-medium text-slate-900">10-15 business days</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">Customization:</span>
                <span className="font-medium text-slate-900">Logo, Colors, Text</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">Sample:</span>
                <span className="font-medium text-slate-900">Available upon request</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Specifications */}
        <ProductSpecifications product={product} />
        
        {/* Customization Options */}
        <ProductCustomization product={product} />

        {/* Related Products */}
        <RelatedProducts currentProduct={product} />
      </div>
    </div>
  );
}