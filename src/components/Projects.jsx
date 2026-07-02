import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
};

function ProjectCard({ proj, index }) {
  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}
      variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.07 } } }}
      className="glass-panel"
      style={{ borderRadius: 'var(--radius-lg)', padding: '2rem', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)' }}
      whileHover={{ y: -4, boxShadow: 'var(--hover-shadow)' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <span style={{ fontSize: '1.5rem' }}>{proj.icon}</span>
        <span style={{ fontSize: '0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--accent-blue)', background: 'var(--accent-light)', padding: '0.2rem 0.6rem', fontWeight: 600, borderRadius: 'var(--radius-full)' }}>{proj.status}</span>
      </div>
      <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--muted)', marginBottom: '0.4rem', display: 'block' }}>{proj.sub}</span>
      <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: '0.8rem' }}>{proj.title}</h3>
      <p style={{ fontSize: '0.95rem', fontWeight: 400, color: 'var(--muted)', lineHeight: 1.6, marginBottom: '1.5rem', flexGrow: 1 }}>{proj.desc}</p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {(Array.isArray(proj.tags) ? proj.tags : (proj.tags || '').split(',')).map(tag => (
          <span key={tag} style={{ fontSize: '0.75rem', fontWeight: 500, padding: '0.3rem 0.8rem', background: 'var(--bg-main)', color: 'var(--muted)', borderRadius: 'var(--radius-sm)' }}>{tag.trim()}</span>
        ))}
      </div>
      <a href={proj.link} target={proj.link?.startsWith('http') ? '_blank' : '_self'} rel="noreferrer"
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 500, textDecoration: 'none', color: 'var(--accent-blue)', transition: 'color 0.2s' }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--accent-blue)'}
      >
        {proj.link?.includes('demos') ? 'View Demo →' : 'Visit Site →'}
      </a>
    </motion.div>
  );
}

const Projects = () => {
  const { content } = useContent();
  const projects = content.projects || [];

  return (
    <section id="projects" className="section-padding" style={{ background: 'var(--section-bg)' }}>
      <div className="sep-line" style={{ marginTop: 0 }} />
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={fadeUp} style={{ marginBottom: '3.5rem' }}>
        <span className="label">Selected Work</span>
        <h2 className="title-medium">Projects That Help People</h2>
      </motion.div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {projects.map((proj, i) => <ProjectCard key={proj.id || i} proj={proj} index={i} />)}
      </div>
    </section>
  );
};
export default Projects;
