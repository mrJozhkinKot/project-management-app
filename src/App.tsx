import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Welcome from './components/pages/Welcome';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import Main from './components/pages/Main';
import Boards from './components/pages/Boards';
import Board from './components/pages/Board';
import ModalBoard from './components/modal/ModalBoard';
import EditProfile from './components/pages/EditProfile';
import NotFound from './components/pages/NotFound';

function App(): React.ReactElement {
  return (
    <div id="app">
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
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
