import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import api from '../common/api';
import { withCookies } from 'react-cookie';

class Private extends Component {
  state ={
    data: '',
    toSignin: false
  }

  componentDidMount() {
    api.Api().private(this.props.cookies.get('token'))
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