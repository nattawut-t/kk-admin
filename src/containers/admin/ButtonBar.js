import { connect } from 'react-redux';
import ButtonBar from '../../components/shared/ButtonBar';
import { cancelSelection } from '../../actions/admin';
import { searchData } from '../../reducers/admin';

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
