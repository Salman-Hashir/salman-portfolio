import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from './Magnetic';
import { useTheme } from '../context/ThemeContext';

const Navigation = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const links = ['About', 'Experience', 'Projects', 'Writings', 'Contact'];
  const isDark = theme === 'dark';

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

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

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Theme Toggle */}
        <Magnetic strength={30}>
          <motion.button
            onClick={toggleTheme}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="theme-toggle"
            data-active={isDark ? 'false' : 'true'}
            aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <span className="theme-toggle__track" />
            <AnimatePresence mode="wait">
              <motion.span
                key={theme}
                className="theme-toggle__thumb"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isDark ? '🌙' : '☀️'}
              </motion.span>
            </AnimatePresence>
            <span className="theme-toggle__label-dark">DARK</span>
            <span className="theme-toggle__label-light">LITE</span>
          </motion.button>
        </Magnetic>

        {/* Resume Button (Desktop) */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="nav-resume-desktop">
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

        {/* Hamburger Menu Toggle (Mobile) */}
        <motion.button 
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {isMobileMenuOpen ? 'CLOSE' : 'MENU'}
        </motion.button>
      </div>

      {/* ── Mobile Sidebar Overlay ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mobile-sidebar-backdrop"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="mobile-sidebar"
            >
              <ul className="mobile-sidebar-links">
                {links.map((link, i) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <a href={`#${link.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)}>
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{ marginTop: 'auto', paddingTop: '2rem' }}
              >
                <a
                  href="resume/Salman-Hashir-Resume.pdf"
                  download
                  className="btn-primary"
                  style={{ width: '100%', padding: '1rem', border: '1px solid rgba(201,168,76,0.3)' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Download Resume
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
