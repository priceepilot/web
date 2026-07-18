import React from 'react';
import {
  Store, ShoppingBag, TrendingUp, Package,
  Plus, Settings, RefreshCw, AlertCircle, CheckCircle2
} from 'lucide-react';
import './StoresPage.css';

// --- MOCK DATA ---
const METRICS = {
  totalStores: 5,
  totalRevenue: '$284,200',
  totalOrders: '1,842',
  avgMargin: '31.4%'
};

const STORES = [
  {
    id: 'st-1',
    name: 'US Flagship Store',
    platform: 'Shopify',
    initials: 'US',
    color: '#3B82F6',
    status: 'active',
    revenue: '$142,080',
    orders: 891,
    margin: '33.2%'
  },
  {
    id: 'st-2',
    name: 'EU Official Store',
    platform: 'Shopify',
    initials: 'EU',
    color: '#8B5CF6',
    status: 'active',
    revenue: '$88,540',
    orders: 612,
    margin: '29.1%'
  },
  {
    id: 'st-3',
    name: 'Amazon FBA - US',
    platform: 'Amazon',
    initials: 'a',
    color: '#F59E0B',
    status: 'active',
    revenue: '$36,400',
    orders: 287,
    margin: '28.5%'
  },
  {
    id: 'st-4',
    name: 'UK Storefront',
    platform: 'WooCommerce',
    initials: 'UK',
    color: '#10B981',
    status: 'paused',
    revenue: '$17,180',
    orders: 52,
    margin: '22.8%'
  }
];

const ACTIVITY = [
  {
    id: 'a-1',
    type: 'sale',
    title: 'US Flagship — 14 New Orders',
    desc: '2 minutes ago'
  },
  {
    id: 'a-2',
    type: 'restock',
    title: 'EU Store — Inventory Synced',
    desc: '18 minutes ago'
  },
  {
    id: 'a-3',
    type: 'alert',
    title: 'UK Storefront — Low Stock Alert',
    desc: 'SKU: CH-ERG-01 (3 units left)'
  },
  {
    id: 'a-4',
    type: 'sale',
    title: 'Amazon FBA — 6 New Orders',
    desc: '1 hour ago'
  },
  {
    id: 'a-5',
    type: 'restock',
    title: 'Amazon FBA — Fees Synced',
    desc: '2 hours ago'
  }
];

const ActivityIcon = ({ type }) => {
  if (type === 'sale') return <div className="stores-activity-icon sale"><ShoppingBag size={15} /></div>;
  if (type === 'restock') return <div className="stores-activity-icon restock"><RefreshCw size={15} /></div>;
  return <div className="stores-activity-icon alert"><AlertCircle size={15} /></div>;
};

export function StoresPage() {
  return (
    <div className="stores-dashboard">

      <header className="stores-header">
        <div>
          <h1 className="stores-title">Stores</h1>
          <p className="stores-subtitle">Monitor performance across every channel in one place.</p>
        </div>
        <button className="stores-btn primary">
          <Plus size={16} /> Add Store
        </button>
      </header>

      {/* ROW 1: TOP METRICS */}
      <div className="stores-metrics-grid">
        <div className="stores-card stores-metric-card">
          <div className="stores-metric-header">
            <span className="stores-metric-title">Active Stores</span>
            <div className="stores-metric-icon"><Store size={16} /></div>
          </div>
          <div className="stores-metric-value">{METRICS.totalStores}</div>
          <div className="stores-metric-trend">Multi-channel</div>
        </div>

        <div className="stores-card stores-metric-card">
          <div className="stores-metric-header">
            <span className="stores-metric-title">Total Revenue</span>
            <div className="stores-metric-icon" style={{ color: '#10B981' }}><TrendingUp size={16} /></div>
          </div>
          <div className="stores-metric-value">{METRICS.totalRevenue}</div>
          <div className="stores-metric-trend">This month</div>
        </div>

        <div className="stores-card stores-metric-card">
          <div className="stores-metric-header">
            <span className="stores-metric-title">Total Orders</span>
            <div className="stores-metric-icon" style={{ color: '#3B82F6' }}><ShoppingBag size={16} /></div>
          </div>
          <div className="stores-metric-value">{METRICS.totalOrders}</div>
          <div className="stores-metric-trend">This month</div>
        </div>

        <div className="stores-card stores-metric-card">
          <div className="stores-metric-header">
            <span className="stores-metric-title">Avg Net Margin</span>
            <div className="stores-metric-icon" style={{ color: '#8B5CF6' }}><Package size={16} /></div>
          </div>
          <div className="stores-metric-value">{METRICS.avgMargin}</div>
          <div className="stores-metric-trend">Across all channels</div>
        </div>
      </div>

      <div className="stores-main-grid">

        {/* LEFT: STORE CARDS */}
        <div>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
            Your Stores
          </h3>
          <div className="stores-grid">
            {STORES.map(store => (
              <div key={store.id} className="store-card">

                <div className="store-card-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div className="store-logo" style={{ background: store.color }}>
                      {store.initials}
                    </div>
                    <div>
                      <h4 className="store-name">{store.name}</h4>
                      <p className="store-platform">{store.platform}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className={`store-status ${store.status}`}>
                      <div className="store-pulse"></div>
                      {store.status}
                    </span>
                    <button className="stores-btn outline" style={{ padding: '6px', border: 'none', background: 'transparent' }}>
                      <Settings size={15} color="var(--color-text-secondary)" />
                    </button>
                  </div>
                </div>

                <div className="store-metrics-row">
                  <div className="store-stat">
                    <span className="store-stat-label">Revenue</span>
                    <span className="store-stat-value">{store.revenue}</span>
                  </div>
                  <div className="store-stat">
                    <span className="store-stat-label">Orders</span>
                    <span className="store-stat-value">{store.orders}</span>
                  </div>
                  <div className="store-stat">
                    <span className="store-stat-label">Net Margin</span>
                    <span className="store-stat-value" style={{ color: '#10B981' }}>{store.margin}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: ACTIVITY FEED */}
        <div className="stores-card" style={{ height: 'fit-content' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={18} color="var(--color-primary)" /> Store Activity
            </h3>
          </div>

          <div className="stores-activity-list">
            {ACTIVITY.map(item => (
              <div key={item.id} className="stores-activity-item">
                <ActivityIcon type={item.type} />
                <div className="stores-activity-content">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
