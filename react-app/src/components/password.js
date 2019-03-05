import React, { Component } from 'react';
import { connect } from 'react-redux';
import {changePassword} from '../actions/changePassword'

class PasswordInput extends Component {
  onPasswordChange(event) {
    this.props.changePassword(event.target.value);
  }

  render() {
    return (
      <div>
        <input type="text" required="required" placeholder="password" value={this.props.password}  onChange={this.onPasswordChange.bind(this)} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    password: state.password
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changePassword: (password) => dispatch(changePassword(password))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(PasswordInput);