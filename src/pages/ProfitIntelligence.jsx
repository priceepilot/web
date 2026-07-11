import React, { useState } from 'react';
import clsx from 'clsx';
import { 
  ArrowRight, ArrowDownRight, ArrowUpRight, Minus, ChevronDown, 
  Download, Calendar, Globe, Building, CheckCircle2,
  Truck, RefreshCw
} from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent } from '../components/Card';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '../components/Table';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import './ProfitIntelligence.css';

// Mock Data
const trendData12M = [
  { name: 'Jan', revenue: 40000, profit: 24000 },
  { name: 'Feb', revenue: 45000, profit: 26000 },
  { name: 'Mar', revenue: 42000, profit: 22000 },
  { name: 'Apr', revenue: 55000, profit: 31000 },
  { name: 'May', revenue: 58000, profit: 34000 },
  { name: 'Jun', revenue: 65000, profit: 38000 },
  { name: 'Jul', revenue: 85000, profit: 48000 },
  { name: 'Aug', revenue: 124563, profit: 38240 },
];

const trendData90D = [
  { name: 'Week 1', revenue: 21000, profit: 8000 },
  { name: 'Week 2', revenue: 23500, profit: 9200 },
  { name: 'Week 3', revenue: 22000, profit: 8500 },
  { name: 'Week 4', revenue: 28000, profit: 12000 },
  { name: 'Week 5', revenue: 31000, profit: 14000 },
  { name: 'Week 6', revenue: 34000, profit: 16500 },
  { name: 'Week 7', revenue: 42000, profit: 21000 },
  { name: 'Week 8', revenue: 51000, profit: 24000 },
];

const trendData30D = [
  { name: '1-5', revenue: 18000, profit: 7000 },
  { name: '6-10', revenue: 21000, profit: 8500 },
  { name: '11-15', revenue: 19500, profit: 7200 },
  { name: '16-20', revenue: 25000, profit: 10500 },
  { name: '21-25', revenue: 32000, profit: 14000 },
  { name: '26-30', revenue: 41000, profit: 18000 },
];

const trendData7D = [
  { name: 'Mon', revenue: 4100, profit: 1200 },
  { name: 'Tue', revenue: 4800, profit: 1500 },
  { name: 'Wed', revenue: 3900, profit: 1100 },
  { name: 'Thu', revenue: 5200, profit: 1800 },
  { name: 'Fri', revenue: 6100, profit: 2200 },
  { name: 'Sat', revenue: 7500, profit: 2900 },
  { name: 'Sun', revenue: 8200, profit: 3400 },
];

const categoryData = [
  { name: 'Fashion', profit: 18500 },
  { name: 'Electronics', profit: 8200 },
  { name: 'Accessories', profit: 6400 },
  { name: 'Beauty', profit: 3140 },
  { name: 'Home', profit: 2000 },
];

const countryStats = {
  'USA': { revenue: '$45,200', profit: '$15,820', margin: '35.0%', orders: 420, returns: 12, shipping: '$4,100', fx: '$0', payment: '$1,200', trend: '+14%' },
  'Germany': { revenue: '$28,400', profit: '$6,248', margin: '22.0%', orders: 310, returns: 45, shipping: '$5,800', fx: '$420', payment: '$850', trend: '-18%' },
  'France': { revenue: '$18,500', profit: '$5,735', margin: '31.0%', orders: 180, returns: 14, shipping: '$2,100', fx: '$280', payment: '$550', trend: '+4%' },
  'Netherlands': { revenue: '$8,200', profit: '$2,788', margin: '34.0%', orders: 85, returns: 3, shipping: '$800', fx: '$120', payment: '$240', trend: '+42%' },
  'UK': { revenue: '$22,100', profit: '$6,188', margin: '28.0%', orders: 210, returns: 32, shipping: '$3,200', fx: '$880', payment: '$660', trend: '-2%' },
  'Canada': { revenue: '$10,363', profit: '$2,901', margin: '28.0%', orders: 95, returns: 8, shipping: '$1,400', fx: '$150', payment: '$310', trend: '+6%' },
};

