import type { Metadata } from 'next';
import { Hero, CoreServices, WhatWeProvide } from '@/components/home';
import { MainDivisions } from '@/components/solutions';

export const metadata: Metadata = {
  title: 'Home',
  description: 'V7MPC specializes in custom products, promotional items, and recognition solutions. Professional manufacturing and sourcing for medals, awards, corporate gifts, and more.',
  keywords: ['custom products', 'promotional items', 'medals', 'awards', 'corporate gifts', 'recognition solutions', 'manufacturing'],
  openGraph: {
    type: 'website',
    url: 'https://www.v7mpc.com',
    title: 'V7MPC - Professional Custom Products & Manufacturing',
    description: 'Specializing in custom products, promotional items, and recognition solutions. Professional manufacturing and sourcing for medals, awards, corporate gifts, and more.',
    images: [
      {
        url: 'https://www.v7mpc.com/images/og/hero_2.jpg',
        width: 1200,
        height: 630,
        alt: 'V7MPC - Professional Custom Products & Manufacturing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'V7MPC - Professional Custom Products & Manufacturing',
    description: 'Specializing in custom products, promotional items, and recognition solutions.',
    images: ['https://www.v7mpc.com/images/og/hero_2.jpg'],
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

      {/* Main Divisions Section (Reused) */}
      <MainDivisions />
    </div>
  );
}
