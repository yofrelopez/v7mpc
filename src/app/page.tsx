import { Hero, WhatWeProvide, ProductsShowcase } from '@/components/home';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <Hero />
      
      {/* What We Provide Section */}
      <WhatWeProvide />
      
      {/* Products Showcase Section */}
      <ProductsShowcase />
    </div>
  );
}
