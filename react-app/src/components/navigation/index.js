import React, {Component} from 'react';
import {Router, Route} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import {connect} from 'react-redux';
import {withCookies} from 'react-cookie';

import Confirmation from '../screens/confirmation';
import Private from '../screens/private';
import Public from '../screens/public';
import SignIn from '../screens/signin';
import SignUp from '../screens/signup';

import NavBar from '../common/navbar';

import {updateEmail} from '../../store/actions';

const history = createBrowserHistory();

class Navigation extends Component {
  componentDidMount(){
    const {updateEmail, cookies} = this.props;

    updateEmail(cookies.get('login'));
  }

  render() {
    return (
      <Router history={history}>
        <div className="app">
          <NavBar />
          <div className="body">
            <div>
              <Route exact path='/' component={Public} />
              <Route path='/private' component={Private} />
              <Route path='/signin' component={SignIn} />
              <Route path='/signup' component={SignUp} />
              <Route exact path='/confirmation/:id/:guid' component={() => React.createElement(Confirmation)} />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  state: state
});

const mapDispatchToProps = (dispatch) => ({
  updateEmail: email => dispatch(updateEmail(email))
});

export default withCookies(connect(mapStateToProps,mapDispatchToProps)(Navigation));
