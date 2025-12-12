'use client';

// ProductFilters - Panel de filtros múltiples para productos
// Permite filtrar por: Tipo de Producto, Marca, y Features

import { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

// ============================================================================
// TYPES
// ============================================================================

interface FilterOption {
  value: string;
  label: string;
  count: number;
}

interface FilterSection {
  id: string;
  title: string;
  options: FilterOption[];
}

interface ProductFiltersProps {
  filters: FilterSection[];
  activeFilters: Record<string, string[]>;
  onFilterChange: (sectionId: string, value: string, checked: boolean) => void;
  onResetFilters: () => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export default function ProductFilters({
  filters,
  activeFilters,
  onFilterChange,
  onResetFilters
}: ProductFiltersProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(filters.map(f => f.id))
  );

  // Toggle section expansion
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  // Count total active filters
  const totalActiveFilters = Object.values(activeFilters).reduce(
    (sum, filters) => sum + filters.length,
    0
  );

  // Remove individual filter
  const removeFilter = (sectionId: string, value: string) => {
    onFilterChange(sectionId, value, false);
  };

  return (
    <div className="w-full max-w-xs space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-primary text-lg font-semibold text-slate-900">
          Filters
        </h3>
        {totalActiveFilters > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onResetFilters}
            className="text-sm text-slate-600 hover:text-slate-900"
          >
            Reset All
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {totalActiveFilters > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-700">
            Active Filters ({totalActiveFilters})
          </p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(activeFilters).map(([sectionId, values]) =>
              values.map(value => {
                const section = filters.find(f => f.id === sectionId);
                const option = section?.options.find(o => o.value === value);
                return (
                  <button
                    key={`${sectionId}-${value}`}
                    onClick={() => removeFilter(sectionId, value)}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-sm text-slate-700 transition-colors"
                  >
                    {option?.label || value}
                    <X className="w-3 h-3" />
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Filter Sections */}
      <div className="space-y-4">
        {filters.map(section => {
          const isExpanded = expandedSections.has(section.id);
          const activeSectionFilters = activeFilters[section.id] || [];

          return (
            <div key={section.id} className="border-b border-slate-200 pb-4">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between py-2 group"
              >
                <span className="font-medium text-slate-900 group-hover:text-slate-600 transition-colors">
                  {section.title}
                  {activeSectionFilters.length > 0 && (
                    <span className="ml-2 text-sm text-slate-500">
                      ({activeSectionFilters.length})
                    </span>
                  )}
                </span>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-slate-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                )}
              </button>

              {/* Section Options */}
              {isExpanded && (
                <div className="mt-3 space-y-2">
                  {section.options.map(option => {
                    const isChecked = activeSectionFilters.includes(option.value);

                    return (
                      <label
                        key={option.value}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => onFilterChange(section.id, option.value, e.target.checked)}
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
                        />
                        <span className="flex-1 text-sm text-slate-700 group-hover:text-slate-900 transition-colors">
                          {option.label}
                        </span>
                        <span className="text-xs text-slate-500">
                          {option.count}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile: Apply Filters Button */}
      <div className="lg:hidden">
        <Button className="w-full" onClick={() => {/* Close mobile filter panel */}}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
