'use client';

import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SolutionsHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-gray-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(148,163,184,0.05),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(100,116,139,0.05),transparent_50%)]"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-slate-200/30 to-slate-300/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full px-4 py-2 mb-8 shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-slate-600" />
          <span className="font-accent text-sm text-slate-700 font-medium">Comprehensive Solutions</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-primary text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight"
        >
          <span className="block">Products & Solutions</span>
          <span className="block text-slate-600 mt-2">Tailored for Your Success</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-accent text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-8"
        >
          At V7 Marketplace Corporation, we deliver exceptional products across two specialized divisions — 
          <strong className="text-slate-700"> Jewelry</strong> and <strong className="text-slate-700">Promotional Products</strong>. 
          Each designed to elevate your brand, celebrate achievements, and create lasting connections.
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-24 h-1 bg-gradient-to-r from-slate-400 via-slate-600 to-slate-400 rounded-full mx-auto"
        ></motion.div>
      </div>
    </section>
  );
}
