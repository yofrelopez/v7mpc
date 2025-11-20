'use client';

import { Gem, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function JewelryHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/jewelry/jewelry-hero.png"
          alt="V7MPC Jewelry Division - Luxury Collections"
          fill
          priority
          className="object-cover"
          quality={90}
        />
        {/* Dark overlay to match original background tone */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/75 to-gray-900/80"></div>
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-8 shadow-lg"
        >
          <Gem className="w-4 h-4 text-amber-300" />
          <span className="font-accent text-sm text-white font-medium">Jewelry Division</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-primary text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
        >
          <span className="block">Crafted with Precision,</span>
          <span className="block text-amber-200 mt-2">Worn with Pride</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-accent text-lg md:text-xl text-slate-200 leading-relaxed max-w-3xl mx-auto mb-4"
        >
          V7 Marketplace Jewelry Division brings together <strong className="text-white">creativity, emotion, and craftsmanship</strong> through four distinctive brands.
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-accent text-base md:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto"
        >
          Each line carries its own identity — from everyday elegance to exclusive luxury — united by a single purpose: 
          <strong className="text-slate-200"> to design jewelry that connects deeply with the heart and lasts beautifully through time.</strong>
        </motion.p>

        {/* Decorative Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-2 mt-10"
        >
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          <Sparkles className="w-5 h-5 text-amber-300" />
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
        </motion.div>
      </div>
    </section>
  );
}
