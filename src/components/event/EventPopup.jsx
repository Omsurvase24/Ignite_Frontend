import React, { useState } from 'react';
import styles from '../../styles/pages/Events.module.css';
import { AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EventPopup = ({ setOpen }) => {
  const { data } = useSelector((state) => state.eventPopup);

  console.log(data.data[0].intro);

  const [tab, setTabs] = useState('intro');

  const navigate = useNavigate();

  return (
    <div className={styles.background}>
      <div className={styles.popup}>
        <AiOutlineClose
          className={styles.close}
          onClick={() => setOpen(false)}
        />
        <h2>{data.title}</h2>
        <div className={styles.content}>
          <div className={styles.tabs}>
            <button
              onClick={() => setTabs('intro')}
              className={`${tab === 'intro' ? styles.active : ''}`}
            >
              Intro
            </button>
            <button
              onClick={() => setTabs('rules')}
              className={`${tab === 'rules' ? styles.active : ''}`}
            >
              Rules
            </button>
            <button
              onClick={() => setTabs('rounds')}
              className={`${tab === 'rounds' ? styles.active : ''}`}
            >
              Rounds
            </button>
          </div>
          {tab === 'intro' ? (
            <div className={styles.intro}>
              {data.data[0].intro.map((para, index) => (
                <p key={index}>{para}</p>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  navigate('/register');
                }}
              >
                Click here to register
              </button>
              <div className={styles.gap}></div>
            </div>
          ) : tab === 'rules' ? (
            <div className={styles.rules}>
              <ul>
                {data.data[0].rules.map((rule) => (
                  <li>{rule}</li>
                ))}
              </ul>
              <div className={styles.gap}></div>
            </div>
          ) : (
            <div className={styles.rounds}>
              {data.data[0].rounds.map((round) => (
                <>
                  <p>
                    Round {round.roundNo}: {round.roundName}
                  </p>
                  <ul>
                    {round.roundDesc.map((desc) => (
                      <li>{desc}</li>
                    ))}
                  </ul>
                </>
              ))}
              <div className={styles.gap}></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventPopup;
