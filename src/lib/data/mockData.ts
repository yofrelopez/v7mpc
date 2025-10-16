// Mock Data para V7MPC
// Paso a paso - empezando básico

import { Product } from '@/types/products';
import { getCategoryBySlug } from './categories';

export const mockProducts: Product[] = [
  // Promotional Products
  {
    id: 'pen-001',
    slug: 'custom-pens',
    name: 'Custom Pens',
    description: 'Professional pens with custom logos',
    category: getCategoryBySlug('promotional-products')!,
    tags: ['pens'],
    images: ['/images/products/pen.jpg'],
    features: ['Logo engraving'],
    isCustomizable: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'keychains-001',
    slug: 'metal-keychains',
    name: 'Metal Keychains',
    description: 'Durable metal keychains with custom engraving options',
    category: getCategoryBySlug('promotional-products')!,
    tags: ['keychains', 'metal'],
    images: ['/images/products/keychain.jpg'],
    features: ['Laser engraving', 'Multiple finishes', 'Bulk pricing'],
    isCustomizable: true,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  },

  // Apparel & Accessories
  {
    id: 'shirt-001',
    slug: 'polo-shirts',
    name: 'Corporate Polo Shirts',
    description: 'High-quality polo shirts for corporate uniforms',
    category: getCategoryBySlug('apparel-accessories')!,
    tags: ['apparel', 'shirts'],
    images: ['/images/products/polo.jpg'],
    features: ['Embroidery ready', 'Multiple colors'],
    isCustomizable: true,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: 'caps-001',
    slug: 'baseball-caps',
    name: 'Baseball Caps',
    description: 'Adjustable baseball caps with embroidery and printing options',
    category: getCategoryBySlug('apparel-accessories')!,
    tags: ['hats', 'caps'],
    images: ['/images/products/cap.jpg'],
    features: ['Adjustable strap', '3D embroidery', 'Various colors'],
    isCustomizable: true,
    createdAt: new Date('2024-02-02'),
    updatedAt: new Date('2024-02-02')
  },

  // Bags & Cases
  {
    id: 'bag-001',
    slug: 'tote-bags',
    name: 'Canvas Tote Bags',
    description: 'Durable canvas bags perfect for promotional events',
    category: getCategoryBySlug('bags-cases')!,
    tags: ['bags', 'canvas'],
    images: ['/images/products/tote.jpg'],
    features: ['Screen printing available', 'Eco-friendly'],
    isCustomizable: true,
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25')
  },
  {
    id: 'backpack-001',
    slug: 'laptop-backpacks',
    name: 'Laptop Backpacks',
    description: 'Professional backpacks with padded laptop compartment',
    category: getCategoryBySlug('bags-cases')!,
    tags: ['backpacks', 'laptop'],
    images: ['/images/products/backpack.jpg'],
    features: ['Padded compartment', 'Multiple pockets', 'USB port'],
    isCustomizable: true,
    createdAt: new Date('2024-02-03'),
    updatedAt: new Date('2024-02-03')
  },

  // Drinkware & Kitchen
  {
    id: 'mug-001',
    slug: 'ceramic-mugs',
    name: 'Ceramic Coffee Mugs',
    description: 'Premium ceramic mugs for office and promotional use',
    category: getCategoryBySlug('drinkware-kitchen')!,
    tags: ['mugs', 'ceramic'],
    images: ['/images/products/mug.jpg'],
    features: ['Dishwasher safe', 'Logo printing'],
    isCustomizable: true,
    createdAt: new Date('2024-01-30'),
    updatedAt: new Date('2024-01-30')
  },
  {
    id: 'bottle-001',
    slug: 'water-bottles',
    name: 'Stainless Steel Water Bottles',
    description: 'Insulated water bottles that keep drinks cold for 24 hours',
    category: getCategoryBySlug('drinkware-kitchen')!,
    tags: ['bottles', 'stainless-steel'],
    images: ['/images/products/bottle.jpg'],
    features: ['Double-wall insulation', 'BPA-free', 'Leak-proof'],
    isCustomizable: true,
    createdAt: new Date('2024-02-04'),
    updatedAt: new Date('2024-02-04')
  },

  // Office Supplies
  {
    id: 'notebook-001',
    slug: 'hardcover-notebooks',
    name: 'Hardcover Notebooks',
    description: 'Professional notebooks with custom cover printing',
    category: getCategoryBySlug('office-supplies')!,
    tags: ['notebooks', 'hardcover'],
    images: ['/images/products/notebook.jpg'],
    features: ['Elastic band', 'Ribbon bookmark', 'Lined pages'],
    isCustomizable: true,
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-05')
  },

  // Tech & Electronics
  {
    id: 'powerbank-001',
    slug: 'wireless-powerbanks',
    name: 'Wireless Power Banks',
    description: 'Portable chargers with wireless charging capability',
    category: getCategoryBySlug('tech-electronics')!,
    tags: ['powerbank', 'wireless'],
    images: ['/images/products/powerbank.jpg'],
    features: ['Wireless charging', '10000mAh capacity', 'LED indicator'],
    isCustomizable: true,
    createdAt: new Date('2024-02-06'),
    updatedAt: new Date('2024-02-06')
  },

  // Awards & Recognition
  {
    id: 'trophy-001',
    slug: 'acrylic-awards',
    name: 'Acrylic Awards',
    description: 'Modern acrylic awards for employee recognition and achievements',
    category: getCategoryBySlug('awards-recognition')!,
    tags: ['awards', 'acrylic'],
    images: ['/images/products/award.jpg'],
    features: ['Laser engraving', 'Multiple sizes', 'Gift box included'],
    isCustomizable: true,
    createdAt: new Date('2024-02-07'),
    updatedAt: new Date('2024-02-07')
  },

  // Outdoor & Sports
  {
    id: 'umbrella-001',
    slug: 'golf-umbrellas',
    name: 'Golf Umbrellas',
    description: 'Large golf umbrellas with wind-resistant design',
    category: getCategoryBySlug('outdoor-sports')!,
    tags: ['umbrellas', 'golf'],
    images: ['/images/products/umbrella.jpg'],
    features: ['Wind-resistant', '60-inch canopy', 'Auto-open'],
    isCustomizable: true,
    createdAt: new Date('2024-02-08'),
    updatedAt: new Date('2024-02-08')
  }
];
