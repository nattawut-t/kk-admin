import { connect } from 'react-redux';
import Index from '../../components/lead/Index';
import { loadNextPage } from '../../reducers/lead';

const mapStateToProps = ({ admin }) => ({
  id: admin.get('id'),
  message: admin.get('message'),
  loading: admin.get('loading'),
});

const mapDispatchToProps = dispatch => ({
  loadNextPage: () => dispatch(loadNextPage()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Index);
