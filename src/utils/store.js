import { configureStore } from '@reduxjs/toolkit';
import eventPopupReducer from '../redux/eventPopupSlice';
import treasurerReducer from '../redux/treasurerSlice';

export const store = configureStore({
  reducer: {
    eventPopup: eventPopupReducer,
    treasurer: treasurerReducer,
  },
});
