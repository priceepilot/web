import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, TrendingUp, BrainCircuit } from 'lucide-react';

export default function HeroSection() {
  // Animation Phases: 0 (Init), 1 (Leak), 2 (AI), 3 (Fix)
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    let timeout;
    if (phase === 0) {
      timeout = setTimeout(() => setPhase(1), 5000); // 5s to Leak
    } else if (phase === 1) {
      timeout = setTimeout(() => setPhase(2), 5000); // 5s to AI
    } else if (phase === 2) {
      timeout = setTimeout(() => setPhase(3), 6000); // 6s to Fix
    } else if (phase === 3) {
      timeout = setTimeout(() => setPhase(0), 7000); // 7s to Reset loop
    }
    return () => clearTimeout(timeout);
  }, [phase]);

  // Derived state based on phases
  const getMargin = () => {
    if (phase === 1 || phase === 2) return { val: '12.3%', trend: '-2.4pp', color: 'negative', border: 'warning-card' };
    if (phase === 3) return { val: '15.5%', trend: '+0.8pp', color: 'positive', border: 'success-card' };
    return { val: '14.7%', trend: '-1.1pp', color: 'negative', border: '' };
  };

  const getProfit = () => {
    if (phase === 3) return { val: '$138K', trend: '+14.2%' };
    return { val: '$124K', trend: '+9.2%' };
  };

  const getChartPath = () => {
    if (phase === 3) {
      // Steep optimistic growth
      return "M0,80 C30,70 60,90 90,50 C120,10 150,40 180,20 C220,0 260,10 300,5";
    }
    // Normal/stagnant
    return "M0,80 C30,70 60,90 90,50 C120,10 150,60 180,40 C220,10 260,30 300,20";
  };

  const getChartFill = () => {
    if (phase === 3) return "M0,100 L0,80 C30,70 60,90 90,50 C120,10 150,40 180,20 C220,0 260,10 300,5 L300,100 Z";
    return "M0,100 L0,80 C30,70 60,90 90,50 C120,10 150,60 180,40 C220,10 260,30 300,20 L300,100 Z";
  };

  const marginData = getMargin();
  const profitData = getProfit();

  return (
    <section className="landing-hero-section">
      <div className="landing-hero">
        
        {/* Left Content */}
        <div className="hero-content">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-badge"
          >
            <span className="badge-label">Vision</span> AI-Powered Profit Intelligence for Cross-Border E-Commerce
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hero-title"
          >
            Know Your True Profit Before You Sell.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hero-subtitle"
          >
            Revenue doesn't tell the full story. PricePilot helps cross-border e-commerce businesses calculate, predict, and optimize profitability across international markets using AI.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hero-actions"
          >
            <button className="btn-primary lg">Start Free Trial</button>
            <button className="btn-secondary-outline lg">Contact Sales</button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hero-stats"
          >
            <div>
              <div className="stat-value">$2.4B+</div>
              <div className="stat-label">GMV analyzed</div>
            </div>
            <div>
              <div className="stat-value">3,800+</div>
              <div className="stat-label">Merchants</div>
            </div>
            <div>
              <div className="stat-value">47</div>
              <div className="stat-label">Markets covered</div>
            </div>
          </motion.div>
        </div>

        {/* Right Content - Floating Mockup */}
        <div className="hero-mockup-container">
          {/* Main Mockup Window */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: -5, rotateX: 2 }}
            transition={{ duration: 1, type: "spring", bounce: 0.2 }}
            className="mockup-window"
          >
            <div className="mockup-header">
              <div className="mockup-dots">
                <div className="dot dot-red"></div>
                <div className="dot dot-yellow"></div>
                <div className="dot dot-green"></div>
              </div>
              <div className="mockup-url">app.pricepilot.io/dashboard</div>
            </div>
            
            <div className="mockup-body">
              {/* Sidebar */}
              <div className="mockup-sidebar">
                <div className="mockup-logo-small">
                  <div className="logo-icon-small">P</div> PricePilot
                </div>
                <div className="mockup-nav">
                  <div className={`nav-item ${phase === 0 || phase === 1 ? 'active' : ''}`}>Dashboard</div>
                  <div className="nav-item">Profit</div>
                  <div className="nav-item">Markets</div>
                  <div className={`nav-item ${phase === 3 ? 'active' : ''}`}>Pricing</div>
                  <div className="nav-item">Forecasts</div>
                  <div className={`nav-item ${phase === 2 ? 'active' : ''}`}>Alerts</div>
                  <div className="nav-item settings">Settings</div>
                </div>
              </div>

              {/* Main Area */}
              <div className="mockup-main">
                {/* KPIs */}
                <div className="mockup-kpis">
                  <div className="kpi-card">
                    <div className="kpi-label">Revenue</div>
                    <div className="kpi-val">$847K</div>
                    <div className="kpi-change positive">+18.4%</div>
                  </div>
                  <motion.div layout className="kpi-card">
                    <div className="kpi-label">Net Profit</div>
                    <motion.div 
                      key={profitData.val}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="kpi-val"
                    >
                      {profitData.val}
                    </motion.div>
                    <div className="kpi-change positive">{profitData.trend}</div>
                  </motion.div>
                  <motion.div layout className={`kpi-card ${marginData.border}`} transition={{ duration: 0.3 }}>
                    <div className={`kpi-label ${phase === 1 || phase === 2 ? 'warning' : ''}`}>Margin</div>
                    <motion.div 
                      key={marginData.val}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="kpi-val"
                    >
                      {marginData.val}
                    </motion.div>
                    <div className={`kpi-change ${marginData.color}`}>{marginData.trend}</div>
                  </motion.div>
                  <div className="kpi-card">
                    <div className="kpi-label">Leaks Found</div>
                    <div className="kpi-val">$15.7K</div>
                    <div className="kpi-subtext">3 issues</div>
                  </div>
                </div>

                <div className="mockup-middle">
                  {/* Chart */}
                  <div className="mockup-chart-box">
                    <div className="chart-header">
                      <div className="chart-title">Profit Forecast</div>
                      <div className="chart-legend">AI Projected</div>
                    </div>
                    <div className="chart-area">
                      <svg className="forecast-chart" viewBox="0 0 300 100" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#0FA392" stopOpacity="0.2"/>
                            <stop offset="100%" stopColor="#0FA392" stopOpacity="0"/>
                          </linearGradient>
                        </defs>
                        <motion.path 
                          animate={{ d: getChartPath() }}
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                          fill="none" stroke="#0FA392" strokeWidth="2"
                        />
                        <motion.path 
                          animate={{ d: getChartFill() }}
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                          fill="url(#chartGradient)"
                        />
                      </svg>
                      <div className="y-axis">
                        <span>180</span><span>135</span><span>90</span><span>45</span><span>0</span>
                      </div>
                      <div className="x-axis">
                        <span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span>
                      </div>
                    </div>
                  </div>

                  {/* Side Panel */}
                  <div className="mockup-side-panel">
                    <div className="side-card">
                      <div className="side-card-title">Country Profitability</div>
                      <div className="bar-row"><span className="ctry">US</span><div className="bar-track"><div className="bar-fill green" style={{width: '90%'}}></div></div><span className="pct">+43.2%</span></div>
                      
                      <div className="bar-row">
                        <span className="ctry">DE</span>
                        <div className="bar-track">
                          <motion.div 
                            animate={{ 
                              width: (phase === 1 || phase === 2) ? '30%' : '65%',
                              backgroundColor: (phase === 1 || phase === 2) ? '#F59E0B' : '#10B981'
                            }}
                            transition={{ duration: 0.8 }}
                            className="bar-fill" 
                          />
                        </div>
                        <span className="pct">{(phase === 1 || phase === 2) ? '-12.4%' : '+21.7%'}</span>
                      </div>
                      
                      <div className="bar-row"><span className="ctry">UK</span><div className="bar-track"><div className="bar-fill green" style={{width: '50%'}}></div></div><span className="pct">+12.4%</span></div>
                      <div className="bar-row"><span className="ctry">AU</span><div className="bar-track"><div className="bar-fill yellow" style={{width: '40%'}}></div></div><span className="pct">-18.3%</span></div>
                    </div>
                  </div>
                </div>

                {/* AI Alerts */}
                <div className="mockup-ai-alerts">
                  <AnimatePresence>
                    {(phase === 2 || phase === 3) && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        className="ai-alert-row"
                      >
                        <motion.div 
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="ai-icon teal"
                        >
                          AI
                        </motion.div>
                        <div className="ai-text">Japan listings losing $4.1K/mo due to yen volatility. Automatically repriced to protect margin.</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </div>
          </motion.div>
          
          {/* Floating Alerts */}
          <AnimatePresence>
            {(phase === 1 || phase === 2) && (
              <motion.div 
                key="alert-margin"
                initial={{ opacity: 0, y: -20, x: 20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ type: "spring", bounce: 0.4 }}
                className="floating-card float-top-right"
              >
                <AlertTriangle size={16} className="text-warning"/>
                <div>
                  <div className="float-title">Margin Leak Detected</div>
                  <div className="float-desc">Germany return costs spiked 12%</div>
                </div>
              </motion.div>
            )}

            {phase === 3 && (
              <motion.div 
                key="alert-forecast"
                initial={{ opacity: 0, y: 20, x: -20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                transition={{ type: "spring", bounce: 0.4 }}
                className="floating-card float-bottom-left"
              >
                <TrendingUp size={16} className="text-success"/>
                <div>
                  <div className="float-title">Forecast Updated</div>
                  <div className="float-desc">Pricing rules increased profit +14%</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
        </div>

      </div>
    </section>
  );
}
