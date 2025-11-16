/**
 * Test Script for /api/quotes/submit endpoint
 * 
 * Run this after starting the dev server:
 * 1. npm run dev
 * 2. node test-quote-api.mjs
 */

const API_URL = 'http://localhost:3000/api/quotes/submit';

// Valid test data
const validQuoteData = {
  quoteId: 'Q-20251113-0001',
  submittedAt: new Date().toISOString(),
  customer: {
    name: 'John Doe',
    email: 'idevperu.pe@gmail.com', // Using your email to test customer confirmation
    company: 'Test Company Inc',
    phone: '787-555-0123'
  },
  product: {
    source: 'catalog',
    productId: 'mock-banner-001',
    productName: 'Professional Banner Stand',
    productSlug: 'professional-banner-stand',
    categoryName: 'Signs & Displays',
    categorySlug: 'signs-displays',
    imageUrl: '/home/mockup-banner-display.jpg'
  },
  quantity: 50,
  customization: {
    dimensions: '6ft x 3ft',
    material: 'Vinyl',
    colors: ['Blue', 'White']
  },
  timeline: '2 weeks',
  message: 'Need this for upcoming trade show'
};

// Invalid test data (missing required fields)
const invalidQuoteData = {
  quoteId: 'Q-20251113-0002',
  customer: {
    name: 'J', // Too short
    email: 'invalid-email', // Invalid format
  },
  product: {
    source: 'catalog',
    productName: '' // Empty
  },
  quantity: -1 // Invalid
};

async function testEndpoint(testName, data, expectedStatus) {
  console.log(`\n🧪 Testing: ${testName}`);
  console.log('📤 Request:', JSON.stringify(data, null, 2));
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    
    console.log(`📥 Response Status: ${response.status}`);
    console.log('📥 Response Body:', JSON.stringify(result, null, 2));
    
    if (response.status === expectedStatus) {
      console.log('✅ Test PASSED');
    } else {
      console.log(`❌ Test FAILED - Expected ${expectedStatus}, got ${response.status}`);
    }
    
    return result;
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

async function runTests() {
  console.log('🚀 Starting Quote API Tests...\n');
  console.log('Make sure dev server is running on http://localhost:3000');
  
  // Test 1: Valid quote submission
  await testEndpoint('Valid Quote Submission', validQuoteData, 200);
  
  // Test 2: Invalid quote data
  await testEndpoint('Invalid Quote Data', invalidQuoteData, 400);
  
  // Test 3: GET request (should fail)
  console.log('\n🧪 Testing: GET Request (should fail)');
  try {
    const response = await fetch(API_URL, { method: 'GET' });
    const result = await response.json();
    console.log(`📥 Response Status: ${response.status}`);
    console.log('📥 Response Body:', JSON.stringify(result, null, 2));
    
    if (response.status === 405) {
      console.log('✅ Test PASSED');
    } else {
      console.log('❌ Test FAILED');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
  
  console.log('\n✨ Tests completed!\n');
}

// Run tests
runTests();
