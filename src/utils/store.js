import { configureStore } from '@reduxjs/toolkit';
import eventPopupReducer from '../redux/eventPopupSlice';

export const store = configureStore({
  reducer: {
    eventPopup: eventPopupReducer,
  },
});
