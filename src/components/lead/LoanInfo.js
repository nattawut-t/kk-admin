import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { Card, CardHeader, CardText } from 'material-ui/Card';

const styles = {
  marginBottom: {
    marginBottom: '20px',
  },
  sectionTitle: {
    backgroundColor: 'rgb(0, 188, 212)',
  },
  TitleText: {
    color: 'white',
  },
};

class LoanInfo extends Component {
  state = {
    loanAmount: '',
    loanAmountMsg: '',
    installmentNumber: '',
    installmentNumberMsg: '',
    beneficiary: 'myself',
    loanBeneficiaryName: '',
    loanBeneficiaryNameMsg: '',
    accumulateDebt: '',
    accumulateDebtMsg: '',
    creditCardTotal: '',
    creditCardTotalMsg: '',
    valid: false,
  };

  validate = () => {
    const { prefixTH } = this.state;
    console.log('>>> prefixTH: ', prefixTH);

    const keys = [
      'loanAmount',
      'loanAmountMsg',
      'installmentNumber',
      'installmentNumberMsg',
      'loanBeneficiaryName',
      'loanBeneficiaryNameMsg',
      'accumulateDebt',
      'accumulateDebtMsg',
      'creditCardTotal',
      'creditCardTotalMsg',
    ];

    const invalid = keys
      .map(key => ({
        key,
        value: this.state[key],
      }))
      .find(({ key, value }) => {
        console.log('>>> validate.find: ', key, value);
        return !value;
      });

    console.log('>>> invalid: ', invalid);

    return !invalid;
  }

  handleChange = (e, required = false, label = '') => {
    const { name, value } = e.target;
    const msgKey = `${name}Msg`;
    let msg = this.state[msgKey];

    console.log('>>> handleChange: ', name, value, required);

    if (msg === '') {
      msg = (required && !value)
        ? `กรุณากรอก ${label}`
        : '';

      this.setState({ [msgKey]: msg });
    }

    this.setState({
      [name]: value,
      [`${name}Valid`]: !required || (required && value),
    }, () => {
      const valid = this.validate();
      this.setState({ valid });
    });
  };

