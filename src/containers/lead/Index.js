import { connect } from 'react-redux';
import Index from '../../../components/operation/bankAccountVerification/Index';
import { loadNextPage } from '../../../reducers/bankAccountVerification';

const mapStateToProps = state => ({
  id: state.bankAccountVerification.get('id'),
  notiMessage: state.bankAccountVerification.get('notiMessage'),
  loading: state.bankAccountVerification.get('loading'),
});

const mapDispatchToProps = dispatch => ({
  loadNextPage: () => dispatch(loadNextPage()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Index);
