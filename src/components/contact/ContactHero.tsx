import { Phone, MapPin, Mail, MessageSquare, Clock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ContactHero() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Two Column Header Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Left Column - Content */}
          <div className="lg:pr-8">
            <h1 className="font-primary text-3xl lg:text-5xl xl:text-6xl font-bold text-slate-900 mb-6">
              Get In Touch With Us
            </h1>
            <div className="w-24 h-1 bg-slate-600 rounded-full mb-8"></div>
            <p className="font-accent text-lg lg:text-xl text-slate-700 leading-relaxed mb-6">
              We're here to help! Whether you have questions about our products, want to discuss customization options, or need assistance with an order, our team is ready to assist you.
            </p>
            <p className="font-accent text-base text-slate-600 leading-relaxed">
              With years of experience in government contracting and commercial solutions, we bring expertise and dedication to every project. Contact us today to discover how we can support your success.
            </p>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="/images/government/contact.png"
                alt="Professional team ready to assist with your project needs"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent" />
            </div>
          </div>
        </div>

        {/* Contact Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          
          {/* Phone */}
          <div className="group bg-white/90 backdrop-blur-sm p-8 rounded-2xl border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-primary text-xl font-semibold text-slate-900 mb-3">
                  Office Phone Number
                </h3>
                <p className="font-accent text-slate-600 text-sm mb-4">
                  Call us at
                </p>
                <a
                  href="tel:+18508500140"
                  className="font-primary text-lg font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-300 group-hover:underline"
                >
                  (850) 850-0140
                </a>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="group bg-white/90 backdrop-blur-sm p-8 rounded-2xl border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-primary text-xl font-semibold text-slate-900 mb-3">
                  Office Address
                </h3>
                <div className="font-accent text-slate-600 text-sm leading-relaxed">
                  <p>225 N Pace Blvd. Suite 225</p>
                  <p>Pensacola, FL 32505</p>
                  <p>United States</p>
                </div>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="group bg-white/90 backdrop-blur-sm p-8 rounded-2xl border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-primary text-xl font-semibold text-slate-900 mb-3">
                  Office Email
                </h3>
                <p className="font-accent text-slate-600 text-sm mb-4">
                  Send us a message
                </p>
                <a 
                  href="mailto:Contact@v7mpc.com" 
                  className="font-primary text-lg font-semibold text-purple-600 hover:text-purple-700 transition-colors duration-300 group-hover:underline"
                >
                  Contact@v7mpc.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Business Hours & Response Time */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Business Hours */}
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-primary text-xl font-semibold text-slate-900 mb-4">
                  Business Hours
                </h3>
                <div className="space-y-2 font-accent text-slate-600">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span className="font-semibold">8:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="font-semibold">9:00 AM - 2:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="font-semibold">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Response */}
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center shrink-0">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-primary text-xl font-semibold text-slate-900 mb-4">
                  Quick Response Guarantee
                </h3>
                <p className="font-accent text-slate-700 leading-relaxed">
                  We prioritize communication with our clients. All inquiries receive a response within <span className="font-semibold text-slate-900">24 hours during business days</span>. For urgent matters, don't hesitate to call us directly.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}