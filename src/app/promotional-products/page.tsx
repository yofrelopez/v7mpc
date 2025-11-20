import type { Metadata } from 'next';
import { PromotionalHero, PromotionalCategories, PromotionalCTA } from '@/components/promotional';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Promotional Products | V7 Marketplace Corporation',
  description: 'Explore our comprehensive promotional products: Office & Writing, Drinkware, Tech & Gadgets, Bags & Travel, Home & Lifestyle, Eco-Friendly, and Faith-Based merchandise. Strategic brand solutions for organizations, schools, churches, and businesses.',
  keywords: [
    'promotional products',
    'custom drinkware',
    'branded office supplies',
    'tech gadgets',
    'promotional bags',
    'eco-friendly products',
    'faith-based merchandise',
    'church giveaways',
    'corporate gifts',
    'promotional merchandise',
    'custom branded items',
    'marketing products',
    'event giveaways',
    'school promotional items'
  ],
  openGraph: {
    title: 'Promotional Products | V7 Marketplace Corporation',
    description: 'Strategic promotional solutions across 7 categories. From office essentials to eco-friendly products — amplify your brand with purpose.',
    images: [
      {
        url: '/images/promotional/promotional-hero.png',
        width: 1200,
        height: 630,
        alt: 'V7MPC Promotional Products Division',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Promotional Products | V7 Marketplace Corporation',
    description: 'Strategic brand solutions that speak your message.',
    images: ['/images/promotional/promotional-hero.png'],
  },
};

export default function PromotionalProductsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <PromotionalHero />
      
      {/* Breadcrumbs */}
      <Breadcrumbs 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Solutions', href: '/solutions' },
          { label: 'Promotional Products', href: '/promotional-products', current: true }
        ]}
      />
      
      {/* Categories Section */}
      <PromotionalCategories />
      
      {/* CTA Section */}
      <PromotionalCTA />
    </div>
  );
}
