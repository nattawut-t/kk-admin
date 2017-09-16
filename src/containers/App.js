import { connect } from 'react-redux';
import Component from '../components/App';

const mapStateToProps = ({ authen }) => ({
  isAdmin: authen.get('isAdmin'),
  authenticated: authen.get('authenticated') || false,
});

export default connect(mapStateToProps)(Component);
