import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, MessageSquare, ArrowRight, Loader2 } from 'lucide-react';

const MESSAGES = [
  {
    q: "Why did our profit in Germany drop this month?",
    a: (
      <>
        <p>Profit decreased by 12% in Germany primarily due to:</p>
        <ul>
          <li><span className="text-danger">Higher shipping costs</span> (+4% carrier surcharge)</li>
          <li><span className="text-danger">FX fluctuations</span> (EUR depreciation)</li>
          <li><span className="text-danger">Increase in returns</span> (Size M apparel)</li>
        </ul>
        <div className="ai-recommendation">
          <strong>Recommendation:</strong> Increase EUR base prices by 3% and disable free returns on Size M to restore target 15% margin.
        </div>
      </>
    )
  },
  {
    q: "What's our projected cash flow for Q3?",
    a: (
      <>
        <p>Based on current velocity and seasonal trends, Q3 cash flow is projected at <strong>$1.2M</strong>.</p>
        <p>However, an upcoming logistics fee hike in August poses a 4% risk to margins.</p>
        <div className="ai-recommendation">
          <strong>Recommendation:</strong> Pre-purchase Q3 inventory now to lock in current freight rates.
        </div>
      </>
    )
  },
  {
    q: "Which country is most profitable right now?",
    a: (
      <>
        <p><strong>Japan</strong> is currently your most profitable market with a <strong>21.4% net margin</strong>.</p>
        <p>High Lifetime Value (LTV) and exceptionally low return rates (under 2%) are driving this performance.</p>
      </>
    )
  },
  {
    q: "Should we expand to Australia?",
    a: (
      <>
        <p>Yes. By analyzing competitor pricing and local shipping costs, you can achieve an estimated <strong>17% net margin</strong> in Australia.</p>
        <div className="ai-recommendation">
          <strong>Action:</strong> I recommend launching a localized storefront next month starting with your Top 5 bestsellers.
        </div>
      </>
    )
  },
  {
    q: "Why are our ad costs spiking in the UK?",
    a: (
      <>
        <p>Meta ad CPCs in the UK rose by <strong>15%</strong> this week across your industry category.</p>
        <div className="ai-recommendation">
          <strong>Action:</strong> Shift 20% of the UK ad budget to Google Shopping immediately, where CPA remains stable at $12.
        </div>
      </>
    )
  },
  {
    q: "Can we offer free shipping in France?",
    a: (
      <>
        <p>If you offer unconditional free shipping in France, your net margin will drop from <strong>8.4% to 2.1%</strong>.</p>
        <div className="ai-recommendation">
          <strong>Alternative:</strong> Offer free shipping only on orders over €100 to protect profitability while boosting AOV.
        </div>
      </>
    )
  },
  {
    q: "What is the impact of the new US tariffs?",
    a: (
      <>
        <p>The new 10% tariff on category 4 goods will reduce US margins by <strong>$14,000 monthly</strong>.</p>
        <div className="ai-recommendation">
          <strong>Action:</strong> I have drafted a smart repricing strategy to offset this cost without negatively impacting conversion rates.
        </div>
      </>
    )
  },
  {
    q: "How are currency fluctuations affecting us?",
    a: (
      <>
        <p>The GBP has weakened by 3% against the USD. You are currently losing <strong>$2.50 per UK order</strong> on the exchange rate.</p>
        <div className="ai-recommendation">
          <strong>Action:</strong> Enable automatic FX repricing for the UK storefront to dynamically protect margins.
        </div>
      </>
    )
  },
  {
    q: "Which product has the highest return rate?",
    a: (
      <>
        <p>The <strong>'Classic Wool Coat (Size L)'</strong> has a 24% return rate in Europe, mostly due to sizing issues.</p>
        <div className="ai-recommendation">
          <strong>Action:</strong> Add a detailed EU sizing chart to the product page and increase the base price by €5 to absorb reverse logistics costs.
        </div>
      </>
    )
  },
  {
    q: "Summarize today's action items.",
    a: (
      <>
        <ul>
          <li>Increase DE base prices by 3%</li>
          <li>Shift UK ad budget to Google Shopping</li>
          <li>Adjust FR free shipping threshold to €100</li>
        </ul>
        <div className="ai-recommendation">
          <strong>Pending:</strong> Should I execute these changes across your Shopify stores now?
        </div>
      </>
    )
  }
];

