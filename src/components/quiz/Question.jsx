import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAnswers, setOption } from '../../redux/quizSlice';
import styles from '../../styles/pages/Quiz.module.css';

const Question = ({ quiz, index }) => {
  const dispatch = useDispatch();

  const { data, answers } = useSelector((store) => store.quiz);

  const handleSelectAnswer = async (option) => {
    dispatch(setOption({ index, option }));

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_NODE_BACKEND}/apinode/quiz/submit-quiz/${data.category}`,
        {
          name: data.team_lead,
          email: data.email,
          contact: data.contact,
          answers: answers,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className={styles.quiz}>
        <h4>
          Q. {index + 1} &#41; {quiz?.question}
        </h4>
        {quiz?.options.map((option, idx) => (
          <p
            key={`${index} - ${idx}`}
            className={`${answers[index] === option ? styles.selected : ''}`}
            onClick={() => handleSelectAnswer(option)}
          >
            {option}{' '}
            <span
              className={`${answers[index] === option ? styles.selected : ''}`}
            ></span>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Question;