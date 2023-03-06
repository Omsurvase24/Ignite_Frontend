import React, { useState } from 'react';
import styles from '../../styles/pages/Events.module.css';
import { AiOutlineClose } from 'react-icons/ai';

const EventPopup = ({ setOpen }) => {
  const [tab, setTabs] = useState('intro');

  return (
    <div className={styles.background}>
      <div className={styles.popup}>
        <AiOutlineClose
          className={styles.close}
          onClick={() => setOpen(false)}
        />
        <h2>Design X</h2>
        <div className={styles.content}>
          <div className={styles.tabs}>
            <button onClick={() => setTabs('intro')}>Intro</button>
            <button onClick={() => setTabs('rules')}>Rules</button>
            <button onClick={() => setTabs('rounds')}>Rounds</button>
          </div>
          {tab === 'intro' ? (
            <div className={styles.intro}>
              <p>
                This event is to provide participants a platform to check their
                both Non-technical and technical skills which will be team
                event(Group of two). Event in the beginning will start with the
                Non-Technical round to boost confidence among participants but
                also will be tricky to get through! Next round onwards technical
                knowledge will be tested. This event will help participants to
                test their programming skills and how well they cooperate with
                each another.
              </p>
              <p>100 INR(Rs.50 each)</p>
              <button>Register here</button>
            </div>
          ) : tab === 'rules' ? (
            <div className={styles.rules}>
              <ul>
                <li>
                  Internet access will be provided only for the first round(i.e
                  Googler).
                </li>
                <li>Use of pen/pencil and paper is allowed.</li>
                <li>
                  No prompting of answers or any kind of discussion is allowed,
                  if found may get the participant disqualify after certain
                  warnings.
                </li>
                <li>
                  Use of programming languages C and C++ will be allowed for
                  round 2(i.e Code relay).
                </li>
                <li>
                  Output shall not be generated directly using "printf" and
                  "cout" statements.
                </li>
              </ul>
            </div>
          ) : (
            <div className={styles.rounds}>
              <p>Round 1: Googler</p>
              <ul>
                <li>15questions will be provided to the participants.</li>
                <li>A time limit of 15 min will be given.</li>
                <li>Each question will carry 1 mark.</li>
                <li>Participants can google answer to every question.</li>
              </ul>

              <p>Round 2: Code Relay</p>
              <ul>
                <li>
                  One participant solves a program for 20min while other waits
                  in waiting room and after 20min they switch their places.
                </li>
                <li>
                  Programs(approx. 5-7) will be provided to the first
                  participant which he is supposed to choose randomly from
                  chits.
                </li>
                <li>
                  After 15min the second participant will be called in to solve
                  the remaining program.
                </li>
              </ul>

              <p>Round 3: Blind Coding</p>
              <ul>
                <li>
                  The participants will be given chits of programs from they can
                  select any 1.
                </li>
                <li>The programs need to be solved in either C or C++.</li>
                <li>
                  After completion of programs by the participants, the programs
                  will be evaluated on the basis of correct output and least
                  numbers of errors using which the winners will be decided.
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventPopup;
