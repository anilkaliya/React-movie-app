import Login from '../components/auth/login'
import { onLogin } from '../actions/auth-action'
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {

    userData: state.userData
    
  }
};

const mapActionsToprops = {
  onLogin: onLogin
};

export default connect(mapStateToProps, mapActionsToprops)(Login);