import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';

import Confirmation from './confirmation';
import Private from './private';
import Public from './public';
import Signin from './signin';
import Signup from './signup';

import { changeEmail } from '../actions/changeEmail'

const history = createBrowserHistory();

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.props.changeEmail(this.props.cookies.get('login'));
  }

  signOut = () => {
    this.props.cookies.set('login', '');
    this.props.cookies.set('token', '');
  }

  render() {
    return (
      <Router history={history}>
        <div className="app">
          <div className="header">
            <div className="header-pages">
              <Link to="/" className="btn btn-link header-link">Public</Link>
              <Link to="/private" className="btn btn-link header-link">Private</Link>
            </div>

            {this.props.cookies.get('login')
              ? <div className="header-sign">
                  <label className="label header-name">{this.props.cookies.get('login')}</label>
                  <Link to="/public" onClick={this.signOut} className="btn btn-link header-link">Signout</Link>
                </div>
              : <div className="header-sign">
                  <Link to="/signup" className="btn btn-link header-link">Signup</Link>
                  <Link to="/signin" className="btn btn-link header-link">Signin</Link>
                </div>
            }
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

function mapStateToProps(state) {
  return {
    state: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeEmail: (email) => dispatch(changeEmail(email))
  };
};

export default withCookies(connect(mapStateToProps,mapDispatchToProps)(Navigation));