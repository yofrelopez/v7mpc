'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, Package, Sparkles, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { mockProducts } from '@/lib/data/mockData';
import { productCategories } from '@/lib/data/categories';
import { Product, ProductCategory } from '@/types/products';
import Image from 'next/image';

interface ProductSelectorProps {
  onProductSelect: (product: Product | null) => void;
  selectedProductId?: string;
  onCustomProductToggle: () => void;
  disabled?: boolean;
}

export default function ProductSelector({ 
  onProductSelect, 
  selectedProductId,
  onCustomProductToggle,
  disabled = false
}: ProductSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Products state with API integration
  const [allProducts, setAllProducts] = useState<Product[]>(mockProducts);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [productsLoaded, setProductsLoaded] = useState(false);

  // Fetch all products (mock + SanMar) when component mounts or user starts searching
  useEffect(() => {
    const loadAllProducts = async () => {
      // Only fetch once
      if (productsLoaded) return;
      
      setIsLoadingProducts(true);
      try {
        const response = await fetch('/api/products/all');
        const data = await response.json();
        
        if (data.success && data.products) {
          setAllProducts(data.products);
          setProductsLoaded(true);
        } else {
          // Fallback to mock products
          console.warn('API returned no products, using mock data');
          setAllProducts(mockProducts);
        }
      } catch (error) {
        console.error('Error loading products:', error);
        // Fallback to mock products on error
        setAllProducts(mockProducts);
      } finally {
        setIsLoadingProducts(false);
      }
    };

    // Trigger load when user starts interacting (lazy loading) OR when there's a pre-selected product
    if (searchQuery || selectedCategory !== 'all' || showDropdown || selectedProductId) {
      loadAllProducts();
    }
  }, [searchQuery, selectedCategory, showDropdown, productsLoaded, selectedProductId]);

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    let products = allProducts;

    // Filter by category
    if (selectedCategory !== 'all') {
      products = products.filter(p => p.category.slug === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.shortDescription?.toLowerCase().includes(query) ||
        p.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return products;
  }, [searchQuery, selectedCategory, allProducts]);

  const selectedProduct = useMemo(() => {
    return allProducts.find(p => p.id === selectedProductId);
  }, [selectedProductId, allProducts]);

  const handleProductClick = (product: Product) => {
    onProductSelect(product);
    setShowDropdown(false);
    setSearchQuery('');
  };

  return (
    <div className="space-y-4">
      {/* Selected Product Display */}
      {selectedProduct && (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
          <div className="flex items-start gap-4">
            {selectedProduct.images[0] && (
              <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
                <Image
                  src={selectedProduct.images[0]}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-slate-800">{selectedProduct.name}</h4>
                  <p className="text-sm text-slate-600 mt-1">
                    {selectedProduct.shortDescription}
                  </p>
                  <span className="inline-block mt-2 text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded">
                    {selectedProduct.category.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onProductSelect(null)}
                  disabled={disabled}
                  className="text-sm text-slate-500 hover:text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Change
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Interface */}
      {!selectedProduct && (
        <div className="space-y-3">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Product Category
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                disabled={disabled}
                className={`px-3 py-2 text-sm rounded-lg border transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  selectedCategory === 'all'
                    ? 'bg-slate-600 text-white border-slate-600'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                }`}
              >
                All Products
              </button>
              {productCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.slug)}
                  disabled={disabled}
                  className={`px-3 py-2 text-sm rounded-lg border transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    selectedCategory === category.slug
                      ? 'bg-slate-600 text-white border-slate-600'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Search Input */}
          <div className="relative">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Search Products
            </label>
            <div className="relative">
              {isLoadingProducts ? (
                <Loader2 className="absolute left-3 top-3 w-4 h-4 text-slate-400 animate-spin" />
              ) : (
                <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              )}
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                placeholder="Search by name, description, or tags..."
                className="pl-10"
                disabled={isLoadingProducts || disabled}
              />
            </div>

            {/* Dropdown Results */}
            {showDropdown && (searchQuery || selectedCategory !== 'all') && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-slate-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
                {isLoadingProducts ? (
                  <div className="p-6 text-center text-slate-500">
                    <Loader2 className="w-8 h-8 mx-auto mb-2 animate-spin text-slate-400" />
                    <p className="text-sm">Loading all products...</p>
                    <p className="text-xs mt-1">Including SanMar catalog</p>
                  </div>
                ) : filteredProducts.length > 0 ? (
                  <div className="p-2">
                    {filteredProducts.map((product) => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => handleProductClick(product)}
                        disabled={disabled}
                        className="w-full flex items-start gap-3 p-3 hover:bg-slate-50 rounded-lg text-left transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {product.images[0] && (
                          <div className="relative w-12 h-12 flex-shrink-0 rounded overflow-hidden">
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-800 text-sm">
                            {product.name}
                          </p>
                          <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                            {product.shortDescription}
                          </p>
                          <span className="inline-block mt-1 text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                            {product.category.name}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-slate-500">
                    <Package className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No products found</p>
                    <p className="text-xs mt-1">Try a different search term</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Custom Product Option */}
          <div className="pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={onCustomProductToggle}
              disabled={disabled}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-slate-700 bg-white border-2 border-dashed border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-4 h-4" />
              Request a Custom Product
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
