import React from 'react';
import styles from '../../styles/pages/Events.module.css';
import { useDispatch } from 'react-redux';
import { setPopupData } from '../../redux/eventPopupSlice';

const EventCard = ({ image, title, setOpen, data }) => {
  const dispatch = useDispatch();

  return (
    <div
      className={styles.event}
      onClick={() => {
        setOpen(true);
        dispatch(setPopupData(data));
      }}
    >
      <div className={styles.content}>
        <div className={styles.contentOverlay}></div>
        <img src={image} alt={title} />
        <div className={`${styles.contentDetails} ${styles.contentFadeIn}`}>
          <h4>{data.title}</h4>
          <button
            onClick={() => {
              setOpen(true);
              dispatch(setPopupData(data));
            }}
          >
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
