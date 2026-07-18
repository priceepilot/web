import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, RefreshCcw, BrainCircuit, TrendingUp, Zap, ChevronRight } from 'lucide-react';

export default function SolutionSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="section-solution">
      <div className="solution-container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="solution-header"
        >
          <h2>Meet PricePilot</h2>
          <p>PricePilot connects to your store and turns raw sales data into profit intelligence, helping you optimize across every market.</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="solution-flow"
        >
          {/* Step 1 */}
          <motion.div variants={itemVariants} className="flow-step">
            <div className="flow-icon"><ShoppingCart size={24} /></div>
            <h4>Connect Store</h4>
            <p>Shopify, WooCommerce, Stripe</p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flow-connector">
            <div className="animated-line"></div>
            <ChevronRight className="connector-arrow" size={20} />
          </motion.div>

          {/* Step 2 */}
          <motion.div variants={itemVariants} className="flow-step">
            <div className="flow-icon"><RefreshCcw size={24} /></div>
            <h4>Profit Engine</h4>
            <p>Orders, Countries, Currencies</p>
          </motion.div>

          <motion.div variants={itemVariants} className="flow-connector">
            <div className="animated-line"></div>
            <ChevronRight className="connector-arrow" size={20} />
          </motion.div>

          {/* Step 3 */}
          <motion.div variants={itemVariants} className="flow-step highlight">
            <div className="flow-icon pulse-glow"><BrainCircuit size={28} /></div>
            <h4>AI Analysis</h4>
            <p>LangGraph recommendations</p>
          </motion.div>

          <motion.div variants={itemVariants} className="flow-connector">
            <div className="animated-line"></div>
            <ChevronRight className="connector-arrow" size={20} />
          </motion.div>

          {/* Step 4 */}
          <motion.div variants={itemVariants} className="flow-step">
            <div className="flow-icon"><TrendingUp size={24} /></div>
            <h4>Profit Growth</h4>
            <p>Automated optimization</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
