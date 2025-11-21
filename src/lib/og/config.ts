/**
 * Centralized OpenGraph Image Configuration
 * 
 * Add one line per route to automatically generate OG images.
 * Templates: 'hero-image' (uses actual image) | 'text-gradient' (generated design)
 */

export interface OGConfig {
  route: string;
  template: 'hero-image' | 'text-gradient';
  title: string;
  subtitle?: string;
  image?: string;
  badges?: string[];
  backgroundColor?: string;
}

export const OG_ROUTES: Record<string, OGConfig> = {
  '/': {
    route: '/',
    template: 'hero-image',
    title: 'V7MPC - Professional Custom Products & Recognition Solutions',
    image: '/images/og/hero_2.jpg'
  },
  '/about': {
    route: '/about',
    template: 'hero-image',
    title: 'About V7MPC - Professional Custom Products',
    subtitle: 'Family-owned business delivering quality products since 1999',
    image: '/images/og/hero.jpg'
  },
  '/contact': {
    route: '/contact',
    template: 'hero-image',
    title: 'Contact V7MPC - Get a Free Quote',
    subtitle: 'Professional custom products and recognition solutions',
    image: '/images/og/contact.jpg'
  },
  '/contacto': {
    route: '/contacto',
    template: 'hero-image',
    title: 'Contacto V7MPC - Cotización Gratuita',
    subtitle: 'Productos personalizados profesionales',
    image: '/images/og/contact.jpg'
  },
  '/products': {
    route: '/products',
    template: 'text-gradient',
    title: 'Professional Products Catalog',
    subtitle: 'Custom Apparel, Promotional Items & Recognition Solutions',
    badges: ['Custom Printing', 'Bulk Orders', 'Quality Guaranteed']
  },
  '/government-institutions': {
    route: '/government-institutions',
    template: 'hero-image',
    title: 'Government Solutions - V7MPC',
    subtitle: 'Trusted Partner for Government Organizations',
    image: '/images/og/hero_2.jpg'
  },
  '/solutions': {
    route: '/solutions',
    template: 'hero-image',
    title: 'V7MPC Solutions - Products & Services',
    subtitle: 'Comprehensive solutions for your business',
    image: '/images/og/solutions-hero.jpg'
  },
  '/jewelry': {
    route: '/jewelry',
    template: 'hero-image',
    title: 'Jewelry Division - Zaché Collections & Lu Love',
    subtitle: 'Premium jewelry and recognition products',
    image: '/images/og/jewelry-hero.jpg'
  },
  '/promotional-products': {
    route: '/promotional-products',
    template: 'hero-image',
    title: 'Promotional Products - Strategic Brand Solutions',
    subtitle: 'Elevate your brand with custom promotional items',
    image: '/images/og/promotional-hero.jpg'
  },
  '/quote': {
    route: '/quote',
    template: 'text-gradient',
    title: 'Request a Quote - V7MPC',
    subtitle: 'Get custom pricing for your project',
    badges: ['Free Quotes', 'Fast Response', '24/7 Support']
  },
  '/privacy-policy': {
    route: '/privacy-policy',
    template: 'text-gradient',
    title: 'Privacy Policy - V7MPC',
    subtitle: 'Your privacy is important to us'
  },
  '/terms-conditions': {
    route: '/terms-conditions',
    template: 'text-gradient',
    title: 'Terms & Conditions - V7MPC',
    subtitle: 'Professional service terms and conditions'
  }
};

/**
 * Get OG configuration for a route
 * Falls back to home config if route not found
 */
export function getOGConfig(route: string): OGConfig {
  return OG_ROUTES[route] || OG_ROUTES['/'];
}
