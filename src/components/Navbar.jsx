import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/components/Layout.module.css';

const Navbar = () => {
  return (
    <nav>
      <img src="/ignite-logo.png" alt="ignite-logo" />

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About us</Link>
        </li>
        <li>
          <Link to="/events">Events</Link>
        </li>
        <li>
          <Link to="/sponsors">Sponsors</Link>
        </li>
        <li>
          <Link to="/sponsors">Gallery</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
