import React from 'react';
import styles from '../styles/pages/Sponsors.module.css';

const Sponsors = () => {
  return (
    <div className={styles.sponsors}>
      <form action="">
        <div className={styles.floatinglabelgroup}>
          <input
            type="password"
            id="password"
            className={styles.formcontrol}
            autocomplete="off"
            required
          />
          <label className={styles.floatinglabel}>Password</label>
        </div>
      </form>
    </div>
  );
};

export default Sponsors;
