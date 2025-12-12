// Vendor Filter - Ocultar información de proveedores
// V7MPC Vendor Abstraction System
// CRÍTICO: Solo ocultar nombre de proveedor, PRESERVAR marcas de productos

import type {
  RawVendorProduct,
  VendorFilterOptions,
  VendorFilterResult
} from '@/types/vendors';

// ============================================================================
// VENDOR FILTER CONFIGURATION
// ============================================================================

/**
 * Configuración por defecto para filtrado de proveedor
 * IMPORTANTE: preserveBrands debe ser TRUE
 */
const DEFAULT_FILTER_OPTIONS: VendorFilterOptions = {
  removeVendorName: true,       // ✅ Remover "SanMar", "Alpha Broder", etc.
  removeVendorIds: true,        // ✅ Remover IDs internos de proveedor
  removeVendorMetadata: true,   // ✅ Remover metadata del proveedor
  preserveBrands: true,         // ✅ PRESERVAR marcas: Sport-Tek, Port Authority, etc.
};

// ============================================================================
// VENDOR NAME PATTERNS
// ============================================================================

/**
 * Lista de nombres de proveedores a ocultar
 * NUNCA agregar marcas de productos aquí
 */
const VENDOR_NAMES_TO_HIDE = [
  'sanmar',
  'san mar',
  'alphabroder',
  'alpha broder',
  'ssactivewear',
  'ss activewear',
  's&s activewear',
] as const;

/**
 * Patrones regex para detectar nombres de proveedores
 */
const VENDOR_NAME_PATTERNS = VENDOR_NAMES_TO_HIDE.map(
  name => new RegExp(`\\b${name}\\b`, 'gi')
);

// ============================================================================
// BRAND PRESERVATION
// ============================================================================

/**
 * Lista de marcas de productos que DEBEN preservarse
 * Estas son marcas legítimas de productos, NO proveedores
 */
const BRANDS_TO_PRESERVE = [
  'sport-tek',
  'port authority',
  'ogio',
  'new era',
  'district',
  'nike',
  'adidas',
  'carhartt',
  'red kap',
  'cornerstone',
  'port & company',
  'gildan',
  'hanes',
  'bella',
  'canvas',
  'next level',
] as const;

/**
 * Verifica si un texto es una marca de producto que debe preservarse
 */
function isBrandToPreserve(text: string): boolean {
  const lowerText = text.toLowerCase().trim();
  return BRANDS_TO_PRESERVE.some(brand =>
    lowerText.includes(brand) || brand.includes(lowerText)
  );
}

// ============================================================================
// VENDOR FILTER FUNCTIONS
// ============================================================================

/**
 * Verifica si un texto contiene el nombre de un proveedor
 */
function containsVendorName(text: string): boolean {
  return VENDOR_NAME_PATTERNS.some(pattern => pattern.test(text));
}

/**
 * Remueve el nombre del proveedor de un texto
 * PRESERVA marcas de productos
 */
function removeVendorNameFromText(text: string): string {
  // Si es una marca de producto, NO remover
  if (isBrandToPreserve(text)) {
    return text;
  }

  // Remover solo nombres de proveedores
  let cleaned = text;
  VENDOR_NAME_PATTERNS.forEach(pattern => {
    cleaned = cleaned.replace(pattern, '').trim();
  });

  // Limpiar espacios múltiples
  cleaned = cleaned.replace(/\s+/g, ' ').trim();

  return cleaned || text; // Si quedó vacío, devolver original
}

/**
 * Filtra información del proveedor de un producto crudo
 * CRÍTICO: Solo oculta datos de proveedor, PRESERVA marcas
 */
