import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, TrendingUp, AlertTriangle } from 'lucide-react';

export default function CountryProfitability() {
  const [activeCountry, setActiveCountry] = useState('US');

  const countryData = {
    US: { name: 'United States', revenue: '$420K', profit: '$84K', margin: '20.0%', status: 'healthy', ai: 'Expand marketing spend. Highest LTV globally.' },
    CA: { name: 'Canada', revenue: '$110K', profit: '$18K', margin: '16.3%', status: 'healthy', ai: 'Optimize shipping routes. Cross-border fees slightly high.' },
    UK: { name: 'United Kingdom', revenue: '$180K', profit: '$22K', margin: '12.2%', status: 'warning', ai: 'Shipping costs increased 4%. Consider local 3PL.' },
    FR: { name: 'France', revenue: '$130K', profit: '$11K', margin: '8.4%', status: 'critical', ai: 'VAT compliance costs eating margins. Raise retail price 5%.' },
    DE: { name: 'Germany', revenue: '$150K', profit: '$14K', margin: '9.3%', status: 'critical', ai: 'High return rates (18%). Margin below 10% threshold.' },
    BR: { name: 'Brazil', revenue: '$85K', profit: '$12K', margin: '14.1%', status: 'warning', ai: 'Import duties fluctuated. Monitor FX risk closely.' },
    JP: { name: 'Japan', revenue: '$210K', profit: '$45K', margin: '21.4%', status: 'healthy', ai: 'Exceptional retention. Introduce premium product tier.' },
    AU: { name: 'Australia', revenue: '$90K', profit: '$16K', margin: '17.7%', status: 'healthy', ai: 'Stable profitability. FX rate favorable.' }
  };

  const currentData = countryData[activeCountry];

  return (
    <section className="section-country-map">
      <div className="map-container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="map-header"
        >
          <h2>Country Profitability</h2>
          <p>Instantly see which markets are driving growth and which are silently bleeding cash.</p>
        </motion.div>

        <div className="map-interactive-area">
          {/* Stylized CSS Map representation */}
          <div className="css-world-map">
            {/* Soft Heatmap Blobs */}
            <div className="heatmap-blob blob-us"></div>
            <div className="heatmap-blob blob-eu"></div>
            <div className="heatmap-blob blob-au"></div>

            {/* Animated Data Lines */}
            <svg className="map-data-lines" viewBox="0 0 800 400">
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#0FA392" stopOpacity="0"/>
                  <stop offset="50%" stopColor="#0FA392" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#0FA392" stopOpacity="0"/>
                </linearGradient>
              </defs>
              {/* US to CA */}
              <path d="M 176 136 Q 160 98 144 60" fill="none" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="6 6" className="animated-path"/>
              {/* US to BR */}
              <path d="M 176 136 Q 208 198 240 260" fill="none" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="6 6" className="animated-path delay-1"/>
              {/* US to UK */}
              <path d="M 176 136 Q 280 80 376 116" fill="none" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="6 6" className="animated-path delay-2"/>
              {/* US to FR */}
              <path d="M 176 136 Q 276 150 376 136" fill="none" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="6 6" className="animated-path delay-1"/>
              {/* US to DE */}
              <path d="M 176 136 Q 300 70 432 128" fill="none" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="6 6" className="animated-path"/>
              {/* US to JP */}
              <path d="M 176 136 Q 416 50 656 140" fill="none" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="6 6" className="animated-path delay-2"/>
              {/* US to AU */}
              <path d="M 176 136 Q 400 350 696 316" fill="none" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="6 6" className="animated-path delay-1"/>
            </svg>
            
            {/* Map Pins */}
            <motion.div 
              className={`map-pin pin-ca ${activeCountry === 'CA' ? 'active' : ''}`}
              onMouseEnter={() => setActiveCountry('CA')}
              whileHover={{ scale: 1.2 }}
            >
              <div className="pin-pulse healthy"></div>
            </motion.div>

            <motion.div 
              className={`map-pin pin-us ${activeCountry === 'US' ? 'active' : ''}`}
              onMouseEnter={() => setActiveCountry('US')}
              whileHover={{ scale: 1.2 }}
            >
              <div className="pin-pulse healthy"></div>
            </motion.div>
            
            <motion.div 
              className={`map-pin pin-br ${activeCountry === 'BR' ? 'active' : ''}`}
              onMouseEnter={() => setActiveCountry('BR')}
              whileHover={{ scale: 1.2 }}
            >
              <div className="pin-pulse warning"></div>
            </motion.div>

            <motion.div 
              className={`map-pin pin-uk ${activeCountry === 'UK' ? 'active' : ''}`}
              onMouseEnter={() => setActiveCountry('UK')}
              whileHover={{ scale: 1.2 }}
            >
              <div className="pin-pulse warning"></div>
            </motion.div>

            <motion.div 
              className={`map-pin pin-fr ${activeCountry === 'FR' ? 'active' : ''}`}
              onMouseEnter={() => setActiveCountry('FR')}
              whileHover={{ scale: 1.2 }}
            >
              <div className="pin-pulse critical"></div>
            </motion.div>

            <motion.div 
              className={`map-pin pin-de ${activeCountry === 'DE' ? 'active' : ''}`}
              onMouseEnter={() => setActiveCountry('DE')}
              whileHover={{ scale: 1.2 }}
            >
              <div className="pin-pulse critical"></div>
            </motion.div>

            <motion.div 
              className={`map-pin pin-jp ${activeCountry === 'JP' ? 'active' : ''}`}
              onMouseEnter={() => setActiveCountry('JP')}
              whileHover={{ scale: 1.2 }}
            >
              <div className="pin-pulse healthy"></div>
            </motion.div>

            <motion.div 
              className={`map-pin pin-au ${activeCountry === 'AU' ? 'active' : ''}`}
              onMouseEnter={() => setActiveCountry('AU')}
              whileHover={{ scale: 1.2 }}
            >
              <div className="pin-pulse healthy"></div>
            </motion.div>
          </div>

          {/* Floating Data Panel */}
          <div className="map-data-panel">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeCountry}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="country-data-card"
              >
                <div className="country-title">
                  <MapPin size={18} className="text-teal" /> {currentData.name}
                </div>
                
                <div className="country-stats-grid">
                  <div className="c-stat">
                    <div className="label">Revenue</div>
                    <div className="val">{currentData.revenue}</div>
                  </div>
                  <div className="c-stat">
                    <div className="label">Net Profit</div>
                    <div className="val">{currentData.profit}</div>
                  </div>
                  <div className="c-stat">
                    <div className="label">Margin</div>
                    <div className={`val status-${currentData.status}`}>{currentData.margin}</div>
                  </div>
                </div>

                <div className="country-ai-insight">
                  <div className="ai-header">
                    {currentData.status === 'critical' ? <AlertTriangle size={14} className="text-danger"/> : <TrendingUp size={14} className="text-teal"/>}
                    AI Insight
                  </div>
                  <p>{currentData.ai}</p>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
