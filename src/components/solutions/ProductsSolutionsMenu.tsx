'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
    Briefcase,
    Shirt,
    ChevronRight,
    ChevronDown,
    LayoutGrid,
    Package
} from 'lucide-react';
import CategoryMenu from '../products/CategoryMenu';
import SolutionsMenu from './SolutionsMenu';

// Define the tabs for the mega menu
type MenuTab = 'solutions' | 'apparel';

interface ProductsSolutionsMenuProps {
    onItemClick?: () => void;
    isMobile?: boolean;
}

export default function ProductsSolutionsMenu({ onItemClick, isMobile = false }: ProductsSolutionsMenuProps) {
    const [activeTab, setActiveTab] = useState<MenuTab>('solutions');
    const [hoveredTab, setHoveredTab] = useState<MenuTab | null>(null);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Handle hover interactions with delay to prevent flickering (Hover Intent)
    const handleMouseEnter = (tab: MenuTab) => {
        if (isMobile) return; // Ignore on mobile

        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }

        setHoveredTab(tab);

        // Slight delay before switching tabs for better UX (300ms)
        hoverTimeoutRef.current = setTimeout(() => {
            setActiveTab(tab);
        }, 200);
    };

    const handleMouseLeave = () => {
        if (isMobile) return;

        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }
        setHoveredTab(null);
    };

    // Cleanup timeout
    useEffect(() => {
        return () => {
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
            }
        };
    }, []);

    // --- MOBILE VIEW (Accordion) ---
    const [mobileOpenTab, setMobileOpenTab] = useState<MenuTab | null>('solutions');
    const solutionsButtonRef = useRef<HTMLButtonElement>(null);
    const apparelButtonRef = useRef<HTMLButtonElement>(null);

    // Auto-scroll effect to fix accordion jumping
    useEffect(() => {
        if (!mobileOpenTab) return;

        // Wait for the accordion transition (300ms) to finish/start processing
        const timeoutId = setTimeout(() => {
            const element = mobileOpenTab === 'solutions'
                ? solutionsButtonRef.current
                : apparelButtonRef.current;

            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [mobileOpenTab]);

    const toggleMobileTab = (tab: MenuTab) => {
        setMobileOpenTab(mobileOpenTab === tab ? null : tab);
    };

    if (isMobile) {
        return (
            <div className="flex flex-col w-full bg-slate-50 border-y border-slate-100">

                {/* Mobile: Solutions Section */}
                <div className="border-b border-slate-100 last:border-0">
                    <button
                        ref={solutionsButtonRef}
                        onClick={() => toggleMobileTab('solutions')}
                        className="w-full flex items-center justify-between px-6 py-4 text-left font-medium text-slate-800 bg-slate-50 hover:bg-slate-100/50 transition-colors group"
                    >
                        <span className="flex items-center gap-3">
                            <div className={`p-1.5 rounded-lg transition-colors duration-300 ${mobileOpenTab === 'solutions' ? 'bg-blue-100 text-blue-700' : 'bg-blue-50 text-blue-600'}`}>
                                <Briefcase className="w-4 h-4" />
                            </div>
                            <span className={`text-sm font-semibold transition-colors duration-300 ${mobileOpenTab === 'solutions' ? 'text-blue-700' : 'text-slate-800'}`}>
                                Our Solutions
                            </span>
                        </span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${mobileOpenTab === 'solutions' ? 'rotate-180 text-blue-600' : ''}`} />
                    </button>

                    {/* Collapsible Content */}
                    <div className={`grid transition-all duration-300 ease-in-out ${mobileOpenTab === 'solutions' ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="overflow-hidden">
                            <div className="px-2 pb-2">
                                <div className="[&>div]:p-0 [&>div]:max-w-none">
                                    <SolutionsMenu onItemClick={onItemClick} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile: Apparel Section */}
                <div className="border-b border-slate-100 last:border-0">
                    <button
                        ref={apparelButtonRef}
                        onClick={() => toggleMobileTab('apparel')}
                        className="w-full flex items-center justify-between px-6 py-4 text-left font-medium text-slate-800 bg-slate-50 hover:bg-slate-100/50 transition-colors group"
                    >
                        <span className="flex items-center gap-3">
                            <div className={`p-1.5 rounded-lg transition-colors duration-300 ${mobileOpenTab === 'apparel' ? 'bg-blue-100 text-blue-700' : 'bg-blue-50 text-blue-600'}`}>
                                <Shirt className="w-4 h-4" />
                            </div>
                            <span className={`text-sm font-semibold transition-colors duration-300 ${mobileOpenTab === 'apparel' ? 'text-blue-700' : 'text-slate-800'}`}>
                                Apparel Catalog
                            </span>
                        </span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${mobileOpenTab === 'apparel' ? 'rotate-180 text-blue-600' : ''}`} />
                    </button>

                    {/* Collapsible Content */}
                    <div className={`grid transition-all duration-300 ease-in-out ${mobileOpenTab === 'apparel' ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="overflow-hidden">
                            <div className="px-2 pb-4">
                                {/* We hide the desktop container padding/sizing to make it fit mobile better */}
                                <div className="[&>div]:p-0 [&>div]:max-w-none">
                                    <CategoryMenu onItemClick={onItemClick} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

    // --- DESKTOP VIEW (Tabbed Mega Menu) ---
    return (
        <div className="flex w-full max-w-7xl mx-auto bg-white rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-900/5 h-[550px]">

            {/* LEFT SIDEBAR - Navigation Tabs */}
            <div className="w-72 flex-shrink-0 bg-slate-50/80 backdrop-blur-sm border-r border-slate-200/60 py-8 flex flex-col">

                <div className="px-6 mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                        <LayoutGrid className="w-3 h-3" />
                        Categories
                    </h3>
                </div>

                <div className="flex-1 px-4 space-y-2">
                    {/* Solutions Tab */}
                    <button
                        onMouseEnter={() => handleMouseEnter('solutions')}
                        onClick={() => setActiveTab('solutions')}
                        className={`w-full group relative flex items-center justify-between px-4 py-4 text-sm font-medium rounded-xl transition-all duration-300 ease-out
              ${activeTab === 'solutions'
                                ? 'bg-white text-blue-700 shadow-lg shadow-blue-900/5 ring-1 ring-slate-200'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`p-2.5 rounded-lg transition-all duration-300 ${activeTab === 'solutions' ? 'bg-blue-50 text-blue-600 scale-110' : 'bg-white border border-slate-100 text-slate-400 group-hover:border-slate-300 group-hover:text-slate-600'}`}>
                                <Briefcase className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <span className="block text-sm font-bold tracking-tight">Our Solutions</span>
                                <span className={`block text-[10px] font-medium mt-0.5 transition-all duration-300 ${activeTab === 'solutions' ? 'text-blue-600/70' : 'text-slate-400 group-hover:text-slate-500'}`}>
                                    Divisions & Services
                                </span>
                            </div>
                        </div>

                        {/* Active Indicator */}
                        {activeTab === 'solutions' && (
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-l-full mr-[1px]"></div>
                        )}
                    </button>

                    {/* Apparel Tab */}
                    <button
                        onMouseEnter={() => handleMouseEnter('apparel')}
                        onClick={() => setActiveTab('apparel')}
                        className={`w-full group relative flex items-center justify-between px-4 py-4 text-sm font-medium rounded-xl transition-all duration-300 ease-out
              ${activeTab === 'apparel'
                                ? 'bg-white text-blue-700 shadow-lg shadow-blue-900/5 ring-1 ring-slate-200'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`p-2.5 rounded-lg transition-all duration-300 ${activeTab === 'apparel' ? 'bg-blue-50 text-blue-600 scale-110' : 'bg-white border border-slate-100 text-slate-400 group-hover:border-slate-300 group-hover:text-slate-600'}`}>
                                <Shirt className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <span className="block text-sm font-bold tracking-tight">Apparel Catalog</span>
                                <span className={`block text-[10px] font-medium mt-0.5 transition-all duration-300 ${activeTab === 'apparel' ? 'text-blue-600/70' : 'text-slate-400 group-hover:text-slate-500'}`}>
                                    Shop Full Collection
                                </span>
                            </div>
                        </div>

                        {/* Active Indicator */}
                        {activeTab === 'apparel' && (
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-l-full mr-[1px]"></div>
                        )}
                    </button>
                </div>

                {/* Bottom Support Link */}
                <div className="px-6 py-6 mt-auto border-t border-slate-200/50">
                    <Link
                        href="/contact"
                        onClick={onItemClick}
                        className="group flex items-center justify-between w-full p-3 rounded-lg bg-slate-100 hover:bg-blue-50 transition-all duration-300"
                    >
                        <span className="text-xs font-semibold text-slate-600 group-hover:text-blue-700">Need Custom Quote?</span>
                        <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* RIGHT CONTENT AREA - Scrollable */}
            <div className="flex-1 bg-white relative">
                {/* We use a key to force re-animation when switching tabs */}
                <div className="h-full w-full overflow-y-auto custom-scrollbar">

                    {activeTab === 'solutions' && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500 ease-out h-full p-8 flex items-center">
                            <div className="w-full">
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-slate-800 tracking-tight mb-2">Corporate Solutions</h2>
                                    <p className="text-slate-500">Discover our specialized divisions for every business need.</p>
                                </div>
                                <SolutionsMenu onItemClick={onItemClick} />
                            </div>
                        </div>
                    )}

                    {activeTab === 'apparel' && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500 ease-out h-full p-2 flex items-center">
                            <div className="w-full">
                                {/* Category Menu handles its own internal layout, we just mount it */}
                                <CategoryMenu onItemClick={onItemClick} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
