'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Globe, CheckCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-20 lg:pt-18">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-transparent to-white/60"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-12rem)]">
          
          {/* Content Section */}
          <div className="space-y-8 lg:pr-8 order-2 lg:order-1 text-center lg:text-left">
            
            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="font-primary text-3xl md:text-4xl lg:text-5xl font-bold text-gray-700 leading-tight">
                <span className="block">Reliable. Efficient.</span>
                <span className="block text-slate-600">Global.</span>
                <span className="block text-gray-600">Manufacturing</span>
                <span className="block text-gray-600">Solutions</span>
              </h1>
              
              <p className="font-accent text-base md:text-lg text-gray-500 leading-relaxed font-light max-w-xl mx-auto lg:mx-0">
                We provide reliable, standardized solutions for sourcing and manufacturing products across international markets.
              </p>
            </div>

            {/* CTA Section */}
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 justify-center lg:justify-start">
              {/* Team Avatars */}
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-500 rounded-full border-2 border-white flex items-center justify-center shadow-lg">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full border-2 border-white flex items-center justify-center shadow-lg">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full border-2 border-white flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
              
              {/* CTA Button */}
              <Link href="/productos">
                <Button 
                  size="lg"
                  className="font-primary group bg-slate-600 hover:bg-slate-700 text-white font-medium px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-slate-600/20"
                >
                  <span className="flex items-center gap-3">
                    <span>Check out our Products</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-all duration-300" />
                  </span>
                </Button>
              </Link>
            </div>

            {/* Certification Logos */}
            <div className="pt-8">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 opacity-80">
                <div className="group transition-all duration-300 hover:opacity-100">
                  <Image
                    src="/home/sba.png"
                    alt="SBA U.S. Small Business Administration"
                    width={120}
                    height={60}
                    className="h-12 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <div className="group transition-all duration-300 hover:opacity-100">
                  <Image
                    src="/home/national.png"
                    alt="National Minority Supplier Development Council"
                    width={120}
                    height={60}
                    className="h-12 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <div className="group transition-all duration-300 hover:opacity-100">
                  <Image
                    src="/home/sam.png"
                    alt="SAM.gov"
                    width={120}
                    height={60}
                    className="h-12 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative h-[400px] lg:h-[600px] order-1 lg:order-2">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-600/10 to-slate-400/5 rounded-3xl"></div>
            <div className="relative h-full rounded-3xl overflow-hidden shadow-2xl shadow-gray-900/20">
              <Image
                src="/home/hero.jpg"
                alt="Professional woman in business attire representing V7MPC leadership"
                fill
                className="object-cover transition-all duration-700 hover:scale-105"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent rounded-3xl"></div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-slate-600 to-slate-400 rounded-full opacity-20 blur-xl animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-20 blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}