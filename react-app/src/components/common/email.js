import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateEmail } from '../../store/actions';

class EmailInput extends Component {
  onEmailChange(event) {
    this.props.updateEmail(event.target.value);
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
    updateEmail: (email) => dispatch(updateEmail(email))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(EmailInput);