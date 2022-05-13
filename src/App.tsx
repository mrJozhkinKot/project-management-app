import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import './App.css';
import About from './components/pages/About';
import Board from './components/pages/Board';
import Login from './components/pages/Login';
import Main from './components/pages/Main';
import NotFound from './components/pages/NotFound';
import Footer from './components/UI/Footer';
import Navbar from './components/UI/Navbar';

const App: React.FunctionComponent = () => {
  const isAuth = true;
  const PrivateRoute = ({ children }: { children: React.ReactElement | null }) => {
    return isAuth ? children : <Navigate to="/login" />;
  };
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Main />
              </PrivateRoute>
            }
          ></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/board/:id"
            element={
              <PrivateRoute>
                <Board />
              </PrivateRoute>
            }
          ></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
