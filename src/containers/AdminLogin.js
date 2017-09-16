import { connect } from 'react-redux';
import Component from '../components/AdminLogin';
import { clearState } from '../actions/authen';
import { login } from '../reducers/authen';

const mapStateToProps = ({ authen }) => ({
  message: authen.get('message') || '',
  loading: authen.get('loading'),
});

const mapDispatchToProps = dispatch => ({
  login: (username, password, callback) => dispatch(login(username, password, callback)),
  clearState: () => dispatch(clearState()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
