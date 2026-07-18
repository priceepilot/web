import React, { useState } from 'react';
import { 
  Settings2, Plus, Zap, TrendingUp, ShieldCheck, 
  ArrowRight, Search, Play, MoreVertical 
} from 'lucide-react';
import './PricingRules.css';

// --- MOCK DATA ---
const KPI_DATA = [
  { label: 'Active Rules', value: '12', icon: Play, color: 'text-success' },
  { label: 'Automated Reprices', value: '3,492', icon: Zap, color: 'text-warning' },
  { label: 'Margin Protected', value: '$24.5k', icon: ShieldCheck, color: 'text-primary' },
  { label: 'Incremental Revenue', value: '+$18.2k', icon: TrendingUp, color: 'text-success' },
];

const ACTIVE_RULES = [
  {
    id: 1,
    name: 'UK Competitor Price Match',
    category: 'Competitor',
    condition: 'Top 3 Competitor drops price > 5%',
    action: 'Match price up to 10% floor',
    impact: '+$4.2k/mo',
    active: true,
  },
  {
    id: 2,
    name: 'Low Inventory Premium',
    category: 'Inventory',
    condition: 'Stock < 15 days of supply',
    action: 'Increase price by 5%',
    impact: '+$2.8k/mo',
    active: true,
  },
  {
    id: 3,
    name: 'FX Fluctuation Buffer (EUR)',
    category: 'Currency',
    condition: 'EUR drops > 2% vs USD',
    action: 'Adjust localized EUR price +2%',
    impact: 'Margin Protected',
    active: true,
  },
  {
    id: 4,
    name: 'High Return Rate Penalty',
    category: 'Returns',
    condition: 'SKU Return Rate > 20%',
    action: 'Increase price by 3% to absorb',
    impact: 'Margin Protected',
    active: false,
  }
];

const AI_SUGGESTIONS = [
  {
    id: 's1',
    name: 'Weekend Surge Pricing',
    description: 'Demand for "Home Goods" spikes by 24% on weekends. Recommend +2% premium Friday-Sunday.',
    confidence: '94%',
    expected: '+$5.1k/mo',
  },
  {
    id: 's2',
    name: 'Clearance Aggression',
    description: 'Aged inventory (>90 days) in Apparel. Recommend dynamic markdown curve starting at 15%.',
    confidence: '88%',
    expected: 'Recover $12k cash',
  }
];

export function PricingRules() {
  const [rules, setRules] = useState(ACTIVE_RULES);

  const toggleRule = (id) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, active: !rule.active } : rule
    ));
  };

  return (
    <div className="pr-dashboard">
      {/* HEADER */}
      <header className="pr-header">
        <div>
          <h1 className="pr-title">Pricing Rules Engine</h1>
          <p className="pr-subtitle">Manage dynamic pricing automation and AI-driven strategies.</p>
        </div>
        <div className="pr-header-actions">
          <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
            <Search size={14} color="var(--color-text-secondary)" style={{ marginRight: '8px' }} />
            <input type="text" placeholder="Search rules..." style={{ background: 'transparent', border: 'none', color: 'var(--color-text-primary)', fontSize: '0.875rem', outline: 'none' }} />
          </div>
          <button className="pr-btn primary">
            <Plus size={16} /> Create Rule
          </button>
        </div>
      </header>

      {/* KPI GRID */}
      <div className="pr-metrics-grid">
        {KPI_DATA.map((kpi, idx) => (
          <div key={idx} className="pr-card pr-metric-card">
            <div className="pr-metric-header">
              <span className="pr-metric-title">{kpi.label}</span>
              <div className="pr-metric-icon"><kpi.icon size={16} /></div>
            </div>
            <div className="pr-metric-value">{kpi.value}</div>
            <div className="pr-metric-trend pr-trend-positive">Live tracking</div>
          </div>
        ))}
      </div>

      <div className="pr-main-grid">
        {/* ACTIVE RULES TABLE */}
        <div className="pr-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)' }}>
            <h3 className="pr-card-title" style={{ margin: 0 }}>Active Automation Rules</h3>
          </div>
          
          <div className="pr-table-container">
            <table className="pr-data-table">
              <thead>
                <tr>
                  <th>Rule Strategy</th>
                  <th>Logic Engine</th>
                  <th>Estimated Impact</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rules.map((rule) => (
                  <tr key={rule.id} className={rule.active ? '' : 'pr-row-inactive'}>
                    <td>
                      <div className="pr-rule-name-wrap">
                        <span className="pr-rule-name">{rule.name}</span>
                        <span className="pr-badge">{rule.category}</span>
                      </div>
                    </td>
                    <td>
                      <div className="pr-rule-logic">
                        <div className="pr-logic-row">
                          <span className="pr-logic-block pr-logic-if">IF</span> 
                          <span className="pr-logic-text">{rule.condition}</span>
                        </div>
                        <div className="pr-logic-row">
                          <span className="pr-logic-block pr-logic-then">THEN</span> 
                          <span className="pr-logic-text">{rule.action}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="pr-rule-impact">{rule.impact}</span>
                    </td>
                    <td>
                      <button 
                        className={`pr-toggle-switch ${rule.active ? 'active' : ''}`}
                        onClick={() => toggleRule(rule.id)}
                      >
                        <div className="pr-toggle-knob"></div>
                      </button>
                    </td>
                    <td className="pr-actions-cell">
                      <button className="pr-icon-btn"><MoreVertical size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI SUGGESTIONS SIDEBAR */}
        <div className="pr-sidebar">
          <h3 className="pr-card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Zap size={18} color="#F59E0B" /> AI Strategies
          </h3>
          
          {AI_SUGGESTIONS.map(sugg => (
            <div key={sugg.id} className="pr-strategy-card">
              <div className="pr-strategy-header">
                <h4 className="pr-strategy-title">{sugg.name}</h4>
                <span className="pr-confidence-badge">{sugg.confidence} Match</span>
              </div>
              <p className="pr-strategy-desc">{sugg.description}</p>
              <div className="pr-strategy-footer">
                <span className="pr-strategy-expected">
                  <TrendingUp size={14} /> {sugg.expected}
                </span>
                <button className="pr-activate-btn">
                  Activate <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
