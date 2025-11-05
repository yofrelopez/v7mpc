import { Palette, Type, Award, Shirt } from 'lucide-react';
import { Product } from '@/types/products';

interface ProductCustomizationProps {
  product: Product;
  compact?: boolean; // New prop for tab view
}

export default function ProductCustomization({ product, compact = false }: ProductCustomizationProps) {
  const customizationOptions = [
    {
      icon: <Type className="h-6 w-6 text-slate-600" />,
      title: 'Logo & Text',
      description: 'Add your company logo, text, or custom artwork',
      options: ['Screen printing', 'Embroidery', 'Heat transfer', 'Laser engraving'],
      popular: true
    },
    {
      icon: <Palette className="h-6 w-6 text-slate-600" />,
      title: 'Color Options',
      description: 'Choose from standard colors or request custom Pantone colors',
      options: ['Standard colors', 'PMS color matching', 'Full-color printing', 'Gradient effects']
    },
    {
      icon: <Award className="h-6 w-6 text-slate-600" />,
      title: 'Premium Finishes',
      description: 'Upgrade with special finishes and premium treatments',
      options: ['Metallic foil', 'Embossed texture', 'UV coating', 'Soft-touch finish']
    },
    {
      icon: <Shirt className="h-6 w-6 text-slate-600" />,
      title: 'Size & Fit',
      description: 'Custom sizing and fit options for perfect branding',
      options: ['Standard sizes', 'Custom dimensions', 'Slim fit', 'Regular fit']
    }
  ];

  if (!product.isCustomizable) {
    return (
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Customization Options
        </h2>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <p className="text-amber-800">
            This product has limited customization options. Please contact us to discuss 
            available modifications and custom branding possibilities.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-12">
      {/* Customization Process */}
      <div className="bg-slate-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          How We Customize Your Order
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { step: '1', title: 'Submit Artwork', desc: 'Send us your logo or design files' },
            { step: '2', title: 'Review Proof', desc: 'We create a digital proof for approval' },
            { step: '3', title: 'Production', desc: 'Manufacturing begins after approval' },
            { step: '4', title: 'Quality Check', desc: 'Final inspection before shipping' }
          ].map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-8 h-8 bg-slate-600 text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-2">
                {step.step}
              </div>
              <h4 className="font-medium text-slate-900 mb-1">{step.title}</h4>
              <p className="text-sm text-slate-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* File Requirements */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Artwork Requirements</h4>
        <p className="text-sm text-blue-800">
          <strong>Accepted formats:</strong> AI, EPS, PDF, PNG (300 DPI minimum) • 
          <strong>Logo size:</strong> Vector format preferred • 
          <strong>Colors:</strong> PMS color codes for exact matching
        </p>
      </div>
    </section>
  );
}