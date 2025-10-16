'use client';

import { mockProducts } from '@/lib/data/mockData';
import ProductCard from '@/components/products/ProductCard';
import CompactProductHeader from '@/components/products/CompactProductHeader';
import Pagination from '@/components/products/Pagination';
import { useProductFilters } from '@/hooks/useProductFilters';
import { usePagination } from '@/hooks/usePagination';

export default function ProductsPage() {
  const {
    filteredProducts,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    totalProducts,
    filteredCount,
    resetFilters
  } = useProductFilters({ products: mockProducts });

  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    paginatedItems,
    totalPages
  } = usePagination({ 
    items: filteredProducts, 
    initialItemsPerPage: 6 // Start with 6 to show pagination better
  });

  return (
    <div className="bg-slate-50 py-8">
      <div className="container mx-auto px-4">
        {/* Compact Header with integrated search, sort, and category menu */}
        <div className="relative">
          <CompactProductHeader
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            allProducts={mockProducts}
            productCount={filteredCount}
            totalProducts={totalProducts}
          />
        </div>
        
        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
              {paginatedItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              itemsPerPage={itemsPerPage}
              totalItems={filteredCount}
              onItemsPerPageChange={setItemsPerPage}
            />
          </>
        ) : (
          /* No Results State */
          <div className="text-center py-12">
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
              {searchTerm || selectedCategory
                ? 'Try adjusting your search terms or filters'
                : 'No products are available at this time'}
            </p>
            {(searchTerm || selectedCategory) && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700 transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}