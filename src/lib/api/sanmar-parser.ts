// ============================================================================
// SANMAR XML PARSER - Convert SanMar API responses to Product objects
// ============================================================================

import { Product, ContentBlock } from '@/types/products';
import { getCategoryBySlug } from '@/lib/data/categories';
import { getProductConfigByStyle } from './sanmar-products';

// ============================================================================
// XML PARSING UTILITIES
// ============================================================================

/**
 * Extract text content from XML tags
 */
function extractXmlValue(xml: string, tagName: string): string | null {
  const regex = new RegExp(`<${tagName}>([\\s\\S]*?)<\/${tagName}>`, 'i');
  const match = xml.match(regex);
  return match ? match[1].trim() : null;
}

/**
 * Extract all instances of a tag (for arrays)
 */
function extractXmlArray(xml: string, tagName: string): string[] {
  const regex = new RegExp(`<${tagName}>([\\s\\S]*?)<\/${tagName}>`, 'gi');
  const matches = xml.matchAll(regex);
  return Array.from(matches, m => m[1].trim());
}

/**
 * Decode HTML entities
 */
function decodeHtmlEntities(text: string): string {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&apos;': "'",
    '&mdash;': '—',
  };
  
  return text.replace(/&[^;]+;/g, (match) => entities[match] || match);
}

// ============================================================================
// SANMAR RESPONSE PARSER
// ============================================================================

export interface ParsedSanMarProduct {
  style: string;
  brandName: string;
  productTitle: string;
  productDescription: string;
  category: string;
  color: string;
  size: string;
  keywords: string[];
  
  // Images
  productImage: string;
  colorProductImage: string;
  frontModel: string;
  backModel: string;
  sideModel: string;
  frontFlat: string;
  backFlat: string;
  thumbnailImage: string;
  
  // Pricing
  piecePrice: string;
  pieceSalePrice?: string;
  dozenPrice: string;
  casePrice: string;
  saleStartDate?: string;
  saleEndDate?: string;
  
  // Specifications
  pieceWeight: string;
  availableSizes: string;
  caseSize: string;
}

/**
 * Parse a single listResponse element from SanMar XML
 */
export function parseSanMarXmlProduct(listResponseXml: string): ParsedSanMarProduct | null {
  try {
    // Basic Info
    const style = extractXmlValue(listResponseXml, 'style');
    const brandName = extractXmlValue(listResponseXml, 'brandName');
    const productTitle = extractXmlValue(listResponseXml, 'productTitle');
    const productDescription = extractXmlValue(listResponseXml, 'productDescription');
    const category = extractXmlValue(listResponseXml, 'category');
    const color = extractXmlValue(listResponseXml, 'color');
    const size = extractXmlValue(listResponseXml, 'size');
    const keywords = extractXmlValue(listResponseXml, 'keywords');
    
    // Images
    const productImage = extractXmlValue(listResponseXml, 'productImage');
    const colorProductImage = extractXmlValue(listResponseXml, 'colorProductImage');
    const frontModel = extractXmlValue(listResponseXml, 'frontModel');
    const backModel = extractXmlValue(listResponseXml, 'backModel');
    const sideModel = extractXmlValue(listResponseXml, 'sideModel');
    const frontFlat = extractXmlValue(listResponseXml, 'frontFlat');
    const backFlat = extractXmlValue(listResponseXml, 'backFlat');
    const thumbnailImage = extractXmlValue(listResponseXml, 'thumbnailImage');
    
    // Pricing
    const piecePrice = extractXmlValue(listResponseXml, 'piecePrice');
    const pieceSalePrice = extractXmlValue(listResponseXml, 'pieceSalePrice');
    const dozenPrice = extractXmlValue(listResponseXml, 'dozenPrice');
    const casePrice = extractXmlValue(listResponseXml, 'casePrice');
    const saleStartDate = extractXmlValue(listResponseXml, 'saleStartDate');
    const saleEndDate = extractXmlValue(listResponseXml, 'saleEndDate');
    
    // Specifications
    const pieceWeight = extractXmlValue(listResponseXml, 'pieceWeight');
    const availableSizes = extractXmlValue(listResponseXml, 'availableSizes');
    const caseSize = extractXmlValue(listResponseXml, 'caseSize');
    
    if (!style || !productTitle) {
      return null;
    }
    
    return {
      style: style,
      brandName: brandName || '',
      productTitle: decodeHtmlEntities(productTitle),
      productDescription: decodeHtmlEntities(productDescription || ''),
      category: category || '',
      color: color || '',
      size: size || '',
      keywords: keywords ? keywords.split(',').map(k => k.trim()) : [],
      
      productImage: productImage || '',
      colorProductImage: colorProductImage || '',
      frontModel: frontModel || '',
      backModel: backModel || '',
      sideModel: sideModel || '',
      frontFlat: frontFlat || '',
      backFlat: backFlat || '',
      thumbnailImage: thumbnailImage || '',
      
      piecePrice: piecePrice || '0',
      pieceSalePrice: pieceSalePrice || undefined,
      dozenPrice: dozenPrice || '0',
      casePrice: casePrice || '0',
      saleStartDate: saleStartDate || undefined,
      saleEndDate: saleEndDate || undefined,
      
      pieceWeight: pieceWeight || '0',
      availableSizes: availableSizes || '',
      caseSize: caseSize || '0',
    };
  } catch (error) {
    console.error('Error parsing SanMar XML product:', error);
    return null;
  }
}

