import React, { useRef, useState } from 'react';
import axios from 'axios';
import JoditEditor from 'jodit-react';
import { useDispatch } from 'react-redux';
import { setError, setSuccess } from '../../redux/toastSlice';
import styles from '../../styles/pages/Admin.module.css';
import registerStyle from '../../styles/pages/Register.module.css';

const options = ['aptitude', 'bugbountyquiz', 'bugbountycode'];

const AddQuestion = () => {
  const dispatch = useDispatch();

  const ref = useRef(null);

  const [category, setCategory] = useState('aptitude');
  const [question, setQuestion] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [answer, setAnswer] = useState('');

  const [loading, setLoading] = useState(false);

  const onEventChange = (e) => {
    setCategory(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let options = [];
    if (option1) {
      options.push(option1);
    }
    if (option2) {
      options.push(option2);
    }
    if (option3) {
      options.push(option3);
    }
    if (option4) {
      options.push(option4);
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_NODE_BACKEND}/apinode/quiz/add-quiz/${category}`,
        { question: question, options: options, answer: answer },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      dispatch(setSuccess('Question added'));
    } catch (error) {
      dispatch(setError('Error occured while adding question'));
      console.log(error);
    }
  };

  return (
    <div>
      <h3>Add question</h3>

      <form onSubmit={handleSubmit}>
        <div className={`${registerStyle.row1} ${styles.editorButtons}`}>
          <JoditEditor
            ref={ref}
            value={question}
            tabIndex={1}
            onBlur={(newDescription) => setQuestion(newDescription)}
            className={styles.editor}
            onChange={(newDescription) => {}}
          />
        </div>
        <input
          type="text"
          placeholder="option 1"
          className={styles.questionInput}
          value={option1}
          onChange={(e) => setOption1(e.target.value)}
        />
        <input
          type="text"
          placeholder="option 2"
          className={styles.questionInput}
          value={option2}
          onChange={(e) => setOption2(e.target.value)}
        />
        <input
          type="text"
          placeholder="option 3"
          className={styles.questionInput}
          value={option3}
          onChange={(e) => setOption3(e.target.value)}
        />
        <input
          type="text"
          placeholder="option 4"
          className={styles.questionInput}
          value={option4}
          onChange={(e) => setOption4(e.target.value)}
        />
        <input
          type="text"
          placeholder="answer"
          className={styles.questionInput}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <select
          onChange={onEventChange}
          style={{ marginBottom: 0, background: '#fdfdfd', color: '#000' }}
        >
          {options.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
        <button className={styles.submit} disabled={loading}>
          {loading ? 'Submiting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default AddQuestion;
