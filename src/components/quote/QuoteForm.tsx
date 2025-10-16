'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, Building, Package, MessageSquare, Send } from 'lucide-react';

export default function QuoteForm() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    // Customer Information
    name: '',
    email: '',
    company: '',
    phone: '',
    
    // Product Information
    productName: '',
    productId: '',
    quantity: '',
    customization: '',
    
    // Additional Details
    message: '',
    timeline: ''
  });

  // Pre-fill form from URL parameters
  useEffect(() => {
    const productName = searchParams.get('product');
    const productId = searchParams.get('id');
    
    if (productName || productId) {
      setFormData(prev => ({
        ...prev,
        productName: productName || '',
        productId: productId || ''
      }));
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log('Quote request submitted:', formData);
    alert('Quote request submitted! We\'ll contact you within 24 hours.');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Product Information Card */}
      {formData.productName && (
        <Card className="bg-slate-100 border-slate-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-slate-800 flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Selected Product
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700 font-medium">{formData.productName}</p>
            <p className="text-slate-500 text-sm">Product ID: {formData.productId}</p>
          </CardContent>
        </Card>
      )}

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
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="pl-10"
                  placeholder="John Doe"
                />
                <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="pl-10"
                  placeholder="john@company.com"
                />
                <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              </div>
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
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="pl-10"
                  placeholder="Company Inc."
                />
                <Building className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="pl-10"
                  placeholder="(555) 123-4567"
                />
                <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-slate-800">Product Requirements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!formData.productName && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Product Name *
              </label>
              <Input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                required
                placeholder="Custom Pens, T-Shirts, etc."
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Quantity *
              </label>
              <Input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                required
                placeholder="100"
                min="1"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Timeline
              </label>
              <Input
                type="text"
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                placeholder="2 weeks"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Customization Details
            </label>
            <textarea
              name="customization"
              value={formData.customization}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              placeholder="Logo placement, colors, text, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Additional Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              placeholder="Any additional requirements or questions..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-center">
        <Button
          type="submit"
          size="lg"
          className="bg-slate-600 hover:bg-slate-700 text-white font-medium px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg"
        >
          <Send className="w-5 h-5 mr-2" />
          Submit Quote Request
        </Button>
      </div>
    </form>
  );
}