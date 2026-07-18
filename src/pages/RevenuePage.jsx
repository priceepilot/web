import React from 'react';
import { 
  CreditCard, User, Briefcase, Maximize2 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, ComposedChart
} from 'recharts';
import './RevenuePage.css';

// --- MOCK DATA ---
const comparisonData = [
  { name: 'Q1 2025', val24: 200, val25: 280 },
  { name: '', val24: 220, val25: 250 },
  { name: 'Q2 2025', val24: 450, val25: 350 },
  { name: '', val24: 480, val25: 310 },
  { name: 'Q3 2025', val24: 380, val25: 450 },
  { name: '', val24: 310, val25: 450 },
  { name: 'Q4 2025', val24: 320, val25: 580 },
  { name: '', val24: 200, val25: 600 },
];

const stageData = [
  { name: 'New', value: 250, color: '#F97316' },
  { name: 'Discovery', value: 450, color: '#6366F1' },
  { name: 'Proposal', value: 550, color: '#10B981' }
];

const funnelData = [
  { name: 'New', value: 600, label: '' },
  { name: 'Discovery', value: 500, label: '80%' },
  { name: 'Proposal', value: 400, label: '75%' },
  { name: 'Negotiation', value: 300, label: '66%' },
  { name: 'Won', value: 300, label: '100%' }
];

// Custom label for Funnel bars
const renderCustomBarLabel = ({ x, y, width, value, index }) => {
  const data = funnelData[index];
  if (!data.label) return null;
  return (
    <g>
      <rect x={x + width / 2 - 20} y={y - 30} width={40} height={20} fill="white" rx={4} stroke="#E2E8F0" />
      <text x={x + width / 2} y={y - 16} fill="#0F172A" textAnchor="middle" fontSize={12} fontWeight={600}>
        {data.label}
      </text>
    </g>
  );
};

