import React, { Component } from 'react';
import api from '../common/api';
import config from 'react-global-configuration';

class Public extends Component {
  state ={
    data: ''
  }

  componentDidMount() {
    api.Api(config.get('server')).public()
      .then(res => {
        this.setState({ data: res.data });
      }, err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        {this.state.data}
      </div>
    );
  }
}

export default Public;