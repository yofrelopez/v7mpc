# Resend Email Setup Guide

## Step 1: Get Resend API Key

1. Go to [Resend](https://resend.com)
2. Sign up for a free account (3,000 emails/month free)
3. Verify your email
4. Go to [API Keys](https://resend.com/api-keys)
5. Click "Create API Key"
6. Name it "V7MPC Development" or similar
7. Copy the API key (starts with `re_`)

## Step 2: Update .env.local

Open `.env.local` and replace:

```env
RESEND_API_KEY=your_resend_api_key_here
```

With your actual API key:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Step 3: Configure Emails (Optional)

By default, the system uses:
- **FROM_EMAIL**: `onboarding@resend.dev` (Resend's test email)
- **ADMIN_EMAIL**: `info@v7mpc.com` (receives quote notifications)

### For Production:

You'll need to verify your domain with Resend:
1. Go to [Domains](https://resend.com/domains)
2. Add your domain (e.g., `v7mpc.com`)
3. Add DNS records provided by Resend
4. Wait for verification
5. Update `.env.local`:

```env
FROM_EMAIL=noreply@v7mpc.com
ADMIN_EMAIL=info@v7mpc.com
```

### For Development/Testing:

Keep the defaults:
```env
FROM_EMAIL=onboarding@resend.dev
ADMIN_EMAIL=your-test-email@gmail.com  # Change to your email for testing
```

## Step 4: Test Email Setup

After configuring your API key, restart the dev server:

```bash
npm run dev
```

Then run the test:

```bash
node test-email-setup.mjs
```

This will:
1. Validate your email configuration
2. Send a test email to verify Resend is working
3. Show any configuration warnings

## Step 5: Test Quote Submission with Emails

Run the full quote API test:

```bash
node test-quote-api.mjs
```

Check your email inbox (ADMIN_EMAIL) for:
- Admin notification email with quote details
- Customer confirmation email (sent to the test customer email)

## Troubleshooting

### Error: "Missing API key"
- Make sure `RESEND_API_KEY` is set in `.env.local`
- Restart the dev server after updating `.env.local`

### Error: "Invalid API key"
- Check that the API key starts with `re_`
- Make sure you copied the entire key
- Try creating a new API key

### Emails not arriving
- Check spam folder
- Verify the email addresses in `.env.local`
- For `onboarding@resend.dev`, you can only send to verified emails
- In Resend free tier, add recipient emails in [Audience](https://resend.com/audiences)

### Rate Limits
- Free tier: 3,000 emails/month, 100 emails/day
- If you hit the limit, emails will fail but quote submission will still succeed

## Email Templates

The system sends two emails per quote:

1. **Admin Notification** (`to: ADMIN_EMAIL`)
   - Subject: "🎯 New Quote Request - [Quote ID]"
   - Contains full quote details
   - Reply-to: Customer's email

2. **Customer Confirmation** (`to: Customer's email`)
   - Subject: "✅ Quote Request Received - [Quote ID]"
   - Contains quote summary and next steps
   - Reply-to: ADMIN_EMAIL

## Next Steps

Once emails are working:
1. Test the full flow from the website form
2. Verify both emails are received
3. Check email formatting in different email clients
4. Consider setting up a custom domain for production
