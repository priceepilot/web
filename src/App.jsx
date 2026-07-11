import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { ProfitIntelligence } from './pages/ProfitIntelligence';
import { AICopilot } from './pages/AICopilot';
import { Forecasting } from './pages/Forecasting';
import { CountryIntelligence } from './pages/CountryIntelligence';
import { MarginAnalysis } from './pages/MarginAnalysis';
import { SmartAlerts } from './pages/SmartAlerts';
import { PricingRules } from './pages/PricingRules';
import { Recommendations } from './pages/Recommendations';
import { Experiments } from './pages/Experiments';
import { Stores } from './pages/Stores';
import { Integrations } from './pages/Integrations';
import { Team } from './pages/Team';
import { Billing } from './pages/Billing';
import { Settings } from './pages/Settings';
import { LandingPage } from './pages/LandingPage';
import { PricingPage } from './pages/PricingPage';
import { LoginPage } from './pages/LoginPage';
import { ContactPage } from './pages/ContactPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        <Route element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profit" element={<ProfitIntelligence />} />
          <Route path="countries" element={<CountryIntelligence />} />
          <Route path="analytics" element={<MarginAnalysis />} />
          <Route path="ai-copilot" element={<AICopilot />} />
          <Route path="forecasting" element={<Forecasting />} />
          <Route path="opportunities" element={<Recommendations />} />
          <Route path="experiments" element={<Experiments />} />
          <Route path="optimization" element={<PricingRules />} />
          <Route path="alerts" element={<SmartAlerts />} />
          <Route path="stores" element={<Stores />} />
          <Route path="integrations" element={<Integrations />} />
          <Route path="team" element={<Team />} />
          <Route path="billing" element={<Billing />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
