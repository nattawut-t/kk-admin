import { connect } from 'react-redux';
import Component from '../components/App';

const mapStateToProps = ({ authen }) => ({
  isAdmin: authen.get('isAdmin'),
});

export default connect(mapStateToProps)(Component);
