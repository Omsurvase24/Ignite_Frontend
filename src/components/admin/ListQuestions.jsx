import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import styles from '../../styles/pages/Admin.module.css';
import { setError, setSuccess } from '../../redux/toastSlice';

const options = ['aptitude', 'bugbountyquiz', 'bugbountycode'];

const ListQuestions = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState('aptitude');

  const [entries, setEntries] = useState([]);

  const onEventChange = (e) => {
    setState(e.target.value);
    console.log(e.target.value);
  };

  const getQuestions = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_NODE_BACKEND}/apinode/category/get-questions/${state}`
      );

      setEntries(response.data);
    } catch (error) {
      dispatch(setError('Error occured while getting questions'));
      console.log(error);
    }
  };

  const handleDelete = async (_id) => {
    console.log(_id);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_NODE_BACKEND}/apinode/quiz/delete-quiz/${state}?id=${_id}`
      );

      dispatch(setSuccess(response.data.message));
    } catch (error) {
      console.log(error);
      dispatch(setError('Error occured while deleting question'));
    }
  };

  return (
    <div className={styles.list}>
      <h3>List Of Questions</h3>
      <div className={styles.options}>
        <select onChange={onEventChange} style={{ marginBottom: 0 }}>
          {options.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
        <button onClick={getQuestions}>Load</button>
        <h4 style={{ color: '#fdfdfd', fontWeight: 500, fontSize: 20 }}>
          Total: {entries?.length}
        </h4>
      </div>

      <div className={styles.questions}>
        {entries?.map((entry) => (
          <div className={styles.question}>
            <button
              className={styles.delete}
              onClick={() => handleDelete(entry._id)}
            >
              Delete
            </button>

            <h6 dangerouslySetInnerHTML={{ __html: entry.question }}></h6>

            {entry.options.map((option) => (
              <p style={{ color: entry.answer === option && 'red' }}>
                {option}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListQuestions;
