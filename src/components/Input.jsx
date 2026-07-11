import React from 'react';
import clsx from 'clsx';
import './Input.css';

export function Input({ className, label, error, ...props }) {
  return (
    <div className="input-group">
      {label && <label className="input-label">{label}</label>}
      <input 
        className={clsx('input-field', { 'input-error': error }, className)} 
        {...props} 
      />
      {error && <span className="input-error-text">{error}</span>}
    </div>
  );
}
