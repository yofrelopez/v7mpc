'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, Building, Package, MessageSquare, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import ProductSelector from './ProductSelector';
import CustomizationFields from './CustomizationFields';
import { FormFieldError } from './FormFieldError';
import { Product } from '@/types/products';
import { QuoteFormData, CustomizationDetails, ProductSource, QuoteSubmission } from '@/types/quote';
import { mockProducts } from '@/lib/data/mockData';
import { quoteFormSchema, type QuoteFormSchemaType } from '@/lib/validations/quote-schema';
import { generateQuoteId } from '@/lib/utils/quote-id-generator';

// Submit states
type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

interface SubmitError {
  message: string;
  details?: string;
}

export default function QuoteForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();
  
  // Refs for scroll to error
  const formRef = useRef<HTMLDivElement>(null);
  
  // Product state
  const [productSource, setProductSource] = useState<ProductSource>('catalog');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Submit state
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [submitError, setSubmitError] = useState<SubmitError | null>(null);
  const [quoteId, setQuoteId] = useState<string>('');
  
  // React Hook Form with Zod validation
  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
    getValues
  } = useForm<QuoteFormSchemaType>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      customer: {
        name: '',
        email: '',
        company: '',
        phone: ''
      },
      product: {
        source: 'catalog',
        productName: '',
        productId: '',
        productSlug: '',
        categoryName: '',
        categorySlug: '',
        imageUrl: ''
      },
      quantity: 1,
      customization: {},
      timeline: '',
      message: ''
    },
    mode: 'onBlur' // Validate on blur for better UX
  });

  // Pre-fill form from URL parameters
  useEffect(() => {
    const productId = searchParams.get('id');
    const productName = searchParams.get('product');
    const quantity = searchParams.get('quantity');
    
    // Pre-fill quantity if provided
    if (quantity) {
      const qty = parseInt(quantity, 10);
      if (!isNaN(qty) && qty > 0) {
        setValue('quantity', qty);
      }
    }
    
    if (productId) {
      // First, try to find product in mockProducts
      const mockProduct = mockProducts.find(p => p.id === productId);
      if (mockProduct) {
        setSelectedProduct(mockProduct);
        setValue('product', {
          source: 'catalog',
          productId: mockProduct.id,
          productName: mockProduct.name,
          productSlug: mockProduct.slug,
          categoryName: mockProduct.category.name,
          categorySlug: mockProduct.category.slug,
          imageUrl: mockProduct.images[0]
        });
      } else {
        // If not found in mock, fetch from API
        fetch('/api/products/all')
          .then(res => res.json())
          .then(data => {
            const apiProduct = data.products?.find((p: Product) => p.id === productId);
            if (apiProduct) {
              setSelectedProduct(apiProduct);
              setValue('product', {
                source: 'catalog',
                productId: apiProduct.id,
                productName: apiProduct.name,
                productSlug: apiProduct.slug,
                categoryName: apiProduct.category.name,
                categorySlug: apiProduct.category.slug,
                imageUrl: apiProduct.images[0]
              });
            }
          })
          .catch(err => {
            console.error('Error fetching product:', err);
          });
      }
    } else if (productName) {
      // Pre-fill product name only
      setValue('product.productName', productName);
    }
  }, [searchParams, setValue]);

  const handleProductSelect = (product: Product | null) => {
    if (product) {
      setSelectedProduct(product);
      setProductSource('catalog');
      setValue('product', {
        source: 'catalog',
        productId: product.id,
        productName: product.name,
        productSlug: product.slug,
        categoryName: product.category.name,
        categorySlug: product.category.slug,
        imageUrl: product.images[0]
      });
    } else {
      setSelectedProduct(null);
    }
  };

  const handleCustomProductToggle = () => {
    setProductSource('custom');
    setSelectedProduct(null);
    setValue('product', {
      source: 'custom',
      productName: '',
      customDescription: ''
    });
  };

  const handleCustomizationChange = (customization: CustomizationDetails) => {
    setValue('customization', customization);
  };

  // Scroll to first error when validation fails
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      // Find first error field - try border-red-500 first, then text-red-600 (FormFieldError)
      const firstErrorField = 
        document.querySelector('[class*="border-red-500"]') ||
        document.querySelector('.text-red-600');
      
      if (firstErrorField) {
        firstErrorField.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
        
        // Focus if it's an input
        if (firstErrorField instanceof HTMLInputElement || 
            firstErrorField instanceof HTMLTextAreaElement) {
          firstErrorField.focus();
        }
      }
    }
  }, [errors]);

  const handleSubmit = async (data: QuoteFormSchemaType) => {
    if (!executeRecaptcha) {
      setSubmitState('error');
      setSubmitError({
        message: 'reCAPTCHA not loaded',
        details: 'Please refresh the page and try again.'
      });
      return;
    }

    try {
      setSubmitState('submitting');
      setSubmitError(null);
      
      // Execute reCAPTCHA
      const recaptchaToken = await executeRecaptcha('quote_form');
      
      // Generate quote ID
      const generatedQuoteId = generateQuoteId();
      setQuoteId(generatedQuoteId);
      
      // Prepare submission data
      const quoteSubmission: QuoteSubmission = {
        ...data,
        quoteId: generatedQuoteId,
        submittedAt: new Date()
      };
      
      // Send to API endpoint with reCAPTCHA token
      const response = await fetch('/api/quotes/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...quoteSubmission,
          recaptchaToken
        })
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || result.message || 'Failed to submit quote');
      }
      
      // Success state
      setSubmitState('success');
      
      // Redirect to confirmation page after brief delay
      setTimeout(() => {
        router.push(`/quote/confirmation?id=${generatedQuoteId}`);
      }, 2000);
      
    } catch (error) {
      setSubmitState('error');
      setSubmitError({
        message: 'Failed to submit quote request',
        details: error instanceof Error ? error.message : 'Unknown error occurred'
      });
      console.error('Quote submission error:', error);
    }
  };

  return (
    <div className="space-y-6" ref={formRef}>
      {/* Success Alert */}
      {submitState === 'success' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-semibold text-green-900">Quote request submitted successfully!</h3>
            <p className="text-sm text-green-700 mt-1">
              Your quote ID is <strong>{quoteId}</strong>. We&apos;ll contact you within 24 hours.
            </p>
            <p className="text-sm text-green-600 mt-1">Redirecting to confirmation page...</p>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {submitState === 'error' && submitError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-semibold text-red-900">{submitError.message}</h3>
            {submitError.details && (
              <p className="text-sm text-red-700 mt-1">{submitError.details}</p>
            )}
            <button
              type="button"
              onClick={() => {
                setSubmitState('idle');
                setSubmitError(null);
              }}
              className="text-sm text-red-600 hover:text-red-800 underline mt-2"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleFormSubmit(handleSubmit)} className="space-y-6">
      {/* Product Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-slate-800 flex items-center">
            <Package className="w-5 h-5 mr-2" />
            Product Selection
          </CardTitle>
        </CardHeader>
        <CardContent>
          {productSource === 'catalog' ? (
            <div>
              <ProductSelector
                onProductSelect={handleProductSelect}
                selectedProductId={selectedProduct?.id}
                onCustomProductToggle={handleCustomProductToggle}
                disabled={isSubmitting || submitState === 'submitting'}
              />
              <FormFieldError error={errors.product?.productId} />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <p className="text-sm text-slate-700">
                  You're requesting a custom product. Please describe what you need below.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setProductSource('catalog');
                    setValue('product.source', 'catalog');
                  }}
                  className="text-sm text-slate-600 hover:text-slate-800 mt-2 underline"
                >
                  Browse our catalog instead
                </button>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Product Description *
                </label>
                <textarea
                  {...register('product.customDescription', {
                    onChange: (e) => {
                      const desc = e.target.value;
                      setValue('product.productName', desc.split('\n')[0] || 'Custom Product');
                    }
                  })}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent ${
                    errors.product?.customDescription ? 'border-red-500' : 'border-slate-300'
                  }`}
                  placeholder="Describe the product you need in detail..."
                  disabled={isSubmitting || submitState === 'submitting'}
                />
                <FormFieldError error={errors.product?.customDescription} />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Customer Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-slate-800">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <Input
                  type="text"
                  {...register('customer.name')}
                  className={`pl-10 ${errors.customer?.name ? 'border-red-500' : ''}`}
                  placeholder="John Doe"
                  disabled={isSubmitting || submitState === 'submitting'}
                />
                <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              </div>
              <FormFieldError error={errors.customer?.name} />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Input
                  type="email"
                  {...register('customer.email')}
                  className={`pl-10 ${errors.customer?.email ? 'border-red-500' : ''}`}
                  placeholder="john@company.com"
                  disabled={isSubmitting || submitState === 'submitting'}
                />
                <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              </div>
              <FormFieldError error={errors.customer?.email} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Company Name
              </label>
              <div className="relative">
                <Input
                  type="text"
                  {...register('customer.company')}
                  className={`pl-10 ${errors.customer?.company ? 'border-red-500' : ''}`}
                  placeholder="Company Inc."
                  disabled={isSubmitting || submitState === 'submitting'}
                />
                <Building className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              </div>
              <FormFieldError error={errors.customer?.company} />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Input
                  type="tel"
                  {...register('customer.phone')}
                  className={`pl-10 ${errors.customer?.phone ? 'border-red-500' : ''}`}
                  placeholder="(787) 123-4567"
                  disabled={isSubmitting || submitState === 'submitting'}
                />
                <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              </div>
              <FormFieldError error={errors.customer?.phone} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-slate-800">Order Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Quantity *
              </label>
              <Input
                type="number"
                {...register('quantity', { valueAsNumber: true })}
                className={errors.quantity ? 'border-red-500' : ''}
                placeholder="100"
                min="1"
                disabled={isSubmitting || submitState === 'submitting'}
              />
              <FormFieldError error={errors.quantity} />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Timeline
              </label>
              <Input
                type="text"
                {...register('timeline')}
                className={errors.timeline ? 'border-red-500' : ''}
                placeholder="e.g. 2 weeks, ASAP, By Dec 15"
                disabled={isSubmitting || submitState === 'submitting'}
              />
              <FormFieldError error={errors.timeline} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Additional Message
            </label>
            <textarea
              {...register('message')}
              rows={4}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent ${
                errors.message ? 'border-red-500' : 'border-slate-300'
              }`}
              placeholder="Any additional requirements or questions..."
              disabled={isSubmitting || submitState === 'submitting'}
            />
            <FormFieldError error={errors.message} />
          </div>
        </CardContent>
      </Card>

      {/* Customization Fields (only for catalog products with category) */}
      {selectedProduct && selectedProduct.isCustomizable && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-slate-800">Customization Options</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomizationFields
              categorySlug={selectedProduct.category.slug}
              customization={watch('customization') || {}}
              onChange={handleCustomizationChange}
              disabled={isSubmitting || submitState === 'submitting'}
            />
          </CardContent>
        </Card>
      )}

      {/* Submit Button */}
      <div className="flex justify-center">
        <Button
          type="submit"
          size="lg"
          className="bg-slate-600 hover:bg-slate-700 text-white font-medium px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg"
          disabled={submitState === 'submitting' || submitState === 'success'}
        >
          {submitState === 'submitting' ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Submitting...
            </>
          ) : submitState === 'success' ? (
            <>
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Submitted
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Submit Quote Request
            </>
          )}
        </Button>
      </div>
    </form>
    </div>
  );
}