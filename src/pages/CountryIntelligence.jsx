import React, { useState } from 'react';
import { 
  Globe, TrendingUp, AlertTriangle, ArrowUpRight, ArrowDownRight, 
  MapPin, Activity, CheckCircle2, Search, Filter, ShieldAlert, Plus, Minus
} from 'lucide-react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { Card, CardContent } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import './CountryIntelligence.css';

const COUNTRY_DATA = [
  { id: 'US', name: 'United States', revenue: 425000, margin: 26.5, returnRate: 8.2, status: 'optimal', growth: '+14.2%', coord: [-95.7129, 37.0902] },
  { id: 'UK', name: 'United Kingdom', revenue: 184000, margin: 22.1, returnRate: 12.4, status: 'warning', growth: '+4.1%', coord: [-3.4359, 55.3781] },
  { id: 'DE', name: 'Germany', revenue: 215000, margin: 19.8, returnRate: 18.5, status: 'critical', growth: '-2.4%', coord: [10.4515, 51.1657] },
  { id: 'FR', name: 'France', revenue: 142000, margin: 24.2, returnRate: 9.1, status: 'optimal', growth: '+8.7%', coord: [2.2137, 46.2276] },
  { id: 'AU', name: 'Australia', revenue: 98000, margin: 28.4, returnRate: 5.2, status: 'optimal', growth: '+22.5%', coord: [133.7751, -25.2744] },
];

const INSIGHTS = [
  { country: 'Germany', type: 'danger', message: 'Return rates spiked to 18.5%. Consider revising apparel sizing charts for DE market.', icon: ShieldAlert },
  { country: 'Australia', type: 'success', message: 'Shipping costs dropped by 12%. Profit margins are at all-time highs. Scale ad spend.', icon: TrendingUp },
  { country: 'UK', type: 'warning', message: 'Customs delays averaging 4.2 days. Expect slight drop in CSAT scores this week.', icon: AlertTriangle },
];

