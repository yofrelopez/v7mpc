import type { Metadata } from 'next';
import { ContactHero, ContactMap } from '@/components/contact';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with V7MPC for custom products, quotes, and manufacturing inquiries. We\'re here to help with your recognition items and promotional product needs.',
  keywords: ['contact V7MPC', 'custom product quotes', 'manufacturing inquiry', 'customer support', 'business contact'],
  openGraph: {
    title: 'Contact V7MPC - Get Your Custom Product Quote',
    description: 'Get in touch with V7MPC for custom products, quotes, and manufacturing inquiries. Professional customer support for all your needs.',
    images: [
      {
        url: '/images/contact/contact-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact V7MPC - Professional Customer Support',
      },
    ],
  },
  twitter: {
    title: 'Contact V7MPC - Get Your Custom Product Quote',
    description: 'Get in touch for custom products, quotes, and manufacturing inquiries.',
  },
};

export default function ContactPage() {
  return (
    <div>
      <ContactHero />
      <ContactMap />
    </div>
  );
}