import { Resend } from 'resend';

// Initialize Resend client
// API key is loaded from environment variable
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Email configuration from environment variables
 */
export const EMAIL_CONFIG = {
  from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
  quotesEmail: process.env.QUOTES_EMAIL || 'info@v7mpc.com',
  contactEmail: process.env.CONTACT_EMAIL || 'contact@v7mpc.com',
  replyTo: process.env.QUOTES_EMAIL || 'info@v7mpc.com'
};

/**
 * Validate email configuration
 */
export function validateEmailConfig(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!process.env.RESEND_API_KEY) {
    errors.push('RESEND_API_KEY is not configured');
  }

  if (!process.env.FROM_EMAIL) {
    errors.push('FROM_EMAIL is not configured (using default: onboarding@resend.dev)');
  }

  if (!process.env.QUOTES_EMAIL) {
    errors.push('QUOTES_EMAIL is not configured (using default: info@v7mpc.com)');
  }

  if (!process.env.CONTACT_EMAIL) {
    errors.push('CONTACT_EMAIL is not configured (using default: contact@v7mpc.com)');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export { resend };
