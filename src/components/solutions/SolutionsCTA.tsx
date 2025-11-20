import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download, MessageCircle } from 'lucide-react';

export default function SolutionsCTA() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(148,163,184,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(100,116,139,0.1),transparent_50%)]"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-slate-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Heading */}
        <h2 className="font-primary text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
          Ready to Bring Your Vision to Life?
        </h2>
        
        {/* Description */}
        <p className="font-accent text-lg text-slate-300 leading-relaxed mb-10 max-w-2xl mx-auto">
          Whether you need custom jewelry, promotional products, or strategic solutions for your organization — 
          our team is ready to deliver excellence tailored to your unique needs.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/quote">
            <Button 
              size="lg"
              className="font-primary group bg-white hover:bg-slate-50 text-slate-900 font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-white/20"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
          
          <Button 
            size="lg"
            variant="outline"
            className="font-primary group bg-transparent hover:bg-white/10 text-white border-white/30 hover:border-white/50 font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl backdrop-blur-sm"
          >
            <Download className="w-5 h-5 mr-2" />
            <span>Download Catalog</span>
          </Button>
        </div>

        {/* Support Text */}
        <p className="font-accent text-sm text-slate-400 mt-8">
          Have questions? <Link href="/contact" className="text-white hover:text-slate-200 underline underline-offset-2 transition-colors">Contact our team</Link> — we're here to help.
        </p>

      </div>
    </section>
  );
}
