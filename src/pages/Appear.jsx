import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/pages/Events.module.css';

const Appear = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.events}>
      <div className={styles.allEvents}>
        <div className={styles.event}>
          <div className={styles.content}>
            <div className={styles.contentOverlay}></div>
            <img src="/events/bugbounty.png" alt="bug bounty" />
            <div className={`${styles.contentDetails} ${styles.contentFadeIn}`}>
              <h4>Bug Bounty</h4>
              <button
                onClick={() => {
                  navigate('/quiz/aptitude?name=Bug Bounty');
                }}
              >
                Take Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appear;
