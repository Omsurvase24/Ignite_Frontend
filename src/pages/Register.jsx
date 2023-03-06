import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styles from '../styles/pages/Register.module.css';
import axios from 'axios';

const Register = () => {
  const years = ['1st', '2nd', '3rd', '4th'];
  const events = ['Bugshodh', 'Design-X', 'Hackathon', 'Mock-Placement'];

  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    contact: '',
    college_name: '',
    college_department: '',
    current_year: '1st',
    event_name: 'Bugshodh',
    payment_id: '',
    team_members: [],
    teammember1: '',
    teammember2: '',
    teammember3: '',
    is_team_event: false,
    payment_screenshot: '',
  });

  const [loading, setLoading] = useState(false);

  const onYearChange = (e) => {
    setData({ ...data, current_year: e.target.value });
  };

  const onEventChange = (e) => {
    const _event = e.target.value;
    setData({ ...data, event_name: _event });
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
      data.event_name === 'Bugshodh' ||
      data.event_name === 'Mock-Placement'
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
        const response = await axios.post(
          `${REACT_APP_FLASK_BACKEND}/api/auth/register`,
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
          event_name: 'Bugshodh',
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
      data.event_name !== 'Bugshodh' ||
      data.event_name !== 'Mock-Placement'
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
          `${REACT_APP_FLASK_BACKEND}/api/auth/register`,
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
          event_name: 'Bugshodh',
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
      <img src="/ignite-logo.png" alt="ignite-logo" />
      <h1>Event Registration</h1>
      <form onSubmit={onSubmitForm}>
        <div className={styles.input}>
          <input
            type="text"
            id="firstname"
            value={data.first_name}
            onChange={(e) => setData({ ...data, first_name: e.target.value })}
          />
          <label htmlFor="firstname">
            First name <span>*</span>
          </label>
        </div>
        <div className={styles.input}>
          <input
            type="text"
            id="lastname"
            value={data.last_name}
            onChange={(e) => setData({ ...data, last_name: e.target.value })}
          />
          <label htmlFor="lastname">
            Last name <span>*</span>
          </label>
        </div>
        <div className={styles.input}>
          <input
            type="email"
            id="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <label htmlFor="email">
            Email <span>*</span>
          </label>
        </div>
        <div className={styles.input}>
          <input
            type="text"
            id="contact"
            value={data.contact}
            onChange={(e) => setData({ ...data, contact: e.target.value })}
          />
          <label htmlFor="contact">
            Contact number <span>*</span>
          </label>
        </div>
        <div className={styles.input}>
          <input
            type="text"
            id="collegename"
            value={data.college_name}
            onChange={(e) => setData({ ...data, college_name: e.target.value })}
          />
          <label htmlFor="collegename">
            College name <span>*</span>
          </label>
        </div>
        <div className={styles.input}>
          <input
            type="text"
            id="department"
            value={data.college_department}
            onChange={(e) =>
              setData({ ...data, college_department: e.target.value })
            }
          />
          <label htmlFor="department">
            Department <span>*</span>
          </label>
        </div>
        <div className={styles.input}>
          <select onChange={onYearChange}>
            {years.map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
          <label htmlFor="year">
            Year <span>*</span>
          </label>
        </div>
        <div className={styles.input}>
          <select onChange={onEventChange}>
            {events.map((event) => (
              <option key={event}>{event}</option>
            ))}
            <label htmlFor="eventname">
              Event <span>*</span>
            </label>
          </select>
          <label htmlFor="eventname">
            Select Event Name <span>*</span>
          </label>
        </div>
        {(data.event_name === 'Hackathon' ||
          data.event_name === 'Design-X') && (
          <>
            <div className={styles.input}>
              <input
                type="text"
                id="teammember1"
                onChange={(e) =>
                  setData({ ...data, teammember1: e.target.value })
                }
              />
              <label htmlFor="teammember1">Team member</label>
            </div>
            <div className={styles.input}>
              <input
                type="text"
                id="teammember2"
                onChange={(e) =>
                  setData({ ...data, teammember2: e.target.value })
                }
              />
              <label htmlFor="teammember2">Team member</label>
            </div>
            <div className={styles.input}>
              <input
                type="text"
                id="teammember3"
                onChange={(e) =>
                  setData({ ...data, teammember3: e.target.value })
                }
              />
              <label htmlFor="teammember3">Team member</label>
            </div>
          </>
        )}
        <div className={styles.input}>
          <input
            type="text"
            id="paymentid"
            value={data.payment_id}
            onChange={(e) => setData({ ...data, payment_id: e.target.value })}
          />
          <label htmlFor="paymentid">
            Payment ID <span>*</span>
          </label>
        </div>
        <div className={styles.input}>
          <input
            type="file"
            id="paymentscreenshot"
            onChange={(e) =>
              setData({ ...data, payment_screenshot: e.target.files[0] })
            }
          />
          <label htmlFor="paymentscreenshot">
            Payment screenshot <span>*</span>
          </label>
        </div>
        <button>{loading ? 'Submitting...' : 'Submit'}</button>
      </form>
    </div>
  );
};

export default Register;
