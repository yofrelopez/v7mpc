/**
 * Email Setup Test Script
 * Tests Resend configuration and sends a test email
 * 
 * Usage:
 * 1. Configure RESEND_API_KEY in .env.local
 * 2. Update TEST_EMAIL below to your email
 * 3. npm run dev (in another terminal)
 * 4. node test-email-setup.mjs
 */

const API_URL = 'http://localhost:3000/api/test-email';
const TEST_EMAIL = 'idevperu.pe@gmail.com'; // Updated with your email

async function testEmailSetup() {
  console.log('🧪 Testing Resend Email Configuration...\n');

  if (TEST_EMAIL === 'your-email@example.com') {
    console.log('⚠️  WARNING: Update TEST_EMAIL in this file with your actual email address!\n');
  }

  try {
    console.log(`📧 Sending test email to: ${TEST_EMAIL}`);
    console.log('📤 Making request to:', API_URL);

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: TEST_EMAIL })
    });

    const result = await response.json();

    console.log(`\n📥 Response Status: ${response.status}`);
    console.log('📥 Response Body:', JSON.stringify(result, null, 2));

    if (response.status === 200 && result.success) {
      console.log('\n✅ SUCCESS! Test email sent.');
      console.log(`📬 Check your inbox at ${TEST_EMAIL}`);
      console.log(`📧 Message ID: ${result.messageId}`);
    } else {
      console.log('\n❌ FAILED to send test email');
      console.log('Error:', result.error || 'Unknown error');
      
      if (result.error?.includes('API key')) {
        console.log('\n💡 TIP: Make sure RESEND_API_KEY is set in .env.local');
        console.log('   Get your API key from: https://resend.com/api-keys');
      }
    }

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.log('\n💡 TIP: Make sure the dev server is running (npm run dev)');
  }

  console.log('\n📖 See RESEND_SETUP.md for detailed setup instructions');
}

// Run test
testEmailSetup();
