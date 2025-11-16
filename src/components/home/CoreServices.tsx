import { Building2, ShieldCheck, Award, Network } from 'lucide-react';

export default function CoreServices() {
  const services = [
    {
      icon: Building2,
      title: 'Product Development & Customization',
      description: 'Helping clients design and customize private-label or promotional products according to brand, specifications, or project needs.',
      gradient: 'from-slate-500 to-slate-600'
    },
    {
      icon: Network,
      title: 'Supplier Coordination & Production Management',
      description: 'Managing manufacturing partners (domestic and international), overseeing production timelines, quality control, and compliance with client or government standards.',
      gradient: 'from-slate-500 to-slate-600'
    },
    {
      icon: ShieldCheck,
      title: 'Procurement & Quality Assurance',
      description: 'Ensuring the right materials, finishes, and packaging are sourced and that every product meets rigorous standards before shipment.',
      gradient: 'from-slate-500 to-slate-600'
    },
    {
      icon: Award,
      title: 'Logistics Integration',
      description: 'Coordinating shipping, fulfillment, and delivery — connecting the manufacturing process with your clients\' supply chain.',
      gradient: 'from-slate-500 to-slate-600'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-primary text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 mb-4">
            Our Core 
            <span className="block text-slate-600">
              Services
            </span>
          </h2>
          <div className="w-24 h-1 bg-slate-600 mx-auto rounded-full mb-6"></div>
          <p className="font-accent text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive solutions that set us apart in the marketplace, delivering excellence at every step of your project
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={index}
                className="group bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 hover:border-gray-200"
              >
                {/* Two Column Layout */}
                <div className="flex items-start gap-6">
                  {/* Left Column - Icon */}
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Right Column - Content */}
                  <div className="flex-1">
                    {/* Title */}
                    <h3 className="font-primary text-xl font-bold text-slate-900 mb-4 group-hover:text-slate-800 transition-colors leading-tight">
                      {service.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="font-accent text-base text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Decorative bottom border */}
                <div className={`mt-6 h-1 bg-gradient-to-r ${service.gradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 lg:mt-16">
          <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl p-8 lg:p-10 border border-gray-200/50 shadow-sm">
            <h3 className="font-primary text-2xl font-bold text-slate-900 mb-4">
              Ready to Experience the V7MP Difference?
            </h3>
            <p className="font-accent text-lg text-slate-600 mb-6 max-w-2xl mx-auto">
              Let us show you how our comprehensive approach can streamline your procurement process and deliver exceptional results.
            </p>
            <a 
              href="/quote"
              className="inline-flex items-center gap-3 bg-slate-700 hover:bg-slate-800 text-white font-primary font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-slate-500/20"
            >
              <span>Get Started Today</span>
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}