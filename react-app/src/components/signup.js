import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import EmailInput from './email';
import axios from 'axios';
import config from 'react-global-configuration';

class Signup extends Component {
  state = {
    error: '',
    info: '',
    password: '',
    confirmPassword: ''
  }

  onSubmit = (event) => {
    if (!this.props.email || !this.state.password) {
      event.preventDefault();
      return;
    }

    if (this.state.password !== this.state.confirmPassword) {
      this.setState({ error: 'Passwords don`t match' });
      event.preventDefault();
      return;
    }

    var url = config.get('server') + 'users/signup';
    axios.post(url, { Email: this.props.email, Password: this.state.password })
      .then(res => {
        this.setState({ info: 'We have sent an email with a confirmation link to your email address' });
      }, err => {
        this.setState({ error: err.response.data });
      });

    this.setState({ password: '', confirmPassword: '' });
    event.preventDefault();
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  onConfirmPasswordChange(event) {
    this.setState({ confirmPassword: event.target.value });
  }

  render() {
    return (
      <form className="sign-form" onSubmit={this.onSubmit}>
        <EmailInput />
        <div>
          <input type="text" required="required" placeholder="password" value={this.state.password} onChange={this.onPasswordChange.bind(this)} />
        </div>
        <div>
          <input type="text" required="required" placeholder="confirm password" value={this.state.confirmPassword} onChange={this.onConfirmPasswordChange.bind(this)} />
        </div>
        <div>
          <button type="submit" className="btn">Sign up</button>
        </div>
        <div className="error">
          {this.state.error}
        </div>
        <div>
          {this.state.info}
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    email: state.email
  }
}

export default withCookies(connect(mapStateToProps)(Signup));