import React from 'react'
import Signup from '../components/auth/signup'
import { onSignup } from '../actions/auth-action'
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    isLoading: state.userData.isLoading,
    registered:state.userData.registered
  }
};

const mapActionsToprops = {
  onSignup: onSignup
};

export default connect(mapStateToProps, mapActionsToprops)(Signup);