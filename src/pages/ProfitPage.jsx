import React from 'react';
import { 
  TrendingUp, Activity, DollarSign, Percent, Package 
} from 'lucide-react';
import { 
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import './ProfitPage.css';

// --- MOCK DATA ---
const profitTrendData = [
  { name: 'Jan', revenue: 4000, profit: 2400 },
  { name: 'Feb', revenue: 3000, profit: 1398 },
  { name: 'Mar', revenue: 2000, profit: 9800 },
  { name: 'Apr', revenue: 2780, profit: 3908 },
  { name: 'May', revenue: 1890, profit: 4800 },
  { name: 'Jun', revenue: 2390, profit: 3800 },
  { name: 'Jul', revenue: 3490, profit: 4300 },
];

const costBreakdownData = [
  { name: 'COGS', value: 400, color: '#3B82F6' },
  { name: 'Ad Spend', value: 300, color: '#F97316' },
  { name: 'Platform Fees', value: 300, color: '#8B5CF6' },
  { name: 'Shipping', value: 200, color: '#10B981' },
];

const topProductsData = [
  { id: 1, name: 'Wireless Noise-Cancelling Headphones', sku: 'AUDIO-01', revenue: '$14,200', profit: '$8,400', margin: '59.1%', trend: 'up' },
  { id: 2, name: 'Ergonomic Office Chair', sku: 'FURN-03', revenue: '$9,800', profit: '$4,100', margin: '41.8%', trend: 'up' },
  { id: 3, name: 'Mechanical Gaming Keyboard', sku: 'ELEC-99', revenue: '$6,500', profit: '$1,200', margin: '18.4%', trend: 'down' },
  { id: 4, name: 'Smart Fitness Watch', sku: 'FIT-02', revenue: '$11,100', profit: '$5,800', margin: '52.2%', trend: 'up' },
];

export function ProfitPage() {
  return (
    <div className="profit-dashboard">
      
      {/* ROW 1: TOP METRICS */}
      <div className="profit-metrics-grid">
        <div className="profit-card profit-metric-card">
          <div className="profit-metric-header">
            <span className="profit-metric-title">Net Profit</span>
            <div className="profit-metric-icon"><DollarSign size={16} /></div>
          </div>
          <div className="profit-metric-value">$42,918.50</div>
          <div className="profit-metric-trend profit-trend-positive">+12.4% vs last month</div>
        </div>
        
        <div className="profit-card profit-metric-card">
          <div className="profit-metric-header">
            <span className="profit-metric-title">Gross Margin</span>
            <div className="profit-metric-icon"><Percent size={16} /></div>
          </div>
          <div className="profit-metric-value">64.2%</div>
          <div className="profit-metric-trend profit-trend-positive">+2.1% vs last month</div>
        </div>
        
        <div className="profit-card profit-metric-card">
          <div className="profit-metric-header">
            <span className="profit-metric-title">Total Costs</span>
            <div className="profit-metric-icon"><Activity size={16} /></div>
          </div>
          <div className="profit-metric-value">$23,800.00</div>
          <div className="profit-metric-trend profit-trend-negative">+5.4% vs last month</div>
        </div>
        
        <div className="profit-card profit-metric-card">
          <div className="profit-metric-header">
            <span className="profit-metric-title">ROAS</span>
            <div className="profit-metric-icon"><TrendingUp size={16} /></div>
          </div>
          <div className="profit-metric-value">3.4x</div>
          <div className="profit-metric-trend profit-trend-positive">+0.2x vs last month</div>
        </div>
      </div>

      {/* ROW 2: MAIN CHARTS */}
      <div className="profit-main-grid">
        
        {/* Revenue vs Profit */}
        <div className="profit-card">
          <h3 className="profit-card-title">
            Revenue vs Profit
            <div style={{ display: 'flex', gap: '12px', fontSize: '12px', fontWeight: '500' }}>
              <span style={{ color: '#F97316', display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#F97316' }}></div> Revenue</span>
              <span style={{ color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '8px', height: '2px', background: '#10B981' }}></div> Profit</span>
            </div>
          </h3>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer>
              <ComposedChart data={profitTrendData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }} tickFormatter={(val) => `$${val / 1000}k`} />
                <Tooltip cursor={{ fill: 'var(--color-surface)' }} />
                <Bar dataKey="revenue" barSize={32} fill="#F97316" radius={[4, 4, 0, 0]} />
                <Line type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={3} dot={{ r: 4, fill: '#10B981', strokeWidth: 2, stroke: 'var(--color-background)' }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="profit-card">
          <h3 className="profit-card-title">Cost Breakdown</h3>
          <div style={{ width: '100%', height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie
                  data={costBreakdownData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {costBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', padding: '0 12px' }}>
              {costBreakdownData.map((entry) => (
                <div key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '500', color: 'var(--color-text-primary)' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: entry.color }}></div>
                  {entry.name}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* ROW 3: DATA TABLE */}
      <div className="profit-card">
        <h3 className="profit-card-title">Top Profitable Products</h3>
        <div className="profit-table-container">
          <table className="profit-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Revenue</th>
                <th>Net Profit</th>
                <th>Margin</th>
              </tr>
            </thead>
            <tbody>
              {topProductsData.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="profit-table-product">
                      <div className="profit-table-avatar">
                        <Package size={20} className="text-secondary" />
                      </div>
                      <div>
                        <div style={{ fontWeight: '600' }}>{product.name}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: 'var(--color-text-secondary)' }}>{product.sku}</td>
                  <td>{product.revenue}</td>
                  <td style={{ color: '#10B981', fontWeight: '600' }}>{product.profit}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '40px', height: '6px', background: 'var(--color-surface)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: product.margin, height: '100%', background: product.trend === 'up' ? '#10B981' : '#F59E0B', borderRadius: '3px' }}></div>
                      </div>
                      {product.margin}
                    </div>
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
