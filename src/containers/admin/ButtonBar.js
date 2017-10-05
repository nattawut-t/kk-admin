import { connect } from 'react-redux';
import ButtonBar from '../../components/shared/ButtonBar';
import { cancelSelection } from '../../actions/admin';
import { searchData } from '../../reducers/lead';

const mapStateToProps = ({ lead }) => ({
  id: lead.get('id'),
  message: lead.get('message'),
  loading: lead.get('loading'),
});

const mapDispatchToProps = dispatch => ({
  // approve: id => approve(dispatch, id),
  searchData: keyword => dispatch(searchData(keyword)),
  cancelSelection: () => dispatch(cancelSelection()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ButtonBar);
