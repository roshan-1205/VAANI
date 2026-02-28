import React from 'react';
import { motion } from 'framer-motion';
import './ChartCard.css';
import './SatisfactionGauge.css';

const SatisfactionGauge = () => {
  const value = 50; // 0-100
  const rotation = (value / 100) * 180 - 90;

  // Helper function to calculate arc path
  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  const describeArc = (x, y, radius, startAngle, endAngle) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return [
      "M", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
  };

  const centerX = 100;
  const centerY = 100;
  const radius = 70;

  return (
    <motion.div
      className="chart-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      <h3>Volunteer Satisfaction Level</h3>
      
      <div className="gauge-container">
        <svg viewBox="0 0 200 120" className="gauge-svg">
          {/* Background arc */}
          <path
            d={describeArc(centerX, centerY, radius, 0, 180)}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="20"
            strokeLinecap="butt"
          />
          
          {/* Red segment (0-60 degrees) */}
          <path
            d={describeArc(centerX, centerY, radius, 0, 60)}
            fill="none"
            stroke="#ef4444"
            strokeWidth="20"
            strokeLinecap="butt"
          />
          
          {/* Orange segment (60-120 degrees) */}
          <path
            d={describeArc(centerX, centerY, radius, 60, 120)}
            fill="none"
            stroke="#f59e0b"
            strokeWidth="20"
            strokeLinecap="butt"
          />
          
          {/* Green segment (120-180 degrees) */}
          <path
            d={describeArc(centerX, centerY, radius, 120, 180)}
            fill="none"
            stroke="#10b981"
            strokeWidth="20"
            strokeLinecap="butt"
          />
          
          {/* Needle */}
          <motion.g
            initial={{ rotate: -90 }}
            animate={{ rotate: rotation }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ transformOrigin: '100px 100px' }}
          >
            <line
              x1="100"
              y1="100"
              x2="100"
              y2="40"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="100" cy="100" r="6" fill="white" />
          </motion.g>
        </svg>
        
        <div className="gauge-labels">
          <span className="gauge-label-left">0%</span>
          <span className="gauge-label-center">{value}%</span>
          <span className="gauge-label-right">100%</span>
        </div>
      </div>
    </motion.div>
  );
};

export default SatisfactionGauge;
