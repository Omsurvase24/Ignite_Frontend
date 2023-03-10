import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Question from '../../components/quiz/Question';
import { setAnswers, setQuiz } from '../../redux/quizSlice';
import { FaAngleRight, FaAngleLeft, FaBackward, FaClock } from 'react-icons/fa';
import { setError } from '../../redux/toastSlice';
import convert from 'convert-seconds';
import styles from '../../styles/pages/Quiz.module.css';

//
//

const Quiz = () => {
  const dispatch = useDispatch();

  const { data, quiz, answers } = useSelector((store) => store.quiz);

  const { category } = useParams();

  const navigate = useNavigate();

  // quiz
  let fetched = false;
  let callTimer = true;
  let totalTime = 0;
  let currentTime = 0;
  const [index, setIndex] = useState(0);
  const [time, setTime] = useState(0);

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

  // useEffect
  useEffect(() => {
    if (!data) {
      navigate('/');
    }

    // update time after every 10 sec
    const increaseTime = async () => {
      console.log('hello');

      if (currentTime >= totalTime - 5) {
        handleOnSubmit(true);
      }

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_NODE_BACKEND}/apinode/quiz/increase-time/${category}`,
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

        // don't change this lines
        if (response) {
          console.log(response);
        }
        callTimer = false;
        // // // // // // // // //
      } catch (error) {
        console.log(error);
      }
    };

    // set interval
    // don't change this line
    setInterval(async () => {
      if (callTimer) {
        callTimer = false;
        await increaseTime();
      }
      callTimer = true;
    }, 5000);
    // // // // // // // // //

    const getTotalTime = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_NODE_BACKEND}/apinode/quiz/get-total-time/${category}`
        );

        console.log('totaltime: ', response.data.time);
        totalTime = response.data.time;
      } catch (error) {
        console.log(error);
      }
    };

    const getTime = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_NODE_BACKEND}/apinode/quiz/get-time/${category}`,
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
          console.log('mytime: ', response.data.time);
          setTime(response.data.time);
          console.log(response.data.time);

          currentTime = response.data.time;
          // start countdown
          setInterval(() => {
            setTime((prev) => prev + 1);
            currentTime += 1;
          }, 1000);
        }
      } catch (error) {
        console.log(error);
      }
    };

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

        // get total time for quiz exam
        getTotalTime();
        // call getAnswers after getting all quizes
        getAnswers();
        // get time
        getTime();
      } catch (error) {
        navigate(`/quiz/${category}/end`);
        window.location.reload();
        dispatch(setError(error.response.data.error));
        console.log(error.response.data.error);
      }
    };

    // fetch quizes only once
    if (!fetched) {
      getQuizs();
      fetched = true;
    }
  }, [data]);

  // on submit
  const handleOnSubmit = async (forcefully) => {
    if (!forcefully) {
      if (answers.includes('')) {
        return dispatch(setError('Please attempt all the questions.'));
      }
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_NODE_BACKEND}/apinode/quiz/end-quiz/${category}`,
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

      // dispatch(setSuccess('Your response has been recorded.'));
      navigate(`/quiz/${category}/end`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.quizpage}>
      <span className={styles.time}></span>
      <h1>{category}</h1>

      <h6>
        <FaClock /> {convert(time).minutes}:{convert(time).seconds}
      </h6>

      {quiz && <Question quiz={quiz[index]} index={index} />}
      {quiz && (
        <div className={styles.navigation}>
          <button onClick={prevQuestion}>
            <FaAngleLeft /> Previous
          </button>

          {!(index < quiz.length - 1) && (
            <button
              onClick={() => handleOnSubmit(false)}
              className={styles.submit}
            >
              Submit
            </button>
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
