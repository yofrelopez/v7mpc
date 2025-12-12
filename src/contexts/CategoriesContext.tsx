'use client';

// CategoriesContext - Global state for product categories
// Loads categories ONCE at page load, shares data across all components
// Eliminates redundant API calls from CategoryMenu

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// ============================================================================
// TYPES
// ============================================================================

interface Subcategory {
  id: string;
  slug: string;
  name: string;
  description?: string;
  icon?: string;
  productCount: number;
}

interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  subcategories: Subcategory[];
}

interface CategoriesContextType {
  categories: Category[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// ============================================================================
// CONTEXT
// ============================================================================

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

// ============================================================================
// PROVIDER
// ============================================================================

export function CategoriesProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/products/categories');

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.categories) {
        setCategories(data.categories);
      } else {
        throw new Error('Failed to load categories');
      }
    } catch (err) {
      console.error('[CategoriesContext] Fetch error:', err);
      setError(err instanceof Error ? err.message : 'Failed to load categories');
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories once on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, loading, error, refetch: fetchCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
}

// ============================================================================
// HOOK
// ============================================================================

export function useCategories() {
  const context = useContext(CategoriesContext);

  if (!context) {
    throw new Error('useCategories must be used within CategoriesProvider');
  }

  return context;
}
