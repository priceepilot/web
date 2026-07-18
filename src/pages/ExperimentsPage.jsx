import React from 'react';
import { 
  FlaskConical, ArrowRightLeft, TrendingUp, Target, 
  Plus, CheckCircle2, ChevronRight, BarChart2
} from 'lucide-react';
import './ExperimentsPage.css';

// --- MOCK DATA ---
const TOP_METRICS = {
  activeTests: 4,
  winRate: '68%',
  projectedProfit: '+$12,450'
};

const ACTIVE_TESTS = [
  {
    id: 'exp-1',
    product: 'Premium Wireless Headphones',
    sku: 'WH-PRO-99',
    progress: 75,
    daysLeft: 4,
    variantA: {
      label: 'Control (Current)',
      price: '$199.99',
      convRate: '2.4%',
      profitPerUnit: '$45.00'
    },
    variantB: {
      label: 'Variant B (Test)',
      price: '$209.99',
      convRate: '2.3%',
      profitPerUnit: '$54.00'
    },
    winning: 'B' // 'A', 'B', or null
  },
  {
    id: 'exp-2',
    product: 'Ergonomic Desk Chair',
    sku: 'CH-ERG-01',
    progress: 30,
    daysLeft: 14,
    variantA: {
      label: 'Control (Current)',
      price: '$249.00',
      convRate: '1.8%',
      profitPerUnit: '$80.00'
    },
    variantB: {
      label: 'Variant B (Test)',
      price: '$229.00',
      convRate: '2.5%',
      profitPerUnit: '$60.00'
    },
    winning: 'B'
  }
];

const HISTORICAL_TESTS = [
  {
    id: 'hst-1',
    product: 'Mechanical Keyboard (Blue Switch)',
    date: 'Oct 10, 2026',
    duration: '21 Days',
    outcome: 'Winner: Variant B',
    impact: '+14% Net Margin'
  },
  {
    id: 'hst-2',
    product: 'USB-C Fast Charger 65W',
    date: 'Sep 28, 2026',
    duration: '14 Days',
    outcome: 'Winner: Control',
    impact: 'No Change'
  },
  {
    id: 'hst-3',
    product: 'Gaming Mouse Pad XL',
    date: 'Sep 15, 2026',
    duration: '30 Days',
    outcome: 'Winner: Variant B',
    impact: '+8% Conversion'
  }
];

