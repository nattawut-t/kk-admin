import React, { Component } from 'react';
import moment from 'moment';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import DatePicker from 'material-ui/DatePicker';

import PrefixTh from '../shared/PrefixTh';
import PrefixEn from '../shared/PrefixEn';
import Identity from '../shared/Identity';

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

const requiredMessage = (required, value) => (required && !value) ? 'กรุณากรอก' : '';

class PersonalInfo extends Component {
  // state = {
  //   dateReq: moment().format('YYYY-MM-DD'),
  //   prefixTH: '',
  //   firstNameTH: '',
  //   firstNameTHmsg: '',
  //   lastNameTH: '',
  //   lastNameTHmsg: '',
  //   prefixEn: '',
  //   firstNameEN: '',
  //   firstNameENmsg: '',
  //   lastNameEN: '',
  //   lastNameENmsg: '',
  //   idCard: '',
  //   idCardmsg: '',
  //   idCardValid: true,
  //   dateExp: {},
  //   dateExpmsg: '',
  //   valid: false,
  // };
  state = {
    dateReq: moment().format('YYYY-MM-DD'),
    prefixTH: '',
    firstNameTH: 'ณัฐ',
    firstNameTHmsg: '',
    lastNameTH: 'ธรรม',
    lastNameTHmsg: '',
    prefixEn: 'Mr.',
    firstNameEN: 'Nat',
    firstNameENmsg: '',
    lastNameEN: 'Tam',
    lastNameENmsg: '',
    idCard: '',
    idCardmsg: '',
    idCardValid: true,
    dateExp: null,
    dateExpmsg: '',
    valid: false,
  };

  componentWillMount() {
    this.initialErrorMessage();
  }

  validate = () => {
    console.log('>>> validate');
    const keys = [
      'dateReq',
      'prefixTH',
      'firstNameTH',
      'lastNameTH',
      'prefixEn',
      'firstNameEN',
      'lastNameEN',
      'idCard',
      'idCardValid',
      'dateExp',
    ];
    const invalid = keys
      .map(key => ({
        key,
        value: this.state[key],
      }))
      .find(({ value }) => {
        console.log('');
        return !value;
      });

    console.log('>>> invalid: ', invalid);

    return !invalid;
  }

  initialErrorMessage = () => {
    const keys = [
      'prefixTH',
      'firstNameTH',
      'lastNameTH',
      'prefixEn',
      'firstNameEN',
      'lastNameEN',
      'idCard',
      'dateExp',
    ];
    keys
      .map(key => ({
        key,
        value: this.state[key],
      }))
      .forEach(({ key, value }) => {
        const msgKey = `${key}msg`;
        const msg = requiredMessage(true, value);
        this.setState({ [msgKey]: msg });
      });
  };

  handleChange = (e, required = false) => {
    const { name, value } = e.target;
    const msgKey = `${name}msg`;
    let msg = this.state[msgKey];

    console.log('>>> handleChange: ', name, value);

    if (msg === '') {
      msg = requiredMessage(required, value);
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

  handleDateExpChange = (e, value) => {
    console.log('>>> handleDateExpChange:');
    this.setState({ dateExp: value },
      () => {
        const msg = requiredMessage(true, value);
        this.setState({ dateExpmsg: msg },
          () => {
            const valid = this.validate();
            this.setState({ valid });
          },
        );
      });
  };

  handleIdentityChange = (name, value, errorMessage = '') => {
    const msgKey = `${name}msg`;
    const msg = this.state[msgKey];

    if (msg === '') {
      this.setState({ [msgKey]: errorMessage });
    }

    this.setState({
      [name]: value,
      [`${name}Valid`]: !errorMessage,
      // [`${name}Valid`]: !required || (required && value),
    }, () => {
      const valid = this.validate();
      this.setState({ valid });
    });
  };

  handleLookupChange = (value, text, key) => {
    this.setState({ [key]: value }, () => {
      const valid = this.validate();
      this.setState({ valid });
    });
  };

  render() {
    const {
      dateReq,
      prefixTH,
      firstNameTH,
      firstNameTHmsg,
      lastNameTH,
      lastNameTHmsg,
      prefixEn,
      firstNameEN,
      firstNameENmsg,
      lastNameEN,
      lastNameENmsg,
      idCard,
      idCardmsg,
      dateExp,
      dateExpmsg,
      valid,
    } = this.state;

    return (
      <div>
        <form>
          <div className="row">
            <div className="col-12">
              <TextField
                id="dateReq"
                name="dateReq"
                value={dateReq}
                floatingLabelText="วันที่คำขอ"
                fullWidth
                disabled
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <PrefixTh
                id="prefixTH"
                name="prefixTH"
                value={prefixTH}
                label="คำนำหน้าชื่อ (TH)"
                required
                onSelectItem={this.handleLookupChange}
              />
            </div>
            <div className="col">
              <TextField
                id="firstNameTH"
                name="firstNameTH"
                value={firstNameTH}
                floatingLabelText="ชื่อ (TH)"
                errorText={firstNameTHmsg}
                onChange={e => this.handleChange(e, true)}
                fullWidth
              />
            </div>
            <div className="col">
              <TextField
                id="lastNameTH"
                name="lastNameTH"
                value={lastNameTH}
                floatingLabelText="นามสกุล (TH)"
                errorText={lastNameTHmsg}
                onChange={e => this.handleChange(e, true)}
                fullWidth
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <PrefixEn
                id="prefixEn"
                name="prefixEn"
                value={prefixEn}
                label="คำนำหน้าชื่อ (EN)"
                required
                onSelectItem={this.handleLookupChange}
              />
            </div>
            <div className="col">
              <TextField
                id="firstNameEN"
                name="firstNameEN"
                value={firstNameEN}
                floatingLabelText="ชื่อ (EN)"
                errorText={firstNameENmsg}
                onChange={e => this.handleChange(e, true)}
                fullWidth
              />
            </div>
            <div className="col">
              <TextField
                id="lastNameEN"
                name="lastNameEN"
                value={lastNameEN}
                floatingLabelText="นามสกุล (EN)"
                errorText={lastNameENmsg}
                onChange={e => this.handleChange(e, true)}
                fullWidth
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Identity
                id="idCard"
                name="idCard"
                label="เลขบัตรประชาชน"
                value={idCard}
                handleChange={this.handleIdentityChange}
                errorText={idCardmsg}
                required
              />
            </div>
            <div className="col">
              <DatePicker
                id="dateExp"
                name="dateExp"
                mode="landscape"
                floatingLabelText="วันหมดอายุบัตรประชาชน"
                value={dateExp}
                errorText={dateExpmsg}
                onChange={this.handleDateExpChange}
                fullWidth
                autoOk
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
              >
                <input type="file" style={styles.exampleImageInput} />
              </RaisedButton>
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
        </form>
      </div>
    );
  }
}

// PersonalInfo.propTypes = {
//   loading: PropTypes.bool,
// };

// PersonalInfo.defaultProps = {
//   loading: false,
// };

export default PersonalInfo;
