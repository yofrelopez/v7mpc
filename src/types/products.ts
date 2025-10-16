// Product Management System - TypeScript Definitions
// V7MPC Professional Product Architecture
// PHASE 1: Simple Catalog + Quote Request System

// ============================================================================
// PHASE 1: CORE INTERFACES (SIMPLIFIED)
// ============================================================================

export interface Product {
  // Basic Information
  id: string;
  slug: string;
  name: string;
  description: string;
  
  // Categorization
  category: ProductCategory;
  tags: string[];
  
  // Media
  images: string[];
  
  // Basic Features
  features: string[];
  isCustomizable: boolean;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  image?: string;
  productCount: number;
}

// ============================================================================
// PHASE 1: QUOTE REQUEST SYSTEM
// ============================================================================

export interface QuoteRequest {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  customerInfo: CustomerInfo;
  message?: string;
  needsCustomization: boolean;
  status: 'pending' | 'processing' | 'completed';
  createdAt: Date;
}

export interface CustomerInfo {
  name: string;
  email: string;
  company?: string;
  phone?: string;
}

// ============================================================================
// PHASE 1: UTILITY TYPES 
// ============================================================================

export type ProductSortOption = 
  | 'name_asc'
  | 'name_desc'
  | 'newest'
  | 'category';

// ============================================================================
// FUTURE PHASES: ADVANCED FEATURES (COMMENTED FOR LATER USE)
// ============================================================================

/*
// PHASE 2: Advanced Pricing & Customization
export interface ProductPricing {
  basePrice?: number;
  currency: 'USD' | 'EUR' | 'GBP';
  priceType: 'fixed' | 'tiered' | 'quote_only';
  tiers?: PricingTier[];
  minimumQuantity: number;
  requiresQuote: boolean;
  estimatedLeadTime?: string;
}

export interface PricingTier {
  minQuantity: number;
  maxQuantity?: number;
  pricePerUnit: number;
  setupFee?: number;
  description?: string;
}

export interface CustomizationOptions {
  isCustomizable: boolean;
  customizationTypes: CustomizationType[];
  setupFee?: number;
  customizationLeadTime?: string;
}

// PHASE 3: Search & Filtering
export interface ProductFilter {
  categories?: string[];
  priceRange?: { min?: number; max?: number; };
  customizable?: boolean;
  tags?: string[];
}

export interface ProductSearchResult {
  products: Product[];
  totalCount: number;
  pagination: {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
  };
}
*/

// ============================================================================
// EXPORTS - Phase 1 Types Ready
// ============================================================================

// Usage: import { Product, ProductCategory, QuoteRequest } from '@/types/products';