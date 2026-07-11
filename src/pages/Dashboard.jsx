import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowUpRight, ArrowDownRight, Minus, 
  Settings2, Download, Share2, MoreHorizontal,
  LayoutTemplate, Filter, Sparkles, Eye, EyeOff, GripHorizontal,
  Undo2, Redo2, Target, Sun
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  PieChart, Pie, Cell, 
  RadialBarChart, RadialBar, Legend,
  LineChart, Line
} from 'recharts';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import './Dashboard.css';

const COLORS = ['#0F766E', '#14B8A6', '#99F6E4', '#FCD34D', '#F59E0B'];

const DEFAULT_LAYOUT = {
  kpiRow: [
    { id: 'revenue', visible: true, title: 'Gross Revenue' },
    { id: 'profit', visible: true, title: 'Net Profit' },
    { id: 'recoverable_kpi', visible: true, title: 'Recoverable Profit' },
    { id: 'attention', visible: true, title: 'Attention Required' }
  ],
  middleRow: [
    { id: 'trajectory', visible: true, title: 'Profit & Revenue Trajectory' },
    { id: 'region', visible: true, title: 'Profit by Region' }
  ],
  bottomRow: [
    { id: 'health', visible: true, title: 'Margin Health' },
    { id: 'channel', visible: true, title: 'Sales by Channel' },
    { id: 'recoverable', visible: true, title: 'Recoverable Profit' }
  ]
};

// Sortable Wrapper Component
const SortableWidget = ({ id, widget, isEditMode, toggleVisibility, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id, disabled: !isEditMode });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    position: 'relative'
  };

  if (!isEditMode && !widget.visible) return null;

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`dash-v6-widget-container ${isDragging ? 'dash-v6-card-dragging' : ''} ${isEditMode && !widget.visible ? 'dash-v6-card-ghost' : ''} ${id === 'trajectory' ? 'dash-v6-trajectory' : ''} ${id === 'region' ? 'dash-v6-region' : ''}`}
    >
      {isEditMode && (
        <div className="dash-v6-edit-toolbar">
          <button 
            className="dash-v6-edit-btn dash-v6-drag-handle" 
            {...attributes} 
            {...listeners}
            title="Drag to move"
          >
            <GripHorizontal size={14} />
          </button>
          <div className="dash-v6-edit-divider"></div>
          <button 
            className="dash-v6-edit-btn" 
            onClick={(e) => { e.stopPropagation(); toggleVisibility(id); }}
            title={widget.visible ? "Hide Widget" : "Show Widget"}
          >
            {widget.visible ? <EyeOff size={14} className="text-danger" /> : <Eye size={14} className="text-success" />}
          </button>
        </div>
      )}
      {children}
    </div>
  );
};

