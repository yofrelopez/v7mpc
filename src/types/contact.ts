// Contact form types

export type ContactFormData = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
};

export type ContactSubmission = ContactFormData & {
  submittedAt: string;
  userAgent?: string;
};

export type ContactResponse = {
  success: boolean;
  message: string;
  contactId?: string;
};
