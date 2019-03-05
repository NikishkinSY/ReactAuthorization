import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import EmailInput from './email';
import PasswordInput from './password';
import {changePassword} from '../actions/changePassword'

class Public extends Component {
  onSubmit = (event) => {
    if (!this.props.email || !this.props.password) {
      event.preventDefault();
      return;
    }

    this.props.cookies.set('login', this.props.email);
    this.props.cookies.set('token', 'qwerty');

    this.props.changePassword('');
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

export default withCookies(connect(mapStateToProps,mapDispatchToProps)(Public));