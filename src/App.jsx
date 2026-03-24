import React, { useEffect } from 'react';
import Lenis from 'lenis';
import Layout from './components/Layout';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Writings from './components/Writings';
import Contact from './components/Contact';
import Marquee from './components/Marquee';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Layout>
      <Navigation />
      <Hero />
      <Marquee text="AVAILABLE FOR NEW PROJECTS" />
      <About />
      <Experience />
      <Marquee text="CREATIVE DEVELOPMENT & ENGINEERING" />
      <Projects />
      <Writings />
      <Contact />
    </Layout>
  )
}

export default App;
