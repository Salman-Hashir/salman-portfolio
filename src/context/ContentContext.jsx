import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { db } from '../firebase';
import {
  doc, getDoc, setDoc, collection, getDocs, addDoc, updateDoc, deleteDoc
} from 'firebase/firestore';

// ─── DEFAULT DATA (fallback if no Firebase data exists yet) ───────────────────
export const DEFAULT_CONTENT = {
  siteSettings: {
    name: 'Salman Hashir',
    firstName: 'Salman',
    lastName: 'Hashir',
    title: 'IT Engineer · Builder of Digital Worlds',
    tagline: 'Portfolio — 2026',
    bio: 'Based in Dubai, UAE. I engineer robust IT systems, build web platforms that help people connect, and write dark Malayalam fiction — where technical precision meets cultural creativity.',
    aboutTitle: 'The Architect\nBehind the Screen',
    aboutPara1: 'I am an IT Engineer and full-stack developer based in Dubai, with roots in Kerala. My work spans the full depth of the technology stack — from configuring satellite networks to building AI-powered web platforms.',
    aboutPara2: 'With hands-on experience as a Technical Support Engineer at Asianet Satellite Communications and as an IT Instructor, I bring both the infrastructure mindset and the product instinct.',
    aboutPara3: 'Beyond engineering, I write — dark fiction, paranormal research, philosophical books. The same precision I bring to systems architecture, I bring to storytelling.',
    location: 'Al Karama, Dubai · Kerala, India',
    email: 'salman.muthan@gmail.com',
    phone: '+971 528 282 490',
    linkedin: 'https://linkedin.com/in/salman-hashir',
    github: 'https://github.com/salman-hashir',
    availability: 'Available for immediate joining — open to relocation',
    contactTitle: "Let's Build Something together.",
    contactSubtitle: 'Open to IT roles, freelance development, and creative collaborations. Available immediately.',
    photoUrl: '/photo.jpg',
    resumeUrl: 'resume/Salman-Hashir-Resume.pdf',
    footerYear: '2026',
  },
  skills: [
    { id: '1', name: 'Web Dev', tags: 'Next.js · React · Node.js · Express' },
    { id: '2', name: 'Infrastructure', tags: 'Linux (RHCSA) · Windows Server' },
    { id: '3', name: 'Security', tags: 'Ethical Hacking · Penetration Testing' },
    { id: '4', name: 'Hardware & IoT', tags: 'PC Assembly · Diagnostics · Pis' },
    { id: '5', name: 'AI & APIs', tags: 'Claude API · Gemini API · Integrations' },
  ],
  experience: [
    {
      id: '0', dates: 'May 2026 – Present', location: 'Dubai, UAE',
      role: 'IT Support Executive', company: 'LIFE Pharmacy Group',
      desc: 'Providing enterprise-level IT support across LIFE Pharmacy Group operations in the UAE. Managing hardware/software troubleshooting, network infrastructure, and end-user support for a leading healthcare retail chain.',
      order: 0,
    },
    {
      id: '1', dates: 'Aug 2024 – May 2025', location: 'Adoor, Kerala, India',
      role: 'Technical Support Engineer', company: 'Asianet Satellite Communications',
      desc: 'Handled 60+ daily customer inquiries with a 95% first-call resolution rate. Diagnosed complex networking issues including router configurations, ISP connectivity, LAN/WAN setups, and satellite systems.',
      order: 1,
    },
    {
      id: '2', dates: 'Jun 2024 – Aug 2024', location: 'Kulathupuzha, Kerala, India',
      role: 'IT Instructor', company: 'Sam Omman Memorial Tech High School',
      desc: "Taught IT fundamentals to 8th, 9th, and 10th-grade students covering hardware, networking, and software. Managed the school's computer laboratory.",
      order: 2,
    },
  ],
  education: [
    {
      id: '1', dates: '2021 – 2024', location: 'Kerala, India',
      degree: 'Diploma in Computer Engineering', institution: 'Polytechnic College',
      desc: 'Completed a 3-year polytechnic diploma with focus on hardware, networking, and software development.',
      order: 1,
    },
  ],
  projects: [
    { id: '1', num: '01', status: 'Live', icon: '🤖', title: 'FLUW AI', sub: 'WhatsApp AI Assistant', desc: 'An intelligent conversational agent integrated with the WhatsApp Cloud API. Engineered to handle real-time customer interactions, business inquiries, and lead management automatically.', tags: ['Python', 'FastAPI', 'WhatsApp API', 'Bot'], link: 'demos/fluw-ai.html', order: 1 },
    { id: '2', num: '02', status: 'Live', icon: '🎯', title: 'DARE.ME', sub: 'Real-time Interactive Video Platform', desc: 'A real-time interactive video chat platform with built-in AI "Truth or Dare" prompts. Peer-to-peer communication with no server relay — pure WebRTC magic.', tags: ['WebRTC', 'WebSockets', 'Node.js', 'AI Prompts'], link: 'https://dareme-blue.vercel.app/', order: 2 },
    { id: '3', num: '03', status: 'Live', icon: '⚡', title: 'TryZappit', sub: 'Serverless P2P File Sharing', desc: 'A serverless, peer-to-peer file-sharing app that transfers files of unlimited size directly between browsers — no upload limits, no cloud storage, no middleman.', tags: ['WebRTC', 'P2P', 'Serverless', 'Data Channels'], link: 'https://tryzappit.vercel.app/', order: 3 },
    { id: '4', num: '04', status: 'In Dev', icon: '📰', title: 'Vaartha', sub: 'AI Malayalam News Aggregator', desc: 'A fully automated PWA that scrapes global RSS feeds and translates them into authentic Malayalam prose in real time using the Claude AI API. For the global Malayalam diaspora.', tags: ['Next.js 14', 'Claude API', 'Supabase', 'Malayalam NLP'], link: 'demos/vaartha.html', order: 4 },
    { id: '5', num: '05', status: 'In Dev', icon: '🔍', title: 'DealSpy', sub: 'Cross-Platform Price Aggregator', desc: 'A price aggregator and affiliate monetization engine tracking deals across Amazon, Flipkart, Noon, and travel APIs — with in-memory caching for lightning-fast search results.', tags: ['Next.js', 'Node.js', 'Caching', 'Affiliate APIs'], link: 'demos/dealspy.html', order: 5 },
    { id: '6', num: '06', status: 'In Dev', icon: '✦', title: 'Fluw Digital', sub: 'Digital Marketing Agency Site', desc: 'A modern, animated corporate landing page for a digital marketing agency — built with semantic HTML, advanced CSS variables, and Vanilla JS scroll-reveal animations.', tags: ['HTML', 'CSS Variables', 'Vanilla JS', 'Animations'], link: 'demos/fluw-digital.html', order: 6 },
    { id: '7', num: '07', status: 'Coming Soon', icon: '💞', title: 'Our Story', sub: 'Shared Couples Journal', desc: 'A beautiful shared space built exclusively for couples — add notes, special dates, photos, and memories together in one place. A living journal of your relationship.', tags: ['React', 'Gemini API', 'Supabase', 'Real-time'], link: 'demos/our-story.html', order: 7 },
    { id: '8', num: '08', status: 'College', icon: '🩸', title: 'Blood Bank', sub: 'Donor Management System', desc: 'A backend-driven local database application managing blood inventory, donor registration, and blood requests — built with core PHP and MySQL as a college capstone project.', tags: ['PHP', 'MySQL', 'Backend', 'College Project'], link: 'demos/blood-bank.html', order: 8 },
  ],
  books: [
    { id: '1', num: 'I', lang: 'Malayalam', genre: 'Psychological Thriller · Sci-Fi Novel', title: 'Anantharam (അനന്തരം)', desc: "A gripping psychological thriller bending the boundaries of time and sanity. Writer Siddharth visits an abandoned century-old estate in Vagamon, uncovering a terrifying time-loop hidden inside a 1924 clock tower.", pdfLink: 'books/Anantharam.pdf', htmlLink: null, order: 1 },
    { id: '2', num: 'II', lang: 'Malayalam', genre: 'Epic High Fantasy · Series — Vol. 1', title: 'Eryndor: The Era of Blood (Vol. 1)', desc: "Volume 1 of a sprawling epic fantasy saga. Amidst political betrayal and a faltering royal dynasty, a terrifying life-draining plague called the 'Hollows' emerges from the North.", pdfLink: 'books/eryndor.pdf', htmlLink: null, order: 2 },
  ],
  research: [
    { id: '1', num: '01', type: 'HTML', category: 'Research Study · AI', title: 'AI Tools Study Report', desc: 'A detailed research report analyzing modern AI tools, their applications, and potential impact on the tech landscape. Covers LLMs, automation tools, and productivity stacks.', link: 'blogs-and-reports/ai-tools-study-report.html', order: 1 },
    { id: '2', num: '02', type: 'HTML', category: 'Tech Report · Hardware', title: 'PC Hardware Guide', desc: 'A comprehensive guide detailing PC hardware components, building process, thermal management, and component selection recommendations for enthusiasts and first-time builders.', link: 'books/PC_Hardware_Guide.html', order: 2 },
  ],
  journeyTech: [
    { id: '1', num: 'T-01', category: 'Tech Article', title: 'Diploma vs Degree in Tech', desc: 'An insightful post discussing the differences, benefits, and career prospects of holding a diploma versus a full-fledged degree in the evolving job market and tech industry.', link: 'blogs-and-reports/diploma-vs-degree-blog.html', icon: '📱', order: 1 },
    { id: '2', num: 'T-02', category: 'Tech Article', title: 'Getting Started as a Fresher', desc: 'A practical guide for freshers navigating the job market with zero prior experience — outlining strategies to build a strong dev profile and land real opportunities.', link: 'blogs-and-reports/fresher-no-experience-blog.html', icon: '🚀', order: 2 },
    { id: '3', num: 'T-03', category: 'Tech Article', title: "Salman's PC Diaries", desc: 'A personal tech journal documenting my setup evolution, hardware upgrades, gaming sessions, free game claims, YouTube rabbit holes, and casual tech experiments over the years.', link: 'blogs-and-reports/salman-blog.html', icon: '💻', order: 3 },
  ],
  journeyInvestigation: [
    { id: '1', num: 'I-01', category: 'Investigation Article', title: 'Black Magic: The Complete Study of Dark Arts', desc: 'A research-driven investigation into dark arts across cultures — from Ancient Egypt and Mesopotamia to Voodoo and Kerala practices — using psychology to decode what is attributed to curses and rituals.', link: 'books/BlackMagic_SalmanHashir.html', icon: '👁️', order: 1 },
    { id: '2', num: 'I-02', category: 'Investigation Article', title: 'Dark Worship: Cults, Rituals & Secret Societies', desc: 'Exposing the manipulative psychology behind cults and secret societies — from ancient deities like Baal and Moloch to modern cults like Jonestown and NXIVM — documenting ritualistic crimes and recruitment tactics.', link: 'books/dark_worship.html', icon: '📜', order: 2 },
    { id: '3', num: 'I-03', category: 'Investigation Article', title: 'Paranormal Gaveshanam: A Field Study', desc: 'An investigative breakdown of paranormal hotspots across Kerala — cross-referencing eyewitness accounts, folklore, and scientific explanations for the Wayanad Chain Tree, Bonacaud Bungalow, and more.', link: 'books/paranormal_gaveshanam_v2-1.html', icon: '🗺️', order: 3 },
  ],
  journeyCaseDiary: [
    { id: '1', num: 'C-01', category: 'Case Diary', title: 'Consciousness & the Soul: Science vs Spirituality', desc: 'A personal deep-dive into the mysteries of human awareness — exploring the Hard Problem of Consciousness, quantum theories, sleep paralysis, lucid dreaming, astral projection, and near-death experiences.', link: 'books/consciousness_and_soul.html', icon: '🧠', order: 1 },
    { id: '2', num: 'C-02', category: 'Case Diary', title: 'DID Case Study (2026)', desc: 'An in-depth case study and technical report exploring Decentralized Identity (DID), its standards, on-chain implementations, and real-world enterprise use cases.', link: 'blogs-and-reports/DID_Case_Study_Salman_Hashir_2026.pdf', icon: '🔐', order: 2 },
  ],
};

// ─── CONTEXT ──────────────────────────────────────────────────────────────────
const ContentContext = createContext(null);

// ─── COLLECTION NAMES ────────────────────────────────────────────────────────
const COLLECTIONS = ['skills', 'experience', 'education', 'projects', 'books', 'research', 'journeyTech', 'journeyInvestigation', 'journeyCaseDiary'];

export function ContentProvider({ children }) {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);
  const [firebaseReady, setFirebaseReady] = useState(false);

  // ── Load data from Firebase on mount ─────────────────────────────────────
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load site settings
        const settingsDoc = await getDoc(doc(db, 'content', 'siteSettings'));
        const newContent = { ...DEFAULT_CONTENT };

        if (settingsDoc.exists()) {
          newContent.siteSettings = { ...DEFAULT_CONTENT.siteSettings, ...settingsDoc.data() };
        }

        // Load all collections — only override defaults if Firebase has data
        for (const colName of COLLECTIONS) {
          try {
            const snapshot = await getDocs(collection(db, colName));
            if (!snapshot.empty) {
              const items = [];
              snapshot.forEach(d => items.push({ id: d.id, ...d.data() }));
              items.sort((a, b) => (a.order || 0) - (b.order || 0));
              newContent[colName] = items;
            }
            // If snapshot is empty, keep the DEFAULT_CONTENT for this collection
          } catch (colErr) {
            console.warn(`Could not load collection "${colName}":`, colErr.message);
            // Keep default data for this collection
          }
        }

        setContent(newContent);
        setFirebaseReady(true);
      } catch (err) {
        console.warn('Firebase not configured yet — using default content. Error:', err.message);
        setFirebaseReady(false);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // ── Save site settings ────────────────────────────────────────────────────
  const saveSiteSettings = useCallback(async (settings) => {
    setContent(prev => ({ ...prev, siteSettings: { ...prev.siteSettings, ...settings } }));
    try {
      await setDoc(doc(db, 'content', 'siteSettings'), settings, { merge: true });
    } catch (err) {
      console.error('Error saving settings:', err);
      throw err;
    }
  }, []);

  // ── Generic CRUD for collections ─────────────────────────────────────────
  const addItem = useCallback(async (colName, item) => {
    const newItem = { ...item, order: Date.now() };
    try {
      const docRef = await addDoc(collection(db, colName), newItem);
      const withId = { id: docRef.id, ...newItem };
      setContent(prev => ({
        ...prev,
        [colName]: [...(prev[colName] || []), withId].sort((a, b) => (a.order || 0) - (b.order || 0)),
      }));
      return withId;
    } catch (err) {
      console.error('Error adding item:', err);
      throw err;
    }
  }, []);

  const updateItem = useCallback(async (colName, id, updates) => {
    try {
      await updateDoc(doc(db, colName, id), updates);
      setContent(prev => ({
        ...prev,
        [colName]: prev[colName].map(item => item.id === id ? { ...item, ...updates } : item),
      }));
    } catch (err) {
      console.error('Error updating item:', err);
      throw err;
    }
  }, []);

  const deleteItem = useCallback(async (colName, id) => {
    try {
      await deleteDoc(doc(db, colName, id));
      setContent(prev => ({
        ...prev,
        [colName]: prev[colName].filter(item => item.id !== id),
      }));
    } catch (err) {
      console.error('Error deleting item:', err);
      throw err;
    }
  }, []);

  return (
    <ContentContext.Provider value={{ content, loading, firebaseReady, saveSiteSettings, addItem, updateItem, deleteItem }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within ContentProvider');
  return ctx;
}
