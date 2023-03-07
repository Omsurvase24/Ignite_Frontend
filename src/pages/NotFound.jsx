import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/pages/NotFound.module.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.notfound}>
      <img src="/ignite-logo.png" alt="ignite-logo" />
      <h1>404</h1>
      <h2>Page not found</h2>
      <button onClick={() => navigate('/')}>Go Home</button>
    </div>
  );
};

export default NotFound;
