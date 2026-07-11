import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mountain, Mail, MessageSquare, MapPin } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import './ContactPage.css';
import './LandingPage.css'; // For header/footer reuse

export function ContactPage() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, submit form to API. For prototype, redirect to dashboard.
    navigate('/dashboard');
  };

  return (
    <div className="contact-page-container">
      {/* Reusing the Landing Page Header */}
      <header className="landing-header">
        <Link to="/" className="landing-logo">
          <Mountain size={28} />
          PricePilot
        </Link>
        <nav className="landing-nav">
          <a href="/#features">Features</a>
          <Link to="/pricing">Pricing</Link>
          <a href="#">Documentation</a>
        </nav>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Link to="/login" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}>Sign In</Link>
          <Link to="/login" className="landing-btn-contact">Go to Dashboard</Link>
        </div>
      </header>

      <div className="contact-content">
        {/* Left Side: Info */}
        <div className="contact-info-section">
          <Reveal type="fade-up">
            <h1 className="contact-title">Get in touch with our team.</h1>
            <p className="contact-subtitle">
              Whether you need a custom enterprise SLA, have a technical question about the API, or just want to say hi, we're here to help you scale your global margins.
            </p>

            <div className="contact-methods">
              <div className="method-item">
                <div className="method-icon"><MessageSquare size={24} /></div>
                <div className="method-details">
                  <h3>Chat with Sales</h3>
                  <p>Speak to our pricing experts.<br/>sales@pricepilot.com</p>
                </div>
              </div>
              <div className="method-item">
                <div className="method-icon"><Mail size={24} /></div>
                <div className="method-details">
                  <h3>Technical Support</h3>
                  <p>Get help with API integrations.<br/>support@pricepilot.com</p>
                </div>
              </div>
              <div className="method-item">
                <div className="method-icon"><MapPin size={24} /></div>
                <div className="method-details">
                  <h3>Global Headquarters</h3>
                  <p>123 Margin Avenue, Suite 400<br/>San Francisco, CA 94105</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Side: Form */}
        <div className="contact-form-section">
          <Reveal type="fade-up" delay={200} style={{ width: '100%' }}>
            <div className="contact-form-card">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input type="text" placeholder="Jane" required />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" placeholder="Doe" required />
                  </div>
                </div>

                <div className="form-group">
                  <label>Work Email</label>
                  <input type="email" placeholder="jane@company.com" required />
                </div>

                <div className="form-group">
                  <label>Company Size</label>
                  <select required>
                    <option value="" disabled selected>Select size...</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="500+">500+ employees</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>How can we help?</label>
                  <textarea placeholder="Tell us about your pricing challenges..." required></textarea>
                </div>

                <button type="submit" className="contact-submit-btn">Send Message</button>
              </form>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Reusing the Landing Page Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-col">
            <div className="landing-logo" style={{ marginBottom: '16px' }}>
              <Mountain size={24} /> PricePilot
            </div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', lineHeight: 1.5, maxWidth: '250px' }}>
              Automate global margins.<br/>Scale without complexity.
            </p>
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
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
