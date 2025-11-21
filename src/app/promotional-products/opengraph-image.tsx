import { ImageResponse } from 'next/og';
import { BaseOGLayout } from '@/lib/og-templates';

export const runtime = 'edge';
export const alt = 'V7MPC Promotional Products - Strategic Brand Solutions';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/jpeg';

export default function PromotionalOGImage() {
  return new ImageResponse(
    (
      <BaseOGLayout
        title="Promotional Products"
        subtitle="Strategic Solutions That Speak Your Message"
        badges={['Office & Writing', 'Drinkware', 'Tech & Gadgets', 'Eco-Friendly']}
      />
    ),
    {
      ...size,
    }
  );
}
