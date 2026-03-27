import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const Projects = () => {
  const projectsList = [
    {
      num: '01 / 08', status: 'Live', statusColor: '#4ade80', icon: '🤖',
      title: 'FLUW AI', sub: 'WhatsApp AI Assistant',
      desc: 'An intelligent conversational agent integrated with the WhatsApp Cloud API. Engineered to handle real-time customer interactions, business inquiries, and lead management automatically.',
      tags: ['Python', 'FastAPI', 'WhatsApp API', 'Bot'],
      link: '#'
    },
    {
      num: '02 / 08', status: 'Live', statusColor: '#4ade80', icon: '🎯',
      title: 'DARE.ME', sub: 'Real-time Interactive Video Platform',
      desc: 'A real-time interactive video chat platform with built-in AI "Truth or Dare" prompts. Peer-to-peer communication with no server relay — pure WebRTC magic.',
      tags: ['WebRTC', 'WebSockets', 'Node.js', 'AI Prompts'],
      link: 'https://dareme-blue.vercel.app/'
    },
    {
      num: '03 / 08', status: 'Live', statusColor: '#4ade80', icon: '⚡',
      title: 'TryZappit', sub: 'Serverless P2P File Sharing',
      desc: 'A serverless, peer-to-peer file-sharing app that transfers files of unlimited size directly between browsers — no upload limits, no cloud storage, no middleman.',
      tags: ['WebRTC', 'P2P', 'Serverless', 'Data Channels'],
      link: 'https://tryzappit.vercel.app/'
    },
    {
      num: '04 / 08', status: 'In Dev', statusColor: '#c9a84c', icon: '📰',
      title: 'Vaartha (വാർത്ത)', sub: 'AI Malayalam News Aggregator',
      desc: 'A fully automated PWA that scrapes global RSS feeds and translates them into authentic Malayalam prose in real time using the Claude AI API. For the global Malayalam diaspora.',
      tags: ['Next.js 14', 'Claude API', 'Supabase', 'Malayalam NLP'],
      link: 'demos/vaartha.html'
    },
    {
      num: '05 / 08', status: 'In Dev', statusColor: '#c9a84c', icon: '🔍',
      title: 'DealSpy', sub: 'Cross-Platform Price Aggregator',
      desc: 'A price aggregator and affiliate monetization engine tracking deals across Amazon, Flipkart, Noon, and travel APIs — with in-memory caching for lightning-fast search results.',
      tags: ['Next.js', 'Node.js', 'Caching', 'Affiliate APIs'],
      link: 'demos/dealspy.html'
    },
    {
      num: '06 / 08', status: 'In Dev', statusColor: '#c9a84c', icon: '✦',
      title: 'Fluw Digital', sub: 'Digital Marketing Agency Landing Page',
      desc: 'A modern, animated corporate landing page for a digital marketing agency — built with semantic HTML, advanced CSS variables, and Vanilla JS scroll-reveal animations.',
      tags: ['HTML', 'CSS Variables', 'Vanilla JS', 'Animations'],
      link: 'demos/fluw-digital.html'
    },
    {
      num: '07 / 08', status: 'Coming Soon', statusColor: '#6b6860', icon: '💞',
      title: 'Our Story', sub: 'Shared Couples Journal & Memory Space',
      desc: 'A beautiful shared space built exclusively for couples — add notes, special dates, photos, and memories together in one place. A living journal of your relationship that grows with every moment you share.',
      tags: ['React', 'Gemini API', 'Supabase', 'Real-time'],
      link: 'demos/our-story.html'
    },
    {
      num: '08 / 08', status: 'College', statusColor: '#6b6860', icon: '🩸',
      title: 'Blood Bank System', sub: 'Donor Management System',
      desc: 'A backend-driven local database application managing blood inventory, donor registration, and blood requests — built with core PHP and MySQL as a college capstone project.',
      tags: ['PHP', 'MySQL', 'Backend', 'College Project'],
      link: 'demos/blood-bank.html'
    }
  ];

  return (
    <section id="projects" className="section-padding" style={{ background: 'var(--black-alt)' }}>
      <div className="sep-line" style={{ marginTop: 0 }} />
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
        <span className="label" style={{ display: 'block', marginBottom: '1rem' }}>Selected Work</span>
        <h2 className="title-medium" style={{ marginBottom: '3rem' }}>Projects That Help People</h2>
      </motion.div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2px', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.1)' }}>
        {projectsList.map((proj, i) => (
          <motion.div 
            key={i}
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} 
            variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.1 } }, hidden: { opacity: 0, y: 40 } }}
            style={{ background: 'var(--black)', padding: '3rem 2.5rem', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
            onClick={() => window.open(proj.link, '_blank')}
            whileHover="hover"
          >
            {/* Dynamic hover background */}
            <motion.div 
              initial="rest"
              animate="rest"
              variants={{
                rest: { opacity: 0 },
                hover: { opacity: 1 }
              }}
              style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(201,168,76,0.06) 0%, transparent 80%)', zIndex: 0 }}
            />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ position: 'absolute', top: 0, right: 0, padding: '0.3rem 0.8rem', border: `1px solid ${proj.statusColor}50`, color: proj.statusColor, fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                ● {proj.status}
              </div>
              <div className="label" style={{ color: 'var(--gold-dim)', marginBottom: '1.5rem', letterSpacing: '0.3em' }}>{proj.num}</div>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{proj.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 700, color: 'var(--white)', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '0.5rem' }}>{proj.title}</h3>
              <div className="label" style={{ marginBottom: '1.5rem', letterSpacing: '0.15em' }}>{proj.sub}</div>
              <p className="body-text" style={{ marginBottom: '2rem', fontSize: '0.95rem' }}>{proj.desc}</p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                {proj.tags.map((tag, idx) => (
                  <span key={idx} style={{ padding: '0.3rem 0.8rem', border: '1px solid rgba(201,168,76,0.2)', fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.1em', color: 'var(--gold-dim)', textTransform: 'uppercase' }}>
                    {tag}
                  </span>
                ))}
              </div>
              
              <motion.div 
                variants={{ rest: { x: 0 }, hover: { x: 5 } }}
                style={{ display: 'inline-flex', alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', borderBottom: '1px solid rgba(201,168,76,0.3)', paddingBottom: '4px' }}
              >
                {proj.status === 'Live' ? 'View Live →' : 'View Demo →'}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
export default Projects;
