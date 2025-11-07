// JSON-LD Structured Data Components for SEO
// Following Next.js 15 best practices

import { Product } from '@/types/products';

// Organization Schema
export function OrganizationJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'V7MPC',
    description: 'Professional promotional products, custom apparel, and branded merchandise for businesses and organizations.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://v7mpc.com',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://v7mpc.com'}/hero_2.png`,
    image: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://v7mpc.com'}/hero_2.png`,
    telephone: '+1-555-0123', // Update with real phone
    email: 'info@v7mpc.com', // Update with real email
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Business St', // Update with real address
      addressLocality: 'Business City',
      addressRegion: 'State',
      postalCode: '12345',
      addressCountry: 'US'
    },
    sameAs: [
      // Add social media profiles when available
      // 'https://www.facebook.com/v7mpc',
      // 'https://www.linkedin.com/company/v7mpc',
      // 'https://www.instagram.com/v7mpc'
    ],
    foundingDate: '2020',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 10,
      maxValue: 50
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States'
    },
    knowsAbout: [
      'Promotional Products',
      'Custom Apparel',
      'Branded Merchandise',
      'Corporate Gifts',
      'Marketing Materials'
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
      }}
    />
  );
}

// LocalBusiness Schema
export function LocalBusinessJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://v7mpc.com'}/#business`,
    name: 'V7MPC',
    description: 'Professional promotional products and custom merchandise solutions for businesses.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://v7mpc.com',
    telephone: '+1-555-0123', // Update with real phone
    email: 'info@v7mpc.com', // Update with real email
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Business St', // Update with real address
      addressLocality: 'Business City',
      addressRegion: 'State',
      postalCode: '12345',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.7128, // Update with real coordinates
      longitude: -74.0060
    },
    openingHours: 'Mo-Fr 09:00-17:00',
    paymentAccepted: 'Cash, Credit Card, Wire Transfer',
    currenciesAccepted: 'USD',
    areaServed: {
      '@type': 'Country',
      name: 'United States'
    },
    serviceType: 'Promotional Products Manufacturing and Distribution'
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
      }}
    />
  );
}

// Product Schema
interface ProductJsonLdProps {
  product: Product;
}

export function ProductJsonLd({ product }: ProductJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://v7mpc.com'}/products/${product.slug}`,
    name: product.name,
    description: product.shortDescription,
    image: product.images.map(img => img),
    brand: {
      '@type': 'Brand',
      name: 'V7MPC'
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'V7MPC',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://v7mpc.com'
    },
    category: product.category.name,
    sku: product.id,
    productID: product.id,
    offers: {
      '@type': 'AggregateOffer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
      lowPrice: '5.00', // Minimum bulk pricing
      highPrice: '500.00', // Maximum single unit pricing
      offerCount: '4', // Different pricing tiers
      priceSpecification: [
        {
          '@type': 'PriceSpecification',
          price: '5.00',
          priceCurrency: 'USD',
          minQuantity: 1000,
          name: 'Bulk Pricing (1000+)'
        },
        {
          '@type': 'PriceSpecification',
          price: '15.00',
          priceCurrency: 'USD',
          minQuantity: 500,
          name: 'Volume Pricing (500-999)'
        },
        {
          '@type': 'PriceSpecification',
          price: '25.00',
          priceCurrency: 'USD',
          minQuantity: 100,
          name: 'Standard Pricing (100-499)'
        },
        {
          '@type': 'PriceSpecification',
          price: '50.00',
          priceCurrency: 'USD',
          minQuantity: 1,
          name: 'Sample Pricing (1-99)'
        }
      ],
      seller: {
        '@type': 'Organization',
        name: 'V7MPC',
        url: process.env.NEXT_PUBLIC_SITE_URL || 'https://v7mpc.com'
      }
    },
    additionalProperty: product.features.map((feature, index) => ({
      '@type': 'PropertyValue',
      name: `Feature ${index + 1}`,
      value: feature
    })),
    isCustomizable: product.isCustomizable,
    applicationCategory: 'Promotional Products',
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Businesses, Organizations, Marketing Professionals'
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
      }}
    />
  );
}

// WebSite Schema
export function WebSiteJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://v7mpc.com'}/#website`,
    name: 'V7MPC - Professional Promotional Products',
    description: 'Custom promotional products, branded merchandise, and corporate gifts for businesses and organizations.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://v7mpc.com',
    publisher: {
      '@type': 'Organization',
      name: 'V7MPC',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://v7mpc.com'}/hero_2.png`,
        width: 1200,
        height: 630
      }
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://v7mpc.com'}/products?search={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    },
    inLanguage: 'en-US',
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      '@type': 'Organization',
      name: 'V7MPC'
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
      }}
    />
  );
}

// Breadcrumb Schema
interface BreadcrumbJsonLdProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
      }}
    />
  );
}