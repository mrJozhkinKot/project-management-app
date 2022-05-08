import React, { Fragment } from 'react';
import { Navigate } from 'react-router-dom';

function Main(): React.ReactElement {
  const isAuth = true;

  return !isAuth ? <Navigate to="/welcome" /> : <Fragment>Main</Fragment>;
}

export default Main;
