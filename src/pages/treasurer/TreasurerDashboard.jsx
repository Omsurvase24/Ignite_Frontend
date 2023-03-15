import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { FaCloudDownloadAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TreasurerModel from '../../components/treasurer/TreasurerModal';
import styles from '../../styles/pages/Treasurer.module.css';

const options = ['reviewed', 'unreviewed'];

const TreasurerDashboard = () => {
  const navigate = useNavigate();

  const { data } = useSelector((state) => state.treasurer);

  const [state, setState] = useState('unreviewed');

  const [treasurerData, sertTreasurerData] = useState([]);

  const [reloading, setReloading] = useState(false);
  const [accept, setAccept] = useState(false);
  const [decline, setDecline] = useState(false);

  const [image, setImage] = useState('');

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
          `${process.env.REACT_APP_FLASK_BACKEND}/api/auth/registrations/get/reviewed`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${data.jwt_token}`,
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
    setReloading(false);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_FLASK_BACKEND}/api/auth/registrations/get/${state}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data.jwt_token}`,
          },
        }
      );

      sertTreasurerData(response.data.unreviewed_registrations);
    } catch (error) {
      console.log(error);
    } finally {
      setReloading(false);
    }
  };

  const handleAccept = async (id) => {
    setAccept(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_FLASK_BACKEND}/api/auth/registrations/review/${id}`,
        { data },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data.jwt_token}`,
          },
        }
      );

      notifySuccess(`Application accepted successfully.`);
    } catch (error) {
      notifyError(
        'Error occured while accepting application. Please try again.'
      );
      console.log(error);
    } finally {
      setAccept(false);
    }
  };

  const handleDecline = async (id) => {
    setDecline(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_FLASK_BACKEND}/api/auth/registrations/decline/${id}`,
        { data },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data.jwt_token}`,
          },
        }
      );

      notifySuccess(`Application declined.`);
    } catch (error) {
      notifyError(
        'Error occured while decline application. Please try again.'
      );
      console.log(error);
    } finally {
      setDecline(false);
    }
  };

  const onEventChange = (e) => {
    setState(e.target.value);
  };

  return (
    <div className={styles.treasurer}>
      <button className={styles.reload} onClick={getData}>
        <FaCloudDownloadAlt style={{ marginRight: 10 }} />{' '}
        {reloading ? 'Reloading...' : 'Reload'}
      </button>
      <h1>Trasurer Dashboard</h1>

      <select onChange={onEventChange}>
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>

      <table border={1}>
        <tr>
          <th>ID</th>
          <th>Full name</th>
          <th>Email</th>
          <th>Contact Number</th>
          <th>Event Name</th>
          <th>Payment ID</th>
          <th>Screenshot</th>
          {state !== 'reviewed' && <th>Accept</th>}
          {state !== 'reviewed' && <th>Decline</th>}
        </tr>
        {treasurerData.map((treasurer) => (
          <tr key={treasurer._id}>
            <td>{treasurer.qr_id}</td>
            <td>{`${treasurer.first_name} ${treasurer.last_name}`}</td>
            <td>{treasurer.email}</td>
            <td>{treasurer.contact}</td>
            <td>{treasurer.event_name}</td>
            <td>{treasurer.payment_id}</td>
            <td>
              <img
                src={`${process.env.REACT_APP_FLASK_BACKEND}/api/static${treasurer.payment_screenshot_path}`}
                alt="screenshot"
                onClick={() =>
                  setImage(
                    `${process.env.REACT_APP_FLASK_BACKEND}/api/static${treasurer.payment_screenshot_path}`
                  )
                }
              />
            </td>
            {state !== 'reviewed' && (
              <td>
                <button
                  className={styles.accept}
                  onClick={() => handleAccept(treasurer._id)}
                  disabled={accept || state === 'reviewed'}>
                  {accept ? 'Accepting...' : 'Accept'}
                </button>
              </td>
            )}
            {state !== 'reviewed' && (
              <td>
                <button
                  onClick={() => handleDecline(treasurer._id)}
                  disabled={decline || state === 'reviewed'}>
                  {decline ? 'Declining...' : 'Decline'}
                </button>
              </td>
            )}
          </tr>
        ))}

        {image && <TreasurerModel image={image} setImage={setImage} />}
      </table>
    </div>
  );
};

export default TreasurerDashboard;
