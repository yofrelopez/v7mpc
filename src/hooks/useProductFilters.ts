'use client';

import { useState, useMemo } from 'react';
import { Product } from '@/types/products';

export type SortOption = 'name-asc' | 'name-desc' | 'category' | 'newest';

interface UseProductFiltersProps {
  products: Product[];
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
}

export function useProductFilters({ products }: UseProductFiltersProps): UseProductFiltersReturn {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
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
    setSelectedCategory(null);
    setSortBy('name-asc');
  };

  return {
    filteredProducts,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    totalProducts: products.length,
    filteredCount: filteredProducts.length,
    resetFilters
  };
}