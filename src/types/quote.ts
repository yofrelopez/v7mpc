/**
 * Types for Quote/Cotización Form
 * V7MPC Website - Quote Request System
 */

import { Product, ProductCategory } from './products';

/**
 * Source of the product in the quote
 */
export type ProductSource = 'catalog' | 'custom';

/**
 * Budget ranges for quote estimation
 */
export type BudgetRange = 
  | 'under-500'
  | '500-1000'
  | '1000-5000'
  | 'over-5000'
  | 'prefer-not-say';

/**
 * Customization details structure
 * Fields vary based on product category
 */
export interface CustomizationDetails {
  // Common fields
  colors?: string[];
  logoPlacement?: string;
  text?: string;
  other?: string;

  // Apparel specific
  sizes?: string[];
  printMethod?: 'screen-print' | 'sublimation' | 'embroidery' | 'heat-transfer';

  // Signs & Displays specific
  dimensions?: string;
  material?: string;
  mounting?: string;
  finish?: string;

  // Jewelry specific
  engraving?: string;
  chainLength?: string;
  plating?: string;

  // Promos specific
  packaging?: string;
}

/**
 * Customer information
 */
export interface CustomerInfo {
  name: string;
  email: string;
  company?: string;
  phone?: string;
}

/**
 * Product information for quote
 */
export interface QuoteProductInfo {
  source: ProductSource;
  
  // From catalog
  productId?: string;
  productName: string;
  productSlug?: string;
  categoryName?: string;
  categorySlug?: string;
  imageUrl?: string;
  
  // Custom product description
  customDescription?: string;
}

/**
 * Main Quote Form Data structure
 */
export interface QuoteFormData {
  // Customer information
  customer: CustomerInfo;
  
  // Product information
  product: QuoteProductInfo;
  
  // Order details
  quantity: number;
  customization?: CustomizationDetails;
  
  // Timeline and budget
  timeline?: string;
  budget?: BudgetRange;
  
  // Additional info
  message?: string;
  
  // Metadata
  referrer?: string; // Where they came from
  source?: string;   // 'website-form' | 'product-page'
}

/**
 * Quote submission payload
 */
export interface QuoteSubmission extends QuoteFormData {
  quoteId: string;
  submittedAt: Date;
}

/**
 * Response from quote submission
 */
export interface QuoteResponse {
  success: boolean;
  quoteId?: string;
  message?: string;
  error?: string;
  
  // Optional metadata
  estimatedPrice?: string;
  estimatedDelivery?: string;
  nextSteps?: string;
}

/**
 * Email data structure for notifications
 */
export interface QuoteEmailData {
  // To V7MPC
  toAdmin: {
    recipient: string;
    subject: string;
    quoteDetails: QuoteSubmission;
  };
  
  // To Customer
  toCustomer: {
    recipient: string;
    subject: string;
    quoteId: string;
    customerName: string;
    summary: string;
  };
}
