import React from 'react';
import { motion } from 'framer-motion';

const Marquee = ({ text }) => {
  return (
    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', display: 'flex', background: 'var(--gold)', color: 'var(--black)', padding: '1.2rem 0', transform: 'rotate(-2deg) scale(1.05)', position: 'relative', zIndex: 10, borderTop: '1px solid rgba(0,0,0,0.1)', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
      {/* Seamless loop using framer motion */}
      <motion.div
        animate={{ x: [0, -2000] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', gap: '3rem', width: 'max-content' }}
      >
        {Array(15).fill(text).map((t, i) => (
          <span key={i} style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {t} • 
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
