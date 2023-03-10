import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setError: (state, action) => {
      toast.error(action.payload, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    },
    setSuccess: (state, action) => {
      toast.success(action.payload, {
        position: 'top-center',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    },
  },
});

export const { setError, setSuccess } = toastSlice.actions;

export default toastSlice.reducer;
