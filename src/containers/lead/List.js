import { connect } from 'react-redux';
import moment from 'moment';

import List from '../../components/lead/List';
import { searchData, select } from '../../reducers/lead';
import { loadDocuments } from '../../reducers/document';
import { edit, setId } from '../../reducers/draft';
import { handleChange } from '../../reducers/search';
import { dateFormat } from '../../libs/config';

const schema = [
  {
    id: 1,
    name: 'Status',
    sortKey: 'status',
    label: 'สถานะ',
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
    name: 'SubmitTo',
    // sortKey: 'submit_to',
    label: 'ช่องทางการกู้',
    widthPercentage: 15,
  },
  {
    id: 3,
    name: 'ID',
    sortKey: 'id',
    label: 'เลขที่',
    widthPercentage: 10,
  },
  {
    id: 4,
    name: 'dateReq',
    sortKey: 'dateReq',
    label: 'วันที่สร้างคำขอกู้',
    widthPercentage: 15,
    format: value => value ? moment(value).format(dateFormat) : '',
  },
  {
    id: 5,
    name: 'TicketID',
    sortKey: 'ticket_id',
    label: 'รหัสอ้างอิง',
    widthPercentage: 20,
  },
  {
    id: 6,
    name: 'nameTH',
    sortKey: 'firstNameTH',
    label: 'ชื่อ / นามสกุล (TH)',
    widthPercentage: 30,
  },
];

const mapStateToProps = ({ lead, notification, search }) => ({
  dataList: lead.get('dataList'),
  loading: notification.loading,
  tableSchemas: schema,
  orderBy: search.orderBy,
  orderType: search.orderType,
});

const mapDispatchToProps = dispatch => ({
  searchData: () => dispatch(searchData()),
  handleChange: (name, value) => dispatch(handleChange(name, value)),
  selectData: (id, callback) => dispatch(select(id, callback)),
  edit: (id, callback) => dispatch(edit(id, callback)),
  setId: id => dispatch(setId(id)),
  loadDocuments: (id, callback) => dispatch(loadDocuments(id, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);
