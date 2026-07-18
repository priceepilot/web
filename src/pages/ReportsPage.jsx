import React from 'react';
import { 
  FileText, Calendar, CloudLightning, Activity,
  Download, Play, DollarSign, Package, RefreshCcw
} from 'lucide-react';
import './ReportsPage.css';

// --- MOCK DATA ---
const reportTemplatesData = [
  { 
    id: 'financial', 
    title: 'Financial Summary', 
    desc: 'Comprehensive breakdown of revenue, COGS, margins, and operational expenses.', 
    icon: DollarSign 
  },
  { 
    id: 'inventory', 
    title: 'Inventory Health', 
    desc: 'Stock levels, velocity, and low stock warnings across all categories.', 
    icon: Package 
  },
  { 
    id: 'returns', 
    title: 'Return Analysis', 
    desc: 'Deep dive into return rates by product, country, and reason.', 
    icon: RefreshCcw 
  }
];

const recentReportsData = [
  { id: '#REP-908', name: 'Q3 Financial Overview', type: 'Financial', date: 'Oct 24, 2025', status: 'Ready' },
  { id: '#REP-907', name: 'EU Region Margins', type: 'Custom', date: 'Oct 24, 2025', status: 'Processing' },
  { id: '#REP-906', name: 'Apparel Inventory Status', type: 'Inventory', date: 'Oct 22, 2025', status: 'Ready' },
  { id: '#REP-905', name: 'Monthly Return Analysis', type: 'Returns', date: 'Oct 20, 2025', status: 'Ready' },
  { id: '#REP-904', name: 'Ad Spend vs Revenue', type: 'Financial', date: 'Oct 15, 2025', status: 'Failed' },
];

export function ReportsPage() {
  return (
    <div className="reports-dashboard">
      
      {/* ROW 1: TOP METRICS */}
      <div className="reports-metrics-grid">
        <div className="reports-card reports-metric-card">
          <div className="reports-metric-header">
            <span className="reports-metric-title">Total Reports</span>
            <div className="reports-metric-icon"><FileText size={16} /></div>
          </div>
          <div className="reports-metric-value">142</div>
          <div className="reports-metric-trend reports-trend-positive">+12 this month</div>
        </div>
        
        <div className="reports-card reports-metric-card">
          <div className="reports-metric-header">
            <span className="reports-metric-title">Scheduled</span>
            <div className="reports-metric-icon"><Calendar size={16} /></div>
          </div>
          <div className="reports-metric-value">8</div>
          <div className="reports-metric-trend reports-trend-neutral">Automated exports</div>
        </div>
        
        <div className="reports-card reports-metric-card">
          <div className="reports-metric-header">
            <span className="reports-metric-title">Active Syncs</span>
            <div className="reports-metric-icon"><CloudLightning size={16} /></div>
          </div>
          <div className="reports-metric-value">4</div>
          <div className="reports-metric-trend reports-trend-positive">Shopify, Amazon, Ads</div>
        </div>
        
        <div className="reports-card reports-metric-card">
          <div className="reports-metric-header">
            <span className="reports-metric-title">Sync Health</span>
            <div className="reports-metric-icon"><Activity size={16} /></div>
          </div>
          <div className="reports-metric-value">99.9%</div>
          <div className="reports-metric-trend reports-trend-positive">All systems operational</div>
        </div>
      </div>

      {/* ROW 2: TEMPLATES GRID */}
      <div className="reports-card">
        <h3 className="reports-card-title">Generate New Report</h3>
        <div className="reports-templates-grid">
          {reportTemplatesData.map((template) => {
            const Icon = template.icon;
            return (
              <div key={template.id} className="reports-template-card">
                <div className="reports-template-header">
                  <div className="reports-template-icon">
                    <Icon size={20} />
                  </div>
                  <span className="reports-template-title">{template.title}</span>
                </div>
                <p className="reports-template-desc">{template.desc}</p>
                <button className="reports-template-action">
                  <Play size={16} /> Generate Now
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ROW 3: DATA TABLE */}
      <div className="reports-card">
        <h3 className="reports-card-title">Recent Reports</h3>
        <div className="reports-table-container">
          <table className="reports-table">
            <thead>
              <tr>
                <th>Report ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Generated Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentReportsData.map((report) => (
                <tr key={report.id}>
                  <td style={{ fontWeight: '600', color: 'var(--color-text-secondary)' }}>{report.id}</td>
                  <td style={{ fontWeight: '600' }}>{report.name}</td>
                  <td style={{ color: 'var(--color-text-secondary)' }}>{report.type}</td>
                  <td style={{ color: 'var(--color-text-secondary)' }}>{report.date}</td>
                  <td>
                    <span className={`reports-status-badge reports-status-${report.status.toLowerCase()}`}>
                      {report.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="reports-download-btn"
                      disabled={report.status !== 'Ready'}
                      title={report.status === 'Ready' ? 'Download CSV' : 'Not ready'}
                    >
                      <Download size={16} />
                    </button>
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
