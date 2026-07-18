import React, { useState } from 'react';
import { 
  Workflow, Zap, ShieldCheck, Clock, CheckCircle2,
  Package, TrendingDown, BellRing, Activity
} from 'lucide-react';
import './AutomationPage.css';

// --- MOCK DATA ---
const topMetrics = {
  active: 14,
  triggers: '2,845',
  avoided: '342 hrs',
  saved: '$12,400'
};

const WORKFLOWS = [
  {
    id: 'wf-1',
    title: 'Out of Stock Auto-Pause',
    desc: 'Automatically pauses ad spend when inventory drops to zero.',
    icon: Package,
    color: '#3B82F6',
    active: true,
    stats: { fires: '124 times', lastActive: '2 hrs ago' },
    logic: [
      { type: 'trigger', text: 'Inventory drops to 0' },
      { type: 'condition', text: 'SKU is active in Ads Manager' },
      { type: 'action', text: 'Pause linked campaigns' }
    ]
  },
  {
    id: 'wf-2',
    title: 'Competitor Price Match',
    desc: 'Matches top competitor pricing down to a 15% margin floor.',
    icon: TrendingDown,
    color: '#10B981',
    active: true,
    stats: { fires: '892 times', lastActive: '15 mins ago' },
    logic: [
      { type: 'trigger', text: 'Competitor price drops > 5%' },
      { type: 'condition', text: 'New margin >= 15%' },
      { type: 'action', text: 'Match competitor price' }
    ]
  },
  {
    id: 'wf-3',
    title: 'High Return Rate Flag',
    desc: 'Flags products with surging return rates for manual review.',
    icon: ShieldCheck,
    color: '#EF4444',
    active: true,
    stats: { fires: '12 times', lastActive: '1 day ago' },
    logic: [
      { type: 'trigger', text: 'Return rate exceeds 15%' },
      { type: 'condition', text: 'Volume > 50 orders/month' },
      { type: 'action', text: 'Send alert & flag SKU' }
    ]
  },
  {
    id: 'wf-4',
    title: 'VIP Customer Fast-Track',
    desc: 'Automatically upgrades shipping for high-LTV customers.',
    icon: Zap,
    color: '#F59E0B',
    active: false,
    stats: { fires: '0 times', lastActive: 'Never' },
    logic: [
      { type: 'trigger', text: 'New order received' },
      { type: 'condition', text: 'Customer LTV > $1,000' },
      { type: 'action', text: 'Upgrade to Express Shipping' }
    ]
  }
];

const RECENT_ACTIVITY = [
  {
    id: 1,
    title: 'Competitor Price Match Fired',
    desc: 'Matched price of "Wireless Earbuds" to £49.99 (Amazon UK).',
    time: '2 mins ago'
  },
  {
    id: 2,
    title: 'Out of Stock Auto-Pause Fired',
    desc: 'Paused Meta Ad Campaign "Summer Tops" (SKU-293 out of stock).',
    time: '14 mins ago'
  },
  {
    id: 3,
    title: 'Competitor Price Match Fired',
    desc: 'Matched price of "Desk Lamp" to €24.50 (eBay DE).',
    time: '45 mins ago'
  },
  {
    id: 4,
    title: 'High Return Rate Flag Fired',
    desc: 'Flagged SKU-112 for manual review (Return rate hit 18%).',
    time: '2 hours ago'
  }
];

