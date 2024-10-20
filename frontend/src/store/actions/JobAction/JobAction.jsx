import axios from "axios";
import { getJobs } from "../../../store/reducers/JobReducer/JobReducer";

export const asyncgetJobs =()=> async (dispatch,getState)=>{
    try {
        const response = await axios.get("http://localhost:8080/api/jobs");
        dispatch(getJobs(response.data))
    } catch (error) {
        console.log(error)
    }
}
