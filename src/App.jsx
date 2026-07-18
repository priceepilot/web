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
import { ExperimentsPage } from './pages/ExperimentsPage';
import { StoresPage } from './pages/StoresPage';
import { IntegrationsPage } from './pages/IntegrationsPage';
import { TeamPage } from './pages/TeamPage';
import { BillingPage } from './pages/BillingPage';
import { SettingsPage } from './pages/SettingsPage';
import { LandingPage } from './pages/LandingPage';
import { PricingPage } from './pages/PricingPage';
import { LoginPage } from './pages/LoginPage';
import { ContactPage } from './pages/ContactPage';

import { RevenuePage } from './pages/RevenuePage';
import { ProfitPage } from './pages/ProfitPage';
import { OrdersPage } from './pages/OrdersPage';
import { ProductsPage } from './pages/ProductsPage';
import { CostsPage } from './pages/CostsPage';
import { ReportsPage } from './pages/ReportsPage';
import { MarketFinderPage } from './pages/MarketFinderPage';
import { RiskCenterPage } from './pages/RiskCenterPage';
import { TaskPage } from './pages/TaskPage';
import { HistoryPage } from './pages/HistoryPage';
import { MarginProtectionPage } from './pages/MarginProtectionPage';
import { AutomationPage } from './pages/AutomationPage';
import { MainReportsPage } from './pages/MainReportsPage';
import { ScrollToTop } from './components/ScrollToTop';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/login" element={<LoginPage defaultIsLogin={true} />} />
        <Route path="/signup" element={<LoginPage defaultIsLogin={false} />} />
        <Route path="/contact" element={<ContactPage />} />
        
        <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<Dashboard />} />
          
          {/* Profit Center Routes */}
          <Route path="profit-center" element={<ProfitIntelligence />} />
          <Route path="profit-center/revenue" element={<RevenuePage />} />
          <Route path="profit-center/profit" element={<ProfitPage />} />
          <Route path="profit-center/orders" element={<OrdersPage />} />
          <Route path="profit-center/countries" element={<CountryIntelligence />} />
          <Route path="profit-center/products" element={<ProductsPage />} />
          <Route path="profit-center/costs" element={<CostsPage />} />
          <Route path="profit-center/reports" element={<ReportsPage />} />
          
          {/* Pricy AI Routes */}
          <Route path="pricy-ai/chat" element={<AICopilot />} />
          <Route path="pricy-ai/insights" element={<MarginAnalysis />} />
          <Route path="pricy-ai/forecast" element={<Forecasting />} />
          <Route path="pricy-ai/advisor" element={<Recommendations />} />
          <Route path="pricy-ai/markets" element={<MarketFinderPage />} />
          <Route path="pricy-ai/risk-center" element={<RiskCenterPage />} />
          <Route path="pricy-ai/tasks" element={<TaskPage />} />
          <Route path="pricy-ai/history" element={<HistoryPage />} />

          {/* Optimization Routes */}
          <Route path="optimization/rules" element={<PricingRules />} />
          <Route path="optimization/automation" element={<AutomationPage />} />
          <Route path="optimization/margin" element={<MarginProtectionPage />} />
          <Route path="optimization/recommendations" element={<Recommendations />} />
          <Route path="optimization/experiments" element={<ExperimentsPage />} />

          {/* Standalone Routes */}
          <Route path="reports" element={<MainReportsPage />} />
          <Route path="stores" element={<StoresPage />} />
          <Route path="integrations" element={<IntegrationsPage />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="billing" element={<BillingPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
