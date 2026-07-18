import React from 'react';
import { 
  CreditCard, Zap, Download, CheckCircle2, 
  AlertCircle, ChevronRight, Activity, DollarSign
} from 'lucide-react';
import './BillingPage.css';

// --- MOCK DATA ---
const PLAN_DATA = {
  name: 'Pro Tier',
  price: '$299',
  period: '/ month',
  nextBilling: 'Nov 15, 2026',
  apiUsage: 78, // percentage
  apiText: '780k / 1M Calls',
  revenueUsage: 45, // percentage
  revenueText: '$45k / $100k Tracked',
  autoUsage: 92, // percentage
  autoText: '92 / 100 Automations'
};

const INVOICES = [
  { id: 'INV-2026-10', date: 'Oct 15, 2026', amount: '$299.00', status: 'paid' },
  { id: 'INV-2026-09', date: 'Sep 15, 2026', amount: '$299.00', status: 'paid' },
  { id: 'INV-2026-08', date: 'Aug 15, 2026', amount: '$299.00', status: 'paid' },
  { id: 'INV-2026-07', date: 'Jul 15, 2026', amount: '$299.00', status: 'paid' }
];

export function BillingPage() {
  return (
    <div className="bill-dashboard">
      
      <header className="bill-header">
        <div>
          <h1 className="bill-title">Billing & Subscription</h1>
          <p className="bill-subtitle">Manage your plan, usage limits, and payment methods.</p>
        </div>
      </header>

      {/* TOP GRID: PLAN & USAGE */}
      <div className="bill-top-grid">
        
        {/* CURRENT PLAN */}
        <div className="bill-plan-highlight">
          <div className="bill-plan-badge">Current Plan</div>
          <div className="bill-plan-price">
            {PLAN_DATA.price} <span className="bill-plan-period">{PLAN_DATA.period}</span>
          </div>
          <div className="bill-plan-desc">
            Next billing date is {PLAN_DATA.nextBilling}.
          </div>
          <button className="bill-btn primary" style={{ marginTop: 'auto' }}>
            Upgrade to Enterprise <ChevronRight size={16} />
          </button>
        </div>

        {/* USAGE METERS */}
        <div className="bill-card" style={{ gridColumn: 'span 2' }}>
          <h3 className="bill-card-title">Monthly Usage</h3>
          
          <div className="bill-usage-list">
            
            <div className="bill-usage-item">
              <div className="bill-usage-header">
                <span className="bill-usage-label"><Zap size={14} color="#10B981" /> API Calls</span>
                <span className="bill-usage-stats">{PLAN_DATA.apiText}</span>
              </div>
              <div className="bill-progress-bg">
                <div 
                  className="bill-progress-fill" 
                  style={{ width: `${PLAN_DATA.apiUsage}%`, backgroundColor: '#10B981' }}
                ></div>
              </div>
            </div>

            <div className="bill-usage-item">
              <div className="bill-usage-header">
                <span className="bill-usage-label"><DollarSign size={14} color="#3B82F6" /> Revenue Tracked</span>
                <span className="bill-usage-stats">{PLAN_DATA.revenueText}</span>
              </div>
              <div className="bill-progress-bg">
                <div 
                  className="bill-progress-fill" 
                  style={{ width: `${PLAN_DATA.revenueUsage}%`, backgroundColor: '#3B82F6' }}
                ></div>
              </div>
            </div>

            <div className="bill-usage-item">
              <div className="bill-usage-header">
                <span className="bill-usage-label"><Activity size={14} color="#F59E0B" /> Active Automations</span>
                <span className="bill-usage-stats">{PLAN_DATA.autoText}</span>
              </div>
              <div className="bill-progress-bg">
                <div 
                  className="bill-progress-fill" 
                  style={{ width: `${PLAN_DATA.autoUsage}%`, backgroundColor: PLAN_DATA.autoUsage > 90 ? '#EF4444' : '#F59E0B' }}
                ></div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="bill-main-grid">
        
        {/* LEFT COL: INVOICE HISTORY */}
        <div className="bill-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border)' }}>
            <h3 className="bill-card-title" style={{ margin: 0 }}>Billing History</h3>
          </div>
          
          <div className="bill-table-container">
            <table className="bill-table">
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Download</th>
                </tr>
              </thead>
              <tbody>
                {INVOICES.map((inv) => (
                  <tr key={inv.id}>
                    <td className="bill-invoice-id">{inv.id}</td>
                    <td>{inv.date}</td>
                    <td style={{ fontWeight: 600 }}>{inv.amount}</td>
                    <td>
                      <span className={`bill-status ${inv.status}`}>
                        {inv.status === 'paid' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                        {inv.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="bill-btn-icon">
                        <Download size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT COL: PAYMENT METHOD */}
        <div className="bill-card" style={{ height: 'fit-content' }}>
          <h3 className="bill-card-title" style={{ marginBottom: '20px' }}>Payment Method</h3>
          
          <div className="bill-cc-card">
            <div className="bill-cc-bg"></div>
            <div className="bill-cc-header">
              <CreditCard size={24} color="#fff" />
              <span className="bill-cc-brand">VISA</span>
            </div>
            <div className="bill-cc-number">
              •••• •••• •••• 4242
            </div>
            <div className="bill-cc-footer">
              <span>Expires 12/28</span>
            </div>
          </div>

          <button className="bill-btn outline" style={{ marginTop: '20px', width: '100%' }}>
            Update Payment Method
          </button>
        </div>

      </div>
    </div>
  );
}
