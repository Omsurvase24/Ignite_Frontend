import React from 'react';
import { Helmet } from 'react-helmet';
import styles from '../../styles/pages/Register.module.css';

const Admin = () => {
  const handleLogin = () => {};
  return (
    <div className={styles.register}>
      <Helmet>
        <title>Mpulse IngITe 2023 | Register</title>
      </Helmet>

      <img src="/ignite-logo.png" alt="ignite-logo" />
      <h1>Event Registration</h1>
      <form onSubmit={handleLogin}>
        <div className={styles.row1}>
          <div className={styles.floatinglabelgroup}>
            <input
              type="text"
              id="firstname"
              className={styles.formcontrol}
              required
            />
            <label htmlFor="firstname" className={styles.floatinglabel}>
              First name <span>*</span>
            </label>
          </div>
        </div>
        <div className={styles.row1}>
          <div className={styles.floatinglabelgroup}>
            <input
              type="text"
              id="lastname"
              className={styles.formcontrol}
              required
            />
            <label htmlFor="lastname" className={styles.floatinglabel}>
              Last name <span>*</span>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Admin;
