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
  images?: string[];
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
  logo: string;
  description?: string;
}

export interface Certification {
  id: string;
  name: string;
  acronym: string;
  logo: string;
  description: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface Quote {
  id: string;
  clientName: string;
  email: string;
  company: string;
  products: Product[];
  message: string;
  status: 'pending' | 'processing' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}