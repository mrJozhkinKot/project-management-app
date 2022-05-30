import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCheckCookiesExpired } from '../../hooks/authorization';
import { useAppSelector } from '../../hooks/redux';

function Main(): React.ReactElement {
  const { isAuth } = useAppSelector((state) => state.globalReducer);

  useCheckCookiesExpired();

  return !isAuth ? <Navigate to="/welcome" /> : <Navigate to="/boards" />;
}

export default Main;
