import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setTreasurer } from '../../redux/treasurerSlice';
import styles from '../../styles/pages/Register.module.css';

const TreasurerLogin = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [data, setData] = useState({
    email_address: '',
    password: '',
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_FLASK_BACKEND}/api/auth/login`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log(response.data);
      dispatch(setTreasurer(response.data));
      navigate('/treasurer/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.register}>
      <h1>Treasurer Login</h1>
      <form onSubmit={handleLogin}>
        <div className={styles.row1}>
          <div className={styles.floatinglabelgroup}>
            <input
              type="text"
              id="Email"
              className={styles.formcontrol}
              required
              value={data.email_address}
              onChange={(e) =>
                setData({ ...data, email_address: e.target.value })
              }
            />
            <label htmlFor="Email" className={styles.floatinglabel}>
              Email <span>*</span>
            </label>
          </div>
        </div>
        <div className={styles.floatinglabelgroup}>
          <input
            type="text"
            id="password"
            className={styles.formcontrol}
            required
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <label htmlFor="password" className={styles.floatinglabel}>
            Password <span>*</span>
          </label>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default TreasurerLogin;
