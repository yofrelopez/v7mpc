import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.51microshop.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'v7marketplace.myshopify.com',
        port: '',
        pathname: '/cdn/shop/files/**',
      },
      {
        protocol: 'https',
        hostname: 'cdnm.sanmar.com',
        port: '',
        pathname: '/catalog/images/**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ['image/webp'],
    unoptimized: false, // Ensure optimization is enabled for external images
  },
};

export default nextConfig;
