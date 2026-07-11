import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, Info, Mountain } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import './PricingPage.css';


export function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "What happens if I exceed my SKU limit?",
      a: "Your repricing rules will continue to run for the first SKUs up to your limit. We will notify you when you approach the limit so you can seamlessly upgrade to the next tier without any service interruption."
    },
    {
      q: "Can I switch from Monthly to Annual billing?",
      a: "Yes, you can upgrade to annual billing at any time from your dashboard to lock in the 20% discount. Your current monthly payment will be prorated."
    },
    {
      q: "Do you offer a free trial for the Pro plan?",
      a: "Yes, all new signups receive a 14-day free trial of the Pro plan with full API access and AI Margin Intelligence enabled by default."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="pricing-page-container">
      {/* Header */}
      <header className="pricing-header">
        <Link to="/" className="landing-logo">
          <Mountain className="landing-logo-icon" size={28} />
          PricePilot
        </Link>
        <nav className="landing-nav">
          <Link to="/#features">Features</Link>
          <Link to="/pricing">Pricing</Link>
          <a href="#">Documentation</a>
        </nav>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Link to="/login" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}>Sign In</Link>
          <Link to="/login" className="landing-btn-contact">Go to Dashboard</Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pricing-hero">
        <Reveal type="fade-up">
          <h1 className="pricing-title">Simple, transparent pricing.</h1>
          <p className="pricing-subtitle">
            Start for free, then scale as your business grows. No hidden fees or surprise charges.
          </p>
        </Reveal>
        
        <Reveal type="fade-up" delay={100}>
          <div className="billing-toggle-wrapper">
            <span className={`billing-label ${!isAnnual ? 'active' : ''}`} onClick={() => setIsAnnual(false)}>Monthly</span>
            <div className="switch-root" data-state={isAnnual ? 'checked' : 'unchecked'} onClick={() => setIsAnnual(!isAnnual)}>
              <span className="switch-thumb"></span>
            </div>
            <span className={`billing-label ${isAnnual ? 'active' : ''}`} onClick={() => setIsAnnual(true)}>
              Annually <span className="save-badge">Save 20%</span>
            </span>
          </div>
        </Reveal>
      </section>

      {/* Cards */}
      <section className="pricing-cards-container">
        {/* Starter */}
        <Reveal type="fade-up" delay={200} style={{ display: 'flex' }}>
          <div className="pricing-card">
            <h3 className="tier-name">Starter</h3>
            <div className="tier-price">
              $0<span className="tier-price-period">/mo</span>
            </div>
            <p className="tier-desc">Perfect for testing the waters and small catalogs.</p>
            <Link to="/login" className="tier-btn outline">Start for free</Link>
            
            <div className="tier-features-title">What's included</div>
            <ul className="tier-features">
              <li><Check size={16} /> Up to 1,000 SKUs</li>
              <li><Check size={16} /> 1 Storefront integration</li>
              <li><Check size={16} /> Basic repricing rules</li>
              <li><Check size={16} /> Daily sync</li>
            </ul>
          </div>
        </Reveal>

        {/* Pro */}
        <Reveal type="fade-up" delay={300} style={{ display: 'flex' }}>
          <div className="pricing-card popular">
            <div className="popular-badge">Most Popular</div>
            <h3 className="tier-name">Pro</h3>
            <div className="tier-price">
              ${isAnnual ? '63' : '79'}<span className="tier-price-period">/mo</span>
            </div>
            <p className="tier-desc">For growing ecommerce brands that need serious automation.</p>
            <Link to="/login" className="tier-btn accent">Get started</Link>
            
            <div className="tier-features-title">Everything in Starter, plus</div>
            <ul className="tier-features">
              <li><Check size={16} /> Up to 50,000 SKUs</li>
              <li><Check size={16} /> 5 Storefront integrations</li>
              <li><Check size={16} /> AI Margin Intelligence</li>
              <li><Check size={16} /> Hourly sync</li>
              <li><Check size={16} /> API access</li>
            </ul>
          </div>
        </Reveal>

        {/* Enterprise */}
        <Reveal type="fade-up" delay={400} style={{ display: 'flex' }}>
          <div className="pricing-card">
            <h3 className="tier-name">Enterprise</h3>
            <div className="tier-price">
              Custom
            </div>
            <p className="tier-desc">For large-scale operations with custom workflows.</p>
            <Link to="/contact" className="tier-btn outline">Contact Sales</Link>
            
            <div className="tier-features-title">Everything in Pro, plus</div>
            <ul className="tier-features">
              <li><Check size={16} /> Unlimited SKUs</li>
              <li><Check size={16} /> Unlimited integrations</li>
              <li><Check size={16} /> Real-time sync</li>
              <li><Check size={16} /> Dedicated account manager</li>
              <li><Check size={16} /> SOC2 / SLA guarantee</li>
            </ul>
          </div>
        </Reveal>
      </section>

      {/* Feature Comparison Table */}
      <section className="feature-table-section">
        <Reveal type="fade-up">
          <h2 className="feature-table-title">Compare Features</h2>
          <table className="pricing-table">
            <thead>
              <tr>
                <th style={{ width: '40%' }}>Feature</th>
                <th style={{ width: '20%' }}>Starter</th>
                <th style={{ width: '20%' }}>Pro</th>
                <th style={{ width: '20%' }}>Enterprise</th>
              </tr>
            </thead>
            <tbody>
              <tr><td colSpan="4" className="table-category">Core Platform</td></tr>
              <tr>
                <td>SKU Limit</td>
                <td>1,000</td>
                <td>50,000</td>
                <td>Unlimited</td>
              </tr>
              <tr>
                <td>Storefront Integrations</td>
                <td>1</td>
                <td>5</td>
                <td>Unlimited</td>
              </tr>
              <tr>
                <td>Sync Frequency</td>
                <td>Daily</td>
                <td>Hourly</td>
                <td>Real-time</td>
              </tr>
              
              <tr><td colSpan="4" className="table-category">Intelligence & Rules</td></tr>
              <tr>
                <td>Rule-based Repricing</td>
                <td><Check size={16} color="var(--lp-success)" /></td>
                <td><Check size={16} color="var(--lp-success)" /></td>
                <td><Check size={16} color="var(--lp-success)" /></td>
              </tr>
              <tr>
                <td>AI Margin Optimizer</td>
                <td><X size={16} color="rgba(255,255,255,0.2)" /></td>
                <td><Check size={16} color="var(--lp-success)" /></td>
                <td><Check size={16} color="var(--lp-success)" /></td>
              </tr>
              <tr>
                <td>Global FX Automation</td>
                <td><X size={16} color="rgba(255,255,255,0.2)" /></td>
                <td><Check size={16} color="var(--lp-success)" /></td>
                <td><Check size={16} color="var(--lp-success)" /></td>
              </tr>

              <tr><td colSpan="4" className="table-category">Support & Security</td></tr>
              <tr>
                <td>API & Webhooks</td>
                <td><X size={16} color="rgba(255,255,255,0.2)" /></td>
                <td><Check size={16} color="var(--lp-success)" /></td>
                <td><Check size={16} color="var(--lp-success)" /></td>
              </tr>
              <tr>
                <td>Support Level</td>
                <td>Community</td>
                <td>Email (24h)</td>
                <td>Dedicated Slack</td>
              </tr>
              <tr>
                <td>SOC2 Compliance Report</td>
                <td><X size={16} color="rgba(255,255,255,0.2)" /></td>
                <td><X size={16} color="rgba(255,255,255,0.2)" /></td>
                <td><Check size={16} color="var(--lp-success)" /></td>
              </tr>
            </tbody>
          </table>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <Reveal type="fade-up">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item ${openFaq === index ? 'open' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-question">
                  {faq.q}
                  <div className="faq-toggle-icon">{openFaq === index ? '−' : '+'}</div>
                </div>
                <div className="faq-answer">
                  <div className="faq-answer-inner">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="landing-footer footer-section">
        <div className="footer-content">
          <div className="footer-col">
            <div className="landing-logo" style={{ marginBottom: '16px' }}>
              <Mountain className="landing-logo-icon" size={24} /> PricePilot
            </div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>Automate global margins.<br/>Scale without complexity.</p>
          </div>
          <div className="footer-col">
            <h4>Product</h4>
            <a href="#">Features</a>
            <Link to="/pricing">Pricing</Link>
            <a href="#">Changelog</a>
          </div>
          <div className="footer-col">
            <h4>Developers</h4>
            <a href="#">Documentation</a>
            <a href="#">API Reference</a>
            <a href="#">Status</a>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Blog</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
