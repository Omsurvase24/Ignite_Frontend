import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import styles from '../styles/pages/Register.module.css';

const qrs = {
  30: '/qrs/30rs.jpeg',
  60: '/qrs/60rs.jpeg',
  90: '/qrs/90rs.jpeg',
  120: '/qrs/120rs.jpeg',
  150: '/qrs/150rs.jpeg',
  200: '/qrs/200rs.jpeg',
  300: '/qrs/300rs.jpeg',
  450: '/qrs/450rs.jpeg',
  600: '/qrs/600rs.jpeg',
};

const Register = () => {
  const years = ['1st', '2nd', '3rd', '4th'];
  const events = [
    'Bug Bounty',
    'Design-X',
    'Hackathon',
    'Mock Placement',
    'Escape Room',
  ];

  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    contact: '',
    college_name: '',
    college_department: '',
    current_year: '1st',
    event_name: 'Bug Bounty',
    payment_id: '',
    team_members: [],
    teammember1: '',
    teammember2: '',
    teammember3: '',
    is_team_event: false,
    payment_screenshot: '',
  });

  const [fees, setFees] = useState(0);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      data.event_name === 'Bug Bounty' ||
      data.event_name === 'Mock Placement'
    ) {
      setFees(30);
    } else if (data.event_name === 'Hackathon') {
      let fee = 150;
      if (data.teammember1.length > 0) {
        fee += 150;
      }
      if (data.teammember2.length > 0) {
        fee += 150;
      }
      if (data.teammember3.length > 0) {
        fee += 150;
      }
      setFees(fee);
    } else if (
      data.event_name === 'Design-X' ||
      data.event_name === 'Escape Room'
    ) {
      let fee = 30;
      if (data.teammember1.length > 0) {
        fee += 30;
      }
      if (data.teammember2.length > 0) {
        fee += 30;
      }
      if (data.teammember3.length > 0) {
        fee += 30;
      }
      setFees(fee);
    }
  }, [data]);

  const onYearChange = (e) => {
    setData({ ...data, current_year: e.target.value });
  };

  const onEventChange = (e) => {
    const _event = e.target.value;
    setData({
      ...data,
      event_name: _event,
      teammember1: '',
      teammember2: '',
      teammember3: '',
    });
  };

  const notifyError = (message) => {
    toast.error(message, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

  const notifySuccess = (message) => {
    toast.success(message, {
      position: 'top-center',
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(data.first_name.length);
    if (
      data.first_name.length < 1 ||
      data.last_name.length < 1 ||
      data.email.length < 1 ||
      data.contact.length < 1 ||
      data.college_name.length < 1 ||
      data.college_department.length < 1 ||
      data.payment_id.length < 1 ||
      data.payment_screenshot.length < 1
    ) {
      notifyError('Please fill all required fields');
      setLoading(false);
    } else if (
      data.event_name === 'Bug Bounty' ||
      data.event_name === 'Mock Placement'
    ) {
      const formData = new FormData();

      const team = `["${data.first_name} ${data.last_name}"]`;

      formData.append('first_name', data.first_name);
      formData.append('last_name', data.last_name);
      formData.append('email', data.email);
      formData.append('contact', data.contact);
      formData.append('college_name', data.college_name);
      formData.append('college_department', data.college_department);
      formData.append('current_year', data.current_year);
      formData.append('event_name', data.event_name);
      formData.append('payment_id', data.payment_id);
      formData.append('team_members', team);
      formData.append('is_team_event', false);
      formData.append('payment_screenshot', data.payment_screenshot);

      try {
        console.log(
          `${process.env.REACT_APP_FLASK_BACKEND}/api/auth/register`
        );
        const response = await axios.post(
          `${process.env.REACT_APP_FLASK_BACKEND}/api/auth/register`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        notifySuccess('Your registration has been successfully completed.');
        setData({
          first_name: '',
          last_name: '',
          email: '',
          contact: '',
          college_name: '',
          college_department: '',
          current_year: '1st',
          event_name: 'Bug Bounty',
          payment_id: '',
          team_members: [],
          teammember1: '',
          teammember2: '',
          teammember3: '',
          is_team_event: false,
          payment_screenshot: '',
        });
      } catch (error) {
        notifyError(
          'Error occured while submiting the form. Please try again.'
        );
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else if (
      data.event_name !== 'Bug Bounty' ||
      data.event_name !== 'Mock Placement'
    ) {
      const formData = new FormData();

      let team = [];
      team.push(`"${data.first_name} ${data.last_name}"`);
      if (data.teammember1.length > 0) {
        team.push(`"${data.teammember1}"`);
      }
      if (data.teammember2.length > 0) {
        team.push(`"${data.teammember2}"`);
      }
      if (data.teammember3.length > 0) {
        team.push(`"${data.teammember3}"`);
      }

      formData.append('first_name', data.first_name);
      formData.append('last_name', data.last_name);
      formData.append('email', data.email);
      formData.append('contact', data.contact);
      formData.append('college_name', data.college_name);
      formData.append('college_department', data.college_department);
      formData.append('current_year', data.current_year);
      formData.append('event_name', data.event_name);
      formData.append('payment_id', data.payment_id);
      formData.append('team_members', team);
      formData.append('is_team_event', true);
      formData.append('payment_screenshot', data.payment_screenshot);

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_FLASK_BACKEND}/api/auth/register`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        notifySuccess('Your registration has been successfully completed.');

        setData({
          first_name: '',
          last_name: '',
          email: '',
          contact: '',
          college_name: '',
          college_department: '',
          current_year: '1st',
          event_name: 'Bug Bounty',
          payment_id: '',
          team_members: [],
          teammember1: '',
          teammember2: '',
          teammember3: '',
          is_team_event: false,
          payment_screenshot: '',
        });
      } catch (error) {
        notifyError(
          'Error occured while submiting the form. Please try again.'
        );
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={styles.register}>
      <Helmet>
        <title>Mpulse Ignite 2023 | Register</title>
      </Helmet>

      {/* <img src="/ignite-logo.png" alt="ignite-logo" /> */}
      <h1>Event Registration</h1>
      <form onSubmit={onSubmitForm}>
        <div className={styles.row}>
          <div className={styles.floatinglabelgroup}>
            <input
              type="text"
              id="firstname"
              className={styles.formcontrol}
              required
              value={data.first_name}
              onChange={(e) =>
                setData({ ...data, first_name: e.target.value })
              }
            />
            <label htmlFor="firstname" className={styles.floatinglabel}>
              First name <span>*</span>
            </label>
          </div>
          <div className={styles.floatinglabelgroup}>
            <input
              type="text"
              id="lastname"
              className={styles.formcontrol}
              required
              value={data.last_name}
              onChange={(e) => setData({ ...data, last_name: e.target.value })}
            />
            <label htmlFor="lastname" className={styles.floatinglabel}>
              Last name <span>*</span>
            </label>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.floatinglabelgroup}>
            <input
              type="text"
              id="email"
              className={styles.formcontrol}
              required
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <label className={styles.floatinglabel} htmlFor="email">
              Email <span>*</span>
            </label>
          </div>
          <div className={styles.floatinglabelgroup}>
            <input
              type="text"
              id="contact"
              className={styles.formcontrol}
              required
              value={data.contact}
              onChange={(e) => setData({ ...data, contact: e.target.value })}
            />
            <label className={styles.floatinglabel} htmlFor="contact">
              Contact number <span>*</span>
            </label>
          </div>
        </div>
        <div className={styles.row1}>
          <div className={styles.floatinglabelgroup}>
            <input
              type="text"
              id="collegename"
              className={styles.formcontrol}
              required
              value={data.college_name}
              onChange={(e) =>
                setData({ ...data, college_name: e.target.value })
              }
            />
            <label className={styles.floatinglabel} htmlFor="collegename">
              College name <span>*</span>
            </label>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.floatinglabelgroup}>
            <input
              type="text"
              id="department"
              className={styles.formcontrol}
              required
              value={data.college_department}
              onChange={(e) =>
                setData({ ...data, college_department: e.target.value })
              }
            />
            <label className={styles.floatinglabel} htmlFor="department">
              Department <span>*</span>
            </label>
          </div>
          <div className={styles.floatinglabelgroup}>
            <label className={styles.floatinglabelselect} htmlFor="year">
              Year <span>*</span>
            </label>
            <select onChange={onYearChange}>
              {years.map((year) => (
                <option key={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.row1}>
          <div className={styles.floatinglabelgroup}>
            <label className={styles.floatinglabelselect} htmlFor="eventname">
              Select Event Name <span>*</span>
            </label>
            <select onChange={onEventChange}>
              {events.map((event) => (
                <option key={event}>{event}</option>
              ))}
            </select>
          </div>
        </div>
        {(data.event_name === 'Hackathon' ||
          data.event_name === 'Escape Room' ||
          data.event_name === 'Design-X') && (
          <>
            <div className={styles.row1}>
              <div className={styles.floatinglabelgroup}>
                <input
                  type="text"
                  id="teammember1"
                  className={styles.formcontrol}
                  onChange={(e) =>
                    setData({ ...data, teammember1: e.target.value })
                  }
                />
                <label className={styles.floatinglabel} htmlFor="teammember1">
                  Team member
                </label>
              </div>
            </div>
            <div className={styles.row1}>
              <div className={styles.floatinglabelgroup}>
                <input
                  type="text"
                  id="teammember2"
                  className={styles.formcontrol}
                  onChange={(e) =>
                    setData({ ...data, teammember2: e.target.value })
                  }
                />
                <label className={styles.floatinglabel} htmlFor="teammember2">
                  Team member
                </label>
              </div>
            </div>
            {data.event_name !== 'Design-X' && (
              <div className={styles.row1}>
                <div className={styles.floatinglabelgroup}>
                  <input
                    type="text"
                    id="teammember3"
                    className={styles.formcontrol}
                    onChange={(e) =>
                      setData({ ...data, teammember3: e.target.value })
                    }
                  />
                  <label
                    className={styles.floatinglabel}
                    htmlFor="teammember3">
                    Team member
                  </label>
                </div>
              </div>
            )}
          </>
        )}
        <div className={styles.row1}>
          <div className={styles.floatinglabelgroup}>
            <input
              type="text"
              id="paymentid"
              className={styles.formcontrol}
              required
              value={data.payment_id}
              onChange={(e) =>
                setData({ ...data, payment_id: e.target.value })
              }
            />
            <label className={styles.floatinglabel} htmlFor="paymentid">
              Payment ID <span>*</span>
            </label>
          </div>
        </div>
        <div className={styles.floatinglabelgroup}>
          <input
            type="file"
            id="paymentscreenshot"
            onChange={(e) =>
              setData({ ...data, payment_screenshot: e.target.files[0] })
            }
          />
          <label className={styles.floatinglabel} htmlFor="paymentscreenshot">
            Payment screenshot <span>*</span>
          </label>
        </div>
        <p>
          Please pay Rs. {fees} for {data.event_name} on below QR
        </p>
        <div className={styles.qr}>
          <img src={qrs[fees]} alt={`${fees}-qr`} />
        </div>
        <button>{loading ? 'Submitting...' : 'Submit'}</button>
      </form>
    </div>
  );
};

export default Register;
