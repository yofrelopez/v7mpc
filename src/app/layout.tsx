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
  title: "V7 Marketplace Corporation - Global B2B Sourcing & Manufacturing",
  description: "V7MPC provides reliable, standardized solutions for sourcing and manufacturing products across international markets. MBE & WBENC certified.",
  keywords: "B2B sourcing, manufacturing, promotional products, office supplies, jewelry supplies, custom branding, MBE, WBENC",
  openGraph: {
    title: "V7 Marketplace Corporation",
    description: "Global sourcing, manufacturing, and logistics for quality products and custom branding.",
    url: "https://v7mpc.com",
    siteName: "V7MPC",
    locale: "en_US",
    type: "website",
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
        
        {/* Main Content with proper semantic structure and responsive spacing */}
        <main className="min-h-screen">
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
