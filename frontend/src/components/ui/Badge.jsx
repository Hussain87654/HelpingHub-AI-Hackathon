import React from 'react';
import { cn } from '../utils';

export function Badge({ children, variant = 'primary', className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium',
        {
          'bg-[#dcf4eb] text-primary': variant === 'primary',
          'bg-[#fae3df] text-[#e04535]': variant === 'danger',
          'bg-[#f2f4f7] text-[#475467]': variant === 'gray',
        },
        className
      )}
    >
      {children}
    </span>
  );
}
