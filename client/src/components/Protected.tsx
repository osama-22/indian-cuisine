import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { Spinner } from '@fluentui/react-components';

interface Props {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  // Show a loading state while the user data is being fetched
  if (loading) {
    return <Spinner/>;
  }

  // If no user is found, navigate to the login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Render the protected component if user exists
  return children;
};

export default ProtectedRoute;
