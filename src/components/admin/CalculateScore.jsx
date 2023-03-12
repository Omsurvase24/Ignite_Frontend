import React, { useState } from 'react';
import axios from 'axios';
import styles from '../../styles/pages/Admin.module.css';
import { useDispatch } from 'react-redux';
import { setError, setSuccess } from '../../redux/toastSlice';

const options = ['aptitude', 'bugbountyquiz', 'bugbountycode'];

const CalculateScore = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState('aptitude');

  const onEventChange = (e) => {
    setState(e.target.value);
    console.log(e.target.value);
  };

  const calculateScore = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_NODE_BACKEND}/apinode/quiz/calculate-scores/${state}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      dispatch(setSuccess('Score calculated'));
      console.log(response.data);
    } catch (error) {
      dispatch(setError('Error occured'));
      console.log(error);
    }
  };

  return (
    <div>
      <h3>Calculate Score</h3>
      <div className={styles.options}>
        <select onChange={onEventChange} style={{ marginBottom: 0 }}>
          {options.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
        <button onClick={calculateScore}>Calculate</button>
      </div>
    </div>
  );
};

export default CalculateScore;
