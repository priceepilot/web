import React, { useState } from 'react';
import { 
  Beaker, TrendingUp, TrendingDown, Clock, Activity, 
  ArrowRight, Search, Plus, Filter, MoreVertical, ShieldAlert
} from 'lucide-react';
import { Card, CardContent } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import './Experiments.css';

const EXPERIMENTS_DATA = [
  {
    id: 1,
    name: 'Free Shipping Threshold: $50 vs $75',
    category: 'Logistics',
    status: 'running',
    daysActive: 14,
    trafficSplit: '50/50',
    control: {
      name: '$50 Threshold',
      convRate: '4.2%',
      aov: '$62',
      netMargin: '14.5%',
    },
    variant: {
      name: '$75 Threshold',
      convRate: '3.9%',
      convDelta: '-7%',
      aov: '$84',
      aovDelta: '+35%',
      netMargin: '18.2%',
      marginDelta: '+25%',
    },
    significance: 92,
    recommendation: 'Variant is outperforming on Net Margin despite slight CVR drop. Recommend rolling out at 95% significance.'
  },
  {
    id: 2,
    name: 'UK Premium Pricing (+5%)',
    category: 'Pricing',
    status: 'running',
    daysActive: 8,
    trafficSplit: '80/20',
    control: {
      name: 'Baseline Price',
      convRate: '3.8%',
      aov: '$110',
      netMargin: '22.0%',
    },
    variant: {
      name: 'Baseline + 5%',
      convRate: '3.7%',
      convDelta: '-2%',
      aov: '$115',
      aovDelta: '+5%',
      netMargin: '24.1%',
      marginDelta: '+9%',
    },
    significance: 68,
    recommendation: 'Needs more data. Conversion rate is holding steady, but significance is too low to conclude.'
  }
];

const COMPLETED_DATA = [
  {
    id: 3,
    name: 'Apparel Clearance: 15% vs 25% Markdown',
    category: 'Merchandising',
    status: 'completed',
    winner: 'Variant (25% Markdown)',
    impact: 'Recovered $42k in 30 days',
  }
];

