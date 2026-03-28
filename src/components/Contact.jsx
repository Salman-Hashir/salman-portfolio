import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const Contact = () => {
  return (
    <section id="contact" style={{ background: 'var(--black)', textAlign: 'center', position: 'relative', overflow: 'hidden' }} className="section-padding">
      <div className="sep-line" style={{ marginTop: 0 }} />
      
      {/* Background Glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(244, 63, 94, 0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      
      <motion.h2 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
        className="title-medium"
        style={{ marginBottom: '1.5rem', lineHeight: 1 }}
      >
        Let's Build<br/><span style={{ color: 'var(--neon-cyan)', textShadow: '4px 4px 0px var(--neon-pink)' }}>Something</span>
      </motion.h2>
      
      <motion.p 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } }, hidden: { opacity: 0, y: 40 } }}
        style={{ fontSize: '1.1rem', fontWeight: 300, fontStyle: 'italic', color: 'var(--muted)', marginBottom: '4rem' }}
      >
        Open to IT roles, freelance development, and creative collaborations. Available immediately.
      </motion.p>
      
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4 } }, hidden: { opacity: 0, y: 40 } }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2px', background: 'var(--white)', border: 'var(--brutal-border)', maxWidth: '800px', margin: '0 auto 3.5rem', boxShadow: '8px 8px 0px var(--neon-pink)' }}
      >
        {[
          { icon: '✉', label: 'Email', val: 'salman.muthan@gmail.com', href: 'mailto:salman.muthan@gmail.com' },
          { icon: '☎', label: 'Phone', val: '+971 528 282 490', href: 'tel:+971528282490' },
          { icon: 'in', label: 'LinkedIn', val: 'Connect with me', href: 'https://linkedin.com/in/salman-hashir', target: '_blank' },
          { icon: '⌥', label: 'GitHub', val: 'See my code', href: 'https://github.com/salman-hashir', target: '_blank' }
        ].map((item, i) => (
          <a key={i} href={item.href} target={item.target} style={{ background: 'var(--black)', padding: '2.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', alignItems: 'center', textDecoration: 'none', transition: 'all 0.2s ease' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--neon-green)'; e.currentTarget.style.transform = 'translate(-2px, -2px)'; e.currentTarget.style.boxShadow = '4px 4px 0px var(--black)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--black)'; e.currentTarget.style.transform = 'translate(0, 0)'; e.currentTarget.style.boxShadow = 'none'; }}>
            <span style={{ fontSize: '1.4rem', color: 'var(--white)', mixBlendMode: 'difference' }}>{item.icon}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--white)', mixBlendMode: 'difference' }}>{item.label}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--white)', mixBlendMode: 'difference', fontWeight: 'bold' }}>{item.val}</span>
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

      <footer style={{ marginTop: '8rem', padding: '2rem 4rem', borderTop: 'var(--brutal-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--muted)', textTransform: 'uppercase' }}>© 2026 Salman Hashir</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--muted)', textTransform: 'uppercase' }}>Al Karama, Dubai · Kerala, India</span>
        <a href="resume/Salman-Hashir-Resume.pdf" download style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--neon-green)', textTransform: 'uppercase', textDecoration: 'none' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--white)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--neon-green)'}>⬇ Download Resume</a>
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
