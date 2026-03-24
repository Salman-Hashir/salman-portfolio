import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const Writings = () => {
  const books = [
    {
      num: 'I', lang: 'Malayalam', genre: 'Psychological Thriller · Sci-Fi Novel',
      title: 'Anantharam (അനന്തരം)',
      desc: "A gripping psychological thriller that bends the boundaries of time and sanity. Writer Siddharth visits an abandoned century-old estate in Vagamon, uncovering a terrifying time-loop mechanism hidden within a 1924 clock tower. A tense exploration of fate, survival, and the horrors of facing one's own future.",
      link: 'books/Anantharam.pdf'
    },
    {
      num: 'II', lang: 'English', genre: 'Non-Fiction · Historical & Psychological Research',
      title: 'Black Magic: The Complete Study of Dark Arts',
      desc: "A comprehensive, research-driven exploration of dark arts across cultures and eras. Stripping away superstition, this book analyzes the history of magic — from Ancient Egypt and Mesopotamia to Voodoo and Kerala's local practices — using psychology to explain phenomena often attributed to curses.",
      link: 'books/BlackMagic_Complete_SalmanHashir.pdf'
    },
    {
      num: 'III', lang: 'English & Malayalam', genre: 'Non-Fiction · Parapsychology & Neuroscience',
      title: 'Consciousness & the Soul: Science Meets Spirituality',
      desc: 'A deep dive into the mysteries of human awareness, bridging scientific inquiry and spiritual belief. Explores the "Hard Problem of Consciousness," quantum theories of the mind, sleep paralysis, lucid dreaming, astral projection, near-death experiences — through both modern science and ancient spirituality.',
      link: 'books/consciousness_book_ml.pdf'
    },
    {
      num: 'IV', lang: 'Malayalam', genre: 'Non-Fiction · Paranormal Case Studies',
      title: 'Paranormal Gaveshanam (പാരനോർമൽ ഗവേഷണം)',
      desc: "An analytical compilation of real-world paranormal phenomena. Categorizes hauntings, investigates Kerala mysteries like the Wayanad Chain Tree and Bonacaud Bungalow, and compares exorcism rituals across religious traditions — all from a grounded, investigative perspective.",
      link: 'books/Paranormal_Gaveshanam_Case_Study.pdf'
    },
    {
      num: 'V', lang: 'English', genre: 'Non-Fiction · History & Cult Psychology',
      title: 'Dark Worship: A Research Study',
      desc: "An educational study exposing the manipulative psychology and dark history of cults and secret societies. From ancient deities like Baal and Moloch to modern cults like Jonestown and NXIVM — documenting ritualistic crimes and breaking down the recruitment tactics of dark networks.",
      link: 'books/DarkWorship_v3.pdf'
    },
    {
      num: 'VI', lang: 'Malayalam', genre: 'Religious Narrative · Eschatology',
      title: 'Avarthanangalude Anthyam (ആവർത്തനങ്ങളുടെ അന്ത്യം)',
      desc: 'A narrative exploration of Islamic eschatology bringing the "Signs of the End Times" to life. Grounded in Quranic verses and Sahih Hadiths, it weaves storytelling with theological teachings — translating ancient prophecies into relatable, contemporary contexts.',
      link: 'books/ആവർത്തനങ്ങളുടെ_അന്ത്യം.pdf'
    },
    {
      num: 'VII', lang: 'Malayalam', genre: 'Epic High Fantasy · Series — Vol. 1',
      title: 'Eryndor: The Era of Blood (എറിൻഡോർ: രുധിരകാലം — Vol. 1)',
      desc: 'Volume 1 of a sprawling epic fantasy saga set in the continent of Eryndor. Amidst political betrayal and a faltering royal dynasty, a terrifying life-draining plague called the "Hollows" emerges from the North. Intricate world-building, deep political intrigue, and intense action.',
      link: 'books/eryndor.pdf'
    }
  ];

  return (
    <section id="books" className="section-padding">
      <div className="sep-line" style={{ marginTop: 0 }} />
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
        <span className="label" style={{ display: 'block', marginBottom: '1rem' }}>Literary Work</span>
        <h2 className="title-medium" style={{ marginBottom: '3rem' }}>Books & Written Works</h2>
      </motion.div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem', maxWidth: '1200px' }}>
        {books.map((book, i) => (
          <motion.div 
            key={i}
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} 
            variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: (i % 2) * 0.1 } }, hidden: { opacity: 0, y: 40 } }}
            style={{ 
              background: 'rgba(201,168,76,0.02)', 
              border: '1px solid rgba(201,168,76,0.08)', 
              padding: '2.5rem', 
              display: 'flex', 
              flexDirection: 'column', 
              position: 'relative', 
              overflow: 'hidden' 
            }}
            whileHover="hover"
          >
            {/* Animated left border on hover */}
            <motion.div 
              initial="rest"
              animate="rest"
              variants={{
                rest: { scaleY: 0 },
                hover: { scaleY: 1 }
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px', background: 'var(--gold)', transformOrigin: 'top' }}
            />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.25em', color: 'var(--gold-dim)', textTransform: 'uppercase' }}>{book.num}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--black)', background: 'var(--gold-dim)', padding: '0.2rem 0.6rem' }}>{book.lang}</span>
            </div>
            
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: '0.8rem' }}>{book.genre}</span>
            <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1.45rem', fontWeight: 700, color: 'var(--white)', lineHeight: 1.3, marginBottom: '1rem' }}>{book.title}</h3>
            <p style={{ fontSize: '0.9rem', fontWeight: 300, fontStyle: 'italic', color: 'rgba(240,237,230,0.5)', lineHeight: 1.8, marginBottom: '2rem', flexGrow: 1 }}>{book.desc}</p>
            
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href={book.link} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', padding: '0.5rem 1rem', border: '1px solid var(--gold)', color: 'var(--gold)', background: 'rgba(201,168,76,0.06)', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(201,168,76,0.15)'; e.currentTarget.style.color = 'var(--white)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(201,168,76,0.06)'; e.currentTarget.style.color = 'var(--gold)'; }}>
                👁 Read Online
              </a>
              <a href={book.link} download style={{ display: 'inline-flex', alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', padding: '0.5rem 1rem', border: '1px solid rgba(201,168,76,0.25)', color: 'var(--gold-dim)', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)'; e.currentTarget.style.color = 'var(--gold-dim)'; }}>
                ⬇ Download
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
export default Writings;
