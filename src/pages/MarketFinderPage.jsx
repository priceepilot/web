import React from 'react';
import { 
  Globe2, Target, DollarSign, Sparkles, Map, 
  ArrowRight, TrendingUp, BarChart3, AlertCircle 
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, Tooltip 
} from 'recharts';
import './MarketFinderPage.css';

// --- MOCK DATA ---
const radarData = [
  { subject: 'Demand', A: 95, B: 75, fullMark: 100 },
  { subject: 'Competition', A: 30, B: 85, fullMark: 100 }, // Lower is better for entry, but charting as absolute
  { subject: 'Logistics Cost', A: 45, B: 60, fullMark: 100 },
  { subject: 'Import Ease', A: 85, B: 55, fullMark: 100 },
  { subject: 'Expected Margin', A: 90, B: 65, fullMark: 100 },
  { subject: 'Market Size', A: 75, B: 95, fullMark: 100 },
];

const topOpportunities = [
  { id: '1', country: 'Japan', flag: '🇯🇵', score: 92, demand: 88, competition: 35 },
  { id: '2', country: 'Brazil', flag: '🇧🇷', score: 85, demand: 92, competition: 45 },
  { id: '3', country: 'South Korea', flag: '🇰🇷', score: 81, demand: 75, competition: 60 },
  { id: '4', country: 'Mexico', flag: '🇲🇽', score: 78, demand: 85, competition: 55 },
];

const marketComparisonData = [
  { country: 'Japan', flag: '🇯🇵', logistics: 'High', tax: '5%', margin: '42%', match: 'High' },
  { country: 'Brazil', flag: '🇧🇷', logistics: 'Medium', tax: '12%', margin: '38%', match: 'High' },
  { country: 'South Korea', flag: '🇰🇷', logistics: 'Medium', tax: '8%', margin: '35%', match: 'Medium' },
  { country: 'Mexico', flag: '🇲🇽', logistics: 'Low', tax: '15%', margin: '31%', match: 'Medium' },
  { country: 'India', flag: '🇮🇳', logistics: 'High', tax: '18%', margin: '22%', match: 'Low' },
];

