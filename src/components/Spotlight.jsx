import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Spotlight = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  // Dark mode: vivid neon glows / Light mode: softer, more subtle accent glows
  const gradient = isDark
    ? `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(244, 63, 94, 0.12), transparent 40%),
       radial-gradient(400px circle at ${mousePosition.x + 100}px ${mousePosition.y + 100}px, rgba(6, 182, 212, 0.15), transparent 40%)`
    : `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(3, 105, 161, 0.08), transparent 40%),
       radial-gradient(400px circle at ${mousePosition.x + 100}px ${mousePosition.y + 100}px, rgba(190, 18, 60, 0.07), transparent 40%)`;

  return (
    <motion.div
      style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}
      animate={{ background: gradient }}
      transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
    />
  );
};

export default Spotlight;
