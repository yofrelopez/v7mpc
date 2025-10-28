'use client';

import { mockProducts } from '@/lib/data/mockData';
import { getCategoryBySlug } from '@/lib/data/categories';
import ProductCard from '@/components/products/ProductCard';
import CompactProductHeader from '@/components/products/CompactProductHeader';
import Pagination from '@/components/products/Pagination';
import CategoryHero from '@/components/products/CategoryHero';
import { useProductFilters } from '@/hooks/useProductFilters';
import { usePagination } from '@/hooks/usePagination';

export default function JewelryRecognitionPage() {
  // Get category info
  const category = getCategoryBySlug('jewelry-recognition');
  
  // Pre-filter products by jewelry-recognition category
  const categoryProducts = mockProducts.filter(
    product => product.category.slug === 'jewelry-recognition'
  );

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
    resetFilters,
    categoryLocked
  } = useProductFilters({ 
    products: categoryProducts,
    initialCategory: 'jewelry-recognition',
    categoryLocked: true
  });

  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    paginatedItems,
    totalPages
  } = usePagination({ 
    items: filteredProducts, 
    initialItemsPerPage: 6
  });

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div className="bg-slate-50">
      
      {/* Category Hero Section */}
      <CategoryHero 
        category={category}
        productCount={categoryProducts.length}
        subcategoryTags={['Medals', 'Pins & Badges', 'Awards & Plaques', 'Custom Jewelry']}
        features={['Custom Design Services', 'Quality Guaranteed', 'Fast Turnaround']}
        heroImage="/images/products/jewelry.png"
      />

      <div className="container mx-auto px-4 py-8">
        {/* Compact Header with integrated search and sort - category locked to Jewelry & Recognition */}
        <div className="relative">
          <CompactProductHeader
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            allProducts={categoryProducts}
            productCount={filteredCount}
            totalProducts={totalProducts}
            categoryLocked={categoryLocked}
            pageTitle="Jewelry & Recognition"
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
              {searchTerm
                ? 'Try adjusting your search terms'
                : 'No products are available in this category at this time'}
            </p>
            {searchTerm && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700 transition-colors"
              >
                Clear search
              </button>
            )}
          </div>
        )}
        
        {/* Future Subcategories Section - Placeholder */}
        <div className="mt-16 p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-center">
            <h3 className="font-primary text-2xl font-semibold text-slate-900 mb-4">
              Explore Subcategories
            </h3>
            <p className="font-accent text-slate-600 mb-6">
              Browse our specialized selection within Jewelry & Recognition
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="font-primary font-semibold text-slate-900 mb-1">Medals</h4>
                <p className="font-accent text-sm text-slate-600">Coming Soon</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="font-primary font-semibold text-slate-900 mb-1">Pins & Badges</h4>
                <p className="font-accent text-sm text-slate-600">Coming Soon</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="font-primary font-semibold text-slate-900 mb-1">Awards & Plaques</h4>
                <p className="font-accent text-sm text-slate-600">Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}