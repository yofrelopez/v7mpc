// Product Categories System - V7MPC Professional Architecture
// Based on Chinese supplier structure but with professional organization

import { ProductCategory } from '@/types/products';

// ============================================================================
// MAIN PRODUCT CATEGORIES (Based on Chinese supplier analysis)
// ============================================================================

export const productCategories: ProductCategory[] = [
  // 1. PROMOTIONAL PRODUCTS (Core business)
  {
    id: 'promotional',
    slug: 'promotional-products', 
    name: 'Promotional Products',
    description: 'Custom branded promotional items for marketing campaigns, trade shows, and corporate events. Elevate your brand presence with memorable giveaways.',
    image: '/categories/promotional.jpg',
    productCount: 0 // Will be calculated dynamically
  },

  // 2. APPAREL & ACCESSORIES
  {
    id: 'apparel',
    slug: 'apparel-accessories',
    name: 'Apparel & Accessories', 
    description: 'Custom branded clothing, uniforms, and accessories. Professional corporate apparel and promotional wearables with your logo.',
    image: '/categories/apparel.jpg',
    productCount: 0
  },

  // 3. BAGS & CASES  
  {
    id: 'bags',
    slug: 'bags-cases',
    name: 'Bags & Cases',
    description: 'Custom bags, backpacks, briefcases, and protective cases. Perfect for corporate gifts, trade shows, and employee appreciation.',
    image: '/categories/bags.jpg',
    productCount: 0
  },

  // 4. DRINKWARE & KITCHEN
  {
    id: 'drinkware',
    slug: 'drinkware-kitchen',
    name: 'Drinkware & Kitchen',
    description: 'Custom mugs, water bottles, tumblers, and kitchen accessories. Practical promotional items for daily brand exposure.',
    image: '/categories/drinkware.jpg',  
    productCount: 0
  },

  // 5. OFFICE SUPPLIES
  {
    id: 'office',
    slug: 'office-supplies',
    name: 'Office Supplies',
    description: 'Professional office supplies, stationery, and desk accessories. Custom branded items for corporate environments.',
    image: '/categories/office.jpg',
    productCount: 0
  },

  // 6. TECH & ELECTRONICS
  {
    id: 'tech',
    slug: 'tech-electronics', 
    name: 'Tech & Electronics',
    description: 'Custom branded technology accessories, power banks, USB drives, and electronic promotional items.',
    image: '/categories/tech.jpg',
    productCount: 0
  },

  // 7. AWARDS & RECOGNITION
  {
    id: 'awards',
    slug: 'awards-recognition',
    name: 'Awards & Recognition',
    description: 'Custom trophies, plaques, acrylic awards, and recognition items. Celebrate achievements with personalized awards.',
    image: '/categories/awards.jpg',
    productCount: 0
  },

  // 8. OUTDOOR & SPORTS
  {
    id: 'outdoor',
    slug: 'outdoor-sports',
    name: 'Outdoor & Sports', 
    description: 'Custom outdoor gear, sports equipment, and recreational promotional items. Perfect for active lifestyle brands.',
    image: '/categories/outdoor.jpg',
    productCount: 0
  },

  // 9. HEALTH & WELLNESS
  {
    id: 'health',
    slug: 'health-wellness',
    name: 'Health & Wellness',
    description: 'Custom wellness products, fitness accessories, and health-focused promotional items for modern workplace culture.',
    image: '/categories/health.jpg',
    productCount: 0
  },

  // 10. SEASONAL & EVENTS
  {
    id: 'seasonal',
    slug: 'seasonal-events',
    name: 'Seasonal & Events',
    description: 'Holiday-themed and event-specific promotional items. Custom products for special occasions and seasonal campaigns.',
    image: '/categories/seasonal.jpg',
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
  promotional: ['giveaway', 'marketing', 'brand', 'custom', 'logo', 'trade show'],
  apparel: ['clothing', 'uniform', 'shirt', 'jacket', 'hat', 'embroidery'],
  bags: ['backpack', 'tote', 'briefcase', 'luggage', 'travel', 'laptop bag'],
  drinkware: ['mug', 'bottle', 'tumbler', 'cup', 'thermos', 'coffee'],
  office: ['pen', 'notebook', 'desk', 'stationery', 'folder', 'organizer'],
  tech: ['usb', 'charger', 'speaker', 'headphones', 'power bank', 'cable'],
  awards: ['trophy', 'plaque', 'medal', 'recognition', 'achievement', 'award'],
  outdoor: ['camping', 'hiking', 'sports', 'fitness', 'recreation', 'adventure'],
  health: ['wellness', 'fitness', 'safety', 'sanitizer', 'stress relief'],
  seasonal: ['holiday', 'christmas', 'halloween', 'valentine', 'graduation']
};

// ============================================================================
// EXPORT DEFAULT
// ============================================================================

export default productCategories;