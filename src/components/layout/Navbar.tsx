'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProductsSolutionsMenu from '@/components/solutions/ProductsSolutionsMenu';
import {
  ChevronDown,
  Shield,
  Award,
  ArrowRight,
  Package
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
        className={`navbar-container backdrop-blur-xl bg-white/90 border-b border-white/20 py-2 sticky top-0 w-full z-50 transition-all duration-700 ease-out border-t-4 border-t-slate-600 ${isMounted && isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-2xl shadow-gray-900/10 border-b border-gray-200/50'
          : 'bg-white/98 shadow-lg'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`relative flex items-center justify-between transition-all duration-500 ${isMounted && isScrolled ? 'h-16' : 'h-20'
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

            {/* Professional Desktop Navigation (English) */}
            <div className="hidden lg:flex items-center space-x-2">
              <Link href="/">
                <Button
                  variant="ghost"
                  className="font-primary text-gray-700 hover:text-gray-900 hover:bg-gray-100/70 font-medium px-5 py-2.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  onMouseEnter={() => setActiveDropdown(null)}
                >
                  Home
                </Button>
              </Link>

              {/* Unified Products & Solutions Dropdown */}
              <div className="">
                <Button
                  variant="ghost"
                  className="font-primary text-gray-700 hover:text-gray-900 hover:bg-gray-100/70 font-medium px-5 py-2.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg flex items-center gap-1"
                  onMouseEnter={() => setActiveDropdown('solutions')}
                  onClick={() => handleDropdownToggle('solutions')}
                >
                  Products & Solutions
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === 'solutions' ? 'rotate-180' : ''
                    }`} />
                </Button>

                {/* Unified Mega Menu Dropdown */}
                {activeDropdown === 'solutions' && (
                  <div
                    className="absolute top-full left-0 w-full mt-2 z-50 animate-in slide-in-from-top-2 duration-300 px-4"
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {/* Centered Container for the mega menu */}
                    <div className="max-w-7xl mx-auto">
                      <ProductsSolutionsMenu onItemClick={() => setActiveDropdown(null)} />
                    </div>
                  </div>
                )}
              </div>

              <Link href="/government-institutions">
                <Button
                  variant="ghost"
                  className="font-primary text-gray-700 hover:text-gray-900 hover:bg-gray-100/70 font-medium px-5 py-2.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  onMouseEnter={() => setActiveDropdown(null)}
                >
                  Government & Institutions
                </Button>
              </Link>

              <Link href="/about">
                <Button
                  variant="ghost"
                  className="font-primary text-gray-700 hover:text-gray-900 hover:bg-gray-100/70 font-medium px-5 py-2.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  onMouseEnter={() => setActiveDropdown(null)}
                >
                  About
                </Button>
              </Link>

              <Link href="/contact">
                <Button
                  variant="ghost"
                  className="font-primary text-gray-700 hover:text-gray-900 hover:bg-gray-100/70 font-medium px-5 py-2.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  onMouseEnter={() => setActiveDropdown(null)}
                >
                  Contact
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

              {/* Modern Mobile Menu Button */}
              <Button
                variant="ghost"
                className="lg:hidden p-2.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                onClick={toggleMobileMenu}
              >
                <div className="relative w-6 h-6">
                  <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${isOpen ? 'rotate-45 top-3' : 'rotate-0 top-1'
                    }`}></span>
                  <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 top-3 ${isOpen ? 'opacity-0' : 'opacity-100'
                    }`}></span>
                  <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${isOpen ? '-rotate-45 top-3' : 'rotate-0 top-5'
                    }`}></span>
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Elegant Classic Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden absolute left-0 right-0 top-full z-40 bg-white/98 backdrop-blur-xl border-t border-gray-200/50 shadow-2xl shadow-gray-900/5 animate-in slide-in-from-top-5 duration-700 ease-spring">
            <div className="max-w-7xl mx-auto">

              {/* Elegant Mobile Navigation */}
              <div className="py-4">

                {/* Home Link */}
                <Link href="/" onClick={() => setIsOpen(false)}>
                  <div className="group flex items-center px-6 py-4 text-gray-700 hover:text-gray-900 hover:bg-gradient-to-r hover:from-gray-50/80 hover:to-transparent transition-all duration-300 border-l-4 border-transparent hover:border-slate-500">
                    <span className="font-primary font-normal text-base tracking-wide">Home</span>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="w-4 h-4 text-slate-500" />
                    </div>
                  </div>
                </Link>

                {/* Products & Solutions Section with Enhanced Animation */}
                {/* Unified Mobile Products & Solutions */}
                <div>
                  <button
                    className="group w-full flex items-center justify-between px-6 py-4 text-gray-700 hover:text-gray-900 hover:bg-gradient-to-r hover:from-gray-50/80 hover:to-transparent transition-all duration-300 border-l-4 border-transparent hover:border-slate-500"
                    onClick={() => handleDropdownToggle('mobile-solutions')}
                  >
                    <span className="font-primary font-normal text-base tracking-wide">Products & Solutions</span>
                    <ChevronDown className={`w-5 h-5 transition-all duration-500 ease-spring ${activeDropdown === 'mobile-solutions' ? 'rotate-180 text-slate-600 scale-110' : 'group-hover:text-gray-600'
                      }`} />
                  </button>

                  {/* Mobile Dropdown Body */}
                  {activeDropdown === 'mobile-solutions' && (
                    <ProductsSolutionsMenu isMobile={true} onItemClick={() => setIsOpen(false)} />
                  )}
                </div>

                {/* Government & Institutions Link */}
                <Link href="/government-institutions" onClick={() => setIsOpen(false)}>
                  <div className="group flex items-center px-6 py-4 text-gray-700 hover:text-gray-900 hover:bg-gradient-to-r hover:from-gray-50/80 hover:to-transparent transition-all duration-300 border-l-4 border-transparent hover:border-slate-500">
                    <span className="font-primary font-normal text-base tracking-wide">Government & Institutions</span>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="w-4 h-4 text-slate-600" />
                    </div>
                  </div>
                </Link>

                {/* About Link */}
                <Link href="/about" onClick={() => setIsOpen(false)}>
                  <div className="group flex items-center px-6 py-4 text-gray-700 hover:text-gray-900 hover:bg-gradient-to-r hover:from-gray-50/80 hover:to-transparent transition-all duration-300 border-l-4 border-transparent hover:border-slate-500">
                    <span className="font-primary font-normal text-base tracking-wide">About</span>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="w-4 h-4 text-slate-600" />
                    </div>
                  </div>
                </Link>

                {/* Contact Link */}
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  <div className="group flex items-center px-6 py-4 text-gray-700 hover:text-gray-900 hover:bg-gradient-to-r hover:from-gray-50/80 hover:to-transparent transition-all duration-300 border-l-4 border-transparent hover:border-slate-500">
                    <span className="font-primary font-normal text-base tracking-wide">Contact</span>
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
