import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setUser } = quizSlice.actions;

export default quizSlice.reducer;
