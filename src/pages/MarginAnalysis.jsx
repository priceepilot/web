import React, { useState } from 'react';
import { 
  PieChart, TrendingDown, DollarSign, Activity, AlertTriangle, 
  ArrowRight, ShieldCheck, Download, Filter, Target, Zap
} from 'lucide-react';
import { Card, CardContent } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Legend, ReferenceLine 
} from 'recharts';
import './MarginAnalysis.css';

const YEARLY_DATA = [
  { label: 'Jul', revenue: 85, cogs: 35, shipping: 12, ads: 10, net: 28 },
  { label: 'Aug', revenue: 90, cogs: 36, shipping: 14, ads: 11, net: 29 },
  { label: 'Sep', revenue: 95, cogs: 38, shipping: 13, ads: 12, net: 32 },
  { label: 'Oct', revenue: 105, cogs: 42, shipping: 16, ads: 13, net: 34 },
  { label: 'Nov', revenue: 150, cogs: 60, shipping: 25, ads: 25, net: 40 },
  { label: 'Dec', revenue: 180, cogs: 70, shipping: 30, ads: 30, net: 50 },
  { label: 'Jan', revenue: 100, cogs: 40, shipping: 15, ads: 12, net: 33 },
  { label: 'Feb', revenue: 120, cogs: 48, shipping: 18, ads: 15, net: 39 },
  { label: 'Mar', revenue: 115, cogs: 45, shipping: 22, ads: 14, net: 34 },
  { label: 'Apr', revenue: 130, cogs: 52, shipping: 20, ads: 18, net: 40 },
  { label: 'May', revenue: 145, cogs: 58, shipping: 21, ads: 19, net: 47 },
  { label: 'Jun', revenue: 160, cogs: 62, shipping: 24, ads: 22, net: 52 },
];

const MONTHLY_DATA = [
  { label: 'W1', revenue: 38, cogs: 15, shipping: 6, ads: 5, net: 12 },
  { label: 'W2', revenue: 40, cogs: 16, shipping: 6, ads: 5, net: 13 },
  { label: 'W3', revenue: 42, cogs: 15, shipping: 7, ads: 6, net: 14 },
  { label: 'W4', revenue: 40, cogs: 16, shipping: 5, ads: 6, net: 13 },
];

const CATEGORY_DATA = [
  { id: '1', name: 'Electronics', revenue: 450000, margin: 18.5, cogs: 280000, shipping: 45000, ads: 41750, status: 'warning' },
  { id: '2', name: 'Apparel', revenue: 320000, margin: 32.4, cogs: 140000, shipping: 35000, ads: 41320, status: 'optimal' },
  { id: '3', name: 'Home Goods', revenue: 210000, margin: 24.8, cogs: 110000, shipping: 32000, ads: 15920, status: 'optimal' },
  { id: '4', name: 'Beauty', revenue: 180000, margin: 42.1, cogs: 60000, shipping: 18000, ads: 26220, status: 'optimal' },
  { id: '5', name: 'Fitness', revenue: 125000, margin: 14.2, cogs: 75000, shipping: 22000, ads: 10250, status: 'critical' },
];

