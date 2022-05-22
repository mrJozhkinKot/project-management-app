import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

function Main(): React.ReactElement {
  const { isAuth } = useAppSelector((state) => state.globalReducer);

  return !isAuth ? <Navigate to="/welcome" /> : <Navigate to="/boards" />;
}

export default Main;
