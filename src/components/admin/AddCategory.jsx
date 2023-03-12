import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setError, setSuccess } from '../../redux/toastSlice';
import styles from '../../styles/pages/Admin.module.css';
import registerStyle from '../../styles/pages/Register.module.css';

const options = ['aptitude', 'bugbountyquiz', 'bugbountycode'];

const AddCategory = () => {
  const dispatch = useDispatch();

  const [time, setTime] = useState('');
  const [category, setCategory] = useState('');

  const [loading, setLoading] = useState(false);

  const addCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_NODE_BACKEND}/apinode/category/${category}`,
        { time: time },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      dispatch(setSuccess('Category added'));
    } catch (error) {
      dispatch(setError('Error occured'));
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Add new quiz Category</h3>

      <form onSubmit={addCategory}>
        <div className={registerStyle.row1}>
          <div className={registerStyle.floatinglabelgroup}>
            <input
              type="text"
              id="name"
              className={registerStyle.formcontrol}
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="name" className={registerStyle.floatinglabel}>
              Category Name (small alphabates) <span>*</span>
            </label>
          </div>
        </div>
        <div className={registerStyle.row1} style={{ marginTop: 20 }}>
          <div className={registerStyle.floatinglabelgroup}>
            <input
              type="text"
              id="time"
              className={registerStyle.formcontrol}
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <label htmlFor="time" className={registerStyle.floatinglabel}>
              Time (in seconds)<span>*</span>
            </label>
          </div>
        </div>
        <button className={styles.submit} disabled={loading}>
          {loading ? 'Submiting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
