import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { IoList } from 'react-icons/io5';
import styles from '../styles/components/Layout.module.css';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className={`${open ? styles.show : ''}`}>
      <img src="/ignite-logo.png" alt="ignite-logo" />

      {open ? (
        <AiOutlineClose
          className={styles.close}
          onClick={() => setOpen(!open)}
        />
      ) : (
        <IoList className={styles.close} onClick={() => setOpen(!open)} />
      )}

      <ul>
        <li onClick={() => setOpen(false)}>
          <Link to="/">Home</Link>
        </li>
        <li onClick={() => setOpen(false)}>
          <Link to="/about">About us</Link>
        </li>
        <li onClick={() => setOpen(false)}>
          <Link to="/events">Events</Link>
        </li>
        <li onClick={() => setOpen(false)}>
          <Link to="/sponsors">Sponsors</Link>
        </li>
        <li onClick={() => setOpen(false)}>
          <Link to="/sponsors">Gallery</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
