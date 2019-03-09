import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {withCookies} from 'react-cookie';

class NavBar extends Component {
  signOut = () => {
    const {cookies} = this.props;

    cookies.set('login', '');
    cookies.set('token', '');
  }

  render() {
    return (
      <div>
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
      </div>
    );
  }
}

export default withCookies(NavBar);
