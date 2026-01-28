'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  PenTool,
  Coffee,
  Smartphone,
  Briefcase,
  Home,
  Leaf,
  Heart,
  ArrowRight,
  Signpost
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function PromotionalCategories() {
  const categories = [
    {
      id: 'office-writing',
      name: 'Office & Writing',
      tagline: 'Custom Office & Writing Products',
      description: 'Branded pens, notebooks, planners, and desk accessories that bring professionalism and visibility to every workspace.',
      fullDescription: 'Elevate every workspace with branded essentials that inspire productivity. From premium pens and notebooks to folders, planners, and desk accessories — we deliver practical, high-quality items that keep your brand present in every detail. Ideal for offices, schools, universities, and conferences.',
      icon: PenTool,
      image: '/images/promotional/office-placeholder.jpg',
      gradient: 'from-slate-600 to-slate-700',
      bgColor: 'bg-slate-50'
    },
    {
      id: 'drinkware',
      name: 'Drinkware',
      tagline: 'Custom Drinkware & Corporate Gifts',
      description: 'Custom tumblers, mugs, and bottles perfect for events, schools, and corporate campaigns.',
      fullDescription: 'Promote your brand with style and functionality. Choose from insulated tumblers, ceramic mugs, reusable bottles, and travel cups — all customizable with your logo or message. Perfect for corporate gifts, schools, recognition events, and trade shows.',
      icon: Coffee,
      image: '/images/promotional/drinkware-placeholder.jpg',
      gradient: 'from-blue-600 to-indigo-700',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'tech-gadgets',
      name: 'Tech & Gadgets',
      tagline: 'Branded Tech & Promotional Gadgets',
      description: 'Innovative USB drives, power banks, and phone accessories that connect your brand with today\'s digital lifestyle.',
      fullDescription: 'Modern, impactful, and useful — our tech accessories are designed for today\'s connected world. Explore a variety of power banks, USB drives, chargers, phone stands, and Bluetooth devices. These innovative tools keep your brand both visible and valuable.',
      icon: Smartphone,
      image: '/images/promotional/tech-placeholder.jpg',
      gradient: 'from-purple-600 to-violet-700',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'bags-travel',
      name: 'Bags & Travel',
      tagline: 'Custom Bags & Travel Accessories',
      description: 'Branded tote bags, backpacks, and travel gear built for durability, style, and everyday promotion.',
      fullDescription: 'Carry your brand wherever you go. We offer tote bags, backpacks, duffel bags, and travel accessories designed for events, corporate programs, and team gear. Every piece combines durability, functionality, and style, ensuring your brand travels with purpose.',
      icon: Briefcase,
      image: '/images/promotional/bags-placeholder.jpg',
      gradient: 'from-amber-600 to-orange-700',
      bgColor: 'bg-amber-50'
    },
    {
      id: 'home-lifestyle',
      name: 'Home & Lifestyle',
      tagline: 'Corporate Lifestyle & Gift Products',
      description: 'Creative home and lifestyle gifts that extend your brand\'s presence beyond the office.',
      fullDescription: 'Make a lasting impression beyond the office. From cozy blankets and scented candles to kitchen accessories and wellness gifts, these thoughtful items create memorable experiences while showcasing your brand\'s warmth and creativity. Ideal for client appreciation or special recognition programs.',
      icon: Home,
      image: '/images/promotional/home-placeholder.jpg',
      gradient: 'from-rose-600 to-pink-700',
      bgColor: 'bg-rose-50'
    },
    {
      id: 'eco-sustainable',
      name: 'Eco & Sustainable',
      tagline: 'Eco-Friendly Promotional Products',
      description: 'Reusable, recyclable, and responsibly sourced products that promote sustainability and brand integrity.',
      fullDescription: 'Support your brand\'s environmental values with eco-friendly promotional products. Discover reusable, recyclable, and responsibly sourced materials — from bamboo pens and organic cotton totes to stainless steel drinkware and biodegradable packaging. Designed to make an impact that lasts without harming the planet.',
      icon: Leaf,
      image: '/images/promotional/eco-placeholder.jpg',
      gradient: 'from-emerald-600 to-green-700',
      bgColor: 'bg-emerald-50'
    },
    {
      id: 'faith-community',
      name: 'Faith-Based & Community',
      tagline: 'Faith-Based & Community Products',
      description: 'Inspirational and community-focused items created for churches, schools, and outreach programs.',
      fullDescription: 'Celebrate faith, unity, and service through meaningful promotional products. Our faith-based and community line includes church giveaways, school kits, outreach merchandise, and inspirational gifts — designed to uplift, connect, and share positive values across every event or mission.',
      icon: Heart,
      image: '/images/promotional/faith-placeholder.jpg',
      gradient: 'from-indigo-600 to-blue-700',
      bgColor: 'bg-indigo-50'
    },
    {
      id: 'signs-displays',
      name: 'Signs & Displays',
      tagline: 'Custom Signage & Display Solutions',
      description: 'High-impact signage, banners, and displays that capture attention and communicate your message clearly.',
      fullDescription: 'Stand out in any environment with professional signage and displays. From trade show booths and retractable banners to outdoor yard signs and window decals, we offer durable, high-quality visual solutions that ensure your brand gets noticed.',
      icon: Signpost,
      image: '/images/products/signs_display.png',
      gradient: 'from-purple-600 to-violet-700',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-primary text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Eight Comprehensive Categories
          </h2>
          <p className="font-accent text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            From office essentials to eco-friendly solutions, we offer strategic promotional products designed to amplify your brand's message and values.
          </p>
          <div className="w-24 h-1 bg-slate-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const IconComponent = category.icon;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/products/promos?category=${category.id}`}
                  className="group block"
                >
                  <div className={`${category.bgColor} rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-gray-100 h-full flex flex-col`}>

                    {/* Icon Header */}
                    <div className="relative h-48 flex items-center justify-center overflow-hidden">
                      {/* Gradient Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>

                      {/* Icon */}
                      <div className={`relative z-10 w-24 h-24 rounded-full bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                        <IconComponent className="w-12 h-12 text-white" />
                      </div>

                      {/* Decorative circles */}
                      <div className={`absolute top-4 right-4 w-16 h-16 rounded-full bg-gradient-to-br ${category.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
                      <div className={`absolute bottom-4 left-4 w-20 h-20 rounded-full bg-gradient-to-br ${category.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">

                      {/* Category Name */}
                      <h3 className="font-primary text-xl lg:text-2xl font-bold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
                        {category.name}
                      </h3>

                      {/* Tagline */}
                      <p className={`font-accent text-xs font-semibold mb-3 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                        {category.tagline}
                      </p>

                      {/* Description */}
                      <p className="font-accent text-sm text-slate-600 leading-relaxed mb-4 flex-grow">
                        {category.description}
                      </p>

                      {/* CTA */}
                      <div className="flex items-center text-slate-700 group-hover:text-slate-900 transition-colors mt-auto">
                        <span className="font-primary text-sm font-semibold">Explore Category</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>

                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Info Section */}
        <div className="mt-16 bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-8 lg:p-12 border border-slate-200/50">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="font-primary text-2xl font-bold text-slate-900 mb-4">
              Why Choose Our Promotional Products?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              <div>
                <div className="font-primary text-sm font-semibold text-slate-900 mb-2">✓ Quality Guaranteed</div>
                <p className="font-accent text-sm text-slate-600">Premium materials and reliable suppliers</p>
              </div>
              <div>
                <div className="font-primary text-sm font-semibold text-slate-900 mb-2">✓ Custom Branding</div>
                <p className="font-accent text-sm text-slate-600">Full customization with your logo and message</p>
              </div>
              <div>
                <div className="font-primary text-sm font-semibold text-slate-900 mb-2">✓ Bulk Discounts</div>
                <p className="font-accent text-sm text-slate-600">Competitive pricing for large orders</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
