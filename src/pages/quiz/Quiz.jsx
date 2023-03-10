import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Question from '../../components/quiz/Question';
import { setAnswers, setQuiz } from '../../redux/quizSlice';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import styles from '../../styles/pages/Quiz.module.css';

const Quiz = () => {
  const dispatch = useDispatch();

  const { data, quiz, answers } = useSelector((store) => store.quiz);

  const { category } = useParams();

  const navigate = useNavigate();

  // quiz
  let fetched = false;
  const [index, setIndex] = useState(0);

  const nextQuestion = () => {
    if (index < quiz.length - 1) {
      setIndex(index + 1);
    }
  };
  const prevQuestion = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };
  //

  useEffect(() => {
    if (!data) {
      navigate('/');
    }

    const getAnswers = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_NODE_BACKEND}/apinode/quiz/get-answers/${category}`,
          {
            name: data.team_lead,
            email: data.email,
            contact: data.contact,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.data !== null) {
          dispatch(setAnswers(response.data.answers));
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getQuizs = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_NODE_BACKEND}/apinode/quiz/get-quiz/${category}`,
          {
            name: data.team_lead,
            email: data.email,
            contact: data.contact,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        dispatch(setQuiz(response.data));
        dispatch(setAnswers(new Array(response.data.length).fill('')));

        // call getAnswers after getting all quizes
        getAnswers();
      } catch (error) {
        console.log(error);
      }
    };

    // fetch quizes only once
    if (!fetched) {
      getQuizs();
      fetched = true;
    }
  }, [data]);

  // on submit
  const handleOnSubmit = () => {
    console.log(answers);
  };

  return (
    <div className={styles.quizpage}>
      <span className={styles.time}></span>
      <h1>{category}</h1>

      {!quiz && <h3>Please wait while loading the quiz...</h3>}

      {quiz && <Question quiz={quiz[index]} index={index} />}

      {quiz && (
        <div className={styles.navigation}>
          <button onClick={prevQuestion}>
            <FaAngleLeft /> Previous
          </button>

          {!(index < quiz.length - 1) && (
            <button onClick={handleOnSubmit}>Submit</button>
          )}

          <button onClick={nextQuestion}>
            Next <FaAngleRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
