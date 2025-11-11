'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Award, Users, Megaphone, Signpost } from 'lucide-react';

export default function ProductsShowcase() {
  const categories = [
    {
      id: 'jewelry-recognition',
      title: 'Jewelry & Recognition Awards',
      description: 'Premium awards, plaques, and recognition items that celebrate achievements and build lasting memories.',
      image: '/images/products/jewelry.png',
      link: '/products/jewelry-recognition',
      icon: Award,
      gradient: 'from-amber-500 to-yellow-600'
    },
    {
      id: 'apparel',
      title: 'Apparel',
      description: 'Professional uniforms, custom clothing, and branded apparel that unites your team with style.',
      image: '/images/products/apparel.png',
      link: '/products/apparel',
      icon: Users,
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'promos',
      title: 'Promos',
      description: 'Strategic promotional products and marketing materials that amplify your brand presence.',
      image: '/images/products/promos.png',
      link: '/products/promos',
      icon: Megaphone,
      gradient: 'from-emerald-500 to-green-600'
    },
    {
      id: 'signs-displays',
      title: 'Signs & Displays',
      description: 'Custom signage and display solutions that amplify your message with maximum impact.',
      image: '/images/products/signs_display.png',
      link: '/products/signs-displays',
      icon: Signpost,
      gradient: 'from-purple-500 to-violet-600'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-transparent to-white/40"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-primary text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 mb-6 leading-tight">
            Our Product 
            <span className="block text-slate-600">Categories</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full mx-auto mb-6"></div>
          <p className="font-accent text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive range of solutions designed to meet the unique needs 
            of government entities, institutions, and businesses across various industries.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link 
                key={category.id}
                href={category.link}
                className="group block h-full"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100/50 h-full flex flex-col">
                  
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-0 group-hover:opacity-80 transition-all duration-300`}></div>
                    
                    {/* Icon on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-primary text-xl font-bold text-gray-800 mb-3 group-hover:text-slate-700 transition-colors">
                      {category.title}
                    </h3>
                    <p className="font-accent text-sm text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors flex-grow">
                      {category.description}
                    </p>
                    
                    {/* CTA */}
                    <div className="flex items-center text-slate-600 group-hover:text-slate-800 transition-colors mt-auto">
                      <span className="font-accent text-sm font-medium">Explore Category</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Link 
            href="/products"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-primary font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-slate-600/20"
          >
            <span>View All Products</span>
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 group-hover:rotate-90">
              <ArrowRight className="w-3 h-3 text-white" />
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
}