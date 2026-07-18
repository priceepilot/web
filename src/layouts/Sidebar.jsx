import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, TrendingUp, Sparkles, LineChart, Globe, 
  PieChart, Bell, Settings2, Lightbulb, Beaker, Store, 
  Link as LinkIcon, Users, CreditCard, Settings, Search, 
  Star, Clock, Pin, PinOff, ChevronDown, X, Anchor,
  Compass, Brain, Zap, Layers, Shield, LogOut
} from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import clsx from 'clsx';
import { Badge } from '../components/Badge';
import './Sidebar.css';

const NAVIGATION = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { 
    name: 'Profit Center', icon: TrendingUp,
    items: [
      { name: 'Overview', href: '/profit-center' },
      { name: 'Revenue', href: '/profit-center/revenue' },
      { name: 'Profit', href: '/profit-center/profit' },
      { name: 'Orders', href: '/profit-center/orders' },
      { name: 'Countries', href: '/profit-center/countries' },
      { name: 'Products', href: '/profit-center/products' },
      { name: 'Costs', href: '/profit-center/costs' },
      { name: 'Reports', href: '/profit-center/reports' }
    ]
  },
  {
    name: 'Pricy AI', icon: Brain,
    items: [
      { name: 'Pricy Chat', href: '/pricy-ai/chat' },
      { name: 'Insights', href: '/pricy-ai/insights' },
      { name: 'Forecast', href: '/pricy-ai/forecast' },
      { name: 'Pricing Advisor', href: '/pricy-ai/advisor' },
      { name: 'Market Finder', href: '/pricy-ai/markets' },
      { name: 'Risk Center', href: '/pricy-ai/risk-center' },
      { name: 'Tasks', href: '/pricy-ai/tasks' },
      { name: 'History', href: '/pricy-ai/history' }
    ]
  },
  {
    name: 'Optimization', icon: Zap,
    items: [
      { name: 'Pricing Rules', href: '/optimization/rules' },
      { name: 'Margin Protection', href: '/optimization/margin' },
      { name: 'Automation', href: '/optimization/automation' },
      { name: 'Experiments', href: '/optimization/experiments' }
    ]
  },
  { name: 'Reports', href: '/reports', icon: PieChart },
  { name: 'Stores', href: '/stores', icon: Store },
  { name: 'Integrations', href: '/integrations', icon: LinkIcon },
  { name: 'Team', href: '/team', icon: Users },
  { name: 'Billing', href: '/billing', icon: CreditCard },
  { name: 'Settings', href: '/settings', icon: Settings }
];

export function Sidebar({ isOpen, onClose, isPinned, togglePinned }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState([]); // default closed

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const toggleMenu = (name) => {
    setOpenMenus(prev => 
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
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
            <img src="/logo.png" alt="PricePilot" className="sidebar-logo-icon" style={{ width: '28px', height: '28px', borderRadius: '6px' }} />
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
          
          <nav className="sidebar-nav">
            {NAVIGATION.map((item) => {
              if (item.items) {
                const isOpen = openMenus.includes(item.name);
                return (
                  <div key={item.name} className="sidebar-group">
                    <button 
                      className={clsx("sidebar-group-btn", { "sidebar-group-btn-open": isOpen })}
                      onClick={() => toggleMenu(item.name)}
                    >
                      <item.icon size={18} className="sidebar-group-icon" />
                      <span className="sidebar-group-text">{item.name}</span>
                      <ChevronDown size={14} className="sidebar-group-chevron" />
                    </button>
                    {isOpen && (
                      <div className="sidebar-subitems">
                        {item.items.map(sub => (
                          <NavLink
                            key={sub.name}
                            to={sub.href}
                            end
                            className={({ isActive }) => clsx('sidebar-sublink', { 'sidebar-sublink-active': isActive })}
                            onClick={onClose}
                          >
                            <span className="sidebar-sublink-text">{sub.name}</span>
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              
              return (
                <div key={item.name} className="sidebar-link-wrapper">
                  <NavLink
                    to={item.href}
                    className={({ isActive }) => clsx('sidebar-link', { 'sidebar-link-active': isActive })}
                    onClick={onClose}
                  >
                    <item.icon className="sidebar-link-icon" size={18} />
                    <span className="sidebar-link-text">{item.name}</span>
                  </NavLink>
                  {!isExpanded && <div className="sidebar-tooltip">{item.name}</div>}
                </div>
              );
            })}
          </nav>



        </div>

        <div className="sidebar-footer">
          <div style={{ position: 'relative' }}>
            <button 
              className="sidebar-user-btn" 
              title="Acme Apparel" 
              onClick={(e) => { e.stopPropagation(); setIsUserMenuOpen(!isUserMenuOpen); setIsNotificationsOpen(false); }}
            >
              <div className="sidebar-avatar">A</div>
              <div className="sidebar-user-info">
                <span className="sidebar-user-name">Acme Apparel</span>
                <span className="sidebar-user-plan">Growth Plan</span>
              </div>
              <div className="sidebar-user-actions">
                <div className="sidebar-icon-btn" title="Notifications" onClick={(e) => { e.stopPropagation(); setIsNotificationsOpen(!isNotificationsOpen); setIsUserMenuOpen(false); }} style={{ position: 'relative' }}>
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
            
            {isUserMenuOpen && (
              <div style={{
                position: 'absolute',
                bottom: '100%',
                left: '0',
                right: '0',
                marginBottom: '8px',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
                zIndex: 100,
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                <button 
                  onClick={handleLogout}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    width: '100%',
                    padding: '10px 12px',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#EF4444',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <LogOut size={16} />
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
