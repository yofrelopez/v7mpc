'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { CustomizationDetails } from '@/types/quote';
import { Palette, Ruler, Shirt, Wrench } from 'lucide-react';

interface CustomizationFieldsProps {
  categorySlug: string;
  customization: CustomizationDetails;
  onChange: (customization: CustomizationDetails) => void;
  disabled?: boolean;
}

export default function CustomizationFields({
  categorySlug,
  customization,
  onChange,
  disabled = false
}: CustomizationFieldsProps) {

  // Local state for string inputs (colors and sizes)
  const [colorsInput, setColorsInput] = useState('');
  const [sizesInput, setSizesInput] = useState('');

  // Sync local state with customization prop
  useEffect(() => {
    setColorsInput(customization.colors?.join(', ') || '');
    setSizesInput(customization.sizes?.join(', ') || '');
  }, [customization.colors, customization.sizes]);

  const handleChange = (field: keyof CustomizationDetails, value: any) => {
    onChange({
      ...customization,
      [field]: value
    });
  };

  const handleMultipleValues = (field: keyof CustomizationDetails, value: string) => {
    const values = value.split(',').map(v => v.trim()).filter(v => v);
    handleChange(field, values);
  };

  // Common fields for all categories
  const renderCommonFields = () => (
    <>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          <Palette className="w-4 h-4 inline mr-2" />
          Colors (comma-separated)
        </label>
        <Input
          type="text"
          value={colorsInput}
          onChange={(e) => setColorsInput(e.target.value)}
          onBlur={(e) => {
            if (e.target.value.trim()) {
              handleMultipleValues('colors', e.target.value);
            }
          }}
          placeholder="e.g. Red, Blue, White"
          disabled={disabled}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Logo Placement
        </label>
        <Input
          type="text"
          value={customization.logoPlacement || ''}
          onChange={(e) => handleChange('logoPlacement', e.target.value)}
          placeholder="e.g. Front center, Back top"
          disabled={disabled}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Text/Custom Message
        </label>
        <textarea
          value={customization.text || ''}
          onChange={(e) => handleChange('text', e.target.value)}
          rows={3}
          disabled={disabled}
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Any text you want to include..."
        />
      </div>
    </>
  );

  // Apparel specific fields
  const renderApparelFields = () => (
    <>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          <Shirt className="w-4 h-4 inline mr-2" />
          Sizes (comma-separated)
        </label>
        <Input
          type="text"
          value={sizesInput}
          onChange={(e) => setSizesInput(e.target.value)}
          onBlur={(e) => {
            if (e.target.value.trim()) {
              handleMultipleValues('sizes', e.target.value);
            }
          }}
          placeholder="e.g. S, M, L, XL, 2XL"
          disabled={disabled}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Print Method
        </label>
        <select
          value={customization.printMethod || ''}
          onChange={(e) => handleChange('printMethod', e.target.value)}
          disabled={disabled}
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="">Select method...</option>
          <option value="screen-print">Screen Print</option>
          <option value="sublimation">Sublimation</option>
          <option value="embroidery">Embroidery</option>
          <option value="heat-transfer">Heat Transfer</option>
        </select>
      </div>
    </>
  );

  // Signs & Displays specific fields
  const renderSignsFields = () => (
    <>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          <Ruler className="w-4 h-4 inline mr-2" />
          Dimensions
        </label>
        <Input
          type="text"
          value={customization.dimensions || ''}
          onChange={(e) => handleChange('dimensions', e.target.value)}
          placeholder="e.g. 24x36 inches, 85x200cm"
          disabled={disabled}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Material
        </label>
        <Input
          type="text"
          value={customization.material || ''}
          onChange={(e) => handleChange('material', e.target.value)}
          placeholder="e.g. Vinyl, PVC, Aluminum"
          disabled={disabled}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Mounting/Installation
        </label>
        <Input
          type="text"
          value={customization.mounting || ''}
          onChange={(e) => handleChange('mounting', e.target.value)}
          placeholder="e.g. Wall mount, Stand, Hanging"
          disabled={disabled}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Finish
        </label>
        <Input
          type="text"
          value={customization.finish || ''}
          onChange={(e) => handleChange('finish', e.target.value)}
          placeholder="e.g. Glossy, Matte, Laminated"
          disabled={disabled}
        />
      </div>
    </>
  );

  // Jewelry specific fields
  const renderJewelryFields = () => (
    <>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Engraving Text
        </label>
        <Input
          type="text"
          value={customization.engraving || ''}
          onChange={(e) => handleChange('engraving', e.target.value)}
          placeholder="Text to engrave..."
          disabled={disabled}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Chain Length
        </label>
        <Input
          type="text"
          value={customization.chainLength || ''}
          onChange={(e) => handleChange('chainLength', e.target.value)}
          placeholder="e.g. 18 inches, 45cm"
          disabled={disabled}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Plating/Finish
        </label>
        <Input
          type="text"
          value={customization.plating || ''}
          onChange={(e) => handleChange('plating', e.target.value)}
          placeholder="e.g. 18K Gold, Silver, Rose Gold"
          disabled={disabled}
        />
      </div>
    </>
  );

  // Promos specific fields
  const renderPromosFields = () => (
    <>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Packaging Preference
        </label>
        <Input
          type="text"
          value={customization.packaging || ''}
          onChange={(e) => handleChange('packaging', e.target.value)}
          placeholder="e.g. Individual boxes, Bulk pack"
          disabled={disabled}
        />
      </div>
    </>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
        <Wrench className="w-5 h-5 text-slate-600" />
        <h3 className="font-medium text-slate-800">Customization Details</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Category-specific fields */}
        {categorySlug === 'apparel' && renderApparelFields()}
        {categorySlug === 'signs-displays' && renderSignsFields()}
        {categorySlug === 'jewelry-recognition' && renderJewelryFields()}
        {categorySlug === 'promos' && renderPromosFields()}

        {/* Common fields for all */}
        {renderCommonFields()}

        {/* Other details field */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Other Details
          </label>
          <textarea
            value={customization.other || ''}
            onChange={(e) => handleChange('other', e.target.value)}
            rows={3}
            disabled={disabled}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Any other customization requirements..."
          />
        </div>
      </div>
    </div>
  );
}
