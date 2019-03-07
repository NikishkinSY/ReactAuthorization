import React, { Component } from 'react';
import config from 'react-global-configuration';
import axios from 'axios';

class Confirmation extends Component {
  state = {
    info: '',
    error: ''
  }

  componentWillMount() {
    const { match: { params } } = this.props;

    var url = config.get('server') + 'users/confirm?id=' + params.id + '&guid=' + params.guid
    axios.get(url)
      .then(res => {
        this.setState({ info: res.data });
      }, err => {
        this.setState({ error: err.response.data });
      });
  }

  render() {
    return (
      <div>
        <div className="error">
          {this.state.error}
        </div>
        <div>
          {this.state.info}
        </div>
      </div>
    );
  }
}

export default Confirmation;