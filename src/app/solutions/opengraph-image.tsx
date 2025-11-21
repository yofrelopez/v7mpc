import { ImageResponse } from 'next/og';
import { BaseOGLayout } from '@/lib/og-templates';

export const runtime = 'edge';
export const alt = 'V7MPC Solutions - Products & Services';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/jpeg';

export default function SolutionsOGImage() {
  return new ImageResponse(
    (
      <BaseOGLayout
        title="Products & Solutions"
        subtitle="Excellence in Every Detail"
        badges={['Jewelry Division', 'Promotional Products']}
      />
    ),
    {
      ...size,
    }
  );
}
