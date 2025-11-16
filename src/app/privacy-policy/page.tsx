import type { Metadata } from 'next';
import { Shield, Eye, Lock, Mail, Cookie, Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy - How We Protect Your Information',
  description: 'Learn how V7 Marketplace Corporation collects, uses, and protects your personal information. Our commitment to your privacy and data security.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-600 rounded-2xl mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-primary text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Privacy Policy
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
              At V7 Marketplace Corporation (<strong>V7MPC</strong>), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-slate-600" />
              <h2 className="font-primary text-2xl font-bold text-slate-900">
                Information We Collect
              </h2>
            </div>
            <div className="space-y-4 font-accent text-slate-700 leading-relaxed">
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Personal Information</h3>
                <p>When you contact us or request a quote, we may collect:</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Name and contact information (email, phone number)</li>
                  <li>Company name and business details</li>
                  <li>Product preferences and customization requirements</li>
                  <li>Any other information you voluntarily provide</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Automatically Collected Information</h3>
                <p>We may automatically collect certain information about your device, including:</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>IP address and browser type</li>
                  <li>Operating system and device information</li>
                  <li>Pages visited and time spent on our website</li>
                  <li>Referring website addresses</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-slate-600" />
              <h2 className="font-primary text-2xl font-bold text-slate-900">
                How We Use Your Information
              </h2>
            </div>
            <div className="font-accent text-slate-700 leading-relaxed">
              <p className="mb-3">We use the information we collect to:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Process and respond to your inquiries and quote requests</li>
                <li>Provide customer service and support</li>
                <li>Send you information about our products and services</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
                <li>Prevent fraud and enhance security</li>
              </ul>
            </div>
          </section>

          {/* Google reCAPTCHA */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-slate-600" />
              <h2 className="font-primary text-2xl font-bold text-slate-900">
                Google reCAPTCHA
              </h2>
            </div>
            <div className="font-accent text-slate-700 leading-relaxed space-y-3">
              <p>
                We use Google reCAPTCHA v3 to protect our website forms from spam and abuse. reCAPTCHA collects hardware and software information, such as device and application data, and sends it to Google for analysis.
              </p>
              <p>
                The use of reCAPTCHA is subject to the Google{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">
                  Terms of Service
                </a>.
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Cookie className="w-6 h-6 text-slate-600" />
              <h2 className="font-primary text-2xl font-bold text-slate-900">
                Cookies and Tracking Technologies
              </h2>
            </div>
            <div className="font-accent text-slate-700 leading-relaxed">
              <p>
                We may use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand where our visitors are coming from. You can control cookies through your browser settings.
              </p>
            </div>
          </section>

          {/* Data Sharing */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-6 h-6 text-slate-600" />
              <h2 className="font-primary text-2xl font-bold text-slate-900">
                Information Sharing and Disclosure
              </h2>
            </div>
            <div className="font-accent text-slate-700 leading-relaxed space-y-3">
              <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>Service Providers:</strong> With trusted third-party service providers who assist us in operating our website and conducting our business</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights, property, or safety</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              </ul>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-slate-600" />
              <h2 className="font-primary text-2xl font-bold text-slate-900">
                Data Security
              </h2>
            </div>
            <div className="font-accent text-slate-700 leading-relaxed">
              <p>
                We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-6 h-6 text-slate-600" />
              <h2 className="font-primary text-2xl font-bold text-slate-900">
                Your Rights
              </h2>
            </div>
            <div className="font-accent text-slate-700 leading-relaxed">
              <p className="mb-3">You have the right to:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Lodge a complaint with a supervisory authority</li>
              </ul>
            </div>
          </section>

          {/* Contact */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-slate-600" />
              <h2 className="font-primary text-2xl font-bold text-slate-900">
                Contact Us
              </h2>
            </div>
            <div className="font-accent text-slate-700 leading-relaxed">
              <p className="mb-4">
                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
              </p>
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
                  <a href="tel:+18508500140" className="text-blue-600 hover:text-blue-700 underline">
                    (850) 850-0140
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* Updates */}
          <section>
            <div className="font-accent text-slate-700 leading-relaxed">
              <h3 className="font-semibold text-slate-900 mb-2">Changes to This Privacy Policy</h3>
              <p>
                We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last updated" date at the top of this page. We encourage you to review this Privacy Policy periodically for any changes.
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
