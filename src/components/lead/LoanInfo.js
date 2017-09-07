import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { Card, CardHeader, CardText } from 'material-ui/Card';
// import PrefixEn from '../shared/PrefixEn';

const styles = {
  button: {
    margin: 12,
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
};

class LoanInfo extends Component {
  state = {
    loanAmount: '',
    installmentNumber: '',
    beneficiary: 'myself',
    loanBeneficiaryName: '',
    valid: false,
  };

  validate = () => {
    const invalid = Object.keys(this.state)
      .map(key => this.state[key])
      .find(value => !value);

    return !invalid;
  }

  handleChange = e => {
    const { name, value } = e.target;
    const required = this.state[`${name}Required`];

    this.setState({
      [name]: value,
      [`${name}Valid`]: !required || (required && value),
    },
      this.setState({ valid: this.validate() }),
    );

    // console.log('>>> entry: ', entry[name]);
  };
  render() {
    const {
      loanAmount,
      installmentNumber,
      beneficiary,
      loanBeneficiaryName,
      valid,
    } = this.state;

    return (
      <div>
        <form className="crud-form" onSubmit={e => this.handleAction(e, 'submit')}>
          <div className="row">
            <div className="col">
              <TextField
                id="loanAmount"
                name="loanAmount"
                value={loanAmount}
                required
                floatingLabelText="จำนวนที่ต้องการกู้"
                onChange={this.handleChange}
                fullWidth
              />
            </div>
            <div className="col">
              <SelectField
                id="installmentNumber"
                name="installmentNumber"
                value={installmentNumber}
                onChange={this.handleChange}
                required
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
                defaultSelected={{ beneficiary }}
                style={{ display: 'flex' }}
              >
                <RadioButton
                  value="myself"
                  label="ตนเอง"
                />
                <RadioButton
                  value="other"
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
                onChange={this.handleChange}
                fullWidth
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12" style={{ textAlign: 'right' }}>
              <RaisedButton
                label="Cancel"
                labelPosition="before"
                style={styles.button}
                containerElement="label"
              />
              <RaisedButton
                label="Next"
                labelPosition="before"
                primary
                style={styles.button}
                disabled={!valid}
                icon={<FontIcon className="muidocs-icon-custom-github" />}
              />
            </div>
          </div>
          <Card>
            <CardHeader
              title="Without Avatar"
              subtitle="Subtitle"
              actAsExpander
              showExpandableButton
              titleColor="red"
              titleStyle={{ backgroundColor: 'blue' }}
            />
            <CardText expandable>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
              Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
              Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
            </CardText>
          </Card>
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
