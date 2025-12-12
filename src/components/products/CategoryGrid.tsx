'use client';

// CategoryGrid.tsx
// Displays a grid of products with sorting, pagination, and view options.
// Used primarily in Brand and Category pages.

import { useState } from 'react';
import { Product } from '@/types/products';
import ProductCard from './ProductCard';
import Pagination from './Pagination';
import { usePagination } from '@/hooks/usePagination';
import { useProductFilters } from '@/hooks/useProductFilters';
import { LayoutGrid, Grid3x3 } from 'lucide-react';

interface CategoryGridProps {
    products: Product[];
    categoryName: string;
    showSorting?: boolean;
    showViewToggle?: boolean;
    itemsPerPage?: number;
}

export default function CategoryGrid({
    products,
    categoryName,
    showSorting = true,
    showViewToggle = true,
    itemsPerPage: initialItemsPerPage = 12
}: CategoryGridProps) {
    // Use filter hook for sorting functionality
    // We pass the full products list; useProductFilters handles sorting.
    const {
        filteredProducts, // sorted products
        sortBy,
        setSortBy,
        totalProducts
    } = useProductFilters({ products });

    // Pagination hook
    const {
        currentPage,
        setCurrentPage,
        itemsPerPage, // managed by hook
        setItemsPerPage,
        paginatedItems,
        totalPages
    } = usePagination({
        items: filteredProducts,
        initialItemsPerPage
    });

    // View state (3 or 4 columns)
    const [viewMode, setViewMode] = useState<'normal' | 'compact'>('normal');

    return (
        <div className="w-full">
            {/* Header Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">

                {/* Title & Count */}
                <div>
                    <h2 className="text-xl font-bold text-slate-800">{categoryName}</h2>
                    <p className="text-sm text-slate-500">{totalProducts} products found</p>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3 self-end sm:self-auto">

                    {/* Sorting */}
                    {showSorting && (
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-600 hidden sm:inline">Sort by:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as any)}
                                className="text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-200 focus:border-slate-400 py-1.5 pl-2 pr-8 bg-white"
                            >
                                <option value="featured">Featured</option>
                                <option value="newest">Newest</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="name-asc">Name: A-Z</option>
                                <option value="name-desc">Name: Z-A</option>
                            </select>
                        </div>
                    )}

                    {/* View Toggle */}
                    {showViewToggle && (
                        <div className="flex items-center border border-slate-200 rounded-lg p-1 bg-white shadow-sm">
                            <button
                                onClick={() => setViewMode('normal')}
                                className={`p-1.5 rounded transition-all ${viewMode === 'normal'
                                        ? 'bg-slate-100 text-slate-800 shadow-sm'
                                        : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                                    }`}
                                title="Grid View (Standard)"
                            >
                                <LayoutGrid size={18} />
                            </button>
                            <button
                                onClick={() => setViewMode('compact')}
                                className={`p-1.5 rounded transition-all ${viewMode === 'compact'
                                        ? 'bg-slate-100 text-slate-800 shadow-sm'
                                        : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                                    }`}
                                title="Compact View (Dense)"
                            >
                                <Grid3x3 size={18} />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Grid */}
            {paginatedItems.length > 0 ? (
                <>
                    <div className={`grid gap-4 sm:gap-6 ${viewMode === 'normal'
                            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                            : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
                        }`}>
                        {paginatedItems.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        itemsPerPage={itemsPerPage}
                        totalItems={totalProducts}
                        onItemsPerPageChange={setItemsPerPage}
                    />
                </>
            ) : (
                <div className="text-center py-16 bg-white rounded-xl border border-slate-100 shadow-sm">
                    <div className="text-slate-300 mb-3">
                        <LayoutGrid className="w-12 h-12 mx-auto opacity-50" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900 mb-1">No products found</h3>
                    <p className="text-slate-500">There are no products in this view.</p>
                </div>
            )}
        </div>
    );
}
