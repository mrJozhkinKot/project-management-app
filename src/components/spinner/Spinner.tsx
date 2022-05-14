import React, { Fragment } from 'react';
import spinner from '../spinner/spinner.gif';

const Spinner = () => {
  return (
    <Fragment>
      <img
        src={String(spinner)}
        alt="Loading..."
        style={{ display: 'flex', margin: 'auto', width: '100px' }}
      />
    </Fragment>
  );
};

export default Spinner;
