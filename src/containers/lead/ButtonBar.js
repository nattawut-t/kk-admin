import { connect } from 'react-redux';
import ButtonBar from '../../components/lead/ButtonBar';
import { cancelSelection } from '../../actions/lead';
import { searchData } from '../../reducers/lead';

const mapStateToProps = ({ admin }) => ({
  id: admin.get('id'),
  message: admin.get('message'),
  loading: admin.get('loading'),
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
