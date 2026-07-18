import React from 'react';
import { motion } from 'framer-motion';

export default function ProfitDashboardShowcase() {
  return (
    <section className="section-dashboard-showcase">
      <div className="showcase-container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="showcase-header"
        >
          <h2>Profit Intelligence Dashboard</h2>
          <p>See your true net profit, margin percentage, and exact cost breakdowns across every country and SKU in real-time.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="showcase-visual-wrapper"
        >
          <div className="showcase-mockup">
            {/* Highly detailed mockup structure */}
            <div className="mockup-header-bar">
              <div className="dots"><span></span><span></span><span></span></div>
              <div className="url-bar">pricepilot.io/analytics</div>
            </div>
            
            <div className="mockup-content">
              {/* Top KPI Row */}
              <div className="showcase-kpis">
                <div className="showcase-kpi">
                  <div className="label">Total Revenue</div>
                  <div className="val">$1.2M</div>
                  <div className="trend positive">+14%</div>
                </div>
                <div className="showcase-kpi">
                  <div className="label">True Net Profit</div>
                  <div className="val">$215K</div>
                  <div className="trend positive">+8%</div>
                </div>
                <div className="showcase-kpi warning-kpi">
                  <div className="label">Net Margin</div>
                  <div className="val">17.9%</div>
                  <div className="trend negative">-2.1%</div>
                </div>
                <div className="showcase-kpi">
                  <div className="label">Margin Leaks</div>
                  <div className="val">$32K</div>
                  <div className="sub">Identified by AI</div>
                </div>
              </div>

              {/* Main Charts Area */}
              <div className="showcase-charts-row">
                <div className="chart-large">
                  <div className="chart-title">Profit Trend (90 Days)</div>
                  <div className="mock-line-chart">
                    {/* SVG Line Chart */}
                    <svg viewBox="0 0 400 100" preserveAspectRatio="none">
                      <path d="M0,80 C50,70 100,90 150,50 C200,10 250,60 300,40 C350,20 400,30 400,30" fill="none" stroke="#0FA392" strokeWidth="3"/>
                    </svg>
                  </div>
                </div>
                
                <div className="chart-small">
                  <div className="chart-title">Top Profit Centers</div>
                  <div className="mock-bar-list">
                    <div className="bar-item"><span className="name">US</span><div className="bar"><div className="fill" style={{width: '90%'}}></div></div></div>
                    <div className="bar-item"><span className="name">DE</span><div className="bar"><div className="fill" style={{width: '70%'}}></div></div></div>
                    <div className="bar-item"><span className="name">UK</span><div className="bar"><div className="fill" style={{width: '50%'}}></div></div></div>
                  </div>
                </div>
              </div>

              {/* Cost Breakdown Area */}
              <div className="showcase-costs-row">
                <div className="chart-title">Margin Leak Breakdown</div>
                <div className="costs-grid">
                  <div className="cost-card"><div className="name">FX Spreads</div><div className="val danger">-$12.4K</div></div>
                  <div className="cost-card"><div className="name">Return Costs</div><div className="val danger">-$8.1K</div></div>
                  <div className="cost-card"><div className="name">Shipping Spikes</div><div className="val danger">-$6.5K</div></div>
                  <div className="cost-card"><div className="name">Payment Fees</div><div className="val danger">-$5.0K</div></div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
