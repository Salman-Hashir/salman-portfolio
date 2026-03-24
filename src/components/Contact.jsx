import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const Contact = () => {
  return (
    <section id="contact" style={{ background: 'rgba(6,6,10,0.95)', textAlign: 'center', position: 'relative', overflow: 'hidden' }} className="section-padding">
      <div className="sep-line" style={{ marginTop: 0 }} />
      
      {/* Background Glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
      
      <motion.h2 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
        style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 700, color: 'var(--white)', marginBottom: '1.5rem', lineHeight: 1, letterSpacing: '0.03em', textTransform: 'uppercase' }}
      >
        Let's Build<br/><span style={{ color: 'var(--gold)' }}>Something</span>
      </motion.h2>
      
      <motion.p 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } }, hidden: { opacity: 0, y: 40 } }}
        style={{ fontSize: '1.1rem', fontWeight: 300, fontStyle: 'italic', color: 'var(--muted)', marginBottom: '4rem' }}
      >
        Open to IT roles, freelance development, and creative collaborations. Available immediately.
      </motion.p>
      
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4 } }, hidden: { opacity: 0, y: 40 } }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1px', background: 'rgba(201,168,76,0.1)', maxWidth: '800px', margin: '0 auto 3.5rem' }}
      >
        {[
          { icon: '✉', label: 'Email', val: 'salman.muthan@gmail.com', href: 'mailto:salman.muthan@gmail.com' },
          { icon: '☎', label: 'Phone', val: '+971 528 282 490', href: 'tel:+971528282490' },
          { icon: 'in', label: 'LinkedIn', val: 'Connect with me', href: 'https://linkedin.com/in/salman-hashir', target: '_blank' },
          { icon: '⌥', label: 'GitHub', val: 'See my code', href: 'https://github.com/salman-hashir', target: '_blank' }
        ].map((item, i) => (
          <a key={i} href={item.href} target={item.target} style={{ background: 'var(--black)', padding: '2.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', alignItems: 'center', textDecoration: 'none', transition: 'background 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.background = '#0d0d14'} onMouseLeave={(e) => e.currentTarget.style.background = 'var(--black)'}>
            <span style={{ fontSize: '1.4rem', color: 'rgba(201,168,76,0.5)' }}>{item.icon}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--muted)' }}>{item.label}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--white)' }}>{item.val}</span>
          </a>
        ))}
      </motion.div>
      
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={{ visible: { opacity: 1 }, hidden: { opacity: 0 } }} transition={{ delay: 0.8, duration: 1 }}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)' }}
        className="availability"
      >
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80' }} className="pulse-dot" />
        Available for immediate joining — open to relocation
      </motion.div>

      <footer style={{ marginTop: '8rem', padding: '2rem 4rem', borderTop: '1px solid rgba(201,168,76,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--muted)', textTransform: 'uppercase' }}>© 2026 Salman Hashir</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--muted)', textTransform: 'uppercase' }}>Al Karama, Dubai · Kerala, India</span>
        <a href="resume/Salman-Hashir-Resume.pdf" download style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--gold-dim)', textTransform: 'uppercase', textDecoration: 'none' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--gold)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--gold-dim)'}>⬇ Download Resume</a>
      </footer>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(1.2); } 100% { opacity: 1; transform: scale(1); } }
        .pulse-dot { animation: pulse 2.5s ease-in-out infinite; }
        @media(max-width: 768px) { footer { flex-direction: column; text-align: center; } }
      `}} />
    </section>
  );
};
export default Contact;
