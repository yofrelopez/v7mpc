'use client';

// CategoryMenu - Professional mega-menu for product categories
// Static optimized version for instant loading
// Brand colors: slate-600 (primary), amber/gold (accents)

import Link from 'next/link';
import {
  Shirt,
  Wind,
  Briefcase,
  HardHat,
  ChevronRight,
  Package
} from 'lucide-react';

interface CategoryMenuProps {
  onItemClick?: () => void;
}

export default function CategoryMenu({ onItemClick }: CategoryMenuProps) {
  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6">

      {/* ============================================================ */}
      {/* MOBILE UI - 2 Column Grid ("App Style") */}
      {/* ============================================================ */}
      <div className="md:hidden space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {/* Hoodies */}
          <Link
            href="/products?type=hoodie"
            onClick={onItemClick}
            className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100 active:scale-95 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-700">
              <Shirt className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-slate-700">Hoodies</span>
          </Link>

          {/* T-Shirts */}
          <Link
            href="/products?type=t-shirt"
            onClick={onItemClick}
            className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100 active:scale-95 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-700">
              <Shirt className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-slate-700">T-Shirts</span>
          </Link>

          {/* Polos */}
          <Link
            href="/products?type=polo"
            onClick={onItemClick}
            className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100 active:scale-95 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-700">
              <Shirt className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-slate-700">Polos</span>
          </Link>

          {/* Jackets */}
          <Link
            href="/products?type=jacket"
            onClick={onItemClick}
            className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100 active:scale-95 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-700">
              <Wind className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-slate-700">Jackets</span>
          </Link>

          {/* Bags */}
          <Link
            href="/products?type=bag"
            onClick={onItemClick}
            className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100 active:scale-95 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-blue-600">
              <Briefcase className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-slate-700">Bags</span>
          </Link>

          {/* Caps */}
          <Link
            href="/products?type=cap"
            onClick={onItemClick}
            className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100 active:scale-95 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-blue-600">
              <HardHat className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-slate-700">Caps</span>
          </Link>

          {/* Workwear */}
          <Link
            href="/products?type=workwear"
            onClick={onItemClick}
            className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100 active:scale-95 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-blue-600">
              <HardHat className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-slate-700">Workwear</span>
          </Link>

          {/* Brands CTA */}
          <Link
            href="/products?show=brands"
            onClick={onItemClick}
            className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-amber-200 shadow-sm active:scale-95 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
              <ChevronRight className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold text-amber-800">Brands</span>
          </Link>
        </div>


        {/* Mobile View All - Subtle */}
        <Link
          href="/products"
          onClick={onItemClick}
          className="flex items-center justify-center gap-2 p-3 w-full rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 active:scale-95 transition-all text-sm shadow-sm"
        >
          <Package className="w-4 h-4" />
          View All Products
        </Link>
      </div>

      {/* ============================================================ */}
      {/* DESKTOP UI - Mega Menu */}
      {/* ============================================================ */}
      <div className="hidden md:grid md:grid-cols-3 gap-4 md:gap-6">

        {/* ============================================================ */}
        {/* COLUMN 1: POPULAR CATEGORIES */}
        {/* High volume apparel items */}
        {/* ============================================================ */}
        <div className="space-y-2">
          {/* Section Header */}
          <div className="mb-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1 flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-slate-500 to-slate-600 rounded-full"></div>
              Popular Categories
            </h3>
            <p className="text-xs text-slate-500">Shop by product type</p>
          </div>

          <div className="space-y-1">
            {/* Hoodies */}
            <Link
              href="/products?type=hoodie"
              onClick={onItemClick}
              className="group flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700">
                <Shirt className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-700 group-hover:text-slate-900">Hoodies & Sweatshirts</div>
                <div className="text-xs text-slate-500">760+ items</div>
              </div>
            </Link>

            {/* T-Shirts */}
            <Link
              href="/products?type=t-shirt"
              onClick={onItemClick}
              className="group flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700">
                <Shirt className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-700 group-hover:text-slate-900">T-Shirts</div>
                <div className="text-xs text-slate-500">720+ items</div>
              </div>
            </Link>

            {/* Polos */}
            <Link
              href="/products?type=polo"
              onClick={onItemClick}
              className="group flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700">
                <Shirt className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-700 group-hover:text-slate-900">Polos</div>
                <div className="text-xs text-slate-500">520+ items</div>
              </div>
            </Link>

            {/* Jackets */}
            <Link
              href="/products?type=jacket"
              onClick={onItemClick}
              className="group flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700">
                <Wind className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-700 group-hover:text-slate-900">Jackets</div>
                <div className="text-xs text-slate-500">420+ items</div>
              </div>
            </Link>
          </div>
        </div>

        {/* ============================================================ */}
        {/* COLUMN 2: SPECIALTY GEAR */}
        {/* Niche but high value categories */}
        {/* ============================================================ */}
        <div className="space-y-2">
          {/* Section Header */}
          <div className="mb-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1 flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
              Specialty Gear
            </h3>
            <p className="text-xs text-slate-500">Bags, Caps & Workwear</p>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {/* Bags */}
            <Link
              href="/products?type=bag"
              onClick={onItemClick}
              className="group flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-200">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-700 group-hover:text-blue-800">Bags & Luggage</div>
                <div className="text-xs text-slate-500">OGIO, Port Authority</div>
              </div>
            </Link>

            {/* Caps */}
            <Link
              href="/products?type=cap"
              onClick={onItemClick}
              className="group flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-200">
                <HardHat className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-700 group-hover:text-blue-800">Caps & Hats</div>
                <div className="text-xs text-slate-500">New Era, Nike</div>
              </div>
            </Link>

            {/* Workwear */}
            <Link
              href="/products?type=workwear"
              onClick={onItemClick}
              className="group flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-200">
                <HardHat className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-700 group-hover:text-blue-800">Workwear</div>
                <div className="text-xs text-slate-500">Carhartt, Safety Gear</div>
              </div>
            </Link>
          </div>
        </div>

        {/* ============================================================ */}
        {/* COLUMN 3: TOP BRANDS */}
        {/* Best selling brands */}
        {/* ============================================================ */}
        <div className="space-y-2">
          {/* Section Header */}
          <div className="mb-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1 flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-amber-500 to-amber-600 rounded-full"></div>
              Top Brands
            </h3>
            <p className="text-xs text-slate-500">Our Premium Partners</p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
              { name: 'Port Authority', short: 'Port Auth.', color: 'bg-blue-900 text-white', slug: 'port-authority' },
              { name: 'Sport-Tek', short: 'Sport-Tek', color: 'bg-red-600 text-white', slug: 'sport-tek' },
              { name: 'OGIO', short: 'OGIO', color: 'bg-black text-white', slug: 'ogio' },
              { name: 'Nike', short: 'Nike', color: 'bg-slate-800 text-white', slug: 'nike' },
              { name: 'Carhartt', short: 'Carhartt', color: 'bg-amber-700 text-white', slug: 'carhartt' },
              { name: 'The North Face', short: 'North Face', color: 'bg-red-700 text-white', slug: 'the-north-face' }
            ].map((brand) => (
              <Link
                key={brand.slug}
                href={`/products/brand/${brand.slug}`}
                onClick={onItemClick}
                className="flex items-center gap-2 p-2 rounded border border-slate-100 hover:border-amber-200 hover:shadow-sm transition-all group"
              >
                <div className={`w-2 h-8 rounded-sm ${brand.color}`}></div>
                <span className="text-xs font-semibold text-slate-700 group-hover:text-amber-700 truncate">{brand.short}</span>
              </Link>
            ))}
          </div>

          {/* View All Brands CTA */}
          <Link
            href="/products?show=brands"
            onClick={onItemClick}
            className="group mt-3 flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200 transition-all duration-200 border border-amber-200/50"
          >
            <span className="text-xs font-bold text-amber-800">View All Brands</span>
            <ChevronRight className="w-4 h-4 text-amber-700 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>


    </div >
  );
}
