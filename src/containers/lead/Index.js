import { connect } from 'react-redux';
import Index from '../../components/lead/Index';
import { loadNextPage } from '../../reducers/lead';

const mapStateToProps = ({ lead, notification }) => ({
  id: `${lead.get('id') || ''}`,
  message: notification.message,
  loading: notification.loading,
});

const mapDispatchToProps = dispatch => ({
  loadNextPage: () => dispatch(loadNextPage()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Index);
