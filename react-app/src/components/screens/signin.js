import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import EmailInput from '../common/email';
import { Redirect } from 'react-router-dom';
import api from '../common/api';

class Signin extends Component {
  state = {
    toPrivate: false,
    info: '',
    error: '',
    password: ''
  }

  onSubmit = (event) => {
    api.Api().signin(this.props.email, this.state.password)
      .then(res => {
        this.props.cookies.set('login', this.props.email);
        this.props.cookies.set('token', res.data.token);
        this.setState({ toPrivate: true, info: '' });
      }, err => {
        this.setState({ error: err.response.data, info: '' });
      });

    this.setState({ password: '', error: '', info: 'Wait...'});
    event.preventDefault();
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  render() {
    if (this.state.toPrivate === true) {
      return <Redirect to='/private' />
    }

    return (
      <form className="sign-form" onSubmit={this.onSubmit}>
        <EmailInput />
        <div>
          <input type="text" required="required" placeholder="password" value={this.state.password} onChange={this.onPasswordChange} />
        </div>
        <div>
          <button type="submit" className="btn">Sign in</button>
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

export default withCookies(connect(mapStateToProps)(Signin));