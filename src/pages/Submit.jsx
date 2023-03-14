import React, { useEffect } from 'react';
import { FaHome } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../styles/pages/Quiz.module.css';

const Submit = () => {
  const { category } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className={styles.quizpage} style={{ paddingTop: 0 }}>
      <img
        src="/ignite-logo.png"
        alt="ignite-logo"
        style={{ width: 120, marginBottom: 30 }}
      />
      <h1>Quiz for {category} submitted successfully</h1>
      <button className={styles.goHome} onClick={() => navigate('/')}>
        <FaHome /> &nbsp; Home
      </button>
    </div>
  );
};

export default Submit;
