import React from 'react';
import clsx from 'clsx';
import './LoadingSkeleton.css';

export function LoadingSkeleton({ className, type = 'text', ...props }) {
  return (
    <div 
      className={clsx('skeleton', `skeleton-${type}`, className)} 
      {...props} 
    />
  );
}
