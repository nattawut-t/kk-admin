import { connect } from 'react-redux';
import Index from '../../components/lead/Index';
import { loadNextPage } from '../../reducers/lead';

const mapStateToProps = ({ lead }) => ({
  id: lead.get('id'),
  message: lead.get('message'),
  loading: lead.get('loading'),
});

const mapDispatchToProps = dispatch => ({
  loadNextPage: () => dispatch(loadNextPage()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Index);
