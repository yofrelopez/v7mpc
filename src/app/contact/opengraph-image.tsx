import { ImageResponse } from 'next/og';

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
          Contact Us
        </div>
        <div style={{ fontSize: 32, color: '#cbd5e1', maxWidth: 800, textAlign: 'center' }}>
          Get in Touch with Our Expert Team
        </div>
      </div>
    ),
    { ...size }
  );
}
