import type { Metadata } from 'next';
import { AboutHero, WhoWeAre, WhyChooseUs } from '@/components/about';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about V7MPC\'s mission, values, and commitment to quality. We\'re a trusted partner in custom manufacturing, sourcing, and providing recognition solutions worldwide.',
  keywords: ['about V7MPC', 'company history', 'manufacturing expertise', 'custom products', 'business values', 'quality commitment'],
  openGraph: {
    title: 'About V7MPC - Our Story & Mission',
    description: 'Learn about V7MPC\'s mission, values, and commitment to quality. We\'re a trusted partner in custom manufacturing and recognition solutions.',
    images: [
      {
        url: '/images/about/about-og.jpg',
        width: 1200,
        height: 630,
        alt: 'About V7MPC - Our Team and Mission',
      },
    ],
  },
  twitter: {
    title: 'About V7MPC - Our Story & Mission',
    description: 'Learn about our mission, values, and commitment to quality in custom manufacturing.',
  },
};

export default function AboutPage() {
  return (
    <div>
      <AboutHero />
      <WhoWeAre />
      <WhyChooseUs />
    </div>
  );
}