export function Experiments() {
  const [activeTab, setActiveTab] = useState('running');
  const [concludingId, setConcludingId] = useState(null);

  const handleConclude = (id) => {
    setConcludingId(id);
    // Simulate API call
    setTimeout(() => {
      setConcludingId(null);
      // In a real app, this would move to completed
    }, 1500);
  };

  return (
    <div className="exp-layout">
      {/* HEADER */}
      <header className="exp-header">
        <div>
          <h1 className="exp-title">A/B Experiments</h1>
          <p className="exp-subtitle">Test and validate pricing and operational changes before full rollout.</p>
        </div>
        <div className="exp-header-actions">
          <div className="exp-search-box">
            <Search size={16} className="exp-search-icon" />
            <input type="text" placeholder="Search experiments..." className="exp-search-input" />
          </div>
          <Button><Plus size={16} style={{ marginRight: '8px' }} /> New Test</Button>
        </div>
      </header>

      {/* TABS */}
      <div className="exp-tabs">
        <button 
          className={`exp-tab-btn ${activeTab === 'running' ? 'active' : ''}`}
          onClick={() => setActiveTab('running')}
        >
          Active Tests
          <span className="exp-tab-badge running">
            {EXPERIMENTS_DATA.length}
          </span>
        </button>
        <button 
          className={`exp-tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed
        </button>
        <button 
          className={`exp-tab-btn ${activeTab === 'drafts' ? 'active' : ''}`}
          onClick={() => setActiveTab('drafts')}
        >
          Drafts
        </button>
      </div>

      {/* ACTIVE TESTS FEED */}
      {activeTab === 'running' && (
        <div className="exp-feed">
          {EXPERIMENTS_DATA.map(exp => (
            <Card key={exp.id} className="exp-glass-card exp-card">
              <CardContent className="exp-card-content">
                
                {/* Top Section */}
                <div className="exp-top-section">
                  <div className="exp-card-header">
                    <div className="exp-title-group">
                      <Beaker size={20} className="text-primary" />
                      <h3 className="exp-test-name">{exp.name}</h3>
                      <Badge variant="secondary">{exp.category}</Badge>
                    </div>
                  </div>

                  <div className="exp-meta-row">
                    <span className="exp-meta-item"><Activity size={14} className="text-success" /> Running ({exp.daysActive} days)</span>
                    <div className="exp-meta-divider"></div>
                    <span className="exp-meta-item">Traffic Split: {exp.trafficSplit}</span>
                  </div>
                </div>

                {/* Data Matrix */}
                <div className="exp-matrix">
                  {/* Control Column */}
                  <div className="exp-matrix-col">
                    <div className="exp-col-header">
                      <span className="exp-col-title">Control</span>
                      <span className="exp-col-subtitle">{exp.control.name}</span>
                    </div>
                    <div className="exp-metric-row">
                      <span className="exp-metric-label">Conv. Rate</span>
                      <span className="exp-metric-value">{exp.control.convRate}</span>
                    </div>
                    <div className="exp-metric-row">
                      <span className="exp-metric-label">AOV</span>
                      <span className="exp-metric-value">{exp.control.aov}</span>
                    </div>
                    <div className="exp-metric-row highlight">
                      <span className="exp-metric-label font-medium">Net Margin</span>
                      <span className="exp-metric-value font-semibold">{exp.control.netMargin}</span>
                    </div>
                  </div>

                  {/* VS Divider */}
                  <div className="exp-matrix-divider">
                    <div className="exp-vs-badge">VS</div>
                  </div>

                  {/* Variant Column */}
                  <div className="exp-matrix-col">
                    <div className="exp-col-header">
                      <span className="exp-col-title text-primary">Variant</span>
                      <span className="exp-col-subtitle">{exp.variant.name}</span>
                    </div>
                    <div className="exp-metric-row">
                      <span className="exp-metric-label">Conv. Rate</span>
                      <div className="exp-metric-value-group">
                        <span className="exp-metric-value">{exp.variant.convRate}</span>
                        <span className="exp-metric-delta danger">{exp.variant.convDelta}</span>
                      </div>
                    </div>
                    <div className="exp-metric-row">
                      <span className="exp-metric-label">AOV</span>
                      <div className="exp-metric-value-group">
                        <span className="exp-metric-value">{exp.variant.aov}</span>
                        <span className="exp-metric-delta success">{exp.variant.aovDelta}</span>
                      </div>
                    </div>
                    <div className="exp-metric-row highlight">
                      <span className="exp-metric-label font-medium">Net Margin</span>
                      <div className="exp-metric-value-group">
                        <span className="exp-metric-value font-semibold text-primary">{exp.variant.netMargin}</span>
                        <span className="exp-metric-delta success">{exp.variant.marginDelta}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Section */}
                <div className="exp-footer-section">
                  <div className="exp-footer-left">
                    <div className="exp-sig-box">
                      <div className="exp-sig-header">
                        <span className="exp-sig-label">Statistical Significance</span>
                        <span className="exp-sig-value">{exp.significance}%</span>
                      </div>
                      <div className="exp-sig-bar-bg">
                        <div 
                          className={`exp-sig-bar-fill ${exp.significance >= 90 ? 'high' : 'low'}`} 
                          style={{ width: `${exp.significance}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="exp-recommendation">
                      <ShieldAlert size={14} className="text-warning flex-shrink-0 mt-1" />
                      <p>{exp.recommendation}</p>
                    </div>
                  </div>
                  
                  <div className="exp-footer-right">
                    <Button 
                      onClick={() => handleConclude(exp.id)}
                      disabled={concludingId === exp.id}
                    >
                      {concludingId === exp.id ? 'Processing...' : 'Conclude Test'}
                    </Button>
                  </div>
                </div>

              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* COMPLETED TAB PLACEHOLDER */}
      {activeTab === 'completed' && (
        <div className="exp-feed">
          {COMPLETED_DATA.map(exp => (
            <Card key={exp.id} className="exp-glass-card exp-card">
              <CardContent className="exp-completed-content">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="exp-test-name mb-1">{exp.name}</h3>
                    <p className="text-text-secondary text-sm">Winner: <span className="font-medium text-success">{exp.winner}</span></p>
                  </div>
                  <div className="text-right">
                    <Badge variant="success" className="mb-1">Completed</Badge>
                    <p className="font-semibold text-success">{exp.impact}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
