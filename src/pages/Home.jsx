import React from 'react';
import styles from '../styles/pages/Home.module.css';

const Home = () => {
  return (
    <div className={styles.home}>
      <h3>P.E.S Modern College Of Engineering Shivajinagar, Pune</h3>
      <h3>Department of Information Technology presents</h3>
      <h1>MPULSE IGNITE 2023</h1>
      <h3>COMING SOON </h3>

      <div>
        <button>Register Here</button>
        <button className={styles.filled}>View Events</button>
      </div>
    </div>
  );
};

export default Home;
