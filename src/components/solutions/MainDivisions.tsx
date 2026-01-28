'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Gem, Gift, Shirt } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MainDivisions() {
  const divisions = [
    {
      id: 'jewelry',
      title: 'Jewelry Division',
      subtitle: 'Zaché® Collections & Lu Love®',
      description: 'Exquisite jewelry that celebrates elegance, achievement, and personal stories. From everyday fashion to luxury designs and corporate recognition.',
      features: [
        'Zaché® Prestige - Recognition & Awards',
        'Zaché® Signature - Luxury Designer Line',
        'Zaché® Original - Everyday Elegance',
        'Lu Love® - Inspirational Lifestyle'
      ],
      link: '/jewelry',
      icon: Gem,
      image: '/images/divisions/jewelry-card.png',
      gradient: 'from-amber-500 to-yellow-600',
      bgGradient: 'from-amber-50 to-yellow-50'
    },
    {
      id: 'promotional',
      title: 'Promotional Products',
      subtitle: 'Strategic Brand Solutions',
      description: 'High-quality promotional products that amplify your brand presence. From office essentials to eco-friendly solutions for every campaign.',
      features: [
        'Office & Writing Supplies',
        'Custom Drinkware & Tech',
        'Signs, Displays & Banners',
        'Eco-Friendly & Faith-Based'
      ],
      link: '/promotional-products',
      icon: Gift,
      image: '/images/divisions/promotional-card.png',
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-50'
    },
    {
      id: 'apparel',
      title: 'Corporate Apparel',
      subtitle: 'Professional Uniforms & Gear',
      description: 'Premium branded apparel for your team. From professional uniforms to casual workwear that unites your organization.',
      features: [
        'Professional Uniforms',
        'Branded Polos & Shirts',
        'Jackets & Outerwear',
        'Custom Caps & Accessories'
      ],
      link: '/apparel',
      icon: Shirt,
      image: '/images/products/apparel.png',
      gradient: 'from-slate-700 to-gray-800',
      bgGradient: 'from-slate-50 to-gray-100'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-primary text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Our Specialized Divisions
          </h2>
          <p className="font-accent text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Each division brings unique expertise, creativity, and commitment to quality — united by our mission to deliver excellence.
          </p>
          <div className="w-24 h-1 bg-slate-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Divisions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-8">
          {divisions.map((division, index) => {
            const IconComponent = division.icon;
            return (
              <motion.div
                key={division.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Link
                  href={division.link}
                  className="group block h-full"
                >
                  <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-gray-100 h-full flex flex-col">

                    {/* Image Section */}
                    <div className="relative h-64 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 shrink-0">
                      {/* Background Image */}
                      <Image
                        src={division.image}
                        alt={division.title}
                        fill
                        className="object-cover"
                        quality={85}
                      />

                      {/* Color overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${division.bgGradient} opacity-40`}></div>

                      {/* Icon Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${division.gradient} flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                          <IconComponent className="w-12 h-12 text-white" />
                        </div>
                      </div>

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 lg:p-8 flex flex-col flex-grow">

                      {/* Title */}
                      <div className="mb-6">
                        <h3 className="font-primary text-2xl font-bold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
                          {division.title}
                        </h3>
                        <p className={`font-accent text-sm font-semibold bg-gradient-to-r ${division.gradient} bg-clip-text text-transparent`}>
                          {division.subtitle}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="font-accent text-base text-slate-600 leading-relaxed mb-6 flex-grow">
                        {division.description}
                      </p>

                      {/* Features List */}
                      <ul className="space-y-3 mb-8">
                        {division.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${division.gradient} mt-2 mr-3 flex-shrink-0`}></div>
                            <span className="font-accent text-sm text-slate-700">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <div className={`mt-auto inline-flex items-center gap-2 text-transparent bg-gradient-to-r ${division.gradient} bg-clip-text font-semibold group-hover:gap-3 transition-all duration-300`}>
                        <span className="font-primary">Explore Division</span>
                        <ArrowRight className={`w-5 h-5 text-slate-600 group-hover:translate-x-1 transition-transform duration-300`} />
                      </div>
                    </div>

                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
