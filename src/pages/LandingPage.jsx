import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/landing/HeroSection';
import ProblemSection from '../components/landing/ProblemSection';
import SolutionSection from '../components/landing/SolutionSection';
import ProfitDashboardShowcase from '../components/landing/ProfitDashboardShowcase';
import CountryProfitability from '../components/landing/CountryProfitability';
import AiCopilotSection from '../components/landing/AiCopilotSection';
import FeatureGrid from '../components/landing/FeatureGrid';
import TestimonialsAndFAQ from '../components/landing/TestimonialsAndFAQ';
import PricingSection from '../components/landing/PricingSection';
import './LandingPage.css';

export function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  // Mock login state for the demo
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    // Landing page is strictly light mode
    document.documentElement.classList.remove('dark-theme');

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="landing-layout">
      {/* Navigation */}
      <header className={`landing-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="landing-header-left">
          <div className="landing-logo">
            <div className="landing-logo-icon">P</div>
            PricePilot
          </div>
          <nav className="landing-nav">
            <a href="#product">Product</a>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#docs">Docs</a>
          </nav>
        </div>
        <div className="landing-header-right">
          {!isLoggedIn && (
            <Link to="/login" className="landing-btn-signin">Sign in</Link>
          )}
          <Link to={isLoggedIn ? "/dashboard" : "/signup"} className="btn-primary" style={{ textDecoration: 'none' }}>
            {isLoggedIn ? "My Account" : "Get Started"}
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <ProfitDashboardShowcase />
        <CountryProfitability />
        <AiCopilotSection />
        <FeatureGrid />
        <TestimonialsAndFAQ />
        <PricingSection />

        {/* Final CTA */}
        <section className="section-final-cta">
          <div className="final-cta-container">
            <h2>Start Optimizing Your Profit Today</h2>
            <p>Understand. Predict. Optimize.</p>
            <div className="cta-actions">
              <Link to="/signup" className="btn-primary lg" style={{ textDecoration: 'none' }}>Get Started</Link>
              <button className="btn-secondary-outline lg">Contact Sales</button>
            </div>
          </div>
        </section>
      </main>

      {/* Enterprise Footer */}
      <footer className="landing-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="landing-logo">
              <div className="landing-logo-icon">P</div>
              PricePilot
            </div>
            <p className="footer-tagline">The AI-powered profit intelligence platform for modern cross-border e-commerce brands. Stop guessing your margins.</p>
            <div className="footer-socials">
              <a href="#" className="social-link"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg></a>
              <a href="#" className="social-link"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
              <a href="#" className="social-link"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>
            </div>
          </div>
          
          <div className="footer-links-grid">
            <div className="footer-col">
              <h4>Product</h4>
              <a href="#">Profit Dashboard</a>
              <a href="#">AI Copilot</a>
              <a href="#">Margin Analytics</a>
              <a href="#">Smart Alerts</a>
              <a href="#">Pricing Engine</a>
            </div>
            <div className="footer-col">
              <h4>Solutions</h4>
              <a href="#">For Shopify Brands</a>
              <a href="#">For Amazon Sellers</a>
              <a href="#">For Omnichannel</a>
              <a href="#">For Agencies</a>
            </div>
            <div className="footer-col">
              <h4>Resources</h4>
              <a href="#">Documentation</a>
              <a href="#">API Reference</a>
              <a href="#">Blog</a>
              <a href="#">Help Center</a>
              <a href="#">System Status</a>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <a href="#">About Us</a>
              <a href="#">Careers</a>
              <a href="#">Contact</a>
              <a href="#">Partners</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <div className="copyright">© 2026 PricePilot Inc. All rights reserved.</div>
            <div className="legal-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Security</a>
            </div>
          </div>
          <div className="footer-bottom-right">
            <div className="status-indicator">
              <div className="status-dot"></div>
              All systems operational
            </div>
            <div className="badges">
              <span className="badge">SOC 2 Type II</span>
              <span className="badge">GDPR Compliant</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
