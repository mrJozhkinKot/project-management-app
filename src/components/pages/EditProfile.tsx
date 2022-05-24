import React, { Fragment } from 'react';
import { Navigate } from 'react-router-dom';
import { useCheckCookiesExpired } from '../../hooks/authorization';
import { useAppSelector } from '../../hooks/redux';

function EditProfile(): React.ReactElement {
  const { isAuth } = useAppSelector((state) => state.globalReducer);

  useCheckCookiesExpired();

  if (!isAuth) {
    return <Navigate to="/signin" replace></Navigate>;
  }

  return (
    <Fragment>
      EditProfile
      <button
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          console.log('isAuth: ', isAuth);
        }}
      >
        Show user data
      </button>
    </Fragment>
  );
}

export default EditProfile;
