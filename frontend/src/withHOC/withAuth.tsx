import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

// This is the higher-order component
function withAuth<T extends Object>(WrappedComponent: React.ComponentType<T>) {
  return (props: T) => {

    const navigate = useNavigate();
    const isAuthenticated = sessionStorage.getItem('token');
   
    useEffect(()=>{
        if(!isAuthenticated){
            console.log('isAuthenticated', isAuthenticated)
            navigate('/')
        }
    },[isAuthenticated])
  
   
    return <WrappedComponent {...props} />;
  };
}

export default withAuth;