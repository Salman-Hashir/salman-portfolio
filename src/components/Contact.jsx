import React from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const Contact = () => {
  const { content } = useContent();
  const s = content.siteSettings;

  const contacts = [
    { icon: '✉', label: 'Email', val: s.email, href: `mailto:${s.email}` },
    { icon: '☎', label: 'Phone', val: s.phone, href: `tel:${s.phone?.replace(/\s/g, '')}` },
    { icon: 'in', label: 'LinkedIn', val: 'Connect with me', href: s.linkedin, target: '_blank' },
    { icon: '⌥', label: 'GitHub', val: 'See my code', href: s.github, target: '_blank' },
  ];

  return (
    <section id="contact" style={{ background: 'var(--section-bg)', textAlign: 'center', position: 'relative', overflow: 'hidden' }} className="section-padding">
      <div className="sep-line" style={{ marginTop: 0 }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(0, 102, 204, 0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="title-medium" style={{ marginBottom: '1.5rem', lineHeight: 1.1 }}>
        {s.contactTitle?.split('together').map((part, i) =>
          i === 0 ? <React.Fragment key={i}>{part}<br /><span style={{ color: 'var(--accent-blue)' }}>together.</span></React.Fragment> : null
        ) || <>Let's Build<br /><span style={{ color: 'var(--accent-blue)' }}>Something together.</span></>}
      </motion.h2>

      <motion.p initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } }, hidden: { opacity: 0, y: 40 } }} style={{ fontSize: '1.1rem', fontWeight: 400, color: 'var(--muted)', marginBottom: '4rem' }}>
        {s.contactSubtitle}
      </motion.p>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4 } }, hidden: { opacity: 0, y: 40 } }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', background: 'transparent', maxWidth: '800px', margin: '0 auto 3.5rem' }}>
        {contacts.map((item, i) => (
          <a key={i} href={item.href} target={item.target} className="glass-panel"
            style={{ borderRadius: 'var(--radius-lg)', padding: '2.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', alignItems: 'center', textDecoration: 'none', transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--soft-shadow)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
            <span style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{item.icon}</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>{item.label}</span>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>{item.val}</span>
          </a>
        ))}
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={{ visible: { opacity: 1 }, hidden: { opacity: 0 } }} transition={{ delay: 0.8, duration: 1 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.85rem', fontWeight: 500, color: 'var(--muted)' }} className="availability">
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34c759' }} className="pulse-dot" />
        {s.availability}
      </motion.div>

      <footer style={{ marginTop: '8rem', paddingTop: '2rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>© {s.footerYear} {s.name || `${s.firstName} ${s.lastName}`}</span>
        <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{s.location}</span>
        <a href={s.resumeUrl || 'resume/Salman-Hashir-Resume.pdf'} download style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--accent-blue)', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--accent-blue)'}>Download Resume →</a>
      </footer>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(1.2); } 100% { opacity: 1; transform: scale(1); } }
        .pulse-dot { animation: pulse 2.5s ease-in-out infinite; }
        @media(max-width: 768px) { footer { flex-direction: column; text-align: center; border-top: none; } }
      `}} />
    </section>
  );
};
export default Contact;
