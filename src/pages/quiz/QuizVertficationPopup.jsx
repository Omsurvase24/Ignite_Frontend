import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import popupStyles from '../../styles/pages/Events.module.css';
import styles from '../../styles/pages/Quiz.module.css';

const QuizVertficationPopup = ({
  setAuthenticated,
  setOpenVertficationPopup,
}) => {
  const { data } = useSelector((store) => store.quiz);

  const { category } = useParams();
  const navigate = useNavigate();

  const handleConfirm = () => {
    setAuthenticated(true);
    setOpenVertficationPopup(false);
    navigate(`/quiz/${category}/start`);
  };

  const handleCancel = () => {
    setOpenVertficationPopup(false);
  };

  return (
    <div className={popupStyles.background}>
      <div className={popupStyles.popup}>
        <div className={`${popupStyles.content} ${styles.popup}`}>
          <h3>Confirm Verification</h3>
          <p>
            <span>Name:</span> {data?.team_lead}
          </p>
          <p>
            <span>Email:</span> {data?.email}
          </p>
          <p>
            <span>Contact:</span> {data?.contact}
          </p>
          <p>
            <span>College:</span> {data?.college_name}
          </p>
          <div className={styles.buttons}>
            <button onClick={handleConfirm}>Confirm</button>
            <button className={styles.cancel} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizVertficationPopup;
