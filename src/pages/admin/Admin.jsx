import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAdmin } from '../../redux/adminSlice';
import { setError } from '../../redux/toastSlice';
import styles from '../../styles/pages/Register.module.css';

const Admin = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [data, setData] = useState({
    username: '',
    password: '',
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_NODE_BACKEND}/apinode/admin/login`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      dispatch(setAdmin(response.data));
      navigate('/admin/dashboard');
    } catch (error) {
      dispatch(setError('Invalid username and password'));
      console.log(error);
    }
  };

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
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
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
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
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
