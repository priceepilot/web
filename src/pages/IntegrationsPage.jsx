import React, { useState } from 'react';
import { 
  Link, Activity, Database, CheckCircle2, 
  AlertTriangle, Settings, Plus, RefreshCw, ShoppingCart, BarChart3, Truck
} from 'lucide-react';
import './IntegrationsPage.css';

// --- MOCK DATA ---
const TOP_METRICS = {
  connected: 4,
  health: '99.9%',
  dataPoints: '1.2M'
};

const CATEGORIES = ['All Integrations', 'E-commerce', 'Accounting', 'Marketing', 'Shipping'];

const INTEGRATIONS = [
  {
    id: 'int-1',
    name: 'Shopify',
    category: 'E-commerce',
    desc: 'Sync orders, inventory, and customer data in real-time.',
    logo: 'S', // Placeholder for logo
    color: '#95BF47',
    status: 'connected'
  },
  {
    id: 'int-2',
    name: 'Amazon Seller Central',
    category: 'E-commerce',
    desc: 'Pull FBA fees, marketplace orders, and buy-box data.',
    logo: 'a',
    color: '#FF9900',
    status: 'connected'
  },
  {
    id: 'int-3',
    name: 'QuickBooks Online',
    category: 'Accounting',
    desc: 'Automate journal entries for revenue and COGS.',
    logo: 'qb',
    color: '#2CA01C',
    status: 'disconnected'
  },
  {
    id: 'int-4',
    name: 'Meta Ads',
    category: 'Marketing',
    desc: 'Sync ad spend and ROAS metrics down to the SKU level.',
    logo: 'M',
    color: '#0668E1',
    status: 'connected'
  },
  {
    id: 'int-5',
    name: 'ShipStation',
    category: 'Shipping',
    desc: 'Extract exact carrier costs per package to calculate true net margin.',
    logo: 'SS',
    color: '#4AA947',
    status: 'connected'
  },
  {
    id: 'int-6',
    name: 'WooCommerce',
    category: 'E-commerce',
    desc: 'Connect your self-hosted store for unified profit tracking.',
    logo: 'W',
    color: '#96588A',
    status: 'disconnected'
  }
];

const SYNC_FEED = [
  {
    id: 'sf-1',
    title: 'Shopify Inventory Synced',
    time: '2 mins ago',
    status: 'success'
  },
  {
    id: 'sf-2',
    title: 'Amazon Orders Fetched',
    time: '15 mins ago',
    status: 'success'
  },
  {
    id: 'sf-3',
    title: 'Meta Ads API Rate Limit',
    time: '1 hour ago',
    status: 'warning'
  },
  {
    id: 'sf-4',
    title: 'ShipStation Costs Updated',
    time: '2 hours ago',
    status: 'success'
  }
];

export function IntegrationsPage() {
  const [activeTab, setActiveTab] = useState('All Integrations');

  const filteredApps = activeTab === 'All Integrations' 
    ? INTEGRATIONS 
    : INTEGRATIONS.filter(app => app.category === activeTab);

  return (
    <div className="int-dashboard">
      
      <header className="int-header">
        <div>
          <h1 className="int-title">Integrations Hub</h1>
          <p className="int-subtitle">Connect external platforms to unify your cross-border data.</p>
        </div>
        <button className="int-btn primary">
          <Plus size={16} /> Request Integration
        </button>
      </header>

      {/* ROW 1: TOP METRICS */}
      <div className="int-metrics-grid">
        <div className="int-card int-metric-card">
          <div className="int-metric-header">
            <span className="int-metric-title">Connected Apps</span>
            <div className="int-metric-icon"><Link size={16} /></div>
          </div>
          <div className="int-metric-value">{TOP_METRICS.connected}</div>
          <div className="int-metric-trend int-trend-positive">Active connections</div>
        </div>
        
        <div className="int-card int-metric-card">
          <div className="int-metric-header">
            <span className="int-metric-title">API Sync Health</span>
            <div className="int-metric-icon" style={{ color: '#10B981' }}><Activity size={16} /></div>
          </div>
          <div className="int-metric-value">{TOP_METRICS.health}</div>
          <div className="int-metric-trend int-trend-positive">Systems operational</div>
        </div>
        
        <div className="int-card int-metric-card">
          <div className="int-metric-header">
            <span className="int-metric-title">Data Points (24h)</span>
            <div className="int-metric-icon" style={{ color: 'var(--color-primary)' }}><Database size={16} /></div>
          </div>
          <div className="int-metric-value">{TOP_METRICS.dataPoints}</div>
          <div className="int-metric-trend int-trend-positive">Successfully synced</div>
        </div>
      </div>

      <div className="int-main-grid">
        
        {/* LEFT COL: APP GRID */}
        <div>
          
          <div className="int-tabs">
            {CATEGORIES.map(cat => (
              <button 
                key={cat} 
                className={`int-tab ${activeTab === cat ? 'active' : ''}`}
                onClick={() => setActiveTab(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="int-apps-grid">
            {filteredApps.map(app => (
              <div key={app.id} className="int-app-card">
                
                <div className="int-app-header">
                  <div className="int-app-logo" style={{ color: app.color, fontSize: '24px', fontWeight: 800 }}>
                    {app.logo}
                  </div>
                  
                  {app.status === 'connected' ? (
                    <span className="int-status-badge connected">
                      <div className="int-pulse"></div> Connected
                    </span>
                  ) : (
                    <span className="int-status-badge disconnected">
                      Not Connected
                    </span>
                  )}
                </div>
                
                <div className="int-app-info">
                  <h4>{app.name}</h4>
                  <p>{app.desc}</p>
                </div>

                <div className="int-app-footer">
                  {app.status === 'connected' ? (
                    <button className="int-btn outline"><Settings size={14} /> Configure</button>
                  ) : (
                    <button className="int-btn outline"><Link size={14} /> Connect</button>
                  )}
                </div>

              </div>
            ))}
          </div>
          
        </div>

        {/* RIGHT COL: SYNC FEED */}
        <div className="int-card" style={{ height: 'fit-content' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 className="int-card-title" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <RefreshCw size={18} color="var(--color-primary)" /> Live Sync Feed
            </h3>
          </div>
          
          <div className="int-sync-list">
            {SYNC_FEED.map(feed => (
              <div key={feed.id} className="int-sync-item">
                <div className={`int-sync-icon ${feed.status}`}>
                  {feed.status === 'success' ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
                </div>
                <div className="int-sync-content">
                  <h4 className="int-sync-title">{feed.title}</h4>
                  <span className="int-sync-time">{feed.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
