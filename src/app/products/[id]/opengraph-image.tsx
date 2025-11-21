import { ImageResponse } from 'next/og';
import { mockProducts } from '@/lib/data/mockData';
import { fetchAllSanMarProducts } from '@/lib/api/sanmar-fetcher';
import { BaseOGLayout } from '@/lib/og/templates';

export const runtime = 'edge';
export const revalidate = 86400; // 24 hours ISR

export const alt = 'V7MPC Product';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/jpeg';

export default async function ProductOGImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  // Try to find product in mockProducts first
  let product = mockProducts.find((p) => p.id === id);

  // If not found, try SanMar products
  if (!product) {
    try {
      const sanMarProducts = await fetchAllSanMarProducts();
      product = sanMarProducts.find((p) => p.id === id);
    } catch (error) {
      console.error('Error fetching SanMar products for OG:', error);
    }
  }

  // Product not found - show fallback
  if (!product) {
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

  // Strategy 1: Use actual product image if available (AUTOMATIC)
  if (product.images && product.images.length > 0) {
    const productImageUrl = product.images[0];
    
    try {
      // Fetch the product image
      const imageUrl = productImageUrl.startsWith('http') 
        ? productImageUrl 
        : new URL(productImageUrl, process.env.NEXT_PUBLIC_SITE_URL || 'https://www.v7mpc.com');
      
      const imageData = await fetch(imageUrl).then((res) => res.arrayBuffer());

      return new ImageResponse(
        (
          // @ts-ignore
          <img 
            src={imageData} 
            width="1200" 
            height="630" 
            style={{ objectFit: 'cover' }} 
          />
        ),
        {
          ...size,
        }
      );
    } catch (error) {
      console.error('Error fetching product image for OG:', error);
      // Fall through to Strategy 2
    }
  }

  // Strategy 2: Generate with text overlay (fallback)
  return new ImageResponse(
    (
      <BaseOGLayout
        title={product.name}
        subtitle={product.shortDescription}
        badges={[product.category.name]}
      />
    ),
    {
      ...size,
    }
  );
}