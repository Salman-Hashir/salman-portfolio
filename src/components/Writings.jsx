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
  },
  {
    num: 'II', lang: 'Malayalam', genre: 'Epic High Fantasy · Series — Vol. 1',
    title: 'Eryndor: The Era of Blood (Vol. 1)',
    desc: "Volume 1 of a sprawling epic fantasy saga. Amidst political betrayal and a faltering royal dynasty, a terrifying life-draining plague called the 'Hollows' emerges from the North.",
    pdfLink: 'books/eryndor.pdf',
    htmlLink: null,
  },
];

const RESEARCH = [
  {
    num: '01', type: 'HTML', category: 'Research Study · AI',
    title: 'AI Tools Study Report',
    desc: 'A detailed research report analyzing modern AI tools, their applications, and potential impact on the tech landscape. Covers LLMs, automation tools, and productivity stacks.',
    link: 'blogs-and-reports/ai-tools-study-report.html',
  },
  {
    num: '03', type: 'HTML', category: 'Tech Report · Hardware',
    title: 'PC Hardware Guide',
    desc: 'A comprehensive guide detailing PC hardware components, building process, thermal management, and component selection recommendations for enthusiasts and first-time builders.',
    link: 'books/PC_Hardware_Guide.html',
  },
];

const JOURNEY = {
  tech: [
    {
      num: 'T-01', category: 'Tech Article',
      title: 'Diploma vs Degree in Tech',
      desc: 'An insightful post discussing the differences, benefits, and career prospects of holding a diploma versus a full-fledged degree in the evolving job market and tech industry.',
      link: 'blogs-and-reports/diploma-vs-degree-blog.html',
      icon: '📱',
    },
    {
      num: 'T-02', category: 'Tech Article',
      title: 'Getting Started as a Fresher',
      desc: 'A practical guide for freshers navigating the job market with zero prior experience — outlining strategies to build a strong dev profile and land real opportunities.',
      link: 'blogs-and-reports/fresher-no-experience-blog.html',
      icon: '🚀',
    },
    {
      num: 'T-03', category: 'Tech Article',
      title: "Salman's PC Diaries",
      desc: 'A personal tech journal documenting my setup evolution, hardware upgrades, gaming sessions, free game claims, YouTube rabbit holes, and casual tech experiments over the years.',
      link: 'blogs-and-reports/salman-blog.html',
      icon: '💻',
    },
  ],
  investigation: [
    {
      num: 'I-01', category: 'Investigation Article',
      title: 'Black Magic: The Complete Study of Dark Arts',
      desc: 'A research-driven investigation into dark arts across cultures — from Ancient Egypt and Mesopotamia to Voodoo and Kerala practices — using psychology to decode what is attributed to curses and rituals.',
      link: 'books/BlackMagic_SalmanHashir.html',
      icon: '👁️',
    },
    {
      num: 'I-02', category: 'Investigation Article',
      title: 'Dark Worship: Cults, Rituals & Secret Societies',
      desc: 'Exposing the manipulative psychology behind cults and secret societies — from ancient deities like Baal and Moloch to modern cults like Jonestown and NXIVM — documenting ritualistic crimes and recruitment tactics.',
      link: 'books/dark_worship.html',
      icon: '📜',
    },
    {
      num: 'I-03', category: 'Investigation Article',
      title: 'Paranormal Gaveshanam: A Field Study',
      desc: 'An investigative breakdown of paranormal hotspots across Kerala — cross-referencing eyewitness accounts, folklore, and scientific explanations for the Wayanad Chain Tree, Bonacaud Bungalow, and more.',
      link: 'books/paranormal_gaveshanam_v2-1.html',
      icon: '🗺️',
    },
  ],
  caseDiary: [
    {
      num: 'C-01', category: 'Case Diary',
      title: 'Consciousness & the Soul: Science vs Spirituality',
      desc: 'A personal deep-dive into the mysteries of human awareness — exploring the Hard Problem of Consciousness, quantum theories, sleep paralysis, lucid dreaming, astral projection, and near-death experiences.',
      link: 'books/consciousness_and_soul.html',
      icon: '🧠',
    },
    {
      num: 'C-02', category: 'Case Diary',
      title: 'DID Case Study (2026)',
      desc: 'An in-depth case study and technical report exploring Decentralized Identity (DID), its standards, on-chain implementations, and real-world enterprise use cases.',
      link: 'blogs-and-reports/DID_Case_Study_Salman_Hashir_2026.pdf',
      icon: '🔐',
    },
  ],
};

/* ─── SUB-COMPONENTS ─────────────────────────────────────── */

function SectionLabel({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
      <span className="label" style={{ marginBottom: 0 }}>{children}</span>
      <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
    </div>
  );
}

