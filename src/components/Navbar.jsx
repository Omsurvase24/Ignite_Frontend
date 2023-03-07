import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { MdMenu } from 'react-icons/md';
import styles from '../styles/components/Layout.module.css';

const Navbar = () => {
  const location = useLocation();

  const [open, setOpen] = useState(false);

  return (
    <nav
      className={`${open ? styles.show : ''}`}
      style={{ background: location.pathname !== '/' && '#2b2141' }}
    >
      <Link to="/">
        <img src="/ignite-logo.png" alt="ignite-logo" />
      </Link>

      {open ? (
        <AiOutlineClose
          className={styles.close}
          onClick={() => setOpen(!open)}
        />
      ) : (
        <MdMenu className={styles.close} onClick={() => setOpen(!open)} />
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
        {/* <li onClick={() => setOpen(false)}>
          <Link to="/sponsors">Sponsors</Link>
        </li> */}
        <li onClick={() => setOpen(false)}>
          <Link to="/gallery">Gallery</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
