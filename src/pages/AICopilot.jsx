import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { 
  Search, Pin, Clock, Play, ArrowRight, CheckCircle2, AlertCircle, TrendingDown,
  TrendingUp, Download, Share, Link as LinkIcon, Bookmark, Mic, Paperclip, FileText,
  Upload, ArrowDownRight, ArrowUpRight, BarChart3, Globe, Plus, User, Bot, MessageSquarePlus
} from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import './AICopilot.css';

const THINKING_MESSAGES = [
  "Analyzing profitability...",
  "Reviewing order history...",
  "Checking FX exposure...",
  "Calculating shipping impact...",
  "Building recommendations..."
];

const MINI_CHART_DATA = [
  { name: 'W1', value: 12 },
  { name: 'W2', value: 18 },
  { name: 'W3', value: 15 },
  { name: 'W4', value: 24 },
  { name: 'W5', value: 20 },
  { name: 'W6', value: 28 },
];

const EXPANSION_CHART_DATA = [
  { name: 'FR', value: 45 },
  { name: 'IT', value: 30 },
  { name: 'ES', value: 25 },
  { name: 'NL', value: 60 },
  { name: 'SE', value: 35 },
];

const HISTORY_GROUPS = [
  {
    title: 'Pinned',
    icon: Pin,
    items: ['Q2 Global Profit Review', 'France Expansion Strategy']
  },
  {
    title: 'Today',
    items: ['Germany Margin Compression', 'USA Ad Spend ROI']
  },
  {
    title: 'Yesterday',
    items: ['Shipping Cost Increases', 'UK Return Rates vs Average']
  },
  {
    title: 'Last Week',
    items: ['Netherlands Market Sizing', 'FX Impact on EUR', 'Q1 Forecasting Model']
  }
];

const SHIPPING_CHART_DATA = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 550 },
  { name: 'Thu', value: 450 },
  { name: 'Fri', value: 600 },
];

const RETURNS_PIE_DATA = [
  { name: 'Fit issues', value: 400 },
  { name: 'Changed mind', value: 300 },
  { name: 'Defective', value: 100 },
];
const COLORS = ['var(--color-primary)', 'var(--color-warning)', 'var(--color-danger)'];

