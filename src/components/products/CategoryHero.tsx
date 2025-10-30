import { ProductCategory } from '@/types/products';
import Image from 'next/image';
import { ArrowRight, Users, FileText } from 'lucide-react';

interface CategoryHeroProps {
  category: ProductCategory & { highlightText?: string };
  productCount: number;
  subcategoryTags?: string[];
  customGradient?: string;
  features?: string[];
  heroImage?: string;
  showButtons?: boolean;
  imagePosition?: string;
}

export default function CategoryHero({
  category,
  productCount,
  subcategoryTags = [],
  customGradient = 'from-slate-800 to-slate-900',
  features = ['Custom Design Services', 'Quality Guaranteed'],
  heroImage,
  showButtons = false,
  imagePosition = 'object-center'
}: CategoryHeroProps) {
  return (
    <section className={`bg-gradient-to-r ${customGradient} text-white py-16 lg:py-24 relative overflow-hidden`}>
      {/* Background Image */}
      {heroImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt={`${category.name} hero background`}
            fill
            className={`object-cover opacity-20 ${imagePosition}`}
            priority
          />
        </div>
      )}
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="font-primary text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          {category.name}{' '}
          {category.highlightText && (
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              {category.highlightText}
            </span>
          )}
        </h1>
        <p className="font-accent text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
          {category.description}
        </p>
        
        {/* Subcategory Tags */}
        {subcategoryTags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
            {subcategoryTags.map((tag, index) => (
              <span 
                key={index}
                className="bg-slate-700/80 backdrop-blur-sm px-3 py-1.5 text-xs sm:text-sm rounded-full hover:bg-slate-600/80 transition-colors border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Features & Product Count */}
        <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 text-slate-400 mb-8 text-sm sm:text-base">
          <span className="font-accent">{productCount} Products Available</span>
          {features.map((feature, index) => (
            <div key={index} className="flex items-center">
              <span>•</span>
              <span className="font-accent ml-1 sm:ml-2">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons - ContactSection Style */}
        {showButtons && (
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button className="group inline-flex items-center gap-2 sm:gap-3 font-primary bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base lg:text-lg shadow-2xl hover:shadow-blue-500/25 hover:-translate-y-1 transition-all duration-300 hover:from-blue-700 hover:to-blue-800">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
              <span className="truncate">Browse All Products</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
            </button>
            
            <button className="group inline-flex items-center gap-2 sm:gap-3 font-primary bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base lg:text-lg hover:bg-white/20 hover:border-white/50 hover:-translate-y-1 transition-all duration-300">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
              <span className="truncate">Request Quote</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}