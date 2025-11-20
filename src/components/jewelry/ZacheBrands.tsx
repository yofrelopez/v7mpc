'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Award, Crown, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ZacheBrands() {
  const brands = [
    {
      id: 'prestige',
      name: 'Zaché® Prestige',
      tagline: 'Recognition & Corporate Gifts Line',
      description: 'Zaché Prestige celebrates excellence and achievement. We create custom medals, pins, and executive gifts using premium materials and refined finishes. Each piece is designed to honor service, leadership, and lasting legacy.',
      subcategories: [
        'Awards & Medals',
        'Executive Gifts',
        'Custom Recognition Jewelry'
      ],
      icon: Award,
      image: '/images/jewelry/prestige-placeholder.jpg',
      gradient: 'from-slate-600 to-slate-700',
      bgGradient: 'from-slate-50 to-gray-100',
      accentColor: 'slate'
    },
    {
      id: 'signature',
      name: 'Zaché® Signature',
      tagline: 'Luxury & Designer Collection',
      description: 'Zaché Signature represents the pinnacle of craftsmanship — exclusive designs made with the finest materials and meticulous artistry. This line is tailored for luxury boutiques and discerning collectors who seek sophistication, rarity, and timeless value.',
      subcategories: [
        'Necklaces',
        'Earrings',
        'Bracelets',
        'Rings'
      ],
      icon: Crown,
      image: '/images/jewelry/signature-placeholder.jpg',
      gradient: 'from-amber-500 to-yellow-600',
      bgGradient: 'from-amber-50 to-yellow-50',
      accentColor: 'amber'
    },
    {
      id: 'original',
      name: 'Zaché® Original',
      tagline: 'Everyday Elegance',
      description: 'Zaché Jewelry captures the essence of everyday elegance — stylish, versatile, and made with care. This line offers affordable luxury designed for daily wear, blending beauty, durability, and meaning. Perfect for modern consumers who appreciate fashion that feels personal and timeless.',
      subcategories: [
        'Fashion Jewelry',
        'Personalized Pieces',
        'Lifestyle Collections'
      ],
      icon: Sparkles,
      image: '/images/jewelry/original-placeholder.jpg',
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-50',
      accentColor: 'blue'
    },
    {
      id: 'lulove',
      name: 'Lu Love®',
      tagline: 'Lifestyle & Inspirational Jewelry',
      description: 'Lu Love tells a story of love, hope, and strength. Inspired by motherhood and the beauty of life\'s miracles, it features delicate, meaningful jewelry that uplifts and inspires — created for women who carry love in everything they do.',
      subcategories: [
        'Inspirational Pieces',
        'Mother & Child Collections',
        'Meaningful Gifts'
      ],
      icon: Heart,
      image: '/images/jewelry/lulove-placeholder.jpg',
      gradient: 'from-pink-500 to-rose-600',
      bgGradient: 'from-pink-50 to-rose-50',
      accentColor: 'pink'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-primary text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Our Four Distinctive Brands
          </h2>
          <p className="font-accent text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            From corporate recognition to personal expression, each brand brings unique artistry and purpose to every piece we create.
          </p>
          <div className="w-24 h-1 bg-slate-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Brands Grid - Alternating Layout */}
        <div className="space-y-20 lg:space-y-32">
          {brands.map((brand, index) => {
            const IconComponent = brand.icon;
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  isEven ? '' : 'lg:grid-flow-dense'
                }`}
              >
                
                {/* Image Section */}
                <div className={`${isEven ? '' : 'lg:col-start-2'}`}>
                  <div className="relative group">
                    {/* Main Image Container */}
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                      {/* Placeholder gradient background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${brand.bgGradient}`}></div>
                      
                      {/* Icon Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${brand.gradient} flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                          <IconComponent className="w-16 h-16 text-white" />
                        </div>
                      </div>
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                    </div>
                    
                    {/* Floating Decorative Element */}
                    <div className={`absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br ${brand.gradient} opacity-20 rounded-full blur-2xl group-hover:opacity-30 transition-opacity duration-500`}></div>
                  </div>
                </div>

                {/* Content Section */}
                <div className={`${isEven ? '' : 'lg:col-start-1 lg:row-start-1'}`}>
                  
                  {/* Brand Name & Tagline */}
                  <div className="mb-6">
                    <h3 className="font-primary text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
                      {brand.name}
                    </h3>
                    <p className={`font-accent text-base font-semibold bg-gradient-to-r ${brand.gradient} bg-clip-text text-transparent`}>
                      {brand.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="font-accent text-base lg:text-lg text-slate-600 leading-relaxed mb-8">
                    {brand.description}
                  </p>

                  {/* Subcategories */}
                  <div className="mb-8">
                    <h4 className="font-primary text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4">
                      Available Collections:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {brand.subcategories.map((subcategory, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center gap-2 text-slate-700"
                        >
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${brand.gradient}`}></div>
                          <span className="font-accent text-sm">{subcategory}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link 
                    href={`/products/jewelry-recognition?brand=${brand.id}`}
                    className="group inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors duration-300"
                  >
                    <span className={`font-primary font-semibold bg-gradient-to-r ${brand.gradient} bg-clip-text text-transparent`}>
                      Explore {brand.name.split('®')[0]}
                    </span>
                    <ArrowRight className="w-5 h-5 text-slate-600 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
