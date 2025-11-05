import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'V7MPC - Custom Products & Recognition Items';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function HomeOGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          backgroundColor: '#ffffff',
          position: 'relative',
        }}
      >
        {/* Background gradient */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
          }}
        />
        
        {/* Content */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '60px',
            textAlign: 'center',
            color: 'white',
            zIndex: 1,
          }}
        >
          {/* Main Title */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              marginBottom: 30,
              color: '#f1f5f9',
              letterSpacing: '0.05em',
            }}
          >
            V7MPC
          </div>
          
          {/* Subtitle */}
          <div
            style={{
              fontSize: 48,
              fontWeight: '600',
              marginBottom: 40,
              lineHeight: 1.2,
              maxWidth: '900px',
              color: '#ffffff',
            }}
          >
            Custom Products & Recognition Items
          </div>
          
          {/* Description */}
          <div
            style={{
              fontSize: 28,
              color: '#cbd5e1',
              marginBottom: 50,
              maxWidth: '800px',
              lineHeight: 1.3,
            }}
          >
            Professional manufacturing and sourcing for medals, awards, promotional products, and corporate solutions
          </div>
          
          {/* Features */}
          <div
            style={{
              display: 'flex',
              gap: '30px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                padding: '12px 24px',
                borderRadius: '25px',
                border: '2px solid #3b82f6',
              }}
            >
              <div style={{ fontSize: 20, color: '#93c5fd', fontWeight: '600' }}>
                Custom Medals
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(168, 85, 247, 0.2)',
                padding: '12px 24px',
                borderRadius: '25px',
                border: '2px solid #a855f7',
              }}
            >
              <div style={{ fontSize: 20, color: '#c4b5fd', fontWeight: '600' }}>
                Promotional Items
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(34, 197, 94, 0.2)',
                padding: '12px 24px',
                borderRadius: '25px',
                border: '2px solid #22c55e',
              }}
            >
              <div style={{ fontSize: 20, color: '#86efac', fontWeight: '600' }}>
                Recognition Solutions
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div
          style={{
            position: 'absolute',
            top: '30px',
            right: '30px',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'rgba(59, 130, 246, 0.1)',
            border: '3px solid rgba(59, 130, 246, 0.3)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            left: '30px',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'rgba(168, 85, 247, 0.1)',
            border: '2px solid rgba(168, 85, 247, 0.3)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: '50px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'rgba(34, 197, 94, 0.1)',
            border: '2px solid rgba(34, 197, 94, 0.3)',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}