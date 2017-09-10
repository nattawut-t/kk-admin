import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const History = () =>
  <div>
    <div style={{ padding: '33px 0' }}>
      <h4>ประวัติการกู้</h4>
    </div>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderColumn>วันที่ส่งคำขอ</TableHeaderColumn>
          <TableHeaderColumn>จำนวนเงินขอกู้</TableHeaderColumn>
          <TableHeaderColumn>ผลิตภัณฑ์</TableHeaderColumn>
          <TableHeaderColumn>จำนวนงวด</TableHeaderColumn>
          <TableHeaderColumn>วันที่สิ้นสุด</TableHeaderColumn>
          <TableHeaderColumn>สถานะ</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableRowColumn>06/07/2560</TableRowColumn>
          <TableRowColumn>180,000</TableRowColumn>
          <TableRowColumn>P-Loan สินเชื่อส่วนบุคคล</TableRowColumn>
          <TableRowColumn>54</TableRowColumn>
          <TableRowColumn>26/07/2560</TableRowColumn>
          <TableRowColumn>อนุมัติ</TableRowColumn>
        </TableRow>
      </TableBody>
    </Table>
  </div>;

export default History;
