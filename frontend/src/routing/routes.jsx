import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../components/LandingPage";
import JobListingForm from "./components/jobslisting/JobListing";
import UserJobListingCard from "./components/jobslisting/JobListingsCard";
import SignupPage from "./components/signup/SignUp";
import LoginPage from "./components/login/Login";

const router = createBrowserRouter([
    {path: "/", element: <LandingPage/>},

    {path:"/jobslisting", element: <JobListingForm/>},
    {path:"/signup", element: <SignupPage/>},
    {path:"/login", element:<LoginPage/>}
]);

export default router;