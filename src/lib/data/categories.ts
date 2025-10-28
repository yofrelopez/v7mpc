// Product Categories System - V7MPC Professional Architecture
// Based on Chinese supplier structure but with professional organization

import { ProductCategory } from '@/types/products';

// ============================================================================
// MAIN PRODUCT CATEGORIES (Based on Chinese supplier analysis)
// ============================================================================

export const productCategories: ProductCategory[] = [
  // 1. JEWELRY & RECOGNITION (Medals, pins, plaques, awards)
  {
    id: 'jewelry-recognition',
    slug: 'jewelry-recognition',
    name: 'Jewelry & Recognition',
    description: 'Custom medals, pins, plaques, and commemorative awards designed for recognition and service programs.',
    image: '/categories/jewelry-recognition.jpg',
    productCount: 0 // Will be calculated dynamically
  },

  // 2. APPAREL (Uniforms, clothing, branded apparel)
  {
    id: 'apparel',
    slug: 'apparel',
    name: 'Apparel', 
    description: 'Custom uniforms, event apparel, and branded clothing for teams, schools, and departments.',
    image: '/categories/apparel.jpg',
    productCount: 0
  },

  // 3. PROMOS (Promotional products, giveaways, marketing items)
  {
    id: 'promos',
    slug: 'promos',
    name: 'Promos',
    description: 'Branded pens, mugs, lanyards, and office essentials — ideal for outreach, recruitment, and campaign visibility.',
    image: '/categories/promos.jpg',
    productCount: 0
  },

  // 4. SIGNS & DISPLAYS (Signage, banners, visual displays)
  {
    id: 'signs-displays',
    slug: 'signs-displays',
    name: 'Signs & Displays',
    description: 'Indoor/outdoor signage, banners, and visual materials for events and facilities.',
    image: '/categories/signs-displays.jpg',
    productCount: 0
  }
];

// ============================================================================
// CATEGORY UTILITIES
// ============================================================================

/**
 * Get category by slug
 */
export const getCategoryBySlug = (slug: string): ProductCategory | undefined => {
  return productCategories.find(category => category.slug === slug);
};

/**
 * Get category by ID
 */
export const getCategoryById = (id: string): ProductCategory | undefined => {
  return productCategories.find(category => category.id === id);
};

/**
 * Get all active categories
 */
export const getActiveCategories = (): ProductCategory[] => {
  return productCategories.filter(category => category.productCount > 0);
};

/**
 * Search categories by name or description
 */
export const searchCategories = (query: string): ProductCategory[] => {
  const lowercaseQuery = query.toLowerCase();
  return productCategories.filter(
    category =>
      category.name.toLowerCase().includes(lowercaseQuery) ||
      category.description.toLowerCase().includes(lowercaseQuery)
  );
};

/**
 * Get featured categories (top 6 by product count)
 */
export const getFeaturedCategories = (limit: number = 6): ProductCategory[] => {
  return productCategories
    .filter(category => category.productCount > 0)
    .sort((a, b) => b.productCount - a.productCount)
    .slice(0, limit);
};

// ============================================================================
// CATEGORY TAGS & KEYWORDS
// ============================================================================

export const categoryKeywords = {
  'jewelry-recognition': ['medal', 'pin', 'plaque', 'award', 'trophy', 'recognition', 'achievement', 'commemoration', 'jewelry', 'badge'],
  'apparel': ['clothing', 'uniform', 'shirt', 'jacket', 'hat', 'cap', 'polo', 'embroidery', 'apparel', 'branded clothing'],
  'promos': ['pen', 'mug', 'keychain', 'lanyard', 'promotional', 'giveaway', 'marketing', 'brand', 'custom', 'logo', 'office supplies'],
  'signs-displays': ['sign', 'banner', 'display', 'signage', 'poster', 'indoor', 'outdoor', 'visual', 'materials', 'facility']
};

// ============================================================================
// EXPORT DEFAULT
// ============================================================================

export default productCategories;