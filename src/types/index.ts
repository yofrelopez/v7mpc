// Tipos de datos para productos y categorías de V7MPC
export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  productCount?: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  images: string[];
  specifications?: Record<string, string>;
  features?: string[];
  brands?: string[];
  minQuantity?: number;
  bulkPricing?: boolean;
  customizable?: boolean;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Brand {
  id: string;
  name: string;
  logo?: string;
  description?: string;
  website?: string;
}

export interface QuoteRequest {
  id: string;
  customerInfo: {
    name: string;
    email: string;
    company: string;
    phone: string;
    message?: string;
  };
  products: Array<{
    productId: string;
    quantity: number;
    customizations?: string;
  }>;
  status: 'pending' | 'processing' | 'quoted' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

export interface Certification {
  id: string;
  name: string;
  acronym: string;
  logo: string;
  description: string;
  validUntil?: Date;
}