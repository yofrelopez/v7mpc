'use client';

import { Gift, Megaphone } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function PromotionalHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/promotional/promotional-hero.png"
          alt="V7MPC Promotional Products Division"
          fill
          priority
          className="object-cover"
          quality={90}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/75 via-slate-800/70 to-gray-900/75"></div>
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-8 shadow-lg"
        >
          <Megaphone className="w-4 h-4 text-blue-300" />
          <span className="font-accent text-sm text-white font-medium">Promotional Products Division</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-primary text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
        >
          <span className="block">Promotional Solutions</span>
          <span className="block text-blue-200 mt-2">That Speak Your Brand</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-accent text-lg md:text-xl text-slate-200 leading-relaxed max-w-3xl mx-auto mb-4"
        >
          At V7 Marketplace, we help <strong className="text-white">organizations, businesses, and institutions</strong> promote their brand with purpose.
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-accent text-base md:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto"
        >
          Our curated collection of promotional products blends <strong className="text-slate-200">functionality, creativity, and quality</strong> — perfect for events, campaigns, and professional recognition. Whether you're representing a school, church, corporation, or government entity, our solutions make your message unforgettable.
        </motion.p>

        {/* Decorative Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-2 mt-10"
        >
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
          <Gift className="w-5 h-5 text-blue-300" />
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
        </motion.div>
      </div>
    </section>
  );
}