  render() {
    const {
      loanAmount,
      loanAmountMsg,
      installmentNumber,
      installmentNumberMsg,
      beneficiary,
      loanBeneficiaryName,
      loanBeneficiaryNameMsg,
      accumulateDebt,
      accumulateDebtMsg,
      creditCardTotal,
      creditCardTotalMsg,
      valid,
    } = this.state;

    return (
      <div>
        <form className="crud-form">
          <Card style={styles.marginBottom}>
            <div style={styles.sectionTitle}>
              <CardHeader
                title="ความต้องการกู้"
                titleStyle={styles.TitleText}
              />
            </div>
            <CardText>
              <div className="row">
                <div className="col">
                  <TextField
                    id="loanAmount"
                    name="loanAmount"
                    value={loanAmount}
                    floatingLabelText="จำนวนที่ต้องการกู้"
                    onChange={e => this.handleChange(e, true)}
                    errorText={loanAmountMsg}
                    fullWidth
                  />
                </div>
                <div className="col">
                  <SelectField
                    id="installmentNumber"
                    name="installmentNumber"
                    value={installmentNumber}
                    onChange={e => this.handleChange(e, true)}
                    errorText={installmentNumberMsg}
                    floatingLabelText="ระยะเวลาผ่อนชำระ(งวด)"
                    fullWidth
                  >
                    <MenuItem value="12" primaryText="12 งวด" />
                    <MenuItem value="18" primaryText="18 งวด" />
                    <MenuItem value="24" primaryText="24 งวด" />
                    <MenuItem value="30" primaryText="30 งวด" />
                    <MenuItem value="36" primaryText="36 งวด" />
                    <MenuItem value="42" primaryText="42 งวด" />
                    <MenuItem value="48" primaryText="48 งวด" />
                    <MenuItem value="60" primaryText="60 งวด" />
                  </SelectField>
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <RadioButtonGroup
                    name="beneficiary"
                    defaultSelected={beneficiary}
                    style={{ display: 'flex' }}
                  >
                    <RadioButton
                      value="myself"
                      label="ตนเอง"
                    />
                    <RadioButton
                      value="others"
                      label="ผู้อื่น(โปรดระบุ)"
                    />
                  </RadioButtonGroup>
                </div>
                <div className="col-3" />
                <div className="col-6">
                  <TextField
                    id="loanBeneficiaryName"
                    name="loanBeneficiaryName"
                    value={loanBeneficiaryName}
                    required
                    floatingLabelText="ผู้รับผลประโยชน์ที่แท้จริง"
                    onChange={e => this.handleChange(e)}
                    errorText={loanBeneficiaryNameMsg}
                    fullWidth
                  />
                </div>
              </div>
            </CardText>
          </Card>

          <Card style={styles.marginBottom}>
            <div style={styles.sectionTitle}>
              <CardHeader
                title="ประวัติการชำระหนี้"
                titleStyle={styles.TitleText}
              />
            </div>
            <CardText>
              <div className="row">
                <div className="col-6">
                  <TextField
                    id="accumulateDebt"
                    name="accumulateDebt"
                    value={accumulateDebt}
                    floatingLabelText="รวมภาระหนี้สิน(บ้าน+รถ+สินเชื่อส่วนบุคคล)"
                    onChange={e => this.handleChange(e, true)}
                    errorText={accumulateDebtMsg}
                    fullWidth
                  />
                </div>
                <div className="col-6">
                  <TextField
                    id="creditCardTotal"
                    name="creditCardTotal"
                    value={creditCardTotal}
                    floatingLabelText="ยอดบัตรเครดิตคงค้างเดือนล่าสุด"
                    onChange={e => this.handleChange(e, true)}
                    errorText={creditCardTotalMsg}
                    fullWidth
                  />
                </div>
              </div>
            </CardText>
          </Card>

          <Card style={styles.marginBottom}>
            <div style={styles.sectionTitle}>
              <CardHeader
                title="ข้อมูลเพิ่มเติม"
                titleStyle={styles.TitleText}
              />
            </div>
            <CardText>
              <div className="row">
                <div className="col-8">
                  <label htmlFor="paymentHistoryExists">มีประวัติการชำระหนี้ใน 12 เดือน</label>
                </div>
                <div className="col-4">
                  <div className="row" style={{ marginBottom: '0' }}>
                    <RadioButtonGroup
                      name="paymentHistoryExists"
                      id="paymentHistoryExists"
                      defaultSelected="0"
                      className="col"
                      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}
                    >
                      <RadioButton
                        value="1"
                        label="มี"
                        style={{ display: 'inline-block', width: '50%' }}
                      />
                      <RadioButton
                        value="0"
                        label="ไม่มี"
                        style={{ display: 'inline-block', width: '50%' }}
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
                      defaultSelected="0"
                      className="col"
                      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}
                    >
                      <RadioButton
                        value="1"
                        label="มี"
                        style={{ display: 'inline-block', width: '50%' }}
                      />
                      <RadioButton
                        value="0"
                        label="ไม่มี"
                        style={{ display: 'inline-block', width: '50%' }}
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
                      defaultSelected="0"
                      className="col"
                      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}
                    >
                      <RadioButton
                        value="1"
                        label="เคย"
                        style={{ display: 'inline-block', width: '50%' }}
                      />
                      <RadioButton
                        value="0"
                        label="ไม่เคย"
                        style={{ display: 'inline-block', width: '50%' }}
                      />
                    </RadioButtonGroup>
                  </div>
                </div>
              </div>
            </CardText>
          </Card>

          <div className="row">
            <div className="col-12" style={{ textAlign: 'right' }}>
              <RaisedButton
                label="Cancel"
                labelPosition="กลับ"
                style={styles.button}
                containerElement="label"
              />
              <RaisedButton
                label="Next"
                labelPosition="ดำเนินการต่อ"
                primary
                style={styles.button}
                disabled={!valid}
                icon={<FontIcon className="muidocs-icon-custom-github" />}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

// LoanInfo.propTypes = {
//   loading: PropTypes.bool,
// };

// LoanInfo.defaultProps = {
//   loading: false,
// };


export default LoanInfo;
