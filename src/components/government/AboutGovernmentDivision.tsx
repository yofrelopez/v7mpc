import { Shield, Award, CheckCircle, Building } from 'lucide-react';

export default function AboutGovernmentDivision() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-primary text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            About Our Government Division
          </h2>
          <div className="w-24 h-1 bg-slate-600 mx-auto rounded-full"></div>
        </div>

        {/* Main Content - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Left Column - Content */}
          <div className="space-y-8">
            
            {/* Experience Description */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-primary text-xl font-semibold text-slate-900">Our Experience</h3>
                  <p className="font-accent text-slate-600 text-sm">Two Decades of Excellence</p>
                </div>
              </div>
              
              <p className="font-accent text-lg text-slate-700 leading-relaxed">
                With <span className="font-semibold text-slate-900">more than 20 years</span> of experience supporting federal agencies, state and local governments, schools, universities, and religious organizations, we understand the unique requirements of public sector procurement.
              </p>
              
              {/* Timeline Visual */}
              <div className="flex items-center gap-4 p-4 bg-slate-100/50 rounded-lg border border-slate-200/50">
                <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-sm">20+</span>
                </div>
                <div>
                  <p className="font-accent text-sm text-slate-600">Years serving government institutions</p>
                  <p className="font-accent text-xs text-slate-500">Federal • State • Local • Educational</p>
                </div>
              </div>
            </div>

            {/* Mission Statement */}
            <div className="bg-white/80 backdrop-blur-sm p-6 lg:p-8 rounded-xl border border-slate-200/50 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="text-6xl text-slate-300 leading-none font-serif">&ldquo;</div>
                <div>
                  <h3 className="font-primary text-lg font-semibold text-slate-900 mb-3">Our Mission</h3>
                  <p className="font-accent text-base text-slate-700 leading-relaxed italic">
                    Simplify the procurement process by offering reliable products, transparent pricing, and timely delivery — all while maintaining excellence in design and service.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Certifications Grid */}
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h3 className="font-primary text-2xl font-semibold text-slate-900 mb-2">
                Certifications & Credentials
              </h3>
              <p className="font-accent text-slate-600">
                Verified qualifications for government contracting
              </p>
            </div>

            {/* Certifications Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              
              {/* MBE Certification */}
              <div className="group bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-primary font-semibold text-slate-900">MBE Certified</h4>
                    <p className="font-accent text-sm text-slate-600">Minority Business Enterprise</p>
                  </div>
                  <div className="w-3 h-3 bg-emerald-500 rounded-full group-hover:scale-125 transition-transform"></div>
                </div>
              </div>

              {/* WBENC Certification */}
              <div className="group bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shrink-0">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-primary font-semibold text-slate-900">WBENC Certified</h4>
                    <p className="font-accent text-sm text-slate-600">Woman-Owned Business</p>
                  </div>
                  <div className="w-3 h-3 bg-purple-500 rounded-full group-hover:scale-125 transition-transform"></div>
                </div>
              </div>

              {/* SAM Registration */}
              <div className="group bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shrink-0">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-primary font-semibold text-slate-900">SAM Registered</h4>
                    <p className="font-accent text-sm text-slate-600">Government Vendor</p>
                  </div>
                  <div className="w-3 h-3 bg-blue-500 rounded-full group-hover:scale-125 transition-transform"></div>
                </div>
              </div>

              {/* DUNS & CAGE */}
              <div className="group bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-slate-500 to-slate-600 rounded-lg flex items-center justify-center shrink-0">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-primary font-semibold text-slate-900">DUNS & CAGE</h4>
                    <p className="font-accent text-sm text-slate-600">Available upon request</p>
                  </div>
                  <div className="w-3 h-3 bg-slate-500 rounded-full group-hover:scale-125 transition-transform"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}