import type { Metadata } from 'next';
import { Hero, CoreServices, WhatWeProvide, ProductsShowcase } from '@/components/home';

export const metadata: Metadata = {
  title: 'Home',
  description: 'V7MPC specializes in custom products, promotional items, and recognition solutions. Professional manufacturing and sourcing for medals, awards, corporate gifts, and more.',
  keywords: ['custom products', 'promotional items', 'medals', 'awards', 'corporate gifts', 'recognition solutions', 'manufacturing'],
  openGraph: {
    title: 'V7MPC - Professional Custom Products & Manufacturing',
    description: 'Specializing in custom products, promotional items, and recognition solutions. Professional manufacturing and sourcing for medals, awards, corporate gifts, and more.',
    images: [
      {
        url: 'https://v7mpc.vercel.app/images/government/hero_2.png',
        width: 1200,
        height: 630,
        alt: 'V7MPC - Professional Custom Products and Recognition Solutions',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    title: 'V7MPC - Professional Custom Products & Manufacturing',
    description: 'Specializing in custom products, promotional items, and recognition solutions.',
    images: ['https://v7mpc.vercel.app/images/government/hero_2.png'],
  },
};

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <Hero />
      
      {/* Core Services Section */}
      <CoreServices />
      
      {/* What We Provide Section */}
      <WhatWeProvide />
      
      {/* Products Showcase Section */}
      <ProductsShowcase />
    </div>
  );
}
