import React from 'react';
import { motion } from 'framer-motion';

const RotatingBadge = ({ text = "BUILDER OF DIGITAL WORLDS • ", size = 130 }) => {
  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{ width: '100%', height: '100%', position: 'absolute' }}
      >
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <defs>
            <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
          </defs>
          <text fontSize="10.5" fill="var(--gold)" fontFamily="var(--font-mono)" letterSpacing="0.1em" style={{ textTransform: 'uppercase' }}>
            <textPath href="#circle">
              {text.repeat(Math.ceil(120 / text.length))}
            </textPath>
          </text>
        </svg>
      </motion.div>
      <div style={{ 
        width: size * 0.15, height: size * 0.15, 
        background: 'var(--gold)', borderRadius: '50%',
        boxShadow: '0 0 15px rgba(201,168,76,0.3)' 
      }} />
    </div>
  );
};

export default RotatingBadge;
