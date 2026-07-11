import React, { useState } from 'react';
import { Plus, MoreVertical, CheckCircle2, AlertCircle, Zap, Database, Activity, Box, DollarSign, Megaphone, Mail, Search } from 'lucide-react';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Card, CardContent } from '../components/Card';
import { Modal } from '../components/Modal';
import './AdminPages.css';

const INTEGRATIONS_DATA = [
  {
    id: 1,
    name: 'ShipBob',
    type: '3PL / Fulfillment',
    status: 'Connected',
    health: 'Healthy',
    lastSync: 'Synced 10m ago',
    icon: Box,
    metric1Label: 'Orders Fulfilled',
    metric1Value: '18.2k',
    metric2Label: 'Locations',
    metric2Value: '4 Active'
  },
  {
    id: 2,
    name: 'NetSuite ERP',
    type: 'Finance & Inventory',
    status: 'Connected',
    health: 'Warning',
    lastSync: 'API limits approaching',
    icon: DollarSign,
    metric1Label: 'Records Synced',
    metric1Value: '1.2M',
    metric2Label: 'Sync Mode',
    metric2Value: 'Real-time'
  },
  {
    id: 3,
    name: 'Google Ads',
    type: 'Marketing',
    status: 'Connected',
    health: 'Healthy',
    lastSync: 'Synced 1h ago',
    icon: Megaphone,
    metric1Label: 'Monthly Spend',
    metric1Value: '$42.5k',
    metric2Label: 'Blended ROAS',
    metric2Value: '3.2x'
  },
  {
    id: 4,
    name: 'Klaviyo',
    type: 'Email & SMS',
    status: 'Connected',
    health: 'Healthy',
    lastSync: 'Synced 5m ago',
    icon: Mail,
    metric1Label: 'Active Profiles',
    metric1Value: '124k',
    metric2Label: 'Attributed Rev',
    metric2Value: '22%'
  },
  {
    id: 5,
    name: 'Meta Ads',
    type: 'Marketing',
    status: 'Not Connected',
    health: null,
    lastSync: 'Connect to unlock CAC insights',
    icon: Megaphone,
    metric1Label: 'Monthly Spend',
    metric1Value: '-',
    metric2Label: 'Blended ROAS',
    metric2Value: '-'
  }
];

const DIRECTORY_APPS = [
  { id: 'tiktok', name: 'TikTok Ads', type: 'Marketing', icon: Megaphone },
  { id: 'salesforce', name: 'Salesforce', type: 'CRM', icon: Database },
  { id: 'zendesk', name: 'Zendesk', type: 'Support', icon: Mail },
  { id: 'quickbooks', name: 'QuickBooks', type: 'Finance', icon: DollarSign },
  { id: 'shipstation', name: 'ShipStation', type: 'Logistics', icon: Box },
  { id: 'slack', name: 'Slack', type: 'Operations', icon: Zap }
];

