import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
};

const eventPopupSlice = createSlice({
  name: 'eventpopup',
  initialState,
  reducers: {
    setPopupData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setPopupData } = eventPopupSlice.actions;

export default eventPopupSlice.reducer;
