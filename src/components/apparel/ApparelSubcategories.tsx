'use client';

import Link from 'next/link';
import {
  Shirt,
  Layers,
  CircleUser,
  Zap,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import ApparelBrands from './ApparelBrands';

export default function ApparelSubcategories() {
  const subcategories = [
    {
      id: 'uniform',
      name: 'Uniforms',
      tagline: 'Professional Uniforms for Institutions',
      description: 'High-quality professional uniforms designed for schools, government agencies, healthcare, and corporate environments. Built for durability, comfort, and consistent branding.',
      icon: Shirt,
      gradient: 'from-slate-600 to-slate-700',
      bgColor: 'bg-slate-50'
    },
    {
      id: 't-shirt',
      name: 'T-Shirts',
      tagline: 'Custom Branded T-Shirts',
      description: 'Premium cotton t-shirts perfect for events, teams, promotions, and casual workplace environments. Available in all sizes with full customization options.',
      icon: Shirt,
      gradient: 'from-blue-600 to-indigo-700',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'polo',
      name: 'Polo Shirts',
      tagline: 'Corporate Polo Shirts',
      description: 'Classic polo shirts that combine professionalism with comfort. Ideal for business casual environments, sales teams, and customer-facing roles.',
      icon: Shirt,
      gradient: 'from-purple-600 to-violet-700',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'jacket',
      name: 'Outerwear',
      tagline: 'Jackets, Hoodies & Coats',
      description: 'Quality outerwear including jackets, hoodies, fleece, and coats. Perfect for outdoor teams, cold weather environments, and branded corporate apparel.',
      icon: Layers,
      gradient: 'from-amber-600 to-orange-700',
      bgColor: 'bg-amber-50'
    },
    {
      id: 'cap',
      name: 'Hats & Caps',
      tagline: 'Custom Headwear',
      description: 'Stylish caps, hats, and headwear with custom embroidery. Great for sports teams, outdoor workers, promotional events, and brand visibility.',
      icon: CircleUser,
      gradient: 'from-rose-600 to-pink-700',
      bgColor: 'bg-rose-50'
    },

  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-primary text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Explore Our Apparel Collections
          </h2>
          <p className="font-accent text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            From professional uniforms to custom team apparel, we provide high-quality clothing solutions that unite your organization with style and consistency.
          </p>
          <div className="w-24 h-1 bg-slate-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Subcategories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subcategories.map((subcategory, index) => {
            const IconComponent = subcategory.icon;

            return (
              <motion.div
                key={subcategory.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/products?type=${subcategory.id}`}
                  className="group block"
                >
                  <div className={`${subcategory.bgColor} rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-gray-100 h-full flex flex-col`}>

                    {/* Icon Header */}
                    <div className="relative h-48 flex items-center justify-center overflow-hidden">
                      {/* Gradient Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${subcategory.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>

                      {/* Icon */}
                      <div className={`relative z-10 w-24 h-24 rounded-full bg-gradient-to-br ${subcategory.gradient} flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                        <IconComponent className="w-12 h-12 text-white" />
                      </div>

                      {/* Decorative circles */}
                      <div className={`absolute top-4 right-4 w-16 h-16 rounded-full bg-gradient-to-br ${subcategory.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
                      <div className={`absolute bottom-4 left-4 w-20 h-20 rounded-full bg-gradient-to-br ${subcategory.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">

                      {/* Subcategory Name */}
                      <h3 className="font-primary text-xl lg:text-2xl font-bold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
                        {subcategory.name}
                      </h3>

                      {/* Tagline */}
                      <p className={`font-accent text-xs font-semibold mb-3 bg-gradient-to-r ${subcategory.gradient} bg-clip-text text-transparent`}>
                        {subcategory.tagline}
                      </p>

                      {/* Description */}
                      <p className="font-accent text-sm text-slate-600 leading-relaxed mb-4 flex-grow">
                        {subcategory.description}
                      </p>

                      {/* CTA */}
                      <div className="flex items-center text-slate-700 group-hover:text-slate-900 transition-colors mt-auto">
                        <span className="font-primary text-sm font-semibold">Explore Subcategory</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>

                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Brands Section */}
      <ApparelBrands />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Why Choose Our Apparel Section */}
        <div className="mt-16 bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-8 lg:p-12 border border-slate-200/50">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="font-primary text-2xl font-bold text-slate-900 mb-4">
              Why Choose Our Apparel?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              <div>
                <div className="font-primary text-sm font-semibold text-slate-900 mb-2">✓ Premium Quality Materials</div>
                <p className="font-accent text-sm text-slate-600">Durable fabrics and reliable suppliers</p>
              </div>
              <div>
                <div className="font-primary text-sm font-semibold text-slate-900 mb-2">✓ Custom Embroidery & Printing</div>
                <p className="font-accent text-sm text-slate-600">Full customization with your logo and design</p>
              </div>
              <div>
                <div className="font-primary text-sm font-semibold text-slate-900 mb-2">✓ Bulk Order Discounts</div>
                <p className="font-accent text-sm text-slate-600">Competitive pricing for large orders</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
