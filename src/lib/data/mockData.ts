import { ProductCategory, Product, Brand, Certification } from '@/types/types';

export const categories: ProductCategory[] = [
  {
    id: '1',
    name: 'Office Supplies',
    slug: 'office-supplies',
    description: 'Pens, notebooks, file organizers, and tech accessories to keep your workspace efficient and organized.',
    image: '/images/categories/office-supplies.jpg',
    productCount: 150
  },
  {
    id: '2',
    name: 'Jewelry Supplies',
    slug: 'jewelry-supplies',
    description: 'High-grade metals, stunning gemstones, clasps, chains, and finished jewelry pieces.',
    image: '/images/categories/jewelry-supplies.jpg',
    productCount: 89
  },
  {
    id: '3',
    name: 'School Supplies',
    slug: 'school-supplies',
    description: 'Notebooks, pens, art supplies, and backpacks for students and educational organizations.',
    image: '/images/categories/school-supplies.jpg',
    productCount: 200
  },
  {
    id: '4',
    name: 'Janitorial Supplies',
    slug: 'janitorial-supplies',
    description: 'Disinfectants, sanitizers, mops, brooms, and cleaning products for commercial use.',
    image: '/images/categories/janitorial-supplies.jpg',
    productCount: 75
  },
  {
    id: '5',
    name: 'Promotional Products',
    slug: 'promotional-products',
    description: 'Custom apparel, bags, drinkware, and tech accessories for memorable brand experiences.',
    image: '/images/categories/promotional-products.jpg',
    productCount: 300
  }
];

export const brands: Brand[] = [
  { id: '1', name: 'Nike', logo: '/images/brands/nike.png' },
  { id: '2', name: 'Champion', logo: '/images/brands/champion.png' },
  { id: '3', name: 'The North Face', logo: '/images/brands/tnf.png' },
  { id: '4', name: 'Carhartt', logo: '/images/brands/carhartt.png' },
  { id: '5', name: 'Gildan', logo: '/images/brands/gildan.png' },
  { id: '6', name: 'BELLA+CANVAS', logo: '/images/brands/bella-canvas.png' },
  { id: '7', name: 'Brooks Brothers', logo: '/images/brands/brooks-brothers.png' },
  { id: '8', name: 'Tommy Bahama', logo: '/images/brands/tommy-bahama.png' }
];

export const ownBrands: Brand[] = [
  {
    id: 'own-1',
    name: 'Lu Love Simply Lovely',
    logo: '/images/brands/lu-love.jpg',
    description: 'Our premium jewelry and accessories line'
  },
  {
    id: 'own-2',
    name: 'Zaché',
    logo: '/images/brands/zache.jpg',
    description: 'Elegant and modern promotional products'
  }
];

export const certifications: Certification[] = [
  {
    id: '1',
    name: 'Minority Business Enterprise',
    acronym: 'MBE',
    logo: '/images/certifications/mbe.png',
    description: 'Certified minority-owned business enterprise'
  },
  {
    id: '2',
    name: 'Women\'s Business Enterprise',
    acronym: 'WBENC',
    logo: '/images/certifications/wbenc.png',
    description: 'Certified women-owned business enterprise'
  }
];

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Ballpoint Pens Set',
    description: 'Professional ballpoint pens perfect for office use and corporate gifts. Available in multiple colors and customizable with your company logo.',
    category: categories[0],
    images: ['/images/products/pens-1.jpg', '/images/products/pens-2.jpg'],
    specifications: {
      'Material': 'Metal and plastic',
      'Ink Color': 'Blue, black, red',
      'Length': '14cm',
      'Weight': '12g'
    },
    features: [
      'Smooth writing experience',
      'Logo customization available',
      'Bulk pricing available',
      'Multiple color options'
    ],
    minQuantity: 50,
    bulkPricing: true,
    customizable: true,
    slug: 'premium-ballpoint-pens-set',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Custom Embroidered Polo Shirts',
    description: 'High-quality polo shirts perfect for corporate uniforms and promotional events. Made from 100% cotton with professional embroidery options.',
    category: categories[4],
    images: ['/images/products/polo-1.jpg', '/images/products/polo-2.jpg'],
    specifications: {
      'Material': '100% Cotton',
      'Sizes': 'XS to 5XL',
      'Colors': 'Navy, White, Gray, Black',
      'Care': 'Machine washable'
    },
    features: [
      'Professional embroidery',
      'Bulk pricing available',
      'Corporate branding options',
      'Variety of colors and sizes'
    ],
    brands: ['Gildan', 'BELLA+CANVAS'],
    minQuantity: 25,
    bulkPricing: true,
    customizable: true,
    slug: 'custom-embroidered-polo-shirts',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '3',
    name: 'Sterling Silver Chain Collection',
    description: 'Premium sterling silver chains for jewelry making. Various styles and lengths available for wholesale and custom jewelry projects.',
    category: categories[1],
    images: ['/images/products/chains-1.jpg', '/images/products/chains-2.jpg'],
    specifications: {
      'Material': '925 Sterling Silver',
      'Length': '16", 18", 20", 24"',
      'Weight': 'Various weights available',
      'Finish': 'Polished, Matte, Oxidized'
    },
    features: [
      'Authentic 925 sterling silver',
      'Multiple length options',
      'Wholesale pricing',
      'Quality guaranteed'
    ],
    minQuantity: 10,
    bulkPricing: true,
    customizable: false,
    slug: 'sterling-silver-chain-collection',
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25')
  }
];

// Servicios principales
export const services = [
  {
    title: 'Product Sourcing',
    description: 'Global sourcing solutions for quality products at competitive prices',
    icon: '🌍'
  },
  {
    title: 'Quality Assurance',
    description: 'Rigorous quality control processes to ensure product excellence',
    icon: '✓'
  },
  {
    title: 'Custom Branding',
    description: 'Professional branding and customization services for your products',
    icon: '🎨'
  },
  {
    title: 'Logistics & Shipping',
    description: 'Complete door-to-door delivery and logistics management',
    icon: '📦'
  }
];