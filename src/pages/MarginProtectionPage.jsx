import React from 'react';
import { 
  ShieldCheck, AlertOctagon, TrendingDown, DollarSign,
  ArrowRight, ShieldAlert, CheckCircle2
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import './MarginProtectionPage.css';

// --- MOCK DATA ---
const topMetrics = {
  grossMargin: '68.4%',
  netMargin: '22.1%',
  activeLeaks: 3,
  saved: '$42,500'
};

const waterfallData = [
  { name: 'Gross Revenue', value: 100, color: '#10B981' }, // Green
  { name: 'COGS', value: -31.6, color: '#EF4444' }, // Red (cost)
  { name: 'Shipping', value: -12.4, color: '#F59E0B' }, // Warning
  { name: 'Marketing', value: -18.5, color: '#8B5CF6' }, // Purple
  { name: 'Taxes/Fees', value: -15.4, color: '#64748B' }, // Gray
  { name: 'Net Margin', value: 22.1, color: '#0FA392' }  // Primary
];

const leakAlerts = [
  {
    id: 'LK-101',
    title: 'Surging Carrier Costs to Germany',
    desc: 'DHL rates increased by 14% this month, dropping net margin on German orders below 15%.',
    impact: '-$3,200/mo',
    type: 'critical'
  },
  {
    id: 'LK-102',
    title: 'High Return Rate on SKU-884',
    desc: 'Return rate spiked to 22% (Category avg: 8%). Processing fees are destroying margin.',
    impact: '-$1,850/mo',
    type: 'warning'
  },
  {
    id: 'LK-103',
    title: 'Inefficient Ad Spend (Google)',
    desc: 'ROAS dropped below 1.2 on "Winter Apparel" campaigns, leading to margin compression.',
    impact: '-$940/mo',
    type: 'warning'
  }
];

const productHealthData = [
  { id: 'P-1', name: 'Premium Wireless Earbuds', category: 'Electronics', target: '35%', actual: '36.2%', health: 'good' },
  { id: 'P-2', name: 'Ergonomic Desk Chair', category: 'Furniture', target: '40%', actual: '28.5%', health: 'critical' },
  { id: 'P-3', name: 'Minimalist Watch (Silver)', category: 'Accessories', target: '55%', actual: '48.0%', health: 'warning' },
  { id: 'P-4', name: 'Organic Cotton T-Shirt', category: 'Apparel', target: '60%', actual: '61.5%', health: 'good' },
  { id: 'P-5', name: 'Smart Home Hub', category: 'Electronics', target: '25%', actual: '24.8%', health: 'good' }
];

export function MarginProtectionPage() {
  
  // Custom Tooltip for Waterfall chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const isNegative = data.value < 0;
      return (
        <div style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px' }}>
          <p style={{ margin: '0 0 4px 0', color: 'var(--color-text-secondary)', fontSize: '0.8rem', fontWeight: 600 }}>{data.name}</p>
          <p style={{ margin: 0, color: data.color, fontWeight: 700 }}>
            {isNegative ? '-' : '+'}{Math.abs(data.value)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mp-dashboard">
      
      <header className="mp-header">
        <h1 className="mp-title">Margin Protection</h1>
        <p className="mp-subtitle">Identify margin leaks, track cost breakdowns, and secure your bottom line.</p>
      </header>

      {/* ROW 1: TOP METRICS */}
      <div className="mp-metrics-grid">
        <div className="mp-card mp-metric-card">
          <div className="mp-metric-header">
            <span className="mp-metric-title">Avg Gross Margin</span>
            <div className="mp-metric-icon"><DollarSign size={16} /></div>
          </div>
          <div className="mp-metric-value">{topMetrics.grossMargin}</div>
          <div className="mp-metric-trend mp-trend-positive">Healthy</div>
        </div>
        
        <div className="mp-card mp-metric-card">
          <div className="mp-metric-header">
            <span className="mp-metric-title">Avg Net Margin</span>
            <div className="mp-metric-icon" style={{ color: 'var(--color-primary)' }}><ShieldCheck size={16} /></div>
          </div>
          <div className="mp-metric-value">{topMetrics.netMargin}</div>
          <div className="mp-metric-trend mp-trend-neutral">Target: 25%</div>
        </div>
        
        <div className="mp-card mp-metric-card" style={{ borderColor: 'rgba(239, 68, 68, 0.3)' }}>
          <div className="mp-metric-header">
            <span className="mp-metric-title" style={{ color: '#EF4444' }}>Active Leaks</span>
            <div className="mp-metric-icon" style={{ color: '#EF4444', background: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.2)' }}><AlertOctagon size={16} /></div>
          </div>
          <div className="mp-metric-value">{topMetrics.activeLeaks}</div>
          <div className="mp-metric-trend" style={{ color: '#EF4444' }}>Action Required</div>
        </div>
        
        <div className="mp-card mp-metric-card">
          <div className="mp-metric-header">
            <span className="mp-metric-title">Projected Annual Savings</span>
            <div className="mp-metric-icon"><TrendingDown size={16} /></div>
          </div>
          <div className="mp-metric-value">{topMetrics.saved}</div>
          <div className="mp-metric-trend mp-trend-positive">From active rules</div>
        </div>
      </div>

      <div className="mp-main-grid">
        
        {/* LEFT COL: WATERFALL & TABLE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Waterfall Chart */}
          <div className="mp-card">
            <h3 className="mp-card-title">Margin Breakdown (Waterfall)</h3>
            <div style={{ width: '100%', height: '320px' }}>
              <ResponsiveContainer>
                <BarChart data={waterfallData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }} tickFormatter={(val) => `${val}%`} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                  <Bar dataKey="value" radius={[4, 4, 4, 4]}>
                    {waterfallData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Product Health Table */}
          <div className="mp-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)' }}>
              <h3 className="mp-card-title" style={{ margin: 0 }}>Top Products Margin Health</h3>
            </div>
            <div className="mp-table-container">
              <table className="mp-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Target Margin</th>
                    <th>Actual Margin</th>
                    <th>Health</th>
                  </tr>
                </thead>
                <tbody>
                  {productHealthData.map((prod) => (
                    <tr key={prod.id}>
                      <td>
                        <span className="mp-product-name">{prod.name}</span>
                      </td>
                      <td style={{ color: 'var(--color-text-secondary)' }}>{prod.category}</td>
                      <td style={{ fontWeight: 600 }}>{prod.target}</td>
                      <td style={{ fontWeight: 600 }}>{prod.actual}</td>
                      <td>
                        <span className={`mp-health ${prod.health}`}>
                          {prod.health === 'good' && <CheckCircle2 size={14} />}
                          {prod.health === 'warning' && <AlertOctagon size={14} />}
                          {prod.health === 'critical' && <ShieldAlert size={14} />}
                          {prod.health.charAt(0).toUpperCase() + prod.health.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* RIGHT COL: LEAKS */}
        <div className="mp-card" style={{ height: 'fit-content' }}>
          <h3 className="mp-card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertOctagon size={18} color="#EF4444" /> Detected Leaks
          </h3>
          
          <div className="mp-leaks-list">
            {leakAlerts.map(leak => (
              <div key={leak.id} className="mp-leak-card">
                <div className="mp-leak-header">
                  <h4 className="mp-leak-title">
                    <ShieldAlert size={16} color={leak.type === 'critical' ? '#EF4444' : '#F59E0B'} />
                    {leak.title}
                  </h4>
                </div>
                <p className="mp-leak-desc">{leak.desc}</p>
                <div className="mp-leak-footer">
                  <span className="mp-leak-impact">{leak.impact}</span>
                  <button className="mp-btn danger">
                    Fix <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
