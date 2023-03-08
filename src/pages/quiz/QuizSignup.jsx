import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setUser } from '../../redux/quizSlice';
import { setTreasurer } from '../../redux/treasurerSlice';
import styles from '../../styles/pages/Register.module.css';

// http://localhost:3000/quiz/aptitude?name=Bug%20Bounty

const QuizSignup = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();

  const { data } = useSelector((store) => store.quiz);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [registrationid, setRegistrationid] = useState('');

  const notifyError = (message) => {
    toast.error(message, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_FLASK_BACKEND}/api/auth/authenticate/${registrationid}`
      );

      if (
        !response.data.message.qr_information.event_name.includes(
          searchParams.get('name')
        )
      ) {
        notifyError(`You are not eligible for the ${searchParams.get('name')}`);
        return;
      }
      navigate(`/quiz/${category}/start`);
      dispatch(
        setUser({ ...response.data.message.qr_information, category: category })
      );
    } catch (error) {
      notifyError('Invalid registration id');
      setRegistrationid('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.register} style={{ padding: '0px' }}>
      <h1>
        {category} Quiz&nbsp;{searchParams.get('name')}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.floatinglabelgroup}>
          <input
            type="text"
            id="registerid"
            className={styles.formcontrol}
            required
            value={registrationid}
            onChange={(e) => setRegistrationid(e.target.value)}
          />
          <label htmlFor="registerid" className={styles.floatinglabel}>
            Registration ID <span>*</span>
          </label>
        </div>
        <button disabled={loading}>
          {loading ? 'Submiting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default QuizSignup;
