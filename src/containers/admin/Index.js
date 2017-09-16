import { connect } from 'react-redux';
import Index from '../../components/admin/Index';
import { loadNextPage } from '../../reducers/admin';

const mapStateToProps = ({ admin }) => ({
  id: admin.get('id'),
  notiMessage: admin.get('notiMessage'),
  loading: admin.get('loading'),
});

const mapDispatchToProps = dispatch => ({
  loadNextPage: () => dispatch(loadNextPage()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Index);
