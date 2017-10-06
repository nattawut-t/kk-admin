import { connect } from 'react-redux';
import Component from '../../components/lead/Summary';
import { submit } from '../../reducers/draft';

const mapStateToProps = state => ({
  data: state.draft.data,
  loading: state.notification.loading,
  message: state.notification.message,
});

const mapDispatchToProps = dispatch => ({
  save: callback => dispatch(submit(callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
