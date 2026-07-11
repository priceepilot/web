import React, { useState, useEffect } from 'react';
import { BrainCircuit, X, MessageSquare, Send } from 'lucide-react';
import clsx from 'clsx';
import './Copilot.css';

const SUGGESTED_QUESTIONS = [
  "Why is Germany losing margin?",
  "Which country should I expand into next?",
  "What price should I charge in France?",
  "Show next month's profit forecast.",
  "Where are my biggest profit leaks?",
  "How can I increase overall margin?"
];

export function Copilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // Prevent scrolling on body when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const togglePanel = () => setIsOpen(!isOpen);

  const handleSuggestionClick = (q) => {
    setInputValue(q);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button 
        className={clsx('copilot-fab', { 'is-hidden': isOpen })} 
        onClick={togglePanel}
        aria-label="Open PricePilot Copilot"
        title="Ask PricePilot"
      >
        <BrainCircuit size={24} />
      </button>

      {/* Backdrop */}
      <div 
        className={clsx('copilot-backdrop', { 'is-open': isOpen })} 
        onClick={togglePanel}
        aria-hidden="true"
      />

      {/* Sliding Panel */}
      <div className={clsx('copilot-panel', { 'is-open': isOpen })}>
        <div className="copilot-header">
          <div className="copilot-header-content">
            <h2 className="copilot-title">PricePilot Copilot</h2>
            <p className="copilot-subtitle">
              Ask questions about profit, margins, forecasting, pricing, and expansion opportunities.
            </p>
          </div>
          <button className="copilot-close-btn" onClick={togglePanel} aria-label="Close Copilot">
            <X size={20} />
          </button>
        </div>

        <div className="copilot-body">
          <div className="copilot-suggestions-container">
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button 
                key={idx} 
                className="copilot-suggestion-card"
                onClick={() => handleSuggestionClick(q)}
              >
                <MessageSquare size={16} className="text-primary mr-3" style={{ flexShrink: 0 }} />
                <span>{q}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="copilot-footer">
          <div className="copilot-input-wrapper">
            <input 
              type="text" 
              className="copilot-global-input" 
              placeholder="Ask about profits, countries, pricing, forecasts..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button 
              className="copilot-send-btn" 
              disabled={!inputValue.trim()}
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
