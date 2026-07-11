import React from 'react';

export function PlaceholderPage({ title }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
      <div>
        <h1 className="text-primary font-bold" style={{ fontSize: '1.5rem', marginBottom: 'var(--spacing-2)' }}>{title}</h1>
        <p className="text-secondary">This module is under construction.</p>
      </div>
      <div style={{ 
        padding: 'var(--spacing-12)', 
        border: '1px dashed var(--color-border)', 
        borderRadius: 'var(--radius-lg)',
        textAlign: 'center',
        color: 'var(--color-text-secondary)'
      }}>
        Content for {title} will appear here.
      </div>
    </div>
  );
}
