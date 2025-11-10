// ============================================================================
// SANMAR SOAP WEB SERVICES CLIENT
// V7MPC Professional Integration - Server-only API service
// ============================================================================

import 'server-only';
import { getStandardEndpoint, getPromoStandardsEndpoint, validateEnvironment } from './sanmar.endpoints';

// ============================================================================
// ENVIRONMENT & CREDENTIALS
// ============================================================================

const ENV = validateEnvironment(process.env.SANMAR_ENV);

// === Credenciales SanMar Standard ===
const SANMAR_CUSTOMER_NUMBER = process.env.SANMAR_CUSTOMER_NUMBER!;
const SANMAR_USERNAME = process.env.SANMAR_USERNAME!;
const SANMAR_PASSWORD = process.env.SANMAR_PASSWORD!;

// === Credenciales PromoStandards ===
const PROMO_USER = process.env.PROMOSTD_USERNAME!;
const PROMO_PASS = process.env.PROMOSTD_PASSWORD!;

// Validate required environment variables
if (!SANMAR_CUSTOMER_NUMBER || !SANMAR_USERNAME || !SANMAR_PASSWORD) {
  throw new Error('Missing required SanMar Standard credentials in environment variables');
}

if (!PROMO_USER || !PROMO_PASS) {
  throw new Error('Missing required PromoStandards credentials in environment variables');
}

// ============================================================================
// SOAP XML UTILITIES
// ============================================================================

/**
 * Generate SOAP XML envelope with headers and body
 */
function toXml(headers: Record<string, string>, body: string): string {
  const headerString = Object.entries(headers)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');

  return `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ${headerString}>
  <soapenv:Header/>
  <soapenv:Body>
    ${body}
  </soapenv:Body>
</soapenv:Envelope>`;
}

/**
 * Execute SOAP request with error handling
 */
async function postSoap(url: string, xml: string): Promise<string> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': '""', // Required for some SOAP services
      },
      body: xml,
    });

    const responseText = await response.text();

    if (!response.ok) {
      throw new Error(`SOAP HTTP ${response.status}: ${responseText.slice(0, 500)}`);
    }

    return responseText;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`SOAP Request Failed: ${error.message}`);
    }
    throw new Error('SOAP Request Failed: Unknown error');
  }
}

// ============================================================================
// PROMOSTANDARDS WEB SERVICES
// ============================================================================

/**
 * PromoStandards: GetProductSellable
 * 
 * Validates if a product (by productId/style) is sellable
 * 
 * @param productId - SanMar product style (e.g., "PC54", "ST350")
 * @param isSellable - Filter by sellable status (default: true)
 * @returns Raw XML response from SanMar API
 * 
 * Required: wsVersion=2.0.0, id (username), password, productId, isSellable
 * Ref: SanMar Web Services Integration Guide 24.2
 */
export async function promo_getProductSellable(
  productId: string, 
  isSellable: boolean = true
): Promise<string> {
  const url = getPromoStandardsEndpoint('productDataV2');
  
  const headers = {
    'xmlns:ns': 'http://www.promostandards.org/WSDL/ProductDataService/2.0.0/',
    'xmlns:shar': 'http://www.promostandards.org/WSDL/ProductDataService/2.0.0/SharedObjects/',
  };

  const body = `
    <ns:GetProductSellableRequest>
      <shar:wsVersion>2.0.0</shar:wsVersion>
      <shar:id>${PROMO_USER}</shar:id>
      <shar:password>${PROMO_PASS}</shar:password>
      <shar:productId>${productId}</shar:productId>
      <shar:isSellable>${isSellable}</shar:isSellable>
    </ns:GetProductSellableRequest>
  `;

  const xml = toXml(headers, body);
  
  try {
    return await postSoap(url, xml);
  } catch (error) {
    throw new Error(`PromoStandards GetProductSellable failed for productId ${productId}: ${error}`);
  }
}

// ============================================================================
// SANMAR STANDARD WEB SERVICES
// ============================================================================

