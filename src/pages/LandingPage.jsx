import React from 'react';
import { Link } from 'react-router-dom';
import { Anchor, ArrowUpRight, Shield, Zap, TrendingUp, DollarSign, Terminal, Lock, CheckCircle, Server, Search, AlertTriangle, Settings2 } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import './LandingPage.css';

export function LandingPage() {
  return (
    <div className="landing-container">
      
      {/* ================= DARK HERO SECTION ================= */}
      <section className="landing-dark-section">
        {/* Header */}
        <header className="landing-header">
          <Link to="/" className="landing-logo">
            <Anchor className="landing-logo-icon" size={24} />
            PricePilot
          </Link>
          <nav className="landing-nav">
          <a href="#features">Features</a>
          <Link to="/pricing">Pricing</Link>
          <a href="#">Documentation</a>
        </nav>
          <Link to="/contact" className="landing-btn-contact">Contact Us</Link>
        </header>

        {/* Hero */}
        <div className="landing-hero">
          <div className="hero-rings left"></div>
          <div className="hero-rings right"></div>

          <Reveal type="fade-up" delay={100}>
            <div className="hero-content">
              <h1 className="hero-title">
                One Solution For<br/>Streamlining Your Business
              </h1>
              <p className="hero-subtitle">
                Launch, automate, and scale global pricing workflows without friction or complexity.
              </p>
              <div className="hero-actions">
                <Link to="/login" className="btn-primary-teal">Get Started</Link>
                <Link to="/login" className="btn-secondary-dark">Book Demo</Link>
              </div>
            </div>
          </Reveal>

          {/* Center Glow & Mockup */}
          <div className="hero-glow-container">
            <div className="hero-glow-blob"></div>

            {/* Floating Left */}
            <div className="floating-pill left-pill">
              <ArrowUpRight size={14} color="var(--lp-success)" /> 347.25%
            </div>
            <div className="floating-card left-1">
              <div className="floating-card-label">Total Profit <Anchor size={12} /></div>
              <div className="floating-card-value">$234.98K</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--lp-success)', marginTop: '8px' }}>↑ $34.46K</div>
            </div>

            {/* Phone Mockup */}
            <div className="mockup-phone">
              <div className="mockup-ui">
                <div className="mockup-header">
                  <div className="mockup-logo">
                    <Anchor size={18} /> PricePilot
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Shield size={16} /> <Zap size={16} />
                  </div>
                </div>
                
                <div className="mockup-balance">
                  <div className="mockup-balance-label">Current Revenue Balance</div>
                  <div className="mockup-balance-amount">$36,020.00</div>
                  <div className="mockup-balance-change">+$2,454.789 (+2.5%)</div>
                </div>

                <div className="mockup-actions">
                  <div className="mockup-btn">Optimize</div>
                  <div className="mockup-btn outline">Report</div>
                </div>

                <div style={{ marginTop: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontWeight: '600', fontSize: '0.875rem' }}>
                    <span>My Portfolio</span>
                    <span style={{ color: 'var(--lp-secondary-text)' }}>See All</span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ flex: 1, padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>Amazon US</div>
                      <div style={{ fontWeight: '700' }}>$12K</div>
                    </div>
                    <div style={{ flex: 1, padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>Shopify EU</div>
                      <div style={{ fontWeight: '700' }}>€8K</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Right */}
            <div className="floating-card right-1">
              <div className="floating-card-label">Total Revenue <DollarSign size={12} /></div>
              <div className="floating-card-value">$567.34K</div>
            </div>
            <div className="floating-pill right-pill" style={{ background: 'var(--lp-card)', color: 'var(--lp-primary-text)' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--lp-highlight)', border: '2px solid #fff', marginLeft: '-5px' }}></div>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--lp-success)', border: '2px solid #fff', marginLeft: '-5px' }}></div>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--lp-warning)', border: '2px solid #fff', marginLeft: '-5px' }}></div>
                <span style={{ marginLeft: '8px' }}>❤ 12k+</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LIGHT FEATURES SECTION ================= */}
      <section id="features" className="landing-light-section">
        <div className="features-header">
          <h2 className="features-title">Powerful Features<br/>Built For Smarter Commerce</h2>
          <p className="features-subtitle">
            Everything you need to automate pricing, recover margins, and manage your global strategy—securely and efficiently—from one platform.
          </p>
        </div>

        <div className="bento-grid">
          
          {/* Card 1 */}
          <Reveal type="fade-up" delay={100}>
            <div className="bento-card">
              <div className="bento-card-header">
                <h3 className="bento-card-title">Innovative Pricing Tools</h3>
                <p className="bento-card-subtitle">Access modern tools designed to simplify dynamic margin decisions.</p>
              </div>
            <div className="bento-graphic" style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '24px' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '8px' }}>Recovered Today</div>
              <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '24px' }}>$ 287.65</div>
              
              {/* Continuous 2D Scrolling Ticker */}
              <div className="ticker-container">
                <div className="ticker-track">
                  
                  {/* Original Set */}
                  <div className="ticker-row">
                    <div className="ticker-icon blue"><Search size={14}/></div>
                    <div className="ticker-details">
                      <div>SKU-89241 <span className="ticker-dim">• Amazon US</span></div>
                      <div className="ticker-action">Competitor price dropped</div>
                    </div>
                  </div>
                  <div className="ticker-row">
                    <div className="ticker-icon red"><AlertTriangle size={14}/></div>
                    <div className="ticker-details">
                      <div>SKU-89241 <span className="ticker-dim">• Margin Alert</span></div>
                      <div className="ticker-action" style={{color: '#ef4444'}}>Margin fell to 12%</div>
                    </div>
                  </div>
                  <div className="ticker-row">
                    <div className="ticker-icon teal"><Settings2 size={14}/></div>
                    <div className="ticker-details">
                      <div>SKU-89241 <span className="ticker-dim">• Auto-Repricing</span></div>
                      <div className="ticker-action">Rule: Match + 2% margin</div>
                    </div>
                  </div>
                  <div className="ticker-row">
                    <div className="ticker-icon green"><CheckCircle size={14}/></div>
                    <div className="ticker-details">
                      <div>SKU-89241 <span className="ticker-dim">• Success</span></div>
                      <div className="ticker-action" style={{color: 'var(--lp-success)'}}>Profit protected</div>
                    </div>
                    <div className="ticker-value">+$14.50</div>
                  </div>
                  
                  <div className="ticker-row">
                    <div className="ticker-icon blue"><Search size={14}/></div>
                    <div className="ticker-details">
                      <div>SKU-44192 <span className="ticker-dim">• Shopify EU</span></div>
                      <div className="ticker-action">FX rate EUR/USD shifted</div>
                    </div>
                  </div>
                  <div className="ticker-row">
                    <div className="ticker-icon green"><CheckCircle size={14}/></div>
                    <div className="ticker-details">
                      <div>SKU-44192 <span className="ticker-dim">• Auto-Repricing</span></div>
                      <div className="ticker-action" style={{color: 'var(--lp-success)'}}>Price updated to €42.00</div>
                    </div>
                    <div className="ticker-value">+$3.20</div>
                  </div>

                  {/* Duplicated Set for Seamless Looping */}
                  <div className="ticker-row">
                    <div className="ticker-icon blue"><Search size={14}/></div>
                    <div className="ticker-details">
                      <div>SKU-89241 <span className="ticker-dim">• Amazon US</span></div>
                      <div className="ticker-action">Competitor price dropped</div>
                    </div>
                  </div>
                  <div className="ticker-row">
                    <div className="ticker-icon red"><AlertTriangle size={14}/></div>
                    <div className="ticker-details">
                      <div>SKU-89241 <span className="ticker-dim">• Margin Alert</span></div>
                      <div className="ticker-action" style={{color: '#ef4444'}}>Margin fell to 12%</div>
                    </div>
                  </div>
                  <div className="ticker-row">
                    <div className="ticker-icon teal"><Settings2 size={14}/></div>
                    <div className="ticker-details">
                      <div>SKU-89241 <span className="ticker-dim">• Auto-Repricing</span></div>
                      <div className="ticker-action">Rule: Match + 2% margin</div>
                    </div>
                  </div>
                  <div className="ticker-row">
                    <div className="ticker-icon green"><CheckCircle size={14}/></div>
                    <div className="ticker-details">
                      <div>SKU-89241 <span className="ticker-dim">• Success</span></div>
                      <div className="ticker-action" style={{color: 'var(--lp-success)'}}>Profit protected</div>
                    </div>
                    <div className="ticker-value">+$14.50</div>
                  </div>
                  
                  <div className="ticker-row">
                    <div className="ticker-icon blue"><Search size={14}/></div>
                    <div className="ticker-details">
                      <div>SKU-44192 <span className="ticker-dim">• Shopify EU</span></div>
                      <div className="ticker-action">FX rate EUR/USD shifted</div>
                    </div>
                  </div>
                  <div className="ticker-row">
                    <div className="ticker-icon green"><CheckCircle size={14}/></div>
                    <div className="ticker-details">
                      <div>SKU-44192 <span className="ticker-dim">• Auto-Repricing</span></div>
                      <div className="ticker-action" style={{color: 'var(--lp-success)'}}>Price updated to €42.00</div>
                    </div>
                    <div className="ticker-value">+$3.20</div>
                  </div>

                </div>
              </div>

            </div>
            </div>
          </Reveal>

          {/* Card 2 */}
          <Reveal type="fade-up" delay={200}>
            <div className="bento-card">
              <div className="bento-card-header">
                <h3 className="bento-card-title">Scalable Infrastructure</h3>
                <p className="bento-card-subtitle">Built to handle millions of SKUs across dozens of marketplaces without lag.</p>
              </div>
            <div className="bento-graphic" style={{ flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '32px' }}>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>Price Adjustments</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--lp-secondary-text)' }}>Updated 1 day ago</div>
                </div>
                <div style={{ border: '1px solid var(--lp-border)', borderRadius: '20px', padding: '4px 12px', fontSize: '0.75rem' }}>Monthly ▾</div>
              </div>
              
              <div className="morph-container">
                <div className="morph-element">
                  <span className="morph-inner-text">68%</span>
                </div>
                <div className="morph-label morph-label-1">Monthly Volume</div>
                <div className="morph-label morph-label-2">Win Rate</div>
                <div className="morph-label morph-label-3">Trend Line</div>
              </div>
            </div>
            </div>
          </Reveal>

          {/* Card 3 */}
          <Reveal type="fade-up" delay={300}>
            <div className="bento-card">
              <div className="bento-card-header">
                <h3 className="bento-card-title">Insights That Drive<br/>Better Decisions</h3>
                <p className="bento-card-subtitle">Clear, data-backed insights that help you make confident financial decisions globally.</p>
              </div>
              <div className="bento-graphic">
                <div className="mock-table" style={{ width: '100%' }}>
                  <div className="mock-table-row">
                    <div className="mock-table-cell blue" style={{ width: '40%' }}></div>
                    <div className="mock-table-cell" style={{ width: '20%' }}></div>
                  </div>
                  <div className="mock-table-row">
                    <div className="mock-table-cell green" style={{ width: '30%' }}></div>
                    <div className="mock-table-cell" style={{ width: '20%' }}></div>
                  </div>
                  <div className="mock-table-row">
                    <div className="mock-table-cell blue" style={{ width: '50%' }}></div>
                    <div className="mock-table-cell" style={{ width: '20%' }}></div>
                  </div>
                  <div className="mock-table-row">
                    <div className="mock-table-cell green" style={{ width: '20%' }}></div>
                    <div className="mock-table-cell" style={{ width: '20%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Card 4 */}
          <Reveal type="fade-up" delay={400}>
            <div className="bento-card">
              <div className="bento-card-header">
                <h3 className="bento-card-title">Global FX & Compliance</h3>
                <p className="bento-card-subtitle">Automate currency conversions and tax compliance across 150+ regions instantly.</p>
              </div>
              <div className="bento-graphic" style={{ flexDirection: 'column', gap: '12px' }}>
                <div className="fx-pill">
                  <div className="fx-pair">USD <span className="fx-arrow">→</span> EUR</div>
                  <div className="fx-rate green">1.0842 ↑</div>
                </div>
                <div className="fx-pill">
                  <div className="fx-pair">GBP <span className="fx-arrow">→</span> USD</div>
                  <div className="fx-rate red">1.2610 ↓</div>
                </div>
                <div className="fx-pill">
                  <div className="fx-pair">USD <span className="fx-arrow">→</span> JPY</div>
                  <div className="fx-rate green">150.24 ↑</div>
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= INTEGRATIONS (LIGHT) ================= */}
      <section className="landing-integrations">
        <Reveal type="fade-up">
          <div className="integrations-title">Seamlessly integrates with your entire stack</div>
          <div className="integrations-grid">
            <span><Anchor size={24} color="#96bf48" /> Shopify</span>
            <span><Anchor size={24} color="#ff9900" /> Amazon</span>
            <span><Anchor size={24} color="#635bff" /> Stripe</span>
            <span><Anchor size={24} color="#0052cc" /> Jira</span>
            <span><Anchor size={24} color="#333333" /> BigCommerce</span>
          </div>
        </Reveal>
      </section>

      {/* ================= DEVELOPER API (DARK) ================= */}
      <section className="landing-developer">
        <Reveal type="fade-up">
          <div className="dev-content">
          <div className="dev-text">
            <h2>Built for developers.<br/>Scaled for enterprise.</h2>
            <p>Our REST API and webhooks make it trivial to push dynamic pricing rules, fetch real-time exchange rates, and synchronize margins across your custom headless infrastructure.</p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Link to="/login" className="btn-primary-teal">View Documentation</Link>
              <Link to="/login" className="btn-secondary-dark">Get API Keys</Link>
            </div>
          </div>
          <div className="dev-code-window">
            <div className="dev-code-header">
              <div className="dev-code-dot"></div>
              <div className="dev-code-dot"></div>
              <div className="dev-code-dot"></div>
            </div>
            <div className="dev-code-body">
              <span className="code-comment">// Fetch optimal dynamic price for SKU</span><br/>
              <span className="code-keyword">const</span> price = <span className="code-keyword">await</span> <span className="code-function">pricepilot</span>.<span className="code-function">optimize</span>(&#123;<br/>
              &nbsp;&nbsp;sku: <span className="code-string">'macbook-pro-14'</span>,<br/>
              &nbsp;&nbsp;region: <span className="code-string">'EU'</span>,<br/>
              &nbsp;&nbsp;currency: <span className="code-string">'EUR'</span>,<br/>
              &nbsp;&nbsp;targetMargin: <span className="code-string">'25%'</span><br/>
              &#125;);<br/><br/>
              <span className="code-comment">// Auto-update storefront</span><br/>
              <span className="code-function">updateStorefront</span>(sku, price);
            </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ================= SECURITY & ENTERPRISE (DARK) ================= */}
      <section className="landing-security">
        <Reveal type="fade-up">
          <div className="security-container">
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '16px' }}>Enterprise-grade Security</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.125rem' }}>Your financial data is protected by bank-level encryption and compliance.</p>
          </div>
          <div className="security-badges">
            <div className="sec-badge"><Shield size={24} color="var(--lp-accent)" /> SOC 2 Type II</div>
            <div className="sec-badge"><Lock size={24} color="var(--lp-accent)" /> GDPR Compliant</div>
            <div className="sec-badge"><Server size={24} color="var(--lp-accent)" /> 99.99% Uptime</div>
          </div>
          </div>
        </Reveal>
      </section>

      {/* ================= FINAL CTA (DARK) ================= */}
      <section className="landing-final-cta">
        <div className="final-cta-glow"></div>
        <Reveal type="zoom-in">
          <div className="final-cta-content">
            <h2 className="final-cta-title">Ready to scale your global margins?</h2>
            <div className="hero-actions">
              <Link to="/login" className="btn-primary-teal" style={{ padding: '16px 36px', fontSize: '1.125rem' }}>Start Free Trial</Link>
              <Link to="/contact" className="btn-secondary-dark" style={{ padding: '16px 36px', fontSize: '1.125rem' }}>Contact Sales</Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ================= EXPANDED FOOTER (DARK) ================= */}
      <footer className="landing-expanded-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', textDecoration: 'none', fontWeight: '700', fontSize: '1.25rem' }}>
              <Anchor size={24} color="var(--lp-accent)" /> PricePilot
            </Link>
            <p>The AI operating system for cross-border e-commerce. Automate your pricing, recover lost margins, and scale globally.</p>
          </div>
          <div className="footer-col">
            <h4>Product</h4>
            <a href="#">Dynamic Pricing</a>
            <a href="#">Margin Analytics</a>
            <a href="#">AI Copilot</a>
            <a href="#">Smart Alerts</a>
          </div>
          <div className="footer-col">
            <h4>Developers</h4>
            <a href="#">Documentation</a>
            <a href="#">API Reference</a>
            <a href="#">Webhooks</a>
            <a href="#">Status</a>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Blog</a>
            <a href="#">Careers</a>
            <a href="#">Contact</a>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Security</a>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 PricePilot Inc. All rights reserved.</div>
        </div>
      </footer>

    </div>
  );
}
