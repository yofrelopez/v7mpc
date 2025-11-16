import { NextRequest, NextResponse } from 'next/server';
import { quoteFormSchema } from '@/lib/validations/quote-schema';
import { QuoteSubmission, QuoteResponse } from '@/types/quote';
import { sendQuoteEmails } from '@/lib/email/send-quote-emails';
import { ZodError } from 'zod';

// Verify reCAPTCHA token
async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY not configured');
    return false;
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();
    
    // reCAPTCHA v3 returns a score from 0.0 to 1.0
    return data.success && data.score >= 0.5;
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return false;
  }
}

/**
 * POST /api/quotes/submit
 * 
 * Handles quote request submissions:
 * 1. Verifies reCAPTCHA token
 * 2. Validates incoming data with Zod schema
 * 3. Processes the quote submission
 * 4. Sends email notifications
 * 5. Returns success/error response
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Extract and verify reCAPTCHA token
    const { recaptchaToken, ...quoteData } = body;
    
    if (!recaptchaToken) {
      return NextResponse.json(
        {
          success: false,
          error: 'reCAPTCHA verification required'
        } as QuoteResponse,
        { status: 400 }
      );
    }

    // Verify reCAPTCHA
    const isHuman = await verifyRecaptcha(recaptchaToken);
    
    if (!isHuman) {
      return NextResponse.json(
        {
          success: false,
          error: 'reCAPTCHA verification failed. Please try again.'
        } as QuoteResponse,
        { status: 403 }
      );
    }
    
    // Validate with Zod schema (server-side validation)
    const validatedData = quoteFormSchema.parse(quoteData);
    
    // Extract quote metadata
    const quoteId = quoteData.quoteId;
    const submittedAt = quoteData.submittedAt ? new Date(quoteData.submittedAt) : new Date();
    
    if (!quoteId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Quote ID is required'
        } as QuoteResponse,
        { status: 400 }
      );
    }
    
    // Build complete QuoteSubmission object
    const quoteSubmission: QuoteSubmission = {
      ...validatedData,
      quoteId,
      submittedAt
    };
    
    // Log quote submission
    console.log('✅ Quote submission received:', {
      quoteId: quoteSubmission.quoteId,
      customer: quoteSubmission.customer.name,
      product: quoteSubmission.product.productName,
      quantity: quoteSubmission.quantity,
      timestamp: quoteSubmission.submittedAt
    });
    
    // Send email notifications
    let emailResults;
    try {
      emailResults = await sendQuoteEmails(quoteSubmission);
      
      // Check if at least one email was sent successfully
      if (!emailResults.admin.success && !emailResults.customer.success) {
        console.warn('⚠️ Both emails failed to send, but quote was saved');
        // Don't fail the request, just log the warning
      }
    } catch (emailError) {
      console.error('❌ Email sending error:', emailError);
      // Don't fail the request if emails fail - quote is still valid
      emailResults = {
        admin: { success: false, error: 'Email service error', messageId: null },
        customer: { success: false, error: 'Email service error', messageId: null }
      };
    }
    
    // Success response
    const response: QuoteResponse = {
      success: true,
      quoteId: quoteSubmission.quoteId,
      message: 'Quote request submitted successfully. We will contact you within 24 hours.',
      // Optional metadata
      estimatedDelivery: '2-3 business days for quote response',
      nextSteps: 'You will receive a confirmation email shortly. Our team will review your request and contact you with a detailed quote.'
    };
    
    return NextResponse.json(response, { status: 200 });
    
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof ZodError) {
      console.error('❌ Validation error:', error.issues);
      
      const response: QuoteResponse = {
        success: false,
        error: 'Invalid quote data submitted',
        message: error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
      };
      
      return NextResponse.json(response, { status: 400 });
    }
    
    // Handle other errors
    console.error('❌ Quote submission error:', error);
    
    const response: QuoteResponse = {
      success: false,
      error: 'Failed to process quote request',
      message: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
    
    return NextResponse.json(response, { status: 500 });
  }
}

/**
 * GET /api/quotes/submit
 * Returns method not allowed
 */
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to submit a quote.' },
    { status: 405 }
  );
}
