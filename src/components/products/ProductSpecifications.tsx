import { Package, Palette, Ruler, Clock } from 'lucide-react';
import { Product } from '@/types/products';

interface ProductSpecificationsProps {
  product: Product;
}

interface ProductSpecificationsProps {
  product: Product;
  compact?: boolean; // New prop for tab view
}

export default function ProductSpecifications({ product, compact = false }: ProductSpecificationsProps) {
  // Generate realistic specifications based on product category
  const getSpecifications = () => {
    const baseSpecs = [
      {
        icon: <Package className="h-5 w-5 text-slate-600" />,
        label: 'Materials',
        value: getProductMaterials(product.category.slug)
      },
      {
        icon: <Ruler className="h-5 w-5 text-slate-600" />,
        label: 'Dimensions', 
        value: getProductDimensions(product.category.slug)
      },
      {
        icon: <Palette className="h-5 w-5 text-slate-600" />,
        label: 'Colors Available',
        value: 'Custom colors available, Standard colors: Black, Navy, White, Gray'
      },
      {
        icon: <Clock className="h-5 w-5 text-slate-600" />,
        label: 'Production Time',
        value: '10-15 business days after artwork approval'
      }
    ];

    return baseSpecs;
  };

  const specifications = getSpecifications();

  return (
    <section>
      {!compact && (
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Product Specifications
        </h2>
      )}
      
      <div className={compact ? "" : "bg-slate-50 rounded-lg p-6"}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {specifications.map((spec, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="shrink-0 mt-1">
                {spec.icon}
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  {spec.label}
                </h3>
                <p className="text-slate-700">
                  {spec.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Technical Details */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-4">
            Technical Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-medium text-slate-800 mb-2">Customization</h4>
              <ul className="space-y-1 text-slate-600">
                <li>• Logo imprinting available</li>
                <li>• Screen printing</li>
                <li>• Embroidery options</li>
                <li>• Laser engraving</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-slate-800 mb-2">Packaging</h4>
              <ul className="space-y-1 text-slate-600">
                <li>• Individual poly bags</li>
                <li>• Bulk packaging available</li>
                <li>• Custom packaging options</li>
                <li>• Gift box upgrades</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-slate-800 mb-2">Certifications</h4>
              <ul className="space-y-1 text-slate-600">
                <li>• ISO 9001 certified</li>
                <li>• CPSIA compliant</li>
                <li>• RoHS compliant</li>
                <li>• FDA approved materials</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Helper functions to generate realistic specs based on product category
function getProductMaterials(categorySlug: string): string {
  const materialMap: Record<string, string> = {
    'promotional-products': 'High-quality plastic, metal components',
    'apparel-accessories': '100% cotton, polyester blend options available',
    'bags-cases': 'Durable canvas, reinforced stitching, metal hardware',
    'drinkware-kitchen': 'Food-grade stainless steel, BPA-free materials',
    'office-supplies': 'Premium paper, hardcover binding, elastic closure',
    'tech-electronics': 'ABS plastic, lithium polymer battery, USB-C',
    'awards-recognition': 'Crystal clear acrylic, precision laser engraving',
    'outdoor-sports': 'Weather-resistant nylon, fiberglass frame'
  };
  
  return materialMap[categorySlug] || 'Premium quality materials, contact for specific details';
}

function getProductDimensions(categorySlug: string): string {
  const dimensionMap: Record<string, string> = {
    'promotional-products': 'Various sizes available, custom dimensions possible',
    'apparel-accessories': 'Sizes XS-5XL available, size chart upon request',
    'bags-cases': '15" x 12" x 6" (standard), custom sizes available',
    'drinkware-kitchen': '11 oz capacity, 3.5" diameter x 4.25" height',
    'office-supplies': '5.5" x 8.5" (A5), 192 pages',
    'tech-electronics': '4.5" x 2.8" x 0.5", compact portable design',
    'awards-recognition': '6" x 8" x 1", custom sizes available',
    'outdoor-sports': '62" arc, compact 15" when closed'
  };
  
  return dimensionMap[categorySlug] || 'Standard industry dimensions, custom sizes available';
}