// /src/store/reducers/jobReducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userJobs: [],
  loading: false,
  error: null,
};

const userJobSlice = createSlice({
  name: 'userJobs',
  initialState,
  reducers: {
    setUserJobs: (state, action) => {
      state.userJobs = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUserJobs, setLoading, setError } = userJobSlice.actions;
export default userJobSlice.reducer;
