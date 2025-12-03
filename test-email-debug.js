/**
 * Email Debug Script - Professional Debugging
 * Tests Resend email configuration and sends test emails
 *
 * Usage: node test-email-debug.js
 */

const { Resend } = require('resend');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// ANSI colors for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function section(title) {
  console.log('\n' + '='.repeat(60));
  log('cyan', `  ${title}`);
  console.log('='.repeat(60) + '\n');
}

async function debugEmail() {
  section('EMAIL CONFIGURATION DEBUG');

  // Step 1: Check environment variables
  log('blue', '1. Checking Environment Variables...\n');

  const config = {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    FROM_EMAIL: process.env.FROM_EMAIL,
    CONTACT_EMAIL: process.env.CONTACT_EMAIL,
    QUOTES_EMAIL: process.env.QUOTES_EMAIL,
  };

  let hasErrors = false;

  Object.entries(config).forEach(([key, value]) => {
    if (!value) {
      log('red', `   ✗ ${key}: MISSING`);
      hasErrors = true;
    } else {
      log('green', `   ✓ ${key}: ${value}`);
    }
  });

  if (hasErrors) {
    log('red', '\n❌ Configuration errors found. Please check your .env.local file.');
    process.exit(1);
  }

  // Step 2: Initialize Resend client
  section('2. Initializing Resend Client');

  const resend = new Resend(config.RESEND_API_KEY);
  log('green', '   ✓ Resend client initialized');

  // Step 3: Test API Key validity
  section('3. Testing API Key Validity');

  try {
    // Try to fetch domains to verify API key
    log('yellow', '   → Verifying API key with Resend...');

    const testResult = await resend.emails.send({
      from: config.FROM_EMAIL,
      to: 'test@resend.dev', // Resend test address
      subject: 'API Key Test',
      html: '<p>Testing API key validity</p>',
    });

    log('green', '   ✓ API Key is valid');
    log('green', `   ✓ Test email ID: ${testResult.data?.id || 'N/A'}`);
  } catch (error) {
    log('red', '   ✗ API Key validation failed');
    log('red', `   Error: ${error.message}`);

    if (error.statusCode === 403) {
      log('yellow', '\n   Possible issues:');
      log('yellow', '   - API key is invalid or expired');
      log('yellow', '   - API key does not have permission to send emails');
    }

    process.exit(1);
  }

  // Step 4: Test sending to admin email
  section('4. Sending Test Email to Admin');

  try {
    log('yellow', `   → Sending test email to ${config.CONTACT_EMAIL}...`);

    const adminEmail = await resend.emails.send({
      from: config.FROM_EMAIL,
      to: config.CONTACT_EMAIL,
      subject: '✅ Test Email - V7MPC Contact Form Debug',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Email Configuration Test</h2>
          <p>This is a test email from your V7MPC website contact form.</p>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Configuration Details:</h3>
            <ul>
              <li><strong>From:</strong> ${config.FROM_EMAIL}</li>
              <li><strong>To:</strong> ${config.CONTACT_EMAIL}</li>
              <li><strong>Time:</strong> ${new Date().toISOString()}</li>
            </ul>
          </div>
          <p style="color: #16a34a; font-weight: bold;">✅ If you received this email, your configuration is working correctly!</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #6b7280;">
            V7 Marketplace Corporation<br>
            Phone: +1 (786) 286-7540<br>
            Email: contact@v7mpc.com
          </p>
        </div>
      `,
      text: `
Email Configuration Test

This is a test email from your V7MPC website contact form.

Configuration Details:
- From: ${config.FROM_EMAIL}
- To: ${config.CONTACT_EMAIL}
- Time: ${new Date().toISOString()}

✅ If you received this email, your configuration is working correctly!

---
V7 Marketplace Corporation
Phone: +1 (786) 286-7540
Email: contact@v7mpc.com
      `,
    });

    if (adminEmail.data?.id) {
      log('green', '   ✓ Admin email sent successfully!');
      log('green', `   ✓ Email ID: ${adminEmail.data.id}`);
      log('cyan', `\n   📧 Check inbox: ${config.CONTACT_EMAIL}`);
      log('cyan', `   📊 View in Resend: https://resend.com/emails/${adminEmail.data.id}`);
    } else {
      log('yellow', '   ⚠ Email sent but no ID returned');
      log('yellow', '   Response:', JSON.stringify(adminEmail, null, 2));
    }
  } catch (error) {
    log('red', '   ✗ Failed to send admin email');
    log('red', `   Error: ${error.message}`);

    if (error.statusCode === 403) {
      log('yellow', '\n   Possible issues:');
      log('yellow', `   - Domain v7mpc.com may not be verified in Resend`);
      log('yellow', `   - FROM_EMAIL (${config.FROM_EMAIL}) may not be authorized`);
      log('yellow', `   - TO_EMAIL (${config.CONTACT_EMAIL}) may need to be verified`);
    }

    if (error.message.includes('not found')) {
      log('yellow', '\n   Possible issues:');
      log('yellow', `   - FROM_EMAIL domain (${config.FROM_EMAIL.split('@')[1]}) is not verified in Resend`);
    }

    console.error('\nFull error details:', error);
    process.exit(1);
  }

  // Step 5: Test sending confirmation to customer
  section('5. Sending Test Confirmation Email');

  try {
    // Use a test email or the admin email for testing
    const testCustomerEmail = config.QUOTES_EMAIL;

    log('yellow', `   → Sending confirmation email to ${testCustomerEmail}...`);

    const customerEmail = await resend.emails.send({
      from: config.FROM_EMAIL,
      to: testCustomerEmail,
      subject: 'Thank You for Contacting V7MPC - Test',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Thank You for Your Message!</h2>
          <p>This is a test confirmation email.</p>
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb;">
            <p><strong>We've received your message and will respond within 24 hours.</strong></p>
          </div>
          <p style="margin-top: 30px;">Best regards,<br><strong>V7MPC Team</strong></p>
        </div>
      `,
      text: `Thank You for Your Message!\n\nThis is a test confirmation email.\n\nWe've received your message and will respond within 24 hours.\n\nBest regards,\nV7MPC Team`,
    });

    if (customerEmail.data?.id) {
      log('green', '   ✓ Customer confirmation email sent successfully!');
      log('green', `   ✓ Email ID: ${customerEmail.data.id}`);
      log('cyan', `\n   📧 Check inbox: ${testCustomerEmail}`);
    }
  } catch (error) {
    log('red', '   ✗ Failed to send customer confirmation email');
    log('red', `   Error: ${error.message}`);
  }

  // Final Summary
  section('DEBUG SUMMARY');

  log('green', '✅ Email system is configured correctly!');
  log('cyan', '\nNext Steps:');
  log('cyan', '1. Check your email inbox(es) for test emails');
  log('cyan', '2. Check spam folder if emails are not in inbox');
  log('cyan', '3. View sent emails in Resend dashboard: https://resend.com/emails');
  log('cyan', '4. If emails arrived, your production form should work too!');

  console.log('\n' + '='.repeat(60) + '\n');
}

// Run the debug script
debugEmail().catch((error) => {
  log('red', '\n❌ Fatal error occurred:');
  console.error(error);
  process.exit(1);
});
