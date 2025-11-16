import { resend, EMAIL_CONFIG } from './resend-client';
import { ContactSubmission } from '@/types/contact';
import {
  generateContactAdminEmail,
  generateContactCustomerEmail,
  generateContactAdminEmailText,
  generateContactCustomerEmailText
} from './contact-email-templates';

export async function sendContactEmails(data: ContactSubmission) {
  try {
    // Send email to admin
    const adminEmailResult = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: EMAIL_CONFIG.contactEmail,
      subject: `New Contact: ${data.subject}`,
      html: generateContactAdminEmail(data),
      text: generateContactAdminEmailText(data),
    });

    // Send confirmation email to customer
    const customerEmailResult = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: data.email,
      subject: 'Thank You for Contacting V7MPC',
      html: generateContactCustomerEmail(data),
      text: generateContactCustomerEmailText(data),
    });

    return {
      success: true,
      adminEmailId: adminEmailResult.data?.id,
      customerEmailId: customerEmailResult.data?.id,
    };
  } catch (error) {
    console.error('Error sending contact emails:', error);
    throw error;
  }
}
