import React from 'react';

function Header(): React.ReactElement {
  const isAuth = true;

  return (
    <div id="header">
      <nav className={!isAuth ? 'hidden' : 'visible'}></nav>
      <div className={!isAuth ? 'hidden' : 'visible'} style={{ display: 'inline-block' }}>
        <button>Sign in</button>
        <button>Sign up</button>
      </div>
      Header
    </div>
  );
}

export default Header;
