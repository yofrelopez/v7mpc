import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Browse V7MPC\'s extensive collection of custom products including medals, recognition items, promotional products, apparel, signs, and displays. Quality manufacturing for every need.',
  keywords: ['custom products catalog', 'medals', 'recognition items', 'promotional products', 'custom apparel', 'signs and displays', 'corporate gifts'],
  openGraph: {
    title: 'V7MPC Products - Custom Manufacturing & Recognition Items',
    description: 'Browse our extensive collection of custom products including medals, recognition items, promotional products, apparel, signs, and displays.',
    images: [
      {
        url: '/images/products/products-og.jpg',
        width: 1200,
        height: 630,
        alt: 'V7MPC Product Catalog - Custom Manufacturing',
      },
    ],
  },
  twitter: {
    title: 'V7MPC Products - Custom Manufacturing & Recognition Items',
    description: 'Browse our extensive collection of custom products and recognition items.',
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}