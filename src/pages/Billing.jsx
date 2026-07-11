import React from 'react';
import { CreditCard, Download, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Card, CardContent } from '../components/Card';
import './AdminPages.css';

const INVOICE_DATA = [
  { id: 'INV-2023-11', date: 'Nov 01, 2023', amount: '$499.00', status: 'Paid' },
  { id: 'INV-2023-10', date: 'Oct 01, 2023', amount: '$499.00', status: 'Paid' },
  { id: 'INV-2023-09', date: 'Sep 01, 2023', amount: '$499.00', status: 'Paid' },
];

export function Billing() {
  return (
    <div className="admin-page-layout">
      <header className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Billing & Plans</h1>
          <p className="admin-page-subtitle">Manage your subscription, payment methods, and billing history.</p>
        </div>
        <Button variant="secondary">Update Payment Method</Button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <Card style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }}>
          <CardContent style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#fff', marginBottom: '4px' }}>Growth Plan</h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>$499/month, billed monthly.</p>
              </div>
              <Badge variant="primary">Active</Badge>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                <CheckCircle2 size={16} className="text-success" /> Up to 5 connected stores
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                <CheckCircle2 size={16} className="text-success" /> Unlimited AI recommendations
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                <CheckCircle2 size={16} className="text-success" /> Priority email support
              </div>
            </div>

            <Button className="w-full">Upgrade to Enterprise <ArrowUpRight size={16} style={{ marginLeft: '6px' }} /></Button>
          </CardContent>
        </Card>

        <Card style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }}>
          <CardContent style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>Usage (Current Billing Cycle)</h3>
            
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Analyzed Orders</span>
                <span style={{ fontWeight: '500', color: '#fff' }}>14,205 / 25,000</span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '56%', background: 'var(--color-primary)', borderRadius: '3px' }}></div>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>AI Copilot Queries</span>
                <span style={{ fontWeight: '500', color: '#fff' }}>84 / 200</span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '42%', background: 'var(--color-primary)', borderRadius: '3px' }}></div>
              </div>
            </div>

            <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ padding: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>
                <CreditCard size={20} className="text-text-secondary" />
              </div>
              <div>
                <p style={{ fontSize: '14px', fontWeight: '500', color: '#fff' }}>Visa ending in 4242</p>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Expires 12/2026</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#fff', margin: '32px 0 16px 0' }}>Billing History</h3>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {INVOICE_DATA.map(inv => (
                <tr key={inv.id}>
                  <td style={{ fontWeight: '500', color: '#fff' }}>{inv.id}</td>
                  <td>{inv.date}</td>
                  <td>{inv.amount}</td>
                  <td><Badge variant="secondary">{inv.status}</Badge></td>
                  <td style={{ textAlign: 'right' }}>
                    <button className="admin-icon-btn"><Download size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
