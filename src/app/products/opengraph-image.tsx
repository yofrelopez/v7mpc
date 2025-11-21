import { ImageResponse } from 'next/og';
import { BaseOGLayout } from '@/lib/og-templates';

export const runtime = 'edge';
export const alt = 'V7MPC Products - Professional Custom Solutions';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/jpeg';

export default function ProductsOGImage() {
  return new ImageResponse(
    (
      <BaseOGLayout
        title="Professional Products"
        subtitle="Browse Our Complete Catalog"
        badges={['Custom Apparel', 'Promotional Items', 'Recognition Solutions']}
      />
    ),
    {
      ...size,
    }
  );
}
