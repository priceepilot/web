import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function PricingSection() {
  return (
    <section className="section-pricing" id="pricing">
      <div className="pricing-header">
        <h2>Transparent Pricing for Global Sellers</h2>
        <p>No hidden fees. Scale your profitability with plans designed for growth.</p>
      </div>

      <div className="pricing-grid">
        {/* Starter Plan */}
        <div className="pricing-card">
          <div className="plan-name">Starter</div>
          <div className="plan-price">$49<span>/mo</span></div>
          <p className="plan-desc">For emerging brands analyzing up to $50k/mo in cross-border GMV.</p>
          <ul className="plan-features">
            <li><Check size={16} className="text-primary" /> Multi-currency profit dashboard</li>
            <li><Check size={16} className="text-primary" /> Basic margin leak detection</li>
            <li><Check size={16} className="text-primary" /> Shopify integration</li>
          </ul>
          <button className="btn-secondary-outline full-width">Start Free Trial</button>
        </div>

        {/* Growth Plan (Highlighted) */}
        <div className="pricing-card popular">
          <div className="popular-badge">Most Popular</div>
          <div className="plan-name">Growth</div>
          <div className="plan-price">$199<span>/mo</span></div>
          <p className="plan-desc">For scaling brands analyzing up to $500k/mo in cross-border GMV.</p>
          <ul className="plan-features">
            <li><Check size={16} className="text-primary" /> Everything in Starter</li>
            <li><Check size={16} className="text-primary" /> AI Copilot & Chat</li>
            <li><Check size={16} className="text-primary" /> 90-Day AI Forecasting</li>
            <li><Check size={16} className="text-primary" /> Market expansion recommendations</li>
          </ul>
          <button className="btn-primary full-width">Start Free Trial</button>
        </div>

        {/* Pro Plan */}
        <div className="pricing-card">
          <div className="plan-name">Pro</div>
          <div className="plan-price">$499<span>/mo</span></div>
          <p className="plan-desc">For large brands analyzing up to $2M/mo in cross-border GMV.</p>
          <ul className="plan-features">
            <li><Check size={16} className="text-primary" /> Everything in Growth</li>
            <li><Check size={16} className="text-primary" /> Automated pricing optimization</li>
            <li><Check size={16} className="text-primary" /> Custom margin thresholds</li>
            <li><Check size={16} className="text-primary" /> Dedicated success manager</li>
          </ul>
          <button className="btn-secondary-outline full-width">Contact Sales</button>
        </div>
      </div>
    </section>
  );
}
