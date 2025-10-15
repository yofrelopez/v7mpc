import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-neutral-200 hover:border-primary/50">
      {/* Product Image */}
      <div className="relative overflow-hidden rounded-t-lg">
        <div className="aspect-[4/3] bg-neutral-100">
          {product.images && product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-400">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.customizable && (
            <Badge className="bg-accent text-white text-xs">
              Customizable
            </Badge>
          )}
          {product.bulkPricing && (
            <Badge className="bg-primary text-white text-xs">
              Bulk Pricing
            </Badge>
          )}
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-neutral-900 line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </CardTitle>
            <CardDescription className="text-sm text-neutral-600 mt-1">
              {product.category.name}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm text-neutral-700 line-clamp-3 mb-4">
          {product.description}
        </p>

        {/* Features */}
        {product.features && product.features.length > 0 && (
          <div className="mb-4">
            <ul className="text-xs text-neutral-600 space-y-1">
              {product.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-primary mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Min Quantity */}
        {product.minQuantity && (
          <div className="text-xs text-neutral-500 mb-4">
            Min. Quantity: {product.minQuantity} units
          </div>
        )}

        {/* Brands */}
        {product.brands && product.brands.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {product.brands.slice(0, 2).map((brand, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {brand}
              </Badge>
            ))}
            {product.brands.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{product.brands.length - 2} more
              </Badge>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="flex-1 border-primary text-primary hover:bg-primary hover:text-white"
          >
            <Link href={`/productos/${product.slug}`}>
              View Details
            </Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="flex-1 bg-accent hover:bg-accent-dark text-white"
          >
            <Link href={`/cotizacion?product=${product.id}`}>
              Request Quote
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}