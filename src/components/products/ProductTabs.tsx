'use client';

import { useState } from 'react';
import { Product } from '@/types/products';
import ProductSpecifications from './ProductSpecifications';
import ProductCustomization from './ProductCustomization';

interface ProductTabsProps {
  product: Product;
}

type TabType = 'specifications' | 'customization';

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('specifications');

  const tabs = [
    {
      id: 'specifications' as TabType,
      label: 'Specifications',
      count: '8+'
    },
    {
      id: 'customization' as TabType,
      label: 'Customization',
      count: product.isCustomizable ? '4' : '1'
    }
  ];

  return (
    <div className="bg-white">
      {/* Tab Headers */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors relative ${
                activeTab === tab.id
                  ? 'border-slate-600 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`ml-2 py-0.5 px-2 text-xs rounded-full ${
                activeTab === tab.id
                  ? 'bg-slate-100 text-slate-600'
                  : 'bg-slate-50 text-slate-400'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="py-6">
        {activeTab === 'specifications' && (
          <div>
            <ProductSpecifications product={product} />
          </div>
        )}
        
        {activeTab === 'customization' && (
          <div>
            <ProductCustomization product={product} />
          </div>
        )}
      </div>
    </div>
  );
}