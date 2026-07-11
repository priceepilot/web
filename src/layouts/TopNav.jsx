import React, { useState } from 'react';
import { Menu, User, Clock, ChevronDown, Sun, Moon } from 'lucide-react';
import { Badge } from '../components/Badge';
import './TopNav.css';

export function TopNav({ onMenuClick }) {
  const [isDark, setIsDark] = useState(() => {
    return !document.documentElement.classList.contains('light-theme');
  });

  const toggleTheme = (e) => {
    const isCurrentlyDark = isDark;
    
    // Get exact center of button for the origin
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    const performThemeChange = () => {
      if (isCurrentlyDark) {
        document.documentElement.classList.add('light-theme');
        setIsDark(false);
      } else {
        document.documentElement.classList.remove('light-theme');
        setIsDark(true);
      }
    };

    // If browser doesn't support View Transitions, just toggle instantly
    if (!document.startViewTransition) {
      performThemeChange();
      return;
    }

    // Start native view transition
    const transition = document.startViewTransition(performThemeChange);

    // Wait for the pseudo-elements to be created, then animate the new view
    transition.ready.then(() => {
      const endRadius = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y)
      );

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`
          ],
        },
        {
          duration: 500,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });
  };

  return (
    <header className="topnav">
      <div className="topnav-left">
        <button className="topnav-menu-btn" onClick={onMenuClick}>
          <Menu size={24} />
        </button>
        <div className="topnav-merchant-context">
          <div className="topnav-merchant-info">
            <button className="topnav-merchant-selector">
              <span className="topnav-merchant-name">Acme Apparel</span>
              <ChevronDown size={14} className="text-secondary" />
            </button>
            <Badge variant="default" className="topnav-merchant-plan">Growth Plan</Badge>
          </div>
          <div className="topnav-merchant-sync">
            <Clock size={12} className="text-secondary" />
            <span className="text-secondary">Last Updated: 2 min ago</span>
          </div>
        </div>
      </div>
      
      <div className="topnav-right">
        <button className="topnav-icon-btn" onClick={toggleTheme} title="Toggle theme">
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <div className="topnav-divider"></div>
        <button className="topnav-user">
          <div className="topnav-avatar">
            <User size={16} />
          </div>
          <ChevronDown size={14} className="text-secondary" />
        </button>
      </div>
    </header>
  );
}
