import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Star } from 'lucide-react';

export default function TestimonialsAndFAQ() {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    { q: "How does PricePilot calculate true profit?", a: "PricePilot connects to your e-commerce platform and payment gateways to pull raw order data. We then automatically deduct COGS, exact shipping costs, real-time FX spreads, payment processing fees, and historical return rates to give you the true net profit of every single order." },
    { q: "Which platforms do you integrate with?", a: "We currently offer native, one-click integrations with Shopify, WooCommerce, and Stripe. Custom enterprise integrations are available via our API." },
    { q: "How accurate is the AI forecasting?", a: "Our AI uses LangGraph and proprietary time-series models trained on your historical data, seasonality, and global FX trends. On average, our 90-day profit forecasts achieve 94% accuracy." },
    { q: "Can it automatically change my prices?", a: "Yes. With our Automation layer, you can set margin protection rules. If your net margin in a specific country drops below your threshold (e.g., due to a currency crash), PricePilot can automatically increase local prices to protect your profit." }
  ];

  return (
    <section className="section-testimonials-faq">
      {/* Testimonials */}
      <div className="testimonials-container">
        <div className="section-header text-center mb-12">
          <h2>Trusted by Global Sellers</h2>
        </div>
        
        <div className="testimonials-scroll-wrapper">
          <div className="testimonials-track">
            {/* Repeated for infinite scroll effect */}
            {[1, 2, 3, 1, 2, 3].map((item, i) => (
              <div key={i} className="testimonial-card">
                <div className="stars"><Star size={16}/><Star size={16}/><Star size={16}/><Star size={16}/><Star size={16}/></div>
                <p className="quote">"PricePilot showed us exactly where we were silently losing money internationally. Within 30 days, we recovered $40k in lost margin by adjusting our EU pricing."</p>
                <div className="author">
                  <div className="avatar"></div>
                  <div>
                    <div className="name">Sarah Jenkins</div>
                    <div className="company">CFO, Lumina Commerce</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="faq-container">
        <div className="section-header text-center mb-12">
          <h2>Frequently Asked Questions</h2>
        </div>
        
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`} onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
              <div className="faq-question">
                {faq.q}
                <motion.div
                  animate={{ rotate: openFaq === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={24} className="text-teal" />
                </motion.div>
              </div>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="faq-answer"
                  >
                    <p>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
