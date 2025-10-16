'use client';

import { useState } from 'react';
import { Package, Palette, Ruler, Clock, FileText, Settings } from 'lucide-react';
import { Product } from '@/types/products';

interface ProductSpecsTabsProps {
  product: Product;
}

export default function ProductSpecsTabs({ product }: ProductSpecsTabsProps) {
  const [activeTab, setActiveTab] = useState('materials');

  // Generate realistic specifications based on product category
  const getProductMaterials = (categorySlug: string): string => {
    const materialMap: Record<string, string> = {
      'promotional-products': 'High-quality plastic, metal components',
      'apparel-accessories': '100% cotton, polyester blend options available',
      'bags-cases': 'Durable canvas, reinforced stitching, metal hardware',
      'drinkware-kitchen': 'Food-grade stainless steel, BPA-free materials',
      'office-supplies': 'Premium paper, hardcover binding, elastic closure',
      'tech-electronics': 'ABS plastic, lithium polymer battery, USB-C',
      'awards-recognition': 'Crystal clear acrylic, precision laser engraving',
      'outdoor-sports': 'Weather-resistant nylon, fiberglass frame'
    };
    
    return materialMap[categorySlug] || 'Premium quality materials, contact for specific details';
  };

  const getProductDimensions = (categorySlug: string): string => {
    const dimensionMap: Record<string, string> = {
      'promotional-products': 'Various sizes available, custom dimensions possible',
      'apparel-accessories': 'Sizes XS-5XL available, size chart upon request',
      'bags-cases': '15" x 12" x 6" (standard), custom sizes available',
      'drinkware-kitchen': '11 oz capacity, 3.5" diameter x 4.25" height',
      'office-supplies': '5.5" x 8.5" (A5), 192 pages',
      'tech-electronics': '4.5" x 2.8" x 0.5", compact portable design',
      'awards-recognition': '6" x 8" x 1", custom sizes available',
      'outdoor-sports': '62" arc, compact 15" when closed'
    };
    
    return dimensionMap[categorySlug] || 'Standard industry dimensions, custom sizes available';
  };

  const tabs = [
    {
      id: 'materials',
      label: 'Materials',
      icon: <Package className="h-4 w-4" />,
      content: getProductMaterials(product.category.slug)
    },
    {
      id: 'dimensions',
      label: 'Dimensions',
      icon: <Ruler className="h-4 w-4" />,
      content: getProductDimensions(product.category.slug)
    },
    {
      id: 'colors',
      label: 'Colors',
      icon: <Palette className="h-4 w-4" />,
      content: 'Custom colors available, Standard colors: Black, Navy, White, Gray'
    },
    {
      id: 'production',
      label: 'Production',
      icon: <Clock className="h-4 w-4" />,
      content: '10-15 business days after artwork approval'
    },
    {
      id: 'certifications',
      label: 'Certifications',
      icon: <FileText className="h-4 w-4" />,
      content: 'ISO 9001 certified, CPSIA compliant, RoHS compliant, FDA approved materials'
    },
    {
      id: 'customization',
      label: 'Customization',
      icon: <Settings className="h-4 w-4" />,
      content: 'Logo imprinting, Screen printing, Embroidery, Laser engraving available'
    }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-lg">
      {/* Tab Headers */}
      <div className="border-b border-slate-200">
        <div className="flex flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-slate-600 text-slate-900'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={activeTab === tab.id ? 'block' : 'hidden'}
          >
            <div className="flex items-start gap-3">
              <div className="shrink-0 mt-1">
                {tab.icon}
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  {tab.label}
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {tab.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}