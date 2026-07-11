import React, { useState } from 'react';
import { 
  TrendingUp, Calendar, Filter, Download, Zap, Activity, 
  Target, AlertTriangle, ArrowUpRight, BarChart3, Clock, RefreshCw, Sparkles
} from 'lucide-react';
import { 
  ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Legend, Bar
} from 'recharts';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import './Forecasting.css';

const FORECAST_DATA = [
  { month: 'Jan', actual: 125000, forecast: null, lower: null, upper: null },
  { month: 'Feb', actual: 132000, forecast: null, lower: null, upper: null },
  { month: 'Mar', actual: 128000, forecast: null, lower: null, upper: null },
  { month: 'Apr', actual: 145000, forecast: null, lower: null, upper: null },
  { month: 'May', actual: 152000, forecast: 152000, lower: 152000, upper: 152000 }, // Current month
  { month: 'Jun', actual: null, forecast: 165000, lower: 155000, upper: 175000 },
  { month: 'Jul', actual: null, forecast: 178000, lower: 162000, upper: 192000 },
  { month: 'Aug', actual: null, forecast: 185000, lower: 165000, upper: 205000 },
  { month: 'Sep', actual: null, forecast: 205000, lower: 180000, upper: 230000 },
  { month: 'Oct', actual: null, forecast: 220000, lower: 190000, upper: 250000 },
];

const SCENARIO_DATA = [
  { metric: 'Baseline', value: '$1.1M', growth: '+14%', color: 'var(--color-primary)' },
  { metric: 'Aggressive Expansion', value: '$1.4M', growth: '+35%', color: 'var(--color-success)' },
  { metric: 'Conservative (Recession)', value: '$950k', growth: '-2%', color: 'var(--color-danger)' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="fc-tooltip-glass">
        <p className="fc-tooltip-label">{label}</p>
        {payload.map((entry, index) => {
          if (entry.value == null) return null;
          let name = entry.name;
          if (name === 'lower' || name === 'upper') return null; // Hide raw bounds if needed
          return (
            <p key={index} className="fc-tooltip-item" style={{ color: entry.color }}>
              <span className="fc-tooltip-name">{name.charAt(0).toUpperCase() + name.slice(1)}:</span>
              <span className="fc-tooltip-value tabular-nums">${entry.value.toLocaleString()}</span>
            </p>
          );
        })}
      </div>
    );
  }
  return null;
};

