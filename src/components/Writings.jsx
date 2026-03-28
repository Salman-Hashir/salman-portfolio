import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
};

/* ─── DATA ─────────────────────────────────────────────── */

const BOOKS = [
  {
    num: 'I', lang: 'Malayalam', genre: 'Psychological Thriller · Sci-Fi Novel',
    title: 'Anantharam (അനന്തരം)',
    desc: "A gripping psychological thriller bending the boundaries of time and sanity. Writer Siddharth visits an abandoned century-old estate in Vagamon, uncovering a terrifying time-loop hidden inside a 1924 clock tower.",
    pdfLink: 'books/Anantharam.pdf',
    htmlLink: null,
    accent: 'var(--neon-pink)',
  },
  {
    num: 'II', lang: 'Malayalam', genre: 'Epic High Fantasy · Series — Vol. 1',
    title: 'Eryndor: The Era of Blood (Vol. 1)',
    desc: "Volume 1 of a sprawling epic fantasy saga. Amidst political betrayal and a faltering royal dynasty, a terrifying life-draining plague called the 'Hollows' emerges from the North.",
    pdfLink: 'books/eryndor.pdf',
    htmlLink: null,
    accent: 'var(--neon-cyan)',
  },
];


const RESEARCH = [
  {
    num: '01', type: 'HTML', category: 'Research Study · AI',
    title: 'AI Tools Study Report',
    desc: 'A detailed research report analyzing modern AI tools, their applications, and potential impact on the tech landscape. Covers LLMs, automation tools, and productivity stacks.',
    link: 'blogs-and-reports/ai-tools-study-report.html',
    accent: 'var(--neon-cyan)',
  },
  {
    num: '03', type: 'HTML', category: 'Tech Report · Hardware',
    title: 'PC Hardware Guide',
    desc: 'A comprehensive guide detailing PC hardware components, building process, thermal management, and component selection recommendations for enthusiasts and first-time builders.',
    link: 'books/PC_Hardware_Guide.html',
    accent: 'var(--neon-yellow)',
  },
];

const JOURNEY = {
  tech: [
    {
      num: 'T-01', category: 'Tech Article',
      title: 'Diploma vs Degree in Tech',
      desc: 'An insightful post discussing the differences, benefits, and career prospects of holding a diploma versus a full-fledged degree in the evolving job market and tech industry.',
      link: 'blogs-and-reports/diploma-vs-degree-blog.html',
      accent: 'var(--neon-cyan)',
      icon: '⚙️',
    },
    {
      num: 'T-02', category: 'Tech Article',
      title: 'Getting Started as a Fresher',
      desc: 'A practical guide for freshers navigating the job market with zero prior experience — outlining strategies to build a strong dev profile and land real opportunities.',
      link: 'blogs-and-reports/fresher-no-experience-blog.html',
      accent: 'var(--neon-green)',
      icon: '🚀',
    },
    {
      num: 'T-03', category: 'Tech Article',
      title: "Salman's PC Diaries",
      desc: 'A personal tech journal documenting my setup evolution, hardware upgrades, gaming sessions, free game claims, YouTube rabbit holes, and casual tech experiments over the years.',
      link: 'blogs-and-reports/salman-blog.html',
      accent: 'var(--neon-yellow)',
      icon: '🖥️',
    },
  ],
  investigation: [
    {
      num: 'I-01', category: 'Investigation Article',
      title: 'Black Magic: The Complete Study of Dark Arts',
      desc: 'A research-driven investigation into dark arts across cultures — from Ancient Egypt and Mesopotamia to Voodoo and Kerala practices — using psychology to decode what is attributed to curses and rituals.',
      link: 'books/BlackMagic_SalmanHashir.html',
      accent: 'var(--neon-pink)',
      icon: '🔮',
    },
    {
      num: 'I-02', category: 'Investigation Article',
      title: 'Dark Worship: Cults, Rituals & Secret Societies',
      desc: 'Exposing the manipulative psychology behind cults and secret societies — from ancient deities like Baal and Moloch to modern cults like Jonestown and NXIVM — documenting ritualistic crimes and recruitment tactics.',
      link: 'books/dark_worship.html',
      accent: 'var(--neon-pink)',
      icon: '🕯️',
    },
    {
      num: 'I-03', category: 'Investigation Article',
      title: 'Paranormal Gaveshanam: A Field Study',
      desc: 'An investigative breakdown of paranormal hotspots across Kerala — cross-referencing eyewitness accounts, folklore, and scientific explanations for the Wayanad Chain Tree, Bonacaud Bungalow, and more.',
      link: 'books/paranormal_gaveshanam_v2-1.html',
      accent: 'var(--neon-pink)',
      icon: '👁️',
    },
  ],
  caseDiary: [
    {
      num: 'C-01', category: 'Case Diary',
      title: 'Consciousness & the Soul: Science vs Spirituality',
      desc: 'A personal deep-dive into the mysteries of human awareness — exploring the Hard Problem of Consciousness, quantum theories, sleep paralysis, lucid dreaming, astral projection, and near-death experiences.',
      link: 'books/consciousness_and_soul.html',
      accent: 'var(--neon-cyan)',
      icon: '🧠',
    },
    {
      num: 'C-02', category: 'Case Diary',
      title: 'DID Case Study (2026)',
      desc: 'An in-depth case study and technical report exploring Decentralized Identity (DID), its standards, on-chain implementations, and real-world enterprise use cases.',
      link: 'blogs-and-reports/DID_Case_Study_Salman_Hashir_2026.pdf',
      accent: 'var(--neon-green)',
      icon: '🔐',
    },
  ],
};