/**
 * Parse full XML response and extract all products
 */
export function parseSanMarXmlResponse(xmlResponse: string): ParsedSanMarProduct[] {
  const listResponses = extractXmlArray(xmlResponse, 'listResponse');
  
  return listResponses
    .map(parseSanMarXmlProduct)
    .filter((p): p is ParsedSanMarProduct => p !== null);
}

// ============================================================================
// CONVERT TO PRODUCT TYPE
// ============================================================================

/**
 * Convert parsed SanMar product to our Product type
 * Groups variants by style (different sizes/colors become one product)
 */
export function sanMarProductToProduct(
  sanmarProducts: ParsedSanMarProduct[]
): Product[] {
  // Group by style
  const groupedByStyle = new Map<string, ParsedSanMarProduct[]>();
  
  for (const product of sanmarProducts) {
    const existing = groupedByStyle.get(product.style) || [];
    existing.push(product);
    groupedByStyle.set(product.style, existing);
  }
  
  // Convert each group to a Product
  const products: Product[] = [];
  
  for (const [style, variants] of groupedByStyle) {
    const primary = variants[0]; // Use first variant for main info
    const config = getProductConfigByStyle(style);
    
    if (!config) {
      console.warn(`No config found for style: ${style}`);
      continue;
    }
    
    // Get category
    const category = getCategoryBySlug('apparel');
    if (!category) {
      console.warn('Apparel category not found');
      continue;
    }
    
    // Collect all unique images
    const images = Array.from(new Set([
      primary.colorProductImage,
      primary.frontModel,
      primary.backModel,
      primary.sideModel,
      primary.frontFlat,
      primary.backFlat,
      primary.productImage,
    ].filter(Boolean)));
    
    // Build description with rich content
    const description: ContentBlock[] = [
      {
        type: 'text',
        content: primary.productDescription
      }
    ];
    
    if (primary.frontModel) {
      description.push({
        type: 'image',
        src: primary.frontModel,
        alt: `${primary.productTitle} - Front view`,
        caption: `${primary.brandName} - ${primary.productTitle}`
      });
    }
    
    // Collect available sizes and colors
    const sizes = Array.from(new Set(variants.map(v => v.size).filter(Boolean)));
    const colors = Array.from(new Set(variants.map(v => v.color).filter(Boolean)));
    
    // Build features
    const features: string[] = [
      `Brand: ${primary.brandName}`,
      `Available Sizes: ${primary.availableSizes || sizes.join(', ')}`,
      `Available Colors: ${colors.length} color${colors.length !== 1 ? 's' : ''}`,
      `Weight: ${primary.pieceWeight} lbs`,
    ];
    
    if (primary.pieceSalePrice) {
      features.push(`On Sale: $${primary.pieceSalePrice} (Regular $${primary.piecePrice})`);
    } else {
      features.push(`Price: Starting at $${primary.piecePrice}`);
    }
    
    // Technical specifications
    const technicalSpecifications: ContentBlock[] = [
      {
        type: 'text',
        content: `
          <h3>Product Specifications</h3>
          <ul>
            <li><strong>Style Code:</strong> ${style}</li>
            <li><strong>Brand:</strong> ${primary.brandName}</li>
            <li><strong>Category:</strong> ${primary.category}</li>
            <li><strong>Weight:</strong> ${primary.pieceWeight} lbs per piece</li>
            <li><strong>Case Size:</strong> ${primary.caseSize} pieces</li>
            <li><strong>Available Sizes:</strong> ${primary.availableSizes}</li>
          </ul>
          
          <h3>Pricing</h3>
          <ul>
            <li><strong>Piece Price:</strong> $${primary.piecePrice}</li>
            ${primary.pieceSalePrice ? `<li><strong>Sale Price:</strong> $${primary.pieceSalePrice}</li>` : ''}
            <li><strong>Dozen Price:</strong> $${primary.dozenPrice}</li>
            <li><strong>Case Price:</strong> $${primary.casePrice}</li>
          </ul>
        `
      }
    ];
    
    const product: Product = {
      id: `sanmar-${style.toLowerCase()}`,
      slug: style.toLowerCase(),
      name: primary.productTitle,
      shortDescription: `${primary.brandName} ${style} - Available in ${colors.length} colors`,
      description,
      category,
      tags: [
        'sanmar',
        primary.brandName.toLowerCase(),
        config.subcategory?.toLowerCase() || '',
        ...primary.keywords.slice(0, 5),
      ].filter(Boolean),
      images,
      features,
      isCustomizable: true, // SanMar products are typically customizable
      technicalSpecifications,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    products.push(product);
  }
  
  return products;
}
