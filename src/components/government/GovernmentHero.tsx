import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Award } from 'lucide-react';

export default function GovernmentHero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-50">
      {/* Background Image Fullscreen */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/government/hero.png"
          alt="Government & Institutions Hero"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-900/50 to-slate-800/60" />
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex items-center justify-center min-h-[calc(100vh-150px)]">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            
            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="font-primary text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight text-balance">
                <span className="block">Trusted Solutions for</span>
                <span className="block text-slate-200">Government, Education,</span>
                <span className="block text-slate-300">and Public Institutions</span>
              </h1>
              
              <p className="font-accent text-base md:text-lg text-slate-100 leading-relaxed font-light max-w-xl mx-auto text-balance">
                V7 Marketplace Corporation is a certified minority- and woman-owned business delivering reliable, compliant, and cost-effective procurement support to public and institutional clients across the U.S.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center pt-4">
              <Link href="#capability-statement">
                <Button 
                  size="lg"
                  className="font-primary group bg-slate-600 hover:bg-slate-700 text-white font-medium px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-slate-600/40"
                >
                  <span className="flex items-center gap-3">
                    <span>Request Capability Statement</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-all duration-300" />
                  </span>
                </Button>
              </Link>
              
              <Link href="#contact-team">
                <Button 
                  variant="outline"
                  size="lg"
                  className="font-primary group bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 font-medium px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl backdrop-blur-sm"
                >
                  <span className="flex items-center gap-3">
                    <span>Contact Our Team</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-all duration-300" />
                  </span>
                </Button>
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-gradient-to-br from-slate-400/20 to-slate-600/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
