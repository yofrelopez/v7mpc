import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle, Download, Megaphone } from 'lucide-react';

export default function PromotionalCTA() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(99,102,241,0.08),transparent_50%)]"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-2xl mb-8">
          <Megaphone className="w-10 h-10 text-white" />
        </div>

        {/* Heading */}
        <h2 className="font-primary text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
          Ready to Amplify Your Brand?
        </h2>
        
        {/* Description */}
        <p className="font-accent text-lg text-slate-200 leading-relaxed mb-10 max-w-2xl mx-auto">
          Whether you need office supplies, custom drinkware, eco-friendly products, or faith-based merchandise — 
          our promotional division delivers quality solutions that make your message unforgettable.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/quote?division=promotional">
            <Button 
              size="lg"
              className="font-primary group bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl shadow-blue-600/40"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              <span>Get Custom Quote</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
          
          <Link href="/products/promos">
            <Button 
              size="lg"
              variant="outline"
              className="font-primary group bg-transparent hover:bg-white/10 text-white border-white/30 hover:border-white/50 font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl backdrop-blur-sm"
            >
              <Download className="w-5 h-5 mr-2" />
              <span>Download Catalog</span>
            </Button>
          </Link>
        </div>

        {/* Support Text */}
        <p className="font-accent text-sm text-slate-400 mt-8">
          Need help choosing products? <Link href="/contact" className="text-blue-300 hover:text-blue-200 underline underline-offset-2 transition-colors">Talk to our team</Link> — we're here to guide you.
        </p>

      </div>
    </section>
  );
}