export function AICopilot() {
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingIndex, setThinkingIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [activeSidebarItem, setActiveSidebarItem] = useState('');
  const [historySearchQuery, setHistorySearchQuery] = useState('');
  const [attachedFile, setAttachedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);
  const originalInputRef = useRef('');

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isThinking]);

  // Initialize Web Speech API
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        console.log('Voice recording started');
        setIsRecording(true);
      };

      recognition.onresult = (event) => {
        console.log('Voice result received', event.results);
        let transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        
        const baseInput = originalInputRef.current.trim();
        setInputValue(baseInput ? `${baseInput} ${transcript}` : transcript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  // Handle thinking state rotation
  useEffect(() => {
    let interval;
    if (isThinking) {
      interval = setInterval(() => {
        setThinkingIndex((prev) => (prev + 1) % THINKING_MESSAGES.length);
      }, 1000);
      
      // Simulate finish thinking after 2.5s
      setTimeout(() => {
        setIsThinking(false);
        setMessages(prev => {
          const types = ['margin_widget', 'expansion_widget', 'shipping_widget', 'returns_widget', 'text_widget'];
          const randomType = types[Math.floor(Math.random() * types.length)];
          return [...prev, { 
            role: 'ai', 
            type: randomType,
            query: prev[prev.length - 1].content
          }];
        });
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isThinking]);

  const handleSearch = () => {
    if ((!inputValue.trim() && !attachedFile) || isThinking) return;
    
    let content = inputValue;
    if (attachedFile) {
      content = (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: inputValue ? '8px' : '0', padding: '6px 10px', borderRadius: '6px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', fontSize: '0.85rem' }}>
            {filePreview ? <img src={filePreview} alt="preview" style={{ width: 24, height: 24, objectFit: 'cover', borderRadius: 4 }} /> : <FileText size={14} />} 
            <span style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{attachedFile.name}</span>
          </div>
          {inputValue}
        </div>
      );
    }

    setMessages(prev => [...prev, { role: 'user', content }]);
    setInputValue('');
    setAttachedFile(null);
    setFilePreview(null);
    setIsThinking(true);
    setThinkingIndex(0);
  };

  const handlePromptClick = (text) => {
    setActiveSidebarItem(text);
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInputValue('');
    setIsThinking(true);
    setThinkingIndex(0);
  };

  const handleNewAnalysis = () => {
    setMessages([]);
    setInputValue('');
    setActiveSidebarItem('');
    setAttachedFile(null);
    setFilePreview(null);
    setIsRecording(false);
  };

  const handleVoiceClick = () => {
    if (!recognitionRef.current) {
      alert("Voice recognition is not supported in this browser. Try Chrome or Edge.");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      // Fallback for demo purposes if browser speech API fails to capture audio
      if (inputValue.trim() === originalInputRef.current.trim()) {
        const fallbackText = "Show me the profit impact of returns.";
        const baseInput = originalInputRef.current.trim();
        setInputValue(baseInput ? `${baseInput} ${fallbackText}` : fallbackText);
      }
    } else {
      originalInputRef.current = inputValue;
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAttachedFile(file);
      if (file.type.startsWith('image/')) {
        setFilePreview(URL.createObjectURL(file));
      } else {
        setFilePreview(null);
      }
    }
  };

  const filteredHistory = HISTORY_GROUPS.map(group => ({
    ...group,
    items: group.items.filter(item => item.toLowerCase().includes(historySearchQuery.toLowerCase()))
  })).filter(group => group.items.length > 0);

  const renderMarginWidget = (query) => (
    <div className="intel-report-view">
      <Card className="intel-report-card intel-glass-card">
        <CardContent className="intel-report-content">
          <div className="intel-report-actions">
            <button className="intel-action-icon"><Bookmark size={16} title="Save" /></button>
            <button className="intel-action-icon"><Share size={16} title="Share" /></button>
            <button className="intel-action-icon"><Download size={16} title="Export" /></button>
            <button className="intel-action-icon"><LinkIcon size={16} title="Copy Link" /></button>
          </div>

          <div className="intel-report-body">
            <div className="intel-report-section">
              <h4 className="intel-report-heading">Executive Summary</h4>
              <p className="intel-report-text">Germany's net margin declined by 18% over the last 30 days, driven primarily by localized logistics inflation and an uptick in apparel returns.</p>
            </div>

            <div className="intel-report-section">
              <h4 className="intel-report-heading">Key Findings</h4>
              <ul className="intel-report-list">
                <li><strong>Shipping <span className="tabular-nums">+16%</span>:</strong> Carrier rate increases for cross-border fulfillment.</li>
                <li><strong>Returns <span className="tabular-nums">+9%</span>:</strong> High return rate concentrated in 3 SKU families.</li>
                <li><strong>FX Costs <span className="tabular-nums">+5%</span>:</strong> EUR to USD conversion spread widening.</li>
              </ul>
            </div>

            <div className="intel-grid-impact">
              <div className="intel-impact-box bg-danger-gradient">
                <span className="intel-impact-label">Business Impact</span>
                <span className="intel-impact-val text-danger">Est. Monthly Loss</span>
                <span className="intel-impact-huge text-danger tabular-nums">-$4,800</span>
              </div>
              <div className="intel-impact-box bg-success-gradient">
                <span className="intel-impact-label">Expected Recovery</span>
                <span className="intel-impact-val text-success">Following Recs</span>
                <span className="intel-impact-huge text-success tabular-nums">+$3,100<span className="text-sm">/mo</span></span>
              </div>
            </div>

            <div className="intel-report-section">
              <h4 className="intel-report-heading">Recommendation</h4>
              <ul className="intel-report-list">
                <li>Increase Germany pricing by <span className="tabular-nums">3%</span> across all apparel lines to absorb shipping.</li>
                <li>Adjust free shipping threshold from <span className="tabular-nums">€50</span> to <span className="tabular-nums">€75</span>.</li>
              </ul>
            </div>

            <div className="intel-embedded-visuals intel-glass-card">
              <div className="intel-visual-box">
                <span className="intel-visual-title">Margin Trend (Germany)</span>
                <div className="intel-mini-chart">
                  <ResponsiveContainer width="100%" height={60}>
                    <AreaChart data={MINI_CHART_DATA}>
                      <defs>
                        <linearGradient id="colorMargin" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-danger)" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="var(--color-danger)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="value" stroke="var(--color-danger)" fillOpacity={1} fill="url(#colorMargin)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="intel-report-section">
              <h4 className="intel-report-heading">Recommended Business Actions</h4>
              <div className="intel-rec-actions-container">
                <div className="intel-rec-action intel-glass-card">
                  <span className="font-semibold text-text-primary">Increase Germany Pricing</span>
                  <div className="intel-rec-btns">
                    <Button variant="secondary" className="btn-sm">Preview Impact</Button>
                    <Button variant="primary" className="btn-sm">Generate Recovery Plan</Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="intel-investigation-timeline mt-6">
              <div className="intel-timeline-node">Orders</div>
              <ArrowRight size={14} className="text-border" />
              <div className="intel-timeline-node">Margin Analysis</div>
              <ArrowRight size={14} className="text-border" />
              <div className="intel-timeline-node">FX Review</div>
              <ArrowRight size={14} className="text-border" />
              <div className="intel-timeline-node">Shipping Analysis</div>
              <ArrowRight size={14} className="text-border" />
              <div className="intel-timeline-node font-semibold text-primary glow-text">Recommendation Generated</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderExpansionWidget = (query) => (
    <div className="intel-report-view">
      <Card className="intel-report-card intel-glass-card">
        <CardContent className="intel-report-content">
          <div className="intel-report-actions">
            <button className="intel-action-icon"><Bookmark size={16} title="Save" /></button>
            <button className="intel-action-icon"><Share size={16} title="Share" /></button>
          </div>
          <div className="intel-report-body">
            <div className="intel-report-section">
              <h4 className="intel-report-heading">Market Expansion Assessment</h4>
              <p className="intel-report-text">Based on your recent logistics improvements and current EU demand, the Netherlands presents the highest immediate ROI for expansion, offering a low barrier to entry and high average order value.</p>
            </div>

            <div className="intel-embedded-visuals intel-glass-card">
              <div className="intel-visual-box">
                <span className="intel-visual-title">Est. Demand by Region (Index)</span>
                <div className="intel-mini-chart">
                  <ResponsiveContainer width="100%" height={80}>
                    <BarChart data={EXPANSION_CHART_DATA}>
                      <Bar dataKey="value" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="intel-report-section mt-4">
              <h4 className="intel-report-heading">Next Steps</h4>
              <ul className="intel-report-list">
                <li>Review Dutch localized pricing strategy.</li>
                <li>Audit fulfillment partner rates for NL delivery.</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderShippingWidget = (query) => (
    <div className="intel-report-view">
      <Card className="intel-report-card intel-glass-card">
        <CardContent className="intel-report-content">
          <div className="intel-report-actions">
            <button className="intel-action-icon"><Bookmark size={16} title="Save" /></button>
          </div>
          <div className="intel-report-body">
            <div className="intel-report-section">
              <h4 className="intel-report-heading">Shipping Cost Anomaly</h4>
              <p className="intel-report-text">We've detected a spike in standard shipping costs to the US East Coast. Average fulfillment cost has risen from $8.50 to $11.20 this week.</p>
            </div>

            <div className="intel-embedded-visuals intel-glass-card">
              <div className="intel-visual-box">
                <span className="intel-visual-title">Daily Shipping Spend (USD)</span>
                <div className="intel-mini-chart">
                  <ResponsiveContainer width="100%" height={80}>
                    <LineChart data={SHIPPING_CHART_DATA}>
                      <Line type="monotone" dataKey="value" stroke="var(--color-warning)" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderReturnsWidget = (query) => (
    <div className="intel-report-view">
      <Card className="intel-report-card intel-glass-card">
        <CardContent className="intel-report-content">
          <div className="intel-report-actions">
            <button className="intel-action-icon"><Share size={16} title="Share" /></button>
          </div>
          <div className="intel-report-body">
            <div className="intel-report-section">
              <h4 className="intel-report-heading">Returns Breakdown</h4>
              <p className="intel-report-text">Return volume is up 9% WoW. Most of the returns are concentrated in the 'Summer Denim' collection due to fit issues.</p>
            </div>

            <div className="intel-embedded-visuals intel-glass-card" style={{ display: 'flex', alignItems: 'center' }}>
              <div className="intel-visual-box" style={{ flex: 1 }}>
                <span className="intel-visual-title">Return Reasons</span>
                <div className="intel-mini-chart">
                  <ResponsiveContainer width="100%" height={100}>
                    <PieChart>
                      <Pie data={RETURNS_PIE_DATA} cx="50%" cy="50%" innerRadius={30} outerRadius={45} paddingAngle={2} dataKey="value">
                        {RETURNS_PIE_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <ul className="text-sm">
                  <li><span style={{ color: COLORS[0] }}>●</span> Fit issues (50%)</li>
                  <li><span style={{ color: COLORS[1] }}>●</span> Changed mind (37%)</li>
                  <li><span style={{ color: COLORS[2] }}>●</span> Defective (13%)</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTextWidget = (query) => (
    <div className="intel-report-view">
      <Card className="intel-report-card intel-glass-card" style={{ padding: '0', background: 'transparent', border: 'none', boxShadow: 'none' }}>
        <CardContent className="intel-report-content" style={{ padding: '0' }}>
          <div className="intel-report-body">
            <p className="intel-report-text">Based on my analysis of your query <strong>"{query}"</strong>, here are the key takeaways:</p>
            <ul className="intel-report-list mt-2">
              <li>There is a distinct correlation between weekend sales and higher conversion rates.</li>
              <li>Your overall customer acquisition cost (CAC) has improved by 4%.</li>
              <li>I recommend holding off on major pricing adjustments until next quarter when seasonal demand stabilizes.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAIResponse = (msg) => {
    switch (msg.type) {
      case 'margin_widget': return renderMarginWidget(msg.query);
      case 'expansion_widget': return renderExpansionWidget(msg.query);
      case 'shipping_widget': return renderShippingWidget(msg.query);
      case 'returns_widget': return renderReturnsWidget(msg.query);
      case 'text_widget': return renderTextWidget(msg.query);
      default: return renderTextWidget(msg.query);
    }
  };

  return (
    <div className="intel-layout">
      {/* LEFT / CENTER: MAIN WORKSPACE */}
      <div className="intel-main">
        
        {/* CONTENT AREA */}
        <div className="intel-content-scroll">
          
          {/* ZERO STATE: LANDING WORKSPACE */}
          {messages.length === 0 && !isThinking && (
            <div className="intel-workspace">
              <p className="intel-greeting">Good Morning, Acme Apparel.<br/>PricePilot analyzed your business overnight.</p>
              
              {/* Overnight Intelligence Hero */}
              <Card className="intel-hero-card intel-glass-card">
                <CardContent className="intel-hero-content">
                  <div className="intel-hero-left">
                    <h2 className="intel-hero-title">Overnight Intelligence</h2>
                    <ul className="intel-hero-list">
                      <li className="intel-insight-chip"><TrendingUp size={16} className="text-success" /> Revenue increased 12%.</li>
                      <li className="intel-insight-chip"><TrendingDown size={16} className="text-danger" /> Germany margins declined.</li>
                      <li className="intel-insight-chip"><TrendingUp size={16} className="text-success" /> USA exceeded forecasts.</li>
                      <li className="intel-insight-chip"><TrendingUp size={16} className="text-warning" /> Shipping costs increased.</li>
                    </ul>
                  </div>
                  <div className="intel-hero-right">
                    <span className="intel-hero-label">Estimated recoverable profit</span>
                    <span className="intel-hero-value text-success tabular-nums glow-text-success">+$18,200<span className="intel-hero-period">/mo</span></span>
                    <Button variant="primary" onClick={() => handlePromptClick("Review overnight insights and recoverable profit")}>Review Insights</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Grid: Health Score & Previous Work */}
              <div className="intel-grid-2">
                <Card className="intel-health-card intel-glass-card">
                  <CardContent>
                    <div className="intel-health-header">
                      <h3 className="intel-section-title">Business Health</h3>
                      <div className="intel-health-score">
                        <span className="intel-score-val tabular-nums">82</span>
                        <span className="intel-score-den">/ 100</span>
                        <Badge variant="success" className="ml-2">Excellent</Badge>
                      </div>
                    </div>
                    <div className="intel-health-body">
                      <div className="intel-health-col">
                        <span className="intel-health-label">Strengths</span>
                        <ul className="intel-health-list">
                          <li><CheckCircle2 size={14} className="text-success" /> Strong US profitability</li>
                          <li><CheckCircle2 size={14} className="text-success" /> Stable FX exposure</li>
                          <li><CheckCircle2 size={14} className="text-success" /> Healthy order growth</li>
                        </ul>
                      </div>
                      <div className="intel-health-col">
                        <span className="intel-health-label">Watchlist</span>
                        <ul className="intel-health-list">
                          <li><AlertCircle size={14} className="text-warning" /> Germany margin</li>
                          <li><AlertCircle size={14} className="text-warning" /> France returns</li>
                          <li><AlertCircle size={14} className="text-warning" /> UK shipping costs</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="intel-history-card intel-glass-card">
                  <CardContent>
                    <h3 className="intel-section-title mb-3">Continue Previous Work</h3>
                    <div className="intel-history-list">
                      <button className="intel-history-item" onClick={() => handlePromptClick('Germany Pricing')}>
                        <span>Germany Pricing</span>
                        <ArrowRight size={14} className="text-secondary" />
                      </button>
                      <button className="intel-history-item" onClick={() => handlePromptClick('Netherlands Expansion')}>
                        <span>Netherlands Expansion</span>
                        <ArrowRight size={14} className="text-secondary" />
                      </button>
                      <button className="intel-history-item" onClick={() => handlePromptClick('France Returns')}>
                        <span>France Returns</span>
                        <ArrowRight size={14} className="text-secondary" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* ACTIVE CHAT STATE */}
          {messages.length > 0 && (
            <div className="intel-chat-container">
              {messages.map((msg, idx) => (
                <div key={idx} className={clsx("intel-message-row", msg.role)}>
                  {msg.role === 'ai' && (
                    <div className="intel-chat-avatar ai">
                      <Bot size={18} className="text-primary" />
                    </div>
                  )}
                  
                  <div className={clsx("intel-message-bubble", msg.role)}>
                    {msg.role === 'user' ? (
                      msg.content
                    ) : (
                      renderAIResponse(msg)
                    )}
                  </div>

                  {msg.role === 'user' && (
                    <div className="intel-chat-avatar user">
                      <User size={18} className="text-secondary" />
                    </div>
                  )}
                </div>
              ))}

              {isThinking && (
                <div className="intel-message-row ai">
                  <div className="intel-chat-avatar ai">
                    <Bot size={18} className="text-primary" />
                  </div>
                  <div className="intel-message-bubble ai">
                    <div className="intel-thinking-state" style={{ marginTop: 0, alignItems: 'flex-start' }}>
                      <div className="intel-spinner" style={{ width: '24px', height: '24px', borderWidth: '2px' }}></div>
                      <p className="intel-thinking-text">{THINKING_MESSAGES[thinkingIndex]}</p>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          )}
          
          {/* Bottom spacer for floating input */}
          <div style={{ height: '140px' }} />

        </div>

        {/* INPUT AREA (Floating Glass Pill) */}
        <div className="intel-input-floating-zone">
          <div className="intel-input-floating-wrapper">
            {(messages.length === 0 && !isThinking) && (
              <div className="intel-input-categories mb-3 justify-center">
                {['Profit', 'Pricing', 'Forecasting', 'Expansion', 'Shipping', 'Returns'].map(cat => (
                  <button key={cat} className="intel-cat-pill" onClick={() => setInputValue(`${cat} analysis `)}>{cat}</button>
                ))}
              </div>
            )}
            
            {attachedFile && (
              <div className="intel-attached-file-badge">
                {filePreview ? (
                  <img src={filePreview} alt="preview" style={{ width: 24, height: 24, objectFit: 'cover', borderRadius: 4, marginRight: '6px' }} />
                ) : (
                  <FileText size={14} style={{ marginRight: '6px' }} />
                )}
                <span style={{ fontSize: '0.85rem', maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{attachedFile.name}</span>
                <button onClick={() => { setAttachedFile(null); setFilePreview(null); }} style={{ marginLeft: '12px', background: 'transparent', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer', fontSize: '1rem' }}>&times;</button>
              </div>
            )}
            
            <div className={clsx("intel-main-search-bar intel-glass-card", { "is-thinking": isThinking })}>
              <div className="intel-search-left">
                <button className="intel-future-icon" title="Upload File" onClick={() => fileInputRef.current?.click()}><Paperclip size={18} /></button>
                <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
              </div>
              <input 
                type="text"
                className="intel-main-input-clean"
                placeholder={isRecording ? "Listening to your voice..." : "Ask PricePilot Intelligence..."}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
              />
              <div className="intel-search-right">
                <button className={clsx("intel-future-icon mr-1", { "is-recording": isRecording })} title="Voice Input" onClick={handleVoiceClick}>
                  <Mic size={18} />
                </button>
                <button 
                  className={clsx("intel-send-pill-btn", { "active": (inputValue.trim() || attachedFile) && !isThinking })} 
                  onClick={handleSearch}
                  disabled={(!inputValue.trim() && !attachedFile) || isThinking}
                >
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: CONVERSATION HISTORY SIDEBAR */}
      <div className="intel-sidebar">
        <div style={{ marginBottom: '8px' }}>
           <button className="intel-new-chat-btn" onClick={handleNewAnalysis}>
             <MessageSquarePlus size={16} className="intel-new-chat-icon" />
             <span>New Analysis</span>
           </button>
        </div>

        <div className="intel-sidebar-search">
          <Search size={14} className="text-secondary" />
          <input 
            type="text" 
            placeholder="Search history..." 
            value={historySearchQuery}
            onChange={(e) => setHistorySearchQuery(e.target.value)}
          />
        </div>

        {filteredHistory.map((group, gIdx) => (
          <div key={gIdx} className="intel-sidebar-group">
            <h4 className="intel-sidebar-heading">
              {group.icon && <group.icon size={12} className="mr-1" />}
              {group.title}
            </h4>
            {group.items.map((item, iIdx) => (
              <button 
                key={iIdx} 
                className={clsx("intel-sidebar-item", { active: activeSidebarItem === item })} 
                onClick={() => handlePromptClick(item)}
              >
                {item}
              </button>
            ))}
          </div>
        ))}
        {filteredHistory.length === 0 && (
           <p className="text-sm text-secondary" style={{ padding: '0 12px', marginTop: '16px' }}>No results found.</p>
        )}
      </div>

    </div>
  );
}
