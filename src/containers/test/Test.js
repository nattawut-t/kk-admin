import { connect } from 'react-redux';
import Component from '../../components/test/Test';
import { setState } from '../../reducers/test';

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
  setState: data => dispatch(setState(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
