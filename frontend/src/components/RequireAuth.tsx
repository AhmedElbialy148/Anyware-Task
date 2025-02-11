import { JSX } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  let isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  
  return isLoggedIn ? children : <Navigate to="/" replace />;
};

export default RequireAuth;