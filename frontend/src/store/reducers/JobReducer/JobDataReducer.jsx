import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  jobData: {
    projectName: '',
    projectOwnerName: '',
    jobDescription: '',
    phoneNo: '',
    address: '',
    pincode: '',
    category: '',
  },
  message: null,
  loading: false,
  error: null,
};

export const JobDataSlice = createSlice({
    name:"jobData",
    initialState,
    reducers:{
      updateJobData: (state, action) => {
      state.jobData = {
        ...state.jobData,
        [action.payload.name]: action.payload.value,
      };
    
          
      }
    }

});

export default JobDataSlice.reducer;
export const { updateJobData }= JobDataSlice.actions;