import React from 'react';
import { motion } from 'framer-motion';

const Marquee = ({ text }) => {
  return (
    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', display: 'flex', background: 'transparent', color: 'var(--text-primary)', padding: '2rem 0', position: 'relative', zIndex: 10, borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
      {/* Seamless loop using framer motion */}
      <motion.div
        animate={{ x: [0, -2000] }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', gap: '6rem', width: 'max-content' }}
      >
        {Array(15).fill(text).map((t, i) => (
          <span key={i} style={{ fontSize: '1.1rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--muted)' }}>
            {t} <span style={{ color: 'var(--accent-blue)', margin: '0 1rem' }}>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
