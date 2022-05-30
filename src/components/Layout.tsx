import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './UI/Footer';
import Header from './UI/Header';

function Layout(): React.ReactElement {
  const style = {
    container: {
      display: 'flex',
      justifyContent: 'spaceBetween',
      flexDirection: 'column' as const,
    },
  };

  return (
    <>
      <Header />
      <main id="main" style={style.container}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
