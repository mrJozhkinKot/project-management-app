import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './UI/Footer';
import Header from './UI/Header';

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