function BookCard({ book, index }) {
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
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--muted)' }}>
          Vol. {book.num}
        </span>
        <span style={{
          fontSize: '0.75rem', fontWeight: 600,
          color: 'var(--accent-blue)', background: 'var(--accent-light)',
          padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)'
        }}>{book.lang}</span>
      </div>

      <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--muted)', marginBottom: '0.4rem', display: 'block' }}>
        {book.genre}
      </span>

      <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: '0.8rem' }}>
        {book.title}
      </h3>
      <p style={{ fontSize: '0.95rem', fontWeight: 400, color: 'var(--muted)', lineHeight: 1.6, marginBottom: '1.5rem', flexGrow: 1 }}>
        {book.desc}
      </p>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        {book.htmlLink ? (
          <a href={book.htmlLink} target="_blank" rel="noreferrer" className="btn-ghost" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
            Read Online
          </a>
        ) : (
          <>
            <a href={book.pdfLink} target="_blank" rel="noreferrer" className="btn-ghost" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
              Read Online
            </a>
            <a href={book.pdfLink} download className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
              Download
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
      className="glass-panel"
      style={{
        borderRadius: 'var(--radius-lg)',
        padding: '2rem', display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
      }}
      whileHover={{ y: -4, boxShadow: 'var(--hover-shadow)' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--muted)' }}>{item.num}</span>
        <span style={{
          fontSize: '0.75rem', fontWeight: 600,
          color: 'var(--accent-blue)', background: 'var(--accent-light)',
          padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)'
        }}>{item.type}</span>
      </div>
      <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--muted)', marginBottom: '0.4rem', display: 'block' }}>
        {item.category}
      </span>
      <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.8rem' }}>
        {item.title}
      </h3>
      <p style={{ fontSize: '0.95rem', fontWeight: 400, color: 'var(--muted)', lineHeight: 1.6, marginBottom: '1.5rem', flexGrow: 1 }}>
        {item.desc}
      </p>
      <a href={item.link} target="_blank" rel="noreferrer" className="btn-ghost" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', alignSelf: 'flex-start' }}>
        {item.type === 'PDF' ? 'Download PDF' : 'View Report'}
      </a>
    </motion.div>
  );
}

function JourneyCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="glass-panel"
      style={{
        borderRadius: 'var(--radius-md)',
        padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem',
        position: 'relative',
        transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
      }}
      whileHover={{ y: -2, boxShadow: 'var(--soft-shadow)' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted)' }}>
          {item.category} · {item.num}
        </span>
      </div>
      <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3 }}>
        {item.title}
      </h4>
      <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6, flexGrow: 1 }}>{item.desc}</p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
        <a href={item.link} target="_blank" rel="noreferrer" className="btn-ghost" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>
          Read Article
        </a>
        {item.link.endsWith('.pdf') && (
          <a href={item.link} download className="btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>
            Download
          </a>
        )}
      </div>
    </motion.div>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────── */

const JOURNEY_TABS = [
  { key: 'tech', label: 'Tech Articles' },
  { key: 'investigation', label: 'Investigation' },
  { key: 'caseDiary', label: 'Case Diaries' },
];

const Writings = () => {
  const [journeyTab, setJourneyTab] = useState('tech');

  return (
    <section id="writings" className="section-padding" style={{ background: 'var(--section-bg)' }}>
      <div className="sep-line" style={{ marginTop: 0 }} />

      {/* ── MASTER HEADER ── */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}
        style={{ marginBottom: '5rem' }}
      >
        <span className="label">Literary Work · Research</span>
        <h2 className="title-medium" style={{ margin: '0.5rem 0 1rem 0' }}>
          Books &amp; The Journey
        </h2>
        <p className="body-text" style={{ maxWidth: '600px' }}>
          Seven published books, research reports, and a growing collection of articles — spanning paranormal investigation, tech, dark history, and personal case diaries.
        </p>
      </motion.div>

      {/* ══════════════════════════════════════════════
          SECTION 1 — BOOKS
      ══════════════════════════════════════════════ */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp} style={{ marginBottom: '6rem' }}>
        <SectionLabel>Personal Writings</SectionLabel>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}>
          {BOOKS.map((book, i) => <BookCard key={i} book={book} index={i} />)}
        </div>
      </motion.div>

      {/* ══════════════════════════════════════════════
          SECTION 2 — RESEARCH & REPORTS
      ══════════════════════════════════════════════ */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp} style={{ marginBottom: '6rem' }}>
        <SectionLabel>Research &amp; Reports</SectionLabel>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}>
          {RESEARCH.map((item, i) => <ResearchCard key={i} item={item} index={i} />)}
        </div>
      </motion.div>

      {/* ══════════════════════════════════════════════
          SECTION 3 — THE JOURNEY
      ══════════════════════════════════════════════ */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp} style={{ marginBottom: '2rem' }}>
        <SectionLabel>The Journey</SectionLabel>

        {/* Tab Bar */}
        <div style={{
          display: 'flex', gap: '0.5rem', flexWrap: 'wrap',
          marginBottom: '2rem',
        }}>
          {JOURNEY_TABS.map(tab => {
            const active = journeyTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setJourneyTab(tab.key)}
                style={{
                  padding: '0.6rem 1.2rem',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  background: active ? 'var(--text-primary)' : 'var(--bg-card)',
                  color: active ? 'var(--bg-main)' : 'var(--muted)',
                  boxShadow: active ? 'var(--soft-shadow)' : '0 1px 3px rgba(0,0,0,0.05)',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={journeyTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.5rem',
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
