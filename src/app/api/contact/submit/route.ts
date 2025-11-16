import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validations/contact-schema';
import { sendContactEmails } from '@/lib/email/send-contact-emails';
import { ContactSubmission, ContactResponse } from '@/types/contact';

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
    // 0.0 = likely bot, 1.0 = likely human
    // Threshold: 0.5 (adjustable)
    return data.success && data.score >= 0.5;
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Extract and verify reCAPTCHA token
    const { recaptchaToken, ...formData } = body;
    
    if (!recaptchaToken) {
      return NextResponse.json(
        {
          success: false,
          message: 'reCAPTCHA verification required',
        },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA
    const isHuman = await verifyRecaptcha(recaptchaToken);
    
    if (!isHuman) {
      return NextResponse.json(
        {
          success: false,
          message: 'reCAPTCHA verification failed. Please try again.',
        },
        { status: 403 }
      );
    }
    
    // Validate the request body
    const validationResult = contactFormSchema.safeParse(formData);
    
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const contactData = validationResult.data;

    // Create submission object
    const submission: ContactSubmission = {
      ...contactData,
      submittedAt: new Date().toISOString(),
      userAgent: request.headers.get('user-agent') || undefined,
    };

    // Send emails
    await sendContactEmails(submission);

    // Return success response
    const response: ContactResponse = {
      success: true,
      message: 'Your message has been sent successfully. We will get back to you soon!',
      contactId: `CONTACT-${Date.now()}`, // Simple ID for tracking
    };

    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error('Error processing contact submission:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while sending your message. Please try again or contact us directly.',
      },
      { status: 500 }
    );
  }
}

// Prevent GET requests
export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}
