import React from 'react';
import styles from '../../styles/pages/Editor.module.css';

const Submissions = () => {
  return (
    <div className={styles.left} style={{ paddingBottom: '80px' }}>
      <h2>Submissions</h2>
      <div>
        <div className={`${styles.submission} ${styles.correctSubmission}`}>
          <div>
            <h4 className={styles.success}>Accepted</h4>
            <p>Dec 14, 2022</p>
          </div>

          <span>CPP</span>
        </div>

        <div className={`${styles.submission} ${styles.wrongSubmission}`}>
          <div>
            <h4 className={styles.error}>Accepted</h4>
            <p>Dec 14, 2022</p>
          </div>

          <span>CPP</span>
        </div>
      </div>
    </div>
  );
};

export default Submissions;
