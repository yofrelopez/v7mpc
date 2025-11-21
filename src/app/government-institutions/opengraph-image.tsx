import { ImageResponse } from 'next/og';
import { BaseOGLayout } from '@/lib/og-templates';

export const runtime = 'edge';
export const alt = 'V7MPC Government Solutions - Federal & Local Services';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/jpeg';

export default function GovernmentOGImage() {
  return new ImageResponse(
    (
      <BaseOGLayout
        title="Government Solutions"
        subtitle="Specialized Services for Federal & Local Institutions"
        badges={['GSA Schedule', 'Procurement Compliant', 'MBE Certified']}
      />
    ),
    {
      ...size,
    }
  );
}
