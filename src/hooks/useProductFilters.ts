'use client';

import { useState, useMemo } from 'react';
import { Product } from '@/types/products';

export type SortOption = 'name-asc' | 'name-desc' | 'category' | 'newest';

interface UseProductFiltersProps {
  products: Product[];
  initialCategory?: string | null;
  categoryLocked?: boolean;
}

interface UseProductFiltersReturn {
  filteredProducts: Product[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  totalProducts: number;
  filteredCount: number;
  resetFilters: () => void;
  categoryLocked: boolean;
}

export function useProductFilters({ 
  products, 
  initialCategory = null, 
  categoryLocked = false 
}: UseProductFiltersProps): UseProductFiltersReturn {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');

  const filteredProducts = useMemo(() => {
    let result = products;

    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.features.some(feature => feature.toLowerCase().includes(searchLower)) ||
        product.category.name.toLowerCase().includes(searchLower)
      );
    }

    // Filter by category
    if (selectedCategory) {
      result = result.filter(product => product.category.slug === selectedCategory);
    }

    // Sort products
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'category':
          return a.category.name.localeCompare(b.category.name);
        case 'newest':
          // Since we don't have dates, sort by ID (assuming higher ID = newer)
          return b.id.localeCompare(a.id);
        default:
          return 0;
      }
    });

    return result;
  }, [products, searchTerm, selectedCategory, sortBy]);

  const resetFilters = () => {
    setSearchTerm('');
    if (!categoryLocked) {
      setSelectedCategory(null);
    }
    setSortBy('name-asc');
  };

  // Create a wrapper for setSelectedCategory that respects categoryLocked
  const handleCategoryChange = (category: string | null) => {
    if (!categoryLocked) {
      setSelectedCategory(category);
    }
  };

  return {
    filteredProducts,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory: handleCategoryChange,
    sortBy,
    setSortBy,
    totalProducts: products.length,
    filteredCount: filteredProducts.length,
    resetFilters,
    categoryLocked
  };
}