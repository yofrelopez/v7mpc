import { ImageResponse } from 'next/og';
import { BaseOGLayout } from '@/lib/og-templates';

export const runtime = 'edge';
export const alt = 'V7MPC Jewelry Division - Zaché Collections & Lu Love';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/jpeg';

export default function JewelryOGImage() {
  return new ImageResponse(
    (
      <BaseOGLayout
        title="Jewelry Division"
        subtitle="Craftsmanship That Connects with the Heart"
        badges={['Zaché® Prestige', 'Zaché® Signature', 'Zaché® Original', 'Lu Love®']}
      />
    ),
    {
      ...size,
    }
  );
}
