import React from 'react';
import styles from '../../styles/pages/Events.module.css';

const EventCard = ({ image, title }) => {
  return (
    <div className={styles.event} data-aos="zoom-in">
      <img src={image} alt={title} />
      <h4>{title}</h4>

      {/* <p>read more</p> */}
    </div>
  );
};

export default EventCard;
