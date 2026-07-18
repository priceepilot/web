import React, { useState } from 'react';
import { 
  CheckSquare, Zap, User, Clock, 
  Check, X, Play, RotateCcw 
} from 'lucide-react';
import './TaskPage.css';

// --- MOCK DATA ---
const taskMetrics = {
  active: 24,
  automated: 842,
  manual: 5,
  timeSaved: '142 hrs'
};

const tasksData = [
  {
    id: 'TSK-001',
    name: 'Reprice UK Inventory',
    desc: 'AI recommends dropping prices by 5% on winter apparel in UK due to unseasonably warm weather.',
    type: 'ai',
    priority: 'high',
    status: 'pending',
    time: '2 hours ago',
    module: 'Pricing Engine'
  },
  {
    id: 'TSK-002',
    name: 'Review Flagged Fraud Order #1029',
    desc: 'Order flagged due to address mismatch and high value ($1,200). Manual review required before fulfillment.',
    type: 'human',
    priority: 'high',
    status: 'pending',
    time: '4 hours ago',
    module: 'Risk Center'
  },
  {
    id: 'TSK-003',
    name: 'Pause Underperforming Ads in France',
    desc: 'Campaign "Summer Sale FR" ROAS dropped below 1.5. AI suggests pausing immediately.',
    type: 'ai',
    priority: 'medium',
    status: 'pending',
    time: '5 hours ago',
    module: 'Ad Optimization'
  },
  {
    id: 'TSK-004',
    name: 'Update Product Tags for SEO',
    desc: 'New trending keywords detected for "Wireless Earbuds". 42 products need tag updates.',
    type: 'human',
    priority: 'low',
    status: 'pending',
    time: '1 day ago',
    module: 'Catalog Manager'
  }
];

export function TaskPage() {
  const [filter, setFilter] = useState('all');

  const filteredTasks = tasksData.filter(task => {
    if (filter === 'all') return true;
    return task.type === filter;
  });

  return (
    <div className="task-dashboard">
      
      <header className="task-header">
        <h1 className="task-title">AI Task Manager</h1>
        <p className="task-subtitle">Review automated actions and manage tasks requiring human intervention.</p>
      </header>

      {/* ROW 1: TOP METRICS */}
      <div className="task-metrics-grid">
        <div className="task-card task-metric-card">
          <div className="task-metric-header">
            <span className="task-metric-title">Active Tasks</span>
            <div className="task-metric-icon"><CheckSquare size={16} /></div>
          </div>
          <div className="task-metric-value">{taskMetrics.active}</div>
          <div className="task-metric-trend task-trend-neutral">Pending review</div>
        </div>
        
        <div className="task-card task-metric-card">
          <div className="task-metric-header">
            <span className="task-metric-title">Automated Actions (24h)</span>
            <div className="task-metric-icon"><Zap size={16} /></div>
          </div>
          <div className="task-metric-value">{taskMetrics.automated}</div>
          <div className="task-metric-trend task-trend-positive">+12% vs yesterday</div>
        </div>
        
        <div className="task-card task-metric-card" style={{ borderColor: 'rgba(245, 158, 11, 0.3)' }}>
          <div className="task-metric-header">
            <span className="task-metric-title" style={{ color: '#F59E0B' }}>Manual Review Needed</span>
            <div className="task-metric-icon" style={{ color: '#F59E0B', background: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgba(245, 158, 11, 0.2)' }}><User size={16} /></div>
          </div>
          <div className="task-metric-value">{taskMetrics.manual}</div>
          <div className="task-metric-trend" style={{ color: '#F59E0B' }}>Action required</div>
        </div>
        
        <div className="task-card task-metric-card">
          <div className="task-metric-header">
            <span className="task-metric-title">Time Saved (MTD)</span>
            <div className="task-metric-icon"><Clock size={16} /></div>
          </div>
          <div className="task-metric-value">{taskMetrics.timeSaved}</div>
          <div className="task-metric-trend task-trend-positive">~3.5 full-time equivalents</div>
        </div>
      </div>

      {/* MAIN CONTENT: TASK LIST */}
      <div className="task-card">
        <div className="task-filter-bar">
          <button 
            className={`task-filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Tasks ({tasksData.length})
          </button>
          <button 
            className={`task-filter-btn ${filter === 'ai' ? 'active' : ''}`}
            onClick={() => setFilter('ai')}
          >
            <Zap size={14} style={{ display: 'inline', marginRight: '6px' }} />
            AI Suggestions ({tasksData.filter(t => t.type === 'ai').length})
          </button>
          <button 
            className={`task-filter-btn ${filter === 'human' ? 'active' : ''}`}
            onClick={() => setFilter('human')}
          >
            <User size={14} style={{ display: 'inline', marginRight: '6px' }} />
            Manual Review ({tasksData.filter(t => t.type === 'human').length})
          </button>
        </div>

        <div className="task-list">
          {filteredTasks.map(task => (
            <div key={task.id} className="task-item">
              
              <div className={`task-avatar ${task.type}`}>
                {task.type === 'ai' ? <Zap size={24} /> : <User size={24} />}
              </div>
              
              <div className="task-details">
                <div className="task-header-row">
                  <h3 className="task-name">{task.name}</h3>
                  <span className={`task-badge ${task.priority}`}>{task.priority}</span>
                </div>
                <p className="task-desc">{task.desc}</p>
                <div className="task-meta">
                  <span className="task-meta-item"><Clock size={14} /> {task.time}</span>
                  <span className="task-meta-item">•</span>
                  <span className="task-meta-item" style={{ color: 'var(--color-primary)' }}>{task.module}</span>
                </div>
              </div>

              <div className="task-actions">
                {task.type === 'ai' ? (
                  <>
                    <button className="task-btn primary">
                      <Check size={16} /> Approve
                    </button>
                    <button className="task-btn secondary">
                      <X size={16} /> Reject
                    </button>
                  </>
                ) : (
                  <>
                    <button className="task-btn primary">
                      <Play size={16} /> Start Task
                    </button>
                    <button className="task-btn secondary">
                      <RotateCcw size={16} /> Reassign
                    </button>
                  </>
                )}
              </div>

            </div>
          ))}
          
          {filteredTasks.length === 0 && (
            <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--color-text-secondary)' }}>
              No tasks found for this filter.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
