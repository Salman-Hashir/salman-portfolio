import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projectsList = [
  {
    num: '01', status: 'Live', icon: '🤖',
    title: 'FLUW AI',
    sub: 'WhatsApp AI Assistant',
    preview: 'An intelligent WhatsApp bot that handles customer interactions and lead management automatically.',
    desc: 'An intelligent conversational agent integrated with the WhatsApp Cloud API. Engineered to handle real-time customer interactions, business inquiries, and lead management automatically.',
    tags: ['Python', 'FastAPI', 'WhatsApp API', 'Bot'],
    link: '#',
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

// One spring config everywhere → consistent, silky feel
const SPRING = { type: 'spring', stiffness: 300, damping: 36, mass: 0.85 };

// Responsive grid columns hook
const useColumns = () => {
  const [cols, setCols] = useState(() => {
    if (typeof window === 'undefined') return 3;
    return window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3;
  });
  useEffect(() => {
    const update = () => setCols(window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3);
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return cols;
};

const Projects = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);
  const cardRefs = useRef({});
  const cols = useColumns();
  const [glow, setGlow] = useState({ x: -999, y: -999, opacity: 0 });

  const handleMouseMove = useCallback((e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setGlow({ x: e.clientX - rect.left, y: e.clientY - rect.top, opacity: 1 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setGlow(g => ({ ...g, opacity: 0 }));
  }, []);

  const toggle = (i) => {
    setOpenIndex(prev => {
      const next = prev === i ? null : i;
      if (next !== null) {
        // Give Framer Motion time to run the layout spring, then scroll card into view
        setTimeout(() => {
          cardRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 260);
      }
      return next;
    });
  };

  const isMobile = cols === 1;
  const gridCols = cols === 1 ? '1fr' : cols === 2 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)';

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
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <span className="label" style={{ display: 'block', marginBottom: '1rem' }}>Selected Work</span>
        <h2 className="title-medium" style={{ marginBottom: '3.5rem' }}>Projects That Help People</h2>
      </motion.div>

      {/*
        ── Grid ──
        Cards expand IN PLACE. When a card gets gridColumn 1/-1,
        CSS grid auto-placement keeps it near its original row while
        nudging siblings — Framer Motion layout/SPRING animates the whole reflow.
      */}
      <motion.div
        layout
        transition={SPRING}
        style={{
          display: 'grid',
          gridTemplateColumns: gridCols,
          gap: '1.2rem',
          position: 'relative',
          zIndex: 1,
          alignItems: 'start',
        }}
      >
        {projectsList.map((proj, i) => {
          const isOpen = openIndex === i;
          const showRowLayout = isOpen && !isMobile; // side-by-side only on wider screens

          return (
            <motion.div
              key={proj.num}
              ref={el => { cardRefs.current[i] = el; }}
              layout
              transition={SPRING}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              animate={{
                padding: isOpen
                  ? (isMobile ? '1.8rem 1.4rem' : '2.5rem 2.8rem')
                  : (isMobile ? '1.4rem 1.2rem' : '1.8rem 2rem'),
                boxShadow: isOpen
                  ? `0 0 0 1px rgba(${proj.accentRaw},0.4), 0 24px 80px rgba(${proj.accentRaw},0.18)`
                  : `0 0 0 0px rgba(0,0,0,0)`,
              }}
              whileHover={!isOpen ? { y: -4 } : {}}
              onClick={() => toggle(i)}
              style={{
                background: 'var(--card-bg)',
                border: `1px solid ${proj.accent}33`,
                borderLeft: `3px solid ${proj.accent}`,
                position: 'relative',
                overflow: 'hidden',
                cursor: isOpen ? 'default' : 'pointer',
                /* Expand to fill the full grid row */
                gridColumn: isOpen ? '1 / -1' : 'auto',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Top accent bar */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    key="topbar"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                    style={{
                      position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                      background: `linear-gradient(90deg, ${proj.accent}, ${proj.accent}00)`,
                      transformOrigin: 'left',
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Ambient corner pulse */}
              <motion.div
                animate={{ width: isOpen ? 340 : 140, height: isOpen ? 220 : 90 }}
                transition={SPRING}
                style={{
                  position: 'absolute', top: 0, right: 0, pointerEvents: 'none',
                  background: `radial-gradient(ellipse at top right, ${proj.accent}1c, transparent 70%)`,
                }}
              />

              {/* ── Card content ── */}
              <div style={{
                display: 'flex',
                flexDirection: showRowLayout ? 'row' : 'column',
                gap: showRowLayout ? '2.8rem' : '0',
                alignItems: showRowLayout ? 'flex-start' : 'stretch',
                flex: 1,
              }}>

                {/* LEFT — identity block */}
                <div style={{
                  flex: showRowLayout ? '0 0 360px' : '1',
                  minWidth: 0,
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  {/* Num + Status */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: isMobile ? '0.52rem' : '0.6rem',
                      letterSpacing: '0.25em', color: `${proj.accent}bb`, textTransform: 'uppercase',
                    }}>
                      {proj.icon}&nbsp;&nbsp;{proj.num}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.15em',
                      textTransform: 'uppercase', color: statusColors[proj.status],
                      border: `1px solid ${statusColors[proj.status]}55`, padding: '0.2rem 0.6rem',
                      whiteSpace: 'nowrap',
                    }}>
                      ● {proj.status}
                    </span>
                  </div>

                  {/* Title */}
                  <motion.h3
                    animate={{ fontSize: isOpen ? (isMobile ? '1.6rem' : '2.2rem') : (isMobile ? '1.15rem' : '1.5rem') }}
                    transition={SPRING}
                    style={{
                      fontFamily: 'var(--font-display)', fontWeight: 900,
                      color: 'var(--white)', textTransform: 'uppercase',
                      lineHeight: 1.08, marginBottom: '0.35rem',
                    }}
                  >
                    {proj.title}
                  </motion.h3>

                  {/* Sub */}
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: isMobile ? '0.5rem' : '0.55rem',
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: `${proj.accent}99`, marginBottom: '0.85rem', display: 'block',
                  }}>
                    {proj.sub}
                  </span>

                  {/* Preview */}
                  <p style={{
                    fontSize: isMobile ? '0.8rem' : '0.85rem', color: 'var(--muted)',
                    lineHeight: 1.75,
                    marginBottom: isOpen ? 0 : '0.8rem',
                    flex: 1,
                  }}>
                    {proj.preview}
                  </p>

                  {/* Expand hint */}
                  <AnimatePresence>
                    {!isOpen && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          fontFamily: 'var(--font-mono)', fontSize: '0.52rem', letterSpacing: '0.15em',
                          textTransform: 'uppercase', color: proj.accent,
                          borderBottom: `1px solid ${proj.accent}44`, paddingBottom: '2px',
                          marginTop: '0.4rem', alignSelf: 'flex-start',
                        }}
                      >
                        + Expand
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                {/* RIGHT (or BOTTOM on mobile) — expanded panel */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, x: showRowLayout ? 30 : 0, y: showRowLayout ? 0 : 16 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      exit={{ opacity: 0, x: showRowLayout ? 30 : 0, y: showRowLayout ? 0 : 16 }}
                      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1], delay: 0.15 }}
                      style={{
                        flex: 1, display: 'flex', flexDirection: 'column',
                        gap: '1.3rem', position: 'relative',
                        marginTop: showRowLayout ? 0 : '1.4rem',
                        paddingTop: showRowLayout ? 0 : '1.4rem',
                        borderTop: showRowLayout ? 'none' : `1px solid ${proj.accent}25`,
                      }}
                      onClick={e => e.stopPropagation()}
                    >
                      {/* Vertical divider (desktop only) */}
                      {showRowLayout && (
                        <motion.div
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          exit={{ scaleY: 0 }}
                          transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                          style={{
                            position: 'absolute', left: '-1.4rem', top: 0, bottom: 0,
                            width: '1px',
                            background: `linear-gradient(to bottom, transparent, ${proj.accent}50, transparent)`,
                            transformOrigin: 'top',
                          }}
                        />
                      )}

                      {/* Full description */}
                      <p style={{
                        fontSize: isMobile ? '0.82rem' : '0.9rem', color: 'var(--muted)', lineHeight: 1.85,
                        borderLeft: `2px solid ${proj.accent}55`, paddingLeft: '1rem',
                      }}>
                        {proj.desc}
                      </p>

                      {/* Tech tags */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                        {proj.tags.map((tag, idx) => (
                          <motion.span
                            key={idx}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + idx * 0.06, duration: 0.28 }}
                            style={{
                              padding: '0.28rem 0.75rem',
                              border: `1px solid ${proj.accent}55`,
                              fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
                              letterSpacing: '0.1em', color: proj.accent, textTransform: 'uppercase',
                            }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '0.2rem' }}>
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                            fontFamily: 'var(--font-mono)', fontSize: isMobile ? '0.55rem' : '0.58rem',
                            letterSpacing: '0.15em', textTransform: 'uppercase',
                            textDecoration: 'none',
                            padding: isMobile ? '0.55rem 1.1rem' : '0.65rem 1.5rem',
                            background: proj.accent, color: 'var(--black)', fontWeight: 700,
                            border: `1px solid ${proj.accent}`,
                            transition: 'transform 0.18s ease, box-shadow 0.18s ease',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translate(-2px,-2px)';
                            e.currentTarget.style.boxShadow = `4px 4px 0 rgba(${proj.accentRaw},0.4)`;
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.transform = '';
                            e.currentTarget.style.boxShadow = '';
                          }}
                        >
                          ↗ {proj.status === 'Live' ? 'View Live' : 'View Demo'}
                        </a>
                        <button
                          onClick={() => setOpenIndex(null)}
                          style={{
                            fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
                            letterSpacing: '0.15em', textTransform: 'uppercase',
                            color: 'var(--muted)', background: 'none', border: 'none',
                            cursor: 'pointer', textDecoration: 'underline',
                            transition: 'color 0.2s ease',
                          }}
                          onMouseEnter={e => e.currentTarget.style.color = 'var(--white)'}
                          onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
                        >
                          − Close
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default Projects;
