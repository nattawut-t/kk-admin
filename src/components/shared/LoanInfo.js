import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

const styles = {
  button: {
    margin: 12,
  },
  input: {
    width: '100%',
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
  marginBottom: {
    marginBottom: '20px',
  },
  sectionTitle: {
    backgroundColor: '#019ac9',
  },
  TitleText: {
    color: 'white',
  },
};

class LoanInfo extends Component {
  state = {
    loanAmount: '',
    installmentNumber: '',
    beneficiary: '',
    loanBeneficiaryName: '',
    accumulateDebt: '',
    creditCardTotal: '',
    paymentHistoryExists: '',
    pLoanApplicationHositoryExists: '',
    overdueDebtExists: '',
    bankAccountNo: '',
    bankAccountName: '',
    bankCode: '',
    bankName: '',
    bankBranchName: '',
  };

  componentWillMount() {
    const { data } = this.props;
    if (data) {
      this.setState(data);
    }
  }

  handleChange = () => {
  };

  render() {
    const {
      loanAmount,
      installmentNumber,
      beneficiary,
      // loanBeneficiaryName,
      accumulateDebt,
      creditCardTotal,
      paymentHistoryExists,
      pLoanApplicationHositoryExists,
      overdueDebtExists,
      bankAccountNo,
      bankAccountName,
      // bankCode,
      bankName,
      bankBranchName,
    } = this.state;

    return (
      <Card style={styles.marginBottom}>
        <div style={styles.sectionTitle}>
          <CardHeader
            title="ข้อมูลการกู้"
            titleStyle={styles.TitleText}
          />
        </div>
        <CardText>
          <div className="row">
            <div className="col-6" >
              <TextField
                id="loanAmount"
                name="loanAmount"
                value={loanAmount}
                floatingLabelText="จำนวนที่ต้องการกู้"
                onChange={e => this.handleChange(e)}
                fullWidth
                readOnly
              />
            </div>
            <div className="col-6" >
              <TextField
                id="installmentNumber"
                name="installmentNumber"
                floatingLabelText="ระยะเวลาผ่อนชำระ(งวด)"
                value={installmentNumber}
                onChange={e => this.handleChange(e)}
                readOnly
              />
            </div>
            <div className="col-12" >
              <TextField
                id="beneficiary"
                name="beneficiary"
                value={beneficiary}
                floatingLabelText="ผู้ได้รับผลประโยชน์ที่แท้จริง"
                onChange={e => this.handleChange(e)}
                fullWidth
                readOnly
              />
            </div>
            <div className="col-6" >
              <TextField
                id="accumulateDebt"
                name="accumulateDebt"
                value={accumulateDebt}
                floatingLabelText="รวมภาระหนี้สิน(บ้าน+รถ+สินเชื่อส่วนบุคคล)"
                onChange={e => this.handleChange(e)}
                fullWidth
                readOnly
              />
            </div>
            <div className="col-6" >
              <TextField
                id="creditCardTotal"
                name="creditCardTotal"
                floatingLabelText="ยอดบัตรเครดิตคงค้างเดือนล่าสุด"
                value={creditCardTotal}
                onChange={e => this.handleChange(e)}
                readOnly
              />
            </div>
          </div>
          <div className="row">
            <div className="col-4" >
              <TextField
                id="bankName"
                name="bankName"
                value={bankName}
                floatingLabelText="ธนาคาร"
                onChange={e => this.handleChange(e)}
                fullWidth
                readOnly
              />
            </div>
            <div className="col-8">
              <TextField
                id="bankBranchName"
                name="bankBranchName"
                value={bankBranchName}
                floatingLabelText="สาขา"
                onChange={e => this.handleChange(e)}
                fullWidth
                readOnly
              />
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <TextField
                id="bankAccountNo"
                name="bankAccountNo"
                value={bankAccountNo}
                floatingLabelText="เลขที่บัญชี"
                onChange={e => this.handleBankAccountNoChange(e)}
                fullWidth
                readOnly
              />
            </div>
            <div className="col-8">
              <TextField
                id="bankAccountName"
                name="bankAccountName"
                value={bankAccountName}
                floatingLabelText="ชื่อบัญชี"
                onChange={e => this.handleChange(e)}
                fullWidth
                readOnly
              />
            </div>
          </div>
          <div className="row">
            <div className="col-8">
              <label htmlFor="paymentHistoryExists">มีประวัติการชำระหนี้ใน 12 เดือน</label>
            </div>
            <div className="col-4">
              <div className="row" style={{ marginBottom: '0' }}>
                <RadioButtonGroup
                  name="paymentHistoryExists"
                  id="paymentHistoryExists"
                  defaultSelected={paymentHistoryExists}
                  className="col"
                  style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}
                  onChange={e => this.handleRadioButtonChange(e, 'paymentHistoryExists')}
                >
                  <RadioButton
                    value="1"
                    label="มี"
                    style={{ display: 'inline-block', width: '50%' }}
                    disabled
                  />
                  <RadioButton
                    value="0"
                    label="ไม่มี"
                    style={{ display: 'inline-block', width: '50%' }}
                    disabled
                  />
                </RadioButtonGroup>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-8">
              <label htmlFor="pLoanApplicationHositoryExists">มีประวัติการสมัครสินเชื่อส่วนบุคคล</label>
            </div>
            <div className="col-4">
              <div className="row" style={{ marginBottom: '0' }}>
                <RadioButtonGroup
                  name="pLoanApplicationHositoryExists"
                  id="pLoanApplicationHositoryExists"
                  defaultSelected={pLoanApplicationHositoryExists}
                  className="col"
                  style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}
                  onChange={e => this.handleRadioButtonChange(e, 'pLoanApplicationHositoryExists')}
                >
                  <RadioButton
                    value="1"
                    label="มี"
                    style={{ display: 'inline-block', width: '50%' }}
                    disabled
                  />
                  <RadioButton
                    value="0"
                    label="ไม่มี"
                    style={{ display: 'inline-block', width: '50%' }}
                    disabled
                  />
                </RadioButtonGroup>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-8">
              <label htmlFor="overdueDebtExists">ไม่เคยมีการติดค้างชำระหนี้ใน 12 เดือนล่าสุด</label>
            </div>
            <div className="col-4">
              <div className="row" style={{ marginBottom: '0' }}>
                <RadioButtonGroup
                  name="overdueDebtExists"
                  id="overdueDebtExists"
                  defaultSelected={overdueDebtExists}
                  className="col"
                  style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}
                  onChange={e => this.handleRadioButtonChange(e, 'overdueDebtExists')}
                >
                  <RadioButton
                    value="1"
                    label="เคย"
                    style={{ display: 'inline-block', width: '50%' }}
                    disabled
                  />
                  <RadioButton
                    value="0"
                    label="ไม่เคย"
                    style={{ display: 'inline-block', width: '50%' }}
                    disabled
                  />
                </RadioButtonGroup>
              </div>
            </div>
          </div>
        </CardText>
      </Card>
    );
  }
}

LoanInfo.propTypes = {
  data: PropTypes.object,
};

LoanInfo.defaultProps = {
  data: null,
};

export default withRouter(LoanInfo);
