import React, { Fragment } from 'react';
import spinner from '../spinner/spinner.gif';

const Spinner = () => {
  return (
    <Fragment>
      <img
        src={String(spinner)}
        alt="Loading..."
        style={{ display: 'flex', margin: '100px auto', width: 50 }}
      />
    </Fragment>
  );
};

export default Spinner;
