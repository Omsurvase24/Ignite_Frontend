import React from 'react';
import styles from '../../styles/pages/Events.module.css';
import modelStyle from '../../styles/pages/Treasurer.module.css';
import { AiOutlineClose } from 'react-icons/ai';

const TreasurerModal = ({ image, setImage }) => {
  return (
    <div className={`${styles.background} ${modelStyle.treasurerModel}`}>
      <div className={styles.popup}>
        <AiOutlineClose className={styles.close} onClick={() => setImage('')} />
        <div className={styles.content}>
          <img src={image} alt="image" />
        </div>
      </div>
    </div>
  );
};

export default TreasurerModal;
