import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

const styles = {
  paper: {
    height: 'auto',
    width: '100%',
    textAlign: 'left',
    display: 'inline-block',
    padding: '17px 0 22px 25px',
  },
  button: {
    margin: 12,
  },
};

const BorrowStatus = () =>
  <div className="row">
    <div
      className="col-12"
      style={{ padding: '33px 14px' }}
    >
      <h4>สถานะการกู้</h4>
    </div>
    <div className="col-12">
      <Paper style={styles.paper} zDepth={1}>
        <div className="col-9">เลขที่เอกสารอ้างอิง: 0000000001</div>
        <div className="col-3 mobile-btn-upload">
          <RaisedButton
            label="รายละเอียด"
            labelPosition="before"
            primary
            style={styles.button}
            icon={<FontIcon className="muidocs-icon-custom-github" />}
            onClick={this.handleNext}
          />
        </div>
        <div className="col-3" style={{ marginTop: -10 }}>฿ 1,000.00</div>
        <div className="col-3" style={{ marginTop: -10 }}>P-Loan สินเชื่อส่วนบุคคล</div>
        <div className="col-3" style={{ marginTop: -10 }}>11 งวด</div>
      </Paper>
    </div>
  </div>;

export default BorrowStatus;
