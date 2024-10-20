import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for posting a job
export const postJob = createAsyncThunk('jobs/postJob', async ({ jobData, token }, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:8080/api/jobs', jobData, {
      headers: {
        'x-auth-token': token,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : 'Something went wrong!');
  }
});
