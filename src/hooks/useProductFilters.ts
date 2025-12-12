'use client';

import { useState, useMemo } from 'react';
import { Product } from '@/types/products';

export type SortOption = 'name-asc' | 'name-desc' | 'category' | 'newest';

// ... imports ...

interface UseProductFiltersProps {
  products: Product[];
  initialCategory?: string | null;
  initialBrand?: string | null;
  initialType?: string | null;
  categoryLocked?: boolean;
}

interface UseProductFiltersReturn {
  filteredProducts: Product[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  selectedBrand: string | null;
  setSelectedBrand: (brand: string | null) => void;
  selectedType: string | null;
  setSelectedType: (type: string | null) => void;
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
  initialBrand = null,
  initialType = null,
  categoryLocked = false
}: UseProductFiltersProps): UseProductFiltersReturn {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(initialBrand);
  // Type filter (e.g. Polos, Jackets) - checks tags/description
  const [selectedType, setSelectedType] = useState<string | null>(initialType);
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');

  const filteredProducts = useMemo(() => {
    let result = products;

    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        (product.shortDescription && product.shortDescription.toLowerCase().includes(searchLower)) ||
        product.features.some(feature => feature.toLowerCase().includes(searchLower)) ||
        product.category.name.toLowerCase().includes(searchLower) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Filter by category (Legacy database category)
    if (selectedCategory) {
      result = result.filter(product => product.category.slug === selectedCategory);
    }

    // Filter by Brand (looks in tags or features)
    if (selectedBrand) {
      const brandLower = selectedBrand.toLowerCase();
      result = result.filter(product =>
        product.tags.some(tag => tag.toLowerCase() === brandLower) ||
        product.features.some(f => f.toLowerCase().includes(`brand: ${brandLower}`)) ||
        product.tags.includes(brandLower) // exact match
      );
    }

    // Filter by Type (looks in tags)
    if (selectedType) {
      const typeLower = selectedType.toLowerCase();
      result = result.filter(product =>
        product.tags.some(tag => tag.toLowerCase().includes(typeLower))
      );
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
          return b.id.localeCompare(a.id);
        default:
          return 0;
      }
    });

    return result;
  }, [products, searchTerm, selectedCategory, selectedBrand, selectedType, sortBy]);

  const resetFilters = () => {
    setSearchTerm('');
    if (!categoryLocked) {
      setSelectedCategory(null);
    }
    setSelectedBrand(null);
    setSelectedType(null);
    setSortBy('name-asc');
  };

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
    selectedBrand,
    setSelectedBrand,
    selectedType,
    setSelectedType,
    sortBy,
    setSortBy,
    totalProducts: products.length,
    filteredCount: filteredProducts.length,
    resetFilters,
    categoryLocked
  };
}