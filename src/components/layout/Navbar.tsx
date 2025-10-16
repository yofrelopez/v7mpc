'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronDown,
  Shield,
  Award,
  ArrowRight
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle scroll effect with modern smooth transition
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced outside click handler
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (!(event.target as Element).closest('.navbar-container')) {
        setIsOpen(false);
        setActiveDropdown(null);
      }
    };
    
    if (isOpen || activeDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isOpen, activeDropdown]);

  const toggleMobileMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <>

      {/* Modern Navigation */}
      <nav 
        className={`navbar-container py-2 sticky top-0 w-full z-50 transition-all duration-700 ease-out border-t-6 border-t-slate-600 ${
          isMounted && isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-2xl shadow-gray-900/10 border-b border-gray-200/50' 
            : 'bg-white/98 shadow-lg'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-500 ${
            isMounted && isScrolled ? 'h-16' : 'h-20'
          }`}>
            
            {/* Clean Logo Section */}
            <div className="flex items-center">
              <Link href="/" className="group p-2">
                <div className="relative">
                  {/* Clean horizontal logo without background */}
                  <div className="flex items-center justify-center transition-all duration-500">
                    <Image
                      src="/logo_2.png"
                      alt="V7MPC Logo"
                      width={isMounted && isScrolled ? 70 : 90}
                      height={isMounted && isScrolled ? 50 : 58}
                      className="transition-all duration-500 group-hover:scale-105"
                      priority
                    />
                  </div>
                </div>
              </Link>
            </div>

            {/* Modern Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              <Link href="/">
                <Button 
                  variant="ghost" 
                  className="font-primary text-gray-700 hover:text-gray-900 hover:bg-gray-100/70 font-medium px-5 py-2.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Inicio
                </Button>
              </Link>

              {/* Modern Products Dropdown */}
              <div className="relative">
                <Button 
                  variant="ghost" 
                  className="font-primary text-gray-700 hover:text-gray-900 hover:bg-gray-100/70 font-medium px-5 py-2.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg flex items-center gap-1"
                  onMouseEnter={() => setActiveDropdown('products')}
                  onClick={() => handleDropdownToggle('products')}
                >
                  Productos
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                    activeDropdown === 'products' ? 'rotate-180' : ''
                  }`} />
                </Button>
                
                {/* Modern Products Dropdown Menu */}
                {activeDropdown === 'products' && (
                  <div 
                    className="absolute top-full left-0 mt-3 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 py-4 z-50 animate-in slide-in-from-top-2 duration-300"
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link 
                      href="/productos" 
                      className="group flex items-center justify-between px-6 py-4 text-sm text-gray-700 hover:bg-gray-50 transition-all duration-200"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div>
                        <div className="font-primary font-semibold text-gray-900 group-hover:text-gray-800">Catálogo Completo</div>
                        <div className="font-accent text-xs text-gray-500 mt-1">Explorar toda nuestra gama de productos</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200" />
                    </Link>
                    
                    <div className="border-t border-gray-100 my-2"></div>
                    
                    <Link 
                      href="/productos" 
                      className="font-accent flex items-center px-6 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors duration-200"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                      Productos Promocionales
                    </Link>
                    <Link 
                      href="/productos" 
                      className="font-accent flex items-center px-6 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors duration-200"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                      Suministros de Oficina
                    </Link>
                    <Link 
                      href="/productos" 
                      className="font-accent flex items-center px-6 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors duration-200"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                      Manufactura Personalizada
                    </Link>
                  </div>
                )}
              </div>

              <Link href="/nosotros">
                <Button 
                  variant="ghost" 
                  className="font-primary text-gray-700 hover:text-gray-900 hover:bg-gray-100/70 font-medium px-5 py-2.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Nosotros
                </Button>
              </Link>

              <Link href="/contacto">
                <Button 
                  variant="ghost" 
                  className="font-primary text-gray-700 hover:text-gray-900 hover:bg-gray-100/70 font-medium px-5 py-2.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Contacto
                </Button>
              </Link>
            </div>

            {/* Modern CTA Section */}
            <div className="flex items-center space-x-4">
              {/* Certifications - Desktop */}
              <div className="hidden xl:flex items-center justify-center space-x-2 h-full">
                <Badge className="font-accent bg-gray-50/80 text-gray-600 border border-gray-200/50 text-xs px-3 py-1.5 font-normal transition-all duration-300 hover:bg-gray-100/60 hover:text-gray-700 flex items-center">
                  <Award width={14} height={14} className="mr-1.5 text-slate-500/60" />
                  MBE Certified
                </Badge>
                <Badge className="font-accent bg-gray-50/80 text-gray-600 border border-gray-200/50 text-xs px-3 py-1.5 font-normal transition-all duration-300 hover:bg-gray-100/60 hover:text-gray-700 flex items-center">
                  <Shield width={12} height={12} className="mr-1.5 text-slate-500/60" />
                  WBENC
                </Badge>
              </div>

              {/* Refined Quote Button */}
              <Link href="/cotizacion">
                <Button 
                  className="font-primary group bg-white/80 text-slate-600 hover:text-slate-700 font-medium px-5 py-2.5 rounded-xl border-2 border-slate-400/60 hover:border-slate-600 transition-all duration-300"
                >
                  <span className="flex items-center gap-2">
                    <span className="hidden sm:inline">Request Quote</span>
                    <span className="sm:hidden">Quote</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-all duration-300" />
                  </span>
                </Button>
              </Link>

              {/* Modern Mobile Menu Button */}
              <Button
                variant="ghost"
                className="lg:hidden p-2.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                onClick={toggleMobileMenu}
              >
                <div className="relative w-6 h-6">
                  <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${
                    isOpen ? 'rotate-45 top-3' : 'rotate-0 top-1'
                  }`}></span>
                  <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 top-3 ${
                    isOpen ? 'opacity-0' : 'opacity-100'
                  }`}></span>
                  <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${
                    isOpen ? '-rotate-45 top-3' : 'rotate-0 top-5'
                  }`}></span>
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Elegant Classic Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden absolute left-0 right-0 top-full z-40 bg-white/98 backdrop-blur-xl border-t border-gray-200/50 shadow-2xl shadow-gray-900/5 animate-in slide-in-from-top-5 duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <div className="max-w-7xl mx-auto">
              
              {/* Elegant Mobile Navigation */}
              <div className="py-4">
                
                {/* Home Link */}
                <Link href="/" onClick={() => setIsOpen(false)}>
                  <div className="group flex items-center px-6 py-4 text-gray-700 hover:text-gray-900 hover:bg-gradient-to-r hover:from-gray-50/80 hover:to-transparent transition-all duration-300 border-l-4 border-transparent hover:border-slate-500">
                    <span className="font-primary font-normal text-base tracking-wide">Inicio</span>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="w-4 h-4 text-slate-500" />
                    </div>
                  </div>
                </Link>

                {/* Products Section with Enhanced Animation */}
                <div>
                  <button 
                    className="group w-full flex items-center justify-between px-6 py-4 text-gray-700 hover:text-gray-900 hover:bg-gradient-to-r hover:from-gray-50/80 hover:to-transparent transition-all duration-300 border-l-4 border-transparent hover:border-slate-500"
                    onClick={() => handleDropdownToggle('mobile-products')}
                  >
                    <span className="font-primary font-normal text-base tracking-wide">Productos</span>
                    <ChevronDown className={`w-5 h-5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      activeDropdown === 'mobile-products' ? 'rotate-180 text-slate-600 scale-110' : 'group-hover:text-gray-600'
                    }`} />
                  </button>
                  
                  {/* Refined Sub-menu with Staggered Animation */}
                  {activeDropdown === 'mobile-products' && (
                    <div className="bg-gradient-to-r from-gray-50/60 to-gray-50/30 border-l-4 border-slate-600/20 animate-in slide-in-from-top-3 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                      <div className="py-2 space-y-0.5">
                        
                        <Link href="/productos" onClick={() => setIsOpen(false)}>
                          <div className="group flex items-center px-12 py-3 text-gray-600 hover:text-gray-800 hover:bg-white/70 transition-all duration-400 animate-in slide-in-from-left-4 delay-150">
                            <div className="w-1 h-1 bg-gray-400 rounded-full mr-4 group-hover:bg-slate-600 group-hover:scale-125 transition-all duration-400"></div>
                            <span className="font-accent text-sm font-light tracking-wide">Catálogo Completo</span>
                            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-400 group-hover:translate-x-1">
                              <ArrowRight className="w-3 h-3 text-slate-600" />
                            </div>
                          </div>
                        </Link>

                        <Link href="/productos" onClick={() => setIsOpen(false)}>
                          <div className="group flex items-center px-12 py-3 text-gray-600 hover:text-gray-800 hover:bg-white/70 transition-all duration-400 animate-in slide-in-from-left-4 delay-200">
                            <div className="w-1 h-1 bg-gray-400 rounded-full mr-4 group-hover:bg-slate-600 group-hover:scale-125 transition-all duration-400"></div>
                            <span className="font-accent text-sm font-light tracking-wide">Productos Promocionales</span>
                            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-400 group-hover:translate-x-1">
                              <ArrowRight className="w-3 h-3 text-slate-600" />
                            </div>
                          </div>
                        </Link>

                        <Link href="/productos" onClick={() => setIsOpen(false)}>
                          <div className="group flex items-center px-12 py-3 text-gray-600 hover:text-gray-800 hover:bg-white/70 transition-all duration-400 animate-in slide-in-from-left-4 delay-250">
                            <div className="w-1 h-1 bg-gray-400 rounded-full mr-4 group-hover:bg-slate-600 group-hover:scale-125 transition-all duration-400"></div>
                            <span className="font-accent text-sm font-light tracking-wide">Suministros de Oficina</span>
                            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-400 group-hover:translate-x-1">
                              <ArrowRight className="w-3 h-3 text-slate-600" />
                            </div>
                          </div>
                        </Link>

                        <Link href="/productos" onClick={() => setIsOpen(false)}>
                          <div className="group flex items-center px-12 py-3 text-gray-600 hover:text-gray-800 hover:bg-white/70 transition-all duration-400 animate-in slide-in-from-left-4 delay-300">
                            <div className="w-1 h-1 bg-gray-400 rounded-full mr-4 group-hover:bg-slate-600 group-hover:scale-125 transition-all duration-400"></div>
                            <span className="font-accent text-sm font-light tracking-wide">Manufactura Personalizada</span>
                            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-400 group-hover:translate-x-1">
                              <ArrowRight className="w-3 h-3 text-slate-600" />
                            </div>
                          </div>
                        </Link>

                      </div>
                    </div>
                  )}
                </div>

                {/* About Link */}
                <Link href="/nosotros" onClick={() => setIsOpen(false)}>
                  <div className="group flex items-center px-6 py-4 text-gray-700 hover:text-gray-900 hover:bg-gradient-to-r hover:from-gray-50/80 hover:to-transparent transition-all duration-300 border-l-4 border-transparent hover:border-slate-500">
                    <span className="font-primary font-normal text-base tracking-wide">Nosotros</span>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="w-4 h-4 text-slate-600" />
                    </div>
                  </div>
                </Link>

                {/* Contact Link */}
                <Link href="/contacto" onClick={() => setIsOpen(false)}>
                  <div className="group flex items-center px-6 py-4 text-gray-700 hover:text-gray-900 hover:bg-gradient-to-r hover:from-gray-50/80 hover:to-transparent transition-all duration-300 border-l-4 border-transparent hover:border-slate-500">
                    <span className="font-primary font-normal text-base tracking-wide">Contacto</span>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="w-4 h-4 text-slate-600" />
                    </div>
                  </div>
                </Link>

              </div>

              {/* Elegant Bottom Accent */}
              <div className="h-1 bg-gradient-to-r from-slate-600/20 via-slate-600 to-slate-600/20"></div>

            </div>
          </div>
        )}
      </nav>
    </>
  );
}
