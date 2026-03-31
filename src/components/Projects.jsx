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
  },
  {
    num: '02', status: 'Live', icon: '🎯',
    title: 'DARE.ME',
    sub: 'Real-time Interactive Video Platform',
    preview: 'Peer-to-peer video chat with built-in AI Truth or Dare prompts — no server relay.',
    desc: 'A real-time interactive video chat platform with built-in AI "Truth or Dare" prompts. Peer-to-peer communication with no server relay — pure WebRTC magic.',
    tags: ['WebRTC', 'WebSockets', 'Node.js', 'AI Prompts'],
    link: 'https://dareme-blue.vercel.app/',
  },
  {
    num: '03', status: 'Live', icon: '⚡',
    title: 'TryZappit',
    sub: 'Serverless P2P File Sharing',
    preview: 'Transfer unlimited-size files directly between browsers — no cloud, no middleman.',
    desc: 'A serverless, peer-to-peer file-sharing app that transfers files of unlimited size directly between browsers — no upload limits, no cloud storage, no middleman.',
    tags: ['WebRTC', 'P2P', 'Serverless', 'Data Channels'],
    link: 'https://tryzappit.vercel.app/',
  },
  {
    num: '04', status: 'In Dev', icon: '📰',
    title: 'Vaartha',
    sub: 'AI Malayalam News Aggregator',
    preview: 'Automated PWA that translates global news into authentic Malayalam in real time via Claude AI.',
    desc: 'A fully automated PWA that scrapes global RSS feeds and translates them into authentic Malayalam prose in real time using the Claude AI API. For the global Malayalam diaspora.',
    tags: ['Next.js 14', 'Claude API', 'Supabase', 'Malayalam NLP'],
    link: 'demos/vaartha.html',
  },
  {
    num: '05', status: 'In Dev', icon: '🔍',
    title: 'DealSpy',
    sub: 'Cross-Platform Price Aggregator',
    preview: 'Tracks the best deals across Amazon, Flipkart & Noon with lightning-fast cached results.',
    desc: 'A price aggregator and affiliate monetization engine tracking deals across Amazon, Flipkart, Noon, and travel APIs — with in-memory caching for lightning-fast search results.',
    tags: ['Next.js', 'Node.js', 'Caching', 'Affiliate APIs'],
    link: 'demos/dealspy.html',
  },
  {
    num: '06', status: 'In Dev', icon: '✦',
    title: 'Fluw Digital',
    sub: 'Digital Marketing Agency Site',
    preview: 'A premium animated corporate landing page with scroll-reveal effects and CSS variable theming.',
    desc: 'A modern, animated corporate landing page for a digital marketing agency — built with semantic HTML, advanced CSS variables, and Vanilla JS scroll-reveal animations.',
    tags: ['HTML', 'CSS Variables', 'Vanilla JS', 'Animations'],
    link: 'demos/fluw-digital.html',
  },
  {
    num: '07', status: 'Coming Soon', icon: '💞',
    title: 'Our Story',
    sub: 'Shared Couples Journal',
    preview: 'A private digital space for couples to store memories, notes, and milestones together.',
    desc: 'A beautiful shared space built exclusively for couples — add notes, special dates, photos, and memories together in one place. A living journal of your relationship.',
    tags: ['React', 'Gemini API', 'Supabase', 'Real-time'],
    link: 'demos/our-story.html',
  },
  {
    num: '08', status: 'College', icon: '🩸',
    title: 'Blood Bank',
    sub: 'Donor Management System',
    preview: 'A PHP & MySQL app managing blood inventory, donor records, and requests — college capstone.',
    desc: 'A backend-driven local database application managing blood inventory, donor registration, and blood requests — built with core PHP and MySQL as a college capstone project.',
    tags: ['PHP', 'MySQL', 'Backend', 'College Project'],
    link: 'demos/blood-bank.html',
  },
];

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
      style={{
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
        display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
      }}
      whileHover={{ y: -4, boxShadow: 'var(--hover-shadow)' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <span style={{ fontSize: '1.5rem' }}>{proj.icon}</span>
        <span style={{
          fontSize: '0.75rem', letterSpacing: '0.05em',
          textTransform: 'uppercase', color: 'var(--accent-blue)', background: 'var(--accent-light)',
          padding: '0.2rem 0.6rem', fontWeight: 600, borderRadius: 'var(--radius-full)'
        }}>{proj.status}</span>
      </div>

      <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--muted)', marginBottom: '0.4rem', display: 'block' }}>
        {proj.sub}
      </span>

      <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: '0.8rem' }}>
        {proj.title}
      </h3>
      <p style={{ fontSize: '0.95rem', fontWeight: 400, color: 'var(--muted)', lineHeight: 1.6, marginBottom: '1.5rem', flexGrow: 1 }}>
        {proj.desc}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {proj.tags.map(tag => (
          <span key={tag} style={{
            fontSize: '0.75rem', fontWeight: 500, padding: '0.3rem 0.8rem',
            background: 'var(--bg-main)', color: 'var(--muted)', borderRadius: 'var(--radius-sm)'
          }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex' }}>
        <a href={proj.link} target={proj.link === '#' ? '_self' : '_blank'} rel="noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            fontSize: '0.85rem', fontWeight: 500,
            textDecoration: 'none',
            color: 'var(--accent-blue)',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--accent-blue)' }}
        >
          {proj.link.includes('demos') || proj.link === '#' ? 'View Demo →' : 'Visit Site →'}
        </a>
      </div>
    </motion.div>
  );
}

const Projects = () => {
  return (
    <section id="projects" className="section-padding" style={{ background: 'var(--section-bg)' }}>
      <div className="sep-line" style={{ marginTop: 0 }} />

      <motion.div
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={fadeUp}
        style={{ marginBottom: '3.5rem' }}
      >
        <span className="label">Selected Work</span>
        <h2 className="title-medium">Projects That Help People</h2>
      </motion.div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem',
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
