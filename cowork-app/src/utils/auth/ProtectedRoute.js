import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';

const ProtectedRoute = ({ children, role_id }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!user ) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
