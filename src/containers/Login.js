import { connect } from 'react-redux';
import Component from '../components/Login';
import { clearState } from '../actions/authen';
import { loginOtp, getOtp } from '../reducers/authen';

const mapStateToProps = ({ authen }) => ({
  message: authen.get('message') || '',
  loading: authen.get('loading') || false,
});

const mapDispatchToProps = dispatch => ({
  getOtp: mobile => dispatch(getOtp(mobile)),
  login: (mobile, otp, callback) => dispatch(loginOtp(mobile, otp, callback)),
  clearState: () => dispatch(clearState()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
