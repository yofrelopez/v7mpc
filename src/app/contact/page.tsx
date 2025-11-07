import type { Metadata } from 'next';
import { ContactHero, ContactMap } from '@/components/contact';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch with Our Team | V7MPC',
  description: 'Contact V7MPC for promotional products, custom apparel, and branded merchandise. Get quotes, ask questions, or schedule consultations with our expert team.',
  keywords: ['contact V7MPC', 'promotional products quote', 'custom merchandise inquiry', 'branded products consultation', 'business solutions contact'],
  openGraph: {
    title: 'Contact Us - Get in Touch with Our Team | V7MPC',
    description: 'Contact V7MPC for promotional products, custom apparel, and branded merchandise. Get quotes, ask questions, or schedule consultations.',
    type: 'website',
    images: [
      {
        url: '/images/hero_2.png',
        width: 1200,
        height: 630,
        alt: 'V7MPC Contact - Professional Promotional Products',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Get in Touch with Our Team | V7MPC',
    description: 'Contact V7MPC for promotional products, custom apparel, and branded merchandise. Get quotes and expert consultations.',
    images: ['/images/hero_2.png'],
  },
};

export default function ContactPage() {
  // Generate breadcrumb data for structured data
  const breadcrumbItems = [
    {
      name: 'Home',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://v7mpc.com'
    },
    {
      name: 'Contact',
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://v7mpc.com'}/contact`
    }
  ];

  return (
    <>
      {/* Structured Data */}
      <BreadcrumbJsonLd items={breadcrumbItems} />
      
      {/* Main Content */}
      <div>
        <ContactHero />
        <ContactMap />
      </div>
    </>
  );
}