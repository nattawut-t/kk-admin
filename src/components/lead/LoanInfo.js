import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Snackbar from 'material-ui/Snackbar';
import { Card, CardHeader, CardText } from 'material-ui/Card';

import Bank from '../shared/Bank';

const styles = {
  button: {
    margin: 12,
  },
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

const requiredMessage = (required, value) => (required && !value) ? 'กรุณากรอกข้อมูล' : '';

class LoanInfo extends Component {

  componentWillMount() {
    const { data } = this.props;
    window.scrollTo(0, 0);

    if (data) {
      this.setState(data,
        () => {
          this.initialRequireMessage();
          const valid = this.validate();
          this.setState({ valid });
        });
    } else {
      this.initialState();
      this.initialRequireMessage();
      const valid = this.validate();
      this.setState({ valid });
    }
  }

  initialState = () => {
    const env = process.env.NODE_ENV;

    switch (env) {
      case 'test':
        this.state = {
          loanAmount: 100000,
          loanAmountMsg: '',
          installmentNumber: '12',
          installmentNumberMsg: '',
          beneficiary: 'others',
          loanBeneficiaryName: 'Panit',
          loanBeneficiaryNameMsg: '',
          accumulateDebt: 10000,
          accumulateDebtMsg: '',
          creditCardTotal: 10000,
          creditCardTotalMsg: '',
          paymentHistoryExists: '1',
          pLoanApplicationHositoryExists: '0',
          overdueDebtExists: '1',
          bankAccountNo: '',
          bankAccountNoMsg: '',
          bankAccountName: '',
          bankAccountNameMsg: '',
          bankCode: '',
          bankCodeMsg: '',
          bankName: '',
          bankBranchName: '',
          valid: false,
        };
        break;

      default:
        this.state = {
          loanAmount: 0,
          loanAmountMsg: '',
          installmentNumber: 0,
          installmentNumberMsg: '',
          beneficiary: 'myself',
          loanBeneficiaryName: '',
          loanBeneficiaryNameMsg: '',
          accumulateDebt: 0,
          accumulateDebtMsg: '',
          creditCardTotal: 0,
          creditCardTotalMsg: '',
          paymentHistoryExists: '0',
          pLoanApplicationHositoryExists: '0',
          overdueDebtExists: '0',
          bankAccountNo: '',
          bankAccountNoMsg: '',
          bankAccountName: '',
          bankAccountNameMsg: '',
          bankCode: '',
          bankCodeMsg: '',
          bankName: '',
          bankBranchName: '',
          valid: false,
        };
        break;
    }
  };

  validate = () => {
    const keys = [
      'loanAmount',
      'installmentNumber',
      // 'bankAccountNo',
      // 'bankAccountName',
      // 'bankBranchName',
    ];
    const invalid = keys
      .map(key => ({
        key,
        value: this.state[key],
      }))
      .find(({ value }) => !value);

    const { beneficiary, loanBeneficiaryName } = this.state;
    const _valid = beneficiary === 'myself' || loanBeneficiaryName;

    return !invalid && _valid;
  }

  initialRequireMessage = () => {
    const keys = [
      'loanAmount',
      'installmentNumber',
      // 'bankAccountNo',
      // 'bankAccountName',
      // 'bankBranchName',
    ];
    keys
      .map(key => ({
        key,
        value: this.state[key],
      }))
      .forEach(({ key, value }) => {
        const msgKey = `${key}Msg`;
        const msg = requiredMessage(true, value);
        this.setState({ [msgKey]: msg });
      });
  };

  handleNumberChange = (e, required = false) => {
    const { name, value } = e.target;
    const msgKey = `${name}Msg`;
    const msg = requiredMessage(required, value);
    const number = Number.parseFloat(value) || 0;

    this.setState({
      [name]: number,
      [msgKey]: msg,
      [`${name}Valid`]: !required || (required && value >= 0),
    }, () => {
      const valid = this.validate();
      this.setState({ valid });
    });
  };

  handleChange = (e, required = false) => {
    const { name, value } = e.target;
    const msgKey = `${name}Msg`;
    const msg = requiredMessage(required, value);

    this.setState({
      [name]: value,
      [msgKey]: msg,
    }, () => {
      const valid = this.validate();
      this.setState({ valid });
    });
  };

  handleBankAccountNoChange = (e, required = false) => {
    const { name, value } = e.target;
    const msgKey = `${name}Msg`;
    let msg;

    if (required && !value.trim()) {
      msg = 'กรุณากรอกข้อมูล';
    } else {
      msg = !value.trim() || /^[0-9]{10}$/.test(value)
        ? ''
        : 'รูปแบบไม่ถูกต้อง';
    }

    this.setState({
      [name]: value,
      [msgKey]: msg,
    }, () => {
      const valid = this.validate();
      this.setState({ valid });
    });
  };

  handleBeneficiaryNameChange = (e, required = false) => {
    const { name, value } = e.target;
    const msgKey = `${name}Msg`;
    const { beneficiary } = this.state;
    const msg = beneficiary === 'others' ? requiredMessage(required, value) : '';

    this.setState({
      [name]: value,
      [msgKey]: msg,
      // [`${name}Valid`]: !required || (required && value),
    }, () => {
      const valid = this.validate();
      this.setState({ valid });
    });
  };

  handleLookupChange = (e, index, value) => {
    this.setState({
      installmentNumber: value,
      installmentNumberMsg: requiredMessage(true, value),
    }, () => {
      const valid = this.validate();
      this.setState({ valid });
    });
  };

  handleBeneficiaryChange = () => {
    const { beneficiary } = this.state;
    this.setState({ beneficiary: beneficiary === 'myself' ? 'others' : 'myself' },
      () => {
        const { beneficiary, loanBeneficiaryName } = this.state;

        this.handleBeneficiaryNameChange({
          target: {
            name: 'loanBeneficiaryName',
            value: loanBeneficiaryName,
          },
        }, true);

        if (beneficiary === 'myself') {
          this.setState({ loanBeneficiaryName: '' });
        }
      },
    );
  };

  handleRadioButtonChange = e => {
    const { target: { name, value } } = e;
    this.setState({ [name]: value });
  };

  handleBankChange = (nameField, codeField, code, name) => {
    this.setState({
      [codeField]: code,
      [nameField]: name,
    }, () => {
      console.log(this.state.bankCode, this.state.bankName);
      const valid = this.validate();
      this.setState({ valid });
    });
  };

  handleBack = () => {
    const { history } = this.props;
    history.push('/personal-info');
  };

  handleNext = e => {
    e.preventDefault();

    const {
      loanAmount,
      installmentNumber,
      beneficiary,
      loanBeneficiaryName,
      accumulateDebt,
      creditCardTotal,
      paymentHistoryExists,
      pLoanApplicationHositoryExists,
      overdueDebtExists,
      bankAccountNo,
      bankAccountName,
      bankCode,
      bankName,
      bankBranchName,
    } = this.state;

    const data = {
      loanAmount,
      installmentNumber,
      beneficiary,
      loanBeneficiaryName,
      accumulateDebt,
      creditCardTotal,
      paymentHistoryExists,
      pLoanApplicationHositoryExists,
      overdueDebtExists,
      bankAccountNo,
      bankAccountName,
      bankCode,
      bankName,
      bankBranchName,
    };

    const { completeLoanInfo, history } = this.props;
    completeLoanInfo(data, () => history.push('/additional-info'));

    // const { history } = this.props;
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
      paymentHistoryExists,
      pLoanApplicationHositoryExists,
      overdueDebtExists,
      bankAccountNo,
      bankAccountNoMsg,
      bankAccountName,
      bankAccountNameMsg,
      bankName,
      bankBranchName,
      bankBranchNameMsg,
      valid,
    } = this.state;

    const { message } = this.props;

    return (
      <div>
        <form onSubmit={this.handleNext}>
          <Card style={styles.marginBottom}>
            <div style={styles.sectionTitle}>
              <CardHeader
                title="ความต้องการกู้"
                titleStyle={styles.TitleText}
              />
            </div>
            <CardText>
              <div className="row">
                <div className="col-4">
                  <TextField
                    id="loanAmount"
                    name="loanAmount"
                    value={loanAmount}
                    floatingLabelText="จำนวนที่ต้องการกู้"
                    onChange={e => this.handleNumberChange(e, true)}
                    errorText={loanAmountMsg}
                    fullWidth
                  />
                </div>
                <div className="col-8" style={{ verticalAlign: 'middle' }}>
                  <span>
                    โปรดระบุจำนวนเงินที่ต้องการกู้ไม่ต่ำกว่า 20,000 บาท
                    และสุงสุด 5 เท่าของรายได้เฉลี่ยต่อเดือน ไม่เกิน 1,000,000 บาท
                    อนึ่งธนาคารจะพิจารณาให้วงเงินกู้ตามจำนวนที่ธนาคารเห็นสมควร
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <SelectField
                    id="installmentNumber"
                    name="installmentNumber"
                    value={installmentNumber}
                    onChange={this.handleLookupChange}
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
                  <label htmlFor="beneficiary">ผู้ได้รับผลประโยชน์ที่แท้จริง</label>
                </div>
                <div className="col-3">
                  <RadioButtonGroup
                    name="beneficiary"
                    defaultSelected={beneficiary}
                    onChange={this.handleBeneficiaryChange}
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
                <div className="col-6">
                  <TextField
                    id="loanBeneficiaryName"
                    name="loanBeneficiaryName"
                    value={loanBeneficiaryName}
                    required
                    floatingLabelText="ผู้รับผลประโยชน์ที่แท้จริง"
                    onChange={e => this.handleBeneficiaryNameChange(e)}
                    errorText={loanBeneficiaryNameMsg}
                    disabled={beneficiary === 'myself'}
                    fullWidth
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12">&nbsp;</div>
              </div>
              <div className="row">
                <div className="col-12">
                  <span>
                    บุคคลที่ได้รับผลประโยชน์จากการทำธุรกรรมที่แท้จริง หมายถึง
                    บุคคลธรรมดาผู้เป็นเจ้าของบัญชีที่แท้จริง หรือ
                    มีอำนาจควบคุมความสัมพันธ์ทางธุรกิจของลูกค้ากับสถาบันการเงิน
                    หรือบุคคลที่ลูกค้าทำธุรกรรมแทน หรือ บุคคลผู้ใช้อำนาจควบคุมนิติบุคคล
                  </span>
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
                    onChange={e => this.handleNumberChange(e, true)}
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
                    onChange={e => this.handleNumberChange(e, true)}
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
                title="ข้อมูลบัญชี"
                titleStyle={styles.TitleText}
              />
            </div>
            <CardText>
              <div className="row">
                <div className="col-4" >
                  <Bank
                    id="bank"
                    name="bank"
                    nameField="bankName"
                    valueField="bankCode"
                    value={bankName}
                    label="ธนาคาร"
                    onSelectItem={this.handleBankChange}
                  />
                </div>
                <div className="col-8">
                  <TextField
                    id="bankBranchName"
                    name="bankBranchName"
                    value={bankBranchName}
                    floatingLabelText="สาขา"
                    onChange={e => this.handleChange(e)}
                    errorText={bankBranchNameMsg}
                    maxLength="250"
                    fullWidth
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
                    errorText={bankAccountNoMsg}
                    maxLength="10"
                    fullWidth
                  />
                </div>
                <div className="col-8">
                  <TextField
                    id="bankAccountName"
                    name="bankAccountName"
                    value={bankAccountName}
                    floatingLabelText="ชื่อบัญชี"
                    onChange={e => this.handleChange(e)}
                    errorText={bankAccountNameMsg}
                    maxLength="250"
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
                      defaultSelected={paymentHistoryExists}
                      className="col"
                      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}
                      onChange={e => this.handleRadioButtonChange(e, 'paymentHistoryExists')}
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
                      defaultSelected={pLoanApplicationHositoryExists}
                      className="col"
                      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}
                      onChange={e => this.handleRadioButtonChange(e, 'pLoanApplicationHositoryExists')}
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
                label="กลับ"
                labelPosition="before"
                style={styles.button}
                containerElement="label"
                onClick={this.handleBack}
              />
              <RaisedButton
                type="submit"
                label="ดำเนินการต่อ"
                labelPosition="before"
                primary
                style={styles.button}
                disabled={!valid}
                icon={<FontIcon className="muidocs-icon-custom-github" />}
              />
            </div>
          </div>
        </form>
        <Snackbar
          open={message !== ''}
          message={message}
          autoHideDuration={4000}
        />
      </div>
    );
  }
}

LoanInfo.propTypes = {
  message: PropTypes.string,
  history: PropTypes.object.isRequired,
  data: PropTypes.object,
  completeLoanInfo: PropTypes.func.isRequired,
};

LoanInfo.defaultProps = {
  message: '',
  data: null,
};

export default withRouter(LoanInfo);
