import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ParticleBackground } from '../components/ParticleBackground';
import styles from '../styles/pages/Home.module.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.home}>
      <img src="/ignite-logo.png" alt="ignite-logo" />
      <h3>P.E.S Modern College Of Engineering Shivajinagar, Pune</h3>
      <h3>Department of Information Technology presents</h3>
      <h1>MPULSE IGNITE 2023</h1>
      <h2>COMING SOON </h2>

      <div data-aos="fade-up" data-aos-duration="1000">
        <button onClick={() => navigate('/register')}>Register Here</button>
        <button className={styles.filled} onClick={() => navigate('/events')}>
          View Events
        </button>
      </div>
      <ParticleBackground></ParticleBackground>
    </div>
  );
};

export default Home;
