import { ImageResponse } from 'next/og';
import { mockProducts } from '@/lib/data/mockData';

export const runtime = 'edge';

export const alt = 'V7MPC Product';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function ProductOGImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    // Default fallback image
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
            color: 'white',
            fontSize: 32,
            fontWeight: 'bold',
          }}
        >
          <div style={{ marginBottom: 20 }}>V7MPC</div>
          <div style={{ fontSize: 24, color: '#94a3b8' }}>Product Not Found</div>
        </div>
      ),
      {
        ...size,
      }
    );
  }

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
          {/* V7MPC Logo/Brand */}
          <div
            style={{
              fontSize: 48,
              fontWeight: 'bold',
              marginBottom: 20,
              color: '#f1f5f9',
              letterSpacing: '0.05em',
            }}
          >
            V7MPC
          </div>
          
          {/* Product Name */}
          <div
            style={{
              fontSize: 64,
              fontWeight: 'bold',
              marginBottom: 30,
              lineHeight: 1.2,
              maxWidth: '900px',
              color: '#ffffff',
            }}
          >
            {product.name}
          </div>
          
          {/* Product Description */}
          <div
            style={{
              fontSize: 32,
              color: '#cbd5e1',
              marginBottom: 40,
              maxWidth: '800px',
              lineHeight: 1.3,
            }}
          >
            {product.shortDescription}
          </div>
          
          {/* Category Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(59, 130, 246, 0.2)',
              padding: '12px 24px',
              borderRadius: '50px',
              border: '2px solid #3b82f6',
            }}
          >
            <div
              style={{
                fontSize: 24,
                color: '#93c5fd',
                fontWeight: '600',
              }}
            >
              {product.category.name}
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'rgba(59, 130, 246, 0.1)',
            border: '3px solid rgba(59, 130, 246, 0.3)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'rgba(168, 85, 247, 0.1)',
            border: '2px solid rgba(168, 85, 247, 0.3)',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}