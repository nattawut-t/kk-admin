import { connect } from 'react-redux';
import Component from '../../components/shared/ButtonBar';
import { searchData, cancelSelection } from '../../reducers/lead';
// import { switchMode } from '../../reducers/draft';

const mapStateToProps = ({ lead, notification }) => ({
  id: lead.get('id'),
  message: notification.message,
  loading: notification.loading || false,
});

const mapDispatchToProps = dispatch => ({
  searchData: keyword => dispatch(searchData(keyword)),
  // switchMode: mode => dispatch(switchMode(mode)),
  cancelSelection: () => dispatch(cancelSelection()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
