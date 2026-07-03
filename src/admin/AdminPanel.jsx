import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import './admin.css';

// ── ADMIN CREDENTIALS — Change these to your own! ────────────
const ADMIN_USERNAME = 'salman';       // Your username
const ADMIN_PASSWORD = 'Hashir@2026';  // Your password

// ── Reusable form components ──────────────────────────────────
function Field({ label, name, value, onChange, type = 'text', rows }) {
  return (
    <div className="adm-field">
      <label className="adm-label">{label}</label>
      {rows ? (
        <textarea className="adm-input" name={name} value={value || ''} onChange={onChange} rows={rows} />
      ) : (
        <input className="adm-input" type={type} name={name} value={value || ''} onChange={onChange} />
      )}
    </div>
  );
}

function SaveBtn({ saving, onClick, label = 'Save Changes' }) {
  return (
    <button className="adm-btn-primary" onClick={onClick} disabled={saving}>
      {saving ? '⏳ Saving...' : `✓ ${label}`}
    </button>
  );
}

// ── SECTIONS ─────────────────────────────────────────────────

function SettingsSection() {
  const { content, saveSiteSettings } = useContent();
  const [form, setForm] = useState(content.siteSettings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveSiteSettings(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch { alert('Save failed. Check Firebase config.'); }
    finally { setSaving(false); }
  };

  return (
    <div className="adm-section">
      <h2 className="adm-section-title">🌐 Site Settings</h2>
      <div className="adm-grid-2">
        <Field label="First Name" name="firstName" value={form.firstName} onChange={handleChange} />
        <Field label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} />
        <Field label="Title / Role" name="title" value={form.title} onChange={handleChange} />
        <Field label="Location" name="location" value={form.location} onChange={handleChange} />
        <Field label="Email" name="email" value={form.email} onChange={handleChange} type="email" />
        <Field label="Phone" name="phone" value={form.phone} onChange={handleChange} />
        <Field label="LinkedIn URL" name="linkedin" value={form.linkedin} onChange={handleChange} />
        <Field label="GitHub URL" name="github" value={form.github} onChange={handleChange} />
        <Field label="Photo URL" name="photoUrl" value={form.photoUrl} onChange={handleChange} />
        <Field label="Resume URL" name="resumeUrl" value={form.resumeUrl} onChange={handleChange} />
        <Field label="Availability Text" name="availability" value={form.availability} onChange={handleChange} />
        <Field label="Footer Year" name="footerYear" value={form.footerYear} onChange={handleChange} />
      </div>
      <div className="adm-full">
        <Field label="Hero Bio" name="bio" value={form.bio} onChange={handleChange} rows={3} />
        <Field label="About Paragraph 1" name="aboutPara1" value={form.aboutPara1} onChange={handleChange} rows={3} />
        <Field label="About Paragraph 2" name="aboutPara2" value={form.aboutPara2} onChange={handleChange} rows={3} />
        <Field label="About Paragraph 3" name="aboutPara3" value={form.aboutPara3} onChange={handleChange} rows={3} />
        <Field label="Contact Title" name="contactTitle" value={form.contactTitle} onChange={handleChange} />
        <Field label="Contact Subtitle" name="contactSubtitle" value={form.contactSubtitle} onChange={handleChange} />
      </div>
      <div className="adm-actions">
        <SaveBtn saving={saving} onClick={handleSave} />
        {saved && <span className="adm-saved">✅ Saved!</span>}
      </div>
    </div>
  );
}

function CollectionSection({ title, colName, fields, newItemTemplate }) {
  const { content, addItem, updateItem, deleteItem } = useContent();
  const items = content[colName] || [];
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [adding, setAdding] = useState(false);
  const [saving, setSaving] = useState(false);

  const openEdit = (item) => { setEditing(item.id); setForm(item); setAdding(false); };
  const openAdd = () => { setForm(newItemTemplate); setAdding(true); setEditing(null); };
  const cancel = () => { setEditing(null); setAdding(false); setForm({}); };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(p => ({
      ...p,
      [name]: name === 'tags' ? value.split(',').map(t => t.trim()) : value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (adding) {
        await addItem(colName, form);
      } else {
        await updateItem(colName, editing, form);
      }
      cancel();
    } catch { alert('Save failed. Check Firebase config.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this item?')) return;
    try { await deleteItem(colName, id); } catch { alert('Delete failed.'); }
  };

  const isFormOpen = adding || editing !== null;

  return (
    <div className="adm-section">
      <div className="adm-section-header">
        <h2 className="adm-section-title">{title}</h2>
        <button className="adm-btn-primary" onClick={openAdd}>+ Add New</button>
      </div>

      {isFormOpen && (
        <div className="adm-form-panel">
          <h3 className="adm-form-title">{adding ? 'Add New' : 'Edit'}</h3>
          <div className="adm-grid-2">
            {fields.map(f => (
              <div key={f.name} className={f.full ? 'adm-col-full' : ''}>
                <Field
                  label={f.label}
                  name={f.name}
                  value={f.name === 'tags' ? (Array.isArray(form[f.name]) ? form[f.name].join(', ') : form[f.name] || '') : form[f.name]}
                  onChange={handleChange}
                  rows={f.rows}
                />
              </div>
            ))}
          </div>
          <div className="adm-actions">
            <SaveBtn saving={saving} onClick={handleSave} />
            <button className="adm-btn-ghost" onClick={cancel}>Cancel</button>
          </div>
        </div>
      )}

      <div className="adm-item-list">
        {items.length === 0 && <p className="adm-empty">No items yet. Click "+ Add New" above.</p>}
        {items.map(item => (
          <div key={item.id} className="adm-item-row">
            <div className="adm-item-info">
              <span className="adm-item-title">{item.title || item.name || item.role || item.degree || '(untitled)'}</span>
              <span className="adm-item-sub">{item.company || item.institution || item.sub || item.genre || item.tags?.join(', ') || ''}</span>
            </div>
            <div className="adm-item-actions">
              <button className="adm-btn-sm" onClick={() => openEdit(item)}>✏️ Edit</button>
              <button className="adm-btn-sm adm-btn-danger" onClick={() => handleDelete(item.id)}>🗑️ Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SECTION CONFIGS ────────────────────────────────────────────
const SECTION_CONFIGS = {
  experience: {
    title: '💼 Experience',
    fields: [
      { name: 'role', label: 'Job Title / Role' },
      { name: 'company', label: 'Company' },
      { name: 'dates', label: 'Dates (e.g. Jan 2024 – Dec 2024)' },
      { name: 'location', label: 'Location' },
      { name: 'desc', label: 'Description', rows: 4, full: true },
    ],
    template: { role: '', company: '', dates: '', location: '', desc: '' },
  },
  education: {
    title: '🎓 Education',
    fields: [
      { name: 'degree', label: 'Degree / Course' },
      { name: 'institution', label: 'Institution' },
      { name: 'dates', label: 'Dates' },
      { name: 'location', label: 'Location' },
      { name: 'desc', label: 'Description', rows: 3, full: true },
    ],
    template: { degree: '', institution: '', dates: '', location: '', desc: '' },
  },
  skills: {
    title: '🛠️ Skills',
    fields: [
      { name: 'name', label: 'Skill Category Name' },
      { name: 'tags', label: 'Technologies (comma-separated)', full: true },
    ],
    template: { name: '', tags: '' },
  },
  projects: {
    title: '🚀 Projects',
    fields: [
      { name: 'num', label: 'Number (01, 02…)' },
      { name: 'title', label: 'Project Title' },
      { name: 'sub', label: 'Subtitle' },
      { name: 'icon', label: 'Emoji Icon' },
      { name: 'status', label: 'Status (Live / In Dev / Coming Soon)' },
      { name: 'link', label: 'Link URL' },
      { name: 'tags', label: 'Tags (comma-separated)' },
      { name: 'desc', label: 'Description', rows: 3, full: true },
    ],
    template: { num: '', title: '', sub: '', icon: '✦', status: 'In Dev', link: '#', tags: '', desc: '' },
  },
  books: {
    title: '📚 Books / Novels',
    fields: [
      { name: 'num', label: 'Volume Number (I, II, III…)' },
      { name: 'title', label: 'Book Title' },
      { name: 'lang', label: 'Language' },
      { name: 'genre', label: 'Genre' },
      { name: 'pdfLink', label: 'PDF File Path (e.g. books/MyBook.pdf — for Download button)' },
      { name: 'htmlLink', label: 'HTML File Path (e.g. books/MyBook.html — for Read Online button, leave empty if none)' },
      { name: 'desc', label: 'Description', rows: 3, full: true },
    ],
    template: { num: 'I', title: '', lang: 'Malayalam', genre: '', pdfLink: '', htmlLink: '', desc: '' },
  },
  research: {
    title: '🔬 Research & Reports',
    fields: [
      { name: 'num', label: 'Number' },
      { name: 'title', label: 'Title' },
      { name: 'category', label: 'Category' },
      { name: 'type', label: 'Type (HTML / PDF)' },
      { name: 'link', label: 'Link URL' },
      { name: 'desc', label: 'Description', rows: 3, full: true },
    ],
    template: { num: '01', title: '', category: '', type: 'HTML', link: '#', desc: '' },
  },
  journeyTech: {
    title: '💻 Journey — Tech Articles',
    fields: [
      { name: 'num', label: 'Number (T-01, T-02…)' },
      { name: 'title', label: 'Title' },
      { name: 'icon', label: 'Emoji Icon' },
      { name: 'category', label: 'Category' },
      { name: 'link', label: 'Link URL' },
      { name: 'desc', label: 'Description', rows: 3, full: true },
    ],
    template: { num: 'T-01', title: '', icon: '📱', category: 'Tech Article', link: '#', desc: '' },
  },
  journeyInvestigation: {
    title: '🔍 Journey — Investigation',
    fields: [
      { name: 'num', label: 'Number (I-01, I-02…)' },
      { name: 'title', label: 'Title' },
      { name: 'icon', label: 'Emoji Icon' },
      { name: 'category', label: 'Category' },
      { name: 'link', label: 'Link URL' },
      { name: 'desc', label: 'Description', rows: 3, full: true },
    ],
    template: { num: 'I-01', title: '', icon: '👁️', category: 'Investigation Article', link: '#', desc: '' },
  },
  journeyCaseDiary: {
    title: '📓 Journey — Case Diaries',
    fields: [
      { name: 'num', label: 'Number (C-01, C-02…)' },
      { name: 'title', label: 'Title' },
      { name: 'icon', label: 'Emoji Icon' },
      { name: 'category', label: 'Category' },
      { name: 'link', label: 'Link URL' },
      { name: 'desc', label: 'Description', rows: 3, full: true },
    ],
    template: { num: 'C-01', title: '', icon: '🧠', category: 'Case Diary', link: '#', desc: '' },
  },
};

const NAV_ITEMS = [
  { id: 'settings', label: '🌐 Site Settings' },
  { id: 'experience', label: '💼 Experience' },
  { id: 'education', label: '🎓 Education' },
  { id: 'skills', label: '🛠️ Skills' },
  { id: 'projects', label: '🚀 Projects' },
  { id: 'books', label: '📚 Books' },
  { id: 'research', label: '🔬 Research' },
  { id: 'journeyTech', label: '💻 Tech Articles' },
  { id: 'journeyInvestigation', label: '🔍 Investigation' },
  { id: 'journeyCaseDiary', label: '📓 Case Diaries' },
];

// ── MAIN ADMIN PANEL ────────────────────────────────────────────
export default function AdminPanel() {
  const [authed, setAuthed] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [pwErr, setPwErr] = useState(false);
  const [activeSection, setActiveSection] = useState('settings');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { loading, firebaseReady } = useContent();

  const handleLogin = () => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setAuthed(true);
      setPwErr(false);
    } else {
      setPwErr(true);
    }
  };

  if (!authed) {
    return (
      <div className="adm-login">
        <div className="adm-login-card">
          <div className="adm-login-logo">⚡</div>
          <h1 className="adm-login-title">Portfolio Admin</h1>
          <p className="adm-login-sub">Salman Hashir — Content Dashboard</p>
          <input
            className="adm-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => { setUsername(e.target.value); setPwErr(false); }}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            autoComplete="username"
          />
          <input
            className={`adm-input ${pwErr ? 'adm-input-error' : ''}`}
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => { setPassword(e.target.value); setPwErr(false); }}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            autoComplete="current-password"
          />
          {pwErr && <p className="adm-error-msg">❌ Incorrect username or password</p>}
          <button className="adm-btn-primary adm-btn-full" onClick={handleLogin}>Enter Dashboard →</button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="adm-loading">
        <div className="adm-spinner" />
        <p>Loading content from Firebase...</p>
      </div>
    );
  }

  return (
    <div className="adm-shell">
      {/* Mobile header */}
      <div className="adm-mobile-header">
        <button className="adm-hamburger" onClick={() => setSidebarOpen(p => !p)}>☰</button>
        <span className="adm-mobile-title">Portfolio Admin</span>
        <a href="/" className="adm-btn-sm">← Portfolio</a>
      </div>

      {/* Sidebar */}
      <aside className={`adm-sidebar ${sidebarOpen ? 'adm-sidebar-open' : ''}`}>
        <div className="adm-sidebar-header">
          <span className="adm-sidebar-logo">⚡</span>
          <div>
            <div className="adm-sidebar-name">Portfolio Admin</div>
            <div className="adm-sidebar-sub">Salman Hashir</div>
          </div>
        </div>

        {!firebaseReady && (
          <div className="adm-firebase-warn">
            ⚠️ Firebase not connected. Changes won't be saved. See setup guide below.
          </div>
        )}

        <nav className="adm-nav">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={`adm-nav-item ${activeSection === item.id ? 'adm-nav-active' : ''}`}
              onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="adm-sidebar-footer">
          <a href="/" className="adm-btn-ghost adm-btn-full">← View Portfolio</a>
          <button className="adm-btn-danger-ghost adm-btn-full" onClick={() => setAuthed(false)}>Log Out</button>
        </div>
      </aside>

      {sidebarOpen && <div className="adm-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Main content */}
      <main className="adm-main">
        {activeSection === 'settings' ? (
          <SettingsSection />
        ) : (
          <CollectionSection
            key={activeSection}
            colName={activeSection}
            title={SECTION_CONFIGS[activeSection].title}
            fields={SECTION_CONFIGS[activeSection].fields}
            newItemTemplate={SECTION_CONFIGS[activeSection].template}
          />
        )}
      </main>
    </div>
  );
}
