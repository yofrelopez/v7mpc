import { FileText, Download, Shield, Award, CheckCircle, Building } from 'lucide-react';

export default function CapabilityStatement() {
  const documentFeatures = [
    {
      title: "NAICS Codes",
      description: "Complete classification codes for our services",
      icon: Building,
      color: "text-blue-600"
    },
    {
      title: "Certifications",
      description: "All current certifications and compliance status",
      icon: Award,
      color: "text-emerald-600"
    },
    {
      title: "Past Performance",
      description: "References and successful project history",
      icon: CheckCircle,
      color: "text-purple-600"
    },
    {
      title: "Quality Assurance",
      description: "Standards and quality control processes",
      icon: Shield,
      color: "text-indigo-600"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-primary text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Capability Statement
          </h2>
          <p className="font-accent text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Download our official Capability Statement (PDF) to view our NAICS codes, certifications, and past performance references.
          </p>
          <div className="w-24 h-1 bg-slate-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Main Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-3xl p-8 lg:p-12 shadow-lg hover:shadow-xl transition-all duration-500 group">
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 rounded-3xl overflow-hidden">
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-slate-300 rounded-full"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-slate-400 rounded-full"></div>
            </div>

            {/* Content */}
            <div className="relative z-10">
              
              {/* Icon and Title Section */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl shadow-lg mb-6 group-hover:scale-110 group-hover:shadow-xl transition-all duration-500">
                  <FileText className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="font-primary text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
                  Official Capability Statement
                </h3>
                
                <p className="font-accent text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
                  Comprehensive documentation of our capabilities, certifications, and track record for government contracting.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {documentFeatures.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={index} className="text-center group/item">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-sm mb-3 group-hover/item:shadow-md group-hover/item:scale-105 transition-all duration-300">
                        <IconComponent className={`w-6 h-6 ${feature.color}`} />
                      </div>
                      <h4 className="font-primary text-sm font-semibold text-slate-900 mb-1">
                        {feature.title}
                      </h4>
                      <p className="font-accent text-xs text-slate-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Document Info */}
              <div className="bg-white rounded-2xl p-6 mb-8 border border-slate-200/50 shadow-sm">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-primary text-lg font-semibold text-slate-900 mb-1">
                      V7MPC-CapabilityStatement-2024.pdf
                    </h4>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <span className="font-accent">File Size: 2.3 MB</span>
                      <span className="font-accent">Last Updated: October 2024</span>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="font-accent">Current</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* PDF Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-lg flex items-center justify-center">
                      <FileText className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Download Button */}
              <div className="text-center">
                <button className="group/btn inline-flex items-center gap-3 font-primary bg-gradient-to-r from-slate-600 to-slate-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:from-slate-700 hover:to-slate-800">
                  <Download className="w-6 h-6 group-hover/btn:animate-bounce" />
                  Download Capability Statement
                </button>
                
                <p className="font-accent text-sm text-slate-500 mt-4">
                  Free download • No registration required • Compatible with all devices
                </p>
              </div>

            </div>

            {/* Decorative Border */}
            <div className="absolute inset-0 rounded-3xl border-2 border-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-12 text-center">
          <div className="max-w-2xl mx-auto">
            <h4 className="font-primary text-xl font-semibold text-slate-900 mb-4">
              Need Additional Documentation?
            </h4>
            <p className="font-accent text-slate-600 mb-6 leading-relaxed">
              Contact our team for specific certifications, insurance certificates, or custom capability statements tailored to your project requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="font-primary border-2 border-slate-300 text-slate-700 px-6 py-3 rounded-xl font-semibold hover:border-slate-400 hover:text-slate-800 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">
                Request Custom Documentation
              </button>
              <button className="font-primary border-2 border-slate-300 text-slate-700 px-6 py-3 rounded-xl font-semibold hover:border-slate-400 hover:text-slate-800 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">
                Contact Our Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}