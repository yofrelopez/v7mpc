'use client';

import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import productCategories from '@/lib/data/categories';
import { ProductCategory, Product } from '@/types/products';

interface ProductFiltersProps {
  searchTerm: string;
  onSearchChange: (search: string) => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  productCount: number;
  totalProducts: number;
  allProducts: Product[]; // Add this to calculate category counts
}

export default function ProductFilters({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  productCount,
  totalProducts,
  allProducts
}: ProductFiltersProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const categories = productCategories;

  // Calculate product count per category
  const getCategoryProductCount = (categorySlug: string) => {
    return allProducts.filter(product => product.category.slug === categorySlug).length;
  };

  const handleClearFilters = () => {
    onSearchChange('');
    onCategoryChange(null);
    setIsFilterOpen(false);
  };

  const hasActiveFilters = searchTerm || selectedCategory;

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 mb-6 shadow-sm">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
          />
        </div>
        
        {/* Filter Toggle Button (Mobile) */}
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="sm:hidden flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 transition-colors"
        >
          <Filter className="h-4 w-4" />
          Filtros
          {hasActiveFilters && (
            <span className="bg-slate-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              !
            </span>
          )}
        </button>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="hidden sm:flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-slate-800 transition-colors"
          >
            <X className="h-4 w-4" />
            Limpiar
          </button>
        )}
      </div>

      {/* Category Filters - Desktop always visible, Mobile toggle */}
      <div className={`mt-4 ${isFilterOpen ? 'block' : 'hidden sm:block'}`}>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <span className="text-sm font-medium text-slate-700 shrink-0">
            Categorías:
          </span>
          
          <div className="flex flex-wrap gap-2">
            {/* All Categories Button */}
            <button
              onClick={() => onCategoryChange(null)}
              className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                !selectedCategory
                  ? 'bg-slate-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Todas
            </button>
            
            {/* Category Buttons */}
            {categories.map((category: ProductCategory) => {
              const categoryCount = getCategoryProductCount(category.slug);
              const hasProducts = categoryCount > 0;
              
              return (
                <button
                  key={category.id}
                  onClick={() => hasProducts ? onCategoryChange(category.slug) : undefined}
                  disabled={!hasProducts}
                  className={`px-3 py-1.5 text-sm rounded-full transition-all inline-flex items-center gap-1.5 ${
                    selectedCategory === category.slug
                      ? 'bg-slate-600 text-white'
                      : hasProducts
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      : 'bg-slate-50 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {category.name}
                  {hasProducts && (
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                      selectedCategory === category.slug
                        ? 'bg-slate-500 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}>
                      {categoryCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="sm:hidden mt-3 flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-slate-800 transition-colors"
          >
            <X className="h-4 w-4" />
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Results Counter */}
      <div className="mt-4 pt-3 border-t border-slate-100">
        <p className="text-sm text-slate-600">
          Mostrando <span className="font-medium">{productCount}</span> de{' '}
          <span className="font-medium">{totalProducts}</span> productos
          {hasActiveFilters && (
            <span className="text-slate-500 ml-1">
              (filtrado{searchTerm && ` por "${searchTerm}"`}
              {selectedCategory && ` en ${categories.find((c: ProductCategory) => c.slug === selectedCategory)?.name}`})
            </span>
          )}
        </p>
      </div>
    </div>
  );
}