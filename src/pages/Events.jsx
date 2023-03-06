import React, { useState } from 'react';
import EventCard from '../components/event/EventCard';
import EventPopup from '../components/event/EventPopup';
import styles from '../styles/pages/Events.module.css';

const Events = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.events}>
      <h1>Events</h1>
      {open && <EventPopup setOpen={setOpen} />}

      <div className={styles.allEvents}>
        <EventCard image="/events/bugshodh.png" title="Bugshodh" />
        <EventCard image="/events/designx.png" title="Design X" />
        <EventCard image="/events/hackathon.png" title="Hackathon" />
        <EventCard image="/events/mockplacement.png" title="Mock Placement" />
        <EventCard image="/events/treasurehunt.png" title="Treasure Hunt" />
      </div>
    </div>
  );
};

export default Events;
