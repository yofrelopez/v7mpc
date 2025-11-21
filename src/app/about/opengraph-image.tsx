import { ImageResponse } from 'next/og';

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
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1e293b',
          background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 'bold', color: '#ffffff', marginBottom: 20 }}>
          About V7MPC
        </div>
        <div style={{ fontSize: 32, color: '#cbd5e1', maxWidth: 800, textAlign: 'center' }}>
          Your Partner in Custom Recognition & Promotional Products
        </div>
      </div>
    ),
    { ...size }
  );
}
