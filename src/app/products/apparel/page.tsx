'use client';

import { mockProducts } from '@/lib/data/mockData';
import { getCategoryBySlug } from '@/lib/data/categories';
import ProductCard from '@/components/products/ProductCard';
import CompactProductHeader from '@/components/products/CompactProductHeader';
import Pagination from '@/components/products/Pagination';
import CategoryHero from '@/components/products/CategoryHero';
import { useProductFilters } from '@/hooks/useProductFilters';
import { usePagination } from '@/hooks/usePagination';

export default function ApparelPage() {
  // Get category info
  const category = getCategoryBySlug('apparel');
  
  // Pre-filter products by apparel category
  const categoryProducts = mockProducts.filter(
    product => product.category.slug === 'apparel'
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
    initialCategory: 'apparel',
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

  // Custom category data for apparel with gradient highlight
  const apparelCategory = {
    ...category,
    name: 'Apparel That Unites',
    highlightText: 'Your Team',
    description: 'Elevate your organization\'s presence with premium uniforms and apparel designed for comfort, performance, and brand consistency. From schools to government offices, our tailored solutions ensure every team looks as professional as the work they do.'
  };

  return (
    <div className="bg-slate-50">
      
      {/* Category Hero Section */}
      <CategoryHero 
        category={apparelCategory}
        productCount={categoryProducts.length}
        subcategoryTags={['Uniforms', 'T-Shirts', 'Polo Shirts', 'Jackets', 'Hats & Caps']}
        features={['Premium Materials', 'Custom Embroidery', 'Bulk Ordering']}
        heroImage="/images/products/apparel.png"
        customGradient="from-slate-800 to-slate-900"
        showButtons={false}
        imagePosition="object-right object-center sm:object-center sm:object-[center_75%]"
      />

      <div className="container mx-auto px-4 py-8">
        {/* Compact Header with integrated search and sort - category locked to Apparel */}
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
            pageTitle="Apparel"
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
              No apparel products found
            </h3>
            <p className="text-slate-500 mb-4">
              {searchTerm
                ? 'Try adjusting your search terms'
                : 'No apparel products are available at this time'}
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
      </div>
    </div>
  );
}