export function ExperimentsPage() {
  return (
    <div className="exp-dashboard">
      
      <header className="exp-header">
        <div>
          <h1 className="exp-title">A/B Experiments</h1>
          <p className="exp-subtitle">Test price elasticity and optimize for maximum net profit.</p>
        </div>
        <button className="exp-btn primary">
          <Plus size={16} /> New Experiment
        </button>
      </header>

      {/* ROW 1: TOP METRICS */}
      <div className="exp-metrics-grid">
        <div className="exp-card exp-metric-card">
          <div className="exp-metric-header">
            <span className="exp-metric-title">Active Tests</span>
            <div className="exp-metric-icon" style={{ color: '#8B5CF6' }}><FlaskConical size={16} /></div>
          </div>
          <div className="exp-metric-value">{TOP_METRICS.activeTests}</div>
          <div className="exp-metric-trend" style={{ color: 'var(--color-text-secondary)' }}>
            Across 12 SKUs
          </div>
        </div>
        
        <div className="exp-card exp-metric-card">
          <div className="exp-metric-header">
            <span className="exp-metric-title">Overall Win Rate</span>
            <div className="exp-metric-icon" style={{ color: '#10B981' }}><Target size={16} /></div>
          </div>
          <div className="exp-metric-value">{TOP_METRICS.winRate}</div>
          <div className="exp-metric-trend exp-trend-positive">
            Historically accurate
          </div>
        </div>
        
        <div className="exp-card exp-metric-card">
          <div className="exp-metric-header">
            <span className="exp-metric-title">Projected Impact</span>
            <div className="exp-metric-icon" style={{ color: 'var(--color-primary)' }}><TrendingUp size={16} /></div>
          </div>
          <div className="exp-metric-value" style={{ color: 'var(--color-primary)' }}>{TOP_METRICS.projectedProfit}</div>
          <div className="exp-metric-trend exp-trend-positive">
            30-day run rate
          </div>
        </div>
      </div>

      {/* ROW 2: ACTIVE TESTS */}
      <h3 className="exp-card-title" style={{ margin: '8px 0 0 0' }}>Live Experiments</h3>
      <div className="exp-tests-grid">
        {ACTIVE_TESTS.map(test => (
          <div key={test.id} className="exp-test-card">
            
            <div className="exp-test-header">
              <div className="exp-test-product">
                <h4>{test.product}</h4>
                <p>SKU: {test.sku}</p>
              </div>
              <div className="exp-badge">
                <ArrowRightLeft size={12} /> A/B Testing
              </div>
            </div>

            <div className="exp-variant-container">
              {/* Variant A */}
              <div className={`exp-variant ${test.winning === 'A' ? 'winning' : ''}`}>
                <span className="exp-variant-label">
                  {test.variantA.label} {test.winning === 'A' && '(Winning)'}
                </span>
                <div className="exp-variant-price">{test.variantA.price}</div>
                
                <div className="exp-variant-stats" style={{ marginBottom: '4px' }}>
                  <span>Conversion Rate</span>
                  <span className="exp-variant-stat-val">{test.variantA.convRate}</span>
                </div>
                <div className="exp-variant-stats">
                  <span>Net Profit/Unit</span>
                  <span className="exp-variant-stat-val">{test.variantA.profitPerUnit}</span>
                </div>
              </div>

              <div className="exp-vs-circle">VS</div>

              {/* Variant B */}
              <div className={`exp-variant ${test.winning === 'B' ? 'winning' : ''}`}>
                <span className="exp-variant-label">
                  {test.variantB.label} {test.winning === 'B' && '(Winning)'}
                </span>
                <div className="exp-variant-price">{test.variantB.price}</div>
                
                <div className="exp-variant-stats" style={{ marginBottom: '4px' }}>
                  <span>Conversion Rate</span>
                  <span className="exp-variant-stat-val">{test.variantB.convRate}</span>
                </div>
                <div className="exp-variant-stats">
                  <span>Net Profit/Unit</span>
                  <span className="exp-variant-stat-val">{test.variantB.profitPerUnit}</span>
                </div>
              </div>
            </div>

            <div className="exp-progress-container">
              <div className="exp-progress-header">
                <span>Test Progress ({test.progress}%)</span>
                <span>{test.daysLeft} days remaining</span>
              </div>
              <div className="exp-progress-bg">
                <div className="exp-progress-fill" style={{ width: `${test.progress}%` }}></div>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* ROW 3: HISTORICAL TESTS */}
      <div className="exp-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border)' }}>
          <h3 className="exp-card-title" style={{ margin: 0 }}>Completed Experiments</h3>
        </div>
        
        <div className="exp-table-container">
          <table className="exp-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Date Concluded</th>
                <th>Test Duration</th>
                <th>Outcome</th>
                <th style={{ textAlign: 'right' }}>Report</th>
              </tr>
            </thead>
            <tbody>
              {HISTORICAL_TESTS.map((hst) => (
                <tr key={hst.id}>
                  <td style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{hst.product}</td>
                  <td>{hst.date}</td>
                  <td>{hst.duration}</td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span className="exp-outcome-badge">
                        <CheckCircle2 size={12} /> {hst.outcome}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: hst.impact.includes('+') ? '#10B981' : 'var(--color-text-secondary)', fontWeight: 600, marginLeft: '4px' }}>
                        {hst.impact}
                      </span>
                    </div>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button className="exp-btn outline">
                      View Data <BarChart2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
