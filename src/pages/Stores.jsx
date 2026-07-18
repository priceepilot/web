import React, { useState } from 'react';
import { Store, Plus, MoreVertical, ExternalLink, RefreshCw, TrendingUp, ShoppingCart, Activity } from 'lucide-react';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Card, CardContent } from '../components/Card';
import { Modal } from '../components/Modal';
import './AdminPages.css';

const INITIAL_STORES = [
  {
    id: 1,
    name: 'Acme Apparel US',
    platform: 'Shopify',
    status: 'Connected',
    lastSync: '2 mins ago',
    url: 'acme-apparel-us.myshopify.com',
    revenue: '$1.42M',
    orders: '12,450',
    trend: '+12%'
  },
  {
    id: 2,
    name: 'Acme Apparel UK',
    platform: 'Shopify',
    status: 'Connected',
    lastSync: '5 mins ago',
    url: 'acme-apparel-uk.myshopify.com',
    revenue: '$680k',
    orders: '5,120',
    trend: '+8%'
  },
  {
    id: 3,
    name: 'Acme DE (FBA)',
    platform: 'Amazon',
    status: 'Syncing',
    lastSync: 'Currently syncing...',
    url: 'amazon.de/acme',
    revenue: '$340k',
    orders: '2,890',
    trend: '-2%'
  }
];

const PLATFORMS = [
  { id: 'shopify', name: 'Shopify', color: '#95BF47' },
  { id: 'amazon', name: 'Amazon', color: '#FF9900' },
  { id: 'woocommerce', name: 'WooCommerce', color: '#96588A' },
  { id: 'magento', name: 'Magento', color: '#EE672F' }
];

const API_URL = import.meta.env.VITE_API_URL || 'https://engine-494234282337.europe-west1.run.app';

