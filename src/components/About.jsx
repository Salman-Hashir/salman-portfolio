import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const About = () => {
  const skills = [
    { name: 'Web Dev', tags: 'Next.js · React · Node.js · Express' },
    { name: 'Infrastructure', tags: 'Linux (RHCSA) · Windows Server' },
    { name: 'Security', tags: 'Ethical Hacking · Penetration Testing' },
    { name: 'Hardware & IoT', tags: 'PC Assembly · Diagnostics · Pis' },
    { name: 'AI & APIs', tags: 'Claude API · Gemini API · Integrations' }
  ];

  return (
    <section id="about" className="section-padding" style={{ background: 'transparent' }}>
      <div className="sep-line" style={{ marginTop: 0 }} />
      <div style={{ display: 'grid', gap: '5rem', alignItems: 'start' }} className="about-grid">
        
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={{ visible: { transition: { staggerChildren: 0.2 } } }}>
          <motion.div variants={fadeUp} className="label">About</motion.div>
          <motion.h2 variants={fadeUp} className="title-medium" style={{ margin: '0.5rem 0 2rem 0' }}>The Architect<br/>Behind the Screen</motion.h2>
          
          <motion.p variants={fadeUp} className="body-text" style={{ marginBottom: '1.5rem' }}>
            I am an <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>IT Engineer and full-stack developer</strong> based in Dubai, with roots in Kerala. My work spans the full depth of the technology stack — from configuring satellite networks to building AI-powered web platforms.
          </motion.p>
          <motion.p variants={fadeUp} className="body-text" style={{ marginBottom: '1.5rem' }}>
            With hands-on experience as a <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Technical Support Engineer</strong> at Asianet Satellite Communications and as an IT Instructor, I bring both the infrastructure mindset and the product instinct.
          </motion.p>
          <motion.p variants={fadeUp} className="body-text" style={{ marginBottom: '4rem' }}>
            Beyond engineering, I write — <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>dark fiction, paranormal research, philosophical books</strong>. The same precision I bring to systems architecture, I bring to storytelling.
          </motion.p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {skills.map((skill, index) => (
              <motion.div 
                key={index}
                variants={fadeUp}
                className="glass-panel"
                style={{
                  padding: '2rem',
                  borderRadius: 'var(--radius-lg)',
                  transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)'
                }}
                whileHover={{ y: -4, boxShadow: 'var(--soft-shadow)' }}
              >
                <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.8rem' }}>{skill.name}</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6 }}>{skill.tags}</p>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @media(min-width: 1024px) {
          .about-grid { grid-template-columns: 1fr 1fr; }
        }
      `}} />
    </section>
  );
};
export default About;
