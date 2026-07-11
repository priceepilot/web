import React from 'react';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import './Select.css';

export function Select({ className, label, error, options = [], ...props }) {
  return (
    <div className="select-group">
      {label && <label className="select-label">{label}</label>}
      <div className="select-wrapper">
        <select 
          className={clsx('select-field', { 'select-error': error }, className)} 
          {...props}
        >
          {options.map((opt, i) => (
            <option key={i} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <ChevronDown className="select-icon" size={16} />
      </div>
      {error && <span className="select-error-text">{error}</span>}
    </div>
  );
}
