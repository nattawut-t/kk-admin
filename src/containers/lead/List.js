import { connect } from 'react-redux';
import moment from 'moment';
import List from '../../components/lead/List';
import {
  searchData,
  // sortData,
  // selectData,
} from '../../reducers/lead';
import { dateFormat } from '../../libs/config';

const schema = [
  {
    id: 1,
    name: 'Status',
    label: 'สถานะคำข้อกู้',
    widthPercentage: 10,
    icon: status => {
      let icon;

      switch (status) {
        case 'success':
          icon = 'check_circle';
          break;

        case 'rejected':
          icon = 'block';
          break;

        case 'submit_error':
          icon = 'priority_high';
          break;

        default:
          icon = 'account_circle';
          break;
      }

      return icon;
    },
  },
  // {
  //   id: 2,
  //   name: 'ID',
  //   label: 'เลขที่',
  //   widthPercentage: 10,
  // },
  {
    id: 3,
    name: 'CreatedAt',
    label: 'วันที่สร้างคำขอกู้',
    widthPercentage: 30,
    format: value => moment(value).format(dateFormat),
  },
  {
    id: 4,
    name: 'TicketID',
    label: 'เลขที่อ้างอิง',
    widthPercentage: 30,
  },
  {
    id: 5,
    name: 'loanAmount',
    label: 'จำนวนที่ขอกู้',
    widthPercentage: 25,
  },
  // {
  //   id: 5,
  //   name: 'birthDate',
  //   label: 'วันเกิด',
  //   widthPercentage: 80,
  // },
  // {
  //   id: 9,
  //   name: 'status',
  //   label: 'สถานภาพสมรส',
  //   widthPercentage: 100,
  // },
  // {
  //   id: 6,
  //   name: 'jobCompanyName',
  //   label: 'ชื่อบริษัท',
  //   widthPercentage: 120,
  // },
  // {
  //   id: 7,
  //   name: 'department',
  //   label: 'แผนก',
  //   widthPercentage: 100,
  // },
  // {
  //   id: 8,
  //   name: 'position',
  //   label: 'ตำแหน่ง',
  //   widthPercentage: 100,
  // },
  // {
  //   id: 9,
  //   name: 'provinceName',
  //   label: 'จังหวัด',
  //   widthPercentage: 100,
  // },
  // {
  //   id: 10,
  //   name: 'loanAmount',
  //   label: 'จำนวนขอกู้',
  //   widthPercentage: 80,
  // },
  // {
  //   id: 11,
  //   name: 'installmentNumber',
  //   label: 'งวด',
  //   widthPercentage: 80,
  // },
  // {
  //   id: 12,
  //   name: 'accumulateDebt',
  //   label: 'ภาระหนี้สินรวม',
  //   widthPercentage: 80,
  // },
  // {
  //   id: 13,
  //   name: 'creditCardTotal',
  //   label: 'เครดิตรวม',
  //   widthPercentage: 80,
  // },
];

const mapStateToProps = ({ lead }) => ({
  dataList: lead.get('dataList'),
  tableSchemas: schema,
});

const mapDispatchToProps = dispatch => ({
  loadData: () => dispatch(searchData()),
  // sortData: (sortField, sortDesc) => dispatch(sortData(sortField, sortDesc)),
  // selectData: rowIndex => dispatch(selectData(rowIndex)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);
