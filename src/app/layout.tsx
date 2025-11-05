import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://v7mpc.vercel.app'),
  title: {
    template: '%s | V7MPC',
    default: 'V7MPC - Custom Products & Recognition Items'
  },
  description: "Professional custom products, medals, promotional items, and recognition solutions. High-quality craftsmanship for achievements, events, and corporate needs.",
  keywords: ['custom medals', 'promotional products', 'recognition items', 'custom printing', 'corporate gifts', 'achievement awards', 'custom apparel', 'B2B sourcing', 'manufacturing', 'MBE', 'WBENC'],
  authors: [{ name: 'V7MPC Team' }],
  creator: 'V7 Marketplace Corporation',
  publisher: 'V7 Marketplace Corporation',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://v7mpc.vercel.app',
    siteName: 'V7MPC',
    title: 'V7MPC - Custom Products & Recognition Items',
    description: 'Professional custom products, medals, promotional items, and recognition solutions. High-quality craftsmanship for achievements, events, and corporate needs.',
    images: [
      {
        url: '/images/government/hero_2.png',
        width: 1200,
        height: 630,
        alt: 'V7MPC - Custom Products & Recognition Items',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'V7MPC - Custom Products & Recognition Items',
    description: 'Professional custom products, medals, promotional items, and recognition solutions.',
    images: ['/images/government/hero_2.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-placeholder', // Actualizar cuando tengas el código real
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ scrollPaddingTop: '5rem' }}>
      <body className={`${inter.variable} ${montserrat.variable} font-sans antialiased bg-white`}>
        {/* Fixed Header */}
        <header>
          <Navbar />
        </header>
        
        {/* Main Content with natural flow */}
        <main>
          {children}
        </main>
        
        {/* Footer */}
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
