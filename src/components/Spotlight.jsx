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

  // Dark mode vs Light mode soft ambient glows (Apple style)
  const gradient = isDark
    ? `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(41, 151, 255, 0.06), transparent 40%)`
    : `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 102, 204, 0.03), transparent 40%)`;

  return (
    <motion.div
      style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}
      animate={{ background: gradient }}
      transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
    />
  );
};

export default Spotlight;