export function CountryIntelligence() {
  const [activeCountry, setActiveCountry] = useState(null);
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

  const activeCountryData = COUNTRY_DATA.find(c => c.id === activeCountry);

  const handleZoomIn = () => {
    if (position.zoom >= 8) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 1.5 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 1.5 }));
  };

  const handleMoveEnd = (position) => {
    setPosition(position);
  };

  return (
    <div className="ci-layout">
      {/* HEADER */}
      <header className="ci-header">
        <div>
          <h1 className="ci-title">Global Market Intelligence</h1>
          <p className="ci-subtitle">Monitor cross-border profitability, shipping friction, and regional growth.</p>
        </div>
        <div className="ci-header-actions">
          <Button variant="secondary"><Filter size={16} style={{ marginRight: '8px' }} /> Filter Regions</Button>
          <div className="ci-search-box">
            <Search size={16} className="ci-search-icon" />
            <input type="text" placeholder="Search country..." className="ci-search-input" />
          </div>
        </div>
      </header>

      {/* TOP ROW: MAP + INSIGHTS */}
      <div className="ci-top-section">
        {/* MAP CARD */}
        <Card className="ci-glass-card ci-map-card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <CardContent style={{ padding: 0, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="ci-map-header">
              <h3 className="ci-section-title"><Globe size={18} style={{ marginRight: '8px' }} /> Live Profit Heatmap</h3>
              <div className="ci-map-legend">
                <span className="ci-legend-item"><span className="ci-dot optimal"></span> Optimal</span>
                <span className="ci-legend-item"><span className="ci-dot warning"></span> Friction</span>
                <span className="ci-legend-item"><span className="ci-dot critical"></span> Critical Risk</span>
              </div>
            </div>
            
            <div className="ci-map-container" style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
              <ComposableMap projection="geoMercator" projectionConfig={{ scale: 140 }} style={{ width: '100%', height: '100%', outline: 'none' }}>
                <ZoomableGroup 
                  zoom={position.zoom} 
                  center={position.coordinates} 
                  onMoveEnd={handleMoveEnd}
                  maxZoom={8}
                >
                  <Geographies geography="/features.json">
                    {({ geographies }) =>
                      geographies.map((geo) => (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill="rgba(255, 255, 255, 0.04)"
                          stroke="rgba(255, 255, 255, 0.1)"
                          strokeWidth={0.5 / position.zoom}
                          style={{
                            default: { outline: "none" },
                            hover: { outline: "none", fill: "rgba(255, 255, 255, 0.08)" },
                            pressed: { outline: "none" },
                          }}
                        />
                      ))
                    }
                  </Geographies>
                  {COUNTRY_DATA.map(country => (
                    <Marker key={country.id} coordinates={country.coord}>
                      <g 
                        className={`ci-map-marker-svg ${country.status} ${activeCountry === country.id ? 'active' : ''}`}
                        onMouseEnter={() => setActiveCountry(country.id)}
                        onMouseLeave={() => setActiveCountry(null)}
                        style={{ cursor: 'pointer' }}
                      >
                        <circle r={14 / position.zoom} className="ci-marker-pulse-svg" fill="none" />
                        <circle r={4 / position.zoom} className="ci-marker-core-svg" />
                      </g>
                    </Marker>
                  ))}
                </ZoomableGroup>
              </ComposableMap>
              
              {/* Zoom Controls */}
              <div className="ci-map-controls">
                <button onClick={handleZoomIn} className="ci-map-control-btn"><Plus size={16} /></button>
                <button onClick={handleZoomOut} className="ci-map-control-btn"><Minus size={16} /></button>
              </div>

              {/* Map Info Panel */}
              <div className={`ci-map-info-panel ${activeCountryData ? 'visible' : ''}`}>
                {activeCountryData && (
                  <>
                    <div className="ci-tooltip-header">
                      <span className="ci-tooltip-title">{activeCountryData.name}</span>
                      <Badge variant={activeCountryData.status === 'optimal' ? 'success' : activeCountryData.status === 'warning' ? 'warning' : 'danger'}>
                        {activeCountryData.status}
                      </Badge>
                    </div>
                    <div className="ci-tooltip-body">
                      <div className="ci-tooltip-row">
                        <span>Revenue:</span>
                        <span className="tabular-nums font-semibold">${(activeCountryData.revenue/1000).toFixed(1)}k</span>
                      </div>
                      <div className="ci-tooltip-row">
                        <span>Margin:</span>
                        <span className="tabular-nums font-semibold">{activeCountryData.margin}%</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI INSIGHTS SIDEBAR */}
        <div className="ci-insights-sidebar">
          <Card className="ci-glass-card h-full">
            <CardContent style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <h3 className="ci-section-title" style={{ marginBottom: '24px', flexShrink: 0 }}>
                <Activity size={18} style={{ marginRight: '8px' }} /> Active Insights
              </h3>
              
              <div className="ci-insights-list" style={{ flex: 1, overflowY: 'auto', paddingRight: '4px', minHeight: 0 }}>
                {INSIGHTS.map((insight, idx) => (
                  <div key={idx} className={`ci-insight-card ${insight.type}`}>
                    <div className="ci-insight-icon">
                      <insight.icon size={16} />
                    </div>
                    <div className="ci-insight-content">
                      <span className="ci-insight-country">{insight.country}</span>
                      <p className="ci-insight-message">{insight.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* DATA TABLE */}
      <Card className="ci-glass-card mt-6">
        <div className="ci-table-header">
          <h3 className="ci-section-title"><MapPin size={18} style={{ marginRight: '8px' }} /> Regional Performance Breakdown</h3>
        </div>
        <div className="ci-table-container">
          <table className="ci-data-table">
            <thead>
              <tr>
                <th>Country</th>
                <th>Monthly Revenue</th>
                <th>Profit Margin</th>
                <th>Return Rate</th>
                <th>MoM Growth</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {COUNTRY_DATA.map((row) => (
                <tr 
                  key={row.id} 
                  className={activeCountry === row.id ? 'ci-row-hover' : ''}
                  onMouseEnter={() => setActiveCountry(row.id)}
                  onMouseLeave={() => setActiveCountry(null)}
                >
                  <td className="font-medium">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div className={`ci-table-dot ${row.status}`}></div>
                      {row.name}
                    </div>
                  </td>
                  <td className="tabular-nums">${row.revenue.toLocaleString()}</td>
                  <td className="tabular-nums">
                    <span className={row.margin > 23 ? 'text-success' : row.margin < 20 ? 'text-danger' : ''}>
                      {row.margin}%
                    </span>
                  </td>
                  <td className="tabular-nums">
                    <span className={row.returnRate > 15 ? 'text-danger' : row.returnRate < 10 ? 'text-success' : 'text-warning'}>
                      {row.returnRate}%
                    </span>
                  </td>
                  <td className="tabular-nums">
                    <span className={row.growth.startsWith('+') ? 'text-success' : 'text-danger'} style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                      {row.growth.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                      {row.growth}
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
