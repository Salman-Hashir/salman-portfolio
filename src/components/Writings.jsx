import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../context/ContentContext';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
};

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
      style={{ borderRadius: 'var(--radius-lg)', padding: '2rem', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)' }}
      whileHover={{ y: -4, boxShadow: 'var(--hover-shadow)' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--muted)' }}>Vol. {book.num}</span>
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-blue)', background: 'var(--accent-light)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)' }}>{book.lang}</span>
      </div>
      <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--muted)', marginBottom: '0.4rem', display: 'block' }}>{book.genre}</span>
      <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: '0.8rem' }}>{book.title}</h3>
      <p style={{ fontSize: '0.95rem', fontWeight: 400, color: 'var(--muted)', lineHeight: 1.6, marginBottom: '1.5rem', flexGrow: 1 }}>{book.desc}</p>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        {book.htmlLink && (
          <a href={book.htmlLink} target="_blank" rel="noreferrer" className="btn-ghost" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>📖 Read Online</a>
        )}
        {book.pdfLink && (
          <>
            {!book.htmlLink && (
              <a href={book.pdfLink} target="_blank" rel="noreferrer" className="btn-ghost" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>📖 Read Online</a>
            )}
            <a href={book.pdfLink} download className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>📥 Download PDF</a>
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
      style={{ borderRadius: 'var(--radius-lg)', padding: '2rem', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)' }}
      whileHover={{ y: -4, boxShadow: 'var(--hover-shadow)' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--muted)' }}>{item.num}</span>
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-blue)', background: 'var(--accent-light)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)' }}>{item.type}</span>
      </div>
      <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--muted)', marginBottom: '0.4rem', display: 'block' }}>{item.category}</span>
      <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.8rem' }}>{item.title}</h3>
      <p style={{ fontSize: '0.95rem', fontWeight: 400, color: 'var(--muted)', lineHeight: 1.6, marginBottom: '1.5rem', flexGrow: 1 }}>{item.desc}</p>
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
      style={{ borderRadius: 'var(--radius-md)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', position: 'relative', transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)' }}
      whileHover={{ y: -2, boxShadow: 'var(--soft-shadow)' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted)' }}>{item.category} · {item.num}</span>
      </div>
      <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3 }}>{item.title}</h4>
      <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6, flexGrow: 1 }}>{item.desc}</p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
        <a href={item.link} target="_blank" rel="noreferrer" className="btn-ghost" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>Read Article</a>
        {item.link?.endsWith('.pdf') && (
          <a href={item.link} download className="btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>Download</a>
        )}
      </div>
    </motion.div>
  );
}

const JOURNEY_TABS = [
  { key: 'journeyTech', label: 'Tech Articles' },
  { key: 'journeyInvestigation', label: 'Investigation' },
  { key: 'journeyCaseDiary', label: 'Case Diaries' },
];

const Writings = () => {
  const [journeyTab, setJourneyTab] = useState('journeyTech');
  const { content } = useContent();

  const books = content.books || [];
  const research = content.research || [];
  const journeyData = {
    journeyTech: content.journeyTech || [],
    journeyInvestigation: content.journeyInvestigation || [],
    journeyCaseDiary: content.journeyCaseDiary || [],
  };

  return (
    <section id="writings" className="section-padding" style={{ background: 'var(--section-bg)' }}>
      <div className="sep-line" style={{ marginTop: 0 }} />

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} style={{ marginBottom: '5rem' }}>
        <span className="label">Literary Work · Research</span>
        <h2 className="title-medium" style={{ margin: '0.5rem 0 1rem 0' }}>Books &amp; The Journey</h2>
        <p className="body-text" style={{ maxWidth: '600px' }}>
          Published books, research reports, and a growing collection of articles — spanning paranormal investigation, tech, dark history, and personal case diaries.
        </p>
      </motion.div>

      {/* BOOKS */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp} style={{ marginBottom: '6rem' }}>
        <SectionLabel>Personal Writings</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {books.map((book, i) => <BookCard key={book.id || i} book={book} index={i} />)}
        </div>
      </motion.div>

      {/* RESEARCH */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp} style={{ marginBottom: '6rem' }}>
        <SectionLabel>Research &amp; Reports</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {research.map((item, i) => <ResearchCard key={item.id || i} item={item} index={i} />)}
        </div>
      </motion.div>

      {/* JOURNEY */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp} style={{ marginBottom: '2rem' }}>
        <SectionLabel>The Journey</SectionLabel>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {JOURNEY_TABS.map(tab => {
            const active = journeyTab === tab.key;
            return (
              <button key={tab.key} onClick={() => setJourneyTab(tab.key)} style={{
                padding: '0.6rem 1.2rem', fontSize: '0.9rem', fontWeight: 500, borderRadius: 'var(--radius-full)', border: 'none', cursor: 'pointer', transition: 'all 0.3s',
                background: active ? 'var(--text-primary)' : 'var(--bg-card)', color: active ? 'var(--btn-text)' : 'var(--muted)',
                boxShadow: active ? 'var(--soft-shadow)' : '0 1px 3px rgba(0,0,0,0.05)',
              }}>{tab.label}</button>
            );
          })}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={journeyTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {journeyData[journeyTab].map((item, i) => <JourneyCard key={item.id || i} item={item} index={i} />)}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
export default Writings;
