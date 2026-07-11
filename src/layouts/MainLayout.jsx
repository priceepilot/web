import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { Copilot } from '../components/Copilot';
import './MainLayout.css';

export function MainLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [isPinned, setIsPinned] = useState(() => {
    return localStorage.getItem('pricepilot_sidebar_pinned') === 'true';
  });

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const togglePinned = () => {
    const newState = !isPinned;
    setIsPinned(newState);
    localStorage.setItem('pricepilot_sidebar_pinned', newState.toString());
  };

  const isAICopilotPage = location.pathname === '/ai-copilot';

  return (
    <div className="layout-container">
      <Sidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        isPinned={isPinned}
        togglePinned={togglePinned}
      />
      <div className={`layout-content ${isPinned ? 'is-pinned' : 'is-unpinned'}`}>
        <TopNav onMenuClick={toggleMobileMenu} />
        <main className={`layout-main ${isAICopilotPage ? 'no-bottom-padding' : ''}`}>
          <Outlet />
        </main>
      </div>
      {!isAICopilotPage && <Copilot />}
    </div>
  );
}
