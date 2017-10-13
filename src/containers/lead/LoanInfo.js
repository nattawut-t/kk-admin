import { connect } from 'react-redux';
import Component from '../../components/lead/LoanInfo';
import { get, save } from '../../reducers/draft';

const mapStateToProps = ({ draft, lead, notification }) => ({
  data: draft.data,
  editing: lead.get('editing') || false,
  loading: notification.loading,
  message: notification.message,
});

const mapDispatchToProps = dispatch => ({
  getDraft: callback => dispatch(get(callback)),
  saveDraft: (data, callback) => dispatch(save(data, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
