import { NextRequest, NextResponse } from 'next/server';
import { sendTestEmail } from '@/lib/email/send-quote-emails';

/**
 * POST /api/test-email
 * Test endpoint to verify Resend email configuration
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email address is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address format' },
        { status: 400 }
      );
    }

    console.log(`📧 Testing email configuration by sending to: ${email}`);

    const result = await sendTestEmail(email);

    if (!result) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email service did not return a result'
        },
        { status: 500 }
      );
    }

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Test email sent successfully',
        messageId: result.messageId,
        recipient: email
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Failed to send test email'
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('❌ Test email endpoint error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/test-email
 * Returns instructions
 */
export async function GET() {
  return NextResponse.json({
    message: 'Test Email Endpoint',
    usage: 'POST with { "email": "your-email@example.com" }',
    purpose: 'Tests Resend email configuration',
    documentation: 'See RESEND_SETUP.md for setup instructions'
  });
}
