import { ContactSubmission } from '@/types/contact';

// Generate admin email HTML for contact form
export function generateContactAdminEmail(data: ContactSubmission): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 40px 20px;">
            <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #475569 0%, #334155 100%); padding: 40px 30px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                    📬 New Contact Message
                  </h1>
                  <p style="margin: 10px 0 0; color: #e2e8f0; font-size: 14px;">
                    ${new Date(data.submittedAt).toLocaleString('en-US', { 
                      dateStyle: 'full', 
                      timeStyle: 'short' 
                    })}
                  </p>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  
                  <!-- Customer Information -->
                  <div style="background-color: #f8fafc; border-left: 4px solid #475569; padding: 20px; margin-bottom: 30px; border-radius: 4px;">
                    <h2 style="margin: 0 0 15px; color: #1e293b; font-size: 18px; font-weight: 600;">
                      Contact Information
                    </h2>
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 120px; font-weight: 500;">Name:</td>
                        <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${data.name}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: 500;">Email:</td>
                        <td style="padding: 8px 0;">
                          <a href="mailto:${data.email}" style="color: #3b82f6; text-decoration: none; font-size: 14px; font-weight: 600;">
                            ${data.email}
                          </a>
                        </td>
                      </tr>
                      ${data.company ? `
                      <tr>
                        <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: 500;">Company:</td>
                        <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${data.company}</td>
                      </tr>
                      ` : ''}
                      ${data.phone ? `
                      <tr>
                        <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: 500;">Phone:</td>
                        <td style="padding: 8px 0;">
                          <a href="tel:${data.phone}" style="color: #3b82f6; text-decoration: none; font-size: 14px; font-weight: 600;">
                            ${data.phone}
                          </a>
                        </td>
                      </tr>
                      ` : ''}
                    </table>
                  </div>

                  <!-- Subject -->
                  <div style="margin-bottom: 20px;">
                    <h3 style="margin: 0 0 10px; color: #475569; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                      Subject
                    </h3>
                    <p style="margin: 0; color: #1e293b; font-size: 16px; font-weight: 600; padding: 15px; background-color: #f1f5f9; border-radius: 6px;">
                      ${data.subject}
                    </p>
                  </div>

                  <!-- Message -->
                  <div style="margin-bottom: 30px;">
                    <h3 style="margin: 0 0 10px; color: #475569; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                      Message
                    </h3>
                    <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; border: 1px solid #e2e8f0;">
                      <p style="margin: 0; color: #334155; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">
${data.message}
                      </p>
                    </div>
                  </div>

                  <!-- Action Button -->
                  <div style="text-align: center; margin-top: 30px;">
                    <a href="mailto:${data.email}?subject=Re: ${encodeURIComponent(data.subject)}" 
                       style="display: inline-block; background-color: #475569; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px;">
                      Reply to ${data.name}
                    </a>
                  </div>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #f8fafc; padding: 25px 30px; border-top: 1px solid #e2e8f0;">
                  <p style="margin: 0; color: #64748b; font-size: 12px; text-align: center; line-height: 1.5;">
                    This is an automated message from your V7MPC website contact form.<br>
                    Submitted at ${new Date(data.submittedAt).toLocaleString()}
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

