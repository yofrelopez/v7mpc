import { ImageResponse } from 'next/og';
import { BaseOGLayout } from '@/lib/og-templates';

export const runtime = 'edge';
export const alt = 'Contact V7MPC - Get in Touch';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/jpeg';

export default function ContactOGImage() {
  return new ImageResponse(
    (
      <BaseOGLayout
        title="Contact Us"
        subtitle="Get in Touch with Our Expert Team"
        badges={['Request Quote', 'Ask Questions', 'Schedule Consultation']}
      />
    ),
    {
      ...size,
    }
  );
}
