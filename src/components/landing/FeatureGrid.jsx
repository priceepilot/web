import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Link as LinkIcon, Lock, Activity, Users, CreditCard } from 'lucide-react';

export default function FeatureGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="section-feature-grid">
      <div className="feature-grid-container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="feature-header"
        >
          <h2>Everything you need to optimize profit</h2>
          <p>An enterprise-grade toolkit designed specifically for the complexities of cross-border commerce.</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="premium-features-grid"
        >
          {/* Feature 1 */}
          <motion.div variants={itemVariants} className="feature-card">
            <div className="feature-icon"><Zap className="text-teal" size={24}/></div>
            <h3>Automated Optimization</h3>
            <p>Set margin protection thresholds. Let AI automatically adjust localized pricing when FX rates shift or costs spike.</p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div variants={itemVariants} className="feature-card">
            <div className="feature-icon"><LinkIcon className="text-teal" size={24}/></div>
            <h3>Native Integrations</h3>
            <p>Connects seamlessly with Shopify, WooCommerce, and Stripe to pull real-time order and fee data.</p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div variants={itemVariants} className="feature-card">
            <div className="feature-icon"><Activity className="text-teal" size={24}/></div>
            <h3>Smart Alerts</h3>
            <p>Get notified instantly when a specific product or country drops below your target profitability threshold.</p>
          </motion.div>

          {/* Feature 4 */}
          <motion.div variants={itemVariants} className="feature-card">
            <div className="feature-icon"><Users className="text-teal" size={24}/></div>
            <h3>Organization Management</h3>
            <p>Invite your entire finance and e-commerce team with granular role-based access control.</p>
          </motion.div>

          {/* Feature 5 */}
          <motion.div variants={itemVariants} className="feature-card">
            <div className="feature-icon"><Lock className="text-teal" size={24}/></div>
            <h3>Enterprise Security</h3>
            <p>Bank-grade encryption, SOC 2 Type II compliance (pending), and strict GDPR data privacy adherence.</p>
          </motion.div>

          {/* Feature 6 */}
          <motion.div variants={itemVariants} className="feature-card">
            <div className="feature-icon"><CreditCard className="text-teal" size={24}/></div>
            <h3>Multi-Currency Billing</h3>
            <p>Track profits in your home currency while managing pricing rules in dozens of local currencies.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
