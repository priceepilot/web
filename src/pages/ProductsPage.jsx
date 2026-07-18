import React from 'react';
import { 
  Package, Tags, AlertCircle, Percent
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import './ProductsPage.css';

// --- MOCK DATA ---
const revenueByCategoryData = [
  { name: 'Electronics', revenue: 45000 },
  { name: 'Home & Kitchen', revenue: 28000 },
  { name: 'Apparel', revenue: 15000 },
  { name: 'Office', revenue: 12000 },
  { name: 'Outdoors', revenue: 8000 },
];

const inventoryHealthData = [
  { name: 'In Stock', value: 75, color: '#10B981' },
  { name: 'Low Stock', value: 15, color: '#F59E0B' },
  { name: 'Out of Stock', value: 10, color: '#EF4444' },
];

const productInventoryData = [
  { id: '1', name: 'Wireless Noise-Cancelling Headphones', sku: 'AUDIO-01', price: '$249.99', cost: '$102.50', margin: '59%', stock: 'In Stock' },
  { id: '2', name: 'Smart Fitness Watch', sku: 'FIT-02', price: '$199.99', cost: '$95.60', margin: '52%', stock: 'Low Stock' },
  { id: '3', name: 'Ergonomic Office Chair', sku: 'FURN-03', price: '$349.99', cost: '$203.70', margin: '42%', stock: 'In Stock' },
  { id: '4', name: 'Mechanical Gaming Keyboard', sku: 'ELEC-99', price: '$129.99', cost: '$106.10', margin: '18%', stock: 'Out of Stock' },
  { id: '5', name: 'Portable Bluetooth Speaker', sku: 'AUDIO-05', price: '$89.99', cost: '$32.40', margin: '64%', stock: 'In Stock' },
];

export function ProductsPage() {
  return (
    <div className="products-dashboard">
      
      {/* ROW 1: TOP METRICS */}
      <div className="products-metrics-grid">
        <div className="products-card products-metric-card">
          <div className="products-metric-header">
            <span className="products-metric-title">Total Products</span>
            <div className="products-metric-icon"><Package size={16} /></div>
          </div>
          <div className="products-metric-value">1,429</div>
          <div className="products-metric-trend products-trend-positive">+12 this month</div>
        </div>
        
        <div className="products-card products-metric-card">
          <div className="products-metric-header">
            <span className="products-metric-title">Active Listings</span>
            <div className="products-metric-icon"><Tags size={16} /></div>
          </div>
          <div className="products-metric-value">1,385</div>
          <div className="products-metric-trend products-trend-positive">96.9% of catalog</div>
        </div>
        
        <div className="products-card products-metric-card">
          <div className="products-metric-header">
            <span className="products-metric-title">Low Stock Alerts</span>
            <div className="products-metric-icon"><AlertCircle size={16} /></div>
          </div>
          <div className="products-metric-value">24</div>
          <div className="products-metric-trend products-trend-negative">+5 since yesterday</div>
        </div>
        
        <div className="products-card products-metric-card">
          <div className="products-metric-header">
            <span className="products-metric-title">Avg Margin</span>
            <div className="products-metric-icon"><Percent size={16} /></div>
          </div>
          <div className="products-metric-value">46.2%</div>
          <div className="products-metric-trend products-trend-positive">+1.2% vs last month</div>
        </div>
      </div>

      {/* ROW 2: MAIN CHARTS */}
      <div className="products-main-grid">
        
        {/* Revenue by Category */}
        <div className="products-card">
          <h3 className="products-card-title">Revenue by Category</h3>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer>
              <BarChart data={revenueByCategoryData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }} tickFormatter={(val) => `$${val / 1000}k`} />
                <Tooltip cursor={{ fill: 'var(--color-surface)' }} />
                <Bar dataKey="revenue" fill="#8B5CF6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Inventory Health */}
        <div className="products-card">
          <h3 className="products-card-title">Inventory Health</h3>
          <div style={{ width: '100%', height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie
                  data={inventoryHealthData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {inventoryHealthData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', padding: '0 12px' }}>
              {inventoryHealthData.map((entry) => (
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
      <div className="products-card">
        <h3 className="products-card-title">Product Inventory</h3>
        <div className="products-table-container">
          <table className="products-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Unit Price</th>
                <th>Unit Cost</th>
                <th>Margin</th>
                <th>Stock Status</th>
              </tr>
            </thead>
            <tbody>
              {productInventoryData.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="products-table-product">
                      <div className="products-table-avatar">
                        <Package size={20} className="text-secondary" />
                      </div>
                      <div style={{ fontWeight: '600' }}>{product.name}</div>
                    </div>
                  </td>
                  <td style={{ color: 'var(--color-text-secondary)' }}>{product.sku}</td>
                  <td>{product.price}</td>
                  <td>{product.cost}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '40px', height: '6px', background: 'var(--color-surface)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: product.margin, height: '100%', background: parseInt(product.margin) > 50 ? '#10B981' : parseInt(product.margin) > 30 ? '#F97316' : '#EF4444', borderRadius: '3px' }}></div>
                      </div>
                      {product.margin}
                    </div>
                  </td>
                  <td>
                    <span className={`products-stock-badge products-stock-${product.stock.toLowerCase().replace(/\s+/g, '')}`}>
                      {product.stock}
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
