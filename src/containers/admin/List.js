import { connect } from 'react-redux';
import List from '../../components/shared/List';
// import { TableSchemas } from '../../models/admin';
import {
  searchData,
  sortData,
  selectData,
} from '../../reducers/admin';

const schema = [
  {
    id: 3,
    name: 'accountNo',
    label: 'Account No',
  },
  {
    id: 4,
    name: 'accountName',
    label: 'Account Name',
  },
  {
    id: 1,
    name: 'idcardNo',
    label: 'ID Card No.',
    width: 150,
  },
  {
    id: 2,
    name: 'partnerName',
    label: 'Partner Name',
  },


  {
    id: 5,
    name: 'bankCode',
    label: 'Bank Code',
  },
  {
    id: 6,
    name: 'bankName',
    label: 'Bank Name',
  },
  {
    id: 7,
    name: 'branchName',
    label: 'Branch Name',
  },
];

const mapStateToProps = ({ admin }) => ({
  dataList: admin.get('dataList'),
  tableSchemas: schema,
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
