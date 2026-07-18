import React from 'react';
import { motion } from 'framer-motion';

export function PagePlaceholder({ title, icon: Icon }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      minHeight: '60vh',
      textAlign: 'center',
      padding: '24px'
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '24px',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        {Icon && <Icon size={32} style={{ color: 'var(--color-primary)' }} />}
      </motion.div>
      
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          fontSize: '1.8rem',
          fontWeight: '700',
          color: 'var(--color-text-primary)',
          margin: '0 0 12px 0',
          letterSpacing: '-0.02em'
        }}
      >
        {title}
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          fontSize: '1rem',
          color: 'var(--color-text-secondary)',
          maxWidth: '400px',
          lineHeight: '1.6',
          margin: 0
        }}
      >
        This module is currently being configured and will be available shortly.
      </motion.p>
    </div>
  );
}
