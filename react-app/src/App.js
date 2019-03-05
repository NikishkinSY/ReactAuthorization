import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import './App.css';

import Confirmation from './components/confirmation';
import Private from './components/private';
import Public from './components/public';
import Signin from './components/signin';
import Signup from './components/signup';

const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="app">
          <div className="header">
            <div className="header-pages">
              <Link to="/" className="btn btn-link header-link">Public</Link>
              <Link to="/private" className="btn btn-link header-link">Private</Link>
            </div>
            <div className="header-sign">
              <Link to="/signup" className="btn btn-link header-link">Signup</Link>
              <Link to="/signin" className="btn btn-link header-link">Signin</Link>
            </div>
          </div>

          <hr />

          <div className="body">
            <div>
              <Route exact path='/' component={Public} />
              <Route path='/private' component={Private} />
              <Route path='/signin' component={Signin} />
              <Route path='/signup' component={Signup} />
              <Route path='/confirmation' component={Confirmation} />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
