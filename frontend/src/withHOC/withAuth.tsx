import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { RootState } from '../utils/store';

// This is the higher-order component
function withAuth<T extends Object>(WrappedComponent: React.ComponentType<T>) {
  return (props: T) => {

    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state: RootState) => state.login)
    useEffect(() => {
      if (!isAuthenticated) {
       console.log('isAuthenticated', isAuthenticated)
        navigate('/')
      }
    }, [isAuthenticated, navigate])


    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };
}

export default withAuth;