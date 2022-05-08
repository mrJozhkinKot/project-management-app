import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './UI/Header';
import Footer from './UI/Footer/Footer';

function Layout(): React.ReactElement {
  return (
    <>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
