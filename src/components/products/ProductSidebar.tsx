
'use client';

import { Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Filter Configuration
export const PRODUCT_TYPES = [
    { id: 'polos', label: 'Polos' },
    { id: 't-shirts', label: 'T-Shirts' },
    { id: 'caps', label: 'Caps & Hats' },
    { id: 'bags', label: 'Bags' },
    { id: 'hoodies', label: 'Hoodies' },
    { id: 'jackets', label: 'Jackets' },
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
    selectedType,
    onTypeChange,
    selectedBrand,
    onBrandChange,
    className,
    totalCounts
}: ProductSidebarProps) {
    return (
        <div className={cn("w-full space-y-8", className)}>

            {/* Product Type Filter */}
            <div>
                <h3 className="font-primary font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">
                    Categories
                </h3>
                <div className="space-y-1">
                    <button
                        onClick={() => onTypeChange(null)}
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
                            onClick={() => onTypeChange(selectedType === type.id ? null : type.id)}
                            className={cn(
                                "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200 group",
                                selectedType === type.id
                                    ? "bg-slate-100 font-semibold text-slate-900"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            <span>{type.label}</span>
                            {selectedType === type.id && <Check className="w-4 h-4 text-slate-600" />}
                            {/* Optional: Show count if available */}
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
                        onClick={() => onBrandChange(null)}
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
                            onClick={() => onBrandChange(selectedBrand === brand.id ? null : brand.id)}
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
