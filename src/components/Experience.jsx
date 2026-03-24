import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const Experience = () => {
  const jobs = [
    {
      dates: 'Aug 2024 – May 2025',
      location: 'Adoor, Kerala, India',
      role: 'Technical Support Engineer',
      company: 'Asianet Satellite Communications',
      desc: 'Handled 60+ daily customer inquiries with a 95% first-call resolution rate. Diagnosed complex networking issues including router configurations, ISP connectivity, LAN/WAN setups, and satellite systems. Configured and deployed networking equipment for residential and commercial clients — reducing setup time by 30%.'
    },
    {
      dates: 'Jun 2024 – Aug 2024',
      location: 'Kulathupuzha, Kerala, India',
      role: 'IT Instructor',
      company: 'Sam Omman Memorial Tech High School',
      desc: 'Taught IT fundamentals to 8th, 9th, and 10th-grade students covering hardware, networking, and software. Managed the school\'s computer laboratory, supervised hands-on sessions in PC assembly and OS navigation, and mentored students through IT project work.'
    }
  ];

  return (
    <section id="experience" className="section-padding">
      <div className="sep-line" style={{ marginTop: 0 }} />
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
        <span className="label" style={{ display: 'block', marginBottom: '1rem' }}>Career</span>
        <h2 className="title-medium" style={{ marginBottom: '3rem' }}>Professional Experience</h2>
      </motion.div>
      
      <div style={{ maxWidth: '900px' }}>
        {jobs.map((job, index) => (
          <motion.div 
            key={index}
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
            style={{
              padding: '3rem 0',
              borderBottom: '1px solid rgba(201,168,76,0.1)',
              borderTop: index === 0 ? '1px solid rgba(201,168,76,0.1)' : 'none'
            }}
            className="tl-item grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8"
          >
            <div>
              <span className="label" style={{ display: 'block', color: 'var(--gold)', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>{job.dates}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{job.location}</span>
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--white)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>{job.role}</h3>
              <div className="label" style={{ color: 'var(--gold-dim)', marginBottom: '1.5rem', letterSpacing: '0.2em' }}>{job.company}</div>
              <p className="body-text">{job.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @media(min-width: 768px) {
          .tl-item { display: grid; grid-template-columns: 200px 1fr; gap: 3rem; }
        }
        @media(max-width: 767px) {
          .tl-item { display: flex; flex-direction: column; gap: 1.5rem; }
        }
      `}} />
    </section>
  );
};
export default Experience;
