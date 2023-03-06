import React from 'react';
import { ParticleBackground } from '../components/ParticleBackground';
import styles from '../styles/pages/Home.module.css';

const Home = () => {
  return (
    <div className={styles.home}>
      <img src="/ignite-logo.png" alt="ignite-logo" />
      <h3>P.E.S Modern College Of Engineering Shivajinagar, Pune</h3>
      <h3>Department of Information Technology presents</h3>
      <h1>MPULSE IGNITE 2023</h1>
      <h2>COMING SOON </h2>

      <div>
        <button>Register Here</button>
        <button className={styles.filled}>View Events</button>
      </div>
      <ParticleBackground></ParticleBackground>
    </div>
  );
};

export default Home;
