import React, { Component } from 'react';
import {Router, Route, Link} from 'react-router-dom';
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
        <div>
          <ul>
            <li><Link to="/">Public</Link></li>
            <li><Link to="/private">Private</Link></li>
            <li><Link to="/signin">Signin</Link></li>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/confirmation">Confirmation</Link></li>
          </ul>

          <hr/>

          <Route exact path='/' component={Public} />
          <Route path='/private' component={Private} />
          <Route path='/signin' component={Signin} />
          <Route path='/signup' component={Signup} />
          <Route path='/confirmation' component={Confirmation} />
        </div>
      </Router>
    );
  }
}

export default App;
