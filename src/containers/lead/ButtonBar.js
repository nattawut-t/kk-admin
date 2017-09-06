import { connect } from 'react-redux';
import ButtonBar from '../../../components/shared/ButtonBar';
import { cancelSelection } from '../../../actions/bankAccountVerification';
import { approve, searchData } from '../../../reducers/bankAccountVerification';

const mapStateToProps = state => ({
  id: state.bankAccountVerification.get('id'),
  notiMessage: state.bankAccountVerification.get('notiMessage'),
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
