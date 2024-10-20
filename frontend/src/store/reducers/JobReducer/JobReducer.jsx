import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jobs:[]
};

export const JobSlice = createSlice({
    name:"jobs",
    initialState,
    reducers:{
        //actions
        getJobs:(state, action)=>{
            state.jobs=action.payload;
            console.log(state)
        }
        
    }
});

export default JobSlice.reducer;
export const { getJobs }= JobSlice.actions;