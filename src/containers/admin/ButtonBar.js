import { connect } from 'react-redux';
import ButtonBar from '../../components/shared/ButtonBar';
import { cancelSelection } from '../../actions/admin';
import { approve, searchData } from '../../reducers/admin';

const mapStateToProps = ({ admin }) => ({
  id: admin.get('id'),
  notiMessage: admin.get('notiMessage'),
});

const mapDispatchToProps = dispatch => ({
  approve: id => approve(dispatch, id),
  searchData: keyword => dispatch(searchData(keyword)),
  cancelSelection: () => dispatch(cancelSelection()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ButtonBar);
