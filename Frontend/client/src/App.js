import React, { Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import Home from './components/layout/Home';
import './App.css';

function App() {
  return (
    <Fragment>
      <Navbar />
      <Home />
    </Fragment>
  );
}

export default App;
