// Taxonomy System - TypeScript Definitions
// V7MPC Product Categorization & Classification System
// Sistema de Categorización Automática de Productos

// ============================================================================
// CATEGORIZATION TYPES
// ============================================================================

/**
 * Representa el resultado de categorizar un producto
 */
export interface CategorizationResult {
  categoryId: string;           // ID de la categoría principal (ej: 'by-type')
  subcategoryId: string;        // ID de la subcategoría (ej: 't-shirts')
  confidence: number;           // Confianza de la categorización (0-1)
  matchedRules: string[];       // Reglas que coincidieron
}

/**
 * Reglas de categorización para una categoría específica
 */
export interface CategoryRule {
  keywords: string[];           // Palabras clave para coincidencia
  exclude?: string[];           // Palabras clave para excluir
  minConfidence: number;        // Confianza mínima requerida (0-1)
  patterns?: RegExp[];          // Patrones regex opcionales
  features?: string[];          // Características del producto
}

/**
 * Definición de una subcategoría
 */
export interface Subcategory {
  id: string;                   // ID único (ej: 't-shirts')
  slug: string;                 // URL slug (ej: 't-shirts')
  name: string;                 // Nombre para mostrar (ej: 'T-Shirts')
  description?: string;         // Descripción opcional
  icon?: string;                // Nombre del ícono de Lucide
  rules: CategoryRule;          // Reglas de categorización
  productCount?: number;        // Contador de productos (calculado)
}

/**
 * Definición de una categoría principal
 */
export interface Category {
  id: string;                   // ID único (ej: 'by-type')
  slug: string;                 // URL slug
  name: string;                 // Nombre para mostrar (ej: 'By Type')
  description?: string;         // Descripción opcional
  subcategories: Subcategory[]; // Subcategorías
  isDynamic?: boolean;          // Si se genera dinámicamente
}

/**
 * Taxonomía completa del sistema
 */
export interface CategoryTaxonomy {
  featured: Category;           // Productos destacados
  byType: Category;             // Por tipo de producto
  byBrand: Category;            // Por marca (dinámico)
}

// ============================================================================
// BRAND TYPES
// ============================================================================

/**
 * Representa una marca de producto
 */
export interface Brand {
  id: string;                   // ID único (slug de la marca)
  name: string;                 // Nombre de la marca (ej: 'Sport-Tek')
  slug: string;                 // URL slug
  description?: string;         // Descripción de la marca
  logo?: string;                // URL del logo
  productCount: number;         // Número de productos de esta marca
}

// ============================================================================
// PRODUCT NORMALIZATION TYPES
// ============================================================================

/**
 * Información del proveedor (oculta en UI)
 * Solo para uso interno, nunca se muestra al cliente
 */
export interface VendorInfo {
  source: string;               // ID del proveedor (ej: 'sanmar')
  vendorName: string;           // Nombre del proveedor (ej: 'SanMar')
  originalBrand?: string;       // Marca original del proveedor
  vendorProductId?: string;     // ID del producto en el sistema del proveedor
  hidden: true;                 // Bandera para indicar que está oculto
}

/**
 * Producto normalizado con información de proveedor oculta
 * Extiende el tipo Product básico
 */
export interface NormalizedProduct {
  id: string;                   // ID único del producto
  name: string;                 // Nombre del producto (sin marca de proveedor)
  brand: string;                // Marca del producto (visible al cliente)
  shortDescription?: string;    // Descripción corta
  description: string;          // Descripción completa
  images: string[];             // Imágenes del producto
  features: string[];           // Características
  isCustomizable: boolean;      // Si es personalizable
  tags: string[];               // Etiquetas

  // Información de categorización
  categories?: CategorizationResult[];  // Categorías asignadas

  // Información del proveedor (solo interno, nunca en UI)
  _vendor: VendorInfo;          // Prefijo _ indica que es privado/interno

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// CATEGORIZATION ENGINE TYPES
// ============================================================================

/**
 * Configuración del motor de categorización
 */
export interface CategorizerConfig {
  minConfidence: number;        // Confianza mínima global (0-1)
  allowMultipleCategories: boolean;  // Permitir múltiples categorías
  maxCategories?: number;       // Máximo de categorías por producto
}

/**
 * Resultado del análisis de reglas
 */
export interface RuleMatchResult {
  matched: boolean;             // Si la regla coincidió
  confidence: number;           // Confianza de la coincidencia (0-1)
  matchedKeywords: string[];    // Keywords que coincidieron
  matchType: 'keyword' | 'pattern' | 'feature' | 'composite';
}

/**
 * Índice de categorías para caché
 */
export interface CategoryIndex {
  [categorySlug: string]: {
    category: Category;
    products: NormalizedProduct[];
    lastUpdated: Date;
  };
}

// ============================================================================
// FILTERING TYPES
// ============================================================================

/**
 * Filtros de productos disponibles
 */
export interface ProductFilters {
  productTypes?: string[];      // Tipos de producto (t-shirts, polos, etc.)
  brands?: string[];            // Marcas seleccionadas
  features?: string[];          // Características (on-sale, new, etc.)
  priceRange?: {
    min?: number;
    max?: number;
  };
}

/**
 * Opciones de ordenamiento
 */
export type SortOption =
  | 'name_asc'
  | 'name_desc'
  | 'brand_asc'
  | 'brand_desc'
  | 'newest'
  | 'price_asc'
  | 'price_desc';

/**
 * Resultado de filtrado de productos
 */
export interface FilteredProductsResult {
  products: NormalizedProduct[];
  totalCount: number;
  appliedFilters: ProductFilters;
  availableFilters: {
    productTypes: Array<{ id: string; name: string; count: number }>;
    brands: Array<{ id: string; name: string; count: number }>;
    features: Array<{ id: string; name: string; count: number }>;
  };
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Función para slugificar texto
 */
export type SlugifyFunction = (text: string) => string;

/**
 * Función para normalizar producto
 */
export type ProductNormalizer = (rawProduct: any) => NormalizedProduct;

/**
 * Función para categorizar producto
 */
export type ProductCategorizer = (product: NormalizedProduct) => CategorizationResult[];

// ============================================================================
// EXPORTS
// ============================================================================

// Usage:
// import {
//   NormalizedProduct,
//   Category,
//   Brand,
//   CategorizationResult
// } from '@/types/taxonomy';
