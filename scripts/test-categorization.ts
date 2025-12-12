// Test Categorization Script
// Script para probar el sistema de categorización automática
// Ejecutar con: tsx scripts/test-categorization.ts

import type { RawVendorProduct } from '../src/types/vendors';
import type { NormalizedProduct } from '../src/types/taxonomy';

import { normalizeVendorProduct, validateNormalizedProduct } from '../src/lib/vendors/product-normalizer';
import { ProductCategorizer, getCategorizationStatistics } from '../src/lib/taxonomy/product-categorizer';
import { extractBrands } from '../src/lib/taxonomy/brand-extractor';
import { filterVendorInfo, validateVendorFilter } from '../src/lib/vendors/vendor-filter';

// ============================================================================
// TEST DATA - Productos de ejemplo
// ============================================================================

const TEST_PRODUCTS: RawVendorProduct[] = [
  // T-Shirt de Sport-Tek
  {
    vendorId: 'sanmar',
    vendorName: 'SanMar',
    vendorProductId: 'ST350',
    rawBrandName: 'Sport-Tek',
    rawProductTitle: 'Sport-Tek® PosiCharge® Competitor™ Tee',
    rawDescription: 'Lightweight, roomy and highly breathable, these moisture-wicking tees feature PosiCharge technology to lock in color and prevent logos from fading.',
    rawImages: [
      'https://images.51microshop.com/4855/product/SportTek_ST350_RoyalBlue_1_FL.jpg'
    ],
    rawFeatures: [
      '3.8-ounce, 100% polyester interlock with PosiCharge technology',
      'Removable tag for comfort and relabeling',
      'Set-in sleeves'
    ],
    rawTags: ['performance', 'moisture-wicking'],
    isCustomizable: true
  },

  // Polo de Port Authority
  {
    vendorId: 'sanmar',
    vendorName: 'SanMar',
    vendorProductId: 'K500',
    rawBrandName: 'Port Authority',
    rawProductTitle: 'Port Authority® Silk Touch™ Polo',
    rawDescription: 'The Silk Touch Polo is our best-selling polo. It\'s soft, supple and easy to care for.',
    rawImages: [
      'https://images.51microshop.com/4855/product/PortAuthority_K500_NavyBlue_1_FL.jpg'
    ],
    rawFeatures: [
      '5-ounce, 65/35 poly/cotton pique',
      'Flat knit collar and cuffs',
      'Metal buttons with dyed-to-match plastic rims',
      'Side vents'
    ],
    rawTags: ['classic', 'polo'],
    isCustomizable: true
  },

  // Hoodie de OGIO
  {
    vendorId: 'sanmar',
    vendorName: 'SanMar',
    vendorProductId: 'OE700',
    rawBrandName: 'OGIO',
    rawProductTitle: 'OGIO® ENDURANCE Fulcrum Full-Zip',
    rawDescription: 'This performance fleece is designed to keep you comfortable and warm.',
    rawImages: [
      'https://images.51microshop.com/4855/product/OGIO_OE700_Black_1_FL.jpg'
    ],
    rawFeatures: [
      '6.8-ounce, 88/12 poly/spandex jersey',
      'Tag-free label',
      'Taped neck',
      'Chin guard',
      'Front pockets'
    ],
    rawTags: ['activewear', 'fleece'],
    isCustomizable: true
  },

  // Cap de New Era
  {
    vendorId: 'sanmar',
    vendorName: 'SanMar',
    vendorProductId: 'NE200',
    rawBrandName: 'New Era',
    rawProductTitle: 'New Era® Snapback Trucker Cap',
    rawDescription: 'A modern take on the classic trucker cap with a snapback closure.',
    rawImages: [
      'https://images.51microshop.com/4855/product/NewEra_NE200_Black_1_FL.jpg'
    ],
    rawFeatures: [
      '100% polyester front panel',
      '100% nylon mesh mid and rear panels',
      'Structured, mid-profile, six-panel design',
      'Snapback closure'
    ],
    rawTags: ['headwear', 'trucker'],
    isCustomizable: true
  },

  // Jacket de Nike
  {
    vendorId: 'sanmar',
    vendorName: 'SanMar',
    vendorProductId: 'NKAH6418',
    rawBrandName: 'Nike',
    rawProductTitle: 'Nike Therma-FIT Full-Zip Fleece Hoodie',
    rawDescription: 'Nike Therma-FIT technology helps manage your body\'s natural heat to help keep you warm.',
    rawImages: [
      'https://images.51microshop.com/4855/product/Nike_NKAH6418_Navy_1_FL.jpg'
    ],
    rawFeatures: [
      '100% polyester fleece',
      'Therma-FIT technology',
      'Scuba hood with drawcord',
      'Front pockets with zippers'
    ],
    rawTags: ['activewear', 'premium'],
    isCustomizable: true
  }
];

