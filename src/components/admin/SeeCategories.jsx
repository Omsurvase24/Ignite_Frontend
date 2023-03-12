import React, { useEffect, useState } from 'react';
import axios from 'axios';
import convert from 'convert-seconds';
import styles from '../../styles/pages/Admin.module.css';
import { useDispatch } from 'react-redux';
import { setError, setSuccess } from '../../redux/toastSlice';

const SeeCategories = () => {
  const dispatch = useDispatch();

  const [entries, setEntries] = useState([]);

  const [reload, setReload] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      setEntries([]);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_NODE_BACKEND}/apinode/category/get-all-categories`
        );

        setEntries(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
  }, [reload]);

  const handleLive = async (name) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_NODE_BACKEND}/apinode/category/set-live/${name}`
      );
      dispatch(setSuccess(`${name} quiz status updated`));
    } catch (error) {
      dispatch(setError('Error occured'));
      console.log(error);
    } finally {
      setReload(!reload);
    }
  };

  return (
    <div>
      <h3>All Categories</h3>

      <div className={styles.options}>
        <button onClick={() => setReload(!reload)}>Load</button>
      </div>

      <table border={1}>
        <tr>
          <th>Name</th>
          <th>Time</th>
          <th>Live</th>
          <th>Live</th>
        </tr>
        {entries?.map((entry) => (
          <tr key={entry._id}>
            <td>{entry.name}</td>
            <td>
              {convert(entry.time).minutes.toString().length === 1 && 0}
              {convert(entry.time).minutes}:
              {convert(entry.time).seconds.toString().length === 1 && 0}
              {convert(entry.time).seconds} mins
            </td>
            <td>{entry.live ? 'Live' : 'Not Live'}</td>
            <td>
              <button
                style={{ background: entry.live ? 'green' : 'red', width: 100 }}
                onClick={() => handleLive(entry.name)}
              >
                {entry.live ? 'Live' : 'Make Live'}
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default SeeCategories;
