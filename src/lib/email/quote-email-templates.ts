import { QuoteSubmission } from '@/types/quote';

/**
 * Generate HTML email template for admin notification
 * Sent to V7MPC when a new quote request is submitted
 */
export function generateAdminEmailHTML(quote: QuoteSubmission): string {
  const {
    quoteId,
    customer,
    product,
    quantity,
    customization,
    timeline,
    message,
    submittedAt
  } = quote;

  // Format customization details
  const customizationHTML = customization
    ? Object.entries(customization)
        .filter(([_, value]) => value !== undefined && value !== '')
        .map(([key, value]) => {
          const displayKey = key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase());
          const displayValue = Array.isArray(value) ? value.join(', ') : value;
          return `<li><strong>${displayKey}:</strong> ${displayValue}</li>`;
        })
        .join('')
    : '';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Quote Request - ${quoteId}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #334155 0%, #475569 100%);
      color: white;
      padding: 20px;
      border-radius: 8px 8px 0 0;
      margin: -30px -30px 30px -30px;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .quote-id {
      font-size: 18px;
      font-weight: bold;
      color: #10b981;
      margin-top: 5px;
    }
    .section {
      margin-bottom: 25px;
      padding-bottom: 20px;
      border-bottom: 1px solid #e5e7eb;
    }
    .section:last-child {
      border-bottom: none;
    }
    .section h2 {
      color: #334155;
      font-size: 18px;
      margin-bottom: 15px;
      border-left: 4px solid #10b981;
      padding-left: 10px;
    }
    .info-row {
      margin-bottom: 10px;
    }
    .label {
      font-weight: 600;
      color: #475569;
      display: inline-block;
      min-width: 120px;
    }
    .value {
      color: #1f2937;
    }
    ul {
      margin: 10px 0;
      padding-left: 20px;
    }
    ul li {
      margin-bottom: 8px;
    }
    .product-image {
      max-width: 200px;
      border-radius: 8px;
      margin: 10px 0;
    }
    .message-box {
      background-color: #f8fafc;
      border-left: 4px solid #3b82f6;
      padding: 15px;
      border-radius: 4px;
      margin-top: 10px;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 2px solid #e5e7eb;
      color: #6b7280;
      font-size: 14px;
    }
    .priority {
      background-color: #fef3c7;
      color: #92400e;
      padding: 8px 15px;
      border-radius: 4px;
      display: inline-block;
      margin-bottom: 20px;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎯 New Quote Request</h1>
      <div class="quote-id">Quote ID: ${quoteId}</div>
    </div>

    <div class="priority">⚡ Action Required: Review and respond within 24 hours</div>

    <!-- Customer Information -->
    <div class="section">
      <h2>👤 Customer Information</h2>
      <div class="info-row">
        <span class="label">Name:</span>
        <span class="value">${customer.name}</span>
      </div>
      <div class="info-row">
        <span class="label">Email:</span>
        <span class="value"><a href="mailto:${customer.email}">${customer.email}</a></span>
      </div>
      ${customer.company ? `
      <div class="info-row">
        <span class="label">Company:</span>
        <span class="value">${customer.company}</span>
      </div>
      ` : ''}
      ${customer.phone ? `
      <div class="info-row">
        <span class="label">Phone:</span>
        <span class="value"><a href="tel:${customer.phone}">${customer.phone}</a></span>
      </div>
      ` : ''}
    </div>

    <!-- Product Information -->
    <div class="section">
      <h2>📦 Product Details</h2>
      <div class="info-row">
        <span class="label">Product:</span>
        <span class="value"><strong>${product.productName}</strong></span>
      </div>
      <div class="info-row">
        <span class="label">Source:</span>
        <span class="value">${product.source === 'catalog' ? '📚 Catalog Product' : '✨ Custom Product'}</span>
      </div>
      ${product.productId ? `
      <div class="info-row">
        <span class="label">Product ID:</span>
        <span class="value">${product.productId}</span>
      </div>
      ` : ''}
      ${product.categoryName ? `
      <div class="info-row">
        <span class="label">Category:</span>
        <span class="value">${product.categoryName}</span>
      </div>
      ` : ''}
      ${product.customDescription ? `
      <div class="message-box">
        <strong>Custom Product Description:</strong><br>
        ${product.customDescription}
      </div>
      ` : ''}
    </div>

    <!-- Order Details -->
    <div class="section">
      <h2>📊 Order Details</h2>
      <div class="info-row">
        <span class="label">Quantity:</span>
        <span class="value"><strong>${quantity.toLocaleString()}</strong> units</span>
      </div>
      ${timeline ? `
      <div class="info-row">
        <span class="label">Timeline:</span>
        <span class="value">${timeline}</span>
      </div>
      ` : ''}
    </div>

    <!-- Customization -->
    ${customizationHTML ? `
    <div class="section">
      <h2>🎨 Customization Requirements</h2>
      <ul>
        ${customizationHTML}
      </ul>
    </div>
    ` : ''}

    <!-- Additional Message -->
    ${message ? `
    <div class="section">
      <h2>💬 Customer Message</h2>
      <div class="message-box">
        ${message}
      </div>
    </div>
    ` : ''}

    <!-- Submission Info -->
    <div class="section">
      <h2>ℹ️ Submission Details</h2>
      <div class="info-row">
        <span class="label">Submitted:</span>
        <span class="value">${new Date(submittedAt).toLocaleString('en-US', {
          dateStyle: 'full',
          timeStyle: 'short'
        })}</span>
      </div>
    </div>

    <div class="footer">
      <p><strong>V7MPC Quote Management System</strong></p>
      <p>This is an automated notification. Please respond to the customer within 24 hours.</p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Generate HTML email template for customer confirmation
 * Sent to customer after submitting quote request
 */
export function generateCustomerEmailHTML(quote: QuoteSubmission): string {
  const { quoteId, customer, product, quantity, submittedAt } = quote;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quote Request Confirmation - ${quoteId}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .success-icon {
      font-size: 64px;
      margin-bottom: 15px;
    }
    .header h1 {
      color: #334155;
      font-size: 28px;
      margin: 0 0 10px 0;
    }
    .header p {
      color: #64748b;
      font-size: 16px;
      margin: 0;
    }
    .quote-id-box {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      margin: 30px 0;
    }
    .quote-id-box .label {
      font-size: 14px;
      opacity: 0.9;
      margin-bottom: 5px;
    }
    .quote-id-box .id {
      font-size: 24px;
      font-weight: bold;
      font-family: 'Courier New', monospace;
    }
    .summary {
      background-color: #f8fafc;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .summary h3 {
      margin-top: 0;
      color: #334155;
      font-size: 18px;
    }
    .summary-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #e2e8f0;
    }
    .summary-row:last-child {
      border-bottom: none;
    }
    .summary-label {
      color: #64748b;
      font-weight: 500;
    }
    .summary-value {
      color: #1e293b;
      font-weight: 600;
    }
    .next-steps {
      margin: 30px 0;
    }
    .step {
      display: flex;
      margin-bottom: 20px;
    }
    .step-number {
      background-color: #3b82f6;
      color: white;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      margin-right: 15px;
      flex-shrink: 0;
    }
    .step-content h4 {
      margin: 0 0 5px 0;
      color: #334155;
      font-size: 16px;
    }
    .step-content p {
      margin: 0;
      color: #64748b;
      font-size: 14px;
    }
    .contact-box {
      background-color: #eff6ff;
      border-left: 4px solid #3b82f6;
      padding: 20px;
      border-radius: 4px;
      margin: 30px 0;
    }
    .contact-box h3 {
      margin-top: 0;
      color: #1e40af;
      font-size: 18px;
    }
    .contact-info {
      margin: 10px 0;
    }
    .contact-info a {
      color: #2563eb;
      text-decoration: none;
      font-weight: 500;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #e5e7eb;
      color: #6b7280;
      font-size: 14px;
    }
    .footer p {
      margin: 5px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="success-icon">✅</div>
      <h1>Quote Request Received!</h1>
      <p>Thank you for your interest in our products</p>
    </div>

    <div class="quote-id-box">
      <div class="label">Your Quote Reference Number</div>
      <div class="id">${quoteId}</div>
    </div>

    <p style="text-align: center; color: #64748b;">
      Please save this reference number for your records. You'll receive a detailed quote within 24 hours.
    </p>

    <div class="summary">
      <h3>📋 Request Summary</h3>
      <div class="summary-row">
        <span class="summary-label">Product</span>
        <span class="summary-value">${product.productName}</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">Quantity</span>
        <span class="summary-value">${quantity.toLocaleString()} units</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">Submitted</span>
        <span class="summary-value">${new Date(submittedAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })}</span>
      </div>
    </div>

    <div class="next-steps">
      <h3 style="color: #334155; margin-bottom: 20px;">⏭️ What Happens Next?</h3>
      
      <div class="step">
        <div class="step-number">1</div>
        <div class="step-content">
          <h4>Email Confirmation</h4>
          <p>You're reading it! This confirms we received your quote request.</p>
        </div>
      </div>

      <div class="step">
        <div class="step-number">2</div>
        <div class="step-content">
          <h4>Review & Pricing</h4>
          <p>Our team will review your requirements and prepare a detailed quote with pricing.</p>
        </div>
      </div>

      <div class="step">
        <div class="step-number">3</div>
        <div class="step-content">
          <h4>We'll Contact You</h4>
          <p>Expect to hear from us within <strong>24 hours</strong> with your personalized quote.</p>
        </div>
      </div>
    </div>

    <div class="contact-box">
      <h3>Need Immediate Assistance?</h3>
      <div class="contact-info">
        📞 <strong>Phone:</strong> <a href="tel:+17876550000">+1 (787) 655-0000</a>
      </div>
      <div class="contact-info">
        🌐 <strong>Website:</strong> <a href="https://v7mpc.com">www.v7mpc.com</a>
      </div>
      <p style="margin-top: 15px; font-size: 14px; color: #475569;">
        Have questions about your quote? Our team is here to help!
      </p>
    </div>

    <div class="footer">
      <p><strong>V7 Marketing & Promotional Concepts</strong></p>
      <p>Professional promotional products and custom merchandise solutions</p>
      <p style="margin-top: 15px; font-size: 12px;">
        This is an automated confirmation email. Please do not reply directly to this message.
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Generate plain text version for admin email
 */
export function generateAdminEmailText(quote: QuoteSubmission): string {
  const {
    quoteId,
    customer,
    product,
    quantity,
    customization,
    timeline,
    message,
    submittedAt
  } = quote;

  let text = `NEW QUOTE REQUEST - ${quoteId}\n\n`;
  text += `ACTION REQUIRED: Review and respond within 24 hours\n\n`;
  text += `--- CUSTOMER INFORMATION ---\n`;
  text += `Name: ${customer.name}\n`;
  text += `Email: ${customer.email}\n`;
  if (customer.company) text += `Company: ${customer.company}\n`;
  if (customer.phone) text += `Phone: ${customer.phone}\n`;
  
  text += `\n--- PRODUCT DETAILS ---\n`;
  text += `Product: ${product.productName}\n`;
  text += `Source: ${product.source === 'catalog' ? 'Catalog Product' : 'Custom Product'}\n`;
  if (product.productId) text += `Product ID: ${product.productId}\n`;
  if (product.categoryName) text += `Category: ${product.categoryName}\n`;
  if (product.customDescription) text += `Custom Description: ${product.customDescription}\n`;
  
  text += `\n--- ORDER DETAILS ---\n`;
  text += `Quantity: ${quantity.toLocaleString()} units\n`;
  if (timeline) text += `Timeline: ${timeline}\n`;
  
  if (customization && Object.keys(customization).length > 0) {
    text += `\n--- CUSTOMIZATION ---\n`;
    Object.entries(customization).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        const displayKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        const displayValue = Array.isArray(value) ? value.join(', ') : value;
        text += `${displayKey}: ${displayValue}\n`;
      }
    });
  }
  
  if (message) {
    text += `\n--- CUSTOMER MESSAGE ---\n${message}\n`;
  }
  
  text += `\n--- SUBMISSION INFO ---\n`;
  text += `Submitted: ${new Date(submittedAt).toLocaleString()}\n`;
  
  return text;
}

