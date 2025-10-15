import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProductCategory } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';

interface CategoryCardProps {
  category: ProductCategory;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-neutral-200 hover:border-primary/50 h-full">
      {/* Category Image */}
      <div className="relative overflow-hidden rounded-t-lg">
        <div className="aspect-[4/3] bg-neutral-100">
          {category.image ? (
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-400">
              <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        
        {/* Product count overlay */}
        <div className="absolute top-3 right-3">
          <div className="bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full">
            {category.productCount || 0} products
          </div>
        </div>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold text-neutral-900 group-hover:text-primary transition-colors">
          {category.name}
        </CardTitle>
        <CardDescription className="text-sm text-neutral-600 line-clamp-3">
          {category.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0 flex-1 flex flex-col justify-end">
        <Button
          asChild
          className="w-full bg-secondary hover:bg-secondary-dark text-white font-medium"
        >
          <Link href={`/productos?category=${category.slug}`}>
            View Products
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}