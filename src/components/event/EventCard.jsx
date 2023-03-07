import React from 'react';
import EventPopup from './EventPopup';
import styles from '../../styles/pages/Events.module.css';
import { useDispatch } from 'react-redux';
import { setPopupData } from '../../redux/eventPopupSlice';

const EventCard = ({ image, title, open, setOpen, data }) => {
  const dispatch = useDispatch();

  return (
    <div
      className={styles.event}
      data-aos="zoom-in"
      onClick={() => {
        setOpen(true);
        dispatch(setPopupData(data));
      }}
    >
      <img src={image} alt={title} />
      <h4>{title}</h4>
    </div>
  );
};

export default EventCard;
