import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      // If logged in, add class to body for dashboard styles
      document.body.classList.add('dashboard-active');
    } else {
      // If not logged in, remove class for auth page styles
      document.body.classList.remove('dashboard-active');
    }

    // Cleanup function to remove the class when the component unmounts
    return () => {
      document.body.classList.remove('dashboard-active');
    };
  }, [token]); // Rerun this effect if the token changes

  // If token exists, show the page. If not, redirect to login.
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;