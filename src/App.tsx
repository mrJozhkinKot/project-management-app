import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import About from './components/pages/About';
import Main from './components/pages/Main';
import NotFound from './components/pages/NotFound';
import Footer from './components/UI/Footer';
import Navbar from './components/UI/Navbar';

const App: React.FunctionComponent = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
