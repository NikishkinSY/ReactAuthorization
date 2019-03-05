import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeEmail } from '../actions/changeEmail'

class EmailInput extends Component {
  onEmailChange(event) {
    this.props.changeEmail(event.target.value);
  }

  render() {
    return (
      <div>
        <input type="text" required="required" placeholder="email" value={this.props.email} onChange={this.onEmailChange.bind(this)} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    email: state.email
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeEmail: (email) => dispatch(changeEmail(email))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(EmailInput);