import Image from 'next/image';
import { Globe, Star, Truck, Cog } from 'lucide-react';

export default function WhoWeAre() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-primary text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Who We Are
          </h2>
          <div className="w-24 h-1 bg-slate-600 mx-auto rounded-full"></div>
        </div>

        {/* Main Content - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Column - Content */}
          <div className="space-y-8">
            
            {/* Company Description */}
            <div className="space-y-6">
              <p className="font-accent text-lg text-slate-700 leading-relaxed">
                V7 Marketplace Corporation (V7MP) is a <span className="font-semibold text-slate-900">minority-owned, Latin woman-led enterprise</span> specializing in national and international sourcing, manufacturing, and custom promotional solutions.
              </p>
              
              <p className="font-accent text-base text-slate-600 leading-relaxed">
                We provide companies across industries, including government entities, with high-quality, competitively priced products—from custom promotional items to recognized brands—tailored to meet each client's unique needs. Leveraging the latest technologies and market insights, V7MP offers both branded and unbranded products giving clients access to the most effective solutions for their industry.
              </p>
            </div>

            {/* Core Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Global Sourcing */}
              <div className="group bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shrink-0">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-primary font-semibold text-slate-900 mb-2">Global Sourcing</h4>
                    <p className="font-accent text-sm text-slate-600 leading-relaxed">Access to high-quality products and suppliers worldwide.</p>
                  </div>
                </div>
              </div>

              {/* Quality Control */}
              <div className="group bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center shrink-0">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-primary font-semibold text-slate-900 mb-2">Quality Control</h4>
                    <p className="font-accent text-sm text-slate-600 leading-relaxed">Detailed inspections to ensure product excellence.</p>
                  </div>
                </div>
              </div>

              {/* Efficient Logistics */}
              <div className="group bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shrink-0">
                    <Truck className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-primary font-semibold text-slate-900 mb-2">Efficient Logistics</h4>
                    <p className="font-accent text-sm text-slate-600 leading-relaxed">Full-service shipping, including Amazon prep and global delivery.</p>
                  </div>
                </div>
              </div>

              {/* Custom Manufacturing */}
              <div className="group bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-slate-500 to-slate-600 rounded-lg flex items-center justify-center shrink-0">
                    <Cog className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-primary font-semibold text-slate-900 mb-2">Custom Manufacturing</h4>
                    <p className="font-accent text-sm text-slate-600 leading-relaxed">Tailored solutions for custom and private label products.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Value Proposition */}
            <div className="bg-gradient-to-r from-blue-50 to-slate-50 p-6 lg:p-8 rounded-xl border border-blue-200/50 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="text-6xl text-blue-300 leading-none font-serif">&ldquo;</div>
                <div>
                  <h3 className="font-primary text-lg font-semibold text-slate-900 mb-3">Our Advantage</h3>
                  <p className="font-accent text-base text-slate-700 leading-relaxed italic">
                    Leveraging the latest technologies and market insights, we provide both branded and unbranded products, giving clients access to the most effective solutions for their industry.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Professional Image */}
          <div className="relative lg:order-last order-first">
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-[4/5] relative">
                  <Image
                    src="/images/government/hero.png"
                    alt="V7MP Professional Team"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent"></div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-slate-400/20 to-slate-600/20 rounded-full blur-2xl"></div>
              
              {/* Stats Overlay */}
              <div className="absolute -bottom-6 -right-6 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-slate-200/50">
                <div className="text-center">
                  <p className="font-primary text-2xl font-bold text-slate-900">20+</p>
                  <p className="font-accent text-sm text-slate-600">Years of Excellence</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}