import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
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

const EASE = [0.22, 1, 0.36, 1];

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
  const expandedRef = useRef(null);
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
        // Panel slides open → scroll so its top edge is in view (with breathing room)
        setTimeout(() => {
          if (!expandedRef.current) return;
          const rect = expandedRef.current.getBoundingClientRect();
          if (rect.top > window.innerHeight || rect.bottom < 0) {
            window.scrollTo({ top: window.scrollY + rect.top - 80, behavior: 'smooth' });
          }
        }, 460); // after panel has mostly finished opening
      }
      return next;
    });
  };

  // Split projects into rows of `cols`
  const rows = useMemo(() => {
    const result = [];
    for (let i = 0; i < projectsList.length; i += cols) {
      result.push(
        projectsList.slice(i, i + cols).map((p, j) => ({ ...p, originalIndex: i + j }))
      );
    }
    return result;
  }, [cols]);

  const selected = openIndex !== null ? projectsList[openIndex] : null;
  const gridCols = cols === 1 ? '1fr' : cols === 2 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)';
  const isMobile = cols === 1;

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
        ── Row-drawer layout ──
        Cards NEVER reposition. Clicking opens a smooth panel
        directly below the card's row — no jumping, no confusion.
      */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {rows.map((rowCards, rowIdx) => {
          const rowHasOpen = rowCards.some(p => p.originalIndex === openIndex);

          return (
            <React.Fragment key={rowIdx}>

              {/* ── Card row ── */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: gridCols,
                gap: '1.2rem',
                marginBottom: rowHasOpen ? '0' : '1.2rem',
              }}>
                {rowCards.map((proj) => {
                  const isOpen = openIndex === proj.originalIndex;
                  return (
                    <motion.div
                      key={proj.num}
                      initial={{ opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.5, delay: proj.originalIndex * 0.04, ease: EASE }}
                      whileHover={{ y: -3, transition: { duration: 0.18 } }}
                      onClick={() => toggle(proj.originalIndex)}
                      style={{
                        background: 'var(--card-bg)',
                        border: `1px solid ${isOpen ? proj.accent : proj.accent + '33'}`,
                        borderLeft: `3px solid ${proj.accent}`,
                        /* Active row cards lose bottom border so Drawer T-line can cap them perfectly */
                        borderBottom: rowHasOpen ? 'none' : `1px solid ${isOpen ? proj.accent : proj.accent + '33'}`,
                        padding: isMobile ? '1.4rem 1.2rem' : '1.8rem 2rem',
                        position: 'relative',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: isOpen
                          ? `0 12px 40px rgba(${proj.accentRaw},0.12)`
                          : 'none',
                        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                        zIndex: isOpen ? 2 : 1,
                      }}
                    >
                      {/* Ambient corner */}
                      <div style={{
                        position: 'absolute', top: 0, right: 0, width: 140, height: 90,
                        background: `radial-gradient(ellipse at top right, ${proj.accent}1c, transparent 70%)`,
                        pointerEvents: 'none',
                        transition: 'opacity 0.3s ease',
                        opacity: isOpen ? 1.5 : 1,
                      }} />

                      {/* Active dot indicator */}
                      {isOpen && (
                        <motion.div
                          layoutId="active-dot"
                          style={{
                            position: 'absolute', top: '1rem', left: '1rem',
                            width: 6, height: 6, borderRadius: '50%',
                            background: proj.accent,
                            boxShadow: `0 0 8px ${proj.accent}`,
                          }}
                          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                        />
                      )}

                      {/* Num + Status */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <span style={{
                          fontFamily: 'var(--font-mono)', fontSize: isMobile ? '0.52rem' : '0.6rem',
                          letterSpacing: '0.25em', color: `${proj.accent}bb`, textTransform: 'uppercase',
                          paddingLeft: isOpen ? '1rem' : '0',
                          transition: 'padding 0.3s ease',
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
                      <h3 style={{
                        fontFamily: 'var(--font-display)', fontWeight: 900,
                        color: 'var(--white)', textTransform: 'uppercase',
                        fontSize: isMobile ? '1.2rem' : '1.5rem',
                        lineHeight: 1.08, marginBottom: '0.35rem',
                      }}>
                        {proj.title}
                      </h3>

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
                        fontSize: isMobile ? '0.78rem' : '0.84rem',
                        color: 'var(--muted)', lineHeight: 1.7,
                        flex: 1, marginBottom: '0.8rem',
                      }}>
                        {proj.preview}
                      </p>

                      {/* Expand hint / open indicator */}
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.52rem', letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: isOpen ? proj.accent : proj.accent + 'aa',
                        borderBottom: `1px solid ${proj.accent}${isOpen ? '88' : '44'}`,
                        paddingBottom: '2px', alignSelf: 'flex-start',
                        transition: 'color 0.3s, border-color 0.3s',
                      }}>
                        {isOpen ? '− Details open ↓' : '+ Expand'}
                      </span>
                    </motion.div>
                  );
                })}

                {/* Fill empty slots in last row so grid stays balanced */}
                {rowCards.length < cols && Array.from({ length: cols - rowCards.length }).map((_, k) => (
                  <div key={`filler-${k}`} style={{
                    border: '1px solid transparent',
                    padding: isMobile ? '1.4rem 1.2rem' : '1.8rem 2rem',
                    visibility: 'hidden',
                  }} />
                ))}
              </div>

              {/* ── Expanded panel — slides open below the row ── */}
              <AnimatePresence>
                {rowHasOpen && selected && (
                  <motion.div
                    key={`panel-${openIndex}`}
                    ref={expandedRef}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    style={{ overflow: 'hidden', marginBottom: '1.2rem', position: 'relative' }}
                  >
                    {/* TOP LEFT T-LINE (Caps inactive cards on the left) */}
                    {!isMobile && (openIndex % cols) > 0 && (
                      <div style={{
                        position: 'absolute', top: 0, left: 0, height: '1px',
                        background: selected.accent,
                        width: `calc(((${openIndex % cols} * (100% - ${(cols - 1)} * 1.2rem) / ${cols}) + ${openIndex % cols} * 1.2rem))`,
                        zIndex: 10,
                      }} />
                    )}
                    
                    {/* TOP RIGHT T-LINE (Caps inactive cards on the right) */}
                    {!isMobile && (openIndex % cols) < cols - 1 && (
                      <div style={{
                        position: 'absolute', top: 0, right: 0, height: '1px',
                        background: selected.accent,
                        width: `calc(((${cols - 1 - (openIndex % cols)} * (100% - ${(cols - 1)} * 1.2rem) / ${cols}) + ${cols - 1 - (openIndex % cols)} * 1.2rem))`,
                        zIndex: 10,
                      }} />
                    )}
                    {/* Inner panel — seamlessly extends the open card */}
                    <motion.div
                      initial={{ y: -8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -8, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE, delay: 0.06 }}
                      style={{
                        /* Same background as cards */
                        background: 'var(--card-bg)',
                        /* Continue the card's border on all sides EXCEPT top */
                        borderLeft: `3px solid ${selected.accent}`,
                        borderRight: `1px solid ${selected.accent}`,
                        borderBottom: `1px solid ${selected.accent}`,
                        borderTop: 'none',
                        padding: isMobile ? '1.4rem 1.2rem' : '2rem 2.8rem',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      {/* Subtle top separator line inside panel */}
                      <div style={{
                        height: '1px',
                        background: `linear-gradient(90deg, ${selected.accent}66, ${selected.accent}11, transparent)`,
                        marginBottom: isMobile ? '1.2rem' : '1.6rem',
                      }} />

                      {/* Soft ambient glow */}
                      <div style={{
                        position: 'absolute', top: '-40px', right: '-40px',
                        width: 240, height: 240,
                        background: `radial-gradient(circle, rgba(${selected.accentRaw},0.08), transparent 70%)`,
                        pointerEvents: 'none',
                      }} />

                      {/* Full description */}
                      <p style={{
                        fontSize: isMobile ? '0.83rem' : '0.92rem',
                        color: 'var(--muted)', lineHeight: 1.88,
                        borderLeft: `2px solid rgba(${selected.accentRaw},0.5)`,
                        paddingLeft: '1.1rem',
                        marginBottom: '1.4rem',
                        position: 'relative',
                      }}>
                        {selected.desc}
                      </p>

                      {/* Tech tags */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.6rem' }}>
                        {selected.tags.map((tag, idx) => (
                          <motion.span
                            key={idx}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.12 + idx * 0.055 }}
                            style={{
                              padding: '0.28rem 0.7rem',
                              border: `1px solid rgba(${selected.accentRaw},0.4)`,
                              fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
                              letterSpacing: '0.1em', color: selected.accent,
                              textTransform: 'uppercase',
                            }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        <a
                          href={selected.link}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                            fontFamily: 'var(--font-mono)',
                            fontSize: isMobile ? '0.55rem' : '0.58rem',
                            letterSpacing: '0.15em', textTransform: 'uppercase',
                            textDecoration: 'none',
                            padding: isMobile ? '0.6rem 1.2rem' : '0.7rem 1.6rem',
                            background: selected.accent, color: 'var(--black)', fontWeight: 700,
                            border: `1px solid ${selected.accent}`,
                            transition: 'transform 0.18s ease, box-shadow 0.18s ease',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translate(-2px,-2px)';
                            e.currentTarget.style.boxShadow = `4px 4px 0 rgba(${selected.accentRaw},0.45)`;
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.transform = '';
                            e.currentTarget.style.boxShadow = '';
                          }}
                        >
                          ↗ {selected.status === 'Live' ? 'View Live' : 'View Demo'}
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
                  </motion.div>
                )}
              </AnimatePresence>

            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
