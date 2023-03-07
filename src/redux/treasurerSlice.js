import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
};

const treasurerPopupSlice = createSlice({
  name: 'treasurer',
  initialState,
  reducers: {
    setTreasurer: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setTreasurer } = treasurerPopupSlice.actions;

export default treasurerPopupSlice.reducer;
