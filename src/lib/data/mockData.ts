// Mock Data para V7MPC
// Paso a paso - empezando básico

import { Product } from '@/types/products';
import { getCategoryBySlug } from './categories';

export const mockProducts: Product[] = [

  {
    id: 'banner-002',
    slug: 'roll-up-banner-stand',
    name: 'Roll Up Banner Stand',
    shortDescription: 'Professional pull-up banners 85x200cm with aluminum frame for promotions and events',
    description: [
      { 
        type: 'text', 
        content: 'Professional roll-up banner stands perfect for events, advertising, promotions, and trade shows. Our banner stands are designed to showcase your brand, logo, and company information effectively while providing maximum portability and ease of setup.' 
      },
      { 
        type: 'image', 
        src: 'https://images.51microshop.com/4258/product/20250729/20250729135454808030.jpg', 
        alt: 'Roll up banner stand showing aluminum frame and professional setup', 
        caption: 'Professional aluminum frame roll-up banner for events and promotions' 
      },
      { 
        type: 'text', 
        content: 'Available in two premium styles: Normal Economical Stand for short-term events and High-Quality Top Quality Stand for repeated use at multiple locations. Each stand features a solid aluminum construction with flat sturdy base for maximum stability.' 
      },
      { 
        type: 'image', 
        src: 'https://images.51microshop.com/4258/product/20250729/20250729135906699424.jpg', 
        alt: 'Economical roll up banner stand style', 
        caption: 'Style 1 - Normal Economical Stand perfect for short-term events' 
      },
      { 
        type: 'text', 
        content: 'Choose between single-sided or double-sided printing options. Single-sided banners feature one printed side with blank white backing, while double-sided banners allow different designs on each side for maximum impact and visibility.' 
      },
      { 
        type: 'image', 
        src: 'https://images.51microshop.com/4258/product/20250729/20250729135907746277.jpg', 
        alt: 'High quality roll up banner stand', 
        caption: 'Style 2 - High-Quality Top Quality Stand for repeated professional use' 
      }
    ],
    category: getCategoryBySlug('signs-displays')!,
    tags: ['banner', 'roll-up', 'display', 'aluminum', 'promotion'],
    images: [
      'https://images.51microshop.com/4258/product/20250729/20250729135454808030.jpg',
      'https://images.51microshop.com/4258/product/20250729/20250729135455196722.png',
      'https://images.51microshop.com/4258/product/20250729/20250729135456244557.png'
    ],
    features: [
      'Single or double-sided printing',
      'Aluminum frame construction', 
      'Oxford carry bag included',
      'Custom logo and colors',
      'Swing-out or fixed feet options'
    ],
    isCustomizable: true,
    technicalSpecifications: 'Frame Material: High-quality aluminum or plastic • Print Materials: PVC, PP, Photo Paper, Non-woven Fabric, Knit Polyester • Standard Size: 85x200cm (custom sizes available) • Weight: 2.1-4.5kg depending on style • Base: Flat sturdy aluminum base with swing-out or fixed feet • Printing: Single or double-sided, full color custom printing • Carry Bag: Oxford protective bag included',
    packingDelivery: [
      { 
        type: 'text', 
        content: 'Each roll-up banner stand is professionally packaged with protective materials and includes an Oxford carry bag for easy transport. Standard packaging accommodates 3-10 pieces per carton depending on size and style.' 
      },
      { 
        type: 'image', 
        src: 'https://images.51microshop.com/4258/product/20250729/20250729140014949046.jpg', 
        alt: 'Roll up banner packaging and shipping', 
        caption: 'Professional packaging ensures safe delivery with carry bag included' 
      },
      { 
        type: 'text', 
        content: 'Small quantity orders can be completed in one day. Larger orders typically require 7-15 business days depending on quantity. Rush service available for urgent events at no additional charge.' 
      }
    ],
    faq: 'Q: What sizes are available? A: Standard 85x200cm, also 80x200cm, 90x200cm, 95x200cm, 100x200cm, 120x200cm, and custom sizes available. Q: What is the minimum order quantity? A: 50 pieces minimum order. Q: Can you help with design? A: Yes, we provide free design services and accept artwork in PDF, PSD, AI, CDR, JPG, TIFF formats. Q: What printing options are available? A: Single-sided or double-sided printing with custom logos and colors. Q: How much do they weigh? A: Weight ranges from 2.1kg to 4.5kg depending on style and size.',
    createdAt: new Date('2024-11-06'),
    updatedAt: new Date('2024-11-06')
  },

  {
    id: 'jersey-003',
    slug: 'custom-soccer-jersey',
    name: '2022 New Model Cheap Sublimated Uniform Football Unbranded Soccer Jersey',
    shortDescription: 'Professional custom soccer jerseys with sublimation printing for teams and training',
    description: [
      { 
        type: 'text', 
        content: 'Customized unbranded soccer jersey set uniforms perfect for football teams, training sessions, and group activities. Our jerseys feature high-quality quick-dry polyester material with professional sublimation printing for vibrant, long-lasting designs that won\'t fade or crack.' 
      },
      { 
        type: 'image', 
        src: 'https://images.51microshop.com/4258/product/20250729/20250729143739101013.jpg', 
        alt: 'Custom soccer jersey with sublimation printing', 
        caption: 'Professional custom soccer jersey with vibrant sublimation printing' 
      },
      { 
        type: 'text', 
        content: 'Available in a complete range of sizes from XS to 5XL to accommodate all team members. Choose from screen printing or sublimation printing methods, with sublimation offering superior durability and color vibrancy for complex designs and gradients.' 
      },
      { 
        type: 'image', 
        src: 'https://images.51microshop.com/4258/product/20250729/20250729143739934040.jpg', 
        alt: 'Soccer jersey style variations and designs', 
        caption: 'Multiple style variations and custom design options available' 
      },
      { 
        type: 'text', 
        content: 'Perfect for training sessions, football games, group activities, and team building events. Our jerseys can be customized with team names, player numbers, logos, and sponsor information to create a professional look that represents your organization.' 
      },
      { 
        type: 'image', 
        src: 'https://images.51microshop.com/4258/product/20250729/20250729143741030695.jpg', 
        alt: 'Jersey design details and customization options', 
        caption: 'Detailed view showing customization capabilities and print quality' 
      }
    ],
    category: getCategoryBySlug('apparel')!,
    tags: ['jersey', 'soccer', 'football', 'uniform', 'sublimation', 'team'],
    images: [
      'https://images.51microshop.com/4258/product/20250729/20250729143815821710.jpg',
      'https://images.51microshop.com/4258/product/20250729/20250729143816577593.jpg',
      'https://images.51microshop.com/4258/product/20250729/20250729143817431093.jpg',
      'https://images.51microshop.com/4258/product/20250729/20250729143818243596.jpg',
      'https://images.51microshop.com/4258/product/20250729/20250729143818960384.jpg',
      'https://images.51microshop.com/4258/product/20250729/20250729143819786552.jpg'
    ],
    features: [
      'Quick dry polyester material',
      'Sublimation and screen printing options',
      'Sizes XS to 5XL available',
      'Custom team names and numbers',
      'Professional training quality',
      'Durable and long-lasting'
    ],
    isCustomizable: true,
    technicalSpecifications: 'Material: Quick Dry Polyester • Sizes: XS to 5XL (US SIZE or Europe Size available) • Printing Methods: Screen Printing, Sublimation Printing • Gender: Men\'s cut (unisex suitable) • Usage: Training, Football Games, Group Activities • Customization: Team names, numbers, logos, sponsor information • Care: Machine washable, quick dry technology',
    packingDelivery: [
      { 
        type: 'text', 
        content: 'Professional packaging ensures your custom jerseys arrive in perfect condition. Each jersey is individually folded and packed to prevent wrinkles and damage during shipping.' 
      },
      { 
        type: 'image', 
        src: 'https://images.51microshop.com/4258/product/20250729/20250729143809322684.png', 
        alt: 'Soccer jersey packaging and shipping methods', 
        caption: 'Professional packaging and multiple shipping options available' 
      },
      { 
        type: 'text', 
        content: 'We offer various shipping methods to meet your timeline needs. Standard production time is 7-14 business days after design approval, with rush orders available for urgent team events.' 
      }
    ],
    faq: 'Q: What sizes are available? A: We offer XS to 5XL in both US and European sizing. Custom size sheets are also accepted. Q: What printing methods do you use? A: Both screen printing and sublimation printing are available. Sublimation is recommended for complex designs and gradients. Q: Can I customize with team logos and numbers? A: Yes, we can add team names, player numbers, logos, and sponsor information. Q: What is the minimum order quantity? A: Please contact us for minimum order requirements as they vary based on customization level. Q: How long does production take? A: Standard production is 7-14 business days after design approval, with rush options available.',
    createdAt: new Date('2024-11-06'),
    updatedAt: new Date('2024-11-06')
  },

  {
    id: 'mug-004',
    slug: 'ceramic-garden-mug-flower-pot',
    name: 'Ceramic Garden Mug - Novelty Flower Pot Coffee Mug with Shovel Spoon',
    shortDescription: 'Unique ceramic coffee mug designed as a flower pot with matching shovel spoon - perfect gift for gardeners and nature lovers',
    description: [
      { 
        type: 'text', 
        content: 'Delightful ceramic garden mug that combines functionality with whimsy. This novelty flower pot design coffee mug is perfect for gardeners, nature lovers, and anyone who appreciates unique drinkware. The mug features a charming flower pot aesthetic that brings a touch of garden magic to your daily coffee ritual.' 
      },
      { 
        type: 'image', 
        src: 'https://images.51microshop.com/4258/product/20250725/20250725124309200630.jpg', 
        alt: 'Ceramic garden mug with flower pot design and shovel spoon', 
        caption: 'Unique flower pot design mug with matching decorative shovel spoon' 
      },
      { 
        type: 'text', 
        content: 'Each mug comes with a matching mini shovel spoon that adds to the gardening theme while being perfectly functional for stirring your favorite beverages. Made from high-quality ceramic material that\'s both microwave and dishwasher safe for everyday convenience.' 
      },
      { 
        type: 'image', 
        src: 'https://images.51microshop.com/4258/product/20250725/20250725124311253350.jpg', 
        alt: 'Close-up view of ceramic garden mug showing quality and design details', 
        caption: 'High-quality ceramic construction with detailed flower pot design' 
      },
      { 
        type: 'text', 
        content: 'Perfect as a thoughtful gift for gardeners, women, men, and nature enthusiasts. Whether for birthdays, holidays, or special occasions, this unique mug brings joy and personality to any kitchen or office space while celebrating the love of gardening and nature.' 
      },
      { 
        type: 'image', 
        src: 'https://images.51microshop.com/4258/product/20250725/20250725124331395930.jpg', 
        alt: 'Garden mug presented as a gift with packaging', 
        caption: 'Perfectly packaged as a thoughtful gift for nature lovers' 
      }
    ],
    category: getCategoryBySlug('promos')!,
    tags: ['mug', 'ceramic', 'garden', 'flower-pot', 'gift', 'novelty'],
    images: [
      'https://images.51microshop.com/4258/product/20250725/20250725124309200630.jpg',
      'https://images.51microshop.com/4258/product/20250725/20250725124311253350.jpg',
      'https://images.51microshop.com/4258/product/20250725/20250725124331395930.jpg',
      'https://images.51microshop.com/4258/product/20250725/20250725124352079527.jpg'
    ],
    features: [
      'High-quality ceramic construction',
      'Includes matching shovel spoon',
      'Microwave and dishwasher safe',
      'Unique flower pot design',
      'Perfect for hot and cold beverages',
      'Thoughtful gift packaging available'
    ],
    isCustomizable: true,
    technicalSpecifications: 'Material: Premium ceramic • Capacity: 12 oz (350ml) • Dimensions: 4.5" H x 3.5" W • Handle: Comfortable ergonomic grip • Spoon: Stainless steel mini shovel design • Care: Microwave and dishwasher safe • Design: Flower pot motif with earth tone colors • Weight: Approximately 1.2 lbs with spoon • Customization: Logo printing and custom colors available',
    packingDelivery: [
      { 
        type: 'text', 
        content: 'Each ceramic garden mug is carefully packed with protective bubble wrap and foam inserts to ensure safe delivery. The mug and shovel spoon are packaged together in an attractive gift box perfect for presenting to recipients.' 
      },
      { 
        type: 'image', 
        src: 'https://images.51microshop.com/4258/product/20250725/20250725124352079527.jpg', 
        alt: 'Professional packaging of garden mug with protective materials', 
        caption: 'Secure packaging ensures safe delivery with gift-ready presentation' 
      },
      { 
        type: 'text', 
        content: 'Standard delivery time is 5-7 business days for in-stock items. Custom logo printing adds 3-5 additional business days. Rush delivery available for urgent gift occasions with overnight and 2-day shipping options.' 
      }
    ],
    faq: 'Q: Is the mug microwave safe? A: Yes, the ceramic mug is both microwave and dishwasher safe for convenient everyday use. Q: What comes with the mug? A: Each mug includes a matching stainless steel mini shovel spoon and gift-ready packaging. Q: Can I customize it with a logo? A: Yes, we offer custom logo printing and color variations for corporate gifts and special occasions. Q: What is the mug capacity? A: The mug holds 12 oz (350ml), perfect for coffee, tea, or other beverages. Q: Is it suitable as a gift? A: Absolutely! The unique design and attractive packaging make it perfect for gardeners, nature lovers, and anyone who appreciates novelty drinkware.',
    createdAt: new Date('2024-11-06'),
    updatedAt: new Date('2024-11-06')
  },

  {
    id: 'jewelry-005',
    slug: 'wholesale-18k-gold-plated-letter-pendant',
    name: 'Wholesale Jewelry Basic Simple Style Letter Copper 18K Gold Plated',
    shortDescription: 'Elegant 18K gold plated letter pendant with stainless steel chain - perfect for daily wear and wholesale orders',
    description: [
      { 
        type: 'text', 
        content: 'This elegant 18K gold plated letter pendant is crafted from high-quality copper with a fine 18K gold plating finish that delivers an elegant golden luster. The simple design style is perfect for daily wear, with a unisex design suitable for both men and women, making it an ideal choice for retailers and bulk buyers.' 
      },
      { 
        type: 'image', 
        src: 'https://v7marketplace.myshopify.com/cdn/shop/files/NH38588163_c8fc5229-03df-4814-a3f8-c074b16c45ce_1024x1024.webp', 
        alt: '18K gold plated letter pendant with elegant design', 
        caption: 'Elegant 18K gold plated letter pendant with superior craftsmanship' 
      },
      { 
        type: 'text', 
        content: 'Features a durable 201 stainless steel chain for comfortable and long-lasting wear. The pendant weighs just 7 grams, making it lightweight yet substantial enough to feel premium. Each piece is carefully plated with genuine 18K gold for authentic luxury appearance.' 
      },
      { 
        type: 'image', 
        src: 'https://v7marketplace.myshopify.com/cdn/shop/files/NH38588167_2ab70ba3-f95a-485e-8b0a-52e57c4cd66f_1024x1024.webp', 
        alt: 'Close-up view showing 18K gold plating quality and letter detail', 
        caption: 'Superior 18K gold plating with detailed letter craftsmanship' 
      },
      { 
        type: 'text', 
        content: 'Perfect for wholesale buyers and retailers with attractive bulk pricing tiers. The more you order, the better price you get - making it ideal for jewelry stores, gift shops, and online retailers looking for high-quality, affordable jewelry pieces that appeal to a wide customer base.' 
      },
      { 
        type: 'image', 
        src: 'https://v7marketplace.myshopify.com/cdn/shop/files/NH38588169_54d24d69-77a8-404d-a195-f4671a1a446c_1024x1024.webp', 
        alt: 'Multiple letter options showing variety available', 
        caption: 'Wide selection of letter options for personalized jewelry' 
      }
    ],
    category: getCategoryBySlug('jewelry-recognition')!,
    tags: ['jewelry', '18k-gold', 'pendant', 'letter', 'wholesale', 'unisex'],
    images: [
      'https://v7marketplace.myshopify.com/cdn/shop/files/Wholesale-Jewelry-Basic-Simple-Style-Letter-Copper-18K-Gold-Plated-main-image-1_ea0c6bf5-f272-46aa-85c7-f4d3a52daf50_1024x1024.webp',
      'https://v7marketplace.myshopify.com/cdn/shop/files/Wholesale-Jewelry-Basic-Simple-Style-Letter-Copper-18K-Gold-Plated-main-image-2_e536e8e5-f5af-4437-b00e-c86514f5768a_1024x1024.webp',
      'https://v7marketplace.myshopify.com/cdn/shop/files/Wholesale-Jewelry-Basic-Simple-Style-Letter-Copper-18K-Gold-Plated-main-image-3_e834c407-3888-45fa-94e0-a46be6902982_1024x1024.webp',
      'https://v7marketplace.myshopify.com/cdn/shop/files/NH38588170_6731ed6b-5aec-49ef-acdd-0fb17c4223b5_1024x1024.webp'
    ],
    features: [
      '18K gold plated finish',
      '201 stainless steel chain included',
      'Lightweight 7g design',
      'Unisex style for daily wear',
      'Bulk pricing available',
      'High-quality copper base'
    ],
    isCustomizable: true,
    technicalSpecifications: 'Material: High-quality Copper base • Plating: 18K Gold Plated • Chain Material: 201 Stainless Steel • Weight: 7 grams • Style: Basic, Simple Style • Gender: Unisex • Pattern: Letter design • Occasion: Daily wear • Jewelry Type: Pendant • Quantity: 1 piece per order • Quality: Premium wholesale grade',
    packingDelivery: [
      { 
        type: 'text', 
        content: 'Each pendant is carefully packaged to prevent damage during shipping. Professional packaging ensures the 18K gold plating remains pristine and the stainless steel chain stays tangle-free during transit.' 
      },
      { 
        type: 'image', 
        src: 'https://v7marketplace.myshopify.com/cdn/shop/files/NH38588173_c7b27b10-4d51-4031-badd-610bc8b96d3d_1024x1024.webp', 
        alt: 'Professional jewelry packaging for wholesale orders', 
        caption: 'Secure packaging for wholesale and retail orders' 
      },
      { 
        type: 'text', 
        content: 'Fast processing for wholesale orders with bulk pricing tiers: 1-11 pieces at $0.53 each, 12-59 pieces at $0.52 each, 60-119 pieces at $0.50 each, and 120+ pieces at $0.45 each. Perfect pricing structure for retailers and bulk buyers.' 
      }
    ],
    faq: 'Q: What letters are available? A: We offer the complete alphabet - all 26 letters are available for this pendant design. Q: Is this real 18K gold? A: This is 18K gold plated over a copper base, providing the beautiful appearance of gold at an affordable wholesale price. Q: What chain length is included? A: Each pendant comes with a 201 stainless steel chain in standard length. Q: What are the bulk pricing tiers? A: 1-11 pcs: $0.53, 12-59 pcs: $0.52, 60-119 pcs: $0.50, 120+ pcs: $0.45 each. Q: Is it suitable for sensitive skin? A: The 201 stainless steel chain is hypoallergenic, and the 18K gold plating provides an additional protective barrier.',
    createdAt: new Date('2024-11-06'),
    updatedAt: new Date('2024-11-06')
  },

];
