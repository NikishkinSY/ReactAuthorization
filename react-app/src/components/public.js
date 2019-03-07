import React, { Component } from 'react';
import axios from 'axios';
import config from 'react-global-configuration';

class Public extends Component {
  state ={
    data: ''
  }

  constructor(props) {
    super(props);
    var url = config.get('server') + 'home/public';
    axios.get(url)
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