/**
 * SanMar Standard: getProductInfoByStyleColorSize
 * 
 * Gets detailed product information by style, color, and/or size
 * Can query by:
 * - style only
 * - style + color
 * - style + size  
 * - style + color + size
 * 
 * @param params - Query parameters
 * @param params.style - Product style (required, e.g., "PC54")
 * @param params.color - Color code (optional, e.g., "White")
 * @param params.size - Size code (optional, e.g., "L")
 * @returns Raw XML response from SanMar API
 * 
 * Required: SanMar Standard credentials (customerNumber, username, password)
 * Ref: SanMar Web Services Integration Guide 24.2
 */
export async function std_getProductInfoByStyleColorSize(params: {
  style: string;
  color?: string;
  size?: string;
}): Promise<string> {
  const url = getStandardEndpoint('productInfo', ENV);

  const headers = {
    'xmlns:impl': 'http://impl.webservice.integration.sanmar.com/',
  };

  // Build arg0 (product query parameters)
  const arg0 = `
    <arg0>
      <style>${params.style}</style>
      ${params.size ? `<size>${params.size}</size>` : ''}
      ${params.color ? `<color>${params.color}</color>` : ''}
    </arg0>
  `;

  // Build arg1 (authentication credentials)
  const arg1 = `
    <arg1>
      <sanMarCustomerNumber>${SANMAR_CUSTOMER_NUMBER}</sanMarCustomerNumber>
      <sanMarUserName>${SANMAR_USERNAME}</sanMarUserName>
      <sanMarUserPassword>${SANMAR_PASSWORD}</sanMarUserPassword>
      <senderId></senderId>
      <senderPassword></senderPassword>
    </arg1>
  `;

  const body = `<impl:getProductInfoByStyleColorSize>${arg0}${arg1}</impl:getProductInfoByStyleColorSize>`;
  const xml = toXml(headers, body);

  try {
    return await postSoap(url, xml);
  } catch (error) {
    throw new Error(`SanMar Standard getProductInfoByStyleColorSize failed for style ${params.style}: ${error}`);
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Validate product style format (basic validation)
 * SanMar styles are typically alphanumeric (e.g., PC54, ST350, DT104)
 */
export function isValidProductStyle(style: string): boolean {
  if (!style || typeof style !== 'string') {
    return false;
  }
  
  // Basic validation: alphanumeric, 2-10 characters
  const styleRegex = /^[A-Za-z0-9]{2,10}$/;
  return styleRegex.test(style.trim());
}

/**
 * Clean and validate product parameters
 */
export function validateProductParams(params: {
  style: string;
  color?: string;
  size?: string;
}) {
  const cleaned = {
    style: params.style?.trim(),
    color: params.color?.trim() || undefined,
    size: params.size?.trim() || undefined,
  };

  if (!isValidProductStyle(cleaned.style)) {
    throw new Error(`Invalid product style: ${params.style}`);
  }

  return cleaned;
}

// ============================================================================
// ERROR HANDLING TYPES
// ============================================================================

/**
 * Common SanMar API error codes and messages
 */
export const SANMAR_ERROR_CODES = {
  // PromoStandards errors
  PROMO_AUTH_FAILED: '105',
  PROMO_NO_RESULTS: '160',
  PROMO_INVALID_PRODUCT: '110',
  
  // Standard errors  
  STD_AUTH_FAILED: 'Authentication failed',
  STD_INVALID_STYLE: 'Invalid style',
  STD_INVALID_COLOR: 'Invalid color',
  STD_INVALID_SIZE: 'Invalid size',
} as const;

/**
 * Parse basic error information from SOAP fault
 */
export function parseSoapError(xmlResponse: string): {
  isError: boolean;
  errorCode?: string;
  errorMessage?: string;
} {
  const hasError = xmlResponse.includes('soap:Fault') || 
                   xmlResponse.includes('soapenv:Fault') ||
                   xmlResponse.includes('faultstring');

  if (!hasError) {
    return { isError: false };
  }

  // Basic error message extraction (could be enhanced with proper XML parsing)
  const faultMatch = xmlResponse.match(/<faultstring>(.*?)<\/faultstring>/);
  const errorMessage = faultMatch?.[1] || 'Unknown SOAP error';

  return {
    isError: true,
    errorMessage,
  };
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  ENV as SANMAR_ENVIRONMENT,
  validateEnvironment,
};

export type {
  // Re-export types from endpoints
} from './sanmar.endpoints';