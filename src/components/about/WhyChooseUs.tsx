import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Shield, Target, Heart } from 'lucide-react';

export default function WhyChooseUs() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* First Section - Now It's Your Turn */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 lg:mb-24">
          
          {/* Left Column - Professional Image */}
          <div className="relative">
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-[4/5] relative">
                  <Image
                    src="/images/government/procurement.png"
                    alt="Professional Business Woman"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent"></div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full blur-2xl"></div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8">
            
            {/* Call to Action Header */}
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="font-accent text-slate-600 font-medium text-sm uppercase tracking-wider">
                  Now It's Your Turn
                </p>
                <h2 className="font-primary text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                  Thousands of Businesses Trust Us Every Day!
                </h2>
              </div>
              
              <p className="font-accent text-lg text-slate-700 leading-relaxed">
                We're proud to support businesses around the world by providing <span className="font-semibold text-slate-900">top-quality products, reliable sourcing, and seamless logistics solutions</span>. Every day, companies from all industries choose us as their trusted partner to help them grow, streamline operations, and succeed in a competitive marketplace.
              </p>
              
              <p className="font-accent text-base text-slate-600 leading-relaxed">
                Join the growing number of businesses that rely on us for their sourcing and supply needs!
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Link href="/cotizacion">
                <Button 
                  size="lg"
                  className="font-primary group bg-slate-600 hover:bg-slate-700 text-white font-medium px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-slate-600/40"
                >
                  <span className="flex items-center gap-3">
                    <span>Try Now</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-all duration-300" />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-24 h-1 bg-slate-300 mx-auto rounded-full mb-16 lg:mb-24"></div>

        {/* Second Section - Why Us? */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Column - Why Us Content */}
          <div className="space-y-8">
            
            {/* Section Header */}
            <div className="space-y-4">
              <h2 className="font-primary text-3xl lg:text-4xl font-bold text-slate-900">
                Why Us?
              </h2>
            </div>

            {/* Value Proposition */}
            <div className="space-y-6">
              <p className="font-accent text-lg text-slate-700 leading-relaxed">
                By choosing V7 Marketplace Corporation, clients gain a <span className="font-semibold text-slate-900">reliable, ethical partner</span> capable of navigating the complexities of global sourcing, delivering results that align with government standards and procurement expectations.
              </p>
              
              <p className="font-accent text-base text-slate-600 leading-relaxed">
                Discover the difference of working with a trusted partner committed to your success and driven by <span className="font-semibold text-slate-800">integrity, innovation, and excellence</span>.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-primary font-semibold text-slate-900 mb-1">Reliable & Ethical Partnership</h4>
                  <p className="font-accent text-sm text-slate-600">Committed to integrity and transparency in every transaction.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-primary font-semibold text-slate-900 mb-1">Government Standards Compliance</h4>
                  <p className="font-accent text-sm text-slate-600">Meeting procurement expectations and regulatory requirements.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-primary font-semibold text-slate-900 mb-1">Results-Driven Approach</h4>
                  <p className="font-accent text-sm text-slate-600">Focused on delivering measurable outcomes for your business.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-slate-500 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-primary font-semibold text-slate-900 mb-1">Commitment to Excellence</h4>
                  <p className="font-accent text-sm text-slate-600">Innovation and quality in every aspect of our service.</p>
                </div>
              </div>
            </div>

            {/* Contact Button */}
            <div className="pt-4">
              <Link href="/contact">
                <Button 
                  variant="outline"
                  size="lg"
                  className="font-primary group bg-white hover:bg-slate-50 text-slate-700 border-slate-300 hover:border-slate-400 font-medium px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="flex items-center gap-3">
                    <span>Contact Us</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-all duration-300" />
                  </span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column - Trust Indicators */}
          <div className="space-y-6">
            
            {/* Trust Statement */}
            <div className="bg-gradient-to-br from-slate-50 via-white to-gray-50 p-8 rounded-2xl border border-slate-200/50 shadow-lg">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full mx-auto flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                
                <div>
                  <h3 className="font-primary text-xl font-semibold text-slate-900 mb-3">
                    Trusted by Thousands
                  </h3>
                  <p className="font-accent text-slate-600 leading-relaxed">
                    Join the growing community of businesses that trust V7 Marketplace Corporation for their success.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-6 pt-4">
                  <div className="text-center">
                    <p className="font-primary text-2xl font-bold text-slate-900">20+</p>
                    <p className="font-accent text-sm text-slate-600">Years Experience</p>
                  </div>
                  <div className="text-center">
                    <p className="font-primary text-2xl font-bold text-slate-900">100%</p>
                    <p className="font-accent text-sm text-slate-600">Client Satisfaction</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications Reminder */}
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 rounded-xl border border-emerald-200/50 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="font-primary text-sm font-semibold text-emerald-700 uppercase tracking-wide">
                  Certified Excellence
                </span>
              </div>
              <p className="font-accent text-slate-700 text-sm leading-relaxed">
                MBE & WBENC certified, ensuring compliance with government procurement standards.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}