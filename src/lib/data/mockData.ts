// Mock Data para V7MPC
// Paso a paso - empezando básico

import { Product } from '@/types/products';
import { getCategoryBySlug } from './categories';

export const mockProducts: Product[] = [
  // JEWELRY & RECOGNITION
  {
    id: 'award-001',
    slug: 'acrylic-awards',
    name: 'Acrylic Awards',
    description: 'Modern acrylic awards for employee recognition and achievements',
    category: getCategoryBySlug('jewelry-recognition')!,
    tags: ['awards', 'acrylic', 'recognition'],
    images: ['/images/products/award.jpg'],
    features: ['Laser engraving', 'Multiple sizes', 'Gift box included'],
    isCustomizable: true,
    createdAt: new Date('2024-02-07'),
    updatedAt: new Date('2024-02-07')
  },
  {
    id: 'medal-001',
    slug: 'custom-medals',
    name: 'Custom Medals',
    description: 'Professional medals with custom designs for achievements and ceremonies',
    category: getCategoryBySlug('jewelry-recognition')!,
    tags: ['medals', 'custom', 'achievement'],
    images: ['/images/products/medal.jpg'],
    features: ['Custom design', 'Ribbon included', 'Multiple finishes'],
    isCustomizable: true,
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10')
  },
  {
    id: 'pin-001',
    slug: 'enamel-pins',
    name: 'Enamel Pins',
    description: 'High-quality enamel pins for organizations and recognition programs',
    category: getCategoryBySlug('jewelry-recognition')!,
    tags: ['pins', 'enamel', 'organization'],
    images: ['/images/products/pin.jpg'],
    features: ['Soft or hard enamel', 'Custom shapes', 'Butterfly clutch'],
    isCustomizable: true,
    createdAt: new Date('2024-02-11'),
    updatedAt: new Date('2024-02-11')
  },

  // APPAREL
  {
    id: 'polo-001',
    slug: 'polo-shirts',
    name: 'Corporate Polo Shirts',
    description: 'High-quality polo shirts for corporate uniforms',
    category: getCategoryBySlug('apparel')!,
    tags: ['apparel', 'shirts', 'polo'],
    images: ['/images/products/polo.jpg'],
    features: ['Embroidery ready', 'Multiple colors', 'Moisture-wicking'],
    isCustomizable: true,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: 'cap-001',
    slug: 'baseball-caps',
    name: 'Baseball Caps',
    description: 'Adjustable baseball caps with embroidery and printing options',
    category: getCategoryBySlug('apparel')!,
    tags: ['hats', 'caps', 'baseball'],
    images: ['/images/products/cap.jpg'],
    features: ['Adjustable strap', '3D embroidery', 'Various colors'],
    isCustomizable: true,
    createdAt: new Date('2024-02-02'),
    updatedAt: new Date('2024-02-02')
  },
  {
    id: 'jacket-001',
    slug: 'fleece-jackets',
    name: 'Fleece Jackets',
    description: 'Comfortable fleece jackets perfect for team uniforms and corporate wear',
    category: getCategoryBySlug('apparel')!,
    tags: ['jackets', 'fleece', 'uniform'],
    images: ['/images/products/jacket.jpg'],
    features: ['Full-zip front', 'Side pockets', 'Embroidery ready'],
    isCustomizable: true,
    createdAt: new Date('2024-02-12'),
    updatedAt: new Date('2024-02-12')
  },

  // PROMOS
  {
    id: 'pen-001',
    slug: 'custom-pens',
    name: 'Custom Pens',
    description: 'Professional pens with custom logos perfect for promotional campaigns',
    category: getCategoryBySlug('promos')!,
    tags: ['pens', 'promotional', 'office'],
    images: ['/images/products/pen.jpg'],
    features: ['Logo engraving', 'Smooth ink flow', 'Bulk pricing'],
    isCustomizable: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'mug-001',
    slug: 'ceramic-mugs',
    name: 'Ceramic Coffee Mugs',
    description: 'Premium ceramic mugs for office and promotional use',
    category: getCategoryBySlug('promos')!,
    tags: ['mugs', 'ceramic', 'promotional'],
    images: ['/images/products/mug.jpg'],
    features: ['Dishwasher safe', 'Logo printing', 'Multiple colors'],
    isCustomizable: true,
    createdAt: new Date('2024-01-30'),
    updatedAt: new Date('2024-01-30')
  },
  {
    id: 'keychain-001',
    slug: 'metal-keychains',
    name: 'Metal Keychains',
    description: 'Durable metal keychains with custom engraving options',
    category: getCategoryBySlug('promos')!,
    tags: ['keychains', 'metal', 'promotional'],
    images: ['/images/products/keychain.jpg'],
    features: ['Laser engraving', 'Multiple finishes', 'Bulk pricing'],
    isCustomizable: true,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  },
  {
    id: 'lanyard-001',
    slug: 'custom-lanyards',
    name: 'Custom Lanyards',
    description: 'Professional lanyards with custom printing for events and organizations',
    category: getCategoryBySlug('promos')!,
    tags: ['lanyards', 'custom', 'events'],
    images: ['/images/products/lanyard.jpg'],
    features: ['Screen printing', 'Safety breakaway', 'Multiple attachments'],
    isCustomizable: true,
    createdAt: new Date('2024-02-13'),
    updatedAt: new Date('2024-02-13')
  },

  // SIGNS & DISPLAYS
  {
    id: 'banner-001',
    slug: 'vinyl-banners',
    name: 'Vinyl Banners',
    description: 'Weather-resistant vinyl banners for indoor and outdoor use',
    category: getCategoryBySlug('signs-displays')!,
    tags: ['banners', 'vinyl', 'outdoor'],
    images: ['/images/products/banner.jpg'],
    features: ['Weather-resistant', 'Full-color printing', 'Grommets included'],
    isCustomizable: true,
    createdAt: new Date('2024-02-14'),
    updatedAt: new Date('2024-02-14')
  },
  {
    id: 'sign-001',
    slug: 'aluminum-signs',
    name: 'Aluminum Signs',
    description: 'Durable aluminum signs for professional facility and event signage',
    category: getCategoryBySlug('signs-displays')!,
    tags: ['signs', 'aluminum', 'facility'],
    images: ['/images/products/sign.jpg'],
    features: ['Rust-resistant', 'UV-resistant inks', 'Multiple mounting options'],
    isCustomizable: true,
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15')
  },
  {
    id: 'display-001',
    slug: 'retractable-displays',
    name: 'Retractable Displays',
    description: 'Portable retractable displays perfect for trade shows and presentations',
    category: getCategoryBySlug('signs-displays')!,
    tags: ['displays', 'retractable', 'trade-show'],
    images: ['/images/products/display.jpg'],
    features: ['Easy setup', 'Carrying case included', 'High-resolution graphics'],
    isCustomizable: true,
    createdAt: new Date('2024-02-16'),
    updatedAt: new Date('2024-02-16')
  }
];
