import type { Metadata } from 'next';
import { AboutHero, WhoWeAre, WhyChooseUs } from '@/components/about';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'About V7MPC - Your Partner in Custom Recognition & Promotional Products',
  description: 'Learn about V7MPC\'s commitment to quality custom products, recognition items, and promotional merchandise. Discover our expertise, values, and dedication to excellence.',
  keywords: ['about V7MPC', 'custom product manufacturer', 'recognition items', 'promotional products company', 'quality manufacturing', 'business partnership'],
  openGraph: {
    title: 'About V7MPC - Your Partner in Custom Recognition & Promotional Products',
    description: 'Learn about V7MPC\'s commitment to quality custom products, recognition items, and promotional merchandise.',
    type: 'website',
    images: [
      {
        url: '/about/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'About V7MPC - Your Partner in Custom Recognition & Promotional Products',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About V7MPC - Your Partner in Custom Recognition & Promotional Products',
    description: 'Learn about our commitment to quality custom products and promotional merchandise.',
    images: ['/about/twitter-image'],
  },
};

export default function AboutPage() {
  // Generate breadcrumb data for structured data
  const breadcrumbItems = [
    {
      name: 'Home',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://v7mpc.com'
    },
    {
      name: 'About',
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://v7mpc.com'}/about`
    }
  ];

  return (
    <>
      {/* Structured Data */}
      <BreadcrumbJsonLd items={breadcrumbItems} />
      
      {/* Main Content */}
      <div>
        <AboutHero />
        <WhoWeAre />
        <WhyChooseUs />
      </div>
    </>
  );
}