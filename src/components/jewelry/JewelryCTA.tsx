import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle, BookOpen, Sparkles } from 'lucide-react';

export default function JewelryCTA() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,191,36,0.08),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(148,163,184,0.1),transparent_50%)]"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-slate-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 shadow-2xl mb-8">
          <Sparkles className="w-10 h-10 text-white" />
        </div>

        {/* Heading */}
        <h2 className="font-primary text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
          Ready to Create Something Beautiful?
        </h2>
        
        {/* Description */}
        <p className="font-accent text-lg text-slate-200 leading-relaxed mb-10 max-w-2xl mx-auto">
          Whether you need custom recognition jewelry, luxury pieces, or meaningful gifts — 
          our jewelry division is ready to bring your vision to life with precision and care.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/quote?division=jewelry">
            <Button 
              size="lg"
              className="font-primary group bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl shadow-amber-600/40"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              <span>Request Custom Quote</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
          
          <Link href="/products/jewelry-recognition">
            <Button 
              size="lg"
              variant="outline"
              className="font-primary group bg-transparent hover:bg-white/10 text-white border-white/30 hover:border-white/50 font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl backdrop-blur-sm"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              <span>Browse Collections</span>
            </Button>
          </Link>
        </div>

        {/* Support Text */}
        <p className="font-accent text-sm text-slate-400 mt-8">
          Questions about our jewelry brands? <Link href="/contact" className="text-amber-300 hover:text-amber-200 underline underline-offset-2 transition-colors">Contact our specialists</Link> — we're here to help.
        </p>

      </div>
    </section>
  );
}
