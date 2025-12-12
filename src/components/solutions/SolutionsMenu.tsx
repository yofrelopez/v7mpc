'use client';

import Link from 'next/link';
import { Gem, Gift, ChevronRight, CheckCircle2, Shirt } from 'lucide-react';

interface SolutionsMenuProps {
    onItemClick?: () => void;
}

export default function SolutionsMenu({ onItemClick }: SolutionsMenuProps) {
    const divisions = [
        {
            id: 'jewelry',
            title: 'Jewelry Division',
            subtitle: 'Zaché® Collections & Lu Love®',
            description: 'Exquisite jewelry for recognition & lifestyle.',
            link: '/jewelry',
            icon: Gem,
            color: 'text-amber-600',
            bgColor: 'bg-amber-50',
            borderColor: 'border-amber-100',
            hoverBorder: 'hover:border-amber-200',
            features: [
                'Employee Recognition',
                'Luxury Corporate Gifts',
                'Custom designs'
            ]
        },
        {
            id: 'promotional',
            title: 'Promotional Products',
            subtitle: 'Strategic Brand Solutions',
            description: 'High-quality merchandise to amplify your brand.',
            link: '/promotional-products',
            icon: Gift,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-100',
            hoverBorder: 'hover:border-blue-200',
            features: [
                'Office & Writing',
                'Tech & Gadgets',
                'Eco-friendly options'
            ]
        },
        {
            id: 'apparel',
            title: 'Corporate Apparel',
            subtitle: 'Professional Uniforms & Gear',
            description: 'Premium branded apparel for your team.',
            link: '/apparel',
            icon: Shirt,
            color: 'text-slate-600',
            bgColor: 'bg-slate-50',
            borderColor: 'border-slate-100',
            hoverBorder: 'hover:border-slate-200',
            features: [
                'Uniforms & Workwear',
                'Polos & Shirts',
                'Caps & Accessories'
            ]
        }
    ];

    return (
        <div className="w-full max-w-5xl mx-auto p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {divisions.map((division) => {
                    const Icon = division.icon;
                    return (
                        <Link
                            key={division.id}
                            href={division.link}
                            onClick={onItemClick}
                            className={`group block p-4 rounded-xl border ${division.borderColor} ${division.hoverBorder} hover:shadow-md transition-all duration-300 bg-white`}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`w-10 h-10 rounded-lg ${division.bgColor} flex items-center justify-center ${division.color} shrink-0`}>
                                    <Icon className="w-5 h-5" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-slate-700 transition-colors">
                                            {division.title}
                                        </h3>
                                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                                    </div>

                                    <p className="text-xs font-semibold text-slate-500 mb-2">{division.subtitle}</p>
                                    <p className="text-xs text-slate-600 mb-3 line-clamp-2">{division.description}</p>

                                    <ul className="space-y-1">
                                        {division.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center text-[10px] text-slate-500">
                                                <CheckCircle2 className={`w-3 h-3 mr-1.5 ${division.color} opacity-60`} />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Bottom Link */}
            <div className="mt-4 pt-4 border-t border-slate-100 text-center md:text-right">
                <Link
                    href="/solutions"
                    onClick={onItemClick}
                    className="inline-flex items-center text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                >
                    View all solutions <ChevronRight className="w-3 h-3 ml-1" />
                </Link>
            </div>
        </div>
    );
}