const LEAKAGE_DATA = [
  { source: 'Return Shipping (Germany)', amount: 14500, impact: 'High', trend: '+12%' },
  { source: 'Currency FX (GBP to USD)', amount: 8200, impact: 'Medium', trend: '-4%' },
  { source: 'Expedited Freight (US)', amount: 22400, impact: 'High', trend: '+18%' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="ma-chart-tooltip">
        <p className="ma-tooltip-label">{label} 2026</p>
        <div className="ma-tooltip-metrics">
          {payload.map((entry, index) => (
            <div key={index} className="ma-tooltip-row">
              <div className="ma-tooltip-dot" style={{ backgroundColor: entry.color }}></div>
              <span className="ma-tooltip-name">{entry.name}:</span>
              <span className="ma-tooltip-value tabular-nums">${entry.value}k</span>
            </div>
          ))}
          <div className="ma-tooltip-divider"></div>
          <div className="ma-tooltip-row total">
            <span className="ma-tooltip-name">Gross Revenue:</span>
            <span className="ma-tooltip-value tabular-nums">
              ${payload.reduce((sum, entry) => sum + entry.value, 0)}k
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export function MarginAnalysis() {
  const [timeframe, setTimeframe] = useState('6m');

  let activeData = YEARLY_DATA.slice(-6);
  if (timeframe === '1m') activeData = MONTHLY_DATA;
  if (timeframe === '3m') activeData = YEARLY_DATA.slice(-3);
  if (timeframe === '1y') activeData = YEARLY_DATA;

  return (
    <div className="ma-layout">
      {/* HEADER */}
      <header className="ma-header">
        <div>
          <h1 className="ma-title">Margin Analysis</h1>
          <p className="ma-subtitle">Identify profit leakage and visualize your cost structure.</p>
        </div>
        <div className="ma-header-actions">
          <div className="ma-time-toggles">
            <button className={`ma-time-btn ${timeframe === '1m' ? 'active' : ''}`} onClick={() => setTimeframe('1m')}>1M</button>
            <button className={`ma-time-btn ${timeframe === '3m' ? 'active' : ''}`} onClick={() => setTimeframe('3m')}>3M</button>
            <button className={`ma-time-btn ${timeframe === '6m' ? 'active' : ''}`} onClick={() => setTimeframe('6m')}>6M</button>
            <button className={`ma-time-btn ${timeframe === '1y' ? 'active' : ''}`} onClick={() => setTimeframe('1y')}>1Y</button>
          </div>
          <Button variant="secondary"><Download size={16} style={{ marginRight: '8px' }} /> Export Report</Button>
        </div>
      </header>

      {/* KPI CARDS */}
      <div className="ma-kpi-grid">
        <Card className="ma-glass-card">
          <CardContent className="ma-kpi-content">
            <div className="ma-kpi-top">
              <span className="ma-kpi-label">Blended Net Margin</span>
              <div className="ma-kpi-icon optimal"><PieChart size={18} /></div>
            </div>
            <div className="ma-kpi-value">26.8%</div>
            <div className="ma-kpi-trend success">
              <TrendingDown size={14} style={{ transform: 'rotate(180deg)' }} /> 
              <span>+2.4% vs last quarter</span>
            </div>
          </CardContent>
        </Card>

        <Card className="ma-glass-card">
          <CardContent className="ma-kpi-content">
            <div className="ma-kpi-top">
              <span className="ma-kpi-label">Identified Profit Leakage</span>
              <div className="ma-kpi-icon critical"><AlertTriangle size={18} /></div>
            </div>
            <div className="ma-kpi-value">$45.1k</div>
            <div className="ma-kpi-trend danger">
              <TrendingDown size={14} style={{ transform: 'rotate(180deg)' }} /> 
              <span>+14% vs last quarter</span>
            </div>
          </CardContent>
        </Card>

        <Card className="ma-glass-card">
          <CardContent className="ma-kpi-content">
            <div className="ma-kpi-top">
              <span className="ma-kpi-label">Highest Margin Category</span>
              <div className="ma-kpi-icon"><Zap size={18} /></div>
            </div>
            <div className="ma-kpi-value text-xl">Beauty (42.1%)</div>
            <div className="ma-kpi-trend neutral">
              <Target size={14} /> 
              <span>Target: 45.0%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="ma-main-grid">
        {/* CHART SECTION */}
        <Card className="ma-glass-card ma-chart-card">
          <CardContent style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="ma-section-header">
              <h3 className="ma-section-title">Revenue to Net Profit Flow (USD Thousands)</h3>
            </div>
            <div className="ma-chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activeData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="label" stroke="rgba(255,255,255,0.4)" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.4)" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} tickFormatter={(val) => `$${val}k`} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
                  
                  <Bar dataKey="net" name="Net Profit" stackId="a" fill="var(--color-success)" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="ads" name="Ad Spend" stackId="a" fill="var(--color-primary)" />
                  <Bar dataKey="shipping" name="Shipping & Fulfillment" stackId="a" fill="var(--color-warning)" />
                  <Bar dataKey="cogs" name="COGS" stackId="a" fill="rgba(255, 255, 255, 0.2)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* LEAKAGE SIDEBAR */}
        <div className="ma-sidebar">
          <Card className="ma-glass-card h-full">
            <CardContent style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <h3 className="ma-section-title" style={{ marginBottom: '24px', flexShrink: 0 }}>
                Top Profit Leaks
              </h3>
              
              <div className="ma-leakage-list">
                {LEAKAGE_DATA.map((leak, idx) => (
                  <div key={idx} className="ma-leak-card">
                    <div className="ma-leak-header">
                      <span className="ma-leak-source">{leak.source}</span>
                      <span className={`ma-leak-trend ${leak.trend.startsWith('+') ? 'text-danger' : 'text-success'}`}>
                        {leak.trend}
                      </span>
                    </div>
                    <div className="ma-leak-body">
                      <span className="ma-leak-amount tabular-nums">${leak.amount.toLocaleString()}</span>
                      <Badge variant={leak.impact === 'High' ? 'danger' : 'warning'}>{leak.impact} Impact</Badge>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="ma-sidebar-footer mt-auto pt-6">
                <Button className="w-full">Run AI Optimization</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CATEGORY BREAKDOWN TABLE */}
      <Card className="ma-glass-card mt-6">
        <div className="ma-table-header">
          <h3 className="ma-section-title">Margin by Category</h3>
          <Button variant="secondary" size="sm"><Filter size={14} style={{ marginRight: '6px' }} /> Filter</Button>
        </div>
        <div className="ma-table-container">
          <table className="ma-data-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Gross Revenue</th>
                <th>COGS</th>
                <th>Shipping</th>
                <th>Ad Spend</th>
                <th>Net Margin</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {CATEGORY_DATA.map((row) => (
                <tr key={row.id}>
                  <td className="font-medium text-white">{row.name}</td>
                  <td className="tabular-nums">${row.revenue.toLocaleString()}</td>
                  <td className="tabular-nums text-text-secondary">${row.cogs.toLocaleString()}</td>
                  <td className="tabular-nums text-text-secondary">${row.shipping.toLocaleString()}</td>
                  <td className="tabular-nums text-text-secondary">${row.ads.toLocaleString()}</td>
                  <td className="tabular-nums">
                    <span className={row.margin > 30 ? 'text-success' : row.margin < 20 ? 'text-danger' : ''}>
                      {row.margin}%
                    </span>
                  </td>
                  <td>
                    <Badge variant={row.status === 'optimal' ? 'success' : row.status === 'warning' ? 'warning' : 'danger'}>
                      {row.status.toUpperCase()}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
    </div>
  );
}
