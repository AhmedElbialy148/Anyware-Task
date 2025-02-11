import React, { JSX, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { RootState } from '../store/store'; // Adjust the import path as needed
import { login, logout } from '../store/slices/authSlice'; // Adjust the import path as needed

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // Use null to indicate loading state
  // const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        dispatch(logout());
        setIsAuthenticated(false);
        return;
      }

      try {
        // Check if token is valid
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/auth/check-auth`,
          {},
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        dispatch(login());
        setIsAuthenticated(true);
 
      } catch (error) {
        console.error('Unauthorized');
        dispatch(logout());
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Replace with a proper loading spinner if needed
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Render children if authenticated
  return children;
};

export default RequireAuth;


// import React, { JSX } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../store/store';
// import { Navigate } from 'react-router-dom';
// import { login, logout } from '../store/slices/authSlice';
// import axios from 'axios';
// // import { JSX } from '@types/react'; // Import JSX namespace

// const RequireAuth = ({ children }: { children: JSX.Element }) => {
//   const dispatch = useDispatch();
//   // let isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
//   let isLoggedIn = false;
//   let accessToken = localStorage.getItem('accessToken');
//   if(!accessToken){
//     dispatch(logout())
//   } 

//   // Check if token not expired
//   axios.post
//   const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/check-auth`, {}, { 
//     headers: { Authorization: `Bearer ${accessToken}` } 
//   });
//   if(response.data.authenticated){
//     dispatch(login());
//     isLoggedIn = true;
//   }
//   return isLoggedIn ? children : <Navigate to="/" replace />;
// };

// export default RequireAuth;