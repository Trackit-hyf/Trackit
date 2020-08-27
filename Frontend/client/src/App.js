import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/layout/Home';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import MyAssets from './components/assets/MyAssets';
import AddAsset from './components/assets/AddAsset';
import { GlobalProvider } from './context/GlobalState';
import './App.css';

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Home} />
          <section className='container'>
            <Switch>
              <Route exact path='/signup' component={Signup} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/myassets' component={MyAssets} />
              <Route exact path='/myassets/add' component={AddAsset} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </GlobalProvider>
  );
}

export default App;
