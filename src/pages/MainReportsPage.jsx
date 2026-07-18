import React from 'react';
import { 
  FileText, Download, Clock, CalendarDays,
  FileSpreadsheet, FileBarChart, Filter, Plus,
  CheckCircle2, RefreshCw, Mail, Users
} from 'lucide-react';
import './MainReportsPage.css';

// --- MOCK DATA ---
const TOP_METRICS = {
  totalReports: '1,492',
  scheduled: 8,
  exported: '4.2 GB'
};

const TEMPLATES = [
  {
    id: 't-1',
    title: 'Monthly Profitability',
    desc: 'Comprehensive breakdown of revenue, COGS, and net margins across all regions.',
    icon: FileBarChart,
    color: '#3B82F6' // Blue
  },
  {
    id: 't-2',
    title: 'SKU Margin Analysis',
    desc: 'Product-level data showing target vs actual margins and detected leaks.',
    icon: FileSpreadsheet,
    color: '#10B981' // Green
  },
  {
    id: 't-3',
    title: 'Cross-Border Tax Summary',
    desc: 'Aggregated VAT/GST and duties paid for customs compliance and accounting.',
    icon: FileText,
    color: '#F59E0B' // Amber
  }
];

const RECENT_REPORTS = [
  {
    id: 'r-1',
    name: 'Q3 Profitability Review - EU',
    date: 'Oct 24, 2026 • 09:12 AM',
    type: 'PDF',
    status: 'completed'
  },
  {
    id: 'r-2',
    name: 'Inventory Cost Analysis (Raw)',
    date: 'Oct 24, 2026 • 08:45 AM',
    type: 'CSV',
    status: 'completed'
  },
  {
    id: 'r-3',
    name: 'Weekly Margin Alerts',
    date: 'Oct 23, 2026 • 11:30 PM',
    type: 'PDF',
    status: 'completed'
  },
  {
    id: 'r-4',
    name: 'Historical Ad Spend vs Sales',
    date: 'Generating...',
    type: 'CSV',
    status: 'processing'
  }
];

const SCHEDULED_REPORTS = [
  {
    id: 's-1',
    title: 'Weekly Executive Summary',
    freq: 'Every Monday',
    recipients: 4,
    lastSent: 'Oct 19',
    format: 'PDF'
  },
  {
    id: 's-2',
    title: 'Daily SKU Margin Sync',
    freq: 'Every Day',
    recipients: 1,
    lastSent: 'Today',
    format: 'CSV'
  },
  {
    id: 's-3',
    title: 'Monthly Tax & Duties Report',
    freq: '1st of Month',
    recipients: 2,
    lastSent: 'Oct 1',
    format: 'Excel'
  }
];

export function MainReportsPage() {
  return (
    <div className="rep-dashboard">
      
      <header className="rep-header">
        <div>
          <h1 className="rep-title">Data & Reports Hub</h1>
          <p className="rep-subtitle">Generate, schedule, and download comprehensive business intelligence reports.</p>
        </div>
        <button className="rep-btn primary">
          <Plus size={16} /> Custom Report
        </button>
      </header>

      {/* ROW 1: TOP METRICS */}
      <div className="rep-metrics-grid">
        <div className="rep-card rep-metric-card">
          <div className="rep-metric-header">
            <span className="rep-metric-title">Reports Generated</span>
            <div className="rep-metric-icon"><FileText size={16} /></div>
          </div>
          <div className="rep-metric-value">{TOP_METRICS.totalReports}</div>
          <div className="rep-metric-trend rep-trend-positive">All time</div>
        </div>
        
        <div className="rep-card rep-metric-card">
          <div className="rep-metric-header">
            <span className="rep-metric-title">Active Schedules</span>
            <div className="rep-metric-icon" style={{ color: '#8B5CF6' }}><Clock size={16} /></div>
          </div>
          <div className="rep-metric-value">{TOP_METRICS.scheduled}</div>
          <div className="rep-metric-trend rep-trend-neutral">Automated deliveries</div>
        </div>
        
        <div className="rep-card rep-metric-card">
          <div className="rep-metric-header">
            <span className="rep-metric-title">Data Exported</span>
            <div className="rep-metric-icon" style={{ color: 'var(--color-primary)' }}><Download size={16} /></div>
          </div>
          <div className="rep-metric-value">{TOP_METRICS.exported}</div>
          <div className="rep-metric-trend rep-trend-positive">This month</div>
        </div>
      </div>

      <div className="rep-main-grid">
        
        {/* LEFT COL: TEMPLATES & RECENT */}
        <div>
          
          <h3 className="rep-card-title" style={{ marginBottom: '16px' }}>Quick Templates</h3>
          <div className="rep-templates-grid">
            {TEMPLATES.map(temp => (
              <div key={temp.id} className="rep-template-card">
                <div className="rep-template-icon" style={{ background: `${temp.color}15`, color: temp.color }}>
                  <temp.icon size={20} />
                </div>
                <h4 className="rep-template-title">{temp.title}</h4>
                <p className="rep-template-desc">{temp.desc}</p>
              </div>
            ))}
          </div>

          <div className="rep-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="rep-card-title" style={{ margin: 0 }}>Recent Downloads</h3>
              <button className="rep-btn-icon" style={{ border: 'none' }}><Filter size={16} /></button>
            </div>
            <div className="rep-table-container">
              <table className="rep-table">
                <thead>
                  <tr>
                    <th>Report Name</th>
                    <th>Status</th>
                    <th>Format</th>
                    <th style={{ textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_REPORTS.map((report) => (
                    <tr key={report.id}>
                      <td>
                        <div className="rep-report-name-wrap">
                          {report.type === 'PDF' ? (
                            <FileText size={18} className="rep-file-icon" style={{ color: '#EF4444' }} />
                          ) : (
                            <FileSpreadsheet size={18} className="rep-file-icon" style={{ color: '#10B981' }} />
                          )}
                          <div>
                            <span className="rep-report-name">{report.name}</span>
                            <span className="rep-report-date">{report.date}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`rep-status ${report.status}`}>
                          {report.status === 'completed' && <CheckCircle2 size={12} />}
                          {report.status === 'processing' && <RefreshCw size={12} className="animate-spin" />}
                          {report.status}
                        </span>
                      </td>
                      <td style={{ fontWeight: 600 }}>{report.type}</td>
                      <td style={{ textAlign: 'right' }}>
                        <button className="rep-btn-icon" disabled={report.status !== 'completed'}>
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

        {/* RIGHT COL: SCHEDULED REPORTS */}
        <div className="rep-card" style={{ height: 'fit-content' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 className="rep-card-title" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CalendarDays size={18} color="#8B5CF6" /> Scheduled Reports
            </h3>
            <button className="rep-btn-icon"><Plus size={16} /></button>
          </div>
          
          <div className="rep-scheduled-list">
            {SCHEDULED_REPORTS.map(sched => (
              <div key={sched.id} className="rep-schedule-card">
                <div className="rep-schedule-header">
                  <h4 className="rep-schedule-title">{sched.title}</h4>
                  <span className="rep-schedule-freq">{sched.freq}</span>
                </div>
                
                <div className="rep-schedule-meta">
                  <span className="rep-meta-item">
                    <Users size={14} /> {sched.recipients} Recipients
                  </span>
                  <span className="rep-meta-item">
                    <Mail size={14} /> Last: {sched.lastSent}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