export default function AiCopilotSection() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState('idle'); // idle, typing, sending, ai-typing, ai-reply, reading
  const [typedText, setTypedText] = useState('');
  
  // Accumulated history of messages
  const [chatHistory, setChatHistory] = useState([]);

  // Start the loop on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('typing');
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handle typing animation
  useEffect(() => {
    if (phase === 'typing') {
      const fullText = MESSAGES[index].q;
      let charIndex = 0;
      setTypedText('');
      
      const typeInterval = setInterval(() => {
        if (charIndex < fullText.length) {
          setTypedText(prev => prev + fullText.charAt(charIndex));
          charIndex++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => setPhase('sending'), 500);
        }
      }, 40);
      
      return () => clearInterval(typeInterval);
    }
  }, [phase, index]);

  // Handle sequence phases
  useEffect(() => {
    if (phase === 'sending') {
      setTypedText('');
      // Add user message to history
      setChatHistory(prev => [...prev, { id: `u-${index}-${Date.now()}`, role: 'user', content: MESSAGES[index].q }]);
      
      const timer = setTimeout(() => setPhase('ai-typing'), 600);
      return () => clearTimeout(timer);
    }
    
    if (phase === 'ai-typing') {
      const timer = setTimeout(() => setPhase('ai-reply'), 1200);
      return () => clearTimeout(timer);
    }
    
    if (phase === 'ai-reply') {
      // Add AI message to history
      setChatHistory(prev => [...prev, { id: `ai-${index}-${Date.now()}`, role: 'ai', content: MESSAGES[index].a }]);
      
      const timer = setTimeout(() => setPhase('reading'), 500);
      return () => clearTimeout(timer);
    }
    
    if (phase === 'reading') {
      const timer = setTimeout(() => {
        setPhase('idle');
        const nextIndex = (index + 1) % MESSAGES.length;
        setIndex(nextIndex);
        
        // Optional: clear history if it gets too long, or just let it scroll infinitely. 
        // We'll let it scroll infinitely for the continuous effect.
        
        setTimeout(() => setPhase('typing'), 500);
      }, 5000); 
      return () => clearTimeout(timer);
    }
  }, [phase, index]);

  return (
    <section className="section-ai-copilot">
      <div className="copilot-container">
        
        <div className="copilot-text-content">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-badge"><BrainCircuit size={16}/> PricePilot AI Engine</div>
            <h2>Ask your data anything. Get profitable answers.</h2>
            <p>Stop guessing the <em>why</em> behind your numbers. Our intelligent Copilot instantly diagnoses hidden margin leaks, forecasts your next 90 days of profit, and autonomously uncovers your most lucrative international expansion opportunities.</p>
            
            <ul className="copilot-features">
              <li><ArrowRight size={16} className="text-teal"/> Instantly diagnose margin drops</li>
              <li><ArrowRight size={16} className="text-teal"/> Get localized pricing recommendations</li>
              <li><ArrowRight size={16} className="text-teal"/> Forecast cash flow across 40+ currencies</li>
            </ul>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="copilot-chat-interface"
        >
          {/* Fixed height container, overflow hidden so messages get pushed up */}
          <div className="chat-window" style={{ height: '520px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden' }}>
            
            <div className="chat-history" style={{ display: 'flex', flexDirection: 'column', gap: '24px', justifyContent: 'flex-end', paddingBottom: '24px', flex: 1, overflowY: 'hidden' }}>
              
              <AnimatePresence initial={false}>
                {chatHistory.map((msg) => (
                  <motion.div
                    key={msg.id}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className={`chat-bubble ${msg.role}`}
                  >
                    {msg.role === 'ai' && <div className="ai-chat-header"><BrainCircuit size={16}/> PricePilot AI</div>}
                    {msg.content}
                  </motion.div>
                ))}

                {/* AI Typing Indicator */}
                {phase === 'ai-typing' && (
                  <motion.div 
                    key={`loading-${index}`}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="chat-bubble ai flex items-center gap-2"
                    style={{ padding: '16px 24px' }}
                  >
                    <Loader2 size={16} className="text-teal" style={{ animation: 'spin 1s linear infinite' }}/>
                    <span style={{ fontSize: '0.9rem', color: '#64748B' }}>Analyzing global data...</span>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
            
            {/* Chat Input Mockup */}
            <div className="chat-input-bar">
              <MessageSquare size={18} className="text-muted" />
              <span style={{ flex: 1, color: typedText ? '#0F172A' : '#94A3B8' }}>
                {typedText || "Ask about margins, FX risks, or expansion..."}
                {phase === 'typing' && <span className="typing-cursor">|</span>}
              </span>
              <motion.div 
                animate={{ backgroundColor: typedText.length > 0 ? '#10B981' : '#0FA392' }}
                className="chat-submit-btn"
              >
                <ArrowRight size={16}/>
              </motion.div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
