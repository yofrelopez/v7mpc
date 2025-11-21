import type { Metadata } from 'next';
import GovernmentHero from '@/components/government/GovernmentHero';
import AboutGovernmentDivision from '@/components/government/AboutGovernmentDivision';
import CoreOfferings from '@/components/government/CoreOfferings';
import ProcurementCompliance from '@/components/government/ProcurementCompliance';
import CapabilityStatement from '@/components/government/CapabilityStatement';
import ContactSection from '@/components/government/ContactSection';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Government Solutions - Federal & Local Institution Services | V7MPC',
  description: 'V7MPC provides specialized promotional products and branded merchandise solutions for federal, state, and local government institutions. GSA Schedule and procurement-compliant services.',
  keywords: ['government promotional products', 'federal institution services', 'GSA Schedule', 'government procurement', 'state agency products', 'municipal services', 'compliance solutions'],
  openGraph: {
    title: 'Government Solutions - Federal & Local Institution Services | V7MPC',
    description: 'Specialized promotional products and branded merchandise solutions for government institutions. GSA Schedule and procurement-compliant.',
    type: 'website',
    images: [
      {
        url: '/government-institutions/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Government Solutions - Federal & Local Institution Services | V7MPC',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Government Solutions - Federal & Local Institution Services | V7MPC',
    description: 'Specialized promotional products for government institutions. GSA Schedule and procurement-compliant services.',
    images: ['/government-institutions/twitter-image'],
  },
};

export default function GovernmentInstitutionsPage() {
  // Generate breadcrumb data for structured data
  const breadcrumbItems = [
    {
      name: 'Home',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://v7mpc.com'
    },
    {
      name: 'Government Institutions',
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://v7mpc.com'}/government-institutions`
    }
  ];

  return (
    <>
      {/* Structured Data */}
      <BreadcrumbJsonLd items={breadcrumbItems} />
      
      {/* Main Content */}
      <GovernmentHero />
      <AboutGovernmentDivision />
      <CoreOfferings />
      <ProcurementCompliance />
      <CapabilityStatement />
      <ContactSection />
    </>
  );
}