export function Stores() {
  const [stores, setStores] = useState(INITIAL_STORES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [storeUrl, setStoreUrl] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectError, setConnectError] = useState('');

  const handleConnect = () => {
    if (!selectedPlatform || !storeUrl) return;
    setConnectError('');

    // --- Real Shopify OAuth Flow ---
    if (selectedPlatform.id === 'shopify') {
      // Clean up the input
      let shop = storeUrl
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .replace(/\/$/, '')
        .trim();

      // Ensure it ends with .myshopify.com
      if (!shop.includes('.myshopify.com')) {
        shop = `${shop}.myshopify.com`;
      }

      // Validate format
      if (!/^[a-zA-Z0-9-]+\.myshopify\.com$/.test(shop)) {
        setConnectError('Enter a valid Shopify store URL (e.g. my-store or my-store.myshopify.com)');
        return;
      }

      // Redirect browser to backend OAuth start — backend handles the rest
      window.location.href = `${API_URL}/auth/shopify?shop=${shop}`;
      return;
    }

    // --- Mock flow for Amazon, WooCommerce, Magento ---
    setIsConnecting(true);
    setTimeout(() => {
      const newStore = {
        id: Date.now(),
        name: storeUrl.split('.')[0] || 'New Store',
        platform: selectedPlatform.name,
        status: 'Syncing',
        lastSync: 'Currently syncing...',
        url: storeUrl,
        revenue: '$0',
        orders: '0',
        trend: '+0%'
      };
      setStores([...stores, newStore]);
      setIsConnecting(false);
      setIsModalOpen(false);
      setSelectedPlatform(null);
      setStoreUrl('');
    }, 1500);
  };

  return (
    <div className="admin-page-layout">
      <header className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Stores</h1>
          <p className="admin-page-subtitle">Manage your connected storefronts and sales channels.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}><Plus size={16} style={{ marginRight: '8px' }} /> Connect Store</Button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
        <Card style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <CardContent style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ padding: '8px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', color: 'var(--color-success)' }}>
                <TrendingUp size={20} />
              </div>
              <span style={{ color: 'var(--color-text-secondary)', fontSize: '14px', fontWeight: '500' }}>Global Revenue (30d)</span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--color-text-primary)' }}>$2.44M</div>
          </CardContent>
        </Card>
        <Card style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <CardContent style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ padding: '8px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', color: '#60A5FA' }}>
                <ShoppingCart size={20} />
              </div>
              <span style={{ color: 'var(--color-text-secondary)', fontSize: '14px', fontWeight: '500' }}>Total Orders (30d)</span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--color-text-primary)' }}>20,460</div>
          </CardContent>
        </Card>
        <Card style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <CardContent style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ padding: '8px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '8px', color: '#A78BFA' }}>
                <Activity size={20} />
              </div>
              <span style={{ color: 'var(--color-text-secondary)', fontSize: '14px', fontWeight: '500' }}>Sync Health</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--color-text-primary)' }}>100%</div>
              <span style={{ color: 'var(--color-success)', fontSize: '14px', fontWeight: '500' }}>{stores.length}/{stores.length} Active</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="admin-list-container">
        {stores.map(store => (
          <div key={store.id} className="admin-list-item">
            <div className="admin-list-item-main" style={{ minWidth: '300px' }}>
              <div className="admin-list-icon">
                <Store size={20} className="text-primary" />
              </div>
              <div className="admin-list-info">
                <div className="admin-list-title-row">
                  <h3 className="admin-list-title">{store.name}</h3>
                  <Badge variant="secondary" className="admin-badge-small">{store.platform}</Badge>
                </div>
                <div className="admin-list-meta">
                  <a href={`https://${store.url}`} target="_blank" rel="noreferrer" className="admin-link">
                    {store.url} <ExternalLink size={12} className="ml-1" />
                  </a>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '48px', alignItems: 'center', flex: 1, paddingLeft: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>Revenue</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--color-text-primary)', fontWeight: '600', fontSize: '15px' }}>{store.revenue}</span>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: store.trend.startsWith('+') ? 'var(--color-success)' : 'var(--color-danger)' }}>
                    {store.trend}
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>Orders</span>
                <span style={{ color: 'var(--color-text-primary)', fontWeight: '600', fontSize: '15px' }}>{store.orders}</span>
              </div>
            </div>
            <div className="admin-list-item-side" style={{ minWidth: '160px', justifyContent: 'flex-end' }}>
              <div className="admin-sync-status">
                {store.status === 'Syncing' ? (
                  <RefreshCw size={14} className="text-warning admin-spin" />
                ) : (
                  <span className="admin-status-dot connected"></span>
                )}
                <span className="admin-sync-text">{store.lastSync}</span>
              </div>
              <button className="admin-icon-btn"><MoreVertical size={18} /></button>
            </div>
          </div>
        ))}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => !isConnecting && setIsModalOpen(false)}
        title="Connect New Store"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
              Select Platform
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {PLATFORMS.map(platform => (
                <button
                  key={platform.id}
                  onClick={() => setSelectedPlatform(platform)}
                  style={{
                    padding: '16px',
                    borderRadius: '8px',
                    border: `1px solid ${selectedPlatform?.id === platform.id ? platform.color : 'var(--color-border)'}`,
                    background: selectedPlatform?.id === platform.id ? 'var(--color-background-soft)' : 'var(--color-surface)',
                    color: 'var(--color-text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: platform.color }}></div>
                  <span style={{ fontWeight: '500' }}>{platform.name}</span>
                </button>
              ))}
            </div>
          </div>

          {selectedPlatform && (
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                Store URL
              </label>
              <input 
                type="text" 
                placeholder={`e.g. my-store.${selectedPlatform.name.toLowerCase()}.com`}
                value={storeUrl}
                onChange={(e) => setStoreUrl(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'var(--color-background)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  color: '#fff',
                  outline: 'none',
                }}
              />
            </div>
          )}

          {connectError && (
            <div style={{ color: '#ef4444', fontSize: '13px', padding: '8px 0' }}>
              ⚠️ {connectError}
            </div>
          )}

          {selectedPlatform?.id === 'shopify' && !connectError && (
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', padding: '4px 0' }}>
              You'll be redirected to Shopify to approve the connection.
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
            <Button variant="secondary" onClick={() => { setIsModalOpen(false); setConnectError(''); }} disabled={isConnecting}>Cancel</Button>
            <Button onClick={handleConnect} disabled={!selectedPlatform || !storeUrl || isConnecting}>
              {selectedPlatform?.id === 'shopify' ? 'Connect with Shopify →' : isConnecting ? 'Connecting...' : 'Connect Store'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
