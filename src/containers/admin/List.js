import { connect } from 'react-redux';
import moment from 'moment';
import List from '../../components/shared/List';
import {
  searchData,
  sortData,
  select,
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
  {
    id: 2,
    name: 'ID',
    label: 'เลขที่',
    widthPercentage: 10,
  },
  {
    id: 3,
    name: 'dateReq',
    label: 'วันที่สร้างคำขอกู้',
    widthPercentage: 25,
    format: value => {
      console.log(value);
      return (value && Date.parse(value)) ? moment(value).format(dateFormat) : '';
    },
  },
  {
    id: 4,
    name: 'TicketID',
    label: 'เลขที่อ้างอิง',
    widthPercentage: 20,
  },
  {
    id: 5,
    name: 'nameTH',
    label: 'ชื่อ/นามสกุล (TH)',
    widthPercentage: 30,
  },
];

const mapStateToProps = ({ lead }) => ({
  dataList: lead.get('dataList'),
  tableSchemas: schema,
});

const mapDispatchToProps = dispatch => ({
  loadData: () => dispatch(searchData()),
  sortData: (sortField, sortDesc) => dispatch(sortData(sortField, sortDesc)),
  selectData: (id, callback) => dispatch(select(id, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);
