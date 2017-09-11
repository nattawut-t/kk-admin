import { connect } from 'react-redux';
import Component from '../components/Login';
import { save, getOtp } from '../reducers/authen';

const mapStateToProps = state => ({
  // username: transform(state, 'username'),
  // password: transform(state, 'password'),
  loading: state.lead.get('loading'),
});

const mapDispatchToProps = dispatch => ({
  getOtp: username => dispatch(getOtp(username)),
  login: (username, password) => dispatch(save(username, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
