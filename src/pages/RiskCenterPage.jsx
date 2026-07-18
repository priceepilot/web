import React from 'react';
import { 
  ShieldAlert, AlertTriangle, AlertOctagon, Activity, 
  MapPin, ShieldCheck, Search
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import './RiskCenterPage.css';

// --- MOCK DATA ---
const riskTrendData = [
  { name: 'Mon', incidents: 12 },
  { name: 'Tue', incidents: 19 },
  { name: 'Wed', incidents: 15 },
  { name: 'Thu', incidents: 25 },
  { name: 'Fri', incidents: 42 },
  { name: 'Sat', incidents: 38 },
  { name: 'Sun', incidents: 30 },
];

const riskBreakdownData = [
  { name: 'Fraud Attempts', value: 45, color: '#EF4444' },
  { name: 'Shipping Delays', value: 30, color: '#F59E0B' },
  { name: 'Policy Compliance', value: 15, color: '#3B82F6' },
  { name: 'Pricing Errors', value: 10, color: '#8B5CF6' },
];

const activeThreatsData = [
  { id: 'TRT-901', title: 'High-Volume Fraud Ring', desc: 'Multiple high-value orders from same IP block', region: 'Brazil', severity: 'Critical', status: 'Investigating' },
  { id: 'TRT-902', title: 'Customs Blockade', desc: 'Apparel shipments halted at border', region: 'Germany', severity: 'High', status: 'Unresolved' },
  { id: 'TRT-903', title: 'Competitor Price Scraping', desc: 'Aggressive bot traffic detected on pricing pages', region: 'Global', severity: 'Medium', status: 'Investigating' },
  { id: 'TRT-904', title: 'Supplier Delay', desc: 'Component shortage for top selling SKU', region: 'China', severity: 'High', status: 'Unresolved' },
  { id: 'TRT-905', title: 'Tax Policy Update', desc: 'New import tariffs applied to electronics', region: 'Mexico', severity: 'Medium', status: 'Resolved' },
];

export function RiskCenterPage() {
  return (
    <div className="rc-dashboard">
      
      <header className="rc-header">
        <h1 className="rc-title">Risk Center</h1>
        <p className="rc-subtitle">Monitor and mitigate supply chain disruptions, fraud attempts, and operational threats.</p>
      </header>

      {/* ROW 1: TOP METRICS */}
      <div className="rc-metrics-grid">
        <div className="rc-card rc-metric-card" style={{ borderColor: 'rgba(239, 68, 68, 0.3)' }}>
          <div className="rc-metric-header">
            <span className="rc-metric-title" style={{ color: '#EF4444' }}>Overall Risk Score</span>
            <div className="rc-metric-icon critical"><Activity size={16} /></div>
          </div>
          <div className="rc-metric-value">78/100</div>
          <div className="rc-metric-trend rc-trend-negative">Elevated Risk Detected</div>
        </div>
        
        <div className="rc-card rc-metric-card">
          <div className="rc-metric-header">
            <span className="rc-metric-title">Active Threats</span>
            <div className="rc-metric-icon"><ShieldAlert size={16} /></div>
          </div>
          <div className="rc-metric-value">12</div>
          <div className="rc-metric-trend rc-trend-negative">+4 since yesterday</div>
        </div>
        
        <div className="rc-card rc-metric-card">
          <div className="rc-metric-header">
            <span className="rc-metric-title">High-Risk Orders</span>
            <div className="rc-metric-icon"><AlertOctagon size={16} /></div>
          </div>
          <div className="rc-metric-value">142</div>
          <div className="rc-metric-trend rc-trend-neutral">Flagged for manual review</div>
        </div>
        
        <div className="rc-card rc-metric-card">
          <div className="rc-metric-header">
            <span className="rc-metric-title">Supply Chain Alerts</span>
            <div className="rc-metric-icon"><AlertTriangle size={16} /></div>
          </div>
          <div className="rc-metric-value">3</div>
          <div className="rc-metric-trend rc-trend-positive">-2 vs last week</div>
        </div>
      </div>

      {/* ROW 2: MAIN CHARTS */}
      <div className="rc-main-grid">
        
        {/* Risk Incidents Trend */}
        <div className="rc-card">
          <h3 className="rc-card-title">Risk Incidents (7 Days)</h3>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer>
              <LineChart data={riskTrendData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15,23,42,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#EF4444' }}
                />
                <Line type="monotone" dataKey="incidents" stroke="#EF4444" strokeWidth={3} dot={{ r: 4, fill: '#EF4444', strokeWidth: 2, stroke: '#1E293B' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Breakdown */}
        <div className="rc-card">
          <h3 className="rc-card-title">Active Risk Breakdown</h3>
          <div style={{ width: '100%', height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie
                  data={riskBreakdownData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {riskBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', padding: '0 12px' }}>
              {riskBreakdownData.map((entry) => (
                <div key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '500', color: 'var(--color-text-primary)' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: entry.color }}></div>
                  {entry.name} ({entry.value}%)
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* ROW 3: DATA TABLE */}
      <div className="rc-card">
        <div className="rc-card-title">
          <span>Active Threat Log</span>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
              <Search size={14} color="var(--color-text-secondary)" style={{ marginRight: '8px' }} />
              <input type="text" placeholder="Search threats..." style={{ background: 'transparent', border: 'none', color: 'var(--color-text-primary)', fontSize: '0.875rem', outline: 'none' }} />
            </div>
          </div>
        </div>
        <div className="rc-table-container">
          <table className="rc-table">
            <thead>
              <tr>
                <th>Threat ID</th>
                <th>Incident Details</th>
                <th>Region</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {activeThreatsData.map((threat) => (
                <tr key={threat.id}>
                  <td style={{ fontWeight: '600', color: 'var(--color-text-secondary)' }}>{threat.id}</td>
                  <td>
                    <div className="rc-threat-cell">
                      <span className="rc-threat-title">{threat.title}</span>
                      <span className="rc-threat-desc">{threat.desc}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={14} color="var(--color-text-secondary)" /> {threat.region}
                    </div>
                  </td>
                  <td>
                    <span className={`rc-badge rc-badge-${threat.severity.toLowerCase()}`}>
                      {threat.severity}
                    </span>
                  </td>
                  <td>
                    <span className={`rc-badge rc-badge-${threat.status.toLowerCase()}`}>
                      {threat.status}
                    </span>
                  </td>
                  <td>
                    <button className="rc-action-btn">
                      Review
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
