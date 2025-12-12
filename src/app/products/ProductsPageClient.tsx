'use client';

import { Product } from '@/types/products';
import ProductCard from '@/components/products/ProductCard';
import CompactProductHeader from '@/components/products/CompactProductHeader';
import Pagination from '@/components/products/Pagination';
import { useProductFilters } from '@/hooks/useProductFilters';
import { usePagination } from '@/hooks/usePagination';

interface ProductsPageClientProps {
  products: Product[];
}

import ProductSidebar from '@/components/products/ProductSidebar';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import BrandWall from '@/components/products/BrandWall';

export default function ProductsPageClient({ products }: ProductsPageClientProps) {
  const searchParams = useSearchParams();
  const showBrands = searchParams.get('show') === 'brands';

  const {
    filteredProducts,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedBrand,
    setSelectedBrand,
    selectedType,
    setSelectedType,
    sortBy,
    setSortBy,
    totalProducts,
    filteredCount,
    resetFilters
  } = useProductFilters({
    products,
    initialCategory: searchParams.get('category'),
    initialBrand: searchParams.get('brand'),
    initialType: searchParams.get('type')
  });

  // Sync with URL params on change
  useEffect(() => {
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const type = searchParams.get('type');

    if (category) setSelectedCategory(category);
    if (brand) setSelectedBrand(brand);
  }, [searchParams, setSelectedCategory, setSelectedBrand]);

  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    paginatedItems,
    totalPages
  } = usePagination({
    items: filteredProducts,
    initialItemsPerPage: 24
  });

  // RENDER BRAND WALL IF REQUESTED
  if (showBrands) {
    return (
      <div className="bg-slate-50 py-8">
        <div className="container mx-auto px-4">
          {/* Reuse CompactHeader just for consistency or a custom back button */}
          <div className="mb-6">
            <button
              onClick={() => window.history.back()}
              className="text-sm text-slate-500 hover:text-slate-800 flex items-center gap-1"
            >
              ← Back to Products
            </button>
          </div>
          <BrandWall products={products} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 py-8">
      <div className="container mx-auto px-4">

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <ProductSidebar
              selectedType={selectedType}
              onTypeChange={setSelectedType}
              selectedBrand={selectedBrand}
              onBrandChange={setSelectedBrand}
            />
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Compact Header */}
            <div className="relative mb-6">
              <CompactProductHeader
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                sortBy={sortBy}
                onSortChange={setSortBy}
                allProducts={products}
                productCount={filteredCount}
                totalProducts={totalProducts}
              />
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {paginatedItems.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    itemsPerPage={itemsPerPage}
                    totalItems={filteredCount}
                    onItemsPerPageChange={setItemsPerPage}
                  />
                </div>
              </>
            ) : (
              /* No Results State */
              <div className="text-center py-12 bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="text-slate-400 mb-4">
                  <svg
                    className="mx-auto h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.071-2.33"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-slate-600 mb-2">
                  No products found
                </h3>
                <p className="text-slate-500 mb-4">
                  {searchTerm || selectedCategory || selectedBrand || selectedType
                    ? 'Try adjusting your search terms or filters'
                    : 'No products are available at this time'}
                </p>
                {(searchTerm || selectedCategory || selectedBrand || selectedType) && (
                  <button
                    onClick={resetFilters}
                    className="inline-flex items-center px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700 transition-colors"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}