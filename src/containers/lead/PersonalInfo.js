import { connect } from 'react-redux';
import Component from '../../components/lead/PersonalInfo';
import {
  get,
  save,
} from '../../reducers/draft';

const mapStateToProps = state => ({
  data: state.draft.data,
  editing: state.draft.editing,
  loading: state.notification.loading,
  message: state.notification.message,
});

const mapDispatchToProps = dispatch => ({
  getDraft: callback => dispatch(get(callback)),
  saveDraft: (data, callback) => dispatch(save(data, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
