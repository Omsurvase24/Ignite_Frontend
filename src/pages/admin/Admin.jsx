import React from 'react';
import styles from '../../styles/pages/Register.module.css';

const Admin = () => {
  const handleLogin = () => {};
  return (
    <div className={styles.register} style={{ paddingTop: 0 }}>
      <h1>Admin Login</h1>
      <form onSubmit={handleLogin}>
        <div className={styles.row1}>
          <div className={styles.floatinglabelgroup}>
            <input
              type="text"
              id="username"
              className={styles.formcontrol}
              required
            />
            <label htmlFor="username" className={styles.floatinglabel}>
              Username <span>*</span>
            </label>
          </div>
        </div>
        <div className={styles.row1}>
          <div className={styles.floatinglabelgroup}>
            <input
              type="password"
              id="password"
              className={styles.formcontrol}
              required
            />
            <label htmlFor="password" className={styles.floatinglabel}>
              Password<span>*</span>
            </label>
          </div>
        </div>
        <button style={{ marginTop: 0 }}>Login</button>
      </form>
    </div>
  );
};

export default Admin;
