import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import authService from '../../Services/authService';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await authService.checkTokenValidity();
      if (!isValid) {
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if (!accessToken || !refreshToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;