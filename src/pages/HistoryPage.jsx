import React, { useState } from 'react';
import { 
  History, RotateCcw, Target, ShieldCheck, 
  Bot, User, Zap, AlertTriangle
} from 'lucide-react';
import './HistoryPage.css';

// --- MOCK DATA ---
const historyMetrics = {
  total: 4892,
  reverted: 42,
  accuracy: '99.1%',
  ratio: '88% / 12%'
};

const actionLogData = [
  {
    id: 'ACT-9904',
    timestamp: 'Oct 24, 2025 14:32:01',
    actor: 'Pricy AI',
    actorType: 'ai',
    module: 'Pricing Engine',
    description: 'Decreased price of "Winter Jacket" by 5% in UK market due to competitor price drop.',
    status: 'Success',
    canRevert: true
  },
  {
    id: 'ACT-9903',
    timestamp: 'Oct 24, 2025 13:15:22',
    actor: 'Sarah Jenkins',
    actorType: 'human',
    module: 'Risk Center',
    description: 'Manually approved flagged order #1029 after address verification.',
    status: 'Success',
    canRevert: false
  },
  {
    id: 'ACT-9902',
    timestamp: 'Oct 24, 2025 11:05:45',
    actor: 'Pricy AI',
    actorType: 'ai',
    module: 'Ad Optimization',
    description: 'Paused "Summer Sale FR" campaign due to low ROAS.',
    status: 'Success',
    canRevert: true
  },
  {
    id: 'ACT-9901',
    timestamp: 'Oct 23, 2025 18:45:10',
    actor: 'Pricy AI',
    actorType: 'ai',
    module: 'Catalog Sync',
    description: 'Attempted to sync 450 new SKUs to Amazon US.',
    status: 'Failed',
    canRevert: false
  },
  {
    id: 'ACT-9900',
    timestamp: 'Oct 23, 2025 15:20:00',
    actor: 'Pricy AI',
    actorType: 'ai',
    module: 'Pricing Engine',
    description: 'Increased price of "Wireless Earbuds" by 12% in EU.',
    status: 'Reverted',
    canRevert: false
  },
  {
    id: 'ACT-9899',
    timestamp: 'Oct 23, 2025 09:10:33',
    actor: 'Mike Chen',
    actorType: 'human',
    module: 'Pricing Engine',
    description: 'Reverted action ACT-9900 (Price increase on Wireless Earbuds).',
    status: 'Success',
    canRevert: false
  }
];

export function HistoryPage() {
  const [filter, setFilter] = useState('all');

  const filteredLogs = actionLogData.filter(log => {
    if (filter === 'all') return true;
    return log.actorType === filter;
  });

  return (
    <div className="hist-dashboard">
      
      <header className="hist-header">
        <h1 className="hist-title">Action History</h1>
        <p className="hist-subtitle">Comprehensive audit log of all automated AI actions and manual interventions.</p>
      </header>

      {/* ROW 1: TOP METRICS */}
      <div className="hist-metrics-grid">
        <div className="hist-card hist-metric-card">
          <div className="hist-metric-header">
            <span className="hist-metric-title">Total Actions (30d)</span>
            <div className="hist-metric-icon"><History size={16} /></div>
          </div>
          <div className="hist-metric-value">{historyMetrics.total}</div>
          <div className="hist-metric-trend hist-trend-positive">+14% vs last month</div>
        </div>
        
        <div className="hist-card hist-metric-card">
          <div className="hist-metric-header">
            <span className="hist-metric-title">Reverted Actions</span>
            <div className="hist-metric-icon"><RotateCcw size={16} /></div>
          </div>
          <div className="hist-metric-value">{historyMetrics.reverted}</div>
          <div className="hist-metric-trend hist-trend-neutral">0.8% of total actions</div>
        </div>
        
        <div className="hist-card hist-metric-card">
          <div className="hist-metric-header">
            <span className="hist-metric-title">AI Accuracy Rate</span>
            <div className="hist-metric-icon"><Target size={16} /></div>
          </div>
          <div className="hist-metric-value">{historyMetrics.accuracy}</div>
          <div className="hist-metric-trend hist-trend-positive">Actions kept without revert</div>
        </div>
        
        <div className="hist-card hist-metric-card">
          <div className="hist-metric-header">
            <span className="hist-metric-title">Auto vs Manual</span>
            <div className="hist-metric-icon"><ShieldCheck size={16} /></div>
          </div>
          <div className="hist-metric-value">{historyMetrics.ratio}</div>
          <div className="hist-metric-trend hist-trend-positive">High automation leverage</div>
        </div>
      </div>

      {/* MAIN CONTENT: AUDIT LOG */}
      <div className="hist-card">
        <div className="hist-filter-bar">
          <button 
            className={`hist-filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All History
          </button>
          <button 
            className={`hist-filter-btn ${filter === 'ai' ? 'active' : ''}`}
            onClick={() => setFilter('ai')}
          >
            <Bot size={14} style={{ display: 'inline', marginRight: '6px' }} />
            AI Automated
          </button>
          <button 
            className={`hist-filter-btn ${filter === 'human' ? 'active' : ''}`}
            onClick={() => setFilter('human')}
          >
            <User size={14} style={{ display: 'inline', marginRight: '6px' }} />
            Human Actions
          </button>
        </div>

        <div className="hist-table-container">
          <table className="hist-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Actor</th>
                <th>Module</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                    <div>{log.timestamp.split(' ')[0]} {log.timestamp.split(' ')[1]} {log.timestamp.split(' ')[2]}</div>
                    <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '4px' }}>{log.id}</div>
                  </td>
                  
                  <td>
                    <div className="hist-actor-cell">
                      <div className={`hist-avatar ${log.actorType}`}>
                        {log.actorType === 'ai' ? <Bot size={16} /> : <User size={16} />}
                      </div>
                      <span className="hist-actor-name">{log.actor}</span>
                    </div>
                  </td>
                  
                  <td style={{ color: 'var(--color-primary)', fontWeight: '500' }}>
                    {log.module}
                  </td>
                  
                  <td className="hist-desc-cell">
                    {log.description}
                  </td>
                  
                  <td>
                    <span className={`hist-badge hist-badge-${log.status.toLowerCase()}`}>
                      {log.status === 'Failed' && <AlertTriangle size={12} style={{ marginRight: '4px' }} />}
                      {log.status}
                    </span>
                  </td>
                  
                  <td>
                    <button 
                      className="hist-revert-btn"
                      disabled={!log.canRevert}
                      title={log.canRevert ? 'Undo this action' : 'Cannot revert this action'}
                    >
                      <RotateCcw size={14} /> Revert
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredLogs.length === 0 && (
            <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--color-text-secondary)' }}>
              No history found for this filter.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
