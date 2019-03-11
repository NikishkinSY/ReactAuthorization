import React, { Component } from 'react';
import axios from 'axios';
import config from 'react-global-configuration';
import { Redirect } from 'react-router-dom';
import { withCookies } from 'react-cookie';

class Private extends Component {
  state ={
    data: '',
    toSignin: false
  }

  componentDidMount() {
    const url = config.get('server') + 'home/private';
    axios.get(url, {
      headers: {
        Authorization: 'Bearer ' + this.props.cookies.get('token'),
      }
    })
      .then(res => {
        this.setState({ data: res.data });
      }, err => {
        console.log(err);
        this.setState({ toSignin: true });
      });
  }

  render() {
    if (this.state.toSignin === true) {
      return <Redirect to='/signin' />
    }

    return (
      <div>
        {this.state.data}
      </div>
    );
  }
}

export default withCookies(Private);