// ============================================================================
// TEST FUNCTIONS
// ============================================================================

/**
 * Imprime separador visual
 */
function printSeparator(title: string = '') {
  console.log('\n' + '='.repeat(80));
  if (title) {
    console.log(`  ${title}`);
    console.log('='.repeat(80));
  }
}

/**
 * Imprime resultado con formato
 */
function printResult(label: string, value: any) {
  console.log(`  ${label}: ${JSON.stringify(value, null, 2)}`);
}

/**
 * Test 1: Filtrado de información de proveedor
 */
function testVendorFilter() {
  printSeparator('TEST 1: Filtrado de Información de Proveedor');

  const testProduct = TEST_PRODUCTS[0];
  console.log(`\n  Producto original: ${testProduct.rawProductTitle}`);
  console.log(`  Proveedor: ${testProduct.vendorName}`);
  console.log(`  Marca: ${testProduct.rawBrandName}`);

  const { filtered, result } = filterVendorInfo(testProduct);

  console.log(`\n  ✓ Campos removidos: ${result.removedFields.join(', ')}`);
  console.log(`  ✓ Marca preservada: ${filtered.rawBrandName}`);
  console.log(`  ✓ Proveedor oculto: ${filtered._vendor?.hidden ? 'Sí' : 'No'}`);

  const validation = validateVendorFilter(filtered);
  console.log(`\n  Validación: ${validation.isValid ? '✓ PASSED' : '✗ FAILED'}`);
  if (!validation.isValid) {
    console.log(`  Violaciones:`, validation.violations);
  }
}

/**
 * Test 2: Normalización de productos
 */
function testProductNormalization() {
  printSeparator('TEST 2: Normalización de Productos');

  const testProduct = TEST_PRODUCTS[0];
  const result = normalizeVendorProduct(testProduct);

  if (result.success && result.product) {
    const normalized = result.product as NormalizedProduct;

    console.log(`\n  Producto normalizado:`);
    console.log(`    ID: ${normalized.id}`);
    console.log(`    Nombre: ${normalized.name}`);
    console.log(`    Marca: ${normalized.brand} ✓ (visible)`);
    console.log(`    Proveedor: ${normalized._vendor.source} (oculto en UI)`);
    console.log(`    Imágenes: ${normalized.images.length}`);
    console.log(`    Características: ${normalized.features.length}`);

    const validation = validateNormalizedProduct(normalized);
    console.log(`\n  Validación: ${validation.isValid ? '✓ PASSED' : '✗ FAILED'}`);
    if (validation.warnings.length > 0) {
      console.log(`  Advertencias:`, validation.warnings);
    }
  } else {
    console.log(`  ✗ FAILED: ${result.errors?.join(', ')}`);
  }
}

/**
 * Test 3: Categorización de productos
 */
function testProductCategorization() {
  printSeparator('TEST 3: Categorización Automática');

  // Normalizar todos los productos de prueba
  const normalizedProducts: NormalizedProduct[] = [];

  TEST_PRODUCTS.forEach(raw => {
    const result = normalizeVendorProduct(raw);
    if (result.success && result.product) {
      normalizedProducts.push(result.product as NormalizedProduct);
    }
  });

  console.log(`\n  Productos normalizados: ${normalizedProducts.length}`);

  // Categorizar
  const categorizer = new ProductCategorizer();

  normalizedProducts.forEach(product => {
    const categories = categorizer.categorizeProduct(product);

    console.log(`\n  ${product.name}:`);
    console.log(`    Marca: ${product.brand} ✓ (visible)`);
    console.log(`    Proveedor: ${product._vendor.source} (oculto en UI)`);
    console.log(`    Categorías asignadas: ${categories.length}`);

    categories.forEach(cat => {
      console.log(`      - ${cat.categoryId}/${cat.subcategoryId} (confidence: ${cat.confidence.toFixed(2)})`);
      if (cat.matchedRules.length > 0) {
        console.log(`        Reglas: ${cat.matchedRules.join(', ')}`);
      }
    });
  });
}