// Generate customer confirmation email
export function generateContactCustomerEmail(data: ContactSubmission): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You for Contacting V7MPC</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 40px 20px;">
            <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #475569 0%, #334155 100%); padding: 40px 30px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                    ✉️ Message Received
                  </h1>
                  <p style="margin: 10px 0 0; color: #e2e8f0; font-size: 16px;">
                    Thank you for contacting V7MPC
                  </p>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  
                  <p style="margin: 0 0 20px; color: #1e293b; font-size: 16px; line-height: 1.6;">
                    Hello <strong>${data.name}</strong>,
                  </p>

                  <p style="margin: 0 0 20px; color: #475569; font-size: 15px; line-height: 1.6;">
                    We've received your message and our team will review it shortly. We typically respond to all inquiries within <strong>24 business hours</strong>.
                  </p>

                  <!-- Message Summary -->
                  <div style="background-color: #f8fafc; border-left: 4px solid #475569; padding: 20px; margin: 25px 0; border-radius: 4px;">
                    <h3 style="margin: 0 0 15px; color: #1e293b; font-size: 16px; font-weight: 600;">
                      Your Message Summary
                    </h3>
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 6px 0; color: #64748b; font-size: 14px; width: 100px;">Subject:</td>
                        <td style="padding: 6px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${data.subject}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; color: #64748b; font-size: 14px;">Sent:</td>
                        <td style="padding: 6px 0; color: #1e293b; font-size: 14px;">
                          ${new Date(data.submittedAt).toLocaleString('en-US', { 
                            dateStyle: 'medium', 
                            timeStyle: 'short' 
                          })}
                        </td>
                      </tr>
                    </table>
                  </div>

                  <!-- Next Steps -->
                  <div style="background-color: #eff6ff; padding: 20px; border-radius: 6px; margin: 25px 0;">
                    <h3 style="margin: 0 0 12px; color: #1e40af; font-size: 16px; font-weight: 600;">
                      What Happens Next?
                    </h3>
                    <ul style="margin: 0; padding-left: 20px; color: #1e3a8a; font-size: 14px; line-height: 1.8;">
                      <li>Our team will review your message</li>
                      <li>A specialist will respond within 24 business hours</li>
                      <li>For urgent matters, call us at <a href="tel:+17862867540" style="color: #2563eb; text-decoration: none; font-weight: 600;">+1 (786) 286-7540</a></li>
                    </ul>
                  </div>

                  <!-- Contact Info -->
                  <div style="margin-top: 30px; padding-top: 25px; border-top: 1px solid #e2e8f0;">
                    <p style="margin: 0 0 15px; color: #64748b; font-size: 14px;">
                      <strong style="color: #1e293b;">V7 Marketplace Corporation</strong><br>
                      225 N Pace Blvd. Suite 225<br>
                      Pensacola, FL 32505<br>
                      Phone: <a href="tel:+17862867540" style="color: #3b82f6; text-decoration: none;">+1 (786) 286-7540</a><br>
                      Email: <a href="mailto:contact@v7mpc.com" style="color: #3b82f6; text-decoration: none;">contact@v7mpc.com</a>
                    </p>
                  </div>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #f8fafc; padding: 25px 30px; border-top: 1px solid #e2e8f0; text-align: center;">
                  <p style="margin: 0 0 10px; color: #64748b; font-size: 12px;">
                    This is an automated confirmation email.
                  </p>
                  <p style="margin: 0; color: #94a3b8; font-size: 11px;">
                    © ${new Date().getFullYear()} V7 Marketplace Corporation. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

// Plain text versions
export function generateContactAdminEmailText(data: ContactSubmission): string {
  return `
NEW CONTACT FORM SUBMISSION
===========================

Submitted: ${new Date(data.submittedAt).toLocaleString()}

CONTACT INFORMATION:
Name: ${data.name}
Email: ${data.email}
${data.company ? `Company: ${data.company}` : ''}
${data.phone ? `Phone: ${data.phone}` : ''}

SUBJECT:
${data.subject}

MESSAGE:
${data.message}

---
Reply to: ${data.email}
  `.trim();
}

export function generateContactCustomerEmailText(data: ContactSubmission): string {
  return `
Thank you for contacting V7MPC!

Hello ${data.name},

We've received your message and our team will review it shortly. We typically respond to all inquiries within 24 business hours.

YOUR MESSAGE SUMMARY:
Subject: ${data.subject}
Sent: ${new Date(data.submittedAt).toLocaleString()}

WHAT HAPPENS NEXT?
- Our team will review your message
- A specialist will respond within 24 business hours
- For urgent matters, call us at +1 (786) 286-7540

CONTACT INFORMATION:
V7 Marketplace Corporation
225 N Pace Blvd. Suite 225
Pensacola, FL 32505
Phone: +1 (786) 286-7540
Email: contact@v7mpc.com

---
This is an automated confirmation email.
© ${new Date().getFullYear()} V7 Marketplace Corporation. All rights reserved.
  `.trim();
}
