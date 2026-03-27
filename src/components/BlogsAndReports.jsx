import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const BlogsAndReports = () => {
  const items = [
    {
      num: '01', type: 'DOCX', category: 'Tech Report · Hardware',
      title: 'PC Hardware Guide',
      desc: 'A comprehensive guide detailing PC hardware components, building recommendations, and technical specifications for enthusiasts.',
      link: 'blogs-and-reports/PC_Hardware_Guide.docx',
    },
    {
      num: '02', type: 'PDF', category: 'Case Study · Tech',
      title: 'DID Case Study (2026)',
      desc: 'An in-depth case study and technical report exploring Decentralized Identity (DID) and its implementations.',
      link: 'blogs-and-reports/DID_Case_Study_Salman_Hashir_2026.pdf',
    },
    {
      num: '03', type: 'HTML', category: 'Research Study · AI',
      title: 'AI Tools Study Report',
      desc: 'A detailed research report analyzing modern AI tools, their applications, and their potential impact on the tech landscape.',
      link: 'blogs-and-reports/ai-tools-study-report.html',
    },
     {
      num: '04', type: 'HTML', category: 'Career Blog',
      title: 'Diploma vs Degree',
      desc: 'An insightful blog post discussing the differences, benefits, and career prospects of holding a diploma versus a full-fledged degree in the evolving job market.',
      link: 'blogs-and-reports/diploma-vs-degree-blog.html',
    },
    {
      num: '05', type: 'HTML', category: 'Career Blog',
      title: 'Getting Started as a Fresher',
      desc: 'A practical guide for freshers navigating the job market with no prior experience, outlining strategies to build a strong profile and land opportunities.',
      link: 'blogs-and-reports/fresher-no-experience-blog.html',
    },
    {
      num: '06', type: 'HTML', category: 'Personal Blog',
      title: "Salman's PC Diaries",
      desc: "A personal tech blog journaling my setup, gaming experiences, free game claims, YouTube rabbit holes, and other casual tech musings.",
      link: 'blogs-and-reports/salman-blog.html',
    }
  ];

  return (
    <section id="reports" className="section-padding">
      <div className="sep-line" style={{ marginTop: 0 }} />
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
        <span className="label" style={{ display: 'block', marginBottom: '1rem' }}>Insights & Media</span>
        <h2 className="title-medium" style={{ marginBottom: '3rem' }}>Blogs & Reports</h2>
      </motion.div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem', maxWidth: '1200px' }}>
        {items.map((item, i) => (
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
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.25em', color: 'var(--gold-dim)', textTransform: 'uppercase' }}>{item.num}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--black)', background: 'var(--gold-dim)', padding: '0.2rem 0.6rem' }}>{item.type}</span>
            </div>
            
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: '0.8rem' }}>{item.category}</span>
            <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1.45rem', fontWeight: 700, color: 'var(--white)', lineHeight: 1.3, marginBottom: '1rem' }}>{item.title}</h3>
            <p style={{ fontSize: '0.9rem', fontWeight: 300, fontStyle: 'italic', color: 'rgba(240,237,230,0.5)', lineHeight: 1.8, marginBottom: '2rem', flexGrow: 1 }}>{item.desc}</p>
            
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href={item.link} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', padding: '0.5rem 1rem', border: '1px solid var(--gold)', color: 'var(--gold)', background: 'rgba(201,168,76,0.06)', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(201,168,76,0.15)'; e.currentTarget.style.color = 'var(--white)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(201,168,76,0.06)'; e.currentTarget.style.color = 'var(--gold)'; }}>
                {item.type === 'PDF' || item.type === 'HTML' ? '👁 View Online' : '⬇ Download'}
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BlogsAndReports;