export function RevenuePage() {
  const [expandedCard, setExpandedCard] = React.useState(null);

  const renderExpandedModal = () => {
    if (!expandedCard) return null;
    
    return (
      <div className="rev-modal-overlay" onClick={() => setExpandedCard(null)}>
        <div className="rev-modal-content" onClick={e => e.stopPropagation()}>
          <button className="rev-modal-close" onClick={() => setExpandedCard(null)}>×</button>
          
          {expandedCard === 'target' && (
            <>
              <h3 className="rev-card-title" style={{ marginBottom: '40px' }}>Sales Target</h3>
              <div className="rev-gauge-container" style={{ height: '400px' }}>
                <svg width="100%" height="100%" viewBox="0 0 200 120" style={{ overflow: 'visible' }}>
                  <defs>
                    <linearGradient id="gaugeGradModal" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#F43F5E" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                  <path d="M 20 110 A 80 80 0 0 1 180 110" fill="none" stroke="var(--color-surface)" strokeWidth="18" strokeLinecap="round" />
                  <path d="M 20 110 A 80 80 0 0 1 153.8 50.8" fill="none" stroke="url(#gaugeGradModal)" strokeWidth="18" strokeLinecap="round" />
                </svg>
                <div className="rev-gauge-center" style={{ bottom: '20px' }}>
                  <div className="rev-gauge-icon"><CreditCard size={24} /></div>
                  <div className="rev-gauge-value" style={{ fontSize: '4rem' }}>73.47%</div>
                  <div className="rev-gauge-sub" style={{ fontSize: '1.2rem' }}>$38,839.19 <span>/ $50,000.00</span></div>
                </div>
              </div>
            </>
          )}

          {expandedCard === 'funnel' && (
            <>
              <h3 className="rev-card-title" style={{ marginBottom: '40px' }}>Funnel Chart</h3>
              <div className="rev-funnel-container" style={{ height: '500px' }}>
                <ResponsiveContainer>
                  <ComposedChart data={funnelData} margin={{ top: 40, right: 20, left: -20, bottom: 0 }} barSize={60}>
                    <defs>
                      <linearGradient id="funnelBgModal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.15}/>
                        <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.05}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 14, fill: 'var(--color-text-secondary)' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 14, fill: 'var(--color-text-secondary)' }} tickFormatter={(val) => `$${val}`} />
                    <Tooltip cursor={{ fill: 'transparent' }} />
                    <Area type="linear" dataKey="value" stroke="none" fill="url(#funnelBgModal)" isAnimationActive={false} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]} label={renderCustomBarLabel}>
                      {funnelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 4 ? '#10B981' : '#8B5CF6'} />
                      ))}
                    </Bar>
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="revenue-dashboard">
      {renderExpandedModal()}
      
      {/* ROW 1: TOP METRICS */}
      <div className="rev-metrics-grid">
        <div className="rev-card rev-metric-card">
          <div className="rev-metric-header">
            <span className="rev-metric-title">Revenue Won</span>
            <div className="rev-metric-icon"><CreditCard size={16} /></div>
          </div>
          <div className="rev-metric-value">$122,839.29</div>
          <div className="rev-metric-trend rev-trend-positive">+4.82% vs last month</div>
        </div>
        
        <div className="rev-card rev-metric-card">
          <div className="rev-metric-header">
            <span className="rev-metric-title">Revenue Lost</span>
            <div className="rev-metric-icon"><CreditCard size={16} /></div>
          </div>
          <div className="rev-metric-value">$17,329.29</div>
          <div className="rev-metric-trend rev-trend-negative">-0.59% vs last month</div>
        </div>
        
        <div className="rev-card rev-metric-card">
          <div className="rev-metric-header">
            <span className="rev-metric-title">Leads</span>
            <div className="rev-metric-icon"><User size={16} /></div>
          </div>
          <div className="rev-metric-value">1,029</div>
          <div className="rev-metric-trend rev-trend-positive">+4.82% vs last month</div>
        </div>
        
        <div className="rev-card rev-metric-card">
          <div className="rev-metric-header">
            <span className="rev-metric-title">Deals</span>
            <div className="rev-metric-icon"><Briefcase size={16} /></div>
          </div>
          <div className="rev-metric-value">1,299</div>
          <div className="rev-metric-trend rev-trend-positive">+4.82% vs last month</div>
        </div>
      </div>

      {/* ROW 2: 3 COLUMNS */}
      <div className="rev-middle-grid">
        
        {/* Revenue by Product */}
        <div className="rev-card">
          <h3 className="rev-card-title">Revenue by Product</h3>
          <div className="rev-product-bars">
            <div className="rev-product-bar-segment" style={{ width: '68%', background: '#8B5CF6' }}></div>
            <div className="rev-product-bar-segment" style={{ width: '24%', background: '#F97316' }}></div>
            <div className="rev-product-bar-segment" style={{ width: '8%', background: '#3B82F6' }}></div>
          </div>
          <div className="rev-product-legend">
            <div className="rev-product-item">
              <div className="rev-product-label">
                <div className="rev-product-dot" style={{ background: '#8B5CF6' }}></div>
                Electronics
              </div>
              <div className="rev-product-stats">
                $41,389.38 <span className="rev-product-percent">• 68%</span>
              </div>
            </div>
            <div className="rev-product-item">
              <div className="rev-product-label">
                <div className="rev-product-dot" style={{ background: '#F97316' }}></div>
                Home & Kitchen
              </div>
              <div className="rev-product-stats">
                $18,839.09 <span className="rev-product-percent">• 24%</span>
              </div>
            </div>
            <div className="rev-product-item">
              <div className="rev-product-label">
                <div className="rev-product-dot" style={{ background: '#3B82F6' }}></div>
                Office Products
              </div>
              <div className="rev-product-stats">
                $5,032.22 <span className="rev-product-percent">• 8%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sales Comparison */}
        <div className="rev-card">
          <h3 className="rev-card-title">
            Sales Comparison
            <div style={{ display: 'flex', gap: '12px', fontSize: '12px', fontWeight: '500' }}>
              <span style={{ color: '#F97316', display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '8px', height: '2px', background: '#F97316' }}></div> 2024</span>
              <span style={{ color: '#8B5CF6', display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '8px', height: '2px', background: '#8B5CF6' }}></div> 2025</span>
            </div>
          </h3>
          <div style={{ width: '100%', height: '200px' }}>
            <ResponsiveContainer>
              <AreaChart data={comparisonData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="color25" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="color24" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--color-text-secondary)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--color-text-secondary)' }} tickFormatter={(val) => `$${val}`} />
                <Tooltip cursor={{ stroke: 'var(--color-border)', strokeWidth: 1, strokeDasharray: '3 3' }} />
                <Area type="monotone" dataKey="val24" stroke="#F97316" strokeWidth={2} fillOpacity={1} fill="url(#color24)" />
                <Area type="monotone" dataKey="val25" stroke="#8B5CF6" strokeWidth={2} fillOpacity={1} fill="url(#color25)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales Target */}
        <div className="rev-card">
          <h3 className="rev-card-title">
            Sales Target
            <Maximize2 
              size={14} 
              className="text-secondary" 
              style={{ cursor: 'pointer' }} 
              onClick={() => setExpandedCard('target')}
            />
          </h3>
          <div className="rev-gauge-container">
            {/* Custom SVG Semi-Circle Gauge */}
            <svg width="100%" height="100%" viewBox="0 0 200 120" style={{ overflow: 'visible' }}>
              <defs>
                <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#F43F5E" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
              {/* Background Arc */}
              <path d="M 20 110 A 80 80 0 0 1 180 110" fill="none" stroke="var(--color-surface)" strokeWidth="18" strokeLinecap="round" />
              {/* Foreground Arc (approx 73.47%) */}
              <path d="M 20 110 A 80 80 0 0 1 153.8 50.8" fill="none" stroke="url(#gaugeGrad)" strokeWidth="18" strokeLinecap="round" />
            </svg>
            <div className="rev-gauge-center">
              <div className="rev-gauge-icon"><CreditCard size={14} /></div>
              <div className="rev-gauge-value">73.47%</div>
              <div className="rev-gauge-sub">$38,839.19 <span>/ $50,000.00</span></div>
            </div>
          </div>
        </div>
        
      </div>

      {/* ROW 3: 2 COLUMNS */}
      <div className="rev-bottom-grid">
        
        {/* Forecasted Revenue */}
        <div className="rev-card">
          <h3 className="rev-card-title">Forecasted Revenue by Stage</h3>
          <div style={{ width: '100%', height: '280px' }}>
            <ResponsiveContainer>
              <BarChart data={stageData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }} barSize={40}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }} tickFormatter={(val) => `$${val}`} />
                <Tooltip cursor={{ fill: 'var(--color-surface)' }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {stageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Funnel Chart */}
        <div className="rev-card">
          <h3 className="rev-card-title">
            Funnel Chart
            <Maximize2 
              size={14} 
              className="text-secondary" 
              style={{ cursor: 'pointer' }} 
              onClick={() => setExpandedCard('funnel')}
            />
          </h3>
          <div className="rev-funnel-container">
            <ResponsiveContainer>
              <ComposedChart data={funnelData} margin={{ top: 40, right: 20, left: -20, bottom: 0 }} barSize={40}>
                <defs>
                  <linearGradient id="funnelBg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.15}/>
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }} tickFormatter={(val) => `$${val}`} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                
                {/* The shaded background representing the funnel flow */}
                <Area type="linear" dataKey="value" stroke="none" fill="url(#funnelBg)" isAnimationActive={false} />
                
                <Bar dataKey="value" radius={[4, 4, 0, 0]} label={renderCustomBarLabel}>
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 4 ? '#10B981' : '#8B5CF6'} />
                  ))}
                </Bar>
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