export function AutomationPage() {
  const [workflows, setWorkflows] = useState(WORKFLOWS);

  const toggleWorkflow = (id) => {
    setWorkflows(workflows.map(wf => 
      wf.id === id ? { ...wf, active: !wf.active } : wf
    ));
  };

  return (
    <div className="auto-dashboard">
      
      <header className="auto-header">
        <h1 className="auto-title">Automation Control Center</h1>
        <p className="auto-subtitle">Manage triggers, conditions, and actions for your automated workflows.</p>
      </header>

      {/* ROW 1: TOP METRICS */}
      <div className="auto-metrics-grid">
        <div className="auto-card auto-metric-card">
          <div className="auto-metric-header">
            <span className="auto-metric-title">Active Automations</span>
            <div className="auto-metric-icon"><Workflow size={16} /></div>
          </div>
          <div className="auto-metric-value">{topMetrics.active}</div>
          <div className="auto-metric-trend auto-trend-positive">Live workflows</div>
        </div>
        
        <div className="auto-card auto-metric-card">
          <div className="auto-metric-header">
            <span className="auto-metric-title">Triggers (24h)</span>
            <div className="auto-metric-icon" style={{ color: 'var(--color-primary)' }}><Zap size={16} /></div>
          </div>
          <div className="auto-metric-value">{topMetrics.triggers}</div>
          <div className="auto-metric-trend auto-trend-positive">+12% vs yesterday</div>
        </div>
        
        <div className="auto-card auto-metric-card">
          <div className="auto-metric-header">
            <span className="auto-metric-title">Interventions Avoided</span>
            <div className="auto-metric-icon"><ShieldCheck size={16} /></div>
          </div>
          <div className="auto-metric-value">{topMetrics.avoided}</div>
          <div className="auto-metric-trend auto-trend-positive">Manual work saved</div>
        </div>
        
        <div className="auto-card auto-metric-card">
          <div className="auto-metric-header">
            <span className="auto-metric-title">Est. Cost Savings</span>
            <div className="auto-metric-icon"><Clock size={16} /></div>
          </div>
          <div className="auto-metric-value">{topMetrics.saved}</div>
          <div className="auto-metric-trend auto-trend-positive">In operational overhead</div>
        </div>
      </div>

      <div className="auto-main-grid">
        
        {/* LEFT COL: WORKFLOW GRID */}
        <div>
          <h3 className="auto-card-title" style={{ marginBottom: '16px' }}>Active Workflows</h3>
          <div className="auto-workflow-grid">
            
            {workflows.map(wf => (
              <div key={wf.id} className="auto-wf-card" style={{ opacity: wf.active ? 1 : 0.6 }}>
                
                <div className="auto-wf-header">
                  <div className="auto-wf-title-wrap">
                    <div className="auto-wf-icon" style={{ background: wf.color }}>
                      <wf.icon size={20} />
                    </div>
                    <div>
                      <h4 className="auto-wf-title">{wf.title}</h4>
                      <p className="auto-wf-desc">{wf.desc}</p>
                    </div>
                  </div>
                  <button 
                    className={`auto-toggle-switch ${wf.active ? 'active' : ''}`}
                    onClick={() => toggleWorkflow(wf.id)}
                  >
                    <div className="auto-toggle-knob"></div>
                  </button>
                </div>

                <div className="auto-wf-logic">
                  {wf.logic.map((step, idx) => (
                    <React.Fragment key={idx}>
                      <div className="auto-logic-step">
                        <span className={`auto-logic-badge ${step.type}`}>{step.type}</span>
                        <span className="auto-logic-text">{step.text}</span>
                      </div>
                      {idx < wf.logic.length - 1 && <div className="auto-logic-connector"></div>}
                    </React.Fragment>
                  ))}
                </div>

                <div className="auto-wf-footer">
                  <div className="auto-wf-stats">
                    <span><Activity size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} /> {wf.stats.fires}</span>
                    <span><Clock size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} /> {wf.stats.lastActive}</span>
                  </div>
                </div>
                
              </div>
            ))}
            
          </div>
        </div>

        {/* RIGHT COL: ACTIVITY FEED */}
        <div className="auto-card" style={{ height: 'fit-content' }}>
          <h3 className="auto-card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BellRing size={18} color="var(--color-primary)" /> Live Activity
          </h3>
          
          <div className="auto-activity-list">
            {RECENT_ACTIVITY.map(act => (
              <div key={act.id} className="auto-activity-item">
                <div className="auto-activity-icon">
                  <CheckCircle2 size={20} />
                </div>
                <div className="auto-activity-content">
                  <h4 className="auto-activity-title">{act.title}</h4>
                  <p className="auto-activity-desc">{act.desc}</p>
                  <span className="auto-activity-time">{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
