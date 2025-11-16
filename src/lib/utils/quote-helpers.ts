/**
 * Quote Form Helpers
 * Utility functions for handling quote form data
 */

import { QuoteFormData, QuoteSubmission, BudgetRange } from '@/types/quote';
import { generateQuoteId } from './quote-id-generator';

/**
 * Budget range labels for display
 */
export const BUDGET_LABELS: Record<BudgetRange, string> = {
  'under-500': 'Under $500',
  '500-1000': '$500 - $1,000',
  '1000-5000': '$1,000 - $5,000',
  'over-5000': 'Over $5,000',
  'prefer-not-say': 'Prefer not to say'
};

/**
 * Prepares quote form data for submission
 * Adds Quote ID and timestamp
 * 
 * @param formData - Raw form data from the form
 * @returns Complete quote submission object
 */
export function prepareQuoteSubmission(formData: QuoteFormData): QuoteSubmission {
  return {
    ...formData,
    quoteId: generateQuoteId(),
    submittedAt: new Date()
  };
}

/**
 * Formats a quote submission for email display
 * Converts data into human-readable format
 * 
 * @param submission - Quote submission data
 * @returns Formatted object for email templates
 */
export function formatQuoteForEmail(submission: QuoteSubmission) {
  return {
    quoteId: submission.quoteId,
    submittedDate: submission.submittedAt.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    
    customer: {
      name: submission.customer.name,
      email: submission.customer.email,
      company: submission.customer.company || 'N/A',
      phone: submission.customer.phone || 'N/A'
    },
    
    product: {
      name: submission.product.productName,
      source: submission.product.source === 'catalog' ? 'From Catalog' : 'Custom Product',
      category: submission.product.categoryName || 'N/A',
      description: submission.product.customDescription || 'N/A'
    },
    
    orderDetails: {
      quantity: submission.quantity.toLocaleString(),
      timeline: submission.timeline || 'Not specified',
      budget: submission.budget ? BUDGET_LABELS[submission.budget] : 'Not specified'
    },
    
    customization: submission.customization ? formatCustomization(submission.customization) : null,
    
    message: submission.message || 'No additional message',
    
    metadata: {
      referrer: submission.referrer || 'Direct',
      source: submission.source || 'website-form'
    }
  };
}

/**
 * Formats customization details for display
 */
function formatCustomization(customization: any) {
  const formatted: Record<string, string> = {};
  
  if (customization.colors?.length) {
    formatted['Colors'] = customization.colors.join(', ');
  }
  
  if (customization.sizes?.length) {
    formatted['Sizes'] = customization.sizes.join(', ');
  }
  
  if (customization.logoPlacement) {
    formatted['Logo Placement'] = customization.logoPlacement;
  }
  
  if (customization.text) {
    formatted['Text/Engraving'] = customization.text;
  }
  
  if (customization.printMethod) {
    formatted['Print Method'] = customization.printMethod;
  }
  
  if (customization.dimensions) {
    formatted['Dimensions'] = customization.dimensions;
  }
  
  if (customization.material) {
    formatted['Material'] = customization.material;
  }
  
  if (customization.other) {
    formatted['Other Details'] = customization.other;
  }
  
  return Object.keys(formatted).length > 0 ? formatted : null;
}

/**
 * Validates basic form data before submission
 * Returns array of error messages if invalid
 * 
 * @param formData - Form data to validate
 * @returns Array of error messages (empty if valid)
 */
export function validateQuoteFormData(formData: QuoteFormData): string[] {
  const errors: string[] = [];
  
  // Customer validation
  if (!formData.customer.name?.trim()) {
    errors.push('Name is required');
  }
  
  if (!formData.customer.email?.trim()) {
    errors.push('Email is required');
  } else if (!isValidEmail(formData.customer.email)) {
    errors.push('Invalid email format');
  }
  
  // Product validation
  if (!formData.product.productName?.trim()) {
    errors.push('Product name is required');
  }
  
  // Quantity validation
  if (!formData.quantity || formData.quantity < 1) {
    errors.push('Quantity must be at least 1');
  }
  
  return errors;
}

/**
 * Simple email validation
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
