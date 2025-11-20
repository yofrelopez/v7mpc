'use client';

import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function SolutionsHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/divisions/solutions-hero.png"
          alt="V7MPC Solutions - Jewelry and Promotional Products"
          fill
          priority
          className="object-cover"
          quality={90}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-slate-800/60 to-slate-900/70"></div>
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 shadow-lg"
        >
          <Sparkles className="w-4 h-4 text-slate-700" />
          <span className="font-accent text-sm text-slate-800 font-medium">Comprehensive Solutions</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-primary text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg"
        >
          <span className="block">Products & Solutions</span>
          <span className="block text-slate-200 mt-2">Tailored for Your Success</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-accent text-lg md:text-xl text-slate-100 leading-relaxed max-w-3xl mx-auto mb-8 drop-shadow-md"
        >
          At V7 Marketplace Corporation, we deliver exceptional products across two specialized divisions — 
          <strong className="text-white"> Jewelry</strong> and <strong className="text-white">Promotional Products</strong>. 
          Each designed to elevate your brand, celebrate achievements, and create lasting connections.
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-24 h-1 bg-gradient-to-r from-slate-300 via-white to-slate-300 rounded-full mx-auto shadow-lg"
        ></motion.div>
      </div>
    </section>
  );
}
