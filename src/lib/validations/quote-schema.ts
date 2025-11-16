/**
 * Quote Form Validation Schema
 * Zod schema for client-side validation
 */

import { z } from 'zod';

/**
 * Customer Information Schema
 */
const customerSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  
  email: z
    .string()
    .email('Please enter a valid email address')
    .toLowerCase(),
  
  company: z
    .string()
    .max(150, 'Company name must be less than 150 characters')
    .optional()
    .or(z.literal('')),
  
  phone: z
    .string()
    .regex(
      /^[\d\s\-\(\)\+\.ext]+$/,
      'Please enter a valid phone number'
    )
    .min(10, 'Phone number must be at least 10 digits')
    .max(20, 'Phone number must be less than 20 characters')
    .optional()
    .or(z.literal('')),
});

/**
 * Product Information Schema
 */
const productSchema = z.object({
  source: z.enum(['catalog', 'custom']),
  
  productId: z.string().optional(),
  productName: z.string().min(1, 'Product name is required'),
  productSlug: z.string().optional(),
  categoryName: z.string().optional(),
  categorySlug: z.string().optional(),
  // Allow both full URLs and relative paths for imageUrl
  imageUrl: z.string().optional().or(z.literal('')),
  
  customDescription: z
    .string()
    .min(10, 'Please provide at least 10 characters describing your custom product')
    .max(1000, 'Description must be less than 1000 characters')
    .optional()
    .or(z.literal('')),
}).superRefine((data, ctx) => {
  // If catalog product, require productId
  if (data.source === 'catalog') {
    if (!data.productId || data.productId.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please select a product from the catalog',
        path: ['productId'],
      });
    }
  }
  
  // If custom product, require description
  if (data.source === 'custom') {
    if (!data.customDescription || data.customDescription.length < 10) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please provide at least 10 characters describing your custom product',
        path: ['customDescription'],
      });
    }
  }
});

/**
 * Customization Details Schema (optional fields)
 */
const customizationSchema = z.object({
  colors: z.array(z.string()).optional(),
  logoPlacement: z.string().max(200).optional(),
  text: z.string().max(500).optional(),
  other: z.string().max(1000).optional(),
  
  // Apparel specific
  sizes: z.array(z.string()).optional(),
  printMethod: z.enum(['screen-print', 'sublimation', 'embroidery', 'heat-transfer']).optional(),
  
  // Signs & Displays specific
  dimensions: z.string().max(100).optional(),
  material: z.string().max(100).optional(),
  mounting: z.string().max(100).optional(),
  finish: z.string().max(100).optional(),
  
  // Jewelry specific
  engraving: z.string().max(200).optional(),
  chainLength: z.string().max(50).optional(),
  plating: z.string().max(100).optional(),
  
  // Promos specific
  packaging: z.string().max(200).optional(),
}).optional();

/**
 * Main Quote Form Schema
 */
export const quoteFormSchema = z.object({
  customer: customerSchema,
  product: productSchema,
  
  quantity: z
    .number()
    .int('Quantity must be a whole number')
    .min(1, 'Quantity must be at least 1')
    .max(1000000, 'Please contact us directly for orders over 1 million units'),
  
  customization: customizationSchema,
  
  timeline: z
    .string()
    .max(100, 'Timeline must be less than 100 characters')
    .optional()
    .or(z.literal('')),
  
  message: z
    .string()
    .max(2000, 'Message must be less than 2000 characters')
    .optional()
    .or(z.literal('')),
  
  // Metadata (optional, populated automatically)
  referrer: z.string().optional(),
  source: z.string().optional(),
});

/**
 * TypeScript type inferred from schema
 */
export type QuoteFormSchemaType = z.infer<typeof quoteFormSchema>;

/**
 * Partial schema for step-by-step validation
 */
export const customerStepSchema = z.object({
  customer: customerSchema,
});

export const productStepSchema = z.object({
  product: productSchema,
  quantity: quoteFormSchema.shape.quantity,
});

export const customizationStepSchema = z.object({
  customization: customizationSchema,
  timeline: quoteFormSchema.shape.timeline,
  message: quoteFormSchema.shape.message,
});
