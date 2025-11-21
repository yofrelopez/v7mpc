import type { Metadata } from 'next';
import { ContactHero, ContactMap, ContactForm } from '@/components/contact';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch with Our Team | V7MPC',
  description: 'Contact V7MPC for promotional products, custom apparel, and branded merchandise. Get quotes, ask questions, or schedule consultations with our expert team.',
  keywords: ['contact V7MPC', 'promotional products quote', 'custom merchandise inquiry', 'branded products consultation', 'business solutions contact'],
  openGraph: {
    title: 'Contact Us - Get in Touch with Our Team | V7MPC',
    description: 'Contact V7MPC for promotional products, custom apparel, and branded merchandise. Get quotes, ask questions, or schedule consultations.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Get in Touch with Our Team | V7MPC',
    description: 'Contact V7MPC for promotional products, custom apparel, and branded merchandise. Get quotes and expert consultations.',
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
        
        {/* Contact Form Section */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContactForm />
          </div>
        </section>
        
        <ContactMap />
      </div>
    </>
  );
}