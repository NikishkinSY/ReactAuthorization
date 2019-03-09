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

import { updateEmail } from '../store/actions';

const history = createBrowserHistory();

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.props.updateEmail(this.props.cookies.get('login'));
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

            {this.props.cookies.get('login') && this.props.cookies.get('token')
              ? <div className="header-sign">
                  <div className="header-name">
                    <label className="label">{this.props.cookies.get('login')}</label>
                  </div>
                  <Link to="/" onClick={this.signOut} className="btn btn-link header-link">Signout</Link>
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
              <Route exact path='/confirmation/:id/:guid' component={Confirmation} />
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
    updateEmail: (email) => dispatch(updateEmail(email))
  };
};

export default withCookies(connect(mapStateToProps,mapDispatchToProps)(Navigation));