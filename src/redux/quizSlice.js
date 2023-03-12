import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  quiz: null,
  answers: [],
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    setQuiz: (state, action) => {
      state.quiz = action.payload;
    },
    setAnswers: (state, action) => {
      state.answers = action.payload;
    },
    setOption: (state, action) => {
      state.answers[action.payload.index] = action.payload.option;
      let ans = JSON.parse(localStorage.getItem('answers'));
      ans[action.payload.index] = action.payload.option;
      localStorage.setItem('answers', JSON.stringify(ans));
    },
  },
});

export const { setUser, setQuiz, setAnswers, setOption } = quizSlice.actions;

export default quizSlice.reducer;
