import React, { useState } from 'react';
import { 
  Bell, AlertTriangle, ShieldAlert, CheckCircle2, 
  Settings, Clock, ArrowRight, Zap, TrendingDown,
  Globe, Box, Filter
} from 'lucide-react';
import { Card, CardContent } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Select } from '../components/Select';
import './SmartAlerts.css';

const ALERTS_DATA = [
  {
    id: 1,
    type: 'critical',
    category: 'Shipping',
    icon: ShieldAlert,
    title: 'Customs Delay Surge in Germany',
    time: '10 mins ago',
    description: 'Average customs clearance time for apparel increased from 1.2 days to 4.5 days in the last 48 hours.',
    impact: 'High Impact on CSAT',
    action: 'Review Shipping Policies'
  },
  {
    id: 2,
    type: 'warning',
    category: 'Pricing',
    icon: AlertTriangle,
    title: 'Competitor Price Drop Detected',
    time: '2 hours ago',
    description: 'A major competitor dropped prices by 15% on the "Pro Fitness Kit" in the Australian market.',
    impact: '-$4,500 expected weekly revenue',
    action: 'Match Pricing'
  },
  {
    id: 3,
    type: 'info',
    category: 'Opportunity',
    icon: Zap,
    title: 'Ad Spend Optimization Opportunity',
    time: '5 hours ago',
    description: 'Customer acquisition cost (CAC) in France dropped by 22%. Recommend increasing daily ad budget by $500.',
    impact: '+$12,000 projected monthly profit',
    action: 'Apply Budget Increase'
  },
  {
    id: 4,
    type: 'critical',
    category: 'Inventory',
    icon: Box,
    title: 'Stockout Risk: Best Seller',
    time: '1 day ago',
    description: 'The "Premium Weighted Blanket" will run out of stock in the UK warehouse in approximately 4 days at current sell-through rates.',
    impact: 'Lost revenue potential',
    action: 'Initiate Expedited Transfer'
  },
  {
    id: 5,
    type: 'warning',
    category: 'Returns',
    icon: TrendingDown,
    title: 'Return Rate Anomaly',
    time: '1 day ago',
    description: 'Return rates for "Summer Collection Sandals" spiked to 24% in the US market. Primary reason cited: "Too small".',
    impact: 'Margin degradation',
    action: 'Update Sizing Guide'
  }
];

export function SmartAlerts() {
  const [filter, setFilter] = useState('all');
  const [alertStates, setAlertStates] = useState({});

  const handleActionClick = (id) => {
    if (alertStates[id]) return;
    
    setAlertStates(prev => ({ ...prev, [id]: 'resolving' }));
    
    // Simulate API call to resolve the alert
    setTimeout(() => {
      setAlertStates(prev => ({ ...prev, [id]: 'resolved' }));
    }, 1200);
  };

  const filteredAlerts = ALERTS_DATA.filter(alert => {
    if (filter === 'all') return true;
    if (filter === 'critical') return alert.type === 'critical';
    if (filter === 'warnings') return alert.type === 'warning';
    return true;
  });

  return (
    <div className="sa-layout">
      {/* HEADER */}
      <header className="sa-header">
        <div>
          <h1 className="sa-title">Smart Alerts</h1>
          <p className="sa-subtitle">AI-powered notifications for supply chain anomalies and profit opportunities.</p>
        </div>
        <div className="sa-header-actions">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={16} color="var(--color-text-secondary)" />
            <Select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              options={[
                { value: 'all', label: `All Alerts (${ALERTS_DATA.length})` },
                { value: 'critical', label: `Critical (${ALERTS_DATA.filter(a => a.type === 'critical').length})` },
                { value: 'warnings', label: `Warnings (${ALERTS_DATA.filter(a => a.type === 'warning').length})` }
              ]}
              style={{ minWidth: '180px' }}
            />
          </div>
          <Button variant="secondary"><Settings size={16} style={{ marginRight: '8px' }} /> Preferences</Button>
        </div>
      </header>

      <div className="sa-content-grid">
        {/* MAIN ALERTS FEED */}
        <div className="sa-main-feed">
          <div className="sa-alerts-list">
            {filteredAlerts.map((alert) => (
              <Card key={alert.id} className={`sa-alert-card ${alert.type}`}>
                <CardContent className="sa-alert-content">
                  <div className="sa-alert-icon-wrap">
                    <alert.icon size={20} />
                  </div>
                  <div className="sa-alert-body">
                    <div className="sa-alert-header">
                      <div className="sa-alert-title-wrap">
                        <Badge variant={alert.type === 'critical' ? 'danger' : alert.type === 'warning' ? 'warning' : 'primary'}>
                          {alert.category}
                        </Badge>
                        <h3 className="sa-alert-title">{alert.title}</h3>
                      </div>
                      <span className="sa-alert-time"><Clock size={12} style={{ marginRight: '4px' }} /> {alert.time}</span>
                    </div>
                    
                    <p className="sa-alert-description">{alert.description}</p>
                    
                    <div className="sa-alert-footer">
                      <span className="sa-alert-impact">{alert.impact}</span>
                      <Button 
                        size="sm" 
                        variant={alertStates[alert.id] === 'resolved' ? 'secondary' : alert.type === 'info' ? 'primary' : 'secondary'} 
                        className="sa-action-btn"
                        onClick={() => handleActionClick(alert.id)}
                        disabled={!!alertStates[alert.id]}
                      >
                        {alertStates[alert.id] === 'resolving' ? (
                          'Processing...'
                        ) : alertStates[alert.id] === 'resolved' ? (
                          <><span className="text-success" style={{ display: 'flex', alignItems: 'center' }}>Resolved <CheckCircle2 size={14} style={{ marginLeft: '6px' }} /></span></>
                        ) : (
                          <>{alert.action} <ArrowRight size={14} style={{ marginLeft: '6px' }} /></>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="sa-sidebar">
          <Card className="sa-glass-card sa-stats-card">
            <CardContent>
              <h3 className="sa-section-title">Resolution Stats</h3>
              
              <div className="sa-stat-row mt-6">
                <div className="sa-stat-label">AI Auto-Resolved</div>
                <div className="sa-stat-value text-success">84%</div>
              </div>
              <div className="sa-stat-progress">
                <div className="sa-stat-bar success" style={{ width: '84%' }}></div>
              </div>

              <div className="sa-stat-row mt-4">
                <div className="sa-stat-label">Manual Action Required</div>
                <div className="sa-stat-value text-warning">16%</div>
              </div>
              <div className="sa-stat-progress">
                <div className="sa-stat-bar warning" style={{ width: '16%' }}></div>
              </div>
              
              <div className="sa-stat-divider"></div>
              
              <div className="sa-stat-row">
                <div className="sa-stat-label">Avg. Time to Resolve</div>
                <div className="sa-stat-value">1.4 hrs</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="sa-glass-card">
            <CardContent>
              <h3 className="sa-section-title">Active Monitored Systems</h3>
              <div className="sa-system-list mt-4">
                <div className="sa-system-item">
                  <CheckCircle2 size={16} className="text-success" />
                  <span>Global Fulfillment Network</span>
                </div>
                <div className="sa-system-item">
                  <CheckCircle2 size={16} className="text-success" />
                  <span>Real-time Pricing Engine</span>
                </div>
                <div className="sa-system-item">
                  <CheckCircle2 size={16} className="text-success" />
                  <span>Inventory Forecasting</span>
                </div>
                <div className="sa-system-item">
                  <AlertTriangle size={16} className="text-warning" />
                  <span>Competitor Scraping (Delayed)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
