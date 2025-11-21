import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RecaptchaProvider from "@/components/providers/RecaptchaProvider";
import { OrganizationJsonLd, WebSiteJsonLd, LocalBusinessJsonLd } from "@/components/seo/JsonLd";

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.v7mpc.com'),
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
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.v7mpc.com',
    siteName: 'V7MPC',
    title: 'V7MPC - Custom Products & Recognition Items',
    description: 'Professional custom products, medals, promotional items, and recognition solutions. High-quality craftsmanship for achievements, events, and corporate needs.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'V7MPC - Custom Products & Recognition Items',
    description: 'Professional custom products, medals, promotional items, and recognition solutions.',
    creator: '@v7mpc',
    site: '@v7mpc',
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
      <head>
        {/* Structured Data */}
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <LocalBusinessJsonLd />
      </head>
      <body className={`${inter.variable} ${montserrat.variable} font-sans antialiased bg-white`}>
        <RecaptchaProvider>
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
        </RecaptchaProvider>
      </body>
    </html>
  );
}
