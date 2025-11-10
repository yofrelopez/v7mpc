// ============================================================================
// SANMAR API ENDPOINTS CONFIGURATION
// V7MPC Professional Integration - Based on SanMar Web Services Integration Guide 24.2
// ============================================================================

/**
 * SanMar Web Services Endpoints Configuration
 * 
 * SanMar exposes two main service families:
 * 1. SanMar Standard - Requires CustomerNumber, Username, Password
 * 2. PromoStandards - Uses id (username) and password
 * 
 * Environment Selection:
 * - test: For development/testing (may have outdated data)
 * - prod: For production (recommended even for testing product data)
 */

export const endpoints = {
  // ============================================================================
  // SANMAR STANDARD WEB SERVICES
  // ============================================================================
  standard: {
    /**
     * Product Information Service
     * Methods: getProductInfoByStyleColorSize, etc.
     */
    productInfo: {
      test: 'https://test-ws.sanmar.com:8080/SanMarWebService/SanMarProductInfoServicePort?wsdl',
      prod: 'https://ws.sanmar.com:8080/SanMarWebService/SanMarProductInfoServicePort?wsdl',
    },
    
    /**
     * Inventory Service (when needed)
     * Methods: getInventoryLevels, etc.
     */
    inventory: {
      test: 'https://test-ws.sanmar.com:8080/SanMarWebService/SanMarInventoryServicePort?wsdl',
      prod: 'https://ws.sanmar.com:8080/SanMarWebService/SanMarInventoryServicePort?wsdl',
    },
    
    /**
     * Pricing Service (when needed)
     * Methods: getPricing, etc.
     */
    pricing: {
      test: 'https://test-ws.sanmar.com:8080/SanMarWebService/SanMarPricingServicePort?wsdl',
      prod: 'https://ws.sanmar.com:8080/SanMarWebService/SanMarPricingServicePort?wsdl',
    },
  },

  // ============================================================================
  // PROMOSTANDARDS WEB SERVICES
  // ============================================================================
  promoStandards: {
    /**
     * Product Data Service V2.0.0
     * Methods: GetProductSellable, GetProduct, GetProductCloseOut, etc.
     * Recommended for frequent pulls and catalog validation
     */
    productDataV2: 'https://ws.sanmar.com:8080/promostandards/ProductDataServiceBindingV2?WSDL',
    
    /**
     * Inventory Service V1.2.1 (when needed)
     * Methods: GetFilteredInventoryLevels, GetInventoryLevels, etc.
     */
    inventory: 'https://ws.sanmar.com:8080/promostandards/InventoryServiceBinding?WSDL',
    
    /**
     * Order Status Service V1.0.0 (when needed)
     * Methods: GetOrderStatus, etc.
     */
    orderStatus: 'https://ws.sanmar.com:8080/promostandards/OrderStatusServiceBinding?WSDL',
    
    /**
     * Invoice Service V1.0.0 (when needed)
     * Methods: GetInvoices, etc.
     */
    invoice: 'https://ws.sanmar.com:8080/promostandards/InvoiceServiceBinding?WSDL',
  },
} as const;

// ============================================================================
// ENDPOINT TYPES & UTILITIES
// ============================================================================

/**
 * Available environments for SanMar Standard services
 */
export type SanMarEnvironment = 'test' | 'prod';

/**
 * Available SanMar Standard service types
 */
export type StandardServiceType = keyof typeof endpoints.standard;

/**
 * Available PromoStandards service types
 */
export type PromoStandardsServiceType = keyof typeof endpoints.promoStandards;

/**
 * Get SanMar Standard endpoint URL based on environment
 */
export function getStandardEndpoint(
  service: StandardServiceType,
  env: SanMarEnvironment = 'prod'
): string {
  return endpoints.standard[service][env];
}

/**
 * Get PromoStandards endpoint URL (environment-agnostic)
 */
export function getPromoStandardsEndpoint(
  service: PromoStandardsServiceType
): string {
  return endpoints.promoStandards[service];
}

/**
 * Validate environment variable
 */
export function validateEnvironment(env: string | undefined): SanMarEnvironment {
  if (env === 'test' || env === 'prod') {
    return env;
  }
  
  // Default to production for safety
  console.warn(`Invalid SANMAR_ENV: ${env}. Defaulting to 'prod'`);
  return 'prod';
}

// ============================================================================
// RATE LIMITING & BEST PRACTICES
// ============================================================================

/**
 * SanMar API Usage Guidelines:
 * 
 * 1. Frequency: No hard limits but use discretion
 * 2. Prefer PromoStandards for frequent pulls
 * 3. Use bulk data files (sanmar_dip.txt, epdd.csv) for massive inventory/pricing updates
 * 4. Reserve APIs for live checks and specific product queries
 * 5. Production WSDLs recommended even for testing (more accurate data)
 */

export const USAGE_GUIDELINES = {
  // Recommended cache times (in seconds)
  CACHE_DURATION: {
    PRODUCT_INFO: 3600,      // 1 hour
    INVENTORY: 900,          // 15 minutes  
    PRICING: 1800,           // 30 minutes
    SELLABLE_CHECK: 3600,    // 1 hour
  },
  
  // Batch size recommendations
  BATCH_SIZES: {
    PRODUCT_QUERIES: 10,     // Max products per batch request
    INVENTORY_CHECKS: 50,    // Max SKUs per inventory check
  },
  
  // Error handling
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,         // 1 second base delay
} as const;

export default endpoints;