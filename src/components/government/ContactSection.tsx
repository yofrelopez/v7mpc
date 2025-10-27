import Image from 'next/image';
import { Phone, Mail, MessageSquare, FileText, Users, Shield, Award, ArrowRight } from 'lucide-react';

export default function ContactSection() {
  const contactMethods = [
    {
      title: "Phone",
      value: "+1 (555) 123-4567",
      icon: Phone,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      action: "Call Now"
    },
    {
      title: "Email",
      value: "government@v7mpc.com",
      icon: Mail,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      action: "Send Email"
    },
    {
      title: "Response Time",
      value: "Within 24 hours",
      icon: MessageSquare,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      action: "Guaranteed"
    }
  ];

  const trustBadges = [
    {
      title: "Certified Supplier",
      icon: Shield,
      color: "text-blue-600"
    },
    {
      title: "Government Approved",
      icon: Award,
      color: "text-emerald-600"
    },
    {
      title: "Trusted Partner",
      icon: Users,
      color: "text-purple-600"
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <div className="order-2 lg:order-1 space-y-8">
            
            {/* Main Heading */}
            <div>
              <h2 className="font-primary text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
                Ready to Partner with{' '}
                <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                  V7 Marketplace?
                </span>
              </h2>
              <p className="font-accent text-xl text-slate-300 leading-relaxed max-w-xl">
                Our dedicated government team is ready to support your agency or institution with excellence and reliability. 
                Reach out for quotes, contract requests, or supplier documentation.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6">
              {trustBadges.map((badge, index) => {
                const IconComponent = badge.icon;
                return (
                  <div key={index} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                    <IconComponent className={`w-5 h-5 ${badge.color}`} />
                    <span className="font-accent text-sm font-medium text-slate-300">
                      {badge.title}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <div key={index} className="group flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <div className={`w-12 h-12 ${method.bgColor} rounded-xl flex items-center justify-center`}>
                      <IconComponent className={`w-6 h-6 ${method.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-primary text-sm font-semibold text-slate-300 mb-1">
                        {method.title}
                      </h4>
                      <p className="font-accent text-white text-lg">
                        {method.value}
                      </p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="font-accent text-sm text-blue-400">
                        {method.action}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="group inline-flex items-center gap-3 font-primary bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-blue-500/25 hover:-translate-y-1 transition-all duration-300 hover:from-blue-700 hover:to-blue-800">
                <Users className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                Contact Government Team
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <button className="group inline-flex items-center gap-3 font-primary bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 hover:border-white/50 hover:-translate-y-1 transition-all duration-300">
                <FileText className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                Request Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

            {/* Additional Info */}
            <div className="pt-6 border-t border-white/10">
              <p className="font-accent text-slate-400 text-sm leading-relaxed">
                <span className="text-white font-semibold">Quick Response Guarantee:</span> All government inquiries receive priority handling 
                with response times within 24 hours. Our team understands the urgency of public sector projects.
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl group">
                <Image
                  src="/government/contact.png"
                  alt="V7MPC Government Team - Ready to Partner with Your Institution"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
                
                {/* Floating Elements */}
                <div className="absolute top-6 right-6 bg-emerald-500 text-white rounded-full p-3 shadow-lg animate-pulse">
                  <MessageSquare className="w-6 h-6" />
                </div>
                
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                    <div>
                      <p className="font-primary text-sm font-semibold text-slate-900">Available Now</p>
                      <p className="font-accent text-xs text-slate-600">Ready to assist your project</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -z-10 inset-0 bg-gradient-to-br from-blue-500/20 to-emerald-500/20 rounded-3xl blur-xl scale-105"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>

        {/* Bottom Stats/Info */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-slate-400 font-accent">Government Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">24hr</div>
              <div className="text-slate-400 font-accent">Response Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">15+</div>
              <div className="text-slate-400 font-accent">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}