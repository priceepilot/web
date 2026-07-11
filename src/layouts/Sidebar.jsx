import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, TrendingUp, Sparkles, LineChart, Globe, 
  PieChart, Bell, Settings2, Lightbulb, Beaker, Store, 
  Link as LinkIcon, Users, CreditCard, Settings, Search, 
  Star, Clock, Pin, PinOff, ChevronDown, X, Anchor,
  Compass, Brain, Zap, Layers, Shield
} from 'lucide-react';
import clsx from 'clsx';
import { Badge } from '../components/Badge';
import './Sidebar.css';

const navGroups = [
  {
    title: 'OVERVIEW',
    icon: Compass,
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { name: 'Profit Intelligence', href: '/profit', icon: TrendingUp },
      { name: 'PricePilot Intelligence', href: '/ai-copilot', icon: Sparkles },
    ]
  },
  {
    title: 'INTELLIGENCE',
    icon: Brain,
    items: [
      { name: 'Forecasting', href: '/forecasting', icon: LineChart },
      { name: 'Country Intelligence', href: '/countries', icon: Globe },
      { name: 'Margin Analysis', href: '/analytics', icon: PieChart },
      { name: 'Smart Alerts', href: '/alerts', icon: Bell },
    ]
  },
  {
    title: 'OPTIMIZATION',
    icon: Zap,
    items: [
      { name: 'Pricing Rules', href: '/optimization', icon: Settings2 },
      { name: 'Recommendations', href: '/opportunities', icon: Lightbulb },
      { name: 'Experiments', href: '/experiments', icon: Beaker },
    ]
  },
  {
    title: 'OPERATIONS',
    icon: Layers,
    items: [
      { name: 'Stores', href: '/stores', icon: Store },
      { name: 'Integrations', href: '/integrations', icon: LinkIcon },
      { name: 'Team', href: '/team', icon: Users },
    ]
  },
  {
    title: 'ADMINISTRATION',
    icon: Shield,
    items: [
      { name: 'Billing', href: '/billing', icon: CreditCard },
      { name: 'Settings', href: '/settings', icon: Settings },
    ]
  }
];

export function Sidebar({ isOpen, onClose, isPinned, togglePinned }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState([]);

  const toggleGroup = (title) => {
    setCollapsedGroups(prev => 
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  // The sidebar is logically expanded if it's pinned OR hovered
  const isExpanded = isPinned || isHovered || isOpen;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={onClose} />
      )}
      
      <div 
        className={clsx('sidebar', { 
          'sidebar-expanded': isExpanded, 
          'sidebar-pinned': isPinned,
          'sidebar-mobile-open': isOpen
        })}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Anchor className="sidebar-logo-icon" size={24} />
            <div className="sidebar-logo-text-wrapper">
              <span className="sidebar-logo-text">PricePilot</span>
              <span className="sidebar-logo-subtitle">AI Profit Intelligence</span>
            </div>
          </div>
          <div className="sidebar-header-actions">
            <button 
              className="sidebar-pin-btn hidden-mobile" 
              onClick={togglePinned}
              title={isPinned ? "Unpin Sidebar" : "Pin Sidebar"}
            >
              {isPinned ? <Pin size={14} /> : <PinOff size={14} />}
            </button>
            <button className="sidebar-close-mobile" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="sidebar-search-container">
          <button className="sidebar-search-btn" title="Search (Cmd K)">
            <Search size={16} className="sidebar-search-icon" />
            <span className="sidebar-search-text">Search</span>
            <span className="sidebar-search-shortcut">⌘ K</span>
          </button>
        </div>

        <div className="sidebar-scrollable">
          


          {navGroups.map((group, idx) => (
            <nav key={group.title} className="sidebar-nav">
              <p 
                className="sidebar-nav-heading" 
                onClick={() => toggleGroup(group.title)}
                style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  {group.icon && <group.icon size={16} className="sidebar-nav-heading-icon" />}
                  <span className="sidebar-nav-heading-text">{group.title}</span>
                </span>
                <ChevronDown size={14} className="sidebar-nav-heading-chevron" style={{ transform: collapsedGroups.includes(group.title) ? 'rotate(-90deg)' : 'none', transition: 'transform 0.2s' }} />
              </p>
              {!collapsedGroups.includes(group.title) && group.items.map((item) => (
                <div key={item.name} className="sidebar-link-wrapper">
                  <NavLink
                    to={item.href}
                    className={({ isActive }) => clsx('sidebar-link', { 'sidebar-link-active': isActive })}
                    onClick={onClose}
                  >
                    <item.icon className="sidebar-link-icon" size={16} />
                    <span className="sidebar-link-text">{item.name}</span>
                  </NavLink>
                  {!isExpanded && <div className="sidebar-tooltip">{item.name}</div>}
                </div>
              ))}
            </nav>
          ))}



        </div>

        <div className="sidebar-footer">
          <button className="sidebar-user-btn" title="Acme Apparel">
            <div className="sidebar-avatar">A</div>
            <div className="sidebar-user-info">
              <span className="sidebar-user-name">Acme Apparel</span>
              <span className="sidebar-user-plan">Growth Plan</span>
            </div>
            <div className="sidebar-user-actions">
              <div className="sidebar-icon-btn" title="Notifications" onClick={(e) => { e.stopPropagation(); setIsNotificationsOpen(!isNotificationsOpen); }} style={{ position: 'relative' }}>
                <Bell size={16} />
                <span className="sidebar-badge-dot"></span>
                
                {isNotificationsOpen && (
                  <div className="notifications-popover" style={{
                    position: 'absolute',
                    bottom: 'calc(100% + 12px)',
                    left: '0',
                    width: '320px',
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                    zIndex: 100,
                    overflow: 'hidden',
                    cursor: 'default',
                    textAlign: 'left'
                  }} onClick={e => e.stopPropagation()}>
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: 'var(--color-text-primary)' }}>Notifications</h4>
                      <span style={{ fontSize: '12px', color: 'var(--color-primary)', cursor: 'pointer' }}>Mark all as read</span>
                    </div>
                    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-border)', background: 'var(--color-background-soft)' }}>
                        <h5 style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: '600', color: 'var(--color-text-primary)' }}>Margin Alert: Germany</h5>
                        <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: '1.4' }}>Profit margins dropped by 2.4% on Amazon DE in the last 24h.</p>
                        <span style={{ fontSize: '10px', color: 'var(--color-text-secondary)', marginTop: '6px', display: 'block' }}>2 mins ago</span>
                      </div>
                      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-border)' }}>
                        <h5 style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: '600', color: 'var(--color-text-primary)' }}>Sync Completed</h5>
                        <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: '1.4' }}>Acme Apparel UK product catalog successfully synced.</p>
                        <span style={{ fontSize: '10px', color: 'var(--color-text-secondary)', marginTop: '6px', display: 'block' }}>1 hour ago</span>
                      </div>
                      <div style={{ padding: '12px 16px' }}>
                        <h5 style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: '600', color: 'var(--color-text-primary)' }}>New Copilot Suggestion</h5>
                        <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: '1.4' }}>PricePilot found a $1.2k optimization opportunity for Winter Coats.</p>
                        <span style={{ fontSize: '10px', color: 'var(--color-text-secondary)', marginTop: '6px', display: 'block' }}>3 hours ago</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <ChevronDown size={14} className="sidebar-user-chevron" />
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
