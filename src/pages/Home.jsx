import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { ParticleBackground } from '../components/ParticleBackground';
import styles from '../styles/pages/Home.module.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.home}>
      <Helmet>
        <title>Mpulse IngITe 2023</title>
      </Helmet>

      <img src="/ignite-logo.png" alt="ignite-logo" />
      <h3>P.E.S Modern College Of Engineering Shivajinagar, Pune</h3>
      <h3>Department of Information Technology presents</h3>
      <h1>MPULSE IGNITE 2023</h1>
      <h2>20 - 21 March 2023 </h2>

      <div>
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
