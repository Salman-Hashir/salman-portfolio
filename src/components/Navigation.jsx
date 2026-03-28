import React from 'react';
import { motion } from 'framer-motion';
import Magnetic from './Magnetic';

const Navigation = () => {
  const links = ['About', 'Experience', 'Projects', 'Writings', 'Contact'];

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="nav"
    >
      <Magnetic strength={15}>
        <a href="#hero" className="nav-logo">
          S. Hashir
        </a>
      </Magnetic>
      
      <ul className="nav-links">
        {links.map((link, i) => (
          <motion.li 
            key={link}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * i + 0.5 }}
          >
            <Magnetic strength={20}>
              <a href={`#${link.toLowerCase()}`} className="nav-link" style={{ display: 'inline-block', padding: '0.5rem' }}>
                {link}
              </a>
            </Magnetic>
          </motion.li>
        ))}
      </ul>
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
        <Magnetic strength={40}>
          <a 
            href="resume/Salman-Hashir-Resume.pdf" 
            download 
            className="btn-primary"
            style={{ padding: '0.6rem 2rem', border: '1px solid rgba(201,168,76,0.3)' }}
          >
            Resume
          </a>
        </Magnetic>
      </motion.div>
    </motion.nav>
  );
};

export default Navigation;
