import { ImageResponse } from 'next/og';
import { getOGConfig } from '@/lib/og/config';
import { BaseOGLayout } from '@/lib/og/templates';

export const runtime = 'edge';
export const revalidate = 86400; // 24 hours ISR

export const alt = 'V7MPC - Professional Custom Products & Recognition Solutions';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/jpeg';

export default async function HomeOGImage() {
  const config = getOGConfig('/');

  // Use hero image if configured
  if (config.template === 'hero-image' && config.image) {
    return new ImageResponse(
      (
        // eslint-disable-next-line @next/next/no-img-element
        <img 
          src={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.v7mpc.com'}${config.image}`}
          width="1200" 
          height="630" 
          style={{ objectFit: 'cover' }} 
          alt={alt}
        />
      ),
      {
        ...size,
      }
    );
  }

  // Use text gradient template
  return new ImageResponse(
    (
      <BaseOGLayout
        title={config.title}
        subtitle={config.subtitle}
        badges={config.badges}
      />
    ),
    {
      ...size,
    }
  );
}