export function Forecasting() {
  const [horizon, setHorizon] = useState('6M');
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      alert("Simulation configuration applied successfully!");
    }, 2000);
  };

  const getFilteredData = () => {
    if (horizon === '3M') return FORECAST_DATA.slice(-3);
    if (horizon === '6M') return FORECAST_DATA.slice(-6);
    return FORECAST_DATA; // 1Y (all 10 months)
  };

  return (
    <div className="fc-layout">
      
      {/* HEADER */}
      <header className="fc-header">
        <div>
          <h1 className="fc-title">Demand & Profit Forecasting</h1>
          <p className="fc-subtitle">AI-powered predictive models based on historical trends and macroeconomic indicators.</p>
        </div>
        <div className="fc-header-actions">
          <div className="fc-pill-selector">
            <button className={horizon === '3M' ? 'active' : ''} onClick={() => setHorizon('3M')}>3M</button>
            <button className={horizon === '6M' ? 'active' : ''} onClick={() => setHorizon('6M')}>6M</button>
            <button className={horizon === '1Y' ? 'active' : ''} onClick={() => setHorizon('1Y')}>1Y</button>
          </div>
          <Button variant="secondary"><Filter size={16} style={{ marginRight: '8px' }} /> Filter Model</Button>
          <Button variant="primary" onClick={() => alert("Report downloaded!")}><Download size={16} style={{ marginRight: '8px' }} /> Export Report</Button>
        </div>
      </header>

      {/* KPI GRID */}
      <div className="fc-kpi-grid">
        <Card className="fc-glass-card">
          <CardContent className="fc-kpi-content">
            <div className="fc-kpi-top">
              <span className="fc-kpi-label">Projected Q3 Revenue</span>
              <Target size={16} className="text-secondary" />
            </div>
            <div className="fc-kpi-main">
              <span className="fc-kpi-val tabular-nums">$528,450</span>
            </div>
            <div className="fc-kpi-bottom">
              <span className="fc-kpi-trend text-success"><ArrowUpRight size={14} /> +22.4%</span>
              <span className="fc-kpi-context">vs previous quarter</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="fc-glass-card">
          <CardContent className="fc-kpi-content">
            <div className="fc-kpi-top">
              <span className="fc-kpi-label">Forecasted Margin</span>
              <TrendingUp size={16} className="text-secondary" />
            </div>
            <div className="fc-kpi-main">
              <span className="fc-kpi-val tabular-nums">24.8%</span>
            </div>
            <div className="fc-kpi-bottom">
              <span className="fc-kpi-trend text-success"><ArrowUpRight size={14} /> +1.2%</span>
              <span className="fc-kpi-context">efficiency gain</span>
            </div>
          </CardContent>
        </Card>

        <Card className="fc-glass-card">
          <CardContent className="fc-kpi-content">
            <div className="fc-kpi-top">
              <span className="fc-kpi-label">Model Confidence</span>
              <Activity size={16} className="text-secondary" />
            </div>
            <div className="fc-kpi-main">
              <span className="fc-kpi-val tabular-nums">94.2%</span>
            </div>
            <div className="fc-kpi-bottom">
              <span className="fc-kpi-trend text-secondary">High Accuracy</span>
              <span className="fc-kpi-context">based on 30d backtest</span>
            </div>
          </CardContent>
        </Card>

        <Card className="fc-glass-card">
          <CardContent className="fc-kpi-content">
            <div className="fc-kpi-top">
              <span className="fc-kpi-label">Active Risks</span>
              <AlertTriangle size={16} className="text-secondary" />
            </div>
            <div className="fc-kpi-main">
              <span className="fc-kpi-val tabular-nums">2</span>
            </div>
            <div className="fc-kpi-bottom">
              <span className="fc-kpi-trend text-danger">EU Shipping Delays</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* MAIN CHART AREA */}
      <div className="fc-main-section">
        <Card className="fc-glass-card fc-chart-card" style={{ height: '100%' }}>
          <CardContent style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="fc-chart-header">
              <h3 className="fc-section-title">
                <BarChart3 size={18} style={{ marginRight: '8px' }} /> Revenue Trajectory (Actual vs Forecast)
              </h3>
              <Badge variant="primary" className="glow-badge">
                <Sparkles size={12} className="fc-badge-icon" style={{ marginRight: '6px' }} /> AI Forecast Model
              </Badge>
            </div>
            
            <div className="fc-chart-container" style={{ flex: 1, minHeight: '350px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={getFilteredData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                    </linearGradient>
                    <pattern id="diagonalHatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                      <line x1="0" y1="0" x2="0" y2="8" stroke="var(--color-primary)" strokeWidth="2" strokeOpacity="0.2" />
                    </pattern>
                  </defs>
                  
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--color-text-secondary)" tick={{fill: 'var(--color-text-secondary)', fontSize: 12}} axisLine={false} tickLine={false} />
                  <YAxis stroke="var(--color-text-secondary)" tick={{fill: 'var(--color-text-secondary)', fontSize: 12}} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                  
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '4 4' }} />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  
                  {/* Confidence Interval Area */}
                  <Area type="monotone" dataKey="upper" stroke="none" fill="url(#diagonalHatch)" legendType="none" />
                  <Area type="monotone" dataKey="lower" stroke="none" fill="var(--color-background)" legendType="none" />
                  
                  {/* Actual Data */}
                  <Line type="monotone" dataKey="actual" name="Historical Actuals" stroke="#ffffff" strokeWidth={3} dot={{ r: 4, fill: '#ffffff', strokeWidth: 0 }} activeDot={{ r: 6 }} />
                  
                  {/* Forecast Data */}
                  <Line type="monotone" dataKey="forecast" name="AI Forecast" stroke="var(--color-primary)" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 4, fill: 'var(--color-primary)', strokeWidth: 0 }} activeDot={{ r: 6 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* RIGHT SIDEBAR - SCENARIOS & DRIVERS */}
        <div className="fc-scenario-sidebar">
          <Card className="fc-glass-card h-full">
            <CardContent>
              <h3 className="fc-section-title" style={{ fontSize: '1rem', marginBottom: '24px' }}>
                <Target size={16} style={{ marginRight: '8px' }} /> Macro Scenarios
              </h3>
              
              <div className="fc-scenario-list">
                {SCENARIO_DATA.map((scenario, idx) => (
                  <div key={idx} className="fc-scenario-item">
                    <div className="fc-scenario-header">
                      <span className="fc-scenario-name">{scenario.metric}</span>
                      <span className="fc-scenario-growth" style={{ color: scenario.color }}>{scenario.growth}</span>
                    </div>
                    <div className="fc-scenario-value tabular-nums">{scenario.value}</div>
                    <div className="fc-scenario-bar-bg">
                      <div className="fc-scenario-bar-fill" style={{ width: idx === 1 ? '100%' : (idx === 0 ? '75%' : '60%'), background: scenario.color }}></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="fc-divider"></div>

              <h3 className="fc-section-title" style={{ fontSize: '1rem', marginBottom: '16px' }}>
                <Activity size={16} style={{ marginRight: '8px' }} /> Key Drivers
              </h3>
              <div className="fc-drivers-list">
                 <div className="fc-driver-item">
                    <span className="fc-driver-label">Seasonality Impact</span>
                    <span className="fc-driver-val text-success">+14%</span>
                 </div>
                 <div className="fc-driver-item">
                    <span className="fc-driver-label">Ad Spend Efficiency</span>
                    <span className="fc-driver-val text-success">+6%</span>
                 </div>
                 <div className="fc-driver-item">
                    <span className="fc-driver-label">Currency FX (EUR/USD)</span>
                    <span className="fc-driver-val text-danger">-2.4%</span>
                 </div>
              </div>

              <div style={{ marginTop: '32px' }}>
                <Button 
                  variant="secondary" 
                  onClick={handleSimulate}
                  disabled={isSimulating}
                  style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}
                >
                  {isSimulating ? (
                    <RefreshCw size={14} className="fc-spin" style={{ marginRight: '8px' }} />
                  ) : (
                    <Clock size={14} style={{ marginRight: '8px' }} />
                  )}
                  {isSimulating ? 'Running Simulation...' : 'Configure Simulation'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* DATA TABLE */}
      <Card className="fc-glass-card mt-6">
        <div className="fc-table-header">
          <h3 className="fc-section-title" style={{ fontSize: '1rem' }}>Forecast Breakdown</h3>
        </div>
        <div className="fc-table-container">
          <table className="fc-data-table">
            <thead>
              <tr>
                <th>Period</th>
                <th>Actual Revenue</th>
                <th>AI Forecast</th>
                <th>Lower Bound</th>
                <th>Upper Bound</th>
                <th>Variance / YoY</th>
              </tr>
            </thead>
            <tbody>
              {FORECAST_DATA.map((row, i) => (
                <tr key={i} className={row.actual === null ? 'fc-row-forecast' : ''}>
                  <td className="font-medium">{row.month} 2024</td>
                  <td className="tabular-nums">{row.actual ? `$${row.actual.toLocaleString()}` : '-'}</td>
                  <td className="tabular-nums font-semibold" style={{ color: row.forecast && !row.actual ? 'var(--color-primary)' : 'inherit' }}>
                    {row.forecast ? `$${row.forecast.toLocaleString()}` : '-'}
                  </td>
                  <td className="tabular-nums text-secondary">{row.lower ? `$${row.lower.toLocaleString()}` : '-'}</td>
                  <td className="tabular-nums text-secondary">{row.upper ? `$${row.upper.toLocaleString()}` : '-'}</td>
                  <td className="tabular-nums">
                    {row.actual ? <span className="text-success">+12% YoY</span> : <span className="text-secondary">Projected</span>}
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
