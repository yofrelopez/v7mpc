'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export type SortOption = 'name-asc' | 'name-desc' | 'category' | 'newest';

interface ProductSortProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const sortOptions = [
  { value: 'name-asc' as SortOption, label: 'Name A-Z' },
  { value: 'name-desc' as SortOption, label: 'Name Z-A' },
  { value: 'category' as SortOption, label: 'By Category' },
  { value: 'newest' as SortOption, label: 'Newest First' }
];

export default function ProductSort({ sortBy, onSortChange }: ProductSortProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = sortOptions.find(option => option.value === sortBy);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors text-sm min-w-[140px] justify-between"
      >
        <span className="text-slate-700">
          {selectedOption?.label || 'Sort by'}
        </span>
        <ChevronDown 
          className={`h-4 w-4 text-slate-400 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`} 
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-1 w-full bg-white border border-slate-200 rounded-md shadow-lg z-20">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onSortChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-50 transition-colors first:rounded-t-md last:rounded-b-md ${
                  sortBy === option.value 
                    ? 'bg-slate-100 text-slate-900 font-medium' 
                    : 'text-slate-700'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}