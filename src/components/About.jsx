import React from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const About = () => {
  const { content } = useContent();
  const s = content.siteSettings;
  const skills = content.skills || [];

  return (
    <section id="about" className="section-padding" style={{ background: 'transparent' }}>
      <div className="sep-line" style={{ marginTop: 0 }} />
      <div style={{ display: 'grid', gap: '5rem', alignItems: 'start' }} className="about-grid">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={{ visible: { transition: { staggerChildren: 0.2 } } }}>
          <motion.div variants={fadeUp} className="label">About</motion.div>
          <motion.h2 variants={fadeUp} className="title-medium" style={{ margin: '0.5rem 0 2rem 0' }}>
            {(s.aboutTitle || 'The Architect\nBehind the Screen').split('\n').map((line, i) => (
              <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
            ))}
          </motion.h2>

          <motion.p variants={fadeUp} className="body-text" style={{ marginBottom: '1.5rem' }}>{s.aboutPara1}</motion.p>
          <motion.p variants={fadeUp} className="body-text" style={{ marginBottom: '1.5rem' }}>{s.aboutPara2}</motion.p>
          <motion.p variants={fadeUp} className="body-text" style={{ marginBottom: '4rem' }}>{s.aboutPara3}</motion.p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {skills.map((skill, index) => (
              <motion.div
                key={skill.id || index}
                variants={fadeUp}
                className="glass-panel"
                style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)' }}
                whileHover={{ y: -4, boxShadow: 'var(--soft-shadow)' }}
              >
                <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.8rem' }}>{skill.name}</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6 }}>{Array.isArray(skill.tags) ? skill.tags.join(' · ') : skill.tags}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @media(min-width: 1024px) { .about-grid { grid-template-columns: 1fr 1fr; } }
      `}} />
    </section>
  );
};
export default About;
