import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'V7MPC Jewelry Division - Zaché Collections & Lu Love';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/jpeg';

export default async function JewelryOGImage() {
  const imageUrl = new URL('/images/jewelry/jewelry-hero.png', process.env.NEXT_PUBLIC_SITE_URL || 'https://www.v7mpc.com');
  const imageData = await fetch(imageUrl).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      // @ts-ignore
      <img src={imageData} width="1200" height="630" style={{ objectFit: 'cover' }} />
    ),
    {
      ...size,
    }
  );
}