export function ProfitIntelligence() {
  const [chartRange, setChartRange] = useState('30D');
  const [selectedCountry, setSelectedCountry] = useState('Germany');

  // Header Filters State
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dateFilter, setDateFilter] = useState('Last 30 Days');
  const [storeFilter, setStoreFilter] = useState('All Stores');
  const [countryFilter, setCountryFilter] = useState('All Countries');

  const getChartData = () => {
    switch(chartRange) {
      case '7D': return trendData7D;
      case '30D': return trendData30D;
      case '90D': return trendData90D;
      case '12M': return trendData12M;
      default: return trendData30D;
    }
  };

  const handleExport = () => {
    alert('Exporting Profit Intelligence report to CSV...');
  };

  // Derived Data Multipliers
  const storeMult = { 'All Stores': 1, 'Shopify US': 0.45, 'Shopify EU': 0.3, 'Amazon North America': 0.55, 'Amazon Europe': 0.4 }[storeFilter] || 1;
  const countryMult = { 'All Countries': 1, 'USA': 0.6, 'Germany': 0.2, 'France': 0.15, 'Netherlands': 0.08, 'UK': 0.22, 'Canada': 0.1 }[countryFilter] || 1;
  const dateMult = { 'Today': 0.03, 'Last 7 Days': 0.25, 'Last 30 Days': 1, 'Last 90 Days': 2.8, 'Year to Date': 6.5 }[dateFilter] || 1;
  const totalMult = storeMult * countryMult * dateMult;

  const revGrowth = (12.4 * storeMult + (dateMult > 1 ? 5 : 0)).toFixed(1);
  const oppLift = (18.2 * totalMult).toFixed(1);
  const atRisk = (4.8 * totalMult).toFixed(1);

  return (
    <div className="pi-container" onClick={() => activeDropdown && setActiveDropdown(null)}>
      {/* 1. HEADER */}
      <div className="pi-header">
        <div className="pi-header-left">
          <h1 className="pi-title">Profit Intelligence</h1>
          <p className="pi-subtitle">Understand exactly where your business earns, loses, and grows profit across global markets.</p>
        </div>
        <div className="pi-header-right" onClick={(e) => e.stopPropagation()}>
          <div className="pi-dropdown-wrapper">
            <button className={clsx("pi-filter-btn", { active: activeDropdown === 'date' })} onClick={() => setActiveDropdown(activeDropdown === 'date' ? null : 'date')}>
              <Calendar size={14} /> {dateFilter} <ChevronDown size={14} />
            </button>
            {activeDropdown === 'date' && (
              <div className="pi-dropdown-menu">
                {['Today', 'Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'Year to Date'].map(opt => (
                  <button key={opt} className={clsx("pi-dropdown-item", { selected: opt === dateFilter })} onClick={() => { 
                    setDateFilter(opt); 
                    setActiveDropdown(null);
                    const rangeMap = { 'Today': '7D', 'Last 7 Days': '7D', 'Last 30 Days': '30D', 'Last 90 Days': '90D', 'Year to Date': '12M' };
                    setChartRange(rangeMap[opt] || '30D');
                  }}>{opt}</button>
                ))}
              </div>
            )}
          </div>
          
          <div className="pi-dropdown-wrapper">
            <button className={clsx("pi-filter-btn", { active: activeDropdown === 'store' })} onClick={() => setActiveDropdown(activeDropdown === 'store' ? null : 'store')}>
              <Building size={14} /> {storeFilter} <ChevronDown size={14} />
            </button>
            {activeDropdown === 'store' && (
              <div className="pi-dropdown-menu">
                {['All Stores', 'Shopify US', 'Shopify EU', 'Amazon North America', 'Amazon Europe'].map(opt => (
                  <button key={opt} className={clsx("pi-dropdown-item", { selected: opt === storeFilter })} onClick={() => { setStoreFilter(opt); setActiveDropdown(null); }}>{opt}</button>
                ))}
              </div>
            )}
          </div>

          <div className="pi-dropdown-wrapper">
            <button className={clsx("pi-filter-btn", { active: activeDropdown === 'country' })} onClick={() => setActiveDropdown(activeDropdown === 'country' ? null : 'country')}>
              <Globe size={14} /> {countryFilter} <ChevronDown size={14} />
            </button>
            {activeDropdown === 'country' && (
              <div className="pi-dropdown-menu">
                {['All Countries', 'USA', 'Germany', 'France', 'Netherlands', 'UK', 'Canada'].map(opt => (
                  <button key={opt} className={clsx("pi-dropdown-item", { selected: opt === countryFilter })} onClick={() => { setCountryFilter(opt); setActiveDropdown(null); }}>{opt}</button>
                ))}
              </div>
            )}
          </div>

          <Button variant="secondary" className="btn-sm" onClick={handleExport}>
            <Download size={14} className="mr-2" /> Export
          </Button>
        </div>
      </div>

      <div className="pi-bento-grid">
        {/* ROW 1: HERO KPIs */}
        <div className="pi-bento-hero">
          <Card className="pi-hero-briefing pi-glass-card">
            <CardContent className="pi-hero-content">
              <h2 className="pi-section-label">Executive Briefing</h2>
              <p className="pi-hero-text">
                Revenue increased <strong>{revGrowth}%</strong> this period. Net profit grew <strong>8.7%</strong>, driven by strong performance across {storeFilter !== 'All Stores' ? storeFilter : 'all regions'}. 
                {countryFilter === 'All Countries' ? ' Germany faces margin pressure from logistics.' : ' Margin pressure remains a focus.'}
              </p>
            </CardContent>
          </Card>
          
          <Card className="pi-hero-kpi pi-glass-card">
            <span className="pi-kpi-label">Revenue Growth</span>
            <span className="pi-kpi-value text-success">+{revGrowth}%</span>
            <span className="pi-kpi-trend"><ArrowUpRight size={14} /> Trending well</span>
          </Card>
          
          <Card className="pi-hero-kpi pi-glass-card">
            <span className="pi-kpi-label">Opportunity Lift</span>
            <span className="pi-kpi-value text-primary">+${oppLift}k</span>
            <span className="pi-kpi-trend">/ period estimated</span>
          </Card>
          
          <Card className="pi-hero-kpi pi-glass-card">
            <span className="pi-kpi-label">At-Risk Margin</span>
            <span className="pi-kpi-value text-danger">-${atRisk}k</span>
            <span className="pi-kpi-trend"><ArrowDownRight size={14} /> Action required</span>
          </Card>
        </div>

        {/* ROW 2: CORE ANALYSIS */}
        <div className="pi-bento-core">
          <Card className="pi-bento-chart pi-glass-card">
            <div className="pi-chart-header">
              <h2 className="pi-section-label">Profit & Revenue Trend</h2>
              <div className="chart-toggles">
                {['7D', '30D', '90D', '12M'].map(range => (
                  <button key={range} className={clsx('chart-toggle-btn', { active: chartRange === range })} onClick={() => setChartRange(range)}>{range}</button>
                ))}
              </div>
            </div>
            <div className="pi-chart-wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={getChartData()} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-text-secondary)" stopOpacity={0.1}/>
                      <stop offset="100%" stopColor="var(--color-text-secondary)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorProf" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.25}/>
                      <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-secondary)', fontSize: 11 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-secondary)', fontSize: 11, fontFamily: 'monospace' }} tickFormatter={(v) => `$${v/1000}k`} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px', boxShadow: 'var(--shadow-lg)', backdropFilter: 'blur(10px)' }}
                    itemStyle={{ color: 'var(--color-text-primary)', fontWeight: 600, fontFamily: 'monospace' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="var(--color-text-secondary)" strokeWidth={2} fill="url(#colorRev)" />
                  <Area type="monotone" dataKey="profit" stroke="var(--color-primary)" strokeWidth={2} fill="url(#colorProf)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="pi-bento-country pi-glass-card">
            <h2 className="pi-section-label" style={{ padding: '20px 20px 0' }}>Market Deep Dive</h2>
            <div className="pi-country-layout">
              <div className="pi-country-list-wrapper">
                <div className="pi-country-list">
                  {Object.keys(countryStats).map(country => (
                    <button key={country} className={clsx('pi-country-pill', { active: selectedCountry === country })} onClick={() => setSelectedCountry(country)}>
                      {country}
                    </button>
                  ))}
                </div>
              </div>
              <div className="pi-cd-details">
                <div className="pi-cd-header">
                  <h3 className="pi-cd-title">{selectedCountry}</h3>
                  <Badge variant={countryStats[selectedCountry].trend.startsWith('-') ? 'danger' : 'success'} className="pi-cd-trend-badge">
                    {countryStats[selectedCountry].trend.startsWith('-') ? <ArrowDownRight size={14}/> : <ArrowUpRight size={14}/>}
                    {countryStats[selectedCountry].trend}
                  </Badge>
                </div>
                <div className="pi-cd-metrics-grid">
                  <div className="pi-cd-metric-box">
                    <span className="pi-cd-label">Revenue</span>
                    <span className="pi-cd-value tabular-nums">{countryStats[selectedCountry].revenue}</span>
                  </div>
                  <div className="pi-cd-metric-box">
                    <span className="pi-cd-label">Profit</span>
                    <span className="pi-cd-value text-primary tabular-nums">{countryStats[selectedCountry].profit}</span>
                  </div>
                  <div className="pi-cd-metric-box">
                    <span className="pi-cd-label">Margin</span>
                    <span className="pi-cd-value tabular-nums">{countryStats[selectedCountry].margin}</span>
                  </div>
                </div>
                <div className="pi-cd-costs">
                  <h4 className="pi-cd-costs-title">Cost Centers</h4>
                  <div className="pi-cd-cost-item">
                    <div className="pi-cd-cost-item-left">
                      <div className="pi-cd-cost-icon"><Truck size={14}/></div>
                      <span>Shipping</span>
                    </div>
                    <span className="tabular-nums font-medium">{countryStats[selectedCountry].shipping}</span>
                  </div>
                  <div className="pi-cd-cost-item">
                    <div className="pi-cd-cost-item-left">
                      <div className="pi-cd-cost-icon"><RefreshCw size={14}/></div>
                      <span>FX Costs</span>
                    </div>
                    <span className="tabular-nums font-medium">{countryStats[selectedCountry].fx}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* ROW 3: INSIGHTS & ACTIONS */}
        <div className="pi-bento-insights">
          <Card className="pi-bento-actions pi-glass-card">
            <h2 className="pi-section-label" style={{ padding: '20px 20px 10px' }}>Recommended Actions</h2>
            <div className="pi-actions-list">
              <div className="pi-action-card pi-action-rank-1">
                <div className="pi-action-header">
                  <h3 className="pi-action-title">Netherlands Expansion</h3>
                  <Badge variant="default" className="pi-confidence-badge">96% Match</Badge>
                </div>
                <span className="pi-action-lift text-success font-bold tabular-nums">+$18,200/mo</span>
              </div>
              <div className="pi-action-card">
                <div className="pi-action-header">
                  <h3 className="pi-action-title">Germany Pricing Adjust</h3>
                  <Badge variant="default" className="pi-confidence-badge">91% Match</Badge>
                </div>
                <span className="pi-action-lift text-success font-bold tabular-nums">+$9,200/mo</span>
              </div>
            </div>
          </Card>
          
          <Card className="pi-bento-cost-breakdown pi-glass-card">
            <h2 className="pi-section-label" style={{ padding: '20px 20px 10px' }}>Global Cost Centers</h2>
            <div className="pi-cost-list">
              {[
                { label: 'Shipping', value: '$12,430', pct: '45%', color: 'var(--color-primary)' },
                { label: 'FX Costs', value: '$7,820', pct: '28%', color: 'var(--color-warning)' },
                { label: 'Payment Fees', value: '$3,320', pct: '12%', color: 'var(--color-highlight)' },
              ].map((item, i) => (
                <div className="pi-cost-item" key={i}>
                  <div className="pi-cost-item-header">
                    <span className="pi-cost-label">{item.label}</span>
                    <div className="pi-cost-values tabular-nums">
                      <span className="pi-cost-dollar font-medium">{item.value}</span>
                      <span className="pi-cost-pct text-secondary">{item.pct}</span>
                    </div>
                  </div>
                  <div className="pi-cost-bar-bg">
                    <div className="pi-cost-bar-fill" style={{ width: item.pct, backgroundColor: item.color }}></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="pi-bento-findings pi-glass-card">
            <h2 className="pi-section-label" style={{ padding: '20px 20px 10px' }}>AI Findings</h2>
            <div className="pi-finding-card">
              <div className="pi-finding-header">
                <h3 className="pi-finding-title">Germany Margin Compression</h3>
                <span className="pi-finding-value text-danger font-bold tabular-nums">-$4,800/mo</span>
              </div>
              <p className="pi-finding-text">Root cause: Logistics (+16%) and Returns (+9%). Recommend +3% localized pricing adjustment.</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
