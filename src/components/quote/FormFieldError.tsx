'use client';

interface FormFieldErrorProps {
  error?: {
    message?: string;
  };
}

export function FormFieldError({ error }: FormFieldErrorProps) {
  if (!error?.message) return null;
  
  return (
    <p className="text-sm text-red-600 mt-1">
      {error.message}
    </p>
  );
}
