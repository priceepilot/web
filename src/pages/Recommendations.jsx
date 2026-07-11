import React, { useState } from 'react';
import { 
  Lightbulb, TrendingUp, Zap, Clock, ShieldCheck, 
  ArrowRight, Search, Filter, MoreVertical, CheckCircle2 
} from 'lucide-react';
import { Card, CardContent } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import './Recommendations.css';

const RECOMMENDATIONS_DATA = [
  {
    id: 1,
    title: 'Renegotiate EU 3PL Contract',
    category: 'Logistics',
    description: 'Current fulfillment cost per order in the EU is 18% higher than industry benchmark. Volume qualifies for a tiered discount.',
    impact: '+$14.2k/mo',
    effort: 'High',
    timeframe: '2-3 weeks',
    status: 'new'
  },
  {
    id: 2,
    title: 'Optimize UK Ad Spend Allocation',
    category: 'Marketing',
    description: 'CAC in the UK has dropped significantly. Reallocating $2k/day from US to UK campaigns is projected to increase net margin.',
    impact: '+$8.5k/mo',
    effort: 'Low',
    timeframe: '1 day',
    status: 'new'
  },
  {
    id: 3,
    title: 'Dynamic Pricing: Premium Electronics',
    category: 'Pricing',
    description: 'Competitor out-of-stock detected. Implementing a temporary 5% price premium on flagship electronics.',
    impact: '+$5.8k/mo',
    effort: 'Medium',
    timeframe: 'Automated',
    status: 'in_progress'
  },
  {
    id: 4,
    title: 'Bundle "Fitness Pro" Kit',
    category: 'Merchandising',
    description: 'Frequent co-purchases detected between Yoga Mats and Resistance Bands. Creating a hard bundle will reduce pick/pack costs.',
    impact: '+$3.2k/mo',
    effort: 'Medium',
    timeframe: '1 week',
    status: 'new'
  }
];

export function Recommendations() {
  const [activeTab, setActiveTab] = useState('all');
  const [items, setItems] = useState(RECOMMENDATIONS_DATA);
  const [processingId, setProcessingId] = useState(null);

  const handleAction = (id) => {
    setProcessingId(id);
    setTimeout(() => {
      setItems(items.map(item => 
        item.id === id ? { ...item, status: 'in_progress' } : item
      ));
      setProcessingId(null);
    }, 1200);
  };

  const filteredItems = items.filter(item => {
    if (activeTab === 'all') return true;
    if (activeTab === 'new') return item.status === 'new';
    if (activeTab === 'in_progress') return item.status === 'in_progress';
    return true;
  });

  return (
    <div className="rec-layout">
      {/* HEADER */}
      <header className="rec-header">
        <div>
          <h1 className="rec-title">Profit Recommendations</h1>
          <p className="rec-subtitle">AI-identified opportunities prioritized by expected financial impact.</p>
        </div>
        <div className="rec-header-actions">
          <div className="rec-search-box">
            <Search size={16} className="rec-search-icon" />
            <input type="text" placeholder="Search opportunities..." className="rec-search-input" />
          </div>
          <Button variant="secondary"><Filter size={16} style={{ marginRight: '8px' }} /> Filters</Button>
        </div>
      </header>

      {/* TABS */}
      <div className="rec-tabs">
        <button 
          className={`rec-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Recommendations
        </button>
        <button 
          className={`rec-tab-btn ${activeTab === 'new' ? 'active' : ''}`}
          onClick={() => setActiveTab('new')}
        >
          New Opportunities
          <span className="rec-tab-badge new">
            {items.filter(i => i.status === 'new').length}
          </span>
        </button>
        <button 
          className={`rec-tab-btn ${activeTab === 'in_progress' ? 'active' : ''}`}
          onClick={() => setActiveTab('in_progress')}
        >
          In Progress
          <span className="rec-tab-badge progress">
            {items.filter(i => i.status === 'in_progress').length}
          </span>
        </button>
      </div>

      {/* FEED */}
      <div className="rec-feed">
        {filteredItems.map(item => (
          <Card key={item.id} className="rec-glass-card rec-opportunity-card">
            <CardContent className="rec-opp-content">
              
              <div className="rec-opp-main">
                <div className="rec-opp-header">
                  <div className="rec-opp-title-group">
                    <Lightbulb size={20} className="text-warning" />
                    <h3 className="rec-opp-title">{item.title}</h3>
                    {item.status === 'in_progress' && (
                      <Badge variant="primary" className="ml-2">In Progress</Badge>
                    )}
                  </div>
                </div>
                
                <p className="rec-opp-desc">{item.description}</p>
                
                <div className="rec-opp-meta">
                  <Badge variant="secondary">{item.category}</Badge>
                  <div className="rec-meta-divider"></div>
                  <span className="rec-meta-item"><Clock size={14} /> {item.timeframe}</span>
                </div>
              </div>

              <div className="rec-opp-sidebar">
                <div className="rec-impact-box">
                  <span className="rec-impact-label">Expected Impact</span>
                  <span className="rec-impact-value">{item.impact}</span>
                </div>
                
                <div className="rec-effort-row">
                  <span className="rec-effort-label">Effort Level:</span>
                  <span className={`rec-effort-value ${item.effort === 'Low' ? 'text-success' : item.effort === 'Medium' ? 'text-warning' : 'text-danger'}`}>
                    {item.effort}
                  </span>
                </div>

                <div className="rec-action-area">
                  {item.status === 'in_progress' ? (
                    <Button className="w-full" variant="secondary" disabled>
                      <CheckCircle2 size={16} style={{ marginRight: '8px' }} /> Tracking
                    </Button>
                  ) : (
                    <Button 
                      className="w-full" 
                      onClick={() => handleAction(item.id)}
                      disabled={processingId === item.id}
                    >
                      {processingId === item.id ? 'Starting...' : 'Start Initiative'}
                    </Button>
                  )}
                </div>
              </div>

            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
