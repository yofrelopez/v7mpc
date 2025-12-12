'use client';

import { Product } from '@/types/products';
import Link from 'next/link';
import Image from 'next/image';
import { brands } from '@/data/brands';
import { ArrowRight, Star } from 'lucide-react';
import { useMemo } from 'react';

interface BrandWallProps {
    products?: Product[];
}

export default function BrandWall({ products = [] }: BrandWallProps) {

    const displayBrands = useMemo(() => {
        // 1. Calculate counts for each brand
        const brandsWithCounts = brands.map(brand => {
            const brandLower = brand.name.toLowerCase();

            const count = products.filter(product =>
                product.tags.some(tag => tag.toLowerCase() === brandLower) ||
                product.features.some(f => f.toLowerCase().includes(`brand: ${brandLower}`)) ||
                product.tags.includes(brandLower)
            ).length;

            return {
                ...brand,
                count
            };
        });

        // 2. Sort: Brands with products first, then alphabetical
        return brandsWithCounts.sort((a, b) => {
            // Primary sort: Availability (Has products vs No products)
            const aHasProducts = a.count > 0;
            const bHasProducts = b.count > 0;

            if (aHasProducts && !bHasProducts) return -1;
            if (!aHasProducts && bHasProducts) return 1;

            // Secondary sort: Alphabetical
            return a.name.localeCompare(b.name);
        });
    }, [products]);

    return (
        <div className="py-8 animate-in fade-in zoom-in-95 duration-500">

            {/* Hero Section of the Wall */}
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-primary">
                    Global Partner Brands
                </h2>
                <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                    We curate the world's leading brands to ensure your team is outfitted with quality, durability, and style.
                </p>
            </div>

            {/* The Hall of Fame Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {displayBrands.map((brand) => (
                    <Link
                        key={brand.id}
                        href={`/products?brand=${brand.name.toLowerCase().replace(/\s+/g, '-')}`} // Basic slugify
                        className={`group relative flex flex-col items-center p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${brand.count === 0 ? 'opacity-60 grayscale hover:grayscale-0 hover:opacity-100' : ''}`}
                    >
                        {/* Badge/Accent - Subtle branding touch */}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Star className={`w-5 h-5 ${brand.count > 0 ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} />
                        </div>

                        {/* Logo Area */}
                        <div className="relative w-full aspect-[3/2] mb-6 grayscale group-hover:grayscale-0 transition-all duration-300">
                            <Image
                                src={brand.src}
                                alt={`${brand.name} logo`}
                                fill
                                className="object-contain p-4"
                                sizes="(max-width: 768px) 50vw, 33vw"
                            />
                        </div>

                        {/* Content Area */}
                        <div className="text-center mt-auto">
                            <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-amber-700 transition-colors">
                                {brand.name}
                            </h3>
                            <p className="text-xs text-slate-500 font-medium mb-4 line-clamp-1">
                                {brand.description}
                            </p>

                            {/* Product Count Badge (Optional but helpful for admin/debugging) */}
                            {/* <span className="text-xs text-slate-400">{brand.count} products</span> */}

                            {/* CTA Button that appears on hover */}
                            <div className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                {brand.count > 0 ? 'View Collection' : 'Coming Soon'} <ArrowRight className={`w-4 h-4 ${brand.count > 0 ? 'text-amber-600' : 'text-slate-400'}`} />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Bottom Note */}
            <div className="mt-16 text-center bg-slate-50 rounded-xl p-8 border border-slate-100">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Looking for a specific brand?</h3>
                <p className="text-slate-600 mb-6">
                    We have access to hundreds of other manufacturers. If you don't see what you need, just ask.
                </p>
                <Link href="/contact">
                    <button className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 hover:border-slate-400 transition-colors">
                        Contact Sourcing Team
                    </button>
                </Link>
            </div>
        </div>
    );
}
