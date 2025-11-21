import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'V7MPC Government Solutions - Federal & Local Services';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/jpeg';

export default async function GovernmentOGImage() {
  const imageUrl = new URL('/images/government/hero_2.png', process.env.NEXT_PUBLIC_SITE_URL || 'https://www.v7mpc.com');
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
