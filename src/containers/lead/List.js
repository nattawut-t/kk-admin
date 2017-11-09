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
    label: 'สถานะ (operation)',
    widthPercentage: 15,
    type: 'icon',
    map: status => {
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
    name: 'KKStatus',
    // sortKey: 'kk_status',
    label: 'สถานะ (ลูกค้า)',
    widthPercentage: 15,
    map: status => {
      switch (status) {
        // KK
        case '00': return 'สนใจ';
        case '01': return 'ติดต่อไม่ได้';
        case '02': return 'ติดต่อได้ รอเอกสาร';
        case '03': return 'ติดต่อได้ให้โทรกลับ';
        case '04': return 'ติดตามเอกสาร';
        case '05': return 'รอผลการพิจารณา';
        case '06': return 'อนุมัติ - ตามเสนอ';
        case '07': return 'อนุมัติ - แก้ไขวงเงิน(ส่งกลับแก้ไข)';
        case '08': return 'ปฎิเสธลูกค้า (Reject)';
        case '09': return 'ลูกค้ายกเลิก (Cancel)';
        case '10': return 'สำเร็จ (Success)';
        case '11': return 'ส่งกลับแก้ไข';
        case '12': return 'รอผลพิจารณา COC';
        case '13': return 'ส่งกลับแก้ไข COC';
        case '14': return 'อยู่ระหว่างดำเนินการ';
        case '15': return 'รอติดต่อลูกค้า';
        case '16': return 'Outbound';
        // ITTP
        case 'wait_consent': return 'รอเอกสารยอมรับ';
        case 'approved': return 'อนุมัติ';
        case 'rejected': return 'ปฏิเสธ';
        case 'disbursted': return 'โอนเงินแล้ว';
        //
        default: return 'Unknown';
      }
    },
  },
  {
    id: 3,
    name: 'SubmitTo',
    // sortKey: 'submit_to',
    label: 'ช่องทางการกู้',
    widthPercentage: 15,
  },
  {
    id: 4,
    name: 'ID',
    sortKey: 'id',
    label: 'เลขที่',
    widthPercentage: 10,
  },
  {
    id: 5,
    name: 'dateReq',
    sortKey: 'dateReq',
    label: 'วันที่สร้างคำขอกู้',
    widthPercentage: 15,
    format: value => value ? moment(value).format(dateFormat) : '',
  },
  {
    id: 6,
    name: 'TicketID',
    sortKey: 'ticket_id',
    label: 'รหัสอ้างอิง',
    widthPercentage: 15,
  },
  {
    id: 7,
    name: 'nameTH',
    sortKey: 'firstNameTH',
    label: 'ชื่อ / นามสกุล (TH)',
    widthPercentage: 20,
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
