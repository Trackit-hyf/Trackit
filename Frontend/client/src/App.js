import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/layout/Home';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import './App.css';

function App() {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path='/' component={Home} />
        <section className='container'>
          <Switch>
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
}

export default App;
