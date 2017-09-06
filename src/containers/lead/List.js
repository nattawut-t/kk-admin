import { connect } from 'react-redux';
import List from '../../../components/shared/List';
import { TableSchemas } from '../../../models/bankAccountVerification';
import {
  searchData,
  sortData,
  selectData,
} from '../../../reducers/bankAccountVerification';

const mapStateToProps = state => ({
  dataList: state.bankAccountVerification.get('dataList'),
  tableSchemas: TableSchemas,
});

const mapDispatchToProps = dispatch => ({
  loadData: () => dispatch(searchData()),
  sortData: (sortField, sortDesc) => dispatch(sortData(sortField, sortDesc)),
  selectData: rowIndex => dispatch(selectData(rowIndex)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);