export function filterVendorInfo(
  product: RawVendorProduct,
  options: Partial<VendorFilterOptions> = {}
): {
  filtered: any;
  result: VendorFilterResult;
} {
  const opts = { ...DEFAULT_FILTER_OPTIONS, ...options };
  const removedFields: string[] = [];

  // Crear copia del producto
  const filtered: any = { ...product };

  // 1. Remover nombre de proveedor (si está habilitado)
  if (opts.removeVendorName) {
    // Remover campo vendorName
    if (filtered.vendorName) {
      delete filtered.vendorName;
      removedFields.push('vendorName');
    }

    // Limpiar título del producto (remover nombre de proveedor)
    if (filtered.rawProductTitle) {
      const originalTitle = filtered.rawProductTitle;
      filtered.rawProductTitle = removeVendorNameFromText(originalTitle);
      if (filtered.rawProductTitle !== originalTitle) {
        removedFields.push('vendorName from title');
      }
    }

    // Limpiar descripción (remover nombre de proveedor)
    if (filtered.rawDescription) {
      const originalDesc = filtered.rawDescription;
      filtered.rawDescription = removeVendorNameFromText(originalDesc);
      if (filtered.rawDescription !== originalDesc) {
        removedFields.push('vendorName from description');
      }
    }
  }

  // 2. Remover IDs de proveedor (si está habilitado)
  if (opts.removeVendorIds) {
    if (filtered.vendorId) {
      // Mover a campo privado _vendor
      if (!filtered._vendor) {
        filtered._vendor = {};
      }
      filtered._vendor.source = filtered.vendorId;
      delete filtered.vendorId;
      removedFields.push('vendorId');
    }

    if (filtered.vendorProductId) {
      if (!filtered._vendor) {
        filtered._vendor = {};
      }
      filtered._vendor.vendorProductId = filtered.vendorProductId;
      delete filtered.vendorProductId;
      removedFields.push('vendorProductId');
    }
  }

  // 3. Remover metadata de proveedor (si está habilitado)
  if (opts.removeVendorMetadata) {
    if (filtered.vendorMetadata) {
      if (!filtered._vendor) {
        filtered._vendor = {};
      }
      filtered._vendor.metadata = filtered.vendorMetadata;
      delete filtered.vendorMetadata;
      removedFields.push('vendorMetadata');
    }
  }

  // 4. PRESERVAR marcas de productos (CRÍTICO)
  if (opts.preserveBrands) {
    // La marca del producto SIEMPRE se preserva
    if (filtered.rawBrandName) {
      // Asegurar que NO se elimine la marca
      // La marca puede ser Sport-Tek, Port Authority, OGIO, etc.
      // NUNCA debe ser el nombre del proveedor
      if (!isBrandToPreserve(filtered.rawBrandName)) {
        // Si la "marca" es realmente el nombre del proveedor, limpiarla
        if (containsVendorName(filtered.rawBrandName)) {
          filtered.rawBrandName = removeVendorNameFromText(filtered.rawBrandName);
        }
      }
    }
  }

  // 5. Marcar como filtrado
  if (!filtered._vendor) {
    filtered._vendor = {};
  }
  filtered._vendor.hidden = true;

  return {
    filtered,
    result: {
      filtered: removedFields.length > 0,
      removedFields
    }
  };
}

/**
 * Valida que un producto filtrado no contenga información de proveedor
 */
export function validateVendorFilter(product: any): {
  isValid: boolean;
  violations: string[];
} {
  const violations: string[] = [];

  // Verificar campos que NO deben estar presentes
  const forbiddenFields = ['vendorName', 'vendorId', 'vendorMetadata'];
  forbiddenFields.forEach(field => {
    if (product[field]) {
      violations.push(`Field '${field}' should be removed`);
    }
  });

  // Verificar que no haya nombres de proveedores en textos
  const textFields = ['rawProductTitle', 'rawDescription', 'name', 'description'];
  textFields.forEach(field => {
    if (product[field] && typeof product[field] === 'string') {
      if (containsVendorName(product[field])) {
        violations.push(`Vendor name found in '${field}'`);
      }
    }
  });

  // Verificar que las marcas estén preservadas
  if (product.rawBrandName || product.brand) {
    const brand = product.rawBrandName || product.brand;
    if (isBrandToPreserve(brand)) {
      // OK - es una marca legítima
    } else if (containsVendorName(brand)) {
      violations.push(`Vendor name in brand field: '${brand}'`);
    }
  }

  return {
    isValid: violations.length === 0,
    violations
  };
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Obtiene la lista de nombres de proveedores a ocultar
 */
export function getVendorNamesToHide(): readonly string[] {
  return VENDOR_NAMES_TO_HIDE;
}

/**
 * Obtiene la lista de marcas a preservar
 */
export function getBrandsToPreserve(): readonly string[] {
  return BRANDS_TO_PRESERVE;
}

/**
 * Verifica si un texto es un nombre de proveedor
 */
export function isVendorName(text: string): boolean {
  return containsVendorName(text);
}

/**
 * Verifica si un texto es una marca de producto
 */
export function isProductBrand(text: string): boolean {
  return isBrandToPreserve(text);
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  DEFAULT_FILTER_OPTIONS,
  VENDOR_NAMES_TO_HIDE,
  BRANDS_TO_PRESERVE
};

// Usage:
// import { filterVendorInfo, validateVendorFilter } from '@/lib/vendors/vendor-filter';
//
// const { filtered, result } = filterVendorInfo(rawProduct);
// console.log('Removed fields:', result.removedFields);
//
// const validation = validateVendorFilter(filtered);
// if (!validation.isValid) {
//   console.error('Validation errors:', validation.violations);
// }
