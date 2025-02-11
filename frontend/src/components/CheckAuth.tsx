import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from '../store/slices/authSlice';
import axios from 'axios';

const CheckAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        dispatch(logout());
        return;
      }

      try {
        // Check if token is valid
        await axios.post(
          `${process.env.REACT_APP_API_URL}/auth/check-auth`,
          {},
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        dispatch(login());

      } catch (error) {
        dispatch(logout());
      }
    };

    checkAuth();
  }, [dispatch]);

  return (
    <Fragment></Fragment>
  )
};

export default CheckAuth;