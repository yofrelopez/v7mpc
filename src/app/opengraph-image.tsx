import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'V7MPC - Professional Custom Products & Recognition Solutions';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/jpeg';

export default function HomeOGImage() {
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
          background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
          color: 'white',
          position: 'relative',
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px)',
          }}
        />
        
        {/* Main Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* V7MPC Logo/Brand */}
          <div
            style={{
              fontSize: 80,
              fontWeight: 'bold',
              marginBottom: 30,
              color: '#ffffff',
              letterSpacing: '0.05em',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            V7MPC
          </div>
          
          {/* Subtitle */}
          <div
            style={{
              fontSize: 40,
              fontWeight: '600',
              marginBottom: 40,
              lineHeight: 1.2,
              maxWidth: '800px',
              color: '#e2e8f0',
              textAlign: 'center',
            }}
          >
            Professional Custom Products & Recognition Solutions
          </div>
          
          {/* Features */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '40px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              maxWidth: '900px',
            }}
          >
            <div
              style={{
                backgroundColor: 'rgba(59, 130, 246, 0.9)',
                padding: '16px 24px',
                borderRadius: '25px',
                fontSize: 22,
                color: '#ffffff',
                fontWeight: '600',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              }}
            >
              Custom Manufacturing
            </div>
            <div
              style={{
                backgroundColor: 'rgba(16, 185, 129, 0.9)',
                padding: '16px 24px',
                borderRadius: '25px',
                fontSize: 22,
                color: '#ffffff',
                fontWeight: '600',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              }}
            >
              Professional Sourcing
            </div>
            <div
              style={{
                backgroundColor: 'rgba(245, 158, 11, 0.9)',
                padding: '16px 24px',
                borderRadius: '25px',
                fontSize: 22,
                color: '#ffffff',
                fontWeight: '600',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              }}
            >
              Quality Assurance
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}