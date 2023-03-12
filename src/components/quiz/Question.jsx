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
          index: index,
          option: option,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className={styles.quiz}>
        <strong> Q. {index + 1}&nbsp;&#41;</strong>

        <h4 dangerouslySetInnerHTML={{ __html: quiz.question }}></h4>

        {quiz?.options.map((option, idx) => (
          <em
            key={`${index} - ${idx}`}
            className={`${answers[index] === option ? styles.selected : ''}`}
            onClick={() => handleSelectAnswer(option)}
          >
            {option}{' '}
            <span
              className={`${answers[index] === option ? styles.selected : ''}`}
            ></span>
          </em>
        ))}
      </div>
    </div>
  );
};

export default Question;
