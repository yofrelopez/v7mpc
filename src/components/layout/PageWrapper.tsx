// PageWrapper - Layout component para manejo profesional del spacing
// Maneja automáticamente el spacing del navbar sticky

import { ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function PageWrapper({ children, className = '' }: PageWrapperProps) {
  return (
    <div 
      className={`min-h-screen ${className}`}
      style={{ paddingTop: 'var(--navbar-total-height)' }}
    >
      {children}
    </div>
  );
}

// Professional solution using CSS custom properties:
// - Uses --navbar-total-height variable from globals.css
// - Single source of truth for navbar height
// - Easy to maintain and update
// - Consistent across all pages automatically