export function Integrations() {
  const [integrations, setIntegrations] = useState(INTEGRATIONS_DATA);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [installingId, setInstallingId] = useState(null);

  const handleConnect = (id) => {
    setIsConnecting(id);
    setTimeout(() => {
      setIntegrations(integrations.map(int => 
        int.id === id ? { 
          ...int, 
          status: 'Connected', 
          health: 'Healthy', 
          lastSync: 'Just connected',
          metric1Value: 'Syncing...',
          metric2Value: 'Syncing...' 
        } : int
      ));
      setIsConnecting(null);
    }, 1500);
  };

  const handleInstall = (app) => {
    setInstallingId(app.id);
    setTimeout(() => {
      const newIntegration = {
        id: Date.now(),
        name: app.name,
        type: app.type,
        status: 'Not Connected',
        health: null,
        lastSync: 'Requires Configuration',
        icon: app.icon,
        metric1Label: 'Status',
        metric1Value: 'Pending setup',
        metric2Label: 'Data Sync',
        metric2Value: 'Paused'
      };
      setIntegrations([...integrations, newIntegration]);
      setInstallingId(null);
      setIsModalOpen(false);
    }, 1200);
  };

  const filteredApps = DIRECTORY_APPS.filter(app => 
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    app.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-page-layout">
      <header className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Integrations</h1>
          <p className="admin-page-subtitle">Connect 3PLs, ERPs, and ad networks for complete profit visibility.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}><Plus size={16} style={{ marginRight: '8px' }} /> Browse Directory</Button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
        <Card style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <CardContent style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ padding: '8px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', color: 'var(--color-success)' }}>
                <Zap size={20} />
              </div>
              <span style={{ color: 'var(--color-text-secondary)', fontSize: '14px', fontWeight: '500' }}>Active Connections</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--color-text-primary)' }}>{integrations.filter(i => i.status === 'Connected').length}</div>
              <span style={{ color: 'var(--color-text-secondary)', fontSize: '14px', fontWeight: '500' }}>/ {integrations.length} Apps</span>
            </div>
          </CardContent>
        </Card>
        <Card style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <CardContent style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ padding: '8px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', color: '#60A5FA' }}>
                <Database size={20} />
              </div>
              <span style={{ color: 'var(--color-text-secondary)', fontSize: '14px', fontWeight: '500' }}>Data Processed (30d)</span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--color-text-primary)' }}>42.8 GB</div>
          </CardContent>
        </Card>
        <Card style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <CardContent style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ padding: '8px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px', color: '#F59E0B' }}>
                <Activity size={20} />
              </div>
              <span style={{ color: 'var(--color-text-secondary)', fontSize: '14px', fontWeight: '500' }}>API Calls (30d)</span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--color-text-primary)' }}>1.2M</div>
          </CardContent>
        </Card>
      </div>

      <div className="admin-list-container">
        {integrations.map(integration => {
          const Icon = integration.icon;
          return (
          <div key={integration.id} className="admin-list-item">
            <div className="admin-list-item-main" style={{ width: '320px' }}>
              <div className="admin-list-icon">
                <Icon size={20} className={integration.status === 'Connected' ? 'text-primary' : 'text-text-secondary'} />
              </div>
              <div className="admin-list-info">
                <div className="admin-list-title-row">
                  <h3 className="admin-list-title" style={{ color: integration.status !== 'Connected' ? 'var(--color-text-secondary)' : 'var(--color-text-primary)' }}>
                    {integration.name}
                  </h3>
                  <Badge variant="secondary" className="admin-badge-small">{integration.type}</Badge>
                </div>
                <div className="admin-list-meta">
                  {integration.health === 'Warning' && <AlertCircle size={14} className="text-warning" />}
                  {integration.health === 'Healthy' && <CheckCircle2 size={14} className="text-success" />}
                  {integration.lastSync}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '48px', alignItems: 'center', flex: 1, paddingLeft: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '120px' }}>
                <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>{integration.metric1Label}</span>
                <span style={{ color: integration.status === 'Connected' ? 'var(--color-text-primary)' : 'var(--color-text-secondary)', fontWeight: '600', fontSize: '15px' }}>{integration.metric1Value}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '120px' }}>
                <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>{integration.metric2Label}</span>
                <span style={{ color: integration.status === 'Connected' ? 'var(--color-text-primary)' : 'var(--color-text-secondary)', fontWeight: '600', fontSize: '15px' }}>{integration.metric2Value}</span>
              </div>
            </div>
            <div className="admin-list-item-side" style={{ minWidth: '140px', justifyContent: 'flex-end' }}>
              {integration.status === 'Connected' ? (
                <>
                  <div className="admin-sync-status">
                    <span className="admin-status-dot connected"></span>
                    <span className="admin-sync-text">Active</span>
                  </div>
                  <button className="admin-icon-btn"><MoreVertical size={18} /></button>
                </>
              ) : (
                <Button size="sm" variant="secondary" onClick={() => handleConnect(integration.id)} disabled={isConnecting === integration.id}>
                  {isConnecting === integration.id ? 'Connecting...' : 'Connect'}
                </Button>
              )}
            </div>
          </div>
        )})}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="App Directory"
        className="app-directory-modal"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '480px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--color-text-secondary)' }} />
            <input 
              type="text" 
              placeholder="Search integrations by name or category..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%', padding: '12px 16px 12px 42px',
                background: 'var(--color-background)', border: '1px solid var(--color-border)',
                borderRadius: '8px', color: 'var(--color-text-primary)', outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>
          
          <div className="custom-scrollbar" style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '400px', overflowY: 'auto', paddingRight: '8px' }}>
            {filteredApps.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', padding: '24px 0' }}>No integrations found.</p>
            ) : (
              filteredApps.map(app => {
                const Icon = app.icon;
                const isInstalled = integrations.some(i => i.name === app.name);
                
                return (
                  <div key={app.id} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '16px', background: 'var(--color-surface)', 
                    border: '1px solid var(--color-border)', borderRadius: '8px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={20} className="text-primary" />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '2px' }}>{app.name}</h4>
                        <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{app.type}</span>
                      </div>
                    </div>
                    {isInstalled ? (
                      <Badge variant="secondary">Installed</Badge>
                    ) : (
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => handleInstall(app)}
                        disabled={installingId === app.id}
                      >
                        {installingId === app.id ? 'Installing...' : 'Install'}
                      </Button>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
