import type { Metadata } from 'next';
import { SolutionsHero, MainDivisions, SolutionsCTA } from '@/components/solutions';
import ProductsShowcase from '@/components/home/ProductsShowcase';

export const metadata: Metadata = {
  title: 'Products & Solutions | V7 Marketplace Corporation',
  description: 'Explore our comprehensive product divisions: Zaché® Jewelry Collections (Prestige, Signature, Original) and Promotional Products (Office, Drinkware, Tech, Eco-Friendly). Professional solutions for government, institutions, and businesses.',
  keywords: [
    'jewelry division',
    'Zaché jewelry',
    'promotional products',
    'custom awards',
    'recognition jewelry',
    'branded merchandise',
    'corporate gifts',
    'office supplies',
    'eco-friendly products',
    'faith-based merchandise'
  ],
  openGraph: {
    type: 'website',
    url: 'https://www.v7mpc.com/solutions',
    title: 'Products & Solutions | V7 Marketplace Corporation',
    description: 'Discover our two specialized divisions: Premium Jewelry Collections and Strategic Promotional Products. Excellence in every detail.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Products & Solutions | V7 Marketplace Corporation',
    description: 'Premium Jewelry Collections & Strategic Promotional Products',
  },
};

export default function SolutionsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <SolutionsHero />
      
      {/* Main Divisions Section */}
      <MainDivisions />
      
      {/* Quick Category Preview (ProductsShowcase) */}
      <ProductsShowcase />
      
      {/* CTA Section */}
      <SolutionsCTA />
    </div>
  );
}
