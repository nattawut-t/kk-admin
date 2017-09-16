import { connect } from 'react-redux';
import Viewer from '../../components/admin/Viewer';

const mapStateToProps = ({ admin }) => ({
  id: admin.get('id'),
  accountNo: admin.get('accountNo'),
  accountName: admin.get('accountName'),
  idcardNo: admin.get('idcardNo'),
  partnerName: admin.get('partnerName'),
  bankCode: admin.get('bankCode'),
  bankName: admin.get('bankName'),
  branchName: admin.get('branchName'),
});

export default connect(
  mapStateToProps,
)(Viewer);
