import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import moment from 'moment';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import DatePicker from 'material-ui/DatePicker';
import Checkbox from 'material-ui/Checkbox';
import { Card, CardHeader, CardText } from 'material-ui/Card';

import PrefixTh from '../shared/PrefixTh';
import PrefixEn from '../shared/PrefixEn';
import Identity from '../shared/Identity';
import MaritalStatus from '../shared/MaritalStatus';
// import Mobile from '../shared/Mobile';
import Tel from '../shared/Tel';
import AddressStatus from '../shared/AddressStatus';
import Location from '../shared/Location';

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
    backgroundColor: 'rgb(0, 188, 212)',
  },
  TitleText: {
    color: 'white',
  },
};

const requiredMessage = (required, value) => (required && !value) ? 'กรุณากรอกข้อมูล' : '';

class PersonalInfo extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    completePersonalInfo: PropTypes.func.isRequired,
  };
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
    idCard: '1720900004217',
    idCardmsg: '',
    idCardValid: true,
    dateExp: new Date(),
    dateExpmsg: '',
    status: 'โสด',
    department: 'IT',
    departmentmsg: '',
    position: 'SE',
    positionmsg: '',
    workTel2: '0627609997',
    workTel2Valid: false,
    workTel2msg: '',
    homeTel2: '035591291',
    homeTel2msg: '',
    homeTel2Valid: false,
    detailRent: 'ของตนเอง',
    workTel: '020002222',
    workTelmsg: '',
    workTelValid: false,
    telExtension: '',
    number: '88/46',
    moo: '1',
    village: 'Apple Condo',
    soi: 'แบริ่ง 34/2',
    road: 'สุขุมวิท 107',
    province: '',
    amphurCode: '',
    tambolCode: '',
    provinceName: '',
    amphurCodeName: '',
    tambolCodeName: '',
    zipCode: '10270',
    number2: '',
    moo2: '',
    village2: '',
    soi2: '',
    road2: '',
    province2: '',
    amphurCode2: '',
    tambolCode2: '',
    province2Name: '',
    amphurCode2Name: '',
    tambolCode2Name: '',
    zipCode2: '',
    isSameAddress: false,
    valid: false,
  };

  componentWillMount() {
    const { data } = this.props;
    if (data) {
      this.setState(data);
    }
    this.initialState();
    const valid = this.validate();
    this.setState({ valid });
  }

  validate = () => {
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
      'status',
      'workTel2',
      'workTel2Valid',
      'homeTel2',
      'homeTel2Valid',
      'detailRent',
      'workTel',
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

  initialState = () => {
    const keys = [
      'prefixTH',
      'firstNameTH',
      'lastNameTH',
      'prefixEn',
      'firstNameEN',
      'lastNameEN',
      'idCard',
      'dateExp',
      'status',
      'workTel2',
      'homeTel2',
      'workTel',
      'telExtension',
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

    ['workTel', 'workTel2', 'homeTel2']
      .map(key => ({
        key,
        value: this.state[key],
      }))
      .forEach(({ key, value }) => {
        const valid = /^\d{9,10}$/.test(value);
        this.setState({ [`${key}Valid`]: valid });
      });
  };

  handleChange = (e, required = false) => {
    const { name, value } = e.target;
    const msgKey = `${name}msg`;

    this.setState({
      [name]: value,
      [msgKey]: requiredMessage(required, value),
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

  handleNumberChange = (name, value, errorMessage = '') => {
    const msgKey = `${name}msg`;

    this.setState({
      [name]: value,
      [msgKey]: errorMessage,
      [`${name}Valid`]: !errorMessage,
    }, () => {
      const valid = this.validate();
      this.setState({ valid });
    });
  };

  handleLocationChange = (valueField, nameField, value, name) => {
    console.log('>>> handleLocationChange: ', valueField, nameField, value, name);

    this.setState({
      [valueField]: value,
      [nameField]: name,
    },
      () => {
        const valid = this.validate();
        this.setState({ valid });
      },
    );
  };

  handleLookupChange = (value, name, id) => {
    console.log('>>> handleLookupChange: ', value, name, id);
    this.setState({ [id]: value }, () => {
      const valid = this.validate();
      this.setState({ valid });
    });
  };

  handleSameAddressChange = () => {
    const { isSameAddress } = this.state;
    this.setState({ isSameAddress: !isSameAddress },
      () => {
        console.log('>>> this.state.isSameAddress: ', this.state.isSameAddress);
        if (this.state.isSameAddress) {
          const {
            number,
            moo,
            village,
            soi,
            road,
            province,
            amphurCode,
            tambolCode,
            provinceName,
            amphurCodeName,
            tambolCodeName,
            zipCode,
          } = this.state;

          this.setState({
            number2: number,
            moo2: moo,
            village2: village,
            soi2: soi,
            road2: road,
            province2: province,
            amphurCode2: amphurCode,
            tambolCode2: tambolCode,
            province2Name: provinceName,
            amphurCode2Name: amphurCodeName,
            tambolCode2Name: tambolCodeName,
            zipCode2: zipCode,
          });
        } else {
          this.setState({
            number2: '',
            moo2: '',
            village2: '',
            soi2: '',
            road2: '',
            province2: '',
            amphurCode2: '',
            tambolCode2: '',
            province2Name: '',
            amphurCode2Name: '',
            tambolCode2Name: '',
            zipCode2: '',
          });
        }
      });
  };

  handleBack = () => {
    const { history } = this.props;
    history.push('/');
  };

  handleNext = e => {
    e.preventDefault();
    const { completePersonalInfo } = this.props;
    const {
      dateReq,
      prefixTH,
      firstNameTH,
      // firstNameTHmsg,
      lastNameTH,
      // lastNameTHmsg,
      prefixEn,
      firstNameEN,
      // firstNameENmsg,
      lastNameEN,
      // lastNameENmsg,
      idCard,
      // idCardmsg,
      // idCardValid,
      dateExp,
      // dateExpmsg,
      status,
      department,
      // departmentmsg,
      position,
      // positionmsg,
      workTel2,
      // workTel2Valid,
      // workTel2msg,
      homeTel2,
      // homeTel2msg,
      // homeTel2Valid,
      detailRent,
      workTel,
      // workTelmsg,
      workTelValid,
      telExtension,
      number,
      moo,
      village,
      soi,
      road,
      province,
      amphurCode,
      tambolCode,
      provinceName,
      amphurCodeName,
      tambolCodeName,
      zipCode,
      number2,
      moo2,
      village2,
      soi2,
      road2,
      zipCode2,
      isSameAddress,
      // valid,
    } = this.state;

    console.log(this.state);

    completePersonalInfo({
      dateReq,
      prefixTH,
      firstNameTH,
      // firstNameTHmsg,
      lastNameTH,
      // lastNameTHmsg,
      prefixEn,
      firstNameEN,
      // firstNameENmsg,
      lastNameEN,
      // lastNameENmsg,
      idCard,
      // idCardmsg,
      // idCardValid,
      dateExp,
      // dateExpmsg,
      status,
      department,
      // departmentmsg,
      position,
      // positionmsg,
      workTel2,
      // workTel2Valid,
      // workTel2msg,
      homeTel2,
      // homeTel2msg,
      // homeTel2Valid,
      detailRent,
      workTel,
      // workTelmsg,
      workTelValid,
      telExtension,
      number,
      moo,
      village,
      soi,
      road,
      province,
      amphurCode,
      tambolCode,
      provinceName,
      amphurCodeName,
      tambolCodeName,
      zipCode,
      number2,
      moo2,
      village2,
      soi2,
      road2,
      zipCode2,
      isSameAddress,
    });

    const { history } = this.props;
    history.push('/loan-info');
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
      status,
      department,
      departmentmsg,
      position,
      positionmsg,
      workTel2,
      workTel2msg,
      homeTel2,
      homeTel2msg,
      detailRent,
      workTel,
      workTelmsg,
      telExtension,
      number,
      moo,
      village,
      soi,
      road,
      province,
      amphurCode,
      tambolCode,
      provinceName,
      amphurCodeName,
      tambolCodeName,
      zipCode,
      number2,
      moo2,
      village2,
      soi2,
      road2,
      province2,
      amphurCode2,
      tambolCode2,
      province2Name,
      amphurCode2Name,
      tambolCode2Name,
      zipCode2,
      isSameAddress,
      valid,
    } = this.state;

    return (
      <div>
        <form onSubmit={this.handleNext}>
          <Card style={styles.marginBottom}>
            <div style={styles.sectionTitle}>
              <CardHeader
                title="ข้อมูลทั่วไป"
                titleStyle={styles.TitleText}
              />
            </div>
            <CardText>
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
                <div className="col-4">
                  <PrefixTh
                    id="prefixTH"
                    name="prefixTH"
                    value={prefixTH}
                    label="คำนำหน้าชื่อ (TH)"
                    onSelectItem={this.handleLookupChange}
                    required
                  />
                </div>
                <div className="col-4">
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
                <div className="col-4">
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
                <div className="col-4">
                  <PrefixEn
                    id="prefixEn"
                    name="prefixEn"
                    value={prefixEn}
                    label="คำนำหน้าชื่อ (EN)"
                    required
                    onSelectItem={this.handleLookupChange}
                  />
                </div>
                <div className="col-4">
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
                <div className="col-4">
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
                <div className="col-4">
                  <Identity
                    id="idCard"
                    name="idCard"
                    label="เลขบัตรประชาชน"
                    value={idCard}
                    handleChange={this.handleNumberChange}
                    errorText={idCardmsg}
                    required
                  />
                </div>
                <div className="col-4">
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
                <div className="col-4">
                  <MaritalStatus
                    id="status"
                    name="status"
                    value={status}
                    label="สถานภาพสมรส"
                    required
                    onSelectItem={this.handleLookupChange}
                  />
                </div>
              </div>
            </CardText>
          </Card>
          <Card style={styles.marginBottom}>
            <div style={styles.sectionTitle}>
              <CardHeader
                title="ข้อมูลการทำงาน"
                titleStyle={styles.TitleText}
              />
            </div>
            <CardText>
              <div className="row">
                <div className="col">
                  <TextField
                    id="department"
                    name="department"
                    value={department}
                    floatingLabelText="แผนก / ฝ่าย"
                    errorText={departmentmsg}
                    onChange={e => this.handleChange(e, true)}
                    fullWidth
                  />
                </div>
                <div className="col">
                  <TextField
                    id="position"
                    name="position"
                    value={position}
                    floatingLabelText="ตำแหน่ง"
                    errorText={positionmsg}
                    onChange={e => this.handleChange(e, true)}
                    fullWidth
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <Tel
                    id="workTel"
                    name="workTel"
                    label="โทรศัพท์ที่ทำงาน (เบอร์ตรง)"
                    value={workTel}
                    handleChange={this.handleNumberChange}
                    errorText={workTelmsg}
                    required
                  />
                </div>
                <div className="col-4">
                  <TextField
                    id="telExtension"
                    name="telExtension"
                    floatingLabelText="เบอร์ต่อ"
                    value={telExtension}
                    onChange={e => this.handleChange(e, true)}
                    maxLength="10"
                    fullWidth
                  />
                </div>
              </div>
            </CardText>
          </Card>
          <Card style={styles.marginBottom}>
            <div style={styles.sectionTitle}>
              <CardHeader
                title="ที่อยู่ปัจจุบัน"
                titleStyle={styles.TitleText}
              />
            </div>
            <CardText>
              <div className="row">
                <div className="col-4">
                  <TextField
                    id="number"
                    name="number"
                    floatingLabelText="บ้านเลขที่"
                    value={number}
                    onChange={e => this.handleChange(e, true)}
                    maxLength="10"
                    fullWidth
                  />
                </div>
                <div className="col-4">
                  <TextField
                    id="moo"
                    name="moo"
                    floatingLabelText="หมู่ที่"
                    value={moo}
                    onChange={e => this.handleChange(e, true)}
                    maxLength="3"
                    fullWidth
                  />
                </div>
                <div className="col-4">
                  <TextField
                    id="village"
                    name="village"
                    floatingLabelText="ชื่อหมู่บ้าน / อาคาร"
                    value={village}
                    onChange={e => this.handleChange(e, true)}
                    maxLength="100"
                    fullWidth
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <TextField
                    id="soi"
                    name="soi"
                    floatingLabelText="ซอย"
                    value={soi}
                    onChange={e => this.handleChange(e, true)}
                    maxLength="100"
                    fullWidth
                  />
                </div>
                <div className="col-4">
                  <TextField
                    id="road"
                    name="road"
                    floatingLabelText="ถนน"
                    value={road}
                    onChange={e => this.handleChange(e, true)}
                    maxLength="100"
                    fullWidth
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <Location
                    id="location1"
                    name="location1"
                    provinceValueField="province"
                    provinceNameField="provinceName"
                    amphurValueField="amphurCode"
                    amphurNameField="amphurCodeName"
                    tambolValueField="tambolCode"
                    tambolNameField="tambolCodeName"
                    provinceValue={province}
                    amphurValue={amphurCode}
                    tambolValue={tambolCode}
                    provinceName={provinceName}
                    amphurName={amphurCodeName}
                    tambolName={tambolCodeName}
                    handleChange={this.handleLocationChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <TextField
                    id="zipCode"
                    name="zipCode"
                    floatingLabelText="รหัสไปรษณีย์"
                    value={zipCode}
                    onChange={e => this.handleChange(e, true)}
                    maxLength="5"
                    fullWidth
                  />
                </div>
              </div>
            </CardText>
          </Card>
          <br />
          <Card style={styles.marginBottom}>
            <div style={styles.sectionTitle}>
              <CardHeader
                title="ที่อยู่ตามทะเบียนบ้าน"
                titleStyle={styles.TitleText}
              />
            </div>
            <CardText >
              <div className="row">
                <div className="col-12">
                  <Checkbox
                    label="ที่อยู่เดียวกับที่อยู่ปัจจุบัน"
                    checked={isSameAddress}
                    onCheck={this.handleSameAddressChange}
                    style={styles.checkbox}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <TextField
                    id="number2"
                    name="number2"
                    floatingLabelText="บ้านเลขที่"
                    value={number2}
                    onChange={e => this.handleChange(e, true)}
                    disabled={isSameAddress}
                    maxLength="10"
                    fullWidth
                  />
                </div>
                <div className="col-4">
                  <TextField
                    id="moo2"
                    name="moo2"
                    floatingLabelText="หมู่ที่"
                    value={moo2}
                    onChange={e => this.handleChange(e, true)}
                    disabled={isSameAddress}
                    maxLength="3"
                    fullWidth
                  />
                </div>
                <div className="col-4">
                  <TextField
                    id="village2"
                    name="village2"
                    floatingLabelText="ชื่อหมู่บ้าน / อาคาร"
                    value={village2}
                    onChange={e => this.handleChange(e, true)}
                    disabled={isSameAddress}
                    maxLength="100"
                    fullWidth
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <TextField
                    id="soi2"
                    name="soi2"
                    floatingLabelText="ซอย"
                    value={soi2}
                    onChange={e => this.handleChange(e, true)}
                    disabled={isSameAddress}
                    maxLength="100"
                    fullWidth
                  />
                </div>
                <div className="col-4">
                  <TextField
                    id="road2"
                    name="road2"
                    floatingLabelText="ถนน"
                    value={road2}
                    onChange={e => this.handleChange(e, true)}
                    disabled={isSameAddress}
                    maxLength="100"
                    fullWidth
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <Location
                    id="location1"
                    name="location1"
                    provinceValueField="province2"
                    provinceNameField="province2Name"
                    amphurValueField="amphurCode2"
                    amphurNameField="amphurCode2Name"
                    tambolValueField="tambolCode2"
                    tambolNameField="tambolCode2Name"
                    provinceValue={province2}
                    amphurValue={amphurCode2}
                    tambolValue={tambolCode2}
                    provinceName={province2Name}
                    amphurName={amphurCode2Name}
                    tambolName={tambolCode2Name}
                    handleChange={this.handleLocationChange}
                    disabled={isSameAddress}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <TextField
                    id="zipCode2"
                    name="zipCode2"
                    floatingLabelText="รหัสไปรษณีย์"
                    value={zipCode2}
                    onChange={e => this.handleChange(e, true)}
                    disabled={isSameAddress}
                    maxLength="5"
                    fullWidth
                  />
                </div>
              </div>
            </CardText>
          </Card>
          <Card style={styles.marginBottom}>
            <div style={styles.sectionTitle}>
              <CardHeader
                title="ข้อมูลติดต่อ"
                titleStyle={styles.TitleText}
              />
            </div>
            <CardText>
              <div className="row">
                <div className="col-4" >
                  <Tel
                    id="workTel2"
                    name="workTel2"
                    label="เบอร์โทรศัพท์มือถือ"
                    value={workTel2}
                    handleChange={this.handleNumberChange}
                    errorText={workTel2msg}
                    required
                  />
                </div>
                <div className="col-4" >
                  <Tel
                    id="homeTel2"
                    name="homeTel2"
                    label="เบอร์โทรศัพท์บ้าน"
                    value={homeTel2}
                    handleChange={this.handleNumberChange}
                    errorText={homeTel2msg}
                    required
                  />
                </div>
                <div className="col-4" >
                  <AddressStatus
                    id="detailRent"
                    name="detailRent"
                    value={detailRent}
                    label="สถานภาพที่อยู่อาศัย"
                    required
                    onSelectItem={this.handleLookupChange}
                  />
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
      </div>
    );
  }
}

PersonalInfo.propTypes = {
  // loading: PropTypes.bool,
  history: PropTypes.object.isRequired,
};

// PersonalInfo.defaultProps = {
//   loading: false,
// };

export default withRouter(PersonalInfo);