export function Dashboard() {
  const navigate = useNavigate();

  const [layout, setLayout] = useState(DEFAULT_LAYOUT);
  const [isEditMode, setIsEditMode] = useState(false);
  const [history, setHistory] = useState([DEFAULT_LAYOUT]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [trajectoryPeriod, setTrajectoryPeriod] = useState('1Y');

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    const savedLayout = localStorage.getItem('pricepilot_dashboard_layout');
    if (savedLayout) {
      try { 
        const parsed = JSON.parse(savedLayout);
        setLayout(parsed); 
        setHistory([parsed]);
      } catch (e) {}
    }
  }, []);

  const saveLayout = (newLayout) => {
    // Truncate future history if we are not at the end
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newLayout);
    
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setLayout(newLayout);
    localStorage.setItem('pricepilot_dashboard_layout', JSON.stringify(newLayout));
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      const prevLayout = history[newIndex];
      setLayout(prevLayout);
      localStorage.setItem('pricepilot_dashboard_layout', JSON.stringify(prevLayout));
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      const nextLayout = history[newIndex];
      setLayout(nextLayout);
      localStorage.setItem('pricepilot_dashboard_layout', JSON.stringify(nextLayout));
    }
  };

  const handleToggleVisibility = (id) => {
    const newLayout = { ...layout };
    ['kpiRow', 'middleRow', 'bottomRow'].forEach(rowKey => {
      const idx = newLayout[rowKey].findIndex(w => w.id === id);
      if (idx !== -1) newLayout[rowKey][idx].visible = !newLayout[rowKey][idx].visible;
    });
    saveLayout(newLayout);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const newLayout = { ...layout };
    let rowKey = null;
    ['kpiRow', 'middleRow', 'bottomRow'].forEach(key => {
      if (newLayout[key].find(w => w.id === active.id)) rowKey = key;
    });

    if (rowKey) {
      const oldIndex = newLayout[rowKey].findIndex(w => w.id === active.id);
      const newIndex = newLayout[rowKey].findIndex(w => w.id === over.id);
      newLayout[rowKey] = arrayMove(newLayout[rowKey], oldIndex, newIndex);
      saveLayout(newLayout);
    }
  };

  // Mocks
  const getTrajectoryData = () => {
    switch (trajectoryPeriod) {
      case '1M':
        return [
          { name: 'Week 1', revenue: 8000, profit: 2500 },
          { name: 'Week 2', revenue: 9500, profit: 3100 },
          { name: 'Week 3', revenue: 9000, profit: 2800 },
          { name: 'Week 4', revenue: 11000, profit: 4200 },
        ];
      case '3Y':
        return [
          { name: '2022', revenue: 120000, profit: 45000 },
          { name: '2023', revenue: 154000, profit: 58000 },
          { name: '2024', revenue: 198000, profit: 82000 },
        ];
      case '1Y':
      default:
        return [
          { name: 'Jan', revenue: 32000, profit: 12000 },
          { name: 'Apr', revenue: 34000, profit: 11000 },
          { name: 'Jul', revenue: 41000, profit: 14000 },
          { name: 'Oct', revenue: 48000, profit: 16500 },
          { name: 'Dec', revenue: 52000, profit: 18000 },
        ];
    }
  };
  const regionData = [
    { country: 'United States', code: 'US', sessions: 634, percent: '38%', color: '#0F766E' },
    { country: 'United Kingdom', code: 'GB', sessions: 589, percent: '28%', color: '#14B8A6' },
  ];
  const radarData = [
    { subject: 'Europe', A: 2728, fullMark: 4000 },
    { subject: 'Americas', A: 2409, fullMark: 4000 },
    { subject: 'Africa', A: 3028, fullMark: 4000 },
    { subject: 'Middle East', A: 800, fullMark: 4000 },
    { subject: 'Pacific', A: 1838, fullMark: 4000 },
    { subject: 'Asia', A: 2843, fullMark: 4000 },
  ];
  const pieData = [
    { name: 'Amazon', value: 40, fill: '#94A3B8' }, // Adjusted to total 100%
    { name: 'Tokopedia', value: 25, fill: '#0F766E' },
    { name: 'Alibaba', value: 35, fill: '#F59E0B' },
  ];
  const radialData = [
    { name: 'Recoverable', value: 18200, fill: '#0F766E' },
    { name: 'Captured', value: 8500, fill: '#F59E0B' },
  ];
  
  const sparklineRevenue = [ { v: 10 }, { v: 15 }, { v: 12 }, { v: 22 }, { v: 18 }, { v: 25 }, { v: 32 } ];
  const sparklineProfit = [ { v: 5 }, { v: 8 }, { v: 6 }, { v: 12 }, { v: 10 }, { v: 14 }, { v: 10 } ];
  const attentionData = [
    { country: 'Germany', code: 'DE', issue: 'Margin Drop' },
    { country: 'United Kingdom', code: 'GB', issue: 'Tax Audit' },
    { country: 'France', code: 'FR', issue: 'Customs Delay' }
  ];

  const renderRadarCustomTick = ({ payload, x, y, cx, cy, ...rest }) => {
    const dataItem = radarData.find(d => d.subject === payload.value);
    
    const dx = x - cx;
    const dy = y - cy;
    const length = Math.sqrt(dx * dx + dy * dy);
    
    const extraOffset = 15;
    const offsetX = (dx / length) * extraOffset;
    const offsetY = (dy / length) * extraOffset;
    
    const finalX = x + offsetX;
    const finalY = y + offsetY - 8;

    return (
      <text {...rest} x={finalX} y={finalY} textAnchor="middle" className="dash-v6-radar-tick">
        <tspan x={finalX} dy="0" fill="var(--color-text-secondary)" fontSize="11">{payload.value}</tspan>
        <tspan x={finalX} dy="16" fill="var(--color-text-primary)" fontSize="13" fontWeight="bold">{dataItem ? dataItem.A.toLocaleString() : ''}</tspan>
      </text>
    );
  };

  const renderPieCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value, x, y, fill }) => {
    const isRight = x > cx;
    const textX = x + (isRight ? 8 : -8);
    return (
      <g>
        <text x={textX} y={y - 8} textAnchor={isRight ? 'start' : 'end'} dominantBaseline="central">
          <tspan x={textX} dy="0" fill="var(--color-text-secondary)" fontSize="11">{name}</tspan>
          <tspan x={textX} dy="16" fill="var(--color-text-primary)" fontSize="14" fontWeight="bold">{value}%</tspan>
        </text>
      </g>
    );
  };

  const renderKpi = (widget) => {
    if (widget.id === 'revenue' || widget.id === 'profit') {
      const isRevenue = widget.id === 'revenue';
      const title = isRevenue ? "Gross Revenue" : "Net Profit";
      const value = isRevenue ? "$32,839.99" : "$10,499.93";
      const trend = isRevenue ? 12.95 : -0.33;
      const isPositive = trend > 0;
      const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;
      const sparkData = isRevenue ? sparklineRevenue : sparklineProfit;
      const sparkColor = isPositive ? '#10B981' : '#F43F5E';

      return (
        <SortableWidget key={widget.id} id={widget.id} widget={widget} isEditMode={isEditMode} toggleVisibility={handleToggleVisibility}>
          <div className="dash-v6-kpi dash-v6-card dash-v6-kpi-sparkline">
            <div className="dash-v6-kpi-content">
              <div className="dash-v6-kpi-header">
                <h3 className="dash-v6-kpi-title">{title}</h3>
              </div>
              <div className="dash-v6-kpi-val">{value}</div>
              <div className={`dash-v6-kpi-trend-pill ${isPositive ? 'positive' : 'negative'}`}>
                <TrendIcon size={12} className="mr-1" />
                <span>{Math.abs(trend)}%</span>
              </div>
            </div>
            <div className="dash-v6-kpi-sparkline-chart">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sparkData}>
                  <Line type="monotone" dataKey="v" stroke={sparkColor} strokeWidth={2} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </SortableWidget>
      );
    }

    if (widget.id === 'recoverable_kpi') {
      return (
        <SortableWidget key={widget.id} id={widget.id} widget={widget} isEditMode={isEditMode} toggleVisibility={handleToggleVisibility}>
          <div className="dash-v6-kpi dash-v6-card dash-v6-kpi-signature">
            <div className="dash-v6-kpi-signature-content">
              <div className="dash-v6-signature-header">
                <Target size={16} className="dash-v6-signature-icon" />
                <span className="dash-v6-signature-label">Optimization Target</span>
              </div>
              <div className="dash-v6-signature-val">+$18,200<span style={{fontSize: '16px', color: 'var(--color-text-secondary)', fontWeight: 500}}>/mo</span></div>
            </div>
          </div>
        </SortableWidget>
      );
    }

    if (widget.id === 'attention') {
      return (
        <SortableWidget key={widget.id} id={widget.id} widget={widget} isEditMode={isEditMode} toggleVisibility={handleToggleVisibility}>
          <div className="dash-v6-kpi dash-v6-card dash-v6-kpi-attention">
            <div className="dash-v6-kpi-header">
              <h3 className="dash-v6-kpi-title">3 Critical Markets</h3>
            </div>
            <div className="dash-v6-attention-list">
              {attentionData.map((item, idx) => (
                <div key={idx} className="dash-v6-attention-item">
                  <img src={`https://flagcdn.com/w20/${item.code.toLowerCase()}.png`} alt={item.country} className="dash-v6-attention-flag" />
                  <span className="dash-v6-attention-issue">{item.issue}</span>
                </div>
              ))}
            </div>
          </div>
        </SortableWidget>
      );
    }

    return null;
  };

  const renderMiddle = (widget) => {
    if (widget.id === 'trajectory') {
      return (
        <SortableWidget key={widget.id} id={widget.id} widget={widget} isEditMode={isEditMode} toggleVisibility={handleToggleVisibility}>
          <div className="dash-v6-card">
            <div className="dash-v6-card-header">
              <div>
                <h2 className="dash-v6-card-title">Profit & Revenue Trajectory</h2>
                <div className="dash-v6-card-legends">
                  <div className="dash-v6-legend">
                    <span className="dash-v6-legend-dot" style={{backgroundColor: '#0F766E'}}></span>
                    <span>Total Revenue</span>
                  </div>
                  <div className="dash-v6-legend">
                    <span className="dash-v6-legend-dot" style={{backgroundColor: '#F59E0B'}}></span>
                    <span>Net Profit</span>
                  </div>
                </div>
              </div>
              {!isEditMode && (
                <div className="dash-v6-card-actions">
                  <div className="dash-v6-period-toggle">
                    {['1M', '1Y', '3Y'].map(p => (
                      <button 
                        key={p} 
                        className={`dash-v6-period-btn ${trajectoryPeriod === p ? 'active' : ''}`}
                        onClick={() => setTrajectoryPeriod(p)}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                  <button className="dash-v6-icon-btn"><Download size={16} /></button>
                  <button className="dash-v6-icon-btn"><MoreHorizontal size={16} /></button>
                </div>
              )}
            </div>
            <div className="dash-v6-chart-wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={getTrajectoryData()} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                  <CartesianGrid vertical={true} horizontal={false} stroke="var(--color-border)" opacity={0.3} strokeDasharray="3 3" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-secondary)', fontSize: 11 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-secondary)', fontSize: 11 }} dx={-10} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', borderRadius: '8px', boxShadow: 'var(--shadow-md)' }}
                    itemStyle={{ fontSize: '13px', fontWeight: 'bold' }}
                    labelStyle={{ color: 'var(--color-text-secondary)', fontSize: '12px', marginBottom: '4px' }}
                    formatter={(value) => [`$${value.toLocaleString()}`, undefined]}
                    itemSorter={(item) => -item.value}
                  />
                  <Area type="monotone" dataKey="revenue" name="Total Revenue" stroke="#0F766E" strokeWidth={2} fill="none" activeDot={{ r: 5, stroke: 'var(--color-surface)', strokeWidth: 2 }} />
                  <Area type="monotone" dataKey="profit" name="Net Profit" stroke="#F59E0B" strokeWidth={2} fill="none" activeDot={{ r: 5, stroke: 'var(--color-surface)', strokeWidth: 2 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </SortableWidget>
      );
    }
    if (widget.id === 'region') {
      return (
        <SortableWidget key={widget.id} id={widget.id} widget={widget} isEditMode={isEditMode} toggleVisibility={handleToggleVisibility}>
          <div className="dash-v6-card">
            <div className="dash-v6-card-header">
              <div>
                <h2 className="dash-v6-card-title">Profit by Region</h2>
                <p className="dash-v6-card-subtitle">Showing data for top regions</p>
              </div>
              {!isEditMode && <button className="dash-v6-icon-btn"><MoreHorizontal size={16} /></button>}
            </div>
            <div className="dash-v6-region-list">
              {regionData.map((region, idx) => (
                <div key={idx} className="dash-v6-region-item">
                  <div className="dash-v6-region-flag" style={{ padding: 0, overflow: 'hidden' }} title={region.country}>
                    <img 
                      src={`https://flagcdn.com/w40/${region.code.toLowerCase()}.png`} 
                      alt={region.country} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </div>
                  <div className="dash-v6-region-details">
                    <div className="dash-v6-region-info">
                      <span className="dash-v6-region-name">{region.country}</span>
                    </div>
                    <div className="dash-v6-progress-bg">
                      <div className="dash-v6-progress-fill" style={{width: region.percent, backgroundColor: region.color}}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SortableWidget>
      );
    }
    return null;
  };

  const renderBottom = (widget) => {
    const renderCard = (title, subtitle, content, footer) => (
      <SortableWidget key={widget.id} id={widget.id} widget={widget} isEditMode={isEditMode} toggleVisibility={handleToggleVisibility}>
        <div className="dash-v6-card">
          <div className="dash-v6-card-header">
            <div>
              <h2 className="dash-v6-card-title">{title}</h2>
              {subtitle && <p className="dash-v6-card-subtitle">{subtitle}</p>}
            </div>
            {!isEditMode && <button className="dash-v6-icon-btn"><MoreHorizontal size={16} /></button>}
          </div>
          <div className="dash-v6-chart-wrapper" style={{height: '240px'}}>
            {content}
          </div>
          {footer}
        </div>
      </SortableWidget>
    );

    if (widget.id === 'health') {
      return renderCard("Sales by Region", null, (
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
            <PolarGrid stroke="var(--color-border)" />
            <PolarAngleAxis dataKey="subject" tick={renderRadarCustomTick} />
            <RechartsTooltip 
              cursor={false}
              contentStyle={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', borderRadius: '8px', boxShadow: 'var(--shadow-md)' }}
              itemStyle={{ color: 'var(--color-text-primary)', fontSize: '13px', fontWeight: 'bold' }}
              labelStyle={{ color: 'var(--color-text-secondary)', fontSize: '12px', marginBottom: '4px' }}
              formatter={(value) => [value.toLocaleString(), 'Sales']}
            />
            <Radar 
              name="Sales" 
              dataKey="A" 
              stroke="#14B8A6" 
              strokeWidth={2} 
              fill="#14B8A6" 
              fillOpacity={0.15} 
              activeDot={{ r: 6, fill: '#14B8A6', stroke: 'var(--color-surface)', strokeWidth: 2 }}
            />
          </RadarChart>
        </ResponsiveContainer>
      ), null);
    }
    if (widget.id === 'channel') {
      return renderCard("Sales by e-commerce platform", null, (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            {/* Background Track Ring */}
            <Pie data={[{ value: 100 }]} cx="50%" cy="50%" innerRadius={40} outerRadius={70} fill="var(--color-border)" stroke="none" isAnimationActive={false} opacity={0.3} style={{ pointerEvents: 'none' }} />
            <Pie 
              data={pieData} 
              cx="50%" 
              cy="50%" 
              innerRadius={45} 
              outerRadius={65} 
              paddingAngle={2} 
              dataKey="value"
              label={renderPieCustomLabel}
              labelLine={{ stroke: 'var(--color-text-secondary)', strokeWidth: 1 }}
              stroke="var(--color-surface)"
              strokeWidth={2}
            >
              {pieData.map((entry, idx) => <Cell key={idx} fill={entry.fill} />)}
            </Pie>
            <RechartsTooltip 
              contentStyle={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', borderRadius: '8px', boxShadow: 'var(--shadow-md)' }}
              itemStyle={{ color: 'var(--color-text-primary)', fontSize: '13px', fontWeight: 'bold' }}
              labelStyle={{ color: 'var(--color-text-secondary)', fontSize: '12px', marginBottom: '4px' }}
              formatter={(value) => [`${value}%`, 'Sales']}
            />
          </PieChart>
        </ResponsiveContainer>
      ), null);
    }
    if (widget.id === 'recoverable') {
      return renderCard("Recoverable Profit", "An overview of potential profit", (
        <div className="dash-v6-radial-wrapper" style={{height: '100%'}}>
          <div className="dash-v6-radial-center">
            <Sparkles size={20} className="text-primary mb-2" />
            <div className="dash-v6-radial-val">$18,200</div>
            <div className="dash-v6-radial-label">Available Profit</div>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" barSize={12} data={radialData} startAngle={180} endAngle={0}>
              <RadialBar minAngle={15} background={{ fill: 'var(--color-background)' }} clockWise={true} dataKey="value" cornerRadius={10} />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      ), null);
    }
    return null;
  };

  return (
    <div className={`dash-v6-container ${isEditMode ? 'dash-v6-edit-mode-active' : ''}`}>
      
      {/* HEADER ROW - Hidden in Edit Mode */}
      {!isEditMode && (
        <div className="dash-v6-header" style={{ alignItems: 'flex-start', width: '100%' }}>
          <div className="dash-v6-executive-briefing" style={{ 
            position: 'relative',
            overflow: 'hidden',
            display: 'flex', alignItems: 'center', gap: '16px', 
            backgroundColor: 'rgba(20, 184, 166, 0.05)', 
            border: '1px solid rgba(20, 184, 166, 0.15)', 
            padding: '20px 24px', borderRadius: '12px', width: '100%' 
          }}>
            
            {/* Custom SVG Background - Extremely Subtle Financial Topography */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, pointerEvents: 'none' }}>
              <svg width="100%" height="100%" preserveAspectRatio="none" style={{ minWidth: '800px' }}>
                <defs>
                  <linearGradient id="fadeLeft" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#fff" stopOpacity="0" />
                    <stop offset="50%" stopColor="#fff" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#fff" stopOpacity="1" />
                  </linearGradient>
                  <mask id="bg-mask">
                    <rect width="100%" height="100%" fill="url(#fadeLeft)" />
                  </mask>
                </defs>

                <g mask="url(#bg-mask)">
                  {/* Flowing Topographic Contours */}
                  <path d="M 300 120 C 450 60 550 -40 800 40 C 1050 120 1150 20 1300 80" fill="none" stroke="#14b8a6" strokeWidth="0.5" opacity="0.04" />
                  <path d="M 330 120 C 480 65 580 -35 830 45 C 1080 125 1180 25 1330 85" fill="none" stroke="#14b8a6" strokeWidth="0.5" opacity="0.03" />
                  <path d="M 360 120 C 510 70 610 -30 860 50 C 1110 130 1210 30 1360 90" fill="none" stroke="#14b8a6" strokeWidth="0.5" opacity="0.02" />
                  <path d="M 390 120 C 540 75 640 -25 890 55 C 1140 135 1240 35 1390 95" fill="none" stroke="#14b8a6" strokeWidth="0.5" opacity="0.03" />
                  <path d="M 420 120 C 570 80 670 -20 920 60 C 1170 140 1270 40 1420 100" fill="none" stroke="#14b8a6" strokeWidth="0.5" opacity="0.04" />

                  {/* Faint Global Connection Paths */}
                  <path d="M 500 120 C 650 40 800 -20 1000 80" fill="none" stroke="#0f766e" strokeWidth="0.5" opacity="0.06" />
                  <path d="M 700 -20 C 850 60 950 140 1200 20" fill="none" stroke="#0f766e" strokeWidth="0.5" opacity="0.05" />
                </g>
              </svg>
            </div>

            <div style={{ position: 'relative', zIndex: 1, color: '#FCD34D', display: 'flex', alignItems: 'center' }}>
              <Sun size={24} />
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
                Good morning. Here's your daily briefing.
              </div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>
                Revenue is trending positively at <strong style={{color: '#10B981', fontWeight: 600}}>+12.9% MTD</strong>, though fulfillment costs continue to pressure European margins. Two optimization targets have been identified.
              </div>
            </div>
          </div>
        </div>
      )}

      {isEditMode && (
        <div className="dash-v6-edit-banner dash-v6-edit-banner-animated">
          <div className="dash-v6-edit-banner-left">
            <Settings2 size={14} className="text-primary mr-2" />
            <span>Edit Mode Active. Drag widgets by their grip handle to reorder, or click the eye icon to hide them.</span>
          </div>
          <div className="dash-v6-edit-banner-right">
            <span className="dash-v6-changes-count">{historyIndex} changes</span>
            <button 
              className="dash-v6-history-btn" 
              disabled={historyIndex === 0} 
              onClick={handleUndo}
              title="Undo"
            >
              <Undo2 size={14} />
            </button>
            <button 
              className="dash-v6-history-btn" 
              disabled={historyIndex === history.length - 1} 
              onClick={handleRedo}
              title="Redo"
            >
              <Redo2 size={14} />
            </button>
            <div className="dash-v6-edit-divider ml-2 mr-2"></div>
            <button 
              className="dash-v6-btn active" 
              onClick={() => setIsEditMode(false)}
            >
              <LayoutTemplate size={14} className="mr-2" />
              Finish Editing
            </button>
          </div>
        </div>
      )}

      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        {/* KPI ROW */}
        <SortableContext items={layout.kpiRow.map(w => w.id)} strategy={horizontalListSortingStrategy}>
          <div className="dash-v6-kpi-grid">
            {layout.kpiRow.map(widget => renderKpi(widget))}
          </div>
        </SortableContext>

        {/* MIDDLE ROW */}
        <SortableContext items={layout.middleRow.map(w => w.id)} strategy={horizontalListSortingStrategy}>
          <div className="dash-v6-middle-row">
            {layout.middleRow.map(widget => renderMiddle(widget))}
          </div>
        </SortableContext>

        {/* BOTTOM ROW */}
        <SortableContext items={layout.bottomRow.map(w => w.id)} strategy={horizontalListSortingStrategy}>
          <div className="dash-v6-bottom-row">
            {layout.bottomRow.map(widget => renderBottom(widget))}
          </div>
        </SortableContext>
      </DndContext>
      
    </div>
  );
}
