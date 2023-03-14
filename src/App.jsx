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
import Quiz from './pages/quiz/Quiz';
import QuizSignup from './pages/quiz/QuizSignup';
import Submit from './pages/Submit';
import Attempted from './pages/Attempted';
import ClearStorage from './pages/ClearStorage';
import Appear from './pages/Appear';
import CodeEditor from './pages/CodeEditor';

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
          <Route path="/quiz/:category" element={<QuizSignup />} />
          <Route path="/quiz/:category/start" element={<Quiz />} />
          <Route path="/quiz/:category/submit" element={<Submit />} />
          <Route path="/quiz/:category/attempted" element={<Attempted />} />
          <Route path="/editor" element={<CodeEditor />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/appear" element={<Appear />} />
          <Route path="/clear" element={<ClearStorage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </Layout>
    </Router>
  );
};

export default App;
