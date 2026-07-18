import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, AlertTriangle, Globe, ArrowDownRight, ArrowUpRight } from 'lucide-react';

export default function ProblemSection() {
  return (
    <section className="section-problem" id="product">
      <div className="problem-container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="problem-header"
        >
          <h2>Growing Revenue Doesn't Mean Growing Profit</h2>
          <p>Cross-border commerce is unpredictable. You see the sale price, but invisible margin leaks are quietly eating your true profitability before the money hits your bank.</p>
        </motion.div>
        
        <div className="problem-split-layout">
          {/* Left: Illustration of the problem */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="problem-illustration"
          >
            <div className="chart-comparison">
              <div className="chart-box revenue-chart">
                <div className="chart-box-header">
                  <span>Gross Revenue</span>
                  <span className="text-success flex items-center"><ArrowUpRight size={16}/> +24%</span>
                </div>
                <div style={{ height: '80px', width: '100%', position: 'relative', marginTop: '16px' }}>
                  <svg viewBox="0 0 300 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                    <defs>
                      <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.2"/>
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    <path d="M0,80 C100,70 150,20 300,10" fill="none" stroke="#10B981" strokeWidth="3"/>
                    <path d="M0,100 L0,80 C100,70 150,20 300,10 L300,100 Z" fill="url(#revGrad)"/>
                  </svg>
                </div>
              </div>
              <div className="chart-box profit-chart">
                <div className="chart-box-header">
                  <span>Net Profit</span>
                  <span className="text-danger flex items-center"><ArrowDownRight size={16}/> -12%</span>
                </div>
                <div style={{ height: '80px', width: '100%', position: 'relative', marginTop: '16px' }}>
                  <svg viewBox="0 0 300 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                    <defs>
                      <linearGradient id="profGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#EF4444" stopOpacity="0.2"/>
                        <stop offset="100%" stopColor="#EF4444" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    <path d="M0,30 C100,40 150,80 300,90" fill="none" stroke="#EF4444" strokeWidth="3"/>
                    <path d="M0,100 L0,30 C100,40 150,80 300,90 L300,100 Z" fill="url(#profGrad)"/>
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Pain Points */}
          <div className="problem-points">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="problem-card"
            >
              <div className="problem-icon"><Wallet className="text-teal" size={28}/></div>
              <div>
                <h3>"I don't know my real profit."</h3>
                <p>Stripe fees, FX spreads, and hidden bank charges mean you never actually keep what you sell for.</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="problem-card"
            >
              <div className="problem-icon"><AlertTriangle className="text-teal" size={28}/></div>
              <div>
                <h3>"Where is my money disappearing?"</h3>
                <p>Return costs, shipping spikes, and sudden currency shifts drain margins without you realizing it.</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="problem-card"
            >
              <div className="problem-icon"><Globe className="text-teal" size={28}/></div>
              <div>
                <h3>"Which country actually makes money?"</h3>
                <p>Managing multi-country pricing manually is a nightmare. Some countries are profitable, others bleed cash.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