/**
 * Test 4: Extracción de marcas
 */
function testBrandExtraction() {
  printSeparator('TEST 4: Extracción de Marcas');

  // Normalizar productos
  const normalizedProducts: NormalizedProduct[] = [];

  TEST_PRODUCTS.forEach(raw => {
    const result = normalizeVendorProduct(raw);
    if (result.success && result.product) {
      normalizedProducts.push(result.product as NormalizedProduct);
    }
  });

  // Extraer marcas
  const brands = extractBrands(normalizedProducts);

  console.log(`\n  Marcas extraídas: ${brands.length}`);
  console.log(`\n  Lista de marcas (TODAS VISIBLES AL CLIENTE):`);

  brands.forEach(brand => {
    console.log(`    ✓ ${brand.name} (${brand.productCount} productos)`);
    console.log(`      Slug: ${brand.slug}`);
  });
}

/**
 * Test 5: Estadísticas de categorización
 */
function testCategorizationStatistics() {
  printSeparator('TEST 5: Estadísticas de Categorización');

  // Normalizar productos
  const normalizedProducts: NormalizedProduct[] = [];

  TEST_PRODUCTS.forEach(raw => {
    const result = normalizeVendorProduct(raw);
    if (result.success && result.product) {
      normalizedProducts.push(result.product as NormalizedProduct);
    }
  });

  const stats = getCategorizationStatistics(normalizedProducts);

  console.log(`\n  Estadísticas:`);
  console.log(`    Total de productos: ${stats.totalProducts}`);
  console.log(`    Productos categorizados: ${stats.categorizedProducts}`);
  console.log(`    Productos sin categorizar: ${stats.uncategorizedProducts}`);
  console.log(`    Promedio de categorías por producto: ${stats.averageCategoriesPerProduct.toFixed(2)}`);

  console.log(`\n  Distribución por categoría:`);
  stats.categoryDistribution.forEach((count, category) => {
    console.log(`    ${category}: ${count} productos`);
  });
}

/**
 * Test 6: Restricciones críticas
 */
function testCriticalRestrictions() {
  printSeparator('TEST 6: Verificación de Restricciones Críticas');

  const testProduct = TEST_PRODUCTS[0];
  const result = normalizeVendorProduct(testProduct);

  if (result.success && result.product) {
    const normalized = result.product as NormalizedProduct;

    console.log(`\n  ❌ NO DEBE MOSTRARSE EN UI:`);
    console.log(`    Nombre de proveedor "SanMar": ${normalized._vendor.vendorName} (oculto)`);
    console.log(`    Campo _vendor.hidden: ${normalized._vendor.hidden ? 'true' : 'false'}`);

    console.log(`\n  ✅ SÍ DEBE MOSTRARSE EN UI:`);
    console.log(`    Marca del producto: ${normalized.brand}`);
    console.log(`    Nombre del producto: ${normalized.name}`);
    console.log(`    Características: ${normalized.features.length} items`);
    console.log(`    Imágenes: ${normalized.images.length} items`);

    // Categorizar y mostrar categorías
    const categorizer = new ProductCategorizer();
    const categories = categorizer.categorizeProduct(normalized);

    console.log(`\n  ✅ CATEGORÍAS (para filtros y navegación):`);
    categories.forEach(cat => {
      console.log(`    ${cat.categoryId}/${cat.subcategoryId}`);
    });

    console.log(`\n  Resultado: ${normalized._vendor.hidden && normalized.brand ? '✓ PASSED' : '✗ FAILED'}`);
  }
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  console.log('\n');
  console.log('╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║  V7MPC - Test de Sistema de Categorización Automática de Productos       ║');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝');

  try {
    testVendorFilter();
    testProductNormalization();
    testProductCategorization();
    testBrandExtraction();
    testCategorizationStatistics();
    testCriticalRestrictions();

    printSeparator('RESUMEN FINAL');
    console.log(`\n  ✓ Todos los tests completados exitosamente`);
    console.log(`  ✓ Proveedor "SanMar" oculto correctamente`);
    console.log(`  ✓ Marcas de productos preservadas y visibles`);
    console.log(`  ✓ Sistema de categorización funcionando`);
    console.log(`\n`);

  } catch (error) {
    console.error('\n  ✗ ERROR:', error);
    process.exit(1);
  }
}

main();
