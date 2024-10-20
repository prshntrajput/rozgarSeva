// /src/store/actions/jobActions.js
import axios from 'axios';
import { setUserJobs, setLoading, setError } from "../../../store/reducers/UserJobReducer/UserJobReducer";

export const fetchUserJobs = (userId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));  // Dispatch loading action
    const response = await axios.get(`http://localhost:8080/api/jobs/${userId}`);
    dispatch(setUserJobs(response.data));  // Dispatch action to set jobs in Redux
    dispatch(setLoading(false));  // Stop loading
  } catch (error) {
    dispatch(setError(error.message));  // Dispatch error action
    dispatch(setLoading(false));  // Stop loading
    console.error(error.message);
  }
};
