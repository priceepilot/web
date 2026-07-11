import React, { useState } from 'react';
import { Users, Plus, MoreVertical, Shield, Lock, ShieldCheck, Mail } from 'lucide-react';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Card, CardContent } from '../components/Card';
import { Modal } from '../components/Modal';
import './AdminPages.css';

const INITIAL_TEAM = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    email: 'sarah@acmeapparel.com',
    role: 'Admin',
    status: 'Active',
    lastActive: 'Just now'
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'm.chen@acmeapparel.com',
    role: 'Financial Analyst',
    status: 'Active',
    lastActive: '2 hours ago'
  },
  {
    id: 3,
    name: 'David Rossi',
    email: 'david@acmeapparel.com',
    role: 'Logistics Manager',
    status: 'Active',
    lastActive: '1 day ago'
  },
  {
    id: 4,
    name: 'Emma Watson',
    email: 'emma.w@acmeapparel.com',
    role: 'Viewer',
    status: 'Pending',
    lastActive: 'Invited 3 days ago'
  }
];

export function Team() {
  const [team, setTeam] = useState(INITIAL_TEAM);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Viewer');
  const [isInviting, setIsInviting] = useState(false);

  const handleInvite = () => {
    if (!inviteEmail) return;
    setIsInviting(true);
    
    setTimeout(() => {
      const newMember = {
        id: Date.now(),
        name: inviteEmail.split('@')[0],
        email: inviteEmail,
        role: inviteRole,
        status: 'Pending',
        lastActive: 'Invited just now'
      };
      setTeam([...team, newMember]);
      setIsInviting(false);
      setIsModalOpen(false);
      setInviteEmail('');
      setInviteRole('Viewer');
    }, 1000);
  };

  return (
    <div className="admin-page-layout">
      <header className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Team Management</h1>
          <p className="admin-page-subtitle">Manage users, roles, and access permissions.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}><Plus size={16} style={{ marginRight: '8px' }} /> Invite Member</Button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
        <Card style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <CardContent style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ padding: '8px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', color: '#60A5FA' }}>
                <Users size={20} />
              </div>
              <span style={{ color: 'var(--color-text-secondary)', fontSize: '14px', fontWeight: '500' }}>Team Members</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--color-text-primary)' }}>{team.length}</div>
              <span style={{ color: 'var(--color-text-secondary)', fontSize: '14px', fontWeight: '500' }}>/ 10 Seats</span>
            </div>
          </CardContent>
        </Card>
        <Card style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <CardContent style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ padding: '8px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px', color: '#F59E0B' }}>
                <Mail size={20} />
              </div>
              <span style={{ color: 'var(--color-text-secondary)', fontSize: '14px', fontWeight: '500' }}>Pending Invites</span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--color-text-primary)' }}>{team.filter(m => m.status === 'Pending').length}</div>
          </CardContent>
        </Card>
        <Card style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <CardContent style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ padding: '8px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', color: 'var(--color-success)' }}>
                <ShieldCheck size={20} />
              </div>
              <span style={{ color: 'var(--color-text-secondary)', fontSize: '14px', fontWeight: '500' }}>Security Health</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--color-text-primary)' }}>100%</div>
              <span style={{ color: 'var(--color-success)', fontSize: '14px', fontWeight: '500' }}>2FA Enabled</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Active</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {team.map(user => (
              <tr key={user.id} style={{ opacity: user.status === 'Pending' ? 0.6 : 1 }}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ 
                      width: '32px', height: '32px', borderRadius: '50%', 
                      background: 'var(--color-border)', display: 'flex', 
                      alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '600'
                    }}>
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: '500', color: '#fff' }}>{user.name}</span>
                      <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{user.email}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {user.role === 'Admin' && <Shield size={14} className="text-primary" />}
                    <span>{user.role}</span>
                  </div>
                </td>
                <td>
                  <Badge variant={user.status === 'Active' ? 'secondary' : 'warning'}>{user.status}</Badge>
                </td>
                <td>
                  <span style={{ color: 'var(--color-text-secondary)' }}>{user.lastActive}</span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button className="admin-icon-btn"><MoreVertical size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => !isInviting && setIsModalOpen(false)} title="Invite Team Member">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
              Email Address
            </label>
            <input 
              type="email" 
              placeholder="colleague@company.com"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              style={{
                width: '100%', padding: '12px 16px', boxSizing: 'border-box',
                background: 'var(--color-background)', border: '1px solid var(--color-border)',
                borderRadius: '8px', color: '#fff', outline: 'none'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
              Assign Role
            </label>
            <select 
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value)}
              style={{
                width: '100%', padding: '12px 16px', boxSizing: 'border-box',
                background: 'var(--color-background)', border: '1px solid var(--color-border)',
                borderRadius: '8px', color: '#fff', outline: 'none', appearance: 'none'
              }}
            >
              <option value="Viewer">Viewer (Read-only access)</option>
              <option value="Financial Analyst">Financial Analyst (Can run reports)</option>
              <option value="Logistics Manager">Logistics Manager (Manage 3PLs)</option>
              <option value="Admin">Admin (Full access)</option>
            </select>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)} disabled={isInviting}>Cancel</Button>
            <Button onClick={handleInvite} disabled={!inviteEmail || isInviting}>
              {isInviting ? 'Sending Invite...' : 'Send Invite'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
