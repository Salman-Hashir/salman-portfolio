import React from 'react';
import Cursor from './Cursor';

const Layout = ({ children }) => {
  return (
    <>
      <Cursor />
      <main className="min-h-screen relative z-10">
        {children}
      </main>
    </>
  );
};

export default Layout;
