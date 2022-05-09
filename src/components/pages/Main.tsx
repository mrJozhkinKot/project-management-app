import React from 'react';
import { Navigate } from 'react-router-dom';

function Main(): React.ReactElement {
  const isAuth = true;

  return !isAuth ? <Navigate to="/welcome" /> : <Navigate to="/boards" />;
}

export default Main;
