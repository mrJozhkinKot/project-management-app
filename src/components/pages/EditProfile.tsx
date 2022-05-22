import React, { Fragment } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

function EditProfile(): React.ReactElement {
  const { isAuth } = useAppSelector((state) => state.globalReducer);

  if (!isAuth) {
    return <Navigate to="/signin" replace></Navigate>;
  }

  return <Fragment>EditProfile</Fragment>;
}

export default EditProfile;
