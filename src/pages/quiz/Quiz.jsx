import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styles from '../../styles/pages/Quiz.module.css';

const Quiz = () => {
  const { data } = useSelector((store) => store.quiz);

  const { category } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (!data) {
      navigate('/');
    }

    const getQuizs = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_NODE_BACKEND}/api/quiz/get-quiz/${category}`,
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

        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getQuizs();
  }, [data]);

  return <div className={styles.quizpage}>Quiz</div>;
};

export default Quiz;
