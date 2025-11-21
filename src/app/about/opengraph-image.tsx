import { ImageResponse } from 'next/og';
import { BaseOGLayout } from '@/lib/og-templates';

export const runtime = 'edge';
export const alt = 'About V7MPC - Professional Custom Products Partner';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/jpeg';

export default function AboutOGImage() {
  return new ImageResponse(
    (
      <BaseOGLayout
        title="About V7MPC"
        subtitle="Your Partner in Custom Recognition & Promotional Products"
        badges={['Quality Excellence', 'Professional Service', 'Trusted Partner']}
      />
    ),
    {
      ...size,
    }
  );
}
