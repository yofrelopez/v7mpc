'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ZoomIn } from 'lucide-react';
import { Product } from '@/types/products';

interface ProductImageGalleryProps {
  product: Product;
}

export default function ProductImageGallery({ product }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  
  // For now, we'll use the first image repeated for different angles/views
  const images = product.images.length > 0 ? [
    product.images[0],
    product.images[0], // Placeholder - would be different angles  
    product.images[0], // Placeholder - would be different angles
    product.images[0]  // Placeholder - would be different angles
  ] : [
    '/placeholder-product.jpg', // Fallback placeholder
    '/placeholder-product.jpg',
    '/placeholder-product.jpg', 
    '/placeholder-product.jpg'
  ];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden group shadow-sm border border-gray-100">
        <Image
          src={images[selectedImage]}
          alt={product.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          priority
        />
        
        {/* Zoom Icon */}
        <div className="absolute inset-0 bg-slate-600 bg-opacity-0 group-hover:bg-opacity-10 transition-colors flex items-center justify-center">
          <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Sample Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-white bg-opacity-90 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">
            Sample Image
          </span>
        </div>
      </div>

      {/* Thumbnail Images */}
      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative aspect-square bg-gray-50 rounded-md overflow-hidden border-2 transition-colors ${
              selectedImage === index 
                ? 'border-slate-600' 
                : 'border-transparent hover:border-slate-300'
            }`}
          >
            <Image
              src={image}
              alt={`${product.name} view ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Image Navigation Dots */}
      <div className="flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              selectedImage === index ? 'bg-slate-600' : 'bg-slate-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}