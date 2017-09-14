import { connect } from 'react-redux';
import Component from '../components/Login';
import { loginOtp, getOtp } from '../reducers/authen';

const mapStateToProps = state => ({
  message: state.authen.get('message') || '',
  loading: state.authen.get('loading'),
});

const mapDispatchToProps = dispatch => ({
  getOtp: mobile => dispatch(getOtp(mobile)),
  login: (mobile, otp, callback) => dispatch(loginOtp(mobile, otp, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
