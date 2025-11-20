import Image from 'next/image';
import { Medal, Shirt, Briefcase, Signpost } from 'lucide-react';

export default function CoreOfferings() {
  const offerings = [
    {
      title: "Jewelry & Recognition Awards",
      description: "Custom medals, pins, plaques, and commemorative awards designed for recognition and service programs.",
      icon: Medal,
      color: "from-slate-600 to-slate-700",
      bgColor: "bg-slate-50",
      borderColor: "border-slate-200",
      textColor: "text-slate-700"
    },
    {
      title: "Apparel",
      description: "Custom uniforms, event apparel, and branded clothing for teams, schools, and departments.",
      icon: Shirt,
      color: "from-slate-500 to-slate-600",
      bgColor: "bg-slate-50",
      borderColor: "border-slate-200",
      textColor: "text-slate-700"
    },
    {
      title: "Promotional & Office Products",
      description: "Branded pens, mugs, lanyards, and office essentials — ideal for outreach, recruitment, and campaign visibility.",
      icon: Briefcase,
      color: "from-gray-600 to-gray-700",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      textColor: "text-gray-700"
    },
    {
      title: "Signs & Displays",
      description: "Indoor/outdoor signage, banners, and visual materials for events and facilities.",
      icon: Signpost,
      color: "from-slate-700 to-slate-800",
      bgColor: "bg-slate-50",
      borderColor: "border-slate-200",
      textColor: "text-slate-700"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="font-primary text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Core Offerings for Government & Institutions
          </h2>
          <p className="font-accent text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Comprehensive solutions designed specifically for public sector needs, delivering quality and compliance in every project.
          </p>
          <div className="w-24 h-1 bg-slate-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Central Hero Image */}
        <div className="mb-12 lg:mb-16 sm:px-12 lg:px-16 xl:px-20">
          <div className="relative aspect-[3/2] overflow-hidden shadow-xl group">
            <Image
              src="/images/government/core_offerings_products.png"
              alt="V7MPC Core Offerings for Government & Institutions"
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent"></div>
          </div>
        </div>

        {/* Offerings Grid - 4 columns on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {offerings.map((offering, index) => {
            const IconComponent = offering.icon;
            return (
              <div 
                key={index}
                className="group relative bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Gradient Background Overlay - Much more subtle */}
                <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-80 rounded-2xl transition-opacity duration-500"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  
                  {/* Icon Container */}
                  <div className="mb-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${offering.color} shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-primary text-xl lg:text-2xl font-bold text-slate-900 mb-4 group-hover:text-slate-800 transition-colors">
                    {offering.title}
                  </h3>

                  {/* Description */}
                  <p className="font-accent text-base text-slate-600 leading-relaxed mb-6 group-hover:text-slate-700 transition-colors">
                    {offering.description}
                  </p>

                  {/* Decorative Element - More Subtle */}
                  <div className={`absolute top-4 right-4 w-12 h-12 ${offering.bgColor} rounded-full opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500`}></div>
                </div>

                {/* Border Gradient on Hover */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 border-2 bg-gradient-to-br ${offering.color} -z-10 blur-sm`}></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-12 lg:mt-16 text-center">
          <div className="bg-slate-50 rounded-2xl p-8 lg:p-12 border border-slate-200/50">
            <h3 className="font-primary text-2xl font-bold text-slate-900 mb-4">
              Ready to Explore Our Solutions?
            </h3>
            <p className="font-accent text-slate-600 mb-6 max-w-xl mx-auto">
              Contact our government division specialists to discuss your specific requirements and compliance needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="font-primary bg-slate-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-slate-700 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
                Request Consultation
              </button>
              <button className="font-primary border-2 border-slate-300 text-slate-700 px-8 py-3 rounded-xl font-semibold hover:border-slate-400 hover:text-slate-800 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}