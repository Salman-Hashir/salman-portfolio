import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { db } from '../firebase';
import {
  doc, getDoc, setDoc, collection, getDocs, addDoc, updateDoc, deleteDoc, onSnapshot
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
      id: '1',
      dates: 'Aug 2024 – May 2025',
      location: 'Adoor, Kerala, India',
      role: 'Technical Support Engineer',
      company: 'Asianet Satellite Communications',
      desc: 'Handled 60+ daily customer inquiries with a 95% first-call resolution rate. Diagnosed complex networking issues including router configurations, ISP connectivity, LAN/WAN setups, and satellite systems.',
      order: 1,
    },
    {
      id: '2',
      dates: 'Jun 2024 – Aug 2024',
      location: 'Kulathupuzha, Kerala, India',
      role: 'IT Instructor',
      company: 'Sam Omman Memorial Tech High School',
      desc: "Taught IT fundamentals to 8th, 9th, and 10th-grade students covering hardware, networking, and software. Managed the school's computer laboratory.",
      order: 2,
    },
  ],
  education: [
    {
      id: '1',
      dates: '2021 – 2024',
      location: 'Kerala, India',
      degree: 'Diploma in Computer Engineering',
      institution: 'Polytechnic College',
      desc: 'Completed a 3-year polytechnic diploma with focus on hardware, networking, and software development.',
      order: 1,
    },
  ],
  projects: [
    { id: '1', num: '01', status: 'Live', icon: '🤖', title: 'FLUW AI', sub: 'WhatsApp AI Assistant', desc: 'An intelligent conversational agent integrated with the WhatsApp Cloud API.', tags: ['Python', 'FastAPI', 'WhatsApp API'], link: 'demos/fluw-ai.html', order: 1 },
    { id: '2', num: '02', status: 'Live', icon: '🎯', title: 'DARE.ME', sub: 'Real-time Interactive Video Platform', desc: 'A real-time interactive video chat platform with built-in AI "Truth or Dare" prompts.', tags: ['WebRTC', 'WebSockets', 'Node.js'], link: 'https://dareme-blue.vercel.app/', order: 2 },
    { id: '3', num: '03', status: 'Live', icon: '⚡', title: 'TryZappit', sub: 'Serverless P2P File Sharing', desc: 'A serverless, peer-to-peer file-sharing app.', tags: ['WebRTC', 'P2P', 'Serverless'], link: 'https://tryzappit.vercel.app/', order: 3 },
  ],
  books: [
    { id: '1', num: 'I', lang: 'Malayalam', genre: 'Psychological Thriller · Sci-Fi Novel', title: 'Anantharam (അനന്തരം)', desc: 'A gripping psychological thriller bending the boundaries of time and sanity.', pdfLink: 'books/Anantharam.pdf', htmlLink: null, order: 1 },
    { id: '2', num: 'II', lang: 'Malayalam', genre: 'Epic High Fantasy · Series — Vol. 1', title: 'Eryndor: The Era of Blood (Vol. 1)', desc: "Volume 1 of a sprawling epic fantasy saga.", pdfLink: 'books/eryndor.pdf', htmlLink: null, order: 2 },
  ],
  research: [
    { id: '1', num: '01', type: 'HTML', category: 'Research Study · AI', title: 'AI Tools Study Report', desc: 'A detailed research report analyzing modern AI tools, their applications, and potential impact.', link: 'blogs-and-reports/ai-tools-study-report.html', order: 1 },
    { id: '2', num: '02', type: 'HTML', category: 'Tech Report · Hardware', title: 'PC Hardware Guide', desc: 'A comprehensive guide detailing PC hardware components and building process.', link: 'books/PC_Hardware_Guide.html', order: 2 },
  ],
  journeyTech: [
    { id: '1', num: 'T-01', category: 'Tech Article', title: 'Diploma vs Degree in Tech', desc: 'An insightful post discussing the differences, benefits, and career prospects.', link: 'blogs-and-reports/diploma-vs-degree-blog.html', icon: '📱', order: 1 },
    { id: '2', num: 'T-02', category: 'Tech Article', title: 'Getting Started as a Fresher', desc: 'A practical guide for freshers navigating the job market.', link: 'blogs-and-reports/fresher-no-experience-blog.html', icon: '🚀', order: 2 },
  ],
  journeyInvestigation: [
    { id: '1', num: 'I-01', category: 'Investigation Article', title: 'Black Magic: The Complete Study of Dark Arts', desc: 'A research-driven investigation into dark arts across cultures.', link: 'books/BlackMagic_SalmanHashir.html', icon: '👁️', order: 1 },
  ],
  journeyCaseDiary: [
    { id: '1', num: 'C-01', category: 'Case Diary', title: 'Consciousness & the Soul: Science vs Spirituality', desc: 'A personal deep-dive into the mysteries of human awareness.', link: 'books/consciousness_and_soul.html', icon: '🧠', order: 1 },
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

        // Load all collections
        for (const colName of COLLECTIONS) {
          const snapshot = await getDocs(collection(db, colName));
          if (!snapshot.empty) {
            const items = [];
            snapshot.forEach(d => items.push({ id: d.id, ...d.data() }));
            items.sort((a, b) => (a.order || 0) - (b.order || 0));
            newContent[colName] = items;
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
