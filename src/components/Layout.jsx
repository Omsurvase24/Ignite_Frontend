import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {!pathname.includes('treasurer') &&
        !pathname.includes('quiz') &&
        !pathname.includes('admin') && <Navbar />}
      {children}
      {pathname !== '/' &&
        !pathname.includes('treasurer') &&
        !pathname.includes('quiz') &&
        !pathname.includes('admin') && <Footer />}
    </>
  );
};

export default Layout;
