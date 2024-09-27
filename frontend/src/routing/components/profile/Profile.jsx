import React, { useEffect, useState } from 'react'
import { User, Mail, Phone, MapPin, LogOut } from 'lucide-react'
import {  useNavigate } from "react-router-dom"
import axios from 'axios';

export default function Profile  () {
  // This would typically come from your authentication state or API
  /**const user = {
    name: 'John Doe',
    email: 'john.doe@exa.com',
    phone: '+91 9876543210',
    address: '123 Main St, Mumbai, Maharashtra 400001',
    profilePicture: '/placeholder.svg?height=100&width=100',
  }**/

    const [user, setUser]=useState();

    const navigate = useNavigate();
   useEffect(()=>{
    const userApi = async ()=>{
        try {
            const token = localStorage.getItem("token");
            if(!token) { throw new Error("No token found. Please login again.");}

            const response = await axios.get("https://rozgarseva.onrender.com/api/users/me",{
                headers:{
                    "x-auth-token": token,
                }
            })
            
            setUser(response.data)
        


        } catch (error) {
            console.log(error.message)
        }
    }
    userApi();
   },[])
    

  const handleLogout = () => {
    // Implement logout logic here
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-orange-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <div className="h-20 w-20 rounded-full overflow-hidden bg-orange-200 flex-shrink-0 mr-4">
              <img
                className="h-full w-full object-cover"
                src="#"
                alt="Profile picture"
              />
            </div>
            <div>
              <div className="uppercase tracking-wide text-sm text-orange-500 font-semibold">Profile</div>
              <h1 className="text-xl font-medium text-black">{user?.name}</h1>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center text-gray-600">
              <Mail className="h-5 w-5 mr-2 text-orange-500" />
              <span className="text-sm">{user?.email}</span>
            </div>
           {/**  <div className="flex items-center text-gray-600">
              <Phone className="h-5 w-5 mr-2 text-orange-500" />
              <span className="text-sm">{user?.phoneno}</span>
            </div>**/}
            <div className="flex items-center text-gray-600">
              <MapPin className="h-5 w-5 mr-2 text-orange-500" />
              <span className="text-sm">{user?.pincode}</span>
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={handleLogout}
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}