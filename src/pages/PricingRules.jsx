import React, { useState } from 'react';
import { 
  Settings2, Plus, Zap, TrendingUp, ShieldCheck, 
  ArrowRight, Search, Play, Pause, MoreVertical 
} from 'lucide-react';
import { Card, CardContent } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import './PricingRules.css';

const KPI_DATA = [
  { label: 'Active Rules', value: '12', icon: Play, color: 'text-success' },
  { label: 'Margin Protected', value: '$24.5k', icon: ShieldCheck, color: 'text-primary' },
  { label: 'Incremental Revenue', value: '+$18.2k', icon: TrendingUp, color: 'text-success' },
];

const ACTIVE_RULES = [
  {
    id: 1,
    name: 'UK Competitor Price Match',
    category: 'Competitor',
    condition: 'If Top 3 Competitor drops price > 5%',
    action: 'Match price up to 10% floor',
    impact: '+$4.2k/mo',
    active: true,
  },
  {
    id: 2,
    name: 'Low Inventory Premium',
    category: 'Inventory',
    condition: 'If Stock < 15 days of supply',
    action: 'Increase price by 5%',
    impact: '+$2.8k/mo',
    active: true,
  },
  {
    id: 3,
    name: 'FX Fluctuation Buffer (EUR)',
    category: 'Currency',
    condition: 'If EUR drops > 2% vs USD',
    action: 'Adjust localized EUR price +2%',
    impact: 'Margin Protected',
    active: true,
  },
  {
    id: 4,
    name: 'High Return Rate Penalty',
    category: 'Returns',
    condition: 'If SKU Return Rate > 20%',
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
    <div className="pr-layout">
      {/* HEADER */}
      <header className="pr-header">
        <div>
          <h1 className="pr-title">Pricing Rules</h1>
          <p className="pr-subtitle">Manage automated dynamic pricing strategies to maximize margin.</p>
        </div>
        <div className="pr-header-actions">
          <div className="pr-search-box">
            <Search size={16} className="pr-search-icon" />
            <input type="text" placeholder="Search rules..." className="pr-search-input" />
          </div>
          <Button><Plus size={16} style={{ marginRight: '8px' }} /> Create Rule</Button>
        </div>
      </header>

      {/* KPI GRID */}
      <div className="pr-kpi-grid">
        {KPI_DATA.map((kpi, idx) => (
          <Card key={idx} className="pr-glass-card">
            <CardContent className="pr-kpi-content">
              <div className="pr-kpi-left">
                <span className="pr-kpi-label">{kpi.label}</span>
                <span className="pr-kpi-value">{kpi.value}</span>
              </div>
              <div className="pr-kpi-icon-wrap">
                <kpi.icon size={20} className={kpi.color} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="pr-main-grid">
        {/* ACTIVE RULES TABLE */}
        <div className="pr-rules-section">
          <h3 className="pr-section-title" style={{ marginBottom: '16px' }}>Active Rules Engine</h3>
          <Card className="pr-glass-card">
            <div className="pr-table-container">
              <table className="pr-data-table">
                <thead>
                  <tr>
                    <th>Rule Name</th>
                    <th>Logic Flow</th>
                    <th>Impact (30d)</th>
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
                          <Badge variant="secondary" className="pr-badge-small">{rule.category}</Badge>
                        </div>
                      </td>
                      <td>
                        <div className="pr-rule-logic">
                          <div className="pr-logic-row">
                            <span className="pr-logic-if">IF</span> 
                            <span className="pr-logic-text">{rule.condition}</span>
                          </div>
                          <div className="pr-logic-row">
                            <span className="pr-logic-then">THEN</span> 
                            <span className="pr-logic-text">{rule.action}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="pr-rule-impact font-medium text-success">{rule.impact}</span>
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
          </Card>
        </div>

        {/* AI SUGGESTIONS SIDEBAR */}
        <div className="pr-sidebar">
          <h3 className="pr-section-title" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={16} className="text-warning" /> AI Suggestions
          </h3>
          <div className="pr-suggestions-list">
            {AI_SUGGESTIONS.map(sugg => (
              <Card key={sugg.id} className="pr-glass-card pr-suggestion-card">
                <CardContent className="pr-suggestion-content">
                  <div className="pr-suggestion-header">
                    <span className="pr-suggestion-title">{sugg.name}</span>
                    <Badge variant="warning">{sugg.confidence} Match</Badge>
                  </div>
                  <p className="pr-suggestion-desc">{sugg.description}</p>
                  <div className="pr-suggestion-footer">
                    <span className="pr-suggestion-expected">{sugg.expected}</span>
                    <Button size="sm" variant="secondary" className="pr-activate-btn">
                      Activate <ArrowRight size={14} style={{ marginLeft: '4px' }} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
