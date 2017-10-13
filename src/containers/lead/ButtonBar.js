import { connect } from 'react-redux';
import Component from '../../components/shared/ButtonBar';
import { cancelSelection } from '../../actions/lead';
import { searchData } from '../../reducers/lead';

const mapStateToProps = ({ lead, notification }) => ({
  id: lead.get('id'),
  message: notification.message,
  loading: notification.loading,
});

const mapDispatchToProps = dispatch => ({
  searchData: keyword => dispatch(searchData(keyword)),
  cancelSelection: () => dispatch(cancelSelection()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
