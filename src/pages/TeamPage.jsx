import React from 'react';
import { 
  Users, Shield, Key, MailPlus, Settings,
  CheckCircle2, AlertTriangle, MoreVertical, ShieldAlert
} from 'lucide-react';
import './TeamPage.css';

// --- MOCK DATA ---
const TOP_METRICS = {
  total: 8,
  admins: 2,
  pending: 1,
  twoFA: '87%'
};

const TEAM_MEMBERS = [
  {
    id: 'u-1',
    name: 'Sarah Jenkins',
    email: 'sarah@example.com',
    role: 'admin',
    initials: 'SJ',
    color: '#3B82F6',
    mfa: true,
    lastLogin: 'Today, 09:41 AM'
  },
  {
    id: 'u-2',
    name: 'Michael Chen',
    email: 'michael.c@example.com',
    role: 'manager',
    initials: 'MC',
    color: '#10B981',
    mfa: true,
    lastLogin: 'Yesterday, 14:22 PM'
  },
  {
    id: 'u-3',
    name: 'David Rossi',
    email: 'david.r@example.com',
    role: 'analyst',
    initials: 'DR',
    color: '#F59E0B',
    mfa: false,
    lastLogin: 'Today, 11:05 AM'
  },
  {
    id: 'u-4',
    name: 'Emma Watson',
    email: 'emma@example.com',
    role: 'viewer',
    initials: 'EW',
    color: '#8B5CF6',
    mfa: true,
    lastLogin: 'Oct 21, 2026'
  },
  {
    id: 'u-5',
    name: 'James Wilson',
    email: 'james.w@example.com',
    role: 'analyst',
    initials: 'JW',
    color: '#EC4899',
    mfa: true,
    lastLogin: 'Oct 19, 2026'
  }
];

const ROLES_BREAKDOWN = [
  {
    id: 'r-admin',
    name: 'Admin',
    count: 2,
    desc: 'Full access to all settings, billing, integrations, and user management.',
    iconColor: '#EF4444'
  },
  {
    id: 'r-manager',
    name: 'Manager',
    count: 1,
    desc: 'Can create and modify pricing rules, run experiments, and edit automations.',
    iconColor: '#C4B5FD'
  },
  {
    id: 'r-analyst',
    name: 'Analyst',
    count: 2,
    desc: 'Can view all data, generate reports, but cannot modify active pricing rules.',
    iconColor: '#10B981'
  },
  {
    id: 'r-viewer',
    name: 'Viewer',
    count: 3,
    desc: 'Read-only access to dashboards and high-level metrics.',
    iconColor: '#94A3B8'
  }
];

export function TeamPage() {
  return (
    <div className="team-dashboard">
      
      <header className="team-header">
        <div>
          <h1 className="team-title">Team Management</h1>
          <p className="team-subtitle">Manage users, roles, and security access controls.</p>
        </div>
        <button className="team-btn primary">
          <MailPlus size={16} /> Invite Member
        </button>
      </header>

      {/* ROW 1: TOP METRICS */}
      <div className="team-metrics-grid">
        <div className="team-card team-metric-card">
          <div className="team-metric-header">
            <span className="team-metric-title">Total Members</span>
            <div className="team-metric-icon"><Users size={16} /></div>
          </div>
          <div className="team-metric-value">{TOP_METRICS.total}</div>
          <div className="team-metric-trend team-trend-positive">Active accounts</div>
        </div>
        
        <div className="team-card team-metric-card">
          <div className="team-metric-header">
            <span className="team-metric-title">Admins</span>
            <div className="team-metric-icon" style={{ color: '#EF4444' }}><Key size={16} /></div>
          </div>
          <div className="team-metric-value">{TOP_METRICS.admins}</div>
          <div className="team-metric-trend team-trend-neutral">Full access</div>
        </div>
        
        <div className="team-card team-metric-card">
          <div className="team-metric-header">
            <span className="team-metric-title">Pending Invites</span>
            <div className="team-metric-icon" style={{ color: 'var(--color-primary)' }}><MailPlus size={16} /></div>
          </div>
          <div className="team-metric-value">{TOP_METRICS.pending}</div>
          <div className="team-metric-trend team-trend-neutral">Awaiting response</div>
        </div>

        <div className="team-card team-metric-card" style={{ borderColor: TOP_METRICS.twoFA === '100%' ? 'var(--color-border)' : 'rgba(245, 158, 11, 0.3)' }}>
          <div className="team-metric-header">
            <span className="team-metric-title">2FA Adoption</span>
            <div className="team-metric-icon" style={{ color: '#F59E0B', background: 'rgba(245,158,11,0.1)' }}><Shield size={16} /></div>
          </div>
          <div className="team-metric-value">{TOP_METRICS.twoFA}</div>
          <div className="team-metric-trend team-trend-warning">Action required</div>
        </div>
      </div>

      <div className="team-main-grid">
        
        {/* LEFT COL: USER DIRECTORY */}
        <div className="team-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border)' }}>
            <h3 className="team-card-title" style={{ margin: 0 }}>User Directory</h3>
          </div>
          
          <div className="team-table-container">
            <table className="team-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Security (2FA)</th>
                  <th>Last Login</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {TEAM_MEMBERS.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="team-user-cell">
                        <div className="team-avatar" style={{ background: user.color }}>
                          {user.initials}
                        </div>
                        <div className="team-user-info">
                          <span className="team-user-name">{user.name}</span>
                          <span className="team-user-email">{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`team-role-badge ${user.role}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <div className={`team-2fa ${user.mfa ? 'enabled' : 'disabled'}`}>
                        {user.mfa ? (
                          <><CheckCircle2 size={14} /> Enabled</>
                        ) : (
                          <><ShieldAlert size={14} /> Disabled</>
                        )}
                      </div>
                    </td>
                    <td style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
                      {user.lastLogin}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="team-btn-icon">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT COL: ROLE PERMISSIONS */}
        <div className="team-card" style={{ height: 'fit-content' }}>
          <h3 className="team-card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield size={18} color="var(--color-primary)" /> Role Permissions
          </h3>
          
          <div className="team-role-list">
            {ROLES_BREAKDOWN.map(role => (
              <div key={role.id} className="team-role-item">
                <div className="team-role-header">
                  <Key size={16} color={role.iconColor} />
                  <h4 className="team-role-name">{role.name}</h4>
                  <span className="team-role-count">{role.count}</span>
                </div>
                <p className="team-role-desc">{role.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
