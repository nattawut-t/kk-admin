import { connect } from 'react-redux';
import Component from '../components/AdminLogin';
import { login } from '../reducers/authen';

const mapStateToProps = state => ({
  message: state.authen.get('message') || '',
  loading: state.authen.get('loading'),
});

const mapDispatchToProps = dispatch => ({
  login: (username, password, callback) => dispatch(login(username, password, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
