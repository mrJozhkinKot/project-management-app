import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend as Backend } from 'react-dnd-html5-backend';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import ModalBoard from './components/modal/ModalBoard';
import Board from './components/pages/Board';
import Boards from './components/pages/Boards';
import EditProfile from './components/pages/EditProfile';
import Main from './components/pages/Main';
import NotFound from './components/pages/NotFound';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import Welcome from './components/pages/Welcome';
import { useSetCookiesName, useWatchCookiesToken } from './hooks/authorization';

function App(): React.ReactElement {
  useSetCookiesName();
  useWatchCookiesToken();

  return (
    <div id="app">
      <DndProvider backend={Backend}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="welcome" element={<Welcome />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="editprofile" element={<EditProfile />} />
            <Route path="modalboard" element={<ModalBoard />} />
            <Route path="boards">
              <Route index element={<Boards />} />
              <Route path=":id" element={<Board />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </DndProvider>
    </div>
  );
}

window.addEventListener('locationchange', function () {
  console.log('url changed');
});

export default App;
