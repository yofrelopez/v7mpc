'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Mail, Phone, ArrowLeft, FileText, Clock, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function QuoteConfirmation() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const quoteId = searchParams.get('id');

  if (!quoteId) {
    return (
      <div className="max-w-3xl mx-auto">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-red-900 mb-2">Invalid Quote ID</h2>
              <p className="text-red-700 mb-4">No quote ID was provided.</p>
              <Button onClick={() => router.push('/quote')} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Return to Quote Form
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Success Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold text-slate-800 mb-2">
          Quote Request Submitted!
        </h1>
        <p className="text-lg text-slate-600">
          Thank you for your interest in our products
        </p>
      </div>

      {/* Quote ID Card */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-900 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Your Quote Reference Number
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-white border border-green-200 rounded-lg p-4">
            <p className="text-sm text-slate-600 mb-1">Quote ID</p>
            <p className="text-2xl font-mono font-bold text-green-700">{quoteId}</p>
          </div>
          <p className="text-sm text-green-800 mt-3">
            Please save this reference number for your records. You&apos;ll receive a confirmation email shortly.
          </p>
        </CardContent>
      </Card>

      {/* Next Steps Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-slate-800 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            What Happens Next?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-sm mr-3">
              1
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Email Confirmation</h3>
              <p className="text-slate-600 text-sm">
                You&apos;ll receive an email confirmation with your quote details within a few minutes.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-sm mr-3">
              2
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Review & Pricing</h3>
              <p className="text-slate-600 text-sm">
                Our team will review your requirements and prepare a detailed quote.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-sm mr-3">
              3
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">We&apos;ll Contact You</h3>
              <p className="text-slate-600 text-sm">
                Expect to hear from us within <strong>24 hours</strong> with your personalized quote.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information Card */}
      <Card className="bg-slate-50">
        <CardHeader>
          <CardTitle className="text-slate-800">Need Immediate Assistance?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center text-slate-700">
            <Phone className="w-5 h-5 mr-3 text-slate-500" />
            <div>
              <p className="text-sm font-medium">Call us at</p>
              <a href="tel:+17876550000" className="text-blue-600 hover:underline font-semibold">
                +1 (787) 655-0000
              </a>
            </div>
          </div>

          <div className="flex items-center text-slate-700">
            <MessageSquare className="w-5 h-5 mr-3 text-slate-500" />
            <div>
              <p className="text-sm font-medium">Have questions?</p>
              <Link href="/contact" className="text-blue-600 hover:underline font-semibold">
                Contact us here
              </Link>
            </div>
          </div>

          <p className="text-sm text-slate-600 pt-2 border-t border-slate-200">
            Our team is here to help with any questions about your quote!
          </p>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button
          onClick={() => router.push('/')}
          variant="outline"
          className="flex-1"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Return to Home
        </Button>
        
        <Link href="/products" className="flex-1">
          <Button className="w-full bg-slate-600 hover:bg-slate-700 text-white">
            Browse More Products
          </Button>
        </Link>
      </div>
    </div>
  );
}
