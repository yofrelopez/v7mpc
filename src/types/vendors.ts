// Vendor Abstraction Layer - TypeScript Definitions
// V7MPC Multi-Vendor Product Integration System
// Sistema para ocultar información de proveedores y normalizar productos

// ============================================================================
// VENDOR TYPES
// ============================================================================

/**
 * Identificadores de proveedores soportados
 */
export type VendorId = 'sanmar' | 'alphabroder' | 'ssactivewear' | 'custom';

/**
 * Configuración de un proveedor
 */
export interface VendorConfig {
  id: VendorId;                 // ID único del proveedor
  name: string;                 // Nombre del proveedor (NUNCA se muestra en UI)
  apiType: 'soap' | 'rest' | 'graphql' | 'custom';
  enabled: boolean;             // Si el proveedor está activo
  priority: number;             // Prioridad (1 = más alta)
}

/**
 * Producto crudo del proveedor (antes de normalizar)
 */
export interface RawVendorProduct {
  vendorId: VendorId;           // ID del proveedor
  vendorName: string;           // Nombre del proveedor
  vendorProductId: string;      // ID del producto en el sistema del proveedor
  rawBrandName?: string;        // Marca original del proveedor
  rawProductTitle: string;      // Título original del producto
  rawDescription?: string;      // Descripción original
  rawImages?: string[];         // URLs de imágenes originales
  rawPrice?: number;            // Precio original
  rawSalePrice?: number;        // Precio de oferta original
  rawFeatures?: string[];       // Características originales
  rawCategories?: string[];     // Categorías del proveedor
  rawTags?: string[];           // Etiquetas originales
  isCustomizable?: boolean;     // Si es personalizable

  // Metadata del proveedor
  vendorMetadata?: Record<string, any>;  // Datos adicionales del proveedor
}

// ============================================================================
// BRAND MAPPING TYPES
// ============================================================================

/**
 * Mapeo de marca de proveedor a marca V7MPC
 */
export interface BrandMapping {
  vendorBrand: string;          // Marca original del proveedor
  v7mpcBrand: string;           // Marca como se mostrará en V7MPC
  displayName: string;          // Nombre para mostrar al cliente
  description?: string;         // Descripción de la marca
  logo?: string;                // URL del logo de la marca
  priority: number;             // Prioridad de visualización
}

/**
 * Configuración de mapeo de marcas por proveedor
 */
export interface VendorBrandMappings {
  [vendorId: string]: {
    [vendorBrand: string]: BrandMapping;
  };
}

// ============================================================================
// NORMALIZATION TYPES
// ============================================================================

/**
 * Configuración del normalizador de productos
 */
export interface NormalizationConfig {
  hideVendorName: boolean;      // Si ocultar el nombre del proveedor
  preserveBrands: boolean;      // Si preservar las marcas de productos
  defaultBrand: string;         // Marca por defecto si no hay mapeo
  imageOptimization: boolean;   // Si optimizar imágenes
  priceRounding: boolean;       // Si redondear precios
}

/**
 * Resultado de la normalización
 */
export interface NormalizationResult {
  success: boolean;             // Si la normalización fue exitosa
  product?: any;                // Producto normalizado (tipo NormalizedProduct)
  errors?: string[];            // Errores durante normalización
  warnings?: string[];          // Advertencias durante normalización
}

// ============================================================================
// VENDOR ADAPTER TYPES
// ============================================================================

/**
 * Interfaz para adaptadores de proveedor
 * Cada proveedor implementa este contrato
 */
export interface VendorAdapter {
  vendorId: VendorId;

  /**
   * Obtener productos del proveedor
   */
  fetchProducts(): Promise<RawVendorProduct[]>;

  /**
   * Obtener un producto específico
   */
  fetchProduct(productId: string): Promise<RawVendorProduct | null>;

  /**
   * Buscar productos
   */
  searchProducts(query: string): Promise<RawVendorProduct[]>;

  /**
   * Validar configuración del proveedor
   */
  validateConfig(): Promise<boolean>;
}

/**
 * Registry de adaptadores de proveedores
 */
export interface VendorAdapterRegistry {
  [vendorId: string]: VendorAdapter;
}

// ============================================================================
// VENDOR FILTER TYPES
// ============================================================================

/**
 * Opciones para filtrar información de proveedor
 */
export interface VendorFilterOptions {
  removeVendorName: boolean;    // Remover nombre de proveedor
  removeVendorIds: boolean;     // Remover IDs de proveedor
  removeVendorMetadata: boolean; // Remover metadata de proveedor
  preserveBrands: boolean;      // Preservar marcas de productos
}

/**
 * Resultado del filtrado de proveedor
 */
export interface VendorFilterResult {
  filtered: boolean;            // Si se filtró información
  removedFields: string[];      // Campos que se removieron
}

// ============================================================================
// VENDOR SYNC TYPES
// ============================================================================

/**
 * Estado de sincronización con proveedor
 */
export interface VendorSyncStatus {
  vendorId: VendorId;
  lastSyncAt?: Date;            // Última sincronización exitosa
  nextSyncAt?: Date;            // Próxima sincronización programada
  status: 'idle' | 'syncing' | 'error' | 'success';
  error?: string;               // Error si lo hay
  productsCount?: number;       // Número de productos sincronizados
}

/**
 * Configuración de sincronización
 */
export interface SyncConfig {
  enabled: boolean;             // Si la sincronización está activa
  intervalHours: number;        // Intervalo en horas
  autoSync: boolean;            // Si sincronizar automáticamente
  batchSize: number;            // Tamaño del lote
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Función para normalizar producto de proveedor
 */
export type VendorProductNormalizer = (
  raw: RawVendorProduct,
  config: NormalizationConfig
) => NormalizationResult;

/**
 * Función para mapear marca
 */
export type BrandMapper = (
  vendorId: VendorId,
  vendorBrand: string
) => BrandMapping | null;

// ============================================================================
// EXPORTS
// ============================================================================

// Usage:
// import {
//   VendorId,
//   RawVendorProduct,
//   VendorAdapter,
//   BrandMapping
// } from '@/types/vendors';
