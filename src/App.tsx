import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import About from './components/pages/Welcome';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import Main from './components/pages/Main';
import Boards from './components/pages/Boards';
import Board from './components/pages/Board';
import Columns from './components/pages/Columns';
import Column from './components/pages/Column';
import Tasks from './components/pages/Tasks';
import Task from './components/pages/Task';
import NotFound from './components/pages/NotFound';

function App(): React.ReactElement {
  return (
    <div id="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="welcome" element={<About />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="boards">
            <Route index element={<Boards />} />
            <Route path=":id" element={<Board />} />
            <Route path=":id/columns">
              <Route index element={<Columns />} />
              <Route path=":id" element={<Column />} />
              <Route path=":id/tasks">
                <Route index element={<Tasks />} />
                <Route path=":id" element={<Task />} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
