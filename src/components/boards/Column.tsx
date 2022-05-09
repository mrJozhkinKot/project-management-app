import React, { useEffect, useState } from 'react';
import Container from './Container';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Column = () => {
  const [shouldRender, setShouldRender] = useState(false);
  useEffect(() => setShouldRender(true), []);
  return <>{shouldRender && <Container />}</>;
};

export default Column;
