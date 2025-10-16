import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Shield, Award, ArrowRight, MapPin, Phone, Mail, ChevronRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white overflow-hidden">
      {/* Elegant Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-800/20 to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-600/40 via-slate-600 to-slate-600/40"></div>
      
      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Enhanced Company Section */}
          <div className="space-y-6">
            {/* Larger Logo without frame */}
            <div className="group inline-block">
              <Image
                src="/logo_2.png"
                alt="V7MPC Logo"
                width={100}
                height={100}
                className="transition-all duration-300 group-hover:scale-105"
                priority
              />
            </div>
            
            <div>
              <h3 className="font-primary text-white text-base font-medium mb-3">V7 Marketplace Corporation</h3>
              <p className="font-accent text-gray-400 text-sm leading-relaxed font-light">
                Minority-owned enterprise specializing in sourcing, manufacturing, and promotional solutions.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="group flex items-center space-x-3 text-gray-400 hover:text-gray-200 transition-colors duration-300">
                <div className="flex items-center justify-center w-8 h-8 bg-gray-800/30 rounded-lg group-hover:bg-slate-600/15 transition-colors duration-300">
                  <MapPin className="w-4 h-4 text-slate-600/70" />
                </div>
                <span className="font-accent text-sm font-light">Pensacola, FL</span>
              </div>
              <div className="group flex items-center space-x-3 text-gray-400 hover:text-gray-200 transition-colors duration-300">
                <div className="flex items-center justify-center w-8 h-8 bg-gray-800/30 rounded-lg group-hover:bg-slate-600/15 transition-colors duration-300">
                  <Phone className="w-4 h-4 text-slate-600/70" />
                </div>
                <span className="font-accent text-sm font-light">(850) 850-0140</span>
              </div>
              <div className="group flex items-center space-x-3 text-gray-400 hover:text-gray-200 transition-colors duration-300">
                <div className="flex items-center justify-center w-8 h-8 bg-gray-800/30 rounded-lg group-hover:bg-slate-600/15 transition-colors duration-300">
                  <Mail className="w-4 h-4 text-slate-600/70" />
                </div>
                <span className="font-accent text-sm font-light">contact@v7mpc.com</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-5">
            <h3 className="font-primary text-white text-base font-medium mb-4 flex items-center">
              <div className="w-1 h-5 bg-gradient-to-b from-slate-600 to-slate-500 rounded mr-3"></div>
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/nosotros" className="font-accent text-gray-400 hover:text-white transition-all duration-300 flex items-center group/link text-sm font-light">
                  <ChevronRight className="w-3 h-3 mr-2 text-slate-600/60 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300" />
                  <span className="group-hover/link:translate-x-0.5 transition-transform duration-300">About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/productos" className="font-accent text-gray-400 hover:text-white transition-all duration-300 flex items-center group/link text-sm font-light">
                  <ChevronRight className="w-3 h-3 mr-2 text-slate-600/60 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300" />
                  <span className="group-hover/link:translate-x-0.5 transition-transform duration-300">Products</span>
                </Link>
              </li>
              <li>
                <Link href="/capability-statement" className="font-accent text-gray-400 hover:text-white transition-all duration-300 flex items-center group/link text-sm font-light">
                  <ChevronRight className="w-3 h-3 mr-2 text-slate-600/60 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300" />
                  <span className="group-hover/link:translate-x-0.5 transition-transform duration-300">Capability Statement</span>
                </Link>
              </li>
              <li>
                <Link href="/cotizacion" className="font-accent text-gray-400 hover:text-white transition-all duration-300 flex items-center group/link text-sm font-light">
                  <ChevronRight className="w-3 h-3 mr-2 text-slate-600/60 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300" />
                  <span className="group-hover/link:translate-x-0.5 transition-transform duration-300">Get Quote</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Resources */}
          <div className="space-y-5">
            <h3 className="font-primary text-white text-base font-medium mb-4 flex items-center">
              <div className="w-1 h-5 bg-gradient-to-b from-slate-600 to-slate-500 rounded mr-3"></div>
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/faq" className="font-accent text-gray-400 hover:text-white transition-all duration-300 flex items-center group/link text-sm font-light">
                  <ChevronRight className="w-3 h-3 mr-2 text-slate-600/60 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300" />
                  <span className="group-hover/link:translate-x-0.5 transition-transform duration-300">FAQ</span>
                </Link>
              </li>
              <li>
                <Link href="/shipping-info" className="font-accent text-gray-400 hover:text-white transition-all duration-300 flex items-center group/link text-sm font-light">
                  <ChevronRight className="w-3 h-3 mr-2 text-slate-600/60 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300" />
                  <span className="group-hover/link:translate-x-0.5 transition-transform duration-300">Shipping Info</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="font-accent text-gray-400 hover:text-white transition-all duration-300 flex items-center group/link text-sm font-light">
                  <ChevronRight className="w-3 h-3 mr-2 text-slate-600/60 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300" />
                  <span className="group-hover/link:translate-x-0.5 transition-transform duration-300">Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="font-accent text-gray-400 hover:text-white transition-all duration-300 flex items-center group/link text-sm font-light">
                  <ChevronRight className="w-3 h-3 mr-2 text-slate-600/60 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300" />
                  <span className="group-hover/link:translate-x-0.5 transition-transform duration-300">Terms</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* New Certifications Column */}
          <div className="space-y-5">
            <h3 className="font-primary text-white text-base font-medium mb-4 flex items-center">
              <div className="w-1 h-5 bg-gradient-to-b from-slate-600 to-slate-500 rounded mr-3"></div>
              Certifications
            </h3>
            <div className="space-y-4">
              <div className="group">
                <Badge className="bg-gray-800/40 text-gray-300 border border-gray-700/40 text-sm px-4 py-2.5 font-light transition-all duration-300 hover:bg-gray-700/40 hover:text-white flex items-center backdrop-blur-sm w-full justify-start">
                  <Award className="w-4 h-4 mr-3 text-slate-400/70" />
                  <span className="font-accent">MBE Certified</span>
                </Badge>
              </div>
              <div className="group">
                <Badge className="bg-gray-800/40 text-gray-300 border border-gray-700/40 text-sm px-4 py-2.5 font-light transition-all duration-300 hover:bg-gray-700/40 hover:text-white flex items-center backdrop-blur-sm w-full justify-start">
                  <Shield className="w-4 h-4 mr-3 text-slate-400/70" />
                  <span className="font-accent">WBENC Certified</span>
                </Badge>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700/30">
                <p className="font-accent text-gray-500 text-xs font-light leading-relaxed">
                  Certified minority and women-owned enterprise serving clients nationwide with excellence and integrity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Bottom Footer */}
      <div className="relative border-t border-gray-700/30 bg-gray-900/30 backdrop-blur-sm">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Enhanced Copyright */}
            <div className="flex items-center space-x-3">
              <div className="w-7 h-7 bg-gradient-to-br from-slate-600 to-slate-500 rounded-lg flex items-center justify-center">
                <span className="font-primary font-bold text-white text-xs">V7</span>
              </div>
              <div className="font-accent text-sm text-gray-400 font-light">
                © 2025 <span className="text-gray-300 font-normal">V7MPC.COM</span> • All rights reserved
              </div>
            </div>
            
            {/* Enhanced Quick Links */}
            <div className="flex items-center space-x-8">
              <Link href="/" className="font-accent text-gray-400 hover:text-gray-200 transition-all duration-300 text-sm font-light group">
                <span className="group-hover:underline decoration-slate-600/60 underline-offset-4">Home</span>
              </Link>
              <Link href="/productos" className="font-accent text-gray-400 hover:text-gray-200 transition-all duration-300 text-sm font-light group">
                <span className="group-hover:underline decoration-slate-600/60 underline-offset-4">Products</span>
              </Link>
              <Link href="/nosotros" className="font-accent text-gray-400 hover:text-gray-200 transition-all duration-300 text-sm font-light group">
                <span className="group-hover:underline decoration-slate-600/60 underline-offset-4">About</span>
              </Link>
              <Link href="/contacto" className="font-accent text-gray-400 hover:text-gray-200 transition-all duration-300 text-sm font-light group">
                <span className="group-hover:underline decoration-slate-600/60 underline-offset-4">Contact</span>
              </Link>
            </div>
          </div>

          {/* Enhanced Tagline */}
          <div className="mt-5 pt-5 border-t border-gray-700/20 text-center">
            <p className="font-accent text-sm text-gray-500 font-light max-w-lg mx-auto">
              Empowering businesses through strategic sourcing and promotional solutions
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}