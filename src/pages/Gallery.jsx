import React, { useState } from 'react';

import { Helmet } from 'react-helmet';
import styles from '../styles/pages/Gallery.module.css';

const all = [
  {
    id: 1,
    source: '/gallery/events-1.jpg',
  },
  {
    id: 2,
    source: '/gallery/events-2.jpg',
  },
  {
    id: 3,
    source: '/gallery/events-3.jpg',
  },
  {
    id: 4,
    source: '/gallery/events-4.jpeg',
  },
  {
    id: 5,
    source: '/gallery/events-5.jpeg',
  },
  {
    id: 6,
    source: '/gallery/inauguration-1.jpg',
  },
  {
    id: 7,
    source: '/gallery/inauguration-2.jpg',
  },
  {
    id: 8,
    source: '/gallery/inauguration-3.jpeg',
  },
];

const events = [
  {
    id: 1,
    source: '/gallery/events-1.jpg',
  },
  {
    id: 2,
    source: '/gallery/events-2.jpg',
  },
  {
    id: 3,
    source: '/gallery/events-3.jpg',
  },
  {
    id: 4,
    source: '/gallery/events-4.jpeg',
  },
  {
    id: 5,
    source: '/gallery/events-5.jpeg',
  },
];

const inauguration = [
  {
    id: 1,
    source: '/gallery/inauguration-1.jpg',
  },
  {
    id: 2,
    source: '/gallery/inauguration-2.jpg',
  },
  {
    id: 3,
    source: '/gallery/inauguration-3.jpeg',
  },
];

const Gallery = () => {
  const [tab, setTab] = useState('All');
  const [data, setData] = useState(all);

  return (
    <div className={styles.gallery}>
      <Helmet>
        <title>Mpulse Ignite 2023 | Gallery</title>
      </Helmet>

      {/* <img src="/ignite-logo.png" alt="ignite-logo" /> */}

      <h1>Gallery</h1>

      <div className={styles.tabs}>
        <button
          className={`${tab === 'All' ? styles.activeTab : ''}`}
          onClick={() => {
            setTab('All');
            setData(all);
          }}>
          All
        </button>
        <button
          className={`${tab === 'Inauguration' ? styles.activeTab : ''}`}
          onClick={() => {
            setTab('Inauguration');
            setData(inauguration);
          }}>
          Inauguration
        </button>
        <button
          className={`${tab === 'Events' ? styles.activeTab : ''}`}
          onClick={() => {
            setTab('Events');
            setData(events);
          }}>
          Events
        </button>
      </div>

      <div className={styles.imageGallery}>
        {data.map((dt) => (
          <img src={dt.source} key={dt.id} />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
