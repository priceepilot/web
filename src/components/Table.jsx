import React from 'react';
import clsx from 'clsx';
import './Table.css';

export function Table({ children, className, ...props }) {
  return (
    <div className="table-container">
      <table className={clsx('table', className)} {...props}>
        {children}
      </table>
    </div>
  );
}

export function TableHead({ children, className, ...props }) {
  return <thead className={clsx('table-head', className)} {...props}>{children}</thead>;
}

export function TableBody({ children, className, ...props }) {
  return <tbody className={clsx('table-body', className)} {...props}>{children}</tbody>;
}

export function TableRow({ children, className, ...props }) {
  return <tr className={clsx('table-row', className)} {...props}>{children}</tr>;
}

export function TableHeader({ children, className, ...props }) {
  return <th className={clsx('table-header', className)} {...props}>{children}</th>;
}

export function TableCell({ children, className, ...props }) {
  return <td className={clsx('table-cell', className)} {...props}>{children}</td>;
}
