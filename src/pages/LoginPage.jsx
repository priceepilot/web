import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mountain, Mail } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import './LoginPage.css';

export function LoginPage() {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        // Note: For prototype, skipping profile update and email verification
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result && result.user) {
        navigate('/dashboard');
      }
    } catch (err) {
      if (err.code !== "auth/popup-closed-by-user" && err.code !== "auth/cancelled-popup-request") {
        setError(err.message || "Google login failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      
      {/* Left Side: Auth Form */}
      <div className="login-form-section">
        <Link to="/" className="login-logo">
          <Mountain size={28} /> PricePilot
        </Link>
        
        <Reveal type="fade-up" delay={100} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <div className="login-form-wrapper">
            <h1 className="login-title">{isSignup ? 'Create an account' : 'Welcome back'}</h1>
            <p className="login-subtitle">
              {isSignup 
                ? 'Start your 14-day free trial. No credit card required.' 
                : 'Log in to your PricePilot account to manage your margins.'}
            </p>
            
            <form className="login-form" onSubmit={handleLogin}>
              {error && <div style={{ color: '#ef4444', fontSize: '0.875rem', marginBottom: '8px' }}>{error}</div>}
              {isSignup && (
                <div className="input-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} required />
                </div>
              )}
              <div className="input-group">
                <label>Email Address</label>
                <input type="email" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="input-group">
                <label>Password</label>
                <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required minLength="6" />
              </div>
              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? 'Please wait...' : (isSignup ? 'Create Account' : 'Sign In')}
              </button>
            </form>

            <div className="login-divider">or continue with</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button type="button" className="social-btn" onClick={handleGoogleLogin} disabled={loading}>
                <Mail size={18} /> Continue with Google
              </button>
            </div>

            <div className="login-footer-text">
              {isSignup ? (
                <>Already have an account? <span style={{ color: '#fff', cursor: 'pointer' }} onClick={() => setIsSignup(false)}>Sign in</span></>
              ) : (
                <>Don't have an account? <span style={{ color: '#fff', cursor: 'pointer' }} onClick={() => setIsSignup(true)}>Sign up for a free trial</span></>
              )}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Right Side: Visual Panel */}
      <div className="login-visual-section">
        <div className="visual-glow"></div>
        <Reveal type="zoom-in" delay={300}>
          <div className="visual-card">
            <div className="visual-stat">+$12,450</div>
            <div className="visual-desc">
              <strong>Margin recovered this week.</strong><br/>
              PricePilot's autonomous repricing engine continuously protects your profitability across all connected global storefronts.
            </div>
          </div>
        </Reveal>
      </div>
      
    </div>
  );
}