/* ─── SUB-COMPONENTS ─────────────────────────────────────── */

function SectionLabel({ children, color = 'var(--neon-cyan)' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.3em',
        textTransform: 'uppercase', color, fontWeight: 700,
        background: `${color}18`, padding: '0.35rem 1rem',
        border: `1px solid ${color}55`,
      }}>{children}</span>
      <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, ${color}44, transparent)` }} />
    </div>
  );
}

function BookCard({ book, index }) {
  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}
      variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.07 } } }}
      style={{
        background: 'var(--card-bg)',
        border: `1px solid ${book.accent}33`,
        borderLeft: `3px solid ${book.accent}`,
        padding: '1.8rem 2rem',
        display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden',
        transition: 'box-shadow 0.3s, transform 0.3s',
      }}
      whileHover={{ y: -4, boxShadow: `0 8px 40px ${book.accent}22` }}
    >
      {/* Glow top-right */}
      <div style={{
        position: 'absolute', top: 0, right: 0, width: '120px', height: '80px',
        background: `radial-gradient(ellipse at top right, ${book.accent}15, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.25em', color: `${book.accent}bb`, textTransform: 'uppercase' }}>
          Vol. {book.num}
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.15em',
          textTransform: 'uppercase', color: 'var(--black)', background: book.accent,
          padding: '0.2rem 0.6rem', fontWeight: 700,
        }}>{book.lang}</span>
      </div>

      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: `${book.accent}99`, marginBottom: '0.6rem', display: 'block' }}>
        {book.genre}
      </span>

      <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--white)', lineHeight: 1.3, marginBottom: '0.9rem' }}>
        {book.title}
      </h3>
      <p style={{ fontSize: '0.85rem', fontWeight: 300, color: 'var(--muted)', lineHeight: 1.8, marginBottom: '1.5rem', flexGrow: 1 }}>
        {book.desc}
      </p>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        {book.htmlLink ? (
          // Has HTML version → show only Read Online (HTML)
          <a href={book.htmlLink} target="_blank" rel="noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.15em',
              textTransform: 'uppercase', textDecoration: 'none',
              padding: '0.5rem 1.1rem', background: book.accent, color: 'var(--black)', fontWeight: 700,
              border: `1px solid ${book.accent}`,
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = `4px 4px 0 ${book.accent}55`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
          >
            👁 Read Online
          </a>
        ) : (
          // PDF only → Read Online (open in tab) + Download
          <>
            <a href={book.pdfLink} target="_blank" rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.15em',
                textTransform: 'uppercase', textDecoration: 'none',
                padding: '0.5rem 1.1rem', background: book.accent, color: 'var(--black)', fontWeight: 700,
                border: `1px solid ${book.accent}`,
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = `4px 4px 0 ${book.accent}55`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
            >
              👁 Read Online
            </a>
            <a href={book.pdfLink} download
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.15em',
                textTransform: 'uppercase', textDecoration: 'none',
                padding: '0.5rem 1.1rem', background: 'transparent', color: 'var(--muted)',
                border: '1px solid var(--download-border)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = book.accent; e.currentTarget.style.color = book.accent; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--download-border)'; e.currentTarget.style.color = 'var(--muted)'; }}
            >
              ⬇ Download
            </a>
          </>
        )}
      </div>
    </motion.div>
  );
}

function ResearchCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        background: 'var(--card-bg)', border: `1px solid ${item.accent}33`,
        borderTop: `3px solid ${item.accent}`,
        padding: '1.8rem 2rem', display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden',
      }}
      whileHover={{ y: -4, boxShadow: `0 8px 40px ${item.accent}20` }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${item.accent}0a, transparent 60%)`,
        pointerEvents: 'none',
      }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: `${item.accent}bb`, letterSpacing: '0.2em' }}>{item.num}</span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.15em',
          textTransform: 'uppercase', color: 'var(--black)', background: item.accent,
          padding: '0.2rem 0.6rem', fontWeight: 700,
        }}>{item.type}</span>
      </div>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.1em', color: `${item.accent}88`, textTransform: 'uppercase', marginBottom: '0.6rem', display: 'block' }}>
        {item.category}
      </span>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--white)', marginBottom: '0.8rem', fontFamily: 'var(--font-body)' }}>
        {item.title}
      </h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.8, marginBottom: '1.5rem', flexGrow: 1 }}>
        {item.desc}
      </p>
      <a href={item.link} target="_blank" rel="noreferrer"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem', alignSelf: 'flex-start',
          fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.15em',
          textTransform: 'uppercase', textDecoration: 'none',
          padding: '0.5rem 1.1rem', background: item.accent, color: 'var(--black)', fontWeight: 700,
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = `4px 4px 0 ${item.accent}55`; }}
        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
      >
        {item.type === 'PDF' ? '⬇ Download' : '👁 View Online'}
      </a>
    </motion.div>
  );
}

function JourneyCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{
        background: 'var(--card-bg)', border: `1px solid ${item.accent}33`,
        borderLeft: `3px solid ${item.accent}`,
        padding: '1.5rem 1.8rem', display: 'flex', flexDirection: 'column', gap: '0.6rem',
        position: 'relative',
      }}
      whileHover={{ x: 4, boxShadow: `0 4px 30px ${item.accent}15` }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.2em', color: item.accent, textTransform: 'uppercase', background: `${item.accent}18`, padding: '0.2rem 0.6rem' }}>
          {item.category} · {item.num}
        </span>
      </div>
      <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--white)', lineHeight: 1.3 }}>
        {item.title}
      </h4>
      <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.7, flexGrow: 1 }}>{item.desc}</p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <a href={item.link} target="_blank" rel="noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            fontFamily: 'var(--font-mono)', fontSize: '0.52rem', letterSpacing: '0.15em',
            textTransform: 'uppercase', textDecoration: 'none',
            padding: '0.35rem 0.8rem', background: 'transparent', color: item.accent,
            border: `1px solid ${item.accent}55`, transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = item.accent; e.currentTarget.style.color = 'var(--black)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = item.accent; }}
        >
          👁 Read Online
        </a>
        {item.link.endsWith('.pdf') && (
          <a href={item.link} download
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              fontFamily: 'var(--font-mono)', fontSize: '0.52rem', letterSpacing: '0.15em',
              textTransform: 'uppercase', textDecoration: 'none',
              padding: '0.35rem 0.8rem', background: 'transparent', color: 'var(--muted)',
              border: '1px solid var(--download-border)', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = item.accent; e.currentTarget.style.color = item.accent; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--download-border)'; e.currentTarget.style.color = 'var(--muted)'; }}
          >
            ⬇ Download
          </a>
        )}
      </div>
    </motion.div>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────── */

const TAB_STYLES = {
  base: {
    fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em',
    textTransform: 'uppercase', fontWeight: 700, padding: '0.6rem 1.4rem',
    border: '1px solid transparent', cursor: 'pointer', transition: 'all 0.2s',
    background: 'transparent',
  },
};

const JOURNEY_TABS = [
  { key: 'tech', label: 'Tech Articles', color: 'var(--neon-cyan)', icon: '⚙️' },
  { key: 'investigation', label: 'Investigation', color: 'var(--neon-pink)', icon: '🔍' },
  { key: 'caseDiary', label: 'Case Diaries', color: 'var(--neon-yellow)', icon: '📓' },
];

const Writings = () => {
  const [journeyTab, setJourneyTab] = useState('tech');

  return (
    <section id="writings" className="section-padding">
      <div className="sep-line" style={{ marginTop: 0 }} />

      {/* ── MASTER HEADER ── */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}
        style={{ marginBottom: '5rem' }}
      >
        <span className="label" style={{ display: 'block', marginBottom: '1rem' }}>
          Literary Work · Research · Writing
        </span>
        <h2 className="title-medium" style={{ marginBottom: '1rem' }}>
          Books, Research<br />&amp; The Journey
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--muted)', maxWidth: '600px', lineHeight: 1.8 }}>
          Seven published books, research reports, and a growing collection of articles — spanning paranormal investigation, tech, dark history, and personal case diaries.
        </p>
      </motion.div>

      {/* ══════════════════════════════════════════════
          SECTION 1 — BOOKS
      ══════════════════════════════════════════════ */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp} style={{ marginBottom: '6rem' }}>
        <SectionLabel color="var(--neon-pink)">📖 Personal Writings — Unpublished Manuscripts</SectionLabel>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1rem',
        }}>
          {BOOKS.map((book, i) => <BookCard key={i} book={book} index={i} />)}
        </div>
      </motion.div>

      {/* ══════════════════════════════════════════════
          SECTION 2 — RESEARCH & REPORTS
      ══════════════════════════════════════════════ */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp} style={{ marginBottom: '6rem' }}>
        <SectionLabel color="var(--neon-cyan)">🔬 Research &amp; Reports</SectionLabel>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1rem',
        }}>
          {RESEARCH.map((item, i) => <ResearchCard key={i} item={item} index={i} />)}
        </div>
      </motion.div>

      {/* ══════════════════════════════════════════════
          SECTION 3 — THE JOURNEY
      ══════════════════════════════════════════════ */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}>
        <SectionLabel color="var(--neon-yellow)">✍️ The Journey</SectionLabel>

        {/* Tab Bar */}
        <div style={{
          display: 'flex', gap: '0', flexWrap: 'wrap',
          border: '1px solid var(--card-border-alpha)',
          marginBottom: '2rem', width: 'fit-content',
        }}>
          {JOURNEY_TABS.map(tab => {
            const active = journeyTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setJourneyTab(tab.key)}
                style={{
                  ...TAB_STYLES.base,
                  background: active ? tab.color : 'transparent',
                  color: active ? 'var(--black)' : tab.color,
                  border: `1px solid ${tab.color}${active ? '' : '55'}`,
                  borderRadius: 0,
                }}
              >
                {tab.icon} {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={journeyTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1rem',
            }}
          >
            {JOURNEY[journeyTab].map((item, i) => <JourneyCard key={i} item={item} index={i} />)}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Writings;
