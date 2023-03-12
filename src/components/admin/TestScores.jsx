import React, { useState } from 'react';
import axios from 'axios';
import convert from 'convert-seconds';
import styles from '../../styles/pages/Admin.module.css';

const options = ['aptitude', 'bugbountyquiz', 'bugbountycode'];

const TestScores = () => {
  const [state, setState] = useState('aptitude');

  const [entries, setEntries] = useState([]);

  const onEventChange = (e) => {
    setState(e.target.value);
    console.log(e.target.value);
  };

  const handleLoad = async () => {
    setEntries([]);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_NODE_BACKEND}/apinode/category/calculate-result/${state}`
      );

      setEntries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3>Test Score</h3>
      <div className={styles.options}>
        <select onChange={onEventChange} style={{ marginBottom: 0 }}>
          {options.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
        <button onClick={handleLoad}>Load</button>
      </div>

      <table border={1}>
        <tr>
          <th>No.</th>
          <th>Name</th>
          <th>Email</th>
          <th>Contact</th>
          <th>Category</th>
          <th>Submitted</th>
          <th>Time</th>
          <th>Score</th>
        </tr>
        {entries.map((entry, index) => (
          <tr key={entry._id}>
            <td>{index + 1}</td>
            <td>{entry.name}</td>
            <td>{entry.email}</td>
            <td>{entry.contact}</td>
            <td>{entry.category}</td>
            <td>{entry.submitted ? 'Yes' : 'No'}</td>
            <td>
              {convert(entry.time).minutes.toString().length === 1 && 0}
              {convert(entry.time).minutes}:
              {convert(entry.time).seconds.toString().length === 1 && 0}
              {convert(entry.time).seconds} mins
            </td>
            <td>{entry.score}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default TestScores;