export function MarketFinderPage() {
  return (
    <div className="mf-dashboard">
      
      <header className="mf-header">
        <h1 className="mf-title">Market Finder AI</h1>
        <p className="mf-subtitle">Discover high-margin expansion opportunities based on global demand and competitor gaps.</p>
      </header>

      {/* ROW 1: TOP METRICS */}
      <div className="mf-metrics-grid">
        <div className="mf-card mf-metric-card">
          <div className="mf-metric-header">
            <span className="mf-metric-title">Analyzed Markets</span>
            <div className="mf-metric-icon"><Globe2 size={16} /></div>
          </div>
          <div className="mf-metric-value">48</div>
          <div className="mf-metric-trend mf-trend-neutral">Global regions scanned</div>
        </div>
        
        <div className="mf-card mf-metric-card">
          <div className="mf-metric-header">
            <span className="mf-metric-title">High Potential</span>
            <div className="mf-metric-icon"><Target size={16} /></div>
          </div>
          <div className="mf-metric-value">4</div>
          <div className="mf-metric-trend mf-trend-positive">Markets match criteria</div>
        </div>
        
        <div className="mf-card mf-metric-card">
          <div className="mf-metric-header">
            <span className="mf-metric-title">Avg Entry Cost</span>
            <div className="mf-metric-icon"><DollarSign size={16} /></div>
          </div>
          <div className="mf-metric-value">$12.5k</div>
          <div className="mf-metric-trend mf-trend-neutral">Estimated initial ad spend</div>
        </div>
        
        <div className="mf-card mf-metric-card">
          <div className="mf-metric-header">
            <span className="mf-metric-title">Recommended</span>
            <div className="mf-metric-icon"><Sparkles size={16} /></div>
          </div>
          <div className="mf-metric-value">Japan</div>
          <div className="mf-metric-trend mf-trend-positive">92% Match Score</div>
        </div>
      </div>

      {/* ROW 2: AI RECOMMENDATION */}
      <div className="mf-ai-panel">
        <div className="mf-ai-content">
          <span className="mf-ai-badge"><Sparkles size={14} /> AI Top Recommendation</span>
          <h2 className="mf-ai-heading">Expand to Japan (🇯🇵)</h2>
          <p className="mf-ai-desc">
            Based on our analysis of your product catalog, there is a severe lack of premium tech accessories in the Japanese localized market. Search volume for your top 5 keywords is up 45% YoY in Tokyo, while CPC (Cost Per Click) remains 30% lower than the US market. Expected profit margins post-logistics sit at a highly lucrative 42%.
          </p>
          <div className="mf-ai-stats">
            <div className="mf-ai-stat">
              <span className="mf-ai-stat-label">Expected ROI</span>
              <span className="mf-ai-stat-value">3.2x</span>
            </div>
            <div className="mf-ai-stat">
              <span className="mf-ai-stat-label">Competitor Density</span>
              <span className="mf-ai-stat-value" style={{ color: '#8B5CF6' }}>Low</span>
            </div>
            <div className="mf-ai-stat">
              <span className="mf-ai-stat-label">Time to Profit</span>
              <span className="mf-ai-stat-value" style={{ color: '#F59E0B' }}>45 Days</span>
            </div>
          </div>
        </div>
        <div className="mf-ai-action">
          <button className="mf-btn-primary">
            Build Launch Plan <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* ROW 3: OPPORTUNITY CARDS & RADAR */}
      <div className="mf-main-grid">
        
        {/* Top Opportunities Grid */}
        <div className="mf-card">
          <h3 className="mf-card-title"><Map size={18} style={{ marginRight: '8px' }} /> Top Opportunity Targets</h3>
          <div className="mf-opp-grid">
            {topOpportunities.map(opp => (
              <div key={opp.id} className="mf-opp-card">
                <div className="mf-opp-header">
                  <div className="mf-opp-country">
                    <span className="mf-opp-flag">{opp.flag}</span>
                    <span className="mf-opp-name">{opp.country}</span>
                  </div>
                  <div className="mf-opp-score">{opp.score}</div>
                </div>
                
                <div className="mf-opp-bars">
                  <div className="mf-opp-bar-group">
                    <div className="mf-opp-bar-labels">
                      <span>Market Demand</span>
                      <span style={{ color: '#10B981' }}>{opp.demand}/100</span>
                    </div>
                    <div className="mf-opp-bar-track">
                      <div className="mf-opp-bar-fill" style={{ width: `${opp.demand}%`, backgroundColor: '#10B981' }}></div>
                    </div>
                  </div>
                  
                  <div className="mf-opp-bar-group">
                    <div className="mf-opp-bar-labels">
                      <span>Competition (Lower is better)</span>
                      <span style={{ color: '#8B5CF6' }}>{opp.competition}/100</span>
                    </div>
                    <div className="mf-opp-bar-track">
                      <div className="mf-opp-bar-fill" style={{ width: `${opp.competition}%`, backgroundColor: '#8B5CF6' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Radar Chart Comparison */}
        <div className="mf-card">
          <h3 className="mf-card-title"><BarChart3 size={18} style={{ marginRight: '8px' }} /> Japan vs Global Avg</h3>
          <div className="mf-radar-container">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--color-text-secondary)', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Japan" dataKey="A" stroke="#10B981" fill="#10B981" fillOpacity={0.4} />
                <Radar name="Global Average" dataKey="B" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.2} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15,23,42,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff', fontSize: '12px' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }}></div> Japan</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#8B5CF6' }}></div> Global Avg</span>
          </div>
        </div>
      </div>

      {/* ROW 4: DEEP DIVE TABLE */}
      <div className="mf-card">
        <h3 className="mf-card-title"><AlertCircle size={18} style={{ marginRight: '8px' }} /> Market Deep-Dive Comparison</h3>
        <div className="mf-table-container">
          <table className="mf-table">
            <thead>
              <tr>
                <th>Target Market</th>
                <th>Avg Logistics Cost</th>
                <th>Estimated Import Tax</th>
                <th>Expected Margin</th>
                <th>Match Quality</th>
              </tr>
            </thead>
            <tbody>
              {marketComparisonData.map((market, idx) => (
                <tr key={idx}>
                  <td>
                    <div className="mf-country-cell">
                      <span style={{ fontSize: '1.25rem' }}>{market.flag}</span>
                      <span style={{ fontWeight: '600' }}>{market.country}</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--color-text-secondary)' }}>{market.logistics}</td>
                  <td style={{ color: 'var(--color-text-secondary)' }}>{market.tax}</td>
                  <td style={{ fontWeight: '600', color: parseInt(market.margin) > 40 ? '#10B981' : 'inherit' }}>{market.margin}</td>
                  <td>
                    <span className={`mf-badge mf-badge-${market.match.toLowerCase()}`}>
                      {market.match} Match
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
