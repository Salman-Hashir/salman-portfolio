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
    <section id="about" className="section-padding" style={{ background: 'var(--black-alt)' }}>
      <div className="sep-line" style={{ marginTop: 0 }} />
      <div style={{ display: 'grid', gap: '5rem', alignItems: 'start' }} className="about-grid">
        
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={{ visible: { transition: { staggerChildren: 0.2 } } }}>
          <motion.div variants={fadeUp} className="label" style={{ marginBottom: '1rem' }}>About</motion.div>
          <motion.h2 variants={fadeUp} className="title-medium" style={{ marginBottom: '2rem' }}>The Architect<br/>Behind the Screen</motion.h2>
          
          <motion.p variants={fadeUp} className="body-text" style={{ marginBottom: '1.5rem' }}>
            I am an <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>IT Engineer and full-stack developer</em> based in Dubai, with roots in Kerala. My work spans the full depth of the technology stack — from configuring satellite networks to building AI-powered web platforms.
          </motion.p>
          <motion.p variants={fadeUp} className="body-text" style={{ marginBottom: '1.5rem' }}>
            With hands-on experience as a <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Technical Support Engineer</em> at Asianet Satellite Communications and as an IT Instructor, I bring both the infrastructure mindset and the product instinct.
          </motion.p>
          <motion.p variants={fadeUp} className="body-text" style={{ marginBottom: '4rem' }}>
            Beyond engineering, I write — <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>dark fiction, paranormal research, philosophical books</em>. The same precision I bring to systems architecture, I bring to storytelling.
          </motion.p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {skills.map((skill, index) => (
              <motion.div 
                key={index}
                variants={fadeUp}
                style={{
                  padding: '1.5rem',
                  border: '1px solid rgba(201,168,76,0.1)',
                  background: 'rgba(201,168,76,0.02)',
                  transition: 'border-color 0.3s, background 0.3s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'; e.currentTarget.style.background = 'rgba(201,168,76,0.05)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.1)'; e.currentTarget.style.background = 'rgba(201,168,76,0.02)'; }}
              >
                <span className="label" style={{ display: 'block', marginBottom: '0.8rem', letterSpacing: '0.15em' }}>{skill.name}</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 300, color: 'var(--muted)', lineHeight: 1.6, display: 'block' }}>{skill.tags}</span>
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
