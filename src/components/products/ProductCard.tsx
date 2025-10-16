// ProductCard - Enhanced Version
// Professional B2B product card with direct action

import Link from 'next/link';
import { Product } from '@/types/products';
import { Button } from '@/components/ui/button';
import { MessageCircle, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Create URLs for navigation
  const productUrl = `/productos/${product.id}`;
  const quoteUrl = `/cotizacion?product=${encodeURIComponent(product.name)}&id=${encodeURIComponent(product.id)}`;

  return (
    <div className="bg-white rounded-lg md:rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      {/* Product Image and Info - Clickable */}
      <Link href={productUrl} className="block">
        {/* Imagen del producto */}
        <div className="relative h-32 sm:h-40 md:h-48 bg-slate-100 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
            <span className="text-slate-500 text-xs sm:text-sm font-medium text-center px-2">
              {product.name}
            </span>
          </div>
          
          {/* Customizable Badge */}
          {product.isCustomizable && (
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
              <span className="bg-white/80 text-slate-600 text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-light backdrop-blur-sm">
                <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 inline mr-0.5 sm:mr-1" />
                <span className="hidden sm:inline">Customizable</span>
                <span className="sm:hidden">Custom</span>
              </span>
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div className="p-3 sm:p-4 md:p-5 pb-2 sm:pb-3">
          <div className="mb-2 sm:mb-3">
            <h3 className="font-medium text-slate-800 mb-1 text-sm sm:text-sm md:text-base group-hover:text-slate-600 transition-colors line-clamp-2">
              {product.name}
            </h3>
            
            <p className="text-slate-600 text-xs sm:text-xs mb-1 sm:mb-2 line-clamp-2 leading-tight hidden sm:block">
              {product.description.length > 80 ? `${product.description.substring(0, 80)}...` : product.description}
            </p>
          </div>
          
          {/* Features - Hidden on mobile for space */}
          {product.features && product.features.length > 0 && (
            <div className="mb-2 sm:mb-3 hidden sm:block">
              <div className="flex flex-wrap gap-1">
                {product.features.slice(0, 2).map((feature, index) => (
                  <span 
                    key={index}
                    className="text-xs bg-slate-50 text-slate-600 px-1.5 py-0.5 rounded border"
                  >
                    {feature}
                  </span>
                ))}
                {product.features.length > 2 && (
                  <span className="text-xs text-slate-400">
                    +{product.features.length - 2}
                  </span>
                )}
              </div>
            </div>
          )}
          
          {/* Category */}
          <span className="text-xs bg-slate-100 text-slate-700 px-2 sm:px-3 py-1 rounded-full font-medium">
            {product.category.name}
          </span>
        </div>
      </Link>

      {/* Action Button - Outside link to prevent nested interactives */}
      <div className="px-3 sm:px-4 md:px-5 pb-3 sm:pb-4 md:pb-5">
        <Button
          asChild
          size="sm"
          className="bg-slate-600 hover:bg-slate-700 text-white font-medium px-3 sm:px-4 py-1.5 rounded-lg transition-all duration-200 hover:shadow-md text-xs sm:text-sm w-full"
        >
          <Link href={quoteUrl}>
            <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            <span>Request Quote</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}