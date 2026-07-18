import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup,
  updateProfile 
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import './LoginPage.css';

// SVG for Google Logo
const GoogleIcon = () => (
  <svg className="google-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const NOTIFICATIONS = [
  { id: 1, label: "Projected Margin", val: "24.8%", trend: "+14%", trendColor: "#10B981", trendBg: "rgba(16, 185, 129, 0.1)", sub: null },
  { id: 2, label: "Margin Leak Detected", val: "Germany", trend: "High Risk", trendColor: "#F43F5E", trendBg: "rgba(244, 63, 94, 0.1)", sub: "Shipping costs surged 4%" },
  { id: 3, label: "Expansion Opportunity", val: "Australia", trend: "High Confidence", trendColor: "#3B82F6", trendBg: "rgba(59, 130, 246, 0.1)", sub: "Est. 17% profit margin" },
  { id: 4, label: "Competitor Alert", val: "-5% Price", trend: "Price Drop", trendColor: "#F59E0B", trendBg: "rgba(245, 158, 11, 0.1)", sub: "Key competitor lowered UK prices" },
  { id: 5, label: "FX Warning", val: "-$2.50", trend: "Action Needed", trendColor: "#F97316", trendBg: "rgba(249, 115, 22, 0.1)", sub: "GBP/USD fluctuation per order" },
];

export function LoginPage({ defaultIsLogin = true }) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(defaultIsLogin);
  const [notifIndex, setNotifIndex] = useState(0);
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  // Force light mode on login page
  useEffect(() => {
    const hadDark = document.documentElement.classList.contains('dark-theme');
    document.documentElement.classList.remove('dark-theme');
    return () => {
      // Restore dark mode when leaving this page if it was active
      const savedTheme = localStorage.getItem('pricepilot_theme');
      if (savedTheme !== 'light') {
        document.documentElement.classList.add('dark-theme');
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setNotifIndex((prev) => (prev + 1) % NOTIFICATIONS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setStatus('');
  };

  const handleAuthSuccess = () => {
    setStatus('Success! Redirecting...');
    setTimeout(() => {
      navigate('/pricing');
    }, 500);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setStatus('');
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        handleAuthSuccess();
      } else {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        if (name.trim()) {
          await updateProfile(result.user, { displayName: name.trim() });
        }
        handleAuthSuccess();
      }
    } catch (err) {
      setError(err.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setStatus('');
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      handleAuthSuccess();
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/cancelled-popup-request') {
        setError(err.message || 'Google login failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  const activeNotif = NOTIFICATIONS[notifIndex];

  return (
    <div className="auth-page">
      
      {/* LEFT PANEL - BRAND SHOWCASE */}
      <div className="auth-showcase">
        <div className="auth-showcase-content">
          <Link to="/" className="auth-logo">
            <img src="/logo.png" alt="PricePilot Logo" className="auth-logo-img" style={{ width: '32px', height: '32px', borderRadius: '8px' }} />
            PricePilot
          </Link>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Profit Intelligence<br/>for the modern era.
          </motion.h2>
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="auth-feature-list"
          >
            <li><CheckCircle2 size={20} className="auth-feature-icon" /> Instantly diagnose hidden margin leaks</li>
            <li><CheckCircle2 size={20} className="auth-feature-icon" /> Forecast profit across 40+ global currencies</li>
            <li><CheckCircle2 size={20} className="auth-feature-icon" /> Automate multi-country pricing rules</li>
          </motion.ul>
        </div>

        {/* Abstract Floating UI element to make it look premium */}
        <div className="auth-floating-card-container">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeNotif.id}
              className="auth-floating-card"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="row">
                <span className="label">{activeNotif.label}</span>
                <span 
                  className="trend" 
                  style={{ color: activeNotif.trendColor, backgroundColor: activeNotif.trendBg }}
                >
                  {activeNotif.trend}
                </span>
              </div>
              <div className="val">{activeNotif.val}</div>
              {activeNotif.sub && <div className="sub">{activeNotif.sub}</div>}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* RIGHT PANEL - AUTH FORM */}
      <div className="auth-form-container">
        <div className="auth-form-wrapper">
          
          <div className="auth-form-header">
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? 'login-header' : 'signup-header'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h1>{isLogin ? 'Welcome back' : 'Create an account'}</h1>
                <p>{isLogin ? 'Sign in to access your dashboard.' : 'Start maximizing your cross-border profits.'}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <form className="auth-form" onSubmit={handleEmailSubmit}>
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  key="name-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="form-group"
                  style={{ overflow: 'hidden' }}
                >
                  <label htmlFor="name">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                placeholder="you@company.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                placeholder="••••••••" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <div style={{ color: '#EF4444', fontSize: '0.9rem', padding: '8px', background: '#FEF2F2', borderRadius: '8px' }}>{error}</div>}
            {status && <div style={{ color: '#10B981', fontSize: '0.9rem', padding: '8px', background: '#ECFDF5', borderRadius: '8px' }}>{status}</div>}

            <button type="submit" className="btn-auth-primary" disabled={loading}>
              {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          <div className="auth-divider">
            <span>or continue with Google</span>
          </div>

          <button className="btn-oauth-google" onClick={handleGoogleLogin} disabled={loading} type="button">
            <GoogleIcon />
            {isLogin ? 'Sign in with Google' : 'Sign up with Google'}
          </button>

          <div className="auth-footer">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button onClick={toggleAuthMode}>
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </div>
          
        </div>
      </div>
      
    </div>
  );
}
