import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import EmailInput from './email';
import PasswordInput from './password';
import {changePassword} from '../actions/changePassword'
import axios from 'axios';
import config from 'react-global-configuration';

class Signin extends Component {
  onSubmit = (event) => {
    if (!this.props.email || !this.props.password) {
      event.preventDefault();
      return;
    }

    var url = config.get('server') + 'users/signin';
    axios.post(url, { Email: this.props.email, Password: this.props.password })
      .then(res => {
        this.props.cookies.set('login', this.props.email);
        this.props.cookies.set('token', res.token);
        this.props.changePassword('');
        this.props.router.push('/public');
      });

    event.preventDefault();
  }

  render() {
    return (
      <form className="sign-form" onSubmit={this.onSubmit}>
        <EmailInput />
        <PasswordInput />
        <div>
          <button type="submit" className="btn">Sign in</button>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    email: state.email,
    password: state.password
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changePassword: (password) => dispatch(changePassword(password))
  };
};

export default withCookies(connect(mapStateToProps,mapDispatchToProps)(Signin));