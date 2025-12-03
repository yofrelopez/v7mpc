'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Send, CheckCircle2, AlertCircle, Loader2, User, Mail, Building, Phone, MessageSquare, Shield } from 'lucide-react';
import { contactFormSchema, type ContactFormSchemaType } from '@/lib/validations/contact-schema';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactFormComponent() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const { executeRecaptcha } = useGoogleReCaptcha();

  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormSchemaType>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
      subject: '',
      message: ''
    },
    mode: 'onBlur'
  });

  const onSubmit = async (data: ContactFormSchemaType) => {
    if (!executeRecaptcha) {
      setSubmitState('error');
      setSubmitMessage('reCAPTCHA not loaded. Please refresh the page and try again.');
      return;
    }

    setSubmitState('submitting');
    setSubmitMessage('');

    try {
      // Execute reCAPTCHA
      const recaptchaToken = await executeRecaptcha('contact_form');

      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          recaptchaToken,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitState('success');
        setSubmitMessage(result.message);
        reset(); // Clear form
      } else {
        setSubmitState('error');
        setSubmitMessage(result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitState('error');
      setSubmitMessage('Network error. Please check your connection and try again.');
      console.error('Contact form error:', error);
    }
  };

  // Success state
  if (submitState === 'success') {
    return (
      <Card className="bg-white shadow-xl border border-slate-200">
        <CardContent className="p-8 lg:p-12">
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Message Sent Successfully!
              </h3>
              <p className="text-slate-600 text-lg mb-6">
                {submitMessage}
              </p>
              <p className="text-sm text-slate-500 mb-8">
                We typically respond within 24 business hours.
              </p>
              <Button
                onClick={() => setSubmitState('idle')}
                className="bg-slate-600 hover:bg-slate-700"
              >
                Send Another Message
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white shadow-xl border border-slate-200">
      <CardContent className="p-8 lg:p-12">
        <div className="mb-8">
          <h2 className="font-primary text-2xl lg:text-3xl font-bold text-slate-900 mb-3">
            Send Us a Message
          </h2>
          <p className="text-slate-600">
            Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>

        {/* Error Message */}
        {submitState === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-red-800 font-medium">Error sending message</p>
              <p className="text-red-700 text-sm mt-1">{submitMessage}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleFormSubmit(onSubmit)} className="space-y-6">
          
          {/* Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Full Name *
              </label>
              <Input
                {...register('name')}
                type="text"
                placeholder="John Doe"
                disabled={isSubmitting}
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address *
              </label>
              <Input
                {...register('email')}
                type="email"
                placeholder="john@company.com"
                disabled={isSubmitting}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Company and Phone Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Building className="w-4 h-4 inline mr-2" />
                Company (Optional)
              </label>
              <Input
                {...register('company')}
                type="text"
                placeholder="Your Company Name"
                disabled={isSubmitting}
                className={errors.company ? 'border-red-500' : ''}
              />
              {errors.company && (
                <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Phone (Optional)
              </label>
              <Input
                {...register('phone')}
                type="tel"
                placeholder="+1 (786) 286-7540"
                disabled={isSubmitting}
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <MessageSquare className="w-4 h-4 inline mr-2" />
              Subject *
            </label>
            <Input
              {...register('subject')}
              type="text"
              placeholder="What can we help you with?"
              disabled={isSubmitting}
              className={errors.subject ? 'border-red-500' : ''}
            />
            {errors.subject && (
              <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Message *
            </label>
            <textarea
              {...register('message')}
              rows={6}
              placeholder="Please provide details about your inquiry..."
              disabled={isSubmitting}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${
                errors.message ? 'border-red-500' : 'border-slate-300'
              }`}
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
            )}
            <p className="mt-2 text-xs text-slate-500">
              Please be as detailed as possible to help us assist you better.
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-slate-600 hover:bg-slate-700 text-white py-6 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Sending Message...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </div>

          <p className="text-center text-sm text-slate-500 mt-4">
            <Shield className="w-3 h-3 inline mr-1" />
            Protected by reCAPTCHA. By submitting, you agree to our{' '}
            <a href="/privacy-policy" className="text-slate-600 hover:text-slate-800 underline">
              Privacy Policy
            </a>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
