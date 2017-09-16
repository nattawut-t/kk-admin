import { connect } from 'react-redux';
import Component from '../../components/test/Test1';
// import { acceptAgreement } from '../../reducers/test';

const mapStateToProps = ({ test }) => ({
  data: test.get('data'),
});

export default connect(
  mapStateToProps,
)(Component);
