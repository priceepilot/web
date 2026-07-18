import React, { useState } from 'react';
import { 
  User, Shield, Bell, Key, MonitorSmartphone, 
  MapPin, Clock, Save, Copy
} from 'lucide-react';
import './SettingsPage.css';

// --- MOCK DATA ---
const SESSIONS = [
  {
    id: 'ses-1',
    device: 'MacBook Pro - Chrome',
    location: 'San Francisco, CA, USA',
    ip: '192.168.1.105',
    time: 'Active Now',
    active: true
  },
  {
    id: 'ses-2',
    device: 'iPhone 14 Pro - Safari',
    location: 'San Francisco, CA, USA',
    ip: '10.0.0.42',
    time: 'Last seen 2 hours ago',
    active: false
  }
];

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  // Local state for toggle switches
  const [toggles, setToggles] = useState({
    twoFa: true,
    emailAlerts: true,
    slackWebhook: false,
    dailySummary: true
  });

  const handleToggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="settings-content">
            <div className="settings-card">
              <h3 className="settings-card-title">Company Profile</h3>
              <p className="settings-card-subtitle">Update your company details and logo.</p>
              
              <div className="settings-form-group">
                <div className="settings-input-row">
                  <label className="settings-label">Company Name</label>
                  <input type="text" className="settings-input" defaultValue="Acme Commerce" />
                </div>
                <div className="settings-input-row">
                  <label className="settings-label">Support Email</label>
                  <input type="email" className="settings-input" defaultValue="support@acme.com" />
                </div>
              </div>
            </div>

            <div className="settings-card">
              <h3 className="settings-card-title">Localization</h3>
              <p className="settings-card-subtitle">Set your default currency and timezone for reports.</p>
              
              <div className="settings-form-group">
                <div className="settings-input-row">
                  <label className="settings-label">Default Currency</label>
                  <select className="settings-select" defaultValue="USD">
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
                <div className="settings-input-row">
                  <label className="settings-label">Timezone</label>
                  <select className="settings-select" defaultValue="PST">
                    <option value="PST">Pacific Time (PT)</option>
                    <option value="EST">Eastern Time (ET)</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="settings-btn primary"><Save size={16} /> Save Changes</button>
            </div>
          </div>
        );
      
      case 'security':
        return (
          <div className="settings-content">
            <div className="settings-card">
              <h3 className="settings-card-title">Two-Factor Authentication (2FA)</h3>
              <p className="settings-card-subtitle">Add an extra layer of security to your account.</p>
              
              <div className="settings-toggle-row">
                <div className="settings-toggle-info">
                  <span className="settings-toggle-title">Enable 2FA</span>
                  <span className="settings-toggle-desc">Require an authenticator app code when logging in.</span>
                </div>
                <button 
                  className={`set-toggle-switch ${toggles.twoFa ? 'active' : ''}`}
                  onClick={() => handleToggle('twoFa')}
                >
                  <div className="set-toggle-knob"></div>
                </button>
              </div>
            </div>

            <div className="settings-card">
              <h3 className="settings-card-title">Change Password</h3>
              <p className="settings-card-subtitle">Update your account password.</p>
              
              <div className="settings-form-group">
                <div className="settings-input-row">
                  <label className="settings-label">Current Password</label>
                  <input type="password" className="settings-input" placeholder="••••••••" />
                </div>
                <div className="settings-input-row">
                  <label className="settings-label">New Password</label>
                  <input type="password" className="settings-input" placeholder="••••••••" />
                </div>
                <button className="settings-btn outline" style={{ width: 'fit-content' }}>Update Password</button>
              </div>
            </div>

            <div className="settings-card">
              <h3 className="settings-card-title">Active Sessions</h3>
              <p className="settings-card-subtitle">Manage devices currently logged into your account.</p>
              
              <div className="settings-session-list">
                {SESSIONS.map(session => (
                  <div key={session.id} className="settings-session-item">
                    <div className="settings-session-info">
                      <div className="settings-session-icon">
                        <MonitorSmartphone size={20} />
                      </div>
                      <div className="settings-session-meta">
                        <h4>{session.device} {session.active && <span style={{ color: '#10B981', fontSize: '0.75rem', marginLeft: '8px' }}>(This device)</span>}</h4>
                        <p><MapPin size={12} style={{ display: 'inline', marginRight: '4px' }}/>{session.location} • {session.ip}</p>
                      </div>
                    </div>
                    {!session.active && (
                      <button className="settings-btn danger">Revoke</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="settings-content">
            <div className="settings-card">
              <h3 className="settings-card-title">Alert Preferences</h3>
              <p className="settings-card-subtitle">Control how you are notified about critical events.</p>
              
              <div className="settings-form-group">
                <div className="settings-toggle-row">
                  <div className="settings-toggle-info">
                    <span className="settings-toggle-title">Critical Email Alerts</span>
                    <span className="settings-toggle-desc">Receive emails when margins drop below thresholds.</span>
                  </div>
                  <button 
                    className={`set-toggle-switch ${toggles.emailAlerts ? 'active' : ''}`}
                    onClick={() => handleToggle('emailAlerts')}
                  >
                    <div className="set-toggle-knob"></div>
                  </button>
                </div>
                
                <div className="settings-toggle-row">
                  <div className="settings-toggle-info">
                    <span className="settings-toggle-title">Slack Webhooks</span>
                    <span className="settings-toggle-desc">Push alerts directly to your Slack channel.</span>
                  </div>
                  <button 
                    className={`set-toggle-switch ${toggles.slackWebhook ? 'active' : ''}`}
                    onClick={() => handleToggle('slackWebhook')}
                  >
                    <div className="set-toggle-knob"></div>
                  </button>
                </div>

                <div className="settings-toggle-row">
                  <div className="settings-toggle-info">
                    <span className="settings-toggle-title">Daily Summary Reports</span>
                    <span className="settings-toggle-desc">A morning brief of the previous day's performance.</span>
                  </div>
                  <button 
                    className={`set-toggle-switch ${toggles.dailySummary ? 'active' : ''}`}
                    onClick={() => handleToggle('dailySummary')}
                  >
                    <div className="set-toggle-knob"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'api':
        return (
          <div className="settings-content">
            <div className="settings-card">
              <h3 className="settings-card-title">API Access Keys</h3>
              <p className="settings-card-subtitle">Generate keys to build custom integrations with our GraphQL API.</p>
              
              <div className="settings-api-key-box">
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Production Secret Key</div>
                  <div className="settings-api-key-text">pk_live_51MabcXYZ1234567890qwertyuiop</div>
                </div>
                <button className="settings-btn outline"><Copy size={14} /> Copy</button>
              </div>
              
              <div style={{ marginTop: '24px' }}>
                <button className="settings-btn primary">Generate New Key</button>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="settings-dashboard">
      
      <header className="settings-header">
        <div>
          <h1 className="settings-title">Settings</h1>
          <p className="settings-subtitle">Manage your account configuration and preferences.</p>
        </div>
      </header>

      <div className="settings-layout">
        
        {/* Sidebar Navigation */}
        <nav className="settings-nav">
          <button 
            className={`settings-nav-item ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            <User size={18} /> General
          </button>
          <button 
            className={`settings-nav-item ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <Shield size={18} /> Security
          </button>
          <button 
            className={`settings-nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <Bell size={18} /> Notifications
          </button>
          <button 
            className={`settings-nav-item ${activeTab === 'api' ? 'active' : ''}`}
            onClick={() => setActiveTab('api')}
          >
            <Key size={18} /> API Keys
          </button>
        </nav>

        {/* Main Content Area */}
        <div className="settings-content-wrapper">
          {renderTabContent()}
        </div>

      </div>
    </div>
  );
}
