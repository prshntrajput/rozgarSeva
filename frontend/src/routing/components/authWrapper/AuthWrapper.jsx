// AuthWrapper.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthWrapper = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check for token

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default AuthWrapper;
