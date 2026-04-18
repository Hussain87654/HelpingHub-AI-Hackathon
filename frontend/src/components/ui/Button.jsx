import React from 'react';
import { cn } from '../utils';

export function Button({ className, variant = 'primary', size = 'default', children, ...props }) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        {
          'bg-primary text-white hover:bg-primary-hover': variant === 'primary',
          'bg-white text-[#192122] hover:bg-gray-50 border border-transparent shadow-sm': variant === 'secondary',
          'bg-transparent text-primary hover:bg-primary/10 border border-primary': variant === 'outline',
          'h-10 px-4 py-2': size === 'default',
          'h-9 px-3 text-sm': size === 'sm',
          'h-11 px-8 text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
