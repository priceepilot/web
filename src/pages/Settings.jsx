import React, { useState } from 'react';
import { User, Bell, Lock, Key, Save } from 'lucide-react';
import { Button } from '../components/Button';
import './AdminPages.css';
import './Settings.css';

export function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  
  const [notifications, setNotifications] = useState({
    smartAlerts: true,
    weeklyDigest: true,
    copilotSuggestions: false
  });

  const [sessions, setSessions] = useState([
    { id: 1, device: 'MacBook Pro (Chrome)', location: 'New York, USA', time: 'Active now', isCurrent: true },
    { id: 2, device: 'iPhone 14 (Safari)', location: 'New York, USA', time: 'Last active 2 hours ago', isCurrent: false }
  ]);

  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: 'Production Dashboard', token: 'sk_prod_...8f92', date: 'Created Oct 12, 2024', lastUsed: 'Last used: 2 hours ago' },
    { id: 2, name: 'Development Environment', token: 'sk_test_...3a4b', date: 'Created Nov 05, 2024', lastUsed: 'Last used: 5 mins ago' }
  ]);
  
  const handleToggle = (key) => setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  const handleRevokeSession = (id) => setSessions(prev => prev.filter(s => s.id !== id));
  const handleRevokeApiKey = (id) => setApiKeys(prev => prev.filter(k => k.id !== id));
  const handleGenerateApiKey = () => {
    setApiKeys([{
      id: Date.now(),
      name: 'New App Integration',
      token: `sk_live_...${Math.random().toString(36).substring(2, 6)}`,
      date: 'Created just now',
      lastUsed: 'Never used'
    }, ...apiKeys]);
  };

  return (
    <div className="admin-page-layout">
      <header className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Settings</h1>
          <p className="admin-page-subtitle">Manage your account preferences and configurations.</p>
        </div>
      </header>

      <div className="settings-layout">
        {/* Sidebar Nav */}
        <aside className="settings-sidebar">
          <nav className="settings-nav">
            <button 
              className={`settings-nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <User size={16} /> Profile
            </button>
            <button 
              className={`settings-nav-btn ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              <Bell size={16} /> Notifications
            </button>
            <button 
              className={`settings-nav-btn ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <Lock size={16} /> Security
            </button>
            <button 
              className={`settings-nav-btn ${activeTab === 'api' ? 'active' : ''}`}
              onClick={() => setActiveTab('api')}
            >
              <Key size={16} /> API Keys
            </button>
          </nav>
        </aside>

        {/* Content Area */}
        <div className="settings-content">
          <div className="settings-panel">
            <div className="settings-panel-header">
              <h2 className="settings-panel-title">
                {activeTab === 'profile' && 'Profile Information'}
                {activeTab === 'notifications' && 'Notification Preferences'}
                {activeTab === 'security' && 'Security & Password'}
                {activeTab === 'api' && 'API Access Keys'}
              </h2>
              <p className="settings-panel-subtitle">
                {activeTab === 'profile' && 'Update your details and how we contact you.'}
                {activeTab === 'notifications' && 'Choose what updates you want to receive.'}
                {activeTab === 'security' && 'Manage your password and account security.'}
                {activeTab === 'api' && 'Manage keys for programmatic access to your account.'}
              </p>
            </div>

            <div className="settings-form">
              {activeTab === 'profile' && (
                <>
                  <div className="settings-form-row" style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid var(--color-border)' }}>
                    <div style={{ position: 'relative' }}>
                      <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: '600', color: '#fff' }}>
                        SJ
                      </div>
                      <button style={{ position: 'absolute', bottom: 0, right: 0, background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--color-text-primary)' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                      </button>
                    </div>
                    <div>
                      <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '600', color: 'var(--color-text-primary)' }}>Profile Picture</h3>
                      <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-text-secondary)' }}>JPG, GIF or PNG. Max size of 800K</p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div className="settings-form-row">
                      <label className="settings-label">Full Name</label>
                      <input type="text" className="settings-input" defaultValue="Sarah Jenkins" />
                    </div>
                    <div className="settings-form-row">
                      <label className="settings-label">Job Title / Role</label>
                      <input type="text" className="settings-input" defaultValue="Head of Operations" />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div className="settings-form-row">
                      <label className="settings-label">Email Address</label>
                      <input type="email" className="settings-input" defaultValue="sarah@acmeapparel.com" />
                    </div>
                    <div className="settings-form-row">
                      <label className="settings-label">Phone Number</label>
                      <input type="tel" className="settings-input" defaultValue="+1 (555) 123-4567" />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div className="settings-form-row">
                      <label className="settings-label">Language</label>
                      <select className="settings-select">
                        <option>English (US)</option>
                        <option>English (UK)</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>
                    <div className="settings-form-row">
                      <label className="settings-label">Timezone</label>
                      <select className="settings-select">
                        <option>Eastern Time (ET)</option>
                        <option>Pacific Time (PT)</option>
                        <option>Central European Time (CET)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid var(--color-border)' }}>
                    <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600', color: 'var(--color-danger)' }}>Danger Zone</h3>
                    <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: 'var(--color-text-secondary)' }}>Irreversible actions that affect your account data.</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.05)' }}>
                      <div>
                        <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600', color: 'var(--color-text-primary)' }}>Delete Account</h4>
                        <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-text-secondary)' }}>Permanently remove your Personal Account and all of its contents.</p>
                      </div>
                      <button style={{ background: 'var(--color-danger)', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>Delete Account</button>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'notifications' && (
                <>
                  <div className="settings-form-row toggle-row" onClick={() => handleToggle('smartAlerts')} style={{ cursor: 'pointer' }}>
                    <div>
                      <label className="settings-label" style={{ cursor: 'pointer' }}>Smart Alerts (Email)</label>
                      <p className="settings-help">Receive critical margin anomaly alerts via email.</p>
                    </div>
                    <div className={`settings-toggle ${notifications.smartAlerts ? 'active' : ''}`}><div className="settings-toggle-knob"></div></div>
                  </div>
                  <div className="settings-form-row toggle-row" onClick={() => handleToggle('weeklyDigest')} style={{ cursor: 'pointer' }}>
                    <div>
                      <label className="settings-label" style={{ cursor: 'pointer' }}>Weekly Profit Digest</label>
                      <p className="settings-help">A weekly summary of your global profit performance.</p>
                    </div>
                    <div className={`settings-toggle ${notifications.weeklyDigest ? 'active' : ''}`}><div className="settings-toggle-knob"></div></div>
                  </div>
                  <div className="settings-form-row toggle-row" onClick={() => handleToggle('copilotSuggestions')} style={{ cursor: 'pointer' }}>
                    <div>
                      <label className="settings-label" style={{ cursor: 'pointer' }}>Copilot Suggestions</label>
                      <p className="settings-help">New AI-discovered optimization opportunities.</p>
                    </div>
                    <div className={`settings-toggle ${notifications.copilotSuggestions ? 'active' : ''}`}><div className="settings-toggle-knob"></div></div>
                  </div>
                </>
              )}

              {activeTab === 'security' && (
                <>
                  <div style={{ marginBottom: '32px' }}>
                    <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: 'var(--color-text-primary)' }}>Change Password</h3>
                    <div className="settings-form-row">
                      <label className="settings-label">Current Password</label>
                      <input type="password" className="settings-input" placeholder="Enter current password" />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '16px' }}>
                      <div className="settings-form-row">
                        <label className="settings-label">New Password</label>
                        <input type="password" className="settings-input" placeholder="Minimum 8 characters" />
                      </div>
                      <div className="settings-form-row">
                        <label className="settings-label">Confirm New Password</label>
                        <input type="password" className="settings-input" placeholder="Must match new password" />
                      </div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '32px', paddingTop: '32px', borderTop: '1px solid var(--color-border)' }}>
                    <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600', color: 'var(--color-text-primary)' }}>Two-Factor Authentication (2FA)</h3>
                    <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: 'var(--color-text-secondary)' }}>Add an extra layer of security to your account.</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', border: '1px solid var(--color-border)', borderRadius: '8px', background: 'var(--color-surface)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ padding: '8px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', color: 'var(--color-success)' }}>
                          <Lock size={20} />
                        </div>
                        <div>
                          <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600', color: 'var(--color-text-primary)' }}>Authenticator App</h4>
                          <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-text-secondary)' }}>Configured to use Google Authenticator.</p>
                        </div>
                      </div>
                      <button style={{ background: 'transparent', color: 'var(--color-danger)', border: '1px solid var(--color-danger)', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>Disable</button>
                    </div>
                  </div>

                  <div style={{ paddingTop: '32px', borderTop: '1px solid var(--color-border)' }}>
                    <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600', color: 'var(--color-text-primary)' }}>Active Sessions</h3>
                    <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: 'var(--color-text-secondary)' }}>Manage the devices that are currently logged into your account.</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {sessions.length === 0 && (
                        <div style={{ padding: '24px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>No active sessions found.</div>
                      )}
                      {sessions.map(session => (
                        <div key={session.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', border: '1px solid var(--color-border)', borderRadius: '8px', background: 'var(--color-surface)' }}>
                          <div>
                            <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600', color: 'var(--color-text-primary)' }}>{session.device}</h4>
                            <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-text-secondary)' }}>{session.location} • {session.time}</p>
                          </div>
                          {session.isCurrent ? (
                            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--color-success)' }}>Current Device</span>
                          ) : (
                            <button onClick={() => handleRevokeSession(session.id)} style={{ background: 'var(--color-background-soft)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>Revoke</button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
              {activeTab === 'api' && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-text-secondary)' }}>Use these keys to authenticate API requests.</p>
                    <Button onClick={handleGenerateApiKey}><Key size={14} style={{ marginRight: '8px' }} /> Generate New Key</Button>
                  </div>
                  
                  <div className="admin-list-container">
                    {apiKeys.length === 0 && (
                      <div style={{ padding: '48px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                        <Key size={32} style={{ opacity: 0.5, marginBottom: '16px' }} />
                        <p>No API keys found.</p>
                      </div>
                    )}
                    {apiKeys.map(key => (
                      <div key={key.id} className="admin-list-item" style={{ padding: '16px 20px' }}>
                        <div className="admin-list-item-main">
                          <div>
                            <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600', color: 'var(--color-text-primary)' }}>{key.name}</h4>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <code style={{ background: 'var(--color-background)', padding: '2px 6px', borderRadius: '4px', fontSize: '12px', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}>{key.token}</code>
                              <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{key.date}</span>
                            </div>
                          </div>
                        </div>
                        <div className="admin-list-item-side">
                          <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{key.lastUsed}</span>
                          <button onClick={() => handleRevokeApiKey(key.id)} style={{ background: 'transparent', color: 'var(--color-danger)', border: 'none', fontSize: '13px', fontWeight: '500', cursor: 'pointer', padding: '4px 8px' }}>Revoke</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '8px', display: 'flex', gap: '12px' }}>
                    <div style={{ color: '#60A5FA', marginTop: '2px' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></div>
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600', color: 'var(--color-text-primary)' }}>API Documentation</h4>
                      <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-text-secondary)' }}>Learn how to authenticate requests and integrate with our API in the <a href="#" style={{ color: '#60A5FA', textDecoration: 'none' }}>Developer Portal</a>.</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="settings-panel-footer">
              <Button><Save size={16} style={{ marginRight: '8px' }} /> Save Changes</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
