'use client';

import Link from 'next/link';
import { Globe, Send, Handshake, DollarSign } from 'lucide-react';

export default function WhatWeProvide() {
  const cards = [
    {
      icon: Globe,
      title: 'Mission',
      description: 'Empowering businesses and government entities through seamless, cost-effective solutions. We transform challenges into opportunities, fostering sustainable growth and building enduring partnerships.'
    },
    {
      icon: Send,
      title: 'Vision',
      description: 'Setting the standard for excellence in global sourcing and promotional solutions, earning trust through expertise, reliability, and commitment to unparalleled quality.'
    },
    {
      icon: Handshake,
      title: 'Our Commitment',
      description: 'Providing dependable, high-quality sourcing solutions designed with your specific goals in mind. We combine expertise and customization to drive efficiency and success.'
    },
    {
      icon: DollarSign,
      title: 'Value',
      description: 'Guided by excellence, innovation, and integrity. We focus on building strong partnerships and continuously evolving to provide cutting-edge solutions that drive growth.'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 relative text-white">
      {/* Elegant background pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/30 via-transparent to-slate-800/20"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          
          {/* Left Side - Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {cards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <div 
                  key={index}
                  className="group bg-white rounded-2xl p-5 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100/10 hover:scale-105"
                >
                  {/* Icon */}
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center group-hover:from-emerald-600 group-hover:to-emerald-700 transition-all duration-300 shadow-lg">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-primary text-lg md:text-xl font-bold text-gray-800 mb-3 group-hover:text-slate-800 transition-colors">
                    {card.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="font-accent text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Side - Main Content */}
          <div className="lg:pl-8">
            {/* Title */}
            <h2 className="font-primary text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight">
              What We 
              <span className="block bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Provide</span>
            </h2>
            
            {/* Divider Line */}
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full mb-8"></div>
            
            {/* Main Description */}
            <div className="space-y-6 mb-10">
              <p className="font-accent text-base md:text-lg text-slate-300 leading-relaxed font-light">
                At V7 Marketplace Corporation (V7MP), we specialize in providing tailored global 
                product sourcing, procurement, and manufacturing solutions for a diverse 
                range of clients, including government entities, institutional organizations, e-commerce 
                platforms, and corporations across various industries.
              </p>
              
              <p className="font-accent text-base md:text-lg text-slate-400 leading-relaxed font-light">
                By sourcing both nationally and internationally, we ensure our clients receive 
                high-quality, cost-effective products that meet rigorous standards and 
                deliver exceptional value. Our streamlined processes and deep market 
                expertise enable us to serve the unique needs of businesses and institutions alike.
              </p>
            </div>
            
            {/* CTA Button */}
            <Link 
              href="/quote"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-primary font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl shadow-blue-500/20"
            >
              <span>REQUEST QUOTE</span>
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 group-hover:rotate-90">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}