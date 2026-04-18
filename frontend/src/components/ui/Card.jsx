import React from 'react';
import { cn } from '../utils';

export function Card({ className, variant = 'light', children }) {
  const isDark = variant === 'dark';
  return (
    <div
      className={cn(
        'rounded-3xl p-8',
        isDark ? 'bg-[#1e272a] text-white shadow-xl' : 'bg-[#fcfcf7] shadow-sm',
        className
      )}
    >
      {children}
    </div>
  );
}
