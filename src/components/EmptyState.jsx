import React from 'react';
import clsx from 'clsx';
import './EmptyState.css';

export function EmptyState({ title, description, icon: Icon, action, className }) {
  return (
    <div className={clsx('empty-state', className)}>
      {Icon && (
        <div className="empty-state-icon-wrapper">
          <Icon className="empty-state-icon" size={32} />
        </div>
      )}
      <h3 className="empty-state-title">{title}</h3>
      {description && <p className="empty-state-desc">{description}</p>}
      {action && <div className="empty-state-action">{action}</div>}
    </div>
  );
}
