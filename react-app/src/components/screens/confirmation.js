import React, { Component } from 'react';
import api from '../common/api';
import config from 'react-global-configuration';

class Confirmation extends Component {
  state = {
    info: '',
    error: ''
  }

  componentDidMount() {
    const params = this.props.match && this.props.match.params || {};
    api.Api(config.get('server')).confirmation(params.email, params.guid)
      .then(res => {
        this.setState({ info: res.data });
      }, err => {
        this.setState({ error: err.response.data, info: '' });
      });

      this.setState({ error: '', info: "Wait..." });
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