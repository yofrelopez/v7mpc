import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),
  
  email: z.string()
    .email('Please enter a valid email address')
    .max(100, 'Email is too long'),
  
  company: z.string()
    .max(100, 'Company name is too long')
    .optional(),
  
  phone: z.string()
    .max(20, 'Phone number is too long')
    .optional(),
  
  subject: z.string()
    .min(3, 'Subject must be at least 3 characters')
    .max(200, 'Subject is too long'),
  
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message is too long (max 2000 characters)')
});

export type ContactFormSchemaType = z.infer<typeof contactFormSchema>;
