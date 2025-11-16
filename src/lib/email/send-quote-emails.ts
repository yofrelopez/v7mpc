import { resend, EMAIL_CONFIG, validateEmailConfig } from './resend-client';
import {
  generateAdminEmailHTML,
  generateAdminEmailText,
  generateCustomerEmailHTML,
  generateCustomerEmailText
} from './quote-email-templates';
import { QuoteSubmission } from '@/types/quote';

/**
 * Send quote notification emails
 * Sends emails to both admin and customer
 * 
 * @param quote - The quote submission data
 * @returns Promise with results of both email sends
 */
export async function sendQuoteEmails(quote: QuoteSubmission) {
  // Validate email configuration
  const configValidation = validateEmailConfig();
  if (!configValidation.valid) {
    console.warn('⚠️ Email configuration warnings:', configValidation.errors);
    // Continue anyway with defaults for development
  }

  const results = {
    admin: { success: false, error: null as string | null, messageId: null as string | null },
    customer: { success: false, error: null as string | null, messageId: null as string | null }
  };

  try {
    // Send email to admin (V7MPC)
    console.log('📧 Sending admin notification email...');
    const adminEmailResult = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: EMAIL_CONFIG.quotesEmail,
      subject: `🎯 New Quote Request - ${quote.quoteId}`,
      html: generateAdminEmailHTML(quote),
      text: generateAdminEmailText(quote),
      replyTo: quote.customer.email, // Allow admin to reply directly to customer
      tags: [
        { name: 'type', value: 'quote-admin-notification' },
        { name: 'quote-id', value: quote.quoteId }
      ]
    });

    if (adminEmailResult.data) {
      results.admin.success = true;
      results.admin.messageId = adminEmailResult.data.id;
      console.log('✅ Admin email sent:', adminEmailResult.data.id);
    } else if (adminEmailResult.error) {
      results.admin.error = adminEmailResult.error.message;
      console.error('❌ Admin email failed:', adminEmailResult.error);
    }

  } catch (error) {
    results.admin.error = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Error sending admin email:', error);
  }

  try {
    // Send confirmation email to customer
    console.log('📧 Sending customer confirmation email...');
    const customerEmailResult = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: quote.customer.email,
      subject: `✅ Quote Request Received - ${quote.quoteId}`,
      html: generateCustomerEmailHTML(quote),
      text: generateCustomerEmailText(quote),
      replyTo: EMAIL_CONFIG.replyTo,
      tags: [
        { name: 'type', value: 'quote-customer-confirmation' },
        { name: 'quote-id', value: quote.quoteId }
      ]
    });

    if (customerEmailResult.data) {
      results.customer.success = true;
      results.customer.messageId = customerEmailResult.data.id;
      console.log('✅ Customer email sent:', customerEmailResult.data.id);
    } else if (customerEmailResult.error) {
      results.customer.error = customerEmailResult.error.message;
      console.error('❌ Customer email failed:', customerEmailResult.error);
    }

  } catch (error) {
    results.customer.error = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Error sending customer email:', error);
  }

  // Log summary
  console.log('📊 Email sending summary:', {
    admin: results.admin.success ? 'Sent' : 'Failed',
    customer: results.customer.success ? 'Sent' : 'Failed'
  });

  return results;
}

/**
 * Send test email to verify Resend configuration
 * Useful for testing email setup
 */
export async function sendTestEmail(toEmail: string) {
  try {
    const result = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: toEmail,
      subject: 'V7MPC Email Configuration Test',
      html: `
        <h1>Email Configuration Test</h1>
        <p>If you're reading this, your Resend email configuration is working correctly!</p>
        <p><strong>Configuration:</strong></p>
        <ul>
          <li>From: ${EMAIL_CONFIG.from}</li>
          <li>Admin Email: ${EMAIL_CONFIG.quotesEmail}</li>
          <li>Reply To: ${EMAIL_CONFIG.replyTo}</li>
        </ul>
      `,
      text: 'Email Configuration Test - If you\'re reading this, your Resend email configuration is working correctly!'
    });

    if (result.data) {
      console.log('✅ Test email sent:', result.data.id);
      return { success: true, messageId: result.data.id };
    } else if (result.error) {
      console.error('❌ Test email failed:', result.error);
      return { success: false, error: result.error.message };
    }
  } catch (error) {
    console.error('❌ Error sending test email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
