import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../components/LandingPage";
import JobListingForm from "./components/jobslisting/JobListing";
import UserJobListingCard from "./components/jobslisting/JobListingsCard";
import SignupPage from "./components/signup/SignUp";
import LoginPage from "./components/login/Login";
import Layout from "../components/Layout";
import Profile from "./components/profile/Profile";
import JobsHomePage from "./components/jobsCard/JobsCard";
import AuthWrapper from "./components/authWrapper/AuthWrapper";
import EditJob from "./components/jobslisting/EditJob";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";



{/**const token = localStorage.getItem('token');
const decodedToken = jwtDecode(token);
const userId = decodedToken._id;
console.log(userId)**/}



const router = createBrowserRouter([

    { path: "/", element: <LandingPage /> },
    
    {path: "/", element: <Layout/>,
        children:[
    
    {path:"jobslisting", element: 
        (<AuthWrapper><JobListingForm/></AuthWrapper>)
    
},
    {path:"profile", element:
    (<AuthWrapper><Profile/></AuthWrapper>)
    
},
    {path:"jobs", element:(
        <AuthWrapper><JobsHomePage/></AuthWrapper>),
},

  {
    path:"jobs/:id/edit", element:(<AuthWrapper><EditJob/></AuthWrapper>)
  },

    {path:"userjobslisting", element:
    (<AuthWrapper>
    <UserJobListingCard/>
    </AuthWrapper>)
    }
   ]
    },

    
    {path:"/signup", element: (<AuthWrapper><SignupPage/></AuthWrapper>)},
    {path:"/login", element:(<AuthWrapper><LoginPage/></AuthWrapper>)},
    

    

    
]);

export default router;