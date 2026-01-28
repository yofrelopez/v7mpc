
'use client';

import { Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

// Filter Configuration
export const PRODUCT_TYPES = [
    { id: 'polo', label: 'Polos' },
    { id: 't-shirt', label: 'T-Shirts' },
    { id: 'cap', label: 'Caps & Hats' },
    { id: 'bag', label: 'Bags' },
    { id: 'hoodie', label: 'Hoodies' },
    { id: 'jacket', label: 'Jackets' },
    { id: 'workwear', label: 'Workwear' },
];

export const TOP_BRANDS = [
    { id: 'sport-tek', label: 'Sport-Tek' },
    { id: 'port authority', label: 'Port Authority' },
    { id: 'nike', label: 'Nike' },
    { id: 'ogio', label: 'OGIO' },
    { id: 'carhartt', label: 'Carhartt' },
    { id: 'district', label: 'District' },
    { id: 'new era', label: 'New Era' },
    { id: 'port & company', label: 'Port & Company' },
    { id: 'cornerstone', label: 'CornerStone' },
    { id: 'eddie bauer', label: 'Eddie Bauer' },
];

interface ProductSidebarProps {
    selectedType: string | null;
    onTypeChange: (type: string | null) => void;
    selectedBrand: string | null;
    onBrandChange: (brand: string | null) => void;
    className?: string;
    totalCounts?: { type: Record<string, number>; brand: Record<string, number> };
}

export default function ProductSidebar({
    className,
}: { className?: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Get current active filters from URL
    const selectedType = searchParams.get('type');
    const selectedBrand = searchParams.get('brand');

    // Update URL helper
    const updateFilter = (key: string, value: string | null) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        // Reset page to 1 on filter change
        params.delete('page');

        router.push(`/products?${params.toString()}`, { scroll: false });
    };

    return (
        <div className={cn("w-full space-y-8", className)}>

            {/* Product Type Filter */}
            <div>
                <h3 className="font-primary font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">
                    Categories
                </h3>
                <div className="space-y-1">
                    <button
                        onClick={() => updateFilter('type', null)}
                        className={cn(
                            "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200",
                            !selectedType
                                ? "bg-slate-100 font-semibold text-slate-900"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        )}
                    >
                        <span>View All</span>
                        {!selectedType && <Check className="w-4 h-4 text-slate-600" />}
                    </button>

                    {PRODUCT_TYPES.map((type) => (
                        <button
                            key={type.id}
                            onClick={() => updateFilter('type', selectedType === type.id ? null : type.id)}
                            className={cn(
                                "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200 group",
                                selectedType === type.id
                                    ? "bg-slate-100 font-semibold text-slate-900"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            <span>{type.label}</span>
                            {selectedType === type.id && <Check className="w-4 h-4 text-slate-600" />}
                        </button>
                    ))}
                </div>
            </div>

            {/* Brand Filter */}
            <div>
                <h3 className="font-primary font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">
                    Brands
                </h3>
                <div className="space-y-1 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    <button
                        onClick={() => updateFilter('brand', null)}
                        className={cn(
                            "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200",
                            !selectedBrand
                                ? "bg-slate-100 font-semibold text-slate-900"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        )}
                    >
                        <span>All Brands</span>
                        {!selectedBrand && <Check className="w-4 h-4 text-slate-600" />}
                    </button>

                    {TOP_BRANDS.map((brand) => (
                        <button
                            key={brand.id}
                            onClick={() => updateFilter('brand', selectedBrand === brand.id ? null : brand.id)}
                            className={cn(
                                "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200 group",
                                selectedBrand === brand.id
                                    ? "bg-slate-100 font-semibold text-slate-900"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            <span className="capitalize">{brand.label}</span>
                            {selectedBrand === brand.id && <Check className="w-4 h-4 text-slate-600" />}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
