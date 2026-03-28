import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Spotlight = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      animate={{
        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(244, 63, 94, 0.12), transparent 40%),
                     radial-gradient(400px circle at ${mousePosition.x + 100}px ${mousePosition.y + 100}px, rgba(6, 182, 212, 0.15), transparent 40%)`
      }}
      transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
    />
  );
};

export default Spotlight;
