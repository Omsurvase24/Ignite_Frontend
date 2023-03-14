import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Question from '../../components/quiz/Question';
import { setAnswers, setQuiz } from '../../redux/quizSlice';
import {
  FaAngleRight,
  FaAngleLeft,
  FaBackward,
  FaClock,
  FaHome,
} from 'react-icons/fa';
import { setError } from '../../redux/toastSlice';
import convert from 'convert-seconds';
import styles from '../../styles/pages/Quiz.module.css';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';

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

      if (currentTime >= totalTime - 20) {
        handleOnSubmit(true);
        return;
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
    }, 10000);
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
      // if time present in localstorage then return
      const tempTime = JSON.parse(localStorage.getItem('time'));
      if (tempTime) {
        currentTime = tempTime;
        setTime(tempTime);

        // start countdown
        setInterval(() => {
          setTime((prev) => prev + 1);
          currentTime += 1;

          if (currentTime >= totalTime) {
            handleOnSubmit(true);
            return;
          }

          localStorage.setItem('time', JSON.stringify(currentTime));
        }, 1000);

        return;
      }

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

          currentTime = response.data.time;
          // start countdown
          setInterval(() => {
            setTime((prev) => prev + 1);
            currentTime += 1;

            if (currentTime >= totalTime) {
              handleOnSubmit(true);
              return;
            }

            localStorage.setItem('time', JSON.stringify(currentTime));
          }, 1000);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getAnswers = async () => {
      // if local storage has already answers then don't fetch answers
      if (JSON.parse(localStorage.getItem('answers'))) {
        dispatch(setAnswers(JSON.parse(localStorage.getItem('answers'))));
        return;
      }

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
          localStorage.setItem(
            'answers',
            JSON.stringify(response.data.answers)
          );
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
            name: data?.team_lead,
            email: data?.email,
            contact: data?.contact,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        // set questions
        localStorage.setItem('quiz', JSON.stringify(response.data));
        dispatch(setQuiz(response.data));

        // get total time for quiz exam
        getTotalTime();
        // call getAnswers after getting all quizes
        getAnswers();
        // get time
        getTime();
      } catch (error) {
        if (
          error.response.data.error === 'You have already attempted the quiz.'
        ) {
          navigate(`/quiz/${category}/attempted`);
          window.location.reload();
          return;
        } else {
          navigate('/');
          window.location.reload();
        }

        dispatch(setError(error.response.data.error));
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
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_NODE_BACKEND}/apinode/quiz/end-quiz/${category}`,
        {
          name: data.team_lead,
          email: data.email,
          contact: data.contact,
          answers: answers,
          time: JSON.parse(localStorage.getItem('time')),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // dispatch(setSuccess('Your response has been recorded.'));
      localStorage.clear();
      navigate(`/quiz/${category}/submit`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.quizpage}>
      <img
        src="/ignite-logo.png"
        alt="ignite-logo"
        style={{ width: 120, position: 'fixed', left: 10, top: 10 }}
      />

      <h1>{category}</h1>

      <h6>
        <FaClock /> {convert(time).minutes.toString().length === 1 && 0}
        {convert(time).minutes}:
        {convert(time).seconds.toString().length === 1 && 0}
        {convert(time).seconds}
      </h6>

      {quiz && <Question quiz={quiz[index]} index={index} />}
      {quiz && (
        <div
          className={styles.navigation}
          style={{
            justifyContent:
              index === quiz?.length - 1
                ? 'start'
                : index === 0
                ? 'end'
                : 'space-between',
          }}
        >
          {index !== 0 && (
            <button onClick={prevQuestion}>
              <FaAngleLeft /> Previous
            </button>
          )}

          {index !== quiz.length - 1 && (
            <button onClick={nextQuestion}>
              Next <FaAngleRight />
            </button>
          )}
        </div>
      )}

      <div
        className={styles.navigation}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {!(index < quiz?.length - 1) && (
          <button
            onClick={() => handleOnSubmit(false)}
            className={styles.submit}
          >
            Submit
          </button>
        )}
      </div>

      {quiz && (
        <div>
          <h5
            style={{
              textAlign: 'center',
              fontSize: 18,
              marginTop: 50,
              color: '#b6b6b6',
            }}
          >
            Quiz Summary
          </h5>
          <div className={styles.progress}>
            {quiz.map((qz, index) => (
              <button
                className={answers[index] !== '' && styles.active}
                onClick={() => setIndex(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      <marquee
        width="700px"
        direction="right"
        height="100px"
        style={{ marginTop: 50, color: '#a7a7a76c', fontWeight: 500 }}
      >
        {data?.team_lead} &nbsp;&nbsp;&nbsp; {data?.email} &nbsp;&nbsp;&nbsp;
        {data?.contact} &nbsp;&nbsp;&nbsp; {data?.category}
      </marquee>
    </div>
  );
};

export default Quiz;
