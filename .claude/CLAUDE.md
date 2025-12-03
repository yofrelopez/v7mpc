# V7MPC Website - Developer & AI Assistant Guide

> **Comprehensive documentation for the V7 Marketplace Corporation website**
>
> Built with Next.js 15, React 19, TypeScript, and Tailwind CSS 4

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Quick Start Guide](#2-quick-start-guide)
3. [Project Architecture](#3-project-architecture)
4. [Tech Stack Details](#4-tech-stack-details)
5. [Development Standards](#5-development-standards)
6. [Key Workflows](#6-key-workflows)
7. [Important Files Reference](#7-important-files-reference)
8. [Business Context](#8-business-context)
9. [Common Development Tasks](#9-common-development-tasks)
10. [Best Practices & Guidelines](#10-best-practices--guidelines)
11. [Environment Variables](#11-environment-variables)
12. [Testing & Deployment](#12-testing--deployment)
13. [Troubleshooting Guide](#13-troubleshooting-guide)
14. [Additional Resources](#14-additional-resources)

---

## 1. Project Overview

### About V7 Marketplace Corporation

**V7 Marketplace Corporation (V7MPC)** is a **minority-owned, Latin woman-led enterprise** specializing in global sourcing and manufacturing solutions.

**Core Business:**
- Custom products & promotional items
- Recognition solutions (medals, awards, plaques)
- Corporate gifts and branded merchandise
- Government procurement solutions
- Jewelry & Recognition (Zaché® brands)
- Promotional Products (7 categories)
- Custom Apparel
- Signs & Displays

**Certifications:**
- **MBE** - Minority Business Enterprise
- **WBENC** - Women's Business Enterprise Council
- **SBA** - U.S. Small Business Administration
- **NMSDC** - National Minority Supplier Development Council
- **SAM.gov** - System for Award Management

**Contact Information:**
- **Website**: https://www.v7mpc.com
- **Email**: info@v7mpc.com
- **Phone**: +1 (786) 286-7540
- **Location**: Pensacola, FL

### Project Status

**Current Phase: Phase 1 Complete - Foundation**

- ✅ Modern Hero section with responsive design
- ✅ Professional navbar with mobile menu
- ✅ Elegant footer with 4-column layout
- ✅ Complete typography system
- ✅ Responsive design (mobile-first)
- ✅ Brand color palette implementation
- ✅ Contact form with validation
- ✅ Quote request system
- ✅ Product catalog
- ✅ SEO optimization with OpenGraph

**Upcoming Phases:**
- Phase 2: Enhanced home page sections
- Phase 3: CMS integration
- Phase 4: Multi-language support (Spanish)

### Tech Stack Summary

- **Framework**: Next.js 15.5.5 (App Router)
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS 4 + Shadcn/ui
- **Forms**: react-hook-form 7.66 + Zod 4.1.12
- **Email**: Resend 6.4.2
- **Security**: reCAPTCHA v3
- **Deployment**: Vercel (ready to deploy)

---

## 2. Quick Start Guide

### Prerequisites

- Node.js 18+ (recommended: 20+)
- npm or pnpm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yofrelopez/v7mpc.git
cd v7mpc-website

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Edit .env.local with your keys
```

### Environment Variables Setup

Create a `.env.local` file in the project root:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://www.v7mpc.com

# Google reCAPTCHA v3
RECAPTCHA_SECRET_KEY=YOUR_SECRET_KEY_FROM_GOOGLE_RECAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=YOUR_SITE_KEY_FROM_GOOGLE_RECAPTCHA

# Resend Email Service
RESEND_API_KEY=YOUR_API_KEY_FROM_RESEND
FROM_EMAIL=onboarding@resend.dev
ADMIN_EMAIL=info@v7mpc.com
```

### Development Commands

```bash
# Start development server (with Turbopack)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# Test email setup
tsx test-email-setup.mjs

# Test quote API
tsx test-quote-api.mjs
```

### Accessing the Site

- **Local Development**: http://localhost:3000
- **Production**: https://www.v7mpc.com

---

## 3. Project Architecture

### Directory Structure

```
d:\PROGRAMACION\webs\v7\v7mpc-website\
│
├── .claude/                           # AI assistant documentation
│   └── CLAUDE.md                     # This file
│
├── src/                              # Source code
│   ├── app/                          # Next.js App Router
│   │   ├── page.tsx                  # Home page
│   │   ├── layout.tsx                # Root layout
│   │   ├── globals.css               # Global styles
│   │   │
│   │   ├── about/                    # About Us page
│   │   │   └── page.tsx
│   │   │
│   │   ├── contact/                  # Contact page
│   │   │   └── page.tsx
│   │   │
│   │   ├── products/                 # Products section
│   │   │   ├── page.tsx              # Product catalog
│   │   │   ├── [id]/                 # Product detail pages
│   │   │   │   └── page.tsx
│   │   │   ├── jewelry-recognition/  # Category pages
│   │   │   ├── apparel/
│   │   │   ├── promos/
│   │   │   └── signs-displays/
│   │   │
│   │   ├── quote/                    # Quote request system
│   │   │   └── page.tsx
│   │   │
│   │   ├── solutions/                # Solutions page
│   │   │   └── page.tsx
│   │   │
│   │   ├── jewelry/                  # Jewelry division
│   │   │   └── page.tsx
│   │   │
│   │   ├── promotional-products/     # Promotional division
│   │   │   └── page.tsx
│   │   │
│   │   ├── government-institutions/  # Government sector
│   │   │   └── page.tsx
│   │   │
│   │   ├── privacy-policy/           # Legal pages
│   │   ├── terms-conditions/
│   │   │
│   │   ├── admin/                    # Admin dashboard
│   │   │   ├── page.tsx
│   │   │   └── colors/
│   │   │
│   │   └── api/                      # API routes
│   │       ├── contact/
│   │       │   └── submit/route.ts
│   │       ├── quotes/
│   │       │   └── submit/route.ts
│   │       └── products/
│   │           └── all/route.ts
│   │
│   ├── components/                   # React components
│   │   ├── layout/                   # Layout components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   └── PageWrapper.tsx
│   │   │
│   │   ├── home/                     # Home page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── CoreServices.tsx
│   │   │   ├── WhatWeProvide.tsx
│   │   │   ├── ProductsShowcase.tsx
│   │   │   └── index.ts              # Barrel export
│   │   │
│   │   ├── about/                    # About page components
│   │   │   ├── AboutHero.tsx
│   │   │   ├── WhoWeAre.tsx
│   │   │   ├── WhyChooseUs.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── contact/                  # Contact components
│   │   │   ├── ContactForm.tsx
│   │   │   ├── ContactHero.tsx
│   │   │   ├── ContactMap.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── products/                 # Product components
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductList.tsx
│   │   │   ├── ProductFilter.tsx
│   │   │   ├── ProductDetail.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── quote/                    # Quote form components
│   │   │   ├── QuoteForm.tsx
│   │   │   ├── CustomerStep.tsx
│   │   │   ├── ProductStep.tsx
│   │   │   ├── CustomizationStep.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── jewelry/                  # Jewelry components
│   │   ├── promotional/              # Promotional components
│   │   ├── solutions/                # Solutions components
│   │   ├── government/               # Government components
│   │   │
│   │   ├── seo/                      # SEO components
│   │   │   └── JsonLd.tsx            # Structured data
│   │   │
│   │   ├── providers/                # Context providers
│   │   │   └── RecaptchaProvider.tsx
│   │   │
│   │   └── ui/                       # Shadcn/ui components
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       ├── textarea.tsx
│   │       ├── badge.tsx
│   │       ├── card.tsx
│   │       ├── navigation-menu.tsx
│   │       └── ... (other ui components)
│   │
│   ├── lib/                          # Utilities and helpers
│   │   ├── utils.ts                  # cn() utility
│   │   │
│   │   ├── api/                      # External API integrations
│   │   │   └── sanmar.ts             # SanMar fetcher
│   │   │
│   │   ├── data/                     # Static data
│   │   │   ├── products.ts           # Product catalog
│   │   │   ├── categories.ts         # Product categories
│   │   │   └── mock-data.ts
│   │   │
│   │   ├── email/                    # Email services
│   │   │   ├── send-contact-emails.ts
│   │   │   ├── send-quote-emails.ts
│   │   │   ├── templates/            # Email templates
│   │   │   │   ├── contact-admin.ts
│   │   │   │   ├── contact-customer.ts
│   │   │   │   ├── quote-admin.ts
│   │   │   │   └── quote-customer.ts
│   │   │   └── config.ts
│   │   │
│   │   ├── og/                       # OpenGraph image config
│   │   │   └── config.ts
│   │   │
│   │   ├── utils/                    # Helper utilities
│   │   │   ├── quote-helpers.ts
│   │   │   └── quote-id-generator.ts
│   │   │
│   │   └── validations/              # Zod schemas
│   │       ├── contact-schema.ts
│   │       └── quote-schema.ts
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── usePagination.ts
│   │   └── useProductFilters.ts
│   │
│   ├── types/                        # TypeScript definitions
│   │   ├── index.ts                  # Barrel export
│   │   ├── products.ts               # Product types
│   │   ├── quote.ts                  # Quote types
│   │   └── contact.ts                # Contact types
│   │
│   └── styles/                       # Additional CSS
│       └── navbar.css
│
├── public/                           # Static assets
│   ├── images/                       # Image assets
│   │   ├── og/                       # OpenGraph images
│   │   ├── divisions/                # Division images
│   │   ├── government/               # Government images
│   │   ├── jewelry/                  # Jewelry images
│   │   └── about/                    # About page images
│   │
│   ├── home/                         # Home page assets
│   │   ├── hero.jpg
│   │   ├── certifications/
│   │   └── ...
│   │
│   ├── logo.png
│   ├── logo_2.png
│   └── favicon.png
│
├── docs/                             # Documentation
│   ├── OPENGRAPH-GUIDE.md
│   └── SanMar-Web-Services-Integration-Guide-24.2.pdf
│
├── scripts/                          # Build & deployment scripts
│
├── Configuration Files
├── package.json                      # Dependencies & scripts
├── tsconfig.json                     # TypeScript config
├── next.config.ts                    # Next.js configuration
├── postcss.config.mjs                # PostCSS configuration
├── components.json                   # Shadcn/ui config
├── .eslintrc.json                    # ESLint rules
├── .gitignore                        # Git ignore patterns
├── .env.local                        # Environment variables (gitignored)
│
├── README.md                         # Project documentation
├── RESEND_SETUP.md                   # Email setup guide
├── test-email-setup.mjs              # Email testing script
└── test-quote-api.mjs                # Quote API test script
```

### File Naming Conventions

- **Pages**: `page.tsx` (Next.js App Router convention)
- **Layouts**: `layout.tsx`
- **Components**: PascalCase (e.g., `Hero.tsx`, `ContactForm.tsx`)
- **Utilities**: camelCase (e.g., `utils.ts`, `quote-helpers.ts`)
- **Types**: kebab-case (e.g., `products.ts`, `quote-schema.ts`)
- **API Routes**: `route.ts`

### Component Organization

Components are organized by **feature/page domain**:

- Each feature folder (e.g., `home/`, `about/`, `contact/`) contains related components
- Use barrel exports (`index.ts`) for clean imports
- Separate Server and Client components
- Mark Client components with `'use client'` directive

**Example:**
```typescript
// src/components/about/index.ts
export { default as AboutHero } from './AboutHero';
export { default as WhoWeAre } from './WhoWeAre';
export { default as WhyChooseUs } from './WhyChooseUs';

// Usage in a page
import { AboutHero, WhoWeAre, WhyChooseUs } from '@/components/about';
```

---

## 4. Tech Stack Details

### Core Framework & Runtime

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 15.5.5 | React framework with App Router |
| **React** | 19.1.0 | UI library |
| **TypeScript** | 5.x | Type-safe JavaScript |
| **Node.js** | 18+ | Runtime environment |

### Styling & UI

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Tailwind CSS** | 4.x | Utility-first CSS framework |
| **@tailwindcss/postcss** | 4.x | PostCSS plugin |
| **@tailwindcss/typography** | 0.5.19 | Rich text styling |
| **Shadcn/ui** | Latest | Component library |
| **class-variance-authority** | 0.7.1 | Component variants |
| **clsx** | 2.1.1 | Class utility |
| **tailwind-merge** | 3.3.1 | Merge Tailwind classes |
| **Lucide React** | 0.545.0 | Icon library |

### Forms & Validation

| Technology | Version | Purpose |
|-----------|---------|---------|
| **react-hook-form** | 7.66.0 | Form state management |
| **@hookform/resolvers** | 5.2.2 | Validation resolvers |
| **zod** | 4.1.12 | Schema validation |

### External Services

| Technology | Version | Purpose |
|-----------|---------|---------|
| **resend** | 6.4.2 | Email delivery service |
| **react-google-recaptcha-v3** | 1.11.0 | Bot protection |

### Animations

| Technology | Version | Purpose |
|-----------|---------|---------|
| **framer-motion** | 12.23.24 | Advanced animations |
| **tw-animate-css** | 1.4.0 | Tailwind animations |

### Image Processing

| Technology | Version | Purpose |
|-----------|---------|---------|
| **sharp** | 0.34.5 | Image optimization |
| **sharp-cli** | 5.2.0 | CLI for sharp |

### Development Tools

| Technology | Version | Purpose |
|-----------|---------|---------|
| **ESLint** | 9.x | Linting |
| **tsx** | 4.20.6 | TypeScript execution |
| **dotenv** | 17.2.3 | Environment variables |
| **server-only** | 0.0.1 | Server component safety |

### Build & Deployment

- **Turbopack**: Fast bundling (enabled by default)
- **PostCSS**: CSS processing
- **Vercel**: Deployment platform (ready to deploy)

---

## 5. Development Standards

### TypeScript Conventions

#### Strict Mode

TypeScript strict mode is **enabled** in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "alwaysStrict": true
  }
}
```

#### Type Definition Patterns

**Interfaces for Objects:**
```typescript
// src/types/products.ts
export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription?: string;
  description: string | ContentBlock[];
  category: ProductCategory;
  tags: string[];
  images: string[];
  features: string[];
  isCustomizable: boolean;
  technicalSpecifications?: string | ContentBlock[];
  packingDelivery?: ContentBlock[];
  faq?: string | ContentBlock[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ContentBlock {
  type: 'text' | 'image';
  content?: string;
  src?: string;
  alt?: string;
  caption?: string;
}
```

**Zod Schema with Type Inference:**
```typescript
// src/lib/validations/contact-schema.ts
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),

  email: z.string()
    .email('Please enter a valid email address')
    .max(100, 'Email is too long'),

  company: z.string()
    .max(100, 'Company name is too long')
    .optional(),

  phone: z.string()
    .max(20, 'Phone number is too long')
    .optional(),

  subject: z.string()
    .min(3, 'Subject must be at least 3 characters')
    .max(200, 'Subject is too long'),

  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message is too long (max 2000 characters)')
});

// Infer TypeScript type from Zod schema
export type ContactFormSchemaType = z.infer<typeof contactFormSchema>;
```

#### Interface Naming

- Use **descriptive, domain-specific names**
- Suffix with `Data` for input objects: `ContactFormData`, `QuoteFormData`
- Suffix with `Response` for API responses: `ProductResponse`
- Suffix with `Props` for component props: `HeroProps`, `NavbarProps`

#### Optional vs Required Fields

```typescript
export interface ProductCategory {
  id: string;                    // Required
  slug: string;                  // Required
  name: string;                  // Required
  description?: string;          // Optional
  image?: string;                // Optional
}
```

### Styling Approach

#### Tailwind Utility-First

All styling uses **Tailwind CSS utility classes**:

```typescript
// Good: Tailwind utilities
<button className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-50">
  Click Me
</button>

// Avoid: Custom CSS unless absolutely necessary
```

#### Class Ordering

Follow this order for Tailwind classes:

1. **Layout**: `flex`, `grid`, `block`, `inline`
2. **Positioning**: `relative`, `absolute`, `fixed`
3. **Spacing**: `p-4`, `m-2`, `gap-2`
4. **Sizing**: `w-full`, `h-screen`, `min-h-screen`
5. **Typography**: `text-lg`, `font-bold`, `leading-tight`
6. **Colors**: `bg-white`, `text-gray-900`
7. **Borders**: `border`, `rounded-md`
8. **Effects**: `shadow-lg`, `opacity-50`
9. **Transitions**: `transition-all`, `duration-200`
10. **States**: `hover:`, `focus:`, `disabled:`
11. **Responsive**: `sm:`, `md:`, `lg:`, `xl:`

**Example:**
```typescript
<div className="relative flex items-center gap-4 w-full min-h-screen p-8 bg-gradient-to-br from-gray-50 to-white rounded-lg shadow-xl transition-all hover:shadow-2xl md:p-12 lg:gap-6">
```

#### cn() Utility

Use the `cn()` utility to safely merge classes:

```typescript
// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Usage
import { cn } from '@/lib/utils';

<button
  className={cn(
    "px-4 py-2 rounded-md",
    isActive && "bg-blue-500 text-white",
    isDisabled && "opacity-50 cursor-not-allowed"
  )}
>
  Button
</button>
```

#### Responsive Breakpoints

Tailwind breakpoints (mobile-first):

```typescript
{
  sm: '640px',   // Small devices
  md: '768px',   // Medium devices
  lg: '1024px',  // Large devices
  xl: '1280px',  // Extra large devices
  '2xl': '1536px' // 2X large devices
}

// Usage
<div className="text-sm sm:text-base md:text-lg lg:text-xl">
  Responsive text
</div>
```

#### Color Palette

Brand colors (defined in `globals.css`):

```css
--primary: slate-600 (#64748b)
--secondary: slate-400 (#94a3b8)
--accent: slate-600 (#475569)
--brand-gold: #d4af37
--brand-amber: #f59e0b
```

### Component Patterns

#### Server vs Client Components

**Server Components (default):**
```typescript
// src/app/about/page.tsx
// No 'use client' directive = Server Component
import { AboutHero, WhoWeAre } from '@/components/about';

export default function AboutPage() {
  return (
    <div>
      <AboutHero />
      <WhoWeAre />
    </div>
  );
}
```

**Client Components (interactive):**
```typescript
// src/components/contact/ContactForm.tsx
'use client';  // ← Client component directive

import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Interactive logic here
}
```

**When to use Client Components:**
- Form handling with `react-hook-form`
- State management with `useState`, `useReducer`
- Effects with `useEffect`
- Event handlers (`onClick`, `onChange`)
- Browser APIs (`window`, `document`)
- Third-party libraries requiring client-side

#### Props Typing

```typescript
// Define props interface
interface HeroProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

// Use in component
export default function Hero({
  title,
  subtitle,
  ctaText = 'Get Started',
  onCtaClick
}: HeroProps) {
  return (
    <section>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
      {onCtaClick && (
        <button onClick={onCtaClick}>{ctaText}</button>
      )}
    </section>
  );
}
```

#### Barrel Exports

Organize components with barrel exports:

```typescript
// src/components/home/index.ts
export { default as Hero } from './Hero';
export { default as CoreServices } from './CoreServices';
export { default as WhatWeProvide } from './WhatWeProvide';
export { default as ProductsShowcase } from './ProductsShowcase';

// Usage in pages
import { Hero, CoreServices, WhatWeProvide, ProductsShowcase } from '@/components/home';
```

---

## 6. Key Workflows

### Workflow 1: Adding New Pages

#### Step 1: Create Page File

```typescript
// src/app/[route]/page.tsx
import type { Metadata } from 'next';

// Define metadata for SEO
export const metadata: Metadata = {
  title: 'Page Title | V7MPC',
  description: 'Page description for SEO',
  keywords: ['keyword1', 'keyword2', 'keyword3'],
  openGraph: {
    type: 'website',
    url: 'https://www.v7mpc.com/[route]',
    title: 'OG Title',
    description: 'OG Description',
    images: [
      {
        url: 'https://www.v7mpc.com/images/og/page.jpg',
        width: 1200,
        height: 630,
        alt: 'OG Image Alt Text',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Twitter Title',
    description: 'Twitter Description',
    images: ['https://www.v7mpc.com/images/og/page.jpg'],
  },
};

// Page component
export default function PageName() {
  return (
    <div className="flex flex-col">
      {/* Page content */}
    </div>
  );
}
```

#### Step 2: Create Page Components

```typescript
// src/components/[page-name]/PageHero.tsx
export default function PageHero() {
  return (
    <section className="relative min-h-[400px] flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center">
          Page Title
        </h1>
        <p className="mt-4 text-lg text-center text-gray-600">
          Page subtitle
        </p>
      </div>
    </section>
  );
}
```

#### Step 3: Add Navigation Links

```typescript
// Update src/components/layout/Navbar.tsx
// Add navigation item to the menu
```

#### Step 4: Create Barrel Export

```typescript
// src/components/[page-name]/index.ts
export { default as PageHero } from './PageHero';
export { default as PageContent } from './PageContent';
```

### Workflow 2: Creating Forms with Validation

#### Step 1: Define Zod Schema

```typescript
// src/lib/validations/[form-name]-schema.ts
import { z } from 'zod';

export const myFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),

  email: z.string()
    .email('Please enter a valid email address'),

  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message is too long')
});

export type MyFormSchemaType = z.infer<typeof myFormSchema>;
```

#### Step 2: Create Form Component

```typescript
// src/components/[page]/MyForm.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { myFormSchema, type MyFormSchemaType } from '@/lib/validations/[form-name]-schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function MyForm() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<MyFormSchemaType>({
    resolver: zodResolver(myFormSchema),
    mode: 'onBlur'
  });

  const onSubmit = async (data: MyFormSchemaType) => {
    try {
      setSubmitStatus('submitting');

      const response = await fetch('/api/[endpoint]/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }

      setSubmitStatus('success');
      reset();
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
        <h3 className="text-lg font-semibold text-green-900">Success!</h3>
        <p className="mt-2 text-green-700">Your form has been submitted.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleFormSubmit(onSubmit)} className="space-y-6">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name <span className="text-red-500">*</span>
        </label>
        <Input
          id="name"
          type="text"
          {...register('name')}
          className="mt-1"
          disabled={isSubmitting}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email <span className="text-red-500">*</span>
        </label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          className="mt-1"
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message <span className="text-red-500">*</span>
        </label>
        <Textarea
          id="message"
          rows={5}
          {...register('message')}
          className="mt-1"
          disabled={isSubmitting}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      {/* Error Message */}
      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{errorMessage}</p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
}
```

#### Step 3: Create API Route

```typescript
// src/app/api/[endpoint]/submit/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { myFormSchema } from '@/lib/validations/[form-name]-schema';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate with Zod
    const validationResult = myFormSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Process the data (e.g., send email, save to database)
    // await sendEmail(data);

    return NextResponse.json(
      { success: true, message: 'Form submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred' },
      { status: 500 }
    );
  }
}
```

### Workflow 3: API Endpoints

#### API Route Pattern

```typescript
// src/app/api/[resource]/[action]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Define request schema
const requestSchema = z.object({
  field1: z.string(),
  field2: z.number().optional(),
});

// POST handler
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate
    const validationResult = requestSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    // Process data
    const data = validationResult.data;
    // ... your logic here

    // Return success
    return NextResponse.json(
      { success: true, data: { /* response data */ } },
      { status: 200 }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET handler (if needed)
export async function GET(request: NextRequest) {
  try {
    // Parse query params
    const { searchParams } = new URL(request.url);
    const param1 = searchParams.get('param1');

    // ... your logic here

    return NextResponse.json(
      { success: true, data: { /* response data */ } },
      { status: 200 }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### Workflow 4: Email Integration

#### Email Service Setup

```typescript
// src/lib/email/config.ts
import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined');
}

export const resend = new Resend(process.env.RESEND_API_KEY);

export const EMAIL_CONFIG = {
  from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
  adminEmail: process.env.ADMIN_EMAIL || 'info@v7mpc.com',
  contactEmail: process.env.ADMIN_EMAIL || 'info@v7mpc.com',
};
```

#### Email Template

```typescript
// src/lib/email/templates/contact-admin.ts
import { ContactFormSchemaType } from '@/lib/validations/contact-schema';

export function generateContactAdminEmail(data: ContactFormSchemaType): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #64748b; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9fafb; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #64748b; }
          .value { margin-top: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Form Submission</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${data.name}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${data.email}</div>
            </div>
            ${data.company ? `
              <div class="field">
                <div class="label">Company:</div>
                <div class="value">${data.company}</div>
              </div>
            ` : ''}
            ${data.phone ? `
              <div class="field">
                <div class="label">Phone:</div>
                <div class="value">${data.phone}</div>
              </div>
            ` : ''}
            <div class="field">
              <div class="label">Subject:</div>
              <div class="value">${data.subject}</div>
            </div>
            <div class="field">
              <div class="label">Message:</div>
              <div class="value">${data.message}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}
```

#### Send Email Function

```typescript
// src/lib/email/send-contact-emails.ts
import 'server-only';
import { resend, EMAIL_CONFIG } from './config';
import { generateContactAdminEmail } from './templates/contact-admin';
import { generateContactCustomerEmail } from './templates/contact-customer';
import { ContactFormSchemaType } from '@/lib/validations/contact-schema';

export async function sendContactEmails(data: ContactFormSchemaType) {
  // Send to admin
  const adminEmailResult = await resend.emails.send({
    from: EMAIL_CONFIG.from,
    to: EMAIL_CONFIG.contactEmail,
    subject: `New Contact: ${data.subject}`,
    html: generateContactAdminEmail(data),
  });

  // Send confirmation to customer
  const customerEmailResult = await resend.emails.send({
    from: EMAIL_CONFIG.from,
    to: data.email,
    subject: 'Thank You for Contacting V7MPC',
    html: generateContactCustomerEmail(data),
  });

  return { adminEmailResult, customerEmailResult };
}
```

---

## 7. Important Files Reference

### Configuration Files

#### package.json
**Location**: `d:\PROGRAMACION\webs\v7\v7mpc-website\package.json`

**Purpose**: Defines project dependencies, scripts, and metadata

**Key Scripts**:
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

#### tsconfig.json
**Location**: `d:\PROGRAMACION\webs\v7\v7mpc-website\tsconfig.json`

**Purpose**: TypeScript compiler configuration

**Key Settings**:
- `strict: true` - Enable all strict type-checking
- `target: ES2017` - Compilation target
- Path alias: `@/*` → `./src/*`

#### next.config.ts
**Location**: `d:\PROGRAMACION\webs\v7\v7mpc-website\next.config.ts`

**Purpose**: Next.js configuration

**Key Settings**:
- Image optimization with remote patterns
- ESLint and TypeScript error handling
- Build settings

#### components.json
**Location**: `d:\PROGRAMACION\webs\v7\v7mpc-website\components.json`

**Purpose**: Shadcn/ui configuration

**Settings**:
- Style: new-york
- RSC: enabled
- TypeScript: enabled
- Path aliases

### Core Utilities

#### src/lib/utils.ts
**Purpose**: Core utility functions

**Key Function**:
```typescript
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Usage**: Merge Tailwind classes safely

#### src/lib/validations/
**Purpose**: Zod validation schemas

**Files**:
- `contact-schema.ts` - Contact form validation
- `quote-schema.ts` - Quote form validation

#### src/types/
**Purpose**: TypeScript type definitions

**Files**:
- `index.ts` - Barrel export
- `products.ts` - Product interfaces
- `quote.ts` - Quote interfaces
- `contact.ts` - Contact interfaces

### Key Components

#### src/components/layout/Navbar.tsx
**Purpose**: Main navigation component

**Features**:
- Sticky header with scroll effects
- Desktop dropdown menus
- Mobile hamburger menu
- MBE/WBENC badges
- Request Quote CTA

#### src/components/layout/Footer.tsx
**Purpose**: Site footer

**Features**:
- 4-column layout
- Company info, links, contact, social
- Responsive design

#### src/components/home/
**Purpose**: Home page sections

**Components**:
- `Hero.tsx` - Main hero section
- `CoreServices.tsx` - Service cards
- `WhatWeProvide.tsx` - Value proposition
- `ProductsShowcase.tsx` - Featured products

### API Routes

#### src/app/api/contact/submit/route.ts
**Purpose**: Contact form submission endpoint

**Method**: POST

**Validation**: Zod schema

**Actions**: Send emails to admin and customer

#### src/app/api/quotes/submit/route.ts
**Purpose**: Quote request submission endpoint

**Method**: POST

**Validation**: Multi-step Zod schema

**Actions**: Generate quote ID, send emails

#### src/app/api/products/all/route.ts
**Purpose**: Fetch all products

**Method**: GET

**Returns**: Product catalog

---

## 8. Business Context

### V7 Marketplace Corporation Overview

**Mission**: Provide reliable, efficient, and ethical global sourcing and manufacturing solutions for custom products, promotional items, and recognition awards.

**Founded**: 20+ years of excellence in the industry

**Leadership**: Minority-owned, Latin woman-led enterprise

**Core Values**:
- Reliability
- Integrity
- Quality
- Customer Service
- Ethical Partnerships

**Unique Selling Points**:
- Minority-owned certification (MBE, WBENC)
- Government procurement expertise (GSA Schedule ready)
- 20+ years of industry experience
- Quality control and ethical sourcing
- Comprehensive product lines
- Custom manufacturing capabilities

### Target Markets

#### 1. Government & Institutions
- **Federal agencies** (GSA Schedule compliant)
- **State and local governments**
- **Public schools and universities**
- **Military and defense organizations**

**Key Services**:
- Procurement compliance
- SAM.gov registration
- SBA certification
- NMSDC membership

#### 2. Corporate/Businesses
- **Large corporations** needing branded merchandise
- **Small businesses** seeking promotional items
- **Marketing agencies** requiring custom products
- **Event planners** organizing conferences

**Key Services**:
- Branded merchandise
- Corporate gifts
- Trade show giveaways
- Employee recognition

#### 3. Schools & Universities
- **K-12 schools**
- **Colleges and universities**
- **Athletic departments**
- **Alumni associations**

**Key Services**:
- Spirit wear
- Athletic uniforms
- Recognition awards
- Fundraising items

#### 4. Non-profits & Organizations
- **Faith-based organizations** (churches, temples)
- **Community groups**
- **Charitable foundations**
- **Professional associations**

**Key Services**:
- Faith-based merchandise
- Fundraising products
- Volunteer recognition
- Event materials

### Product Divisions

#### 1. Jewelry & Recognition

**Zaché® Brand Lines**:
- **Zaché® Prestige** - Recognition & Awards
- **Zaché® Signature** - Luxury Designer
- **Zaché® Original** - Everyday Elegance
- **Lu Love®** - Inspirational Lifestyle

**Products**:
- Custom medals
- Recognition pins
- Awards and plaques
- Lapel pins
- Commemorative items
- Corporate recognition jewelry

#### 2. Promotional Products

**7 Product Categories**:
1. **Office & Writing** - Pens, notebooks, desk accessories
2. **Drinkware** - Mugs, tumblers, water bottles
3. **Tech & Gadgets** - USB drives, phone accessories, chargers
4. **Bags & Travel** - Totes, backpacks, luggage tags
5. **Home & Lifestyle** - Home decor, kitchen items
6. **Eco-Friendly** - Sustainable and recycled products
7. **Faith-Based** - Religious-themed merchandise

#### 3. Custom Apparel

**Products**:
- T-shirts and polos
- Hoodies and sweatshirts
- Button-down shirts
- Jackets and outerwear
- Hats and caps
- Uniforms

**Customization Options**:
- Screen printing
- Embroidery
- Heat transfer
- Custom labels

#### 4. Signs & Displays

**Products**:
- Banners and flags
- Yard signs
- Trade show displays
- Posters and signage
- Vehicle graphics

### Business Model

#### Quote-Based System

V7MPC operates on a **quote-based business model** (not direct e-commerce):

1. **Customer submits quote request** with:
   - Product details
   - Quantity
   - Customization requirements
   - Timeline

2. **V7MPC reviews and responds** within 24 hours with:
   - Detailed pricing
   - Production timeline
   - Shipping options
   - Customization mockups (if applicable)

3. **Customer approves quote**

4. **V7MPC manages production**:
   - Supplier coordination
   - Quality control
   - Custom manufacturing
   - Logistics

5. **Delivery to customer**

#### Why Quote-Based?

- **Custom pricing** based on quantity, materials, customization
- **Flexible options** tailored to customer needs
- **Quality assurance** with personalized service
- **Complex orders** requiring consultation
- **B2B relationships** built on trust and communication

---

## 9. Common Development Tasks

### Task 1: Adding a New Product

#### Step 1: Add Product Data

```typescript
// src/lib/data/products.ts

export const products: Product[] = [
  // ... existing products
  {
    id: 'new-product-id',
    slug: 'new-product-slug',
    name: 'New Product Name',
    shortDescription: 'Brief description for product cards',
    description: 'Full product description with details',
    category: {
      id: 'category-id',
      slug: 'category-slug',
      name: 'Category Name',
      description: 'Category description',
      icon: Package
    },
    tags: ['tag1', 'tag2', 'customizable'],
    images: [
      '/images/products/product-image-1.jpg',
      '/images/products/product-image-2.jpg'
    ],
    features: [
      'Feature 1',
      'Feature 2',
      'Feature 3'
    ],
    isCustomizable: true,
    technicalSpecifications: 'Technical details here',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01')
  }
];
```

#### Step 2: Add Product Images

Place images in `public/images/products/`:
- Product images (multiple angles)
- Optimization: WebP format, < 200KB each
- Dimensions: 800x800px or higher

#### Step 3: Create Product Detail Page (Optional)

If custom product page needed:

```typescript
// src/app/products/[id]/page.tsx
import { products } from '@/lib/data/products';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id);

  if (!product) return {};

  return {
    title: `${product.name} | V7MPC`,
    description: product.shortDescription || product.description,
    // ... OpenGraph metadata
  };
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id);

  if (!product) notFound();

  return (
    <div>
      {/* Product detail UI */}
    </div>
  );
}
```

### Task 2: Modifying Forms

#### Update Validation Schema

```typescript
// src/lib/validations/contact-schema.ts

// Add new field to schema
export const contactFormSchema = z.object({
  // ... existing fields

  // New field
  newField: z.string()
    .min(3, 'New field must be at least 3 characters')
    .optional(),
});

export type ContactFormSchemaType = z.infer<typeof contactFormSchema>;
```

#### Update Form Component

```typescript
// src/components/contact/ContactForm.tsx

// Add new field to form
<div>
  <label htmlFor="newField" className="block text-sm font-medium text-gray-700">
    New Field
  </label>
  <Input
    id="newField"
    type="text"
    {...register('newField')}
    className="mt-1"
    disabled={isSubmitting}
  />
  {errors.newField && (
    <p className="mt-1 text-sm text-red-600">{errors.newField.message}</p>
  )}
</div>
```

#### Update Email Template

```typescript
// src/lib/email/templates/contact-admin.ts

// Add new field to email template
export function generateContactAdminEmail(data: ContactFormSchemaType): string {
  return `
    <!-- ... existing HTML -->

    ${data.newField ? `
      <div class="field">
        <div class="label">New Field:</div>
        <div class="value">${data.newField}</div>
      </div>
    ` : ''}
  `;
}
```

### Task 3: SEO Optimization

#### Add Metadata to Pages

```typescript
// src/app/[page]/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title | V7MPC',
  description: 'Comprehensive page description for SEO (155-160 characters)',
  keywords: ['keyword1', 'keyword2', 'keyword3', 'long-tail keyword'],

  // OpenGraph for social media
  openGraph: {
    type: 'website',
    url: 'https://www.v7mpc.com/page',
    title: 'Social Media Title (60 chars)',
    description: 'Social media description (155 chars)',
    images: [
      {
        url: 'https://www.v7mpc.com/images/og/page.jpg',
        width: 1200,
        height: 630,
        alt: 'OG Image Alt Text',
      },
    ],
    siteName: 'V7 Marketplace Corporation',
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    site: '@v7mpc',
    title: 'Twitter Title',
    description: 'Twitter Description',
    images: ['https://www.v7mpc.com/images/og/page.jpg'],
  },

  // Additional SEO
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.v7mpc.com/page',
  },
};
```

#### Add Structured Data (JSON-LD)

```typescript
// src/components/seo/JsonLd.tsx

// Organization Schema
export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'V7 Marketplace Corporation',
    url: 'https://www.v7mpc.com',
    logo: 'https://www.v7mpc.com/logo.png',
    description: 'Global sourcing and manufacturing solutions',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Pensacola',
      addressRegion: 'FL',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-786-286-7540',
      contactType: 'Customer Service',
      email: 'info@v7mpc.com',
    },
    sameAs: [
      'https://linkedin.com/company/v7mpc',
      'https://facebook.com/v7mpc',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### Task 4: Image Management

#### Using Next.js Image Component

```typescript
import Image from 'next/image';

// Local image
<Image
  src="/images/hero.jpg"
  alt="Hero image description"
  width={1920}
  height={1080}
  priority  // For above-fold images
  className="object-cover"
/>

// Remote image
<Image
  src="https://images.51microshop.com/image.jpg"
  alt="Product image"
  fill  // Fill parent container
  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
  className="object-cover"
/>

// With responsive sizing
<div className="relative w-full h-[400px]">
  <Image
    src="/images/product.jpg"
    alt="Product"
    fill
    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 800px"
    className="object-cover rounded-lg"
  />
</div>
```

#### Image Optimization

```bash
# Using sharp-cli to optimize images
npx sharp-cli compress -i public/images/hero.jpg -o public/images/hero-optimized.jpg --quality 85 --format webp
```

**Guidelines**:
- Use WebP format when possible
- Keep file sizes < 200KB for web
- Use appropriate dimensions (1920x1080 for hero, 800x800 for products)
- Always provide `alt` text for accessibility
- Use `priority` prop for above-fold images

---

## 10. Best Practices & Guidelines

### Code Quality

#### ESLint Rules

Follow the project's ESLint configuration:

```json
{
  "extends": ["next/core-web-vitals"],
  "rules": {
    "react/no-unescaped-entities": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@next/next/no-img-element": "warn"
  }
}
```

**Key Rules**:
- No unused variables (warn)
- Use Next.js `<Image>` instead of `<img>` (warn)
- React unescaped entities allowed (off)

#### TypeScript Strict Mode

Always enable and follow TypeScript strict mode:

```typescript
// ✅ Good: Explicit types
function processProduct(product: Product): string {
  return product.name;
}

// ❌ Bad: Implicit any
function processProduct(product) {
  return product.name;
}

// ✅ Good: Handle null/undefined
function getProductName(product: Product | null): string {
  return product?.name ?? 'Unknown';
}

// ❌ Bad: Assume non-null
function getProductName(product: Product | null): string {
  return product.name;  // Error: Object is possibly 'null'
}
```

#### Component Organization

```typescript
// ✅ Good: Clear component structure
export default function MyComponent({ title, items }: MyComponentProps) {
  // 1. Hooks
  const [state, setState] = useState();

  // 2. Derived values
  const filteredItems = useMemo(() => {
    return items.filter(/* ... */);
  }, [items]);

  // 3. Event handlers
  const handleClick = () => {
    // ...
  };

  // 4. Effects
  useEffect(() => {
    // ...
  }, []);

  // 5. Early returns
  if (!items.length) return null;

  // 6. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}

// ❌ Bad: Mixed order, unclear structure
```

#### Import Ordering

```typescript
// 1. React & Next.js
import { useState } from 'react';
import Link from 'next/link';

// 2. External libraries
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// 3. Internal components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// 4. Internal utilities
import { cn } from '@/lib/utils';
import { myFormSchema } from '@/lib/validations/my-form-schema';

// 5. Types
import type { Product } from '@/types/products';

// 6. Styles (if any)
import styles from './MyComponent.module.css';
```

### Security

#### reCAPTCHA v3 on Forms

Always use reCAPTCHA on public forms:

```typescript
// 1. Wrap app with provider (layout.tsx)
import { RecaptchaProvider } from '@/components/providers/RecaptchaProvider';

<RecaptchaProvider>
  {children}
</RecaptchaProvider>

// 2. Use in form component
'use client';
import { useReCaptcha } from 'react-google-recaptcha-v3';

export default function MyForm() {
  const { executeRecaptcha } = useReCaptcha();

  const onSubmit = async (data) => {
    const token = await executeRecaptcha('form_submit');

    await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify({ ...data, recaptchaToken: token }),
    });
  };
}
```

#### Server-Side Validation

Always validate on the server:

```typescript
// ✅ Good: Server-side validation
export async function POST(request: NextRequest) {
  const body = await request.json();

  // Validate with Zod
  const result = mySchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }

  // Process validated data
  const data = result.data;
  // ...
}

// ❌ Bad: Trust client data
export async function POST(request: NextRequest) {
  const body = await request.json();
  // Directly use body without validation
}
```

#### Environment Variables

```typescript
// ✅ Good: Validate environment variables
if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined');
}

// Use typed env vars
const apiKey: string = process.env.RESEND_API_KEY;

// ❌ Bad: Use without checking
const apiKey = process.env.RESEND_API_KEY;  // Could be undefined
```

#### 'server-only' Directive

Use for server-only code:

```typescript
// ✅ Good: Mark server-only code
import 'server-only';

// This code will error if imported in client components
export async function sendEmail() {
  // ...
}
```

### Performance

#### Image Optimization

```typescript
// ✅ Good: Optimized images
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1920}
  height={1080}
  priority
  sizes="100vw"
  className="object-cover"
/>

// ❌ Bad: Unoptimized images
<img src="/hero.jpg" alt="Hero" />
```

#### Lazy Loading

```typescript
// ✅ Good: Lazy load heavy components
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>,
  ssr: false  // Skip SSR if not needed
});

// ❌ Bad: Load everything upfront
import HeavyComponent from './HeavyComponent';
```

#### Memoization

```typescript
// ✅ Good: Memoize expensive computations
const filteredProducts = useMemo(() => {
  return products.filter(p => p.category === selectedCategory);
}, [products, selectedCategory]);

// ❌ Bad: Recompute on every render
const filteredProducts = products.filter(p => p.category === selectedCategory);
```

### Accessibility

#### Semantic HTML

```typescript
// ✅ Good: Semantic elements
<nav>
  <ul>
    <li><Link href="/">Home</Link></li>
  </ul>
</nav>

<main>
  <article>
    <h1>Title</h1>
    <p>Content</p>
  </article>
</main>

// ❌ Bad: Divs for everything
<div>
  <div>
    <div><a href="/">Home</a></div>
  </div>
</div>
```

#### Alt Text for Images

```typescript
// ✅ Good: Descriptive alt text
<Image
  src="/medal.jpg"
  alt="Gold medal with blue ribbon for first place achievement"
  width={400}
  height={400}
/>

// ❌ Bad: Generic or missing alt text
<Image src="/medal.jpg" alt="image" width={400} height={400} />
<Image src="/medal.jpg" alt="" width={400} height={400} />
```

#### ARIA Labels

```typescript
// ✅ Good: ARIA labels for interactive elements
<button
  aria-label="Open navigation menu"
  onClick={toggleMenu}
>
  <MenuIcon />
</button>

// ❌ Bad: No label for icon button
<button onClick={toggleMenu}>
  <MenuIcon />
</button>
```

#### Keyboard Navigation

```typescript
// ✅ Good: Keyboard accessible
<button
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
  tabIndex={0}
>
  Click me
</button>

// ❌ Bad: Click-only interaction
<div onClick={handleClick}>
  Click me
</div>
```

### SEO

#### Metadata on All Pages

```typescript
// ✅ Good: Complete metadata
export const metadata: Metadata = {
  title: 'Page Title | V7MPC',
  description: 'Full description',
  keywords: ['keyword1', 'keyword2'],
  openGraph: { /* ... */ },
  twitter: { /* ... */ },
};

// ❌ Bad: Missing metadata
export default function Page() {
  return <div>Content</div>;
}
```

#### Structured Data

```typescript
// ✅ Good: Add structured data
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      // ...
    })
  }}
/>
```

#### Clean URL Structure

```
✅ Good:
/products
/products/jewelry-recognition
/products/medal-custom-gold

❌ Bad:
/prod?id=123
/p/jw-rec
/products?category=medals&id=456
```

---

## 11. Environment Variables

### Required Variables

Create a `.env.local` file in the project root:

```bash
# ============================================================================
# Site Configuration
# ============================================================================

# Site URL (used for metadata, OpenGraph, sitemap)
NEXT_PUBLIC_SITE_URL=https://www.v7mpc.com

# ============================================================================
# Google reCAPTCHA v3
# ============================================================================

# Secret key (server-side only)
RECAPTCHA_SECRET_KEY=your_secret_key_here

# Site key (public, client-side)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here

# ============================================================================
# Resend Email Service
# ============================================================================

# API key for Resend
RESEND_API_KEY=your_resend_api_key

# From email address
FROM_EMAIL=onboarding@resend.dev

# Admin email (receives form submissions)
ADMIN_EMAIL=info@v7mpc.com
```

### Environment Variable Details

#### NEXT_PUBLIC_SITE_URL

**Purpose**: Base URL for the website

**Used for**:
- OpenGraph metadata
- Canonical URLs
- Sitemap generation
- Email templates

**Format**: `https://www.v7mpc.com` (no trailing slash)

#### RECAPTCHA_SECRET_KEY

**Purpose**: Google reCAPTCHA v3 secret key (server-side)

**Used for**: Verifying reCAPTCHA tokens on the server

**How to get**:
1. Go to https://www.google.com/recaptcha/admin
2. Register your site
3. Select reCAPTCHA v3
4. Copy the secret key

**Security**: Keep secret, never expose to client

#### NEXT_PUBLIC_RECAPTCHA_SITE_KEY

**Purpose**: Google reCAPTCHA v3 site key (client-side)

**Used for**: Generating reCAPTCHA tokens in the browser

**How to get**: Same as secret key (from reCAPTCHA admin)

**Note**: `NEXT_PUBLIC_` prefix exposes to browser

#### RESEND_API_KEY

**Purpose**: Resend email service API key

**Used for**: Sending transactional emails

**How to get**:
1. Sign up at https://resend.com
2. Create an API key in the dashboard
3. Copy the key

**Security**: Keep secret, server-side only

See `RESEND_SETUP.md` for full setup instructions

#### FROM_EMAIL

**Purpose**: Email address used as sender

**Format**: `onboarding@resend.dev` (Resend default) or your custom domain

**Production**: Use custom domain (e.g., `noreply@v7mpc.com`)

**Note**: Requires domain verification in Resend for custom domains

#### ADMIN_EMAIL

**Purpose**: Email address to receive form submissions

**Format**: `info@v7mpc.com`

**Used for**:
- Contact form submissions
- Quote requests
- Admin notifications

### Security Notes

1. **Never commit `.env.local`** to version control
2. Add `.env.local` to `.gitignore`
3. Use different keys for development and production
4. Rotate keys regularly
5. Use `NEXT_PUBLIC_` prefix only for truly public variables
6. Validate environment variables at startup:

```typescript
// Validate on app start
if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined');
}
```

### Example .env.local

```bash
# Development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
RECAPTCHA_SECRET_KEY=6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
RESEND_API_KEY=re_123456789
FROM_EMAIL=onboarding@resend.dev
ADMIN_EMAIL=dev@example.com

# Production
# NEXT_PUBLIC_SITE_URL=https://www.v7mpc.com
# RECAPTCHA_SECRET_KEY=your_production_secret
# NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_production_site_key
# RESEND_API_KEY=your_production_key
# FROM_EMAIL=noreply@v7mpc.com
# ADMIN_EMAIL=info@v7mpc.com
```

---

## 12. Testing & Deployment

### Testing Scripts

#### Test Email Setup

```bash
tsx test-email-setup.mjs
```

**Purpose**: Validate Resend email configuration

**Tests**:
- API key validity
- Email sending functionality
- From/To email addresses

**Output**: Success or error messages

#### Test Quote API

```bash
tsx test-quote-api.mjs
```

**Purpose**: Test quote submission endpoint

**Tests**:
- API endpoint functionality
- Validation
- Email delivery

### Build Process

#### Development Build

```bash
npm run dev
```

**Features**:
- Turbopack enabled
- Fast refresh
- Hot module replacement
- Running on http://localhost:3000

#### Production Build

```bash
npm run build
```

**Process**:
1. TypeScript type checking (warnings only)
2. ESLint (warnings only)
3. Next.js compilation with Turbopack
4. Image optimization
5. Static page generation
6. Route optimization

**Output**: `.next` directory with optimized build

#### Start Production Server

```bash
npm start
```

**Note**: Requires successful `npm run build` first

### Deployment Checklist

#### Pre-Deployment

- [ ] All tests passing
- [ ] Build completes without errors
- [ ] Environment variables configured
- [ ] Images optimized
- [ ] SEO metadata complete
- [ ] Forms tested
- [ ] Email delivery tested
- [ ] reCAPTCHA configured
- [ ] OpenGraph images generated
- [ ] Performance optimized

#### Vercel Deployment

1. **Connect Repository**:
   - Link GitHub repository to Vercel
   - Import project

2. **Configure Project**:
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. **Environment Variables**:
   - Add all `.env.local` variables to Vercel
   - Use production values
   - Mark sensitive variables as secret

4. **Domain Configuration**:
   - Add custom domain: `www.v7mpc.com`
   - Configure DNS records
   - Enable HTTPS (automatic)

5. **Deploy**:
   - Automatic deployment on git push
   - Preview deployments for PRs
   - Production deployment on main branch

#### Post-Deployment

- [ ] Verify site loads
- [ ] Test all pages
- [ ] Submit test forms
- [ ] Check email delivery
- [ ] Verify OpenGraph images
- [ ] Test mobile responsiveness
- [ ] Check SEO metadata
- [ ] Verify analytics tracking
- [ ] Monitor performance
- [ ] Check error logs

### Vercel Configuration

**vercel.json** (if needed):

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "NEXT_PUBLIC_SITE_URL": "@next_public_site_url"
  }
}
```

### Monitoring & Analytics

1. **Vercel Analytics**:
   - Automatic performance monitoring
   - Core Web Vitals tracking
   - Real User Monitoring (RUM)

2. **Error Tracking**:
   - Vercel logs
   - Consider: Sentry integration

3. **Performance**:
   - Lighthouse scores
   - PageSpeed Insights
   - Core Web Vitals

---

## 13. Troubleshooting Guide

### Common Issues & Solutions

#### Issue: Build Fails with TypeScript Errors

**Symptoms**:
```
Type error: Property 'x' does not exist on type 'Y'
```

**Solution**:
1. Check `tsconfig.json` for strict mode settings
2. Ensure all types are properly defined
3. Use type assertions if necessary: `as Type`
4. Temporary bypass (not recommended): Set `ignoreBuildErrors: true` in `next.config.ts`

#### Issue: Images Not Loading

**Symptoms**:
- Images return 404
- "Invalid src prop" error

**Solution**:
1. Check image path (case-sensitive)
2. Verify image exists in `public/` directory
3. For remote images, add domain to `next.config.ts`:

```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'your-domain.com',
      pathname: '/**',
    },
  ],
}
```

#### Issue: Environment Variables Not Working

**Symptoms**:
- `undefined` when accessing `process.env.VARIABLE`
- Features not working (email, reCAPTCHA)

**Solution**:
1. Ensure `.env.local` exists in project root
2. Restart dev server after changing env vars
3. Use `NEXT_PUBLIC_` prefix for client-side variables
4. Check variable names (case-sensitive)
5. For production, set in Vercel dashboard

#### Issue: Form Submission Fails

**Symptoms**:
- 400 Bad Request
- Validation errors

**Solution**:
1. Check Zod schema matches form fields
2. Verify API route exists and is correct
3. Check request body format
4. Verify reCAPTCHA token is being sent
5. Check server logs for errors

#### Issue: Email Not Sending

**Symptoms**:
- Email submission succeeds but no email received

**Solution**:
1. Verify Resend API key is correct
2. Check `FROM_EMAIL` and `ADMIN_EMAIL` are set
3. Run `tsx test-email-setup.mjs` to test
4. Check Resend dashboard for delivery status
5. Verify email addresses are valid
6. Check spam folder

#### Issue: reCAPTCHA Not Working

**Symptoms**:
- "reCAPTCHA validation failed"
- Token errors

**Solution**:
1. Verify both site key and secret key are set
2. Check keys match your domain
3. Ensure `RecaptchaProvider` wraps app
4. Verify `useReCaptcha` hook is being used correctly
5. Check reCAPTCHA admin console for errors

#### Issue: Styles Not Applying

**Symptoms**:
- Components look unstyled
- Tailwind classes not working

**Solution**:
1. Ensure Tailwind CSS is imported in `globals.css`
2. Check `postcss.config.mjs` is correct
3. Restart dev server
4. Verify class names are correct (no typos)
5. Check for CSS conflicts
6. Use `cn()` utility to merge classes

#### Issue: Page Not Found (404)

**Symptoms**:
- 404 error on valid route

**Solution**:
1. Check file structure: `app/[route]/page.tsx`
2. Verify file name is `page.tsx` (not `Page.tsx`)
3. Ensure no typos in URL
4. Check for dynamic route segments `[id]`
5. Restart dev server

### Debug Tips

#### Enable Verbose Logging

```typescript
// Add to component
console.log('Debug:', { variable1, variable2 });

// Add to API route
console.error('API Error:', error);
```

#### Check Network Requests

1. Open browser DevTools (F12)
2. Go to Network tab
3. Filter by XHR/Fetch
4. Check request/response data

#### Inspect React Components

1. Install React DevTools extension
2. Inspect component props and state
3. Check component tree

#### Check Build Output

```bash
npm run build
```

Look for warnings or errors in build output

#### Test API Routes Directly

Use tools like:
- Postman
- Insomnia
- curl
- Browser fetch

```javascript
fetch('http://localhost:3000/api/contact/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ /* test data */ })
})
```

#### Clear Next.js Cache

```bash
rm -rf .next
npm run build
```

### Getting Help

1. **Project Documentation**:
   - README.md
   - RESEND_SETUP.md
   - docs/OPENGRAPH-GUIDE.md

2. **External Documentation**:
   - [Next.js Docs](https://nextjs.org/docs)
   - [React Docs](https://react.dev)
   - [Tailwind CSS Docs](https://tailwindcss.com/docs)
   - [Shadcn/ui Docs](https://ui.shadcn.com)
   - [Resend Docs](https://resend.com/docs)

3. **Community**:
   - Next.js GitHub Issues
   - Stack Overflow
   - Next.js Discord

---

## 14. Additional Resources

### Internal Documentation

#### Project README
**Location**: `README.md`

**Contents**:
- Project overview
- Tech stack
- Development setup
- Project structure
- Development roadmap
- Brand colors
- Certifications

#### Resend Setup Guide
**Location**: `RESEND_SETUP.md`

**Contents**:
- Step-by-step Resend configuration
- API key setup
- Domain verification
- Email templates
- Testing guide
- Troubleshooting

#### OpenGraph Guide
**Location**: `docs/OPENGRAPH-GUIDE.md`

**Contents**:
- OpenGraph implementation
- Image optimization
- WhatsApp compatibility
- Social media best practices

#### SanMar Integration Guide
**Location**: `docs/SanMar-Web-Services-Integration-Guide-24.2.pdf`

**Contents**:
- SanMar API integration
- Product fetching
- Authentication
- API endpoints

### External Documentation

#### Next.js
- **Docs**: https://nextjs.org/docs
- **App Router**: https://nextjs.org/docs/app
- **API Routes**: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- **Image Optimization**: https://nextjs.org/docs/app/building-your-application/optimizing/images
- **Metadata**: https://nextjs.org/docs/app/building-your-application/optimizing/metadata

#### React
- **Docs**: https://react.dev
- **Hooks**: https://react.dev/reference/react
- **Server Components**: https://react.dev/reference/rsc/server-components
- **Client Components**: https://react.dev/reference/rsc/use-client

#### TypeScript
- **Docs**: https://www.typescriptlang.org/docs
- **Handbook**: https://www.typescriptlang.org/docs/handbook/intro.html
- **React + TypeScript**: https://react-typescript-cheatsheet.netlify.app

#### Tailwind CSS
- **Docs**: https://tailwindcss.com/docs
- **Core Concepts**: https://tailwindcss.com/docs/utility-first
- **Customization**: https://tailwindcss.com/docs/configuration
- **Dark Mode**: https://tailwindcss.com/docs/dark-mode

#### Shadcn/ui
- **Docs**: https://ui.shadcn.com
- **Components**: https://ui.shadcn.com/docs/components
- **Installation**: https://ui.shadcn.com/docs/installation
- **Theming**: https://ui.shadcn.com/docs/theming

#### react-hook-form
- **Docs**: https://react-hook-form.com
- **Get Started**: https://react-hook-form.com/get-started
- **API**: https://react-hook-form.com/api
- **Examples**: https://react-hook-form.com/form-builder

#### Zod
- **Docs**: https://zod.dev
- **Basic Usage**: https://zod.dev/?id=basic-usage
- **Primitives**: https://zod.dev/?id=primitives
- **Error Handling**: https://zod.dev/?id=error-handling

#### Resend
- **Docs**: https://resend.com/docs
- **Quickstart**: https://resend.com/docs/send-with-nextjs
- **API Reference**: https://resend.com/docs/api-reference
- **Email Templates**: https://resend.com/docs/send-with-react

#### reCAPTCHA
- **Docs**: https://developers.google.com/recaptcha
- **v3 Guide**: https://developers.google.com/recaptcha/docs/v3
- **Admin Console**: https://www.google.com/recaptcha/admin

### Community Resources

#### Forums & Communities
- [Next.js Discord](https://nextjs.org/discord)
- [Reactiflux Discord](https://www.reactiflux.com)
- [Stack Overflow - Next.js](https://stackoverflow.com/questions/tagged/next.js)
- [Reddit - Next.js](https://www.reddit.com/r/nextjs)

#### Learning Resources
- [Next.js Learn](https://nextjs.org/learn)
- [React Tutorial](https://react.dev/learn)
- [Tailwind CSS Tutorial](https://tailwindcss.com/docs/installation)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

### Tools & Utilities

#### Development Tools
- **VS Code** - Recommended editor
- **React DevTools** - Browser extension for React debugging
- **Postman** - API testing
- **Lighthouse** - Performance auditing

#### VS Code Extensions (Recommended)
- **ES7+ React/Redux/React-Native snippets**
- **Tailwind CSS IntelliSense**
- **ESLint**
- **Prettier - Code formatter**
- **TypeScript Hero**
- **Auto Rename Tag**
- **Path Intellisense**

#### Browser Extensions
- **React Developer Tools**
- **Redux DevTools** (if using Redux)
- **Lighthouse**
- **WAVE** (Accessibility checker)

---

## Summary

This documentation provides comprehensive guidance for developing and maintaining the V7MPC website. Key points to remember:

1. **Tech Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS 4
2. **Architecture**: App Router, feature-based components, Server/Client separation
3. **Standards**: Strict TypeScript, Zod validation, utility-first CSS
4. **Business**: B2B quote-based model, government focus, minority-owned
5. **Security**: reCAPTCHA, server-side validation, environment variables
6. **Deployment**: Vercel-ready, environment configuration, monitoring

For questions or issues not covered here, refer to the [Additional Resources](#14-additional-resources) section or check the internal documentation files.

---

**Last Updated**: January 2025
**Version**: 1.0.0
**Maintained By**: V7MPC Development Team
