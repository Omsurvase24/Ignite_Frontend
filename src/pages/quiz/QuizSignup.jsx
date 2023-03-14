import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setUser } from '../../redux/quizSlice';
import { setTreasurer } from '../../redux/treasurerSlice';
import QuizVertficationPopup from './QuizVertficationPopup';
import styles from '../../styles/pages/Register.module.css';
import { setError } from '../../redux/toastSlice';

// http://localhost:3000/quiz/aptitude?name=Bug%20Bounty

const QuizSignup = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();

  const { data } = useSelector((store) => store.quiz);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [registrationid, setRegistrationid] = useState('');
  const [contact, setContact] = useState('');

  const [islive, setLive] = useState(false);

  const [openVertficationPopup, setOpenVertficationPopup] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkLive = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_NODE_BACKEND}/apinode/category/check-live/${category}`
        );

        setLive(response.data.live);
      } catch (error) {
        console.log(error);
      }
    };

    checkLive();
  }, []);

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

      if (response.data.message.qr_information.contact === contact) {
        dispatch(
          setUser({
            ...response.data.message.qr_information,
            category: category,
          })
        );
        // open verification popup here
        setOpenVertficationPopup(true);
      } else {
        dispatch(setError('Invalid registration id and contact number'));
      }
    } catch (error) {
      notifyError('Invalid registration id');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.register} style={{ padding: '0px' }}>
      <img src="/ignite-logo.png" alt="ignite-logo" style={{ width: 150 }} />

      {openVertficationPopup && (
        <QuizVertficationPopup
          setAuthenticated={setAuthenticated}
          setOpenVertficationPopup={setOpenVertficationPopup}
        />
      )}

      {!islive && (
        <h1>
          {category} Quiz&nbsp;{searchParams.get('name')} is not live yet.
        </h1>
      )}

      {islive && (
        <h1>
          {category} Quiz&nbsp;{searchParams.get('name')}
        </h1>
      )}

      {islive && (
        <form onSubmit={handleSubmit}>
          <div className={styles.row1}>
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
          </div>
          <div className={styles.row1}>
            <div className={styles.floatinglabelgroup}>
              <input
                type="text"
                id="contact"
                className={styles.formcontrol}
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
              <label htmlFor="contact" className={styles.floatinglabel}>
                Contact <span>*</span>
              </label>
            </div>
          </div>
          <button disabled={loading} style={{ margin: 0 }}>
            {loading ? 'Submiting...' : 'Submit'}
          </button>
        </form>
      )}
    </div>
  );
};

export default QuizSignup;
