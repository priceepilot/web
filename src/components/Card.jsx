import React from 'react';
import clsx from 'clsx';
import './Card.css';

export function Card({ children, className, ...props }) {
  return (
    <div className={clsx('card', className)} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className, ...props }) {
  return (
    <div className={clsx('card-header', className)} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ children, className, ...props }) {
  return (
    <div className={clsx('card-content', className)} {...props}>
      {children}
    </div>
  );
}
