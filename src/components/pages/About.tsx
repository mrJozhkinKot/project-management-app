import React, { Fragment } from 'react';
import { getUsers } from '../../utils/serverAPI';

const About: React.FC = () => {
  getUsers();
  return <Fragment>About</Fragment>;
};

export default About;
