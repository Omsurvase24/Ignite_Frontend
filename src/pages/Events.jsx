import React, { useState } from 'react';

import { Helmet } from 'react-helmet';
import EventCard from '../components/event/EventCard';
import EventPopup from '../components/event/EventPopup';
import styles from '../styles/pages/Events.module.css';
import data from '../utils/events';

const Events = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.events}>
      <Helmet>
        <title>Mpulse Ignite 2023 | Events</title>
      </Helmet>

      {/* <img src="/ignite-logo.png" alt="ignite-logo" /> */}

      <h1>Events</h1>

      {open && <EventPopup setOpen={setOpen} />}

      <div className={styles.allEvents}>
        {data.map((event) => (
          <EventCard
            key={event.id}
            image={event.image}
            title={event.title}
            data={event}
            setOpen={setOpen}
            open={open}
          />
        ))}
      </div>
    </div>
  );
};

export default Events;
