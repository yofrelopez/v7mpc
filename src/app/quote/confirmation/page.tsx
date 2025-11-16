import { Suspense } from 'react';
import { Metadata } from 'next';
import QuoteConfirmation from './QuoteConfirmation';

export const metadata: Metadata = {
  title: 'Quote Request Submitted | V7MPC',
  description: 'Your quote request has been successfully submitted. We will contact you within 24 hours.',
  robots: {
    index: false, // Don't index confirmation pages
    follow: true,
  },
};

export default function ConfirmacionPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container mx-auto px-4 py-16">
        <Suspense fallback={
          <div className="max-w-3xl mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-12 bg-slate-200 rounded w-3/4"></div>
              <div className="h-32 bg-slate-200 rounded"></div>
            </div>
          </div>
        }>
          <QuoteConfirmation />
        </Suspense>
      </div>
    </main>
  );
}
