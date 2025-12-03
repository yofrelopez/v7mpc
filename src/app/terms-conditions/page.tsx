import type { Metadata } from 'next';
import { FileText, CheckCircle, XCircle, AlertTriangle, Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms & Conditions - Service Agreement',
  description: 'Terms and conditions for using V7 Marketplace Corporation services. Read our service agreement, terms of use, and business policies.',
};

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-600 rounded-2xl mb-6">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-primary text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Terms & Conditions
          </h1>
          <p className="font-accent text-lg text-slate-600">
            Last updated: November 13, 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 lg:p-12 space-y-10">
          
          {/* Introduction */}
          <section>
            <p className="font-accent text-slate-700 leading-relaxed text-lg">
              Welcome to V7 Marketplace Corporation (<strong>V7MPC</strong>). By accessing and using our website and services, you agree to be bound by these Terms and Conditions. Please read them carefully before using our services.
            </p>
          </section>

          {/* Acceptance */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-slate-600" />
              <h2 className="font-primary text-2xl font-bold text-slate-900">
                Acceptance of Terms
              </h2>
            </div>
            <div className="font-accent text-slate-700 leading-relaxed space-y-3">
              <p>
                By accessing this website and requesting our services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our website or services.
              </p>
            </div>
          </section>

          {/* Services */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-6 h-6 text-slate-600" />
              <h2 className="font-primary text-2xl font-bold text-slate-900">
                Services Provided
              </h2>
            </div>
            <div className="font-accent text-slate-700 leading-relaxed space-y-3">
              <p>
                V7MPC provides custom product manufacturing, promotional items, recognition solutions, and related business services. All services are subject to availability and our acceptance of your order.
              </p>
              <p>
                Quote requests submitted through our website do not constitute a binding agreement. Final pricing, terms, and availability will be confirmed through direct communication with our team.
              </p>
            </div>
          </section>

          {/* Orders and Quotes */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-slate-600" />
              <h2 className="font-primary text-2xl font-bold text-slate-900">
                Orders and Quotes
              </h2>
            </div>
            <div className="font-accent text-slate-700 leading-relaxed">
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>All quotes are valid for 30 days unless otherwise specified</li>
                <li>Prices are subject to change without notice</li>
                <li>Minimum order quantities may apply</li>
                <li>Custom orders may require deposits or prepayment</li>
                <li>We reserve the right to refuse service to anyone for any reason</li>
              </ul>
            </div>
          </section>

          {/* Payment Terms */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-slate-600" />
              <h2 className="font-primary text-2xl font-bold text-slate-900">
                Payment Terms
              </h2>
            </div>
            <div className="font-accent text-slate-700 leading-relaxed space-y-3">
              <p>
                Payment terms will be specified in your order confirmation. We accept various payment methods including credit cards, wire transfers, and approved credit accounts for qualified businesses.
              </p>
              <p>
                Late payments may be subject to interest charges. We reserve the right to suspend services for accounts with outstanding balances.
              </p>
            </div>
          </section>

          {/* Product Quality */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-slate-600" />
              <h2 className="font-primary text-2xl font-bold text-slate-900">
                Product Quality and Specifications
              </h2>
            </div>
            <div className="font-accent text-slate-700 leading-relaxed space-y-3">
              <p>
                We strive to ensure all products meet the highest quality standards. Product specifications, colors, and designs are approximate and may vary slightly from images or samples.
              </p>
              <p>
                Custom products are made to order based on your specifications. It is your responsibility to verify all details, including spelling, artwork, and specifications, before approving production.
              </p>
            </div>
          </section>

          {/* Delivery */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-slate-600" />
              <h2 className="font-primary text-2xl font-bold text-slate-900">
                Delivery and Shipping
              </h2>
            </div>
            <div className="font-accent text-slate-700 leading-relaxed">
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Delivery timeframes are estimates and not guaranteed</li>
                <li>Shipping costs are additional unless otherwise stated</li>
                <li>Risk of loss passes to the customer upon delivery to the carrier</li>
                <li>International orders may be subject to customs duties and taxes</li>
              </ul>
            </div>
          </section>

          {/* Returns and Cancellations */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <XCircle className="w-6 h-6 text-slate-600" />
              <h2 className="font-primary text-2xl font-bold text-slate-900">
                Returns and Cancellations
              </h2>
            </div>
            <div className="font-accent text-slate-700 leading-relaxed space-y-3">
              <p>
                Due to the custom nature of our products, orders cannot be cancelled once production has begun. Returns are accepted only for defective products or errors on our part.
              </p>
              <p>
                Claims for defective products must be made within 10 days of receipt. We will repair, replace, or refund defective products at our discretion.
              </p>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-6 h-6 text-slate-600" />
              <h2 className="font-primary text-2xl font-bold text-slate-900">
                Intellectual Property
              </h2>
            </div>
            <div className="font-accent text-slate-700 leading-relaxed space-y-3">
              <p>
                You are responsible for ensuring you have the rights to use any logos, trademarks, or copyrighted materials provided for customization. You agree to indemnify V7MPC against any claims arising from unauthorized use of intellectual property.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-slate-600" />
              <h2 className="font-primary text-2xl font-bold text-slate-900">
                Limitation of Liability
              </h2>
            </div>
            <div className="font-accent text-slate-700 leading-relaxed space-y-3">
              <p>
                V7MPC shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services or products. Our total liability shall not exceed the amount paid for the specific product or service in question.
              </p>
            </div>
          </section>

          {/* Governing Law */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-6 h-6 text-slate-600" />
              <h2 className="font-primary text-2xl font-bold text-slate-900">
                Governing Law
              </h2>
            </div>
            <div className="font-accent text-slate-700 leading-relaxed">
              <p>
                These Terms and Conditions are governed by and construed in accordance with the laws of the State of Florida, United States. Any disputes shall be resolved in the courts of Escambia County, Florida.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section>
            <div className="font-accent text-slate-700 leading-relaxed">
              <h3 className="font-semibold text-slate-900 mb-4">Questions About These Terms?</h3>
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <p className="font-semibold text-slate-900 mb-2">V7 Marketplace Corporation</p>
                <p>225 N Pace Blvd. Suite 225</p>
                <p>Pensacola, FL 32505</p>
                <p className="mt-3">
                  Email:{' '}
                  <a href="mailto:contact@v7mpc.com" className="text-blue-600 hover:text-blue-700 underline">
                    contact@v7mpc.com
                  </a>
                </p>
                <p>
                  Phone:{' '}
                  <a href="tel:+17862867540" className="text-blue-600 hover:text-blue-700 underline">
                    +1 (786) 286-7540
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* Updates */}
          <section>
            <div className="font-accent text-slate-700 leading-relaxed">
              <h3 className="font-semibold text-slate-900 mb-2">Changes to Terms</h3>
              <p>
                We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting to this page. Your continued use of our services constitutes acceptance of any modifications.
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
