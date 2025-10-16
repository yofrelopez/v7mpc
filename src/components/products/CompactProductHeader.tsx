'use client';

import { useState } from 'react';
import { Search, Menu, X, ChevronDown } from 'lucide-react';
import productCategories from '@/lib/data/categories';
import { ProductCategory, Product } from '@/types/products';

export type SortOption = 'name-asc' | 'name-desc' | 'category' | 'newest';

interface CompactProductHeaderProps {
  searchTerm: string;
  onSearchChange: (search: string) => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  allProducts: Product[];
  productCount: number;
  totalProducts: number;
}

export default function CompactProductHeader({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  allProducts,
  productCount,
  totalProducts
}: CompactProductHeaderProps) {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const categories = productCategories;

  // Sort options
  const sortOptions = [
    { value: 'name-asc' as SortOption, label: 'Name A-Z' },
    { value: 'name-desc' as SortOption, label: 'Name Z-A' },
    { value: 'category' as SortOption, label: 'By Category' },
    { value: 'newest' as SortOption, label: 'Newest' }
  ];

  // Calculate product count per category
  const getCategoryProductCount = (categorySlug: string) => {
    return allProducts.filter(product => product.category.slug === categorySlug).length;
  };

  const handleClearFilters = () => {
    onSearchChange('');
    onCategoryChange(null);
    setIsCategoriesOpen(false);
  };

  const hasActiveFilters = searchTerm || selectedCategory;
  const selectedCategoryName = selectedCategory 
    ? categories.find(c => c.slug === selectedCategory)?.name 
    : null;
  const selectedSortOption = sortOptions.find(option => option.value === sortBy);

  return (
    <div className="mb-6">
      {/* Main Header Line */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-4">
        {/* Products Title */}
        <h1 className="text-2xl font-bold text-slate-800 shrink-0 mb-2 sm:mb-0">
          Products
        </h1>
        
        <div className="flex items-center gap-3 flex-1">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-none sm:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Sort Button - Subtle */}
            <div className="relative">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-1.5 px-3 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-md transition-colors text-sm"
              >
                <ChevronDown className="h-3.5 w-3.5" />
                <span className="hidden md:inline text-xs">{selectedSortOption?.label}</span>
              </button>

              {/* Sort Dropdown */}
              {isSortOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsSortOpen(false)}
                  />
                  <div className="absolute right-0 mt-1 w-36 bg-white border border-slate-200 rounded-md shadow-lg z-20">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          onSortChange(option.value);
                          setIsSortOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-50 transition-colors first:rounded-t-md last:rounded-b-md ${
                          sortBy === option.value 
                            ? 'bg-slate-100 text-slate-900 font-medium' 
                            : 'text-slate-700'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Categories Menu Button */}
            <button
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 transition-colors"
            >
              <Menu className="h-4 w-4" />
              <span className="hidden sm:inline">Categories</span>
              {hasActiveFilters && (
                <span className="bg-slate-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  !
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Active Filters & Results Summary */}
      <div className="flex flex-wrap items-center gap-2 text-sm">
        {/* Results Counter */}
        <span className="text-slate-600">
          <span className="font-medium">{productCount}</span> of{' '}
          <span className="font-medium">{totalProducts}</span> products
        </span>

        {/* Active Category Filter */}
        {selectedCategoryName && (
          <div className="flex items-center gap-1">
            <span className="text-slate-500">in</span>
            <span className="bg-slate-600 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
              {selectedCategoryName}
              <button
                onClick={() => onCategoryChange(null)}
                className="hover:bg-slate-500 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          </div>
        )}

        {/* Clear All Filters */}
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="text-slate-500 hover:text-slate-700 transition-colors text-xs underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Categories Dropdown - 2 Columns */}
      {isCategoriesOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-20 bg-black bg-opacity-25" 
            onClick={() => setIsCategoriesOpen(false)}
          />
          
          {/* Categories Menu */}
          <div className="absolute right-0 mt-2 w-full max-w-lg bg-white border border-slate-200 rounded-lg shadow-lg z-30">
            <div className="p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-slate-800">Categories</h3>
                <button
                  onClick={() => setIsCategoriesOpen(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* All Categories Button */}
              <button
                onClick={() => {
                  onCategoryChange(null);
                  setIsCategoriesOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-md mb-2 transition-colors ${
                  !selectedCategory
                    ? 'bg-slate-600 text-white'
                    : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                All Categories
              </button>

              {/* Categories Grid - 2 Columns */}
              <div className="grid grid-cols-2 gap-1">
                {categories.map((category: ProductCategory) => {
                  const categoryCount = getCategoryProductCount(category.slug);
                  const hasProducts = categoryCount > 0;
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => {
                        if (hasProducts) {
                          onCategoryChange(category.slug);
                          setIsCategoriesOpen(false);
                        }
                      }}
                      disabled={!hasProducts}
                      className={`text-left px-3 py-2 rounded-md transition-colors text-sm ${
                        selectedCategory === category.slug
                          ? 'bg-slate-600 text-white'
                          : hasProducts
                          ? 'hover:bg-slate-50 text-slate-700'
                          : 'text-slate-400 cursor-not-allowed opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="truncate">{category.name}</span>
                        {hasProducts && (
                          <span className={`text-xs px-1.5 py-0.5 rounded-full ml-1 ${
                            selectedCategory === category.slug
                              ? 'bg-slate-500 text-white'
                              : 'bg-slate-200 text-slate-600'
                          }`}>
                            {categoryCount}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}