import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const projectsList = [
  {
    num: '01', status: 'Live', icon: '🤖',
    title: 'FLUW AI',
    sub: 'WhatsApp AI Assistant',
    preview: 'An intelligent WhatsApp bot that handles customer interactions and lead management automatically.',
    desc: 'An intelligent conversational agent integrated with the WhatsApp Cloud API. Engineered to handle real-time customer interactions, business inquiries, and lead management automatically.',
    tags: ['Python', 'FastAPI', 'WhatsApp API', 'Bot'],
    link: 'demos/fluw-ai.html',
    accent: 'var(--neon-green)',
    accentRaw: '74,222,128',
  },
  {
    num: '02', status: 'Live', icon: '🎯',
    title: 'DARE.ME',
    sub: 'Real-time Interactive Video Platform',
    preview: 'Peer-to-peer video chat with built-in AI Truth or Dare prompts — no server relay.',
    desc: 'A real-time interactive video chat platform with built-in AI "Truth or Dare" prompts. Peer-to-peer communication with no server relay — pure WebRTC magic.',
    tags: ['WebRTC', 'WebSockets', 'Node.js', 'AI Prompts'],
    link: 'https://dareme-blue.vercel.app/',
    accent: 'var(--neon-pink)',
    accentRaw: '244,63,94',
  },
  {
    num: '03', status: 'Live', icon: '⚡',
    title: 'TryZappit',
    sub: 'Serverless P2P File Sharing',
    preview: 'Transfer unlimited-size files directly between browsers — no cloud, no middleman.',
    desc: 'A serverless, peer-to-peer file-sharing app that transfers files of unlimited size directly between browsers — no upload limits, no cloud storage, no middleman.',
    tags: ['WebRTC', 'P2P', 'Serverless', 'Data Channels'],
    link: 'https://tryzappit.vercel.app/',
    accent: 'var(--neon-cyan)',
    accentRaw: '6,182,212',
  },
  {
    num: '04', status: 'In Dev', icon: '📰',
    title: 'Vaartha',
    sub: 'AI Malayalam News Aggregator',
    preview: 'Automated PWA that translates global news into authentic Malayalam in real time via Claude AI.',
    desc: 'A fully automated PWA that scrapes global RSS feeds and translates them into authentic Malayalam prose in real time using the Claude AI API. For the global Malayalam diaspora.',
    tags: ['Next.js 14', 'Claude API', 'Supabase', 'Malayalam NLP'],
    link: 'demos/vaartha.html',
    accent: 'var(--neon-yellow)',
    accentRaw: '250,204,21',
  },
  {
    num: '05', status: 'In Dev', icon: '🔍',
    title: 'DealSpy',
    sub: 'Cross-Platform Price Aggregator',
    preview: 'Tracks the best deals across Amazon, Flipkart & Noon with lightning-fast cached results.',
    desc: 'A price aggregator and affiliate monetization engine tracking deals across Amazon, Flipkart, Noon, and travel APIs — with in-memory caching for lightning-fast search results.',
    tags: ['Next.js', 'Node.js', 'Caching', 'Affiliate APIs'],
    link: 'demos/dealspy.html',
    accent: 'var(--neon-pink)',
    accentRaw: '244,63,94',
  },
  {
    num: '06', status: 'In Dev', icon: '✦',
    title: 'Fluw Digital',
    sub: 'Digital Marketing Agency Site',
    preview: 'A premium animated corporate landing page with scroll-reveal effects and CSS variable theming.',
    desc: 'A modern, animated corporate landing page for a digital marketing agency — built with semantic HTML, advanced CSS variables, and Vanilla JS scroll-reveal animations.',
    tags: ['HTML', 'CSS Variables', 'Vanilla JS', 'Animations'],
    link: 'demos/fluw-digital.html',
    accent: 'var(--neon-cyan)',
    accentRaw: '6,182,212',
  },
  {
    num: '07', status: 'Coming Soon', icon: '💞',
    title: 'Our Story',
    sub: 'Shared Couples Journal',
    preview: 'A private digital space for couples to store memories, notes, and milestones together.',
    desc: 'A beautiful shared space built exclusively for couples — add notes, special dates, photos, and memories together in one place. A living journal of your relationship.',
    tags: ['React', 'Gemini API', 'Supabase', 'Real-time'],
    link: 'demos/our-story.html',
    accent: 'var(--neon-green)',
    accentRaw: '74,222,128',
  },
  {
    num: '08', status: 'College', icon: '🩸',
    title: 'Blood Bank',
    sub: 'Donor Management System',
    preview: 'A PHP & MySQL app managing blood inventory, donor records, and requests — college capstone.',
    desc: 'A backend-driven local database application managing blood inventory, donor registration, and blood requests — built with core PHP and MySQL as a college capstone project.',
    tags: ['PHP', 'MySQL', 'Backend', 'College Project'],
    link: 'demos/blood-bank.html',
    accent: 'var(--neon-yellow)',
    accentRaw: '250,204,21',
  },
];

const statusColors = {
  'Live': 'var(--neon-green)',
  'In Dev': 'var(--neon-cyan)',
  'Coming Soon': 'var(--muted)',
  'College': 'var(--muted)',
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
};

function ProjectCard({ proj, index }) {
  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}
      variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.07 } } }}
      style={{
        background: 'var(--card-bg)',
        border: `1px solid ${proj.accent}33`,
        borderLeft: `3px solid ${proj.accent}`,
        padding: '1.8rem 2rem',
        display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden',
        transition: 'box-shadow 0.3s, transform 0.3s',
      }}
      whileHover={{ y: -4, boxShadow: `0 8px 40px ${proj.accent}22` }}
    >
      {/* Glow top-right */}
      <div style={{
        position: 'absolute', top: 0, right: 0, width: '120px', height: '80px',
        background: `radial-gradient(ellipse at top right, ${proj.accent}15, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.25em', color: `${proj.accent}bb`, textTransform: 'uppercase' }}>
          {proj.num}
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.15em',
          textTransform: 'uppercase', color: 'var(--black)', background: statusColors[proj.status] || proj.accent,
          padding: '0.2rem 0.6rem', fontWeight: 700,
        }}>{proj.status}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
        <span style={{ fontSize: '1.2rem' }}>{proj.icon}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: `${proj.accent}99` }}>
          {proj.sub}
        </span>
      </div>

      <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--white)', lineHeight: 1.3, marginBottom: '0.9rem' }}>
        {proj.title}
      </h3>
      <p style={{ fontSize: '0.85rem', fontWeight: 300, color: 'var(--muted)', lineHeight: 1.8, marginBottom: '1.5rem', flexGrow: 1 }}>
        {proj.desc}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {proj.tags.map(tag => (
          <span key={tag} style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.1em',
            textTransform: 'uppercase', padding: '0.2rem 0.6rem', border: '1px solid var(--border-subtle)',
            color: 'var(--muted)', background: 'var(--black)'
          }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <a href={proj.link} target={proj.link === '#' ? '_self' : '_blank'} rel="noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.15em',
            textTransform: 'uppercase', textDecoration: 'none',
            padding: '0.5rem 1.1rem', background: 'transparent', color: 'var(--muted)', fontWeight: 700,
            border: '1px solid var(--download-border)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = proj.accent; e.currentTarget.style.color = proj.accent; e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = `4px 4px 0 ${proj.accent}55`; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--download-border)'; e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
        >
          {proj.link.includes('demos') || proj.link === '#' ? '👁 View Demo' : '🌐 Visit Live'}
        </a>
      </div>
    </motion.div>
  );
}

const Projects = () => {
  const sectionRef = useRef(null);
  const [glow, setGlow] = useState({ x: -999, y: -999, opacity: 0 });

  const handleMouseMove = useCallback((e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setGlow({ x: e.clientX - rect.left, y: e.clientY - rect.top, opacity: 1 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setGlow(g => ({ ...g, opacity: 0 }));
  }, []);

  return (
    <section
      id="projects"
      className="section-padding"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ background: 'var(--black-alt)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Mouse spotlight */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        opacity: glow.opacity, transition: 'opacity 0.4s ease',
        background: `
          radial-gradient(500px circle at ${glow.x}px ${glow.y}px, rgba(6,182,212,0.10), transparent 50%),
          radial-gradient(300px circle at ${glow.x - 80}px ${glow.y + 60}px, rgba(244,63,94,0.08), transparent 50%)
        `,
      }} />

      <div className="sep-line" style={{ marginTop: 0, position: 'relative', zIndex: 1 }} />

      <motion.div
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={fadeUp}
        style={{ position: 'relative', zIndex: 1, marginBottom: '3.5rem' }}
      >
        <span className="label" style={{ display: 'block', marginBottom: '1rem' }}>Selected Work</span>
        <h2 className="title-medium">Projects That Help People</h2>
      </motion.div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.2rem',
        }}>
          {projectsList.map((proj, i) => (
            <ProjectCard key={proj.num} proj={proj} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
