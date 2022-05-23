import React, { Fragment } from 'react';
import { useCheckCookiesExpired } from '../../hooks/authorization';

function Welcome(): React.ReactElement {
  useCheckCookiesExpired();

  return <Fragment>Welcome (About)</Fragment>;
}

export default Welcome;
