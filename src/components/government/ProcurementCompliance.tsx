import Image from 'next/image';
import { FileText, Search, ShoppingCart, Cog, Shield, Truck, DollarSign, Clock, Users, CheckCircle, Award, Zap } from 'lucide-react';

export default function ProcurementCompliance() {
  const processSteps = [
    {
      title: "Quote Request",
      description: "Fast turnaround on detailed quotes",
      icon: FileText,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Documentation",
      description: "Complete compliance paperwork",
      icon: Search,
      color: "from-indigo-500 to-indigo-600"
    },
    {
      title: "PO Processing",
      description: "Efficient purchase order handling",
      icon: ShoppingCart,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Production",
      description: "Quality manufacturing process",
      icon: Cog,
      color: "from-slate-500 to-slate-600"
    },
    {
      title: "Quality Check",
      description: "Rigorous quality assurance",
      icon: Shield,
      color: "from-emerald-500 to-emerald-600"
    },
    {
      title: "Delivery",
      description: "Tracked and documented delivery",
      icon: Truck,
      color: "from-green-500 to-green-600"
    }
  ];

  const capabilities = [
    {
      title: "Competitive & Transparent Pricing",
      description: "Clear, fair pricing with no hidden costs",
      icon: DollarSign,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Bulk & Custom Orders",
      description: "Flexible quantities for any project size",
      icon: Users,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    },
    {
      title: "Fast Quote Turnaround",
      description: "Quick response times for urgent projects",
      icon: Clock,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Branding Consistency",
      description: "Uniform branding across all products",
      icon: Award,
      color: "text-slate-600",
      bgColor: "bg-slate-50"
    },
    {
      title: "Delivery Tracking",
      description: "Complete vendor documentation provided",
      icon: CheckCircle,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    },
    {
      title: "Tax-Exempt & PO Invoicing",
      description: "Flexible billing options for institutions",
      icon: Zap,
      color: "text-green-600",
      bgColor: "bg-green-50"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-primary text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Procurement & Compliance
          </h2>
          <p className="font-accent text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We understand the rigorous standards of government and institutional procurement. Our team efficiently manages quotes, purchase orders, and compliance documentation with precision and accountability.
          </p>
          <div className="w-24 h-1 bg-slate-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Split Layout: Process Timeline + Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          
          {/* Left Side: Process Timeline */}
          <div className="space-y-8">
            <div className="mb-8">
              <h3 className="font-primary text-2xl font-bold text-slate-900 mb-4">
                Our Streamlined Process
              </h3>
              <p className="font-accent text-slate-600 leading-relaxed">
                From initial quote to final delivery, we ensure every step meets your institutional requirements.
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-green-200"></div>
              
              {processSteps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div key={index} className="relative flex items-start gap-6 pb-8 last:pb-0">
                    {/* Icon Container */}
                    <div className={`relative z-10 flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} shadow-lg flex items-center justify-center group hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <h4 className="font-primary text-lg font-semibold text-slate-900 mb-1">
                        {step.title}
                      </h4>
                      <p className="font-accent text-slate-600 text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="lg:order-last">
            <div className="relative aspect-[4/5] lg:aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl group">
              <Image
                src="/government/procurement.png"
                alt="V7MPC Procurement & Compliance Process"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent"></div>
              
              {/* Floating Badge */}
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  <span className="font-accent text-sm font-semibold text-slate-900">Compliance Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Capabilities Grid */}
        <div>
          <div className="text-center mb-10">
            <h3 className="font-primary text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
              Our Capabilities Include
            </h3>
            <p className="font-accent text-slate-600 max-w-2xl mx-auto">
              Comprehensive support designed specifically for government and institutional procurement needs.
            </p>
          </div>

          {/* Grid of Capabilities */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((capability, index) => {
              const IconComponent = capability.icon;
              return (
                <div 
                  key={index}
                  className={`group relative ${capability.bgColor} border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
                >
                  {/* Icon */}
                  <div className="mb-4">
                    <IconComponent className={`w-8 h-8 ${capability.color} group-hover:scale-110 transition-transform duration-300`} />
                  </div>

                  {/* Content */}
                  <h4 className="font-primary text-lg font-semibold text-slate-900 mb-2">
                    {capability.title}
                  </h4>
                  <p className="font-accent text-sm text-slate-600 leading-relaxed">
                    {capability.description}
                  </p>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-lg">
            <h3 className="font-primary text-2xl font-bold text-slate-900 mb-4">
              Ready to Start Your Next Government Project?
            </h3>
            <p className="font-accent text-slate-600 mb-6 max-w-xl mx-auto">
              <strong>Let&apos;s build your solution together.</strong> Get in touch with our procurement specialists to discuss your requirements and receive a detailed quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="font-primary bg-slate-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-slate-700 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
                Request Quote
              </button>
              <button className="font-primary border-2 border-slate-300 text-slate-700 px-8 py-3 rounded-xl font-semibold hover:border-slate-400 hover:text-slate-800 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
                Download Catalog
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}