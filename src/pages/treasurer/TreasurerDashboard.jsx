import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/pages/Treasurer.module.css';
import { toast } from 'react-toastify';

const TreasurerDashboard = () => {
  const navigate = useNavigate();

  const { data } = useSelector((state) => state.treasurer);

  const [treasurerData, sertTreasurerData] = useState([]);

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
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

  useEffect(() => {
    if (!data) {
      navigate('/treasurer');
      return;
    }

    const getData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_FLASK_BACKEND}/api/auth/registrations/get/unreviewed`,
          {
            headers: {
              'Content-Type': 'application/json',
              jwt_token: data.jwt_token,
            },
          }
        );

        sertTreasurerData(response.data.unreviewed_registrations);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [data]);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_FLASK_BACKEND}/api/auth/registrations/get/unreviewed`,
        {
          headers: {
            'Content-Type': 'application/json',
            jwt_token: data.jwt_token,
          },
        }
      );

      sertTreasurerData(response.data.unreviewed_registrations);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccept = async (id) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_FLASK_BACKEND}/api/auth/registrations/review/${id}`,
        { data },
        {
          headers: {
            'Content-Type': 'application/json',
            jwt_token: data.jwt_token,
          },
        }
      );

      notifySuccess(`Application accepted successfully.`);
    } catch (error) {
      notifyError(
        'Error occured while accepting application. Please try again.'
      );
      console.log(error);
    }
  };

  const handleDecline = async (id) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_FLASK_BACKEND}/api/auth/registrations/decline/${id}`,
        { data },
        {
          headers: {
            'Content-Type': 'application/json',
            jwt_token: data.jwt_token,
          },
        }
      );

      notifySuccess(`Application declined.`);
    } catch (error) {
      notifyError('Error occured while decline application. Please try again.');
      console.log(error);
    }
  };

  return (
    <div className={styles.treasurer}>
      <button className={styles.reload} onClick={getData}>
        Reload
      </button>
      <h1>Trasurer Dashboard</h1>
      <table border={1}>
        <tr>
          <th>ID</th>
          <th>Full name</th>
          <th>Email</th>
          <th>Contact Number</th>
          <th>Event Name</th>
          <th>Payment ID</th>
          <th>Screenshot</th>
          <th>Accept</th>
          <th>Decline</th>
        </tr>
        {treasurerData.map((treasurer) => (
          <tr key={treasurer._id}>
            <td>{treasurer.qr_id}</td>
            <td>{`${treasurer.first_name} ${treasurer.last_name}`}</td>
            <td>{treasurer.email}</td>
            <td>{treasurer.contact}</td>
            <td>{treasurer.event_name}</td>
            <td>{treasurer.payment_id}</td>
            <td>{treasurer.payment_screenshot_path}</td>
            <td>
              <button
                className={styles.accept}
                onClick={() => handleAccept(treasurer._id)}
              >
                Accpet
              </button>
            </td>
            <td>
              <button onClick={() => handleDecline(treasurer._id)}>
                Decline
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default TreasurerDashboard;
