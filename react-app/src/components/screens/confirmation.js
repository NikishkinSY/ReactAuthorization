import React, { Component } from 'react';
import config from 'react-global-configuration';
import axios from 'axios';

class Confirmation extends Component {
  state = {
    info: '',
    error: ''
  }

  componentDidMount() {
    console.log(this.props.match.params);
    const params = this.props.match && this.props.match.params || {};
    console.log(params);
    const url = config.get('server') + 'users/confirm?id=' + params.id + '&guid=' + params.guid
    
    axios.get(url)
      .then(res => {
        this.setState({ info: res.data });
      }).catch(err => {
        this.setState({ error: err.response.data });
      });

      this.setState({ info: "Wait..." });
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