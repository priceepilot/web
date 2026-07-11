import React from 'react';
import clsx from 'clsx';
import './Button.css';

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className, 
  ...props 
}) {
  return (
    <button 
      className={clsx('btn', `btn-${variant}`, `btn-${size}`, className)} 
      {...props}
    >
      {children}
    </button>
  );
}
