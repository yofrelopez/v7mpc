'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/types/products';

interface ProductImageGalleryProps {
  product: Product;
}

export default function ProductImageGallery({ product }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Use actual product images, with fallback
  const images = product.images.length > 0 ? product.images : ['/placeholder-product.jpg'];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -240, // Scroll by ~3 thumbnails width
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 240, // Scroll by ~3 thumbnails width
        behavior: 'smooth'
      });
    }
  };

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

      {/* Thumbnail Images - Horizontal scroll with navigation */}
      <div className="relative group">
        <div 
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide pb-2" 
          style={{ scrollBehavior: 'smooth' }}
        >
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square min-w-[64px] w-16 h-16 md:min-w-[80px] md:w-20 md:h-20 bg-gray-50 rounded-md overflow-hidden border-2 transition-colors ${
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
        
        {/* Modern Navigation Arrows - Desktop only */}
        {images.length > 4 && (
          <>
            {/* Left Arrow */}
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-8 h-8 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full shadow-sm opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-110 transition-all duration-200 z-10"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4 text-slate-600" />
            </button>
            
            {/* Right Arrow */}
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-8 h-8 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full shadow-sm opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-110 transition-all duration-200 z-10"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </button>
            
            {/* Gradient Indicator - Mobile only */}
            <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none md:hidden" />
          </>
        )}
      </div>

      {/* Image Navigation Dots - Only show if multiple images */}
      {images.length > 1 && (
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
      )}
    </div>
  );
}