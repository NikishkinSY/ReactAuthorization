import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import EmailInput from '../common/email';
import axios from 'axios';
import config from 'react-global-configuration';
import { Redirect } from 'react-router-dom'; 

class Signin extends Component {
  state = {
    toPrivate: false,
    error: '',
    password: ''
  }

  onSubmit = (event) => {
    if (!this.props.email || !this.state.password) {
      event.preventDefault();
      return;
    }

    var url = config.get('server') + 'users/signin';
    axios.post(url, { Email: this.props.email, Password: this.state.password })
      .then(res => {
        this.props.cookies.set('login', this.props.email);
        this.props.cookies.set('token', res.data.token);
        this.setState({ toPrivate: true });
      }, err => {
        this.setState({ error: err.response.data });
      });

    this.setState({ password: '', info: 'Wait...' });
    event.preventDefault();
  }

  onPasswordChange(event) {
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
          <input type="text" required="required" placeholder="password" value={this.state.password} onChange={this.onPasswordChange.bind(this)} />
        </div>
        <div>
          <button type="submit" className="btn">Sign in</button>
        </div>
        <div className="error">
          {this.state.error}
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