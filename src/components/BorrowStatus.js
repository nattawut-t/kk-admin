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
        <div className="col-12">เลขที่เอกสารอ้างอิง</div>
        <div className="col-3">฿ 1,000.00</div>
        <div className="col-3">P-Loan สินเชื่อส่วนบุคคล</div>
        <div className="col-3">11 งวด</div>
        <div className="col-3">
          <RaisedButton
            label="รายละเอียด"
            labelPosition="before"
            primary
            style={styles.button}
            icon={<FontIcon className="muidocs-icon-custom-github" />}
            onClick={this.handleNext}
          />
        </div>
      </Paper>
    </div>
  </div>;

export default BorrowStatus;
