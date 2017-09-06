import { connect } from 'react-redux';
import FileViewer from '../../../components/operation/bankAccountVerification/Viewer';

const mapStateToProps = state => ({
  id: state.bankAccountVerification.get('id'),
  accountNo: state.bankAccountVerification.get('accountNo'),
  accountName: state.bankAccountVerification.get('accountName'),
  idcardNo: state.bankAccountVerification.get('idcardNo'),
  partnerName: state.bankAccountVerification.get('partnerName'),
  bankCode: state.bankAccountVerification.get('bankCode'),
  bankName: state.bankAccountVerification.get('bankName'),
  branchName: state.bankAccountVerification.get('branchName'),
});

export default connect(
  mapStateToProps,
)(FileViewer);
