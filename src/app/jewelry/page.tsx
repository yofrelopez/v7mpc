import type { Metadata } from 'next';
import { JewelryHero, ZacheBrands, JewelryCTA } from '@/components/jewelry';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Jewelry Division | V7 Marketplace Corporation',
  description: 'Discover our four distinctive jewelry brands: Zaché® Prestige (Recognition & Awards), Zaché® Signature (Luxury Designer), Zaché® Original (Everyday Elegance), and Lu Love® (Inspirational Lifestyle). Craftsmanship that connects with the heart.',
  keywords: [
    'Zaché jewelry',
    'Zaché Prestige',
    'Zaché Signature',
    'Lu Love jewelry',
    'custom medals',
    'recognition jewelry',
    'luxury jewelry',
    'designer jewelry',
    'inspirational jewelry',
    'corporate awards',
    'executive gifts',
    'fashion jewelry',
    'personalized jewelry',
    'V7 Marketplace jewelry'
  ],
  openGraph: {
    title: 'Jewelry Division | V7 Marketplace Corporation',
    description: 'Four distinctive brands united by craftsmanship: Zaché® Prestige, Signature, Original, and Lu Love®. Jewelry that connects deeply with the heart.',
    images: [
      {
        url: 'https://v7mpc.vercel.app/images/jewelry/jewelry-division-og.png',
        width: 1200,
        height: 630,
        alt: 'V7MPC Jewelry Division - Zaché® Collections & Lu Love®',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jewelry Division | V7 Marketplace Corporation',
    description: 'Zaché® Collections & Lu Love® - Crafted with precision, worn with pride.',
    images: ['https://v7mpc.vercel.app/images/jewelry/jewelry-division-og.png'],
  },
};

export default function JewelryPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <JewelryHero />
      
      {/* Breadcrumbs */}
      <Breadcrumbs 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Solutions', href: '/solutions' },
          { label: 'Jewelry Division', href: '/jewelry', current: true }
        ]}
      />
      
      {/* Brands Showcase Section */}
      <ZacheBrands />
      
      {/* CTA Section */}
      <JewelryCTA />
    </div>
  );
}
