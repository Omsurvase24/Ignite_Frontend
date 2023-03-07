import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Events from './pages/Events';
import Sponsors from './pages/Sponsors';
import Gallery from './pages/Gallery';
import Layout from './components/Layout';
import Register from './pages/Register';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AOS from 'aos';
import 'aos/dist/aos.css';

import Admin from './pages/admin/Admin';
import Dashboard from './pages/admin/Dashboard';
import TreasurerLogin from './pages/treasurer/TreasurerLogin';
import TreasurerDashboard from './pages/treasurer/TreasurerDashboard';
import NotFound from './pages/NotFound';

const App = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/register" element={<Register />} />
          <Route path="/treasurer" element={<TreasurerLogin />} />
          <Route path="/treasurer/dashboard" element={<TreasurerDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </Layout>
    </Router>
  );
};

export default App;
