import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Magnetic from './Magnetic';
import RotatingBadge from './RotatingBadge';

const titleVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.3 } }
};

const letterVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const Hero = () => {
  const firstName = "Salman".split("");
  const lastName = "Hashir".split("");
  
  // Parallax hook
  const { scrollY } = useScroll();
  const yImage = useTransform(scrollY, [0, 1000], [0, 200]);

  return (
    <section id="hero" className="hero section-padding">
      <div className="hero-content">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="label">
          Portfolio — 2026
        </motion.div>
        
        <motion.h1 className="title-large" variants={titleVariants} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ overflow: 'hidden', display: 'flex' }}>
            {firstName.map((char, index) => (
              <motion.span key={index} variants={letterVariants} style={{ display: 'inline-block' }}>{char}</motion.span>
            ))}
          </div>
          <div style={{ overflow: 'hidden', display: 'flex', color: 'var(--neon-pink)', textShadow: '2px 2px 0px var(--neon-cyan)' }}>
            {lastName.map((char, index) => (
              <motion.span key={index} variants={letterVariants} style={{ display: 'inline-block' }}>{char}</motion.span>
            ))}
          </div>
        </motion.h1>

        <motion.p className="label" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }} style={{ letterSpacing: '0.15em', color: 'var(--muted)', marginTop: '0.5rem' }}>
          IT Engineer · Builder of Digital Worlds
        </motion.p>
        
        <motion.p className="body-text" initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 1.3 }} style={{ maxWidth: '480px', marginTop: '1rem' }}>
          Based in Dubai, UAE. I engineer robust IT systems, build web platforms that help people connect,
          and write dark Malayalam fiction — where technical precision meets cultural creativity.
        </motion.p>
        
        <motion.div style={{ display: 'flex', gap: '1.5rem', marginTop: '2.5rem', flexWrap: 'wrap', alignItems: 'center' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.8 }}>
          <Magnetic strength={30}>
            <a href="#projects" className="btn-primary">View Work</a>
          </Magnetic>
          <Magnetic strength={20}>
            <a href="#contact" className="btn-ghost">Contact —</a>
          </Magnetic>
        </motion.div>
      </div>

      <div className="hero-image-wrapper" style={{ position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
          style={{ position: 'relative', y: yImage, overflow: 'hidden' }}
        >
          {/* Subtle slow parallax scaling on the image inside the framing */}
          <motion.img 
            src="/photo.jpg" alt="Salman Hashir" 
            className="hero-image" 
            style={{ scale: 1.05 }}
            whileHover={{ scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
          
          <motion.div 
            initial={{ height: '100%' }} animate={{ height: '0%' }} transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.8 }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', background: 'var(--black)', zIndex: 10 }}
          />
          
          <div style={{ position: 'absolute', top: '-15px', left: '-15px', width: '30px', height: '30px', borderTop: '4px solid var(--neon-pink)', borderLeft: '4px solid var(--neon-pink)' }} />
          <div style={{ position: 'absolute', bottom: '-15px', right: '-15px', width: '30px', height: '30px', borderBottom: '4px solid var(--neon-pink)', borderRight: '4px solid var(--neon-pink)' }} />
        </motion.div>

        {/* The Gatzara style Rotating Badge positioned dynamically overlapping the image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.8, type: 'spring' }}
          style={{ position: 'absolute', bottom: '-40px', left: '-40px', zIndex: 20 }}
        >
          <Magnetic strength={50}>
            <RotatingBadge text="EXPLORE MY WORK • EXPLORE MY WORK • " size={140} />
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
};
export default Hero;
