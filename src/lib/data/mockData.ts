// Mock Data para V7MPC
// Paso a paso - empezando básico

import { Product } from '@/types/products';
import { getCategoryBySlug } from './categories';

export const mockProducts: Product[] = [

  {

    id: 'medal-001',
    slug: 'custom-medals',
    name: 'Custom Medals',
    shortDescription: 'Professional medals with custom designs for achievements and ceremonies',
    description: [
      { 
        type: 'text', 
        content: 'Professional medals with custom designs for achievements and ceremonies. Our medals are crafted with precision and attention to detail, perfect for recognizing outstanding achievements in any field.' 
      },
      { 
        type: 'image', 
        src: '/images/products/medal-front.jpg', 
        alt: 'Custom medal front view showing detailed design', 
        caption: 'Front view showcasing intricate design details' 
      },
      { 
        type: 'text', 
        content: 'Available in multiple finishes including gold, silver, and bronze. Each medal can be customized with your organization\'s logo, text, and specific design elements to create a truly unique recognition piece.' 
      },
      { 
        type: 'image', 
        src: '/images/products/medal-back.jpg', 
        alt: 'Custom medal back view with engraving area', 
        caption: 'Back view showing customizable engraving area' 
      }
    ],
    category: getCategoryBySlug('jewelry-recognition')!,
    tags: ['medals', 'custom', 'achievement'],
    images: ['/images/products/medal.jpg'],
    features: ['Custom design', 'Ribbon included', 'Multiple finishes'],
    isCustomizable: true,
    technicalSpecifications: 'Material: High-quality zinc alloy • Size: 2.5 inches diameter • Thickness: 3mm • Ribbon: 32 inches standard length • Finishes: Gold, Silver, Bronze, Antique • Engraving: Laser precision engraving available',
    packingDelivery: [
      { 
        type: 'text', 
        content: 'Each medal is carefully packed in protective foam to ensure safe delivery. Our standard packaging includes individual protective sleeves and secure shipping boxes.' 
      },
      { 
        type: 'image', 
        src: '/images/products/medal-packaging.jpg', 
        alt: 'Medal packaging showing protective foam and presentation box', 
        caption: 'Professional packaging ensures safe delivery' 
      },
      { 
        type: 'text', 
        content: 'Delivery typically takes 10-15 business days after artwork approval. Rush orders available upon request with 5-7 business day turnaround.' 
      }
    ],
    faq: 'Q: Can I provide my own design? A: Yes, we accept custom artwork in AI, EPS, or high-resolution PNG format. Q: What is the minimum order quantity? A: Our minimum order is 50 medals. Q: Do you provide digital proofs? A: Yes, we provide digital proofs for approval before production begins.',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10')
  },

];
