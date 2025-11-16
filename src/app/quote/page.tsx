'use client';

import { Suspense } from 'react';
import QuoteForm from '@/components/quote/QuoteForm';

export default function QuotePage() {
  return (
    <div className="bg-slate-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">
            Request a Quote
          </h1>
          <p className="text-slate-600 text-lg">
            Get a personalized quote for your promotional product needs. Our team will respond within 24 hours.
          </p>
        </div>
        
        {/* Quote Form */}
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <QuoteForm />
        </Suspense>
      </div>
    </div>
  );
}