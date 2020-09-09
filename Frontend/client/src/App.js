import React, { Fragment, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/layout/Home';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import MyAssets from './components/assets/MyAssets';
import AddAsset from './components/assets/AddAsset';
import { GlobalContext } from './context/GlobalState';

import './App.css';

function App() {
  const { user } = useContext(GlobalContext);

  return (
    <Router>
      <Fragment>
        <Navbar user={user} />
        <Route exact path='/' component={Home} user={user} />
        <section className='container'>
          <Switch>
            <>
              {user.token ? (
                <>
                  <Route
                    exact
                    path='/myassets'
                    component={MyAssets}
                    user={user}
                  />
                  <Route
                    exact
                    path='/myassets/add'
                    component={AddAsset}
                    user={user}
                  />
                </>
              ) : (
                <>
                  <Route exact path='/signup' component={Signup} />
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/myassets' component={Login} />
                  <Route
                    exact
                    path='/myassets/add'
                    component={Login}
                    user={user}
                  />
                </>
              )}
            </>
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
}

export default App;
