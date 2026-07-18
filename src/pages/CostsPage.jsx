import React from 'react';
import { 
  Building, Megaphone, Truck, Server, FileText
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import './CostsPage.css';

// --- MOCK DATA ---
const expenseTrendData = [
  { name: 'Jan', cogs: 12000, ads: 8000, shipping: 4000, platform: 2000 },
  { name: 'Feb', cogs: 13000, ads: 8500, shipping: 4200, platform: 2200 },
  { name: 'Mar', cogs: 11000, ads: 9000, shipping: 3800, platform: 2000 },
  { name: 'Apr', cogs: 15000, ads: 11000, shipping: 5000, platform: 2800 },
  { name: 'May', cogs: 14000, ads: 10500, shipping: 4800, platform: 2600 },
  { name: 'Jun', cogs: 18000, ads: 13000, shipping: 6000, platform: 3500 },
  { name: 'Jul', cogs: 17500, ads: 12000, shipping: 5800, platform: 3200 },
];

const costDistributionData = [
  { name: 'COGS', value: 45, color: '#3B82F6' },
  { name: 'Advertising', value: 32, color: '#F97316' },
  { name: 'Shipping', value: 15, color: '#10B981' },
  { name: 'Platform Fees', value: 8, color: '#8B5CF6' },
];

const recentExpensesData = [
  { id: '#EXP-801', vendor: 'Facebook Ads', category: 'Advertising', date: 'Oct 24, 2025', amount: '$4,250.00', status: 'Paid' },
  { id: '#EXP-802', vendor: 'FedEx Intl', category: 'Shipping', date: 'Oct 23, 2025', amount: '$1,840.50', status: 'Pending' },
  { id: '#EXP-803', vendor: 'Acme Manufacturing', category: 'COGS', date: 'Oct 21, 2025', amount: '$18,500.00', status: 'Paid' },
  { id: '#EXP-804', vendor: 'Shopify Plus', category: 'Platform Fees', date: 'Oct 20, 2025', amount: '$2,000.00', status: 'Paid' },
  { id: '#EXP-805', vendor: 'Google Ads', category: 'Advertising', date: 'Oct 18, 2025', amount: '$3,100.00', status: 'Paid' },
];

export function CostsPage() {
  return (
    <div className="costs-dashboard">
      
      {/* ROW 1: TOP METRICS */}
      <div className="costs-metrics-grid">
        <div className="costs-card costs-metric-card">
          <div className="costs-metric-header">
            <span className="costs-metric-title">Total COGS</span>
            <div className="costs-metric-icon"><Building size={16} /></div>
          </div>
          <div className="costs-metric-value">$17,500</div>
          <div className="costs-metric-trend costs-trend-negative">+12.4% vs last month</div>
        </div>
        
        <div className="costs-card costs-metric-card">
          <div className="costs-metric-header">
            <span className="costs-metric-title">Ad Spend</span>
            <div className="costs-metric-icon"><Megaphone size={16} /></div>
          </div>
          <div className="costs-metric-value">$12,000</div>
          <div className="costs-metric-trend costs-trend-negative">+8.2% vs last month</div>
        </div>
        
        <div className="costs-card costs-metric-card">
          <div className="costs-metric-header">
            <span className="costs-metric-title">Shipping</span>
            <div className="costs-metric-icon"><Truck size={16} /></div>
          </div>
          <div className="costs-metric-value">$5,800</div>
          <div className="costs-metric-trend costs-trend-positive">-3.4% vs last month</div>
        </div>
        
        <div className="costs-card costs-metric-card">
          <div className="costs-metric-header">
            <span className="costs-metric-title">Platform Fees</span>
            <div className="costs-metric-icon"><Server size={16} /></div>
          </div>
          <div className="costs-metric-value">$3,200</div>
          <div className="costs-metric-trend costs-trend-positive">-1.2% vs last month</div>
        </div>
      </div>

      {/* ROW 2: MAIN CHARTS */}
      <div className="costs-main-grid">
        
        {/* Expense Trends */}
        <div className="costs-card">
          <h3 className="costs-card-title">Expense Trends</h3>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer>
              <AreaChart data={expenseTrendData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCogs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.2}/>
                  </linearGradient>
                  <linearGradient id="colorAds" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0.2}/>
                  </linearGradient>
                  <linearGradient id="colorShipping" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }} tickFormatter={(val) => `$${val / 1000}k`} />
                <Tooltip cursor={{ stroke: 'var(--color-border)', strokeWidth: 1, strokeDasharray: '3 3' }} />
                <Area type="monotone" dataKey="cogs" stackId="1" stroke="#3B82F6" fill="url(#colorCogs)" />
                <Area type="monotone" dataKey="ads" stackId="1" stroke="#F97316" fill="url(#colorAds)" />
                <Area type="monotone" dataKey="shipping" stackId="1" stroke="#10B981" fill="url(#colorShipping)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cost Distribution */}
        <div className="costs-card">
          <h3 className="costs-card-title">Cost Distribution</h3>
          <div style={{ width: '100%', height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie
                  data={costDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {costDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', padding: '0 12px' }}>
              {costDistributionData.map((entry) => (
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
      <div className="costs-card">
        <h3 className="costs-card-title">Recent Expenses</h3>
        <div className="costs-table-container">
          <table className="costs-table">
            <thead>
              <tr>
                <th>Expense ID</th>
                <th>Vendor</th>
                <th>Category</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentExpensesData.map((expense) => (
                <tr key={expense.id}>
                  <td style={{ fontWeight: '600', color: 'var(--color-text-secondary)' }}>{expense.id}</td>
                  <td>
                    <div className="costs-table-vendor">
                      <div className="costs-table-avatar">
                        <FileText size={20} className="text-secondary" />
                      </div>
                      <div style={{ fontWeight: '600' }}>{expense.vendor}</div>
                    </div>
                  </td>
                  <td style={{ color: 'var(--color-text-secondary)' }}>{expense.category}</td>
                  <td style={{ color: 'var(--color-text-secondary)' }}>{expense.date}</td>
                  <td style={{ fontWeight: '600' }}>{expense.amount}</td>
                  <td>
                    <span className={`costs-status-badge costs-status-${expense.status.toLowerCase()}`}>
                      {expense.status}
                    </span>
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