/**
 * Generate plain text version for customer email
 */
export function generateCustomerEmailText(quote: QuoteSubmission): string {
  const { quoteId, customer, product, quantity, submittedAt } = quote;

  let text = `QUOTE REQUEST CONFIRMATION\n\n`;
  text += `Thank you for your quote request!\n\n`;
  text += `Your Quote Reference Number: ${quoteId}\n`;
  text += `Please save this number for your records.\n\n`;
  text += `--- REQUEST SUMMARY ---\n`;
  text += `Product: ${product.productName}\n`;
  text += `Quantity: ${quantity.toLocaleString()} units\n`;
  text += `Submitted: ${new Date(submittedAt).toLocaleDateString()}\n\n`;
  text += `--- WHAT HAPPENS NEXT? ---\n\n`;
  text += `1. Email Confirmation\n`;
  text += `   You're reading it! This confirms we received your request.\n\n`;
  text += `2. Review & Pricing\n`;
  text += `   Our team will prepare a detailed quote with pricing.\n\n`;
  text += `3. We'll Contact You\n`;
  text += `   Expect to hear from us within 24 hours.\n\n`;
  text += `--- NEED HELP? ---\n`;
  text += `Phone: +1 (787) 655-0000\n`;
  text += `Website: www.v7mpc.com\n\n`;
  text += `V7 Marketing & Promotional Concepts\n`;
  text += `Professional promotional products and custom merchandise solutions\n`;
  
  return text;
}
