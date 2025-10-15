'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md border-b border-neutral-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="bg-secondary text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold">
                V7
              </div>
              <div>
                <div className="text-xl font-bold text-neutral-900">V7MPC</div>
                <div className="text-xs text-secondary">Marketplace Corporation</div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-neutral-700 hover:text-primary font-medium transition-colors"
            >
              Inicio
            </Link>
            <Link 
              href="/productos" 
              className="text-neutral-700 hover:text-primary font-medium transition-colors"
            >
              Productos
            </Link>
            <Link 
              href="/nosotros" 
              className="text-neutral-700 hover:text-primary font-medium transition-colors"
            >
              Nosotros
            </Link>
            <Link 
              href="/contacto" 
              className="text-neutral-700 hover:text-primary font-medium transition-colors"
            >
              Contacto
            </Link>
          </nav>

          {/* Certifications & CTA */}
          <div className="flex items-center space-x-4">
            {/* Certification Badges */}
            <div className="hidden lg:flex items-center space-x-2">
              <Badge variant="secondary" className="bg-primary text-white">
                MBE Certified
              </Badge>
              <Badge variant="secondary" className="bg-secondary text-white">
                WBENC Certified
              </Badge>
            </div>

            {/* CTA Button */}
            <Button 
              asChild
              className="bg-accent hover:bg-accent-dark text-white font-semibold"
            >
              <Link href="/cotizacion">
                Request Quote
              </Link>
            </Button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md text-neutral-700 hover:text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-neutral-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-neutral-700 hover:text-primary font-medium transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link 
                href="/productos" 
                className="text-neutral-700 hover:text-primary font-medium transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Productos
              </Link>
              <Link 
                href="/nosotros" 
                className="text-neutral-700 hover:text-primary font-medium transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Nosotros
              </Link>
              <Link 
                href="/contacto" 
                className="text-neutral-700 hover:text-primary font-medium transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
              
              {/* Mobile Certifications */}
              <div className="flex items-center space-x-2 px-2 pt-2">
                <Badge variant="secondary" className="bg-primary text-white text-xs">
                  MBE
                </Badge>
                <Badge variant="secondary" className="bg-secondary text-white text-xs">
                  WBENC
                </Badge>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}