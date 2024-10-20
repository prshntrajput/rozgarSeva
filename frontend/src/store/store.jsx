import { configureStore } from "@reduxjs/toolkit";
import JobReducer from "../store/reducers/JobReducer/JobReducer"
import JobDataReducer from "../store/reducers/JobReducer/JobDataReducer"
import UserJobReducer from "../store/reducers/UserJobReducer/UserJobReducer"

export const store = configureStore({

    reducer:{
        JobReducer:JobReducer,
        JobDataReducer:JobDataReducer,
        UserJobReducer:UserJobReducer
    },
});

