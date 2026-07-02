import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import AdminPanel from './admin/AdminPanel.jsx';
import { ContentProvider } from './context/ContentContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ContentProvider>
        <Routes>
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/*" element={
            <ThemeProvider>
              <App />
            </ThemeProvider>
          } />
        </Routes>
      </ContentProvider>
    </BrowserRouter>
  </React.StrictMode>
);
