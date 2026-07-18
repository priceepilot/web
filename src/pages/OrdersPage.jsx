import React from 'react';
import { 
  ShoppingCart, RefreshCcw, Box, Hash
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import './OrdersPage.css';

// --- MOCK DATA ---
const orderVolumeData = [
  { name: 'Mon', orders: 120 },
  { name: 'Tue', orders: 150 },
  { name: 'Wed', orders: 180 },
  { name: 'Thu', orders: 140 },
  { name: 'Fri', orders: 210 },
  { name: 'Sat', orders: 250 },
  { name: 'Sun', orders: 220 },
];

const orderOriginsData = [
  { name: 'Shopify', value: 45, color: '#10B981' },
  { name: 'Amazon', value: 35, color: '#F97316' },
  { name: 'Walmart', value: 15, color: '#3B82F6' },
  { name: 'Other', value: 5, color: '#8B5CF6' },
];

const recentOrdersData = [
  { id: '#ORD-9021', customer: 'Sarah Jenkins', date: 'Oct 24, 2025', status: 'Fulfilled', amount: '$124.50' },
  { id: '#ORD-9022', customer: 'Michael Chen', date: 'Oct 24, 2025', status: 'Pending', amount: '$89.99' },
  { id: '#ORD-9023', customer: 'Emma Watson', date: 'Oct 23, 2025', status: 'Cancelled', amount: '$245.00' },
  { id: '#ORD-9024', customer: 'David Miller', date: 'Oct 23, 2025', status: 'Fulfilled', amount: '$56.75' },
  { id: '#ORD-9025', customer: 'Sophia Garcia', date: 'Oct 22, 2025', status: 'Fulfilled', amount: '$199.20' },
];

export function OrdersPage() {
  return (
    <div className="orders-dashboard">
      
      {/* ROW 1: TOP METRICS */}
      <div className="orders-metrics-grid">
        <div className="orders-card orders-metric-card">
          <div className="orders-metric-header">
            <span className="orders-metric-title">Total Orders</span>
            <div className="orders-metric-icon"><ShoppingCart size={16} /></div>
          </div>
          <div className="orders-metric-value">1,248</div>
          <div className="orders-metric-trend orders-trend-positive">+8.4% vs last week</div>
        </div>
        
        <div className="orders-card orders-metric-card">
          <div className="orders-metric-header">
            <span className="orders-metric-title">Avg Order Value</span>
            <div className="orders-metric-icon"><Hash size={16} /></div>
          </div>
          <div className="orders-metric-value">$142.50</div>
          <div className="orders-metric-trend orders-trend-positive">+2.1% vs last week</div>
        </div>
        
        <div className="orders-card orders-metric-card">
          <div className="orders-metric-header">
            <span className="orders-metric-title">Return Rate</span>
            <div className="orders-metric-icon"><RefreshCcw size={16} /></div>
          </div>
          <div className="orders-metric-value">4.2%</div>
          <div className="orders-metric-trend orders-trend-negative">+0.5% vs last week</div>
        </div>
        
        <div className="orders-card orders-metric-card">
          <div className="orders-metric-header">
            <span className="orders-metric-title">Units per Transaction</span>
            <div className="orders-metric-icon"><Box size={16} /></div>
          </div>
          <div className="orders-metric-value">2.4</div>
          <div className="orders-metric-trend orders-trend-positive">+0.1 vs last week</div>
        </div>
      </div>

      {/* ROW 2: MAIN CHARTS */}
      <div className="orders-main-grid">
        
        {/* Order Volume */}
        <div className="orders-card">
          <h3 className="orders-card-title">Order Volume</h3>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer>
              <BarChart data={orderVolumeData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }} />
                <Tooltip cursor={{ fill: 'var(--color-surface)' }} />
                <Bar dataKey="orders" fill="var(--color-primary)" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Origins */}
        <div className="orders-card">
          <h3 className="orders-card-title">Order Origins</h3>
          <div style={{ width: '100%', height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie
                  data={orderOriginsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {orderOriginsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', padding: '0 12px' }}>
              {orderOriginsData.map((entry) => (
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
      <div className="orders-card">
        <h3 className="orders-card-title">Recent Orders</h3>
        <div className="orders-table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentOrdersData.map((order) => (
                <tr key={order.id}>
                  <td style={{ fontWeight: '600' }}>{order.id}</td>
                  <td>{order.customer}</td>
                  <td style={{ color: 'var(--color-text-secondary)' }}>{order.date}</td>
                  <td>
                    <span className={`orders-status-badge orders-status-${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td style={{ fontWeight: '600' }}>{order.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
