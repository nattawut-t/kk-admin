import { connect } from 'react-redux';
import Component from '../components/Login';
import { login, getOtp } from '../reducers/authen';

const mapStateToProps = state => ({
  message: state.authen.get('message') || '',
  loading: state.authen.get('loading'),
});

const mapDispatchToProps = dispatch => ({
  getOtp: mobile => dispatch(getOtp(mobile)),
  login: (mobile, otp) => dispatch(login(mobile, otp)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
