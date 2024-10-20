// AuthWrapper.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthWrapper = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check for token

    const isAuthRoute = window.location.pathname === "/login" || window.location.pathname === "/signup";

   return isAuthenticated && isAuthRoute ? <Navigate to="/" replace /> : children;
};

export default AuthWrapper;
