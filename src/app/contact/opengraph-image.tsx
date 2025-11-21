import { ImageResponse } from 'next/og';
import { getOGConfig } from '@/lib/og/config';
import { BaseOGLayout } from '@/lib/og/templates';

export const runtime = 'edge';
export const revalidate = 86400;
export const alt = 'Contact V7MPC - Get in Touch';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/jpeg';

export default async function ContactOGImage() {
  const config = getOGConfig('/contact');

  if (config.template === 'hero-image' && config.image) {
    const imageUrl = new URL(config.image, process.env.NEXT_PUBLIC_SITE_URL || 'https://www.v7mpc.com');
    const imageData = await fetch(imageUrl).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        // @ts-ignore
        <img src={imageData} width="1200" height="630" style={{ objectFit: 'cover' }} />
      ),
      { ...size }
    );
  }

  return new ImageResponse(
    (
      <BaseOGLayout
        title={config.title}
        subtitle={config.subtitle}
        badges={config.badges}
      />
    ),
    { ...size }
  );
}
