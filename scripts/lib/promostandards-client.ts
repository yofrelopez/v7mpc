
// ============================================================================
// PROMOSTANDARDS CLIENT FOR SCRIPTS (No server-only)
// ============================================================================

import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config();

const PROMO_ENDPOINT = 'https://ws.sanmar.com:8080/promostandards/ProductDataServiceBindingV2?WSDL';
const PROMO_USER = process.env.PROMOSTD_USERNAME!;
const PROMO_PASS = process.env.PROMOSTD_PASSWORD!;

if (!PROMO_USER || !PROMO_PASS) {
    console.warn('⚠️ Missing PromoStandards credentials (PROMOSTD_USERNAME/PASSWORD)');
}

// ============================================================================
// SOAP UTILS
// ============================================================================

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

async function postSoap(url: string, xml: string): Promise<string> {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/xml; charset=utf-8',
                'SOAPAction': '""',
            },
            body: xml,
        });
        const responseText = await response.text();
        if (!response.ok) {
            throw new Error(`SOAP HTTP ${response.status}: ${responseText.slice(0, 500)}`);
        }
        return responseText;
    } catch (error: any) {
        throw new Error(`SOAP Request Failed: ${error.message}`);
    }
}

// ============================================================================
// API METHODS
// ============================================================================

/**
 * GetProductDateModified
 * Returns list of products modified since a given date.
 * TRICK: Use a very old date to get ALL products.
 */
export async function getProductDateModified(since: string = '2020-01-01T00:00:00Z'): Promise<string[]> {
    const headers = {
        'xmlns:ns': 'http://www.promostandards.org/WSDL/ProductDataService/2.0.0/',
        'xmlns:shar': 'http://www.promostandards.org/WSDL/ProductDataService/2.0.0/SharedObjects/',
    };

    const body = `
    <ns:GetProductDateModifiedRequest>
      <shar:wsVersion>2.0.0</shar:wsVersion>
      <shar:id>${PROMO_USER}</shar:id>
      <shar:password>${PROMO_PASS}</shar:password>
      <shar:changeTimeStamp>${since}</shar:changeTimeStamp>
    </ns:GetProductDateModifiedRequest>
  `;

    const xmlResponse = await postSoap(PROMO_ENDPOINT, toXml(headers, body));

    // Extract ProductIds using regex
    const regex = /<productId>([^<]+)<\/productId>/g;
    const matches = [...xmlResponse.matchAll(regex)];

    // Unique IDs
    const ids = Array.from(new Set(matches.map(m => m[1])));
    return ids;
}

/**
 * GetProduct
 * Gets full details for a specific product ID
 */
export async function getProduct(productId: string): Promise<string> {
    const headers = {
        'xmlns:ns': 'http://www.promostandards.org/WSDL/ProductDataService/2.0.0/',
        'xmlns:shar': 'http://www.promostandards.org/WSDL/ProductDataService/2.0.0/SharedObjects/',
    };

    const body = `
    <ns:GetProductRequest>
      <shar:wsVersion>2.0.0</shar:wsVersion>
      <shar:id>${PROMO_USER}</shar:id>
      <shar:password>${PROMO_PASS}</shar:password>
      <shar:localizationCountry>US</shar:localizationCountry>
      <shar:localizationLanguage>en</shar:localizationLanguage>
      <shar:productId>${productId}</shar:productId>
    </ns:GetProductRequest>
  `;

    return await postSoap(PROMO_ENDPOINT, toXml(headers, body));
}
