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
import { dateFormat } from '../../libs/config';

const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

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
          dateReq: moment().format(dateFormat),
          prefixTH: 'นางสาว',
          firstNameTH: 'ณัฐ',
          firstNameTHmsg: '',
          lastNameTH: 'ธรรม',
          lastNameTHmsg: '',
          prefixEN: 'Mr.',
          firstNameEN: 'Natt',
          firstNameENmsg: '',
          lastNameEN: 'Tamm',
          lastNameENmsg: '',
          idCard: '1720900004217',
          idCardmsg: '',
          idCardValid: true,
          dateExp: new Date(2010, 1, 1),
          dateExpmsg: '',
          status: 'โสด',
          department: 'IT',
          departmentmsg: '',
          position: 'SE',
          positionmsg: '',
          workTel2: '020001111',
          workTel2Valid: false,
          workTel2msg: '',
          homeTel2: '0350001111',
          homeTel2msg: '',
          homeTel2Valid: false,
          detailRent: 'ของตนเอง',
          workTel: '020001111',
          workTelmsg: '',
          workTelValid: false,
          telExtension: '02',
          number: '88/46',
          moo: '5',
          village: 'Apple Condo',
          soi: 'Bearing 34/2',
          road: 'Sukhumvit 107',
          province: '00001',
          amphurCode: '00036',
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
          jobCompanyName: 'Paysbuy',
          jobCompanyNamemsg: '',
          valid: false,
          rentalFee: '',
          etc: '',
          birthDate: new Date(1984, 5, 9),
          birthDatemsg: '',
          email: 'x@y.com',
          emailmsg: '',
          employmentDate: new Date(2017, 1, 1),
          employmentDatemsg: '',
          jobSalary: 100000,
          jobSalarymsg: '',
          //
          officeNumber: '1203',
          officeMoo: '5',
          officeVillage: 'กัญญาเฮาส์',
          officeSoi: '4',
          officeRoad: 'รัชดาภิเษก',
          officeProvince: '',
          officeAmphurCode: '',
          officeTambolCode: '',
          officeProvinceName: '',
          officeAmphurCodeName: '',
          officeTambolCodeName: '',
          officeZipCode: '72170',
          //
        };
        break;

      default:
        this.state = {
          dateReq: moment().format(dateFormat),
          prefixTH: '',
          firstNameTH: '',
          firstNameTHmsg: '',
          lastNameTH: '',
          lastNameTHmsg: '',
          prefixEN: '',
          firstNameEN: '',
          firstNameENmsg: '',
          lastNameEN: '',
          lastNameENmsg: '',
          idCard: '',
          idCardmsg: '',
          idCardValid: false,
          dateExp: null,
          dateExpmsg: '',
          status: '',
          department: '',
          departmentmsg: '',
          position: '',
          positionmsg: '',
          workTel2: '',
          workTel2Valid: false,
          workTel2msg: '',
          homeTel2: '',
          homeTel2msg: '',
          homeTel2Valid: false,
          detailRent: '',
          workTel: '',
          workTelmsg: '',
          workTelValid: false,
          telExtension: '',
          number: '',
          moo: '',
          village: '',
          soi: '',
          road: '',
          province: '',
          amphurCode: '',
          tambolCode: '',
          provinceName: '',
          amphurCodeName: '',
          tambolCodeName: '',
          zipCode: '',
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
          jobCompanyName: '',
          jobCompanyNamemsg: '',
          valid: false,
          rentalFee: '',
          etc: '',
          birthDate: null,
          birthDatemsg: '',
          email: '',
          emailmsg: '',
          employmentDate: null,
          employmentDatemsg: '',
          jobSalary: 0,
          jobSalarymsg: '',
          //
          officeNumber: '',
          officeMoo: '',
          officeVillage: '',
          officeSoi: '',
          officeRoad: '',
          officeProvince: '',
          officeAmphurCode: '',
          officeTambolCode: '',
          officeProvinceName: '',
          officeAmphurCodeName: '',
          officeTambolCodeName: '',
          officeZipCode: '',
          //
        };
        break;
    }
  };

  validate = () => {
    const keys = [
      'dateReq',
      'prefixTH',
      'firstNameTH',
      'lastNameTH',
      'prefixEN',
      'firstNameEN',
      'lastNameEN',
      'idCard',
      // 'idCardValid',
      'dateExp',
      'status',
      'workTel2',
      // 'workTel2Valid',
      'homeTel2',
      // 'homeTel2Valid',
      'detailRent',
      'workTel',
      'jobCompanyName',
      'birthDate',
      'email',
      'employmentDate',
      'jobSalary',
    ];
    const invalid = keys
      .map(key => ({
        key,
        value: this.state[key],
      }))
      .find(({ value }) => !value);

    const { email, jobSalary } = this.state;
    const salary = Number.parseFloat(jobSalary) || 0;
    const valid = emailRegex.test(email) && salary > 0;

    return !invalid && valid;
  }

  initialRequireMessage = () => {
    const keys = [
      'prefixTH',
      'firstNameTH',
      'lastNameTH',
      'prefixEN',
      'firstNameEN',
      'lastNameEN',
      'idCard',
      'dateExp',
      'status',
      'workTel2',
      'homeTel2',
      'workTel',
      'telExtension',
      'jobCompanyName',
      'birthDate',
      'email',
      'employmentDate',
      'jobSalary',
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

  handleMoneyChange = (e, required = false) => {
    const { name, value } = e.target;
    const msgKey = `${name}msg`;
    const number = Number.parseFloat(value) || 0;
    const msg = (required && number <= 0) ? 'กรุณากรอกข้อมูล' : '';

    console.log(name, value, number);

    this.setState({
      [name]: number,
      [msgKey]: msg,
    }, () => {
      const valid = this.validate();
      this.setState({ valid });
    });
  };

  handleEmailChange = (e, required = false) => {
    const { name, value } = e.target;
    const msgKey = `${name}msg`;
    let msg = '';
    // const valid = !value || !emailRegex.test(value);

    // console.log(name, valid);

    if (required && !value.trim()) {
      msg = 'กรุณากรอกข้อมูล';
    } else {
      msg = !value.trim() || emailRegex.test(value)
        ? ''
        : 'รูปแบบไม่ถูกต้อง';
    }

    this.setState({
      [name]: value,
      [msgKey]: msg,
      // [`${name}Valid`]: valid,
    }, () => {
      const valid = this.validate();
      this.setState({ valid });
    });
  };

  handleDateExpChange = (e, value) => {
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

  handleEmploymentDateChange = (e, value) => {
    this.setState({ employmentDate: value },
      () => {
        const msg = requiredMessage(true, value);
        this.setState({ employmentDatemsg: msg },
          () => {
            const valid = this.validate();
            this.setState({ valid });
          },
        );
      });
  };

  handleBirthDateChange = (e, value) => {
    this.setState({ birthDate: value },
      () => {
        const msg = requiredMessage(true, value);
        this.setState({ birthDatemsg: msg },
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
    console.log(value, name, id);
    this.setState({ [id]: value }, () => {
      const valid = this.validate();
      this.setState({ valid });
    });
  };

  handleSameAddressChange = () => {
    const { isSameAddress } = this.state;
    this.setState({ isSameAddress: !isSameAddress },
      () => {
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
    history.push('/borrow-request');
  };

  handleNext = e => {
    e.preventDefault();

    const {
      dateReq,
      prefixTH,
      firstNameTH,
      lastNameTH,
      prefixEN,
      firstNameEN,
      lastNameEN,
      idCard,
      dateExp,
      status,
      department,
      position,
      workTel2,
      homeTel2,
      detailRent,
      workTel,
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
      jobCompanyName,
      birthDate,
      email,
      employmentDate,
      jobSalary,
      //
      officeNumber,
      officeMoo,
      officeVillage,
      officeSoi,
      officeRoad,
      officeProvince,
      officeAmphurCode,
      officeTambolCode,
      officeProvinceName,
      officeAmphurCodeName,
      officeTambolCodeName,
      officeZipCode,
      //
    } = this.state;

    console.log(this.state);

    const data = {
      dateReq,
      prefixTH,
      firstNameTH,
      lastNameTH,
      prefixEN,
      firstNameEN,
      lastNameEN,
      idCard,
      dateExp,
      status,
      department,
      position,
      workTel2,
      homeTel2,
      detailRent,
      workTel,
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
      jobCompanyName,
      birthDate,
      email,
      employmentDate,
      jobSalary,
      //
      officeNumber,
      officeMoo,
      officeVillage,
      officeSoi,
      officeRoad,
      officeProvince,
      officeAmphurCode,
      officeTambolCode,
      officeProvinceName,
      officeAmphurCodeName,
      officeTambolCodeName,
      officeZipCode,
      //
    };
    // completePersonalInfo(data);

    // const { history } = this.props;
    // history.push('/loan-info');

    const {
      completePersonalInfo,
      // saveDraft,
      history,
    } = this.props;

    completePersonalInfo(data, () => history.push('/loan-info'));
  };

  renderDetailRent() {
    const { detailRent } = this.state;
    if (detailRent === 'อื่นๆ') {
      return (
        <div className="col-4">
          <TextField
            id="etc"
            name="etc"
            floatingLabelText="โปรดระบุเหตุผลอื่นๆ"
            value={this.state.etc}
            onChange={e => this.handleChange(e, true)}
            maxLength="100"
            fullWidth
          />
        </div>
      );
    } else if (detailRent === 'กำลังผ่อนชำระ' || detailRent === 'เช่าอยู่') {
      return (
        <div className="col-4">
          <TextField
            id="rentalFee"
            name="rentalFee"
            floatingLabelText="ผ่อนชำระ/ค่าเช่าต่อเดือน"
            value={this.state.rentalFee}
            onChange={e => this.handleChange(e, true)}
            maxLength="100"
            fullWidth
          />
        </div>
      );
    }
    return '';
  }
  render() {
    const {
      dateReq,
      prefixTH,
      firstNameTH,
      firstNameTHmsg,
      lastNameTH,
      lastNameTHmsg,
      prefixEN,
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
      // workTel2msg,
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
      jobCompanyName,
      jobCompanyNamemsg,
      birthDate,
      birthDatemsg,
      email,
      emailmsg,
      employmentDate,
      employmentDatemsg,
      jobSalary,
      jobSalarymsg,
      //
      officeNumber,
      officeMoo,
      officeVillage,
      officeSoi,
      officeRoad,
      officeProvince,
      officeAmphurCode,
      officeTambolCode,
      officeProvinceName,
      officeAmphurCodeName,
      officeTambolCodeName,
      officeZipCode,
      //
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
                    id="prefixEN"
                    name="prefixEN"
                    value={prefixEN}
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
                <div className="col">
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
                    locale="en-US"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <DatePicker
                    id="birthDate"
                    name="birthDate"
                    mode="landscape"
                    floatingLabelText="วันเกิด"
                    value={birthDate}
                    errorText={birthDatemsg}
                    onChange={this.handleBirthDateChange}
                    fullWidth
                    autoOk
                    locale="en-US"
                  />
                </div>
                <div className="col">
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
                    id="jobCompanyName"
                    name="jobCompanyName"
                    value={jobCompanyName}
                    floatingLabelText="ชื่อบริษัท"
                    errorText={jobCompanyNamemsg}
                    onChange={e => this.handleChange(e, true)}
                    fullWidth
                  />
                </div>
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
                <div className="col">
                  <DatePicker
                    id="employmentDate"
                    name="employmentDate"
                    mode="landscape"
                    floatingLabelText="วันที่เริ่มงาน"
                    value={employmentDate}
                    errorText={employmentDatemsg}
                    onChange={this.handleEmploymentDateChange}
                    fullWidth
                    autoOk
                    locale="en-US"
                  />
                </div>
                <div className="col">
                  <TextField
                    id="jobSalary"
                    name="jobSalary"
                    value={jobSalary}
                    floatingLabelText="เงินเดือน"
                    onChange={e => this.handleMoneyChange(e, true)}
                    errorText={jobSalarymsg}
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
              <div className="row">
                <div className="col-3">
                  <TextField
                    id="officeNumber"
                    name="officeNumber"
                    floatingLabelText="เลขที่"
                    value={officeNumber}
                    onChange={e => this.handleChange(e, true)}
                    maxLength="10"
                    fullWidth
                  />
                </div>
                <div className="col-3">
                  <TextField
                    id="officeMoo"
                    name="officeMoo"
                    floatingLabelText="หมู่ที่"
                    value={officeMoo}
                    onChange={e => this.handleChange(e, true)}
                    maxLength="3"
                    fullWidth
                  />
                </div>
                <div className="col-6">
                  <TextField
                    id="officeVillage"
                    name="officeVillage"
                    floatingLabelText="ชื่อหมู่บ้าน / อาคาร"
                    value={officeVillage}
                    onChange={e => this.handleChange(e, true)}
                    maxLength="100"
                    fullWidth
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <TextField
                    id="officeSoi"
                    name="officeSoi"
                    floatingLabelText="ซอย"
                    value={officeSoi}
                    onChange={e => this.handleChange(e, true)}
                    maxLength="100"
                    fullWidth
                  />
                </div>
                <div className="col-4">
                  <TextField
                    id="officeRoad"
                    name="officeRoad"
                    floatingLabelText="ถนน"
                    value={officeRoad}
                    onChange={e => this.handleChange(e, true)}
                    maxLength="100"
                    fullWidth
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <Location
                    id="location3"
                    name="location3"
                    provinceValueField="officeProvince"
                    provinceNameField="officeProvinceName"
                    amphurValueField="officeAmphurCode"
                    amphurNameField="officeAmphurCodeName"
                    tambolValueField="officeTambolCode"
                    tambolNameField="officeTambolCodeName"
                    provinceValue={officeProvince}
                    amphurValue={officeAmphurCode}
                    tambolValue={officeTambolCode}
                    provinceName={officeProvinceName}
                    amphurName={officeAmphurCodeName}
                    tambolName={officeTambolCodeName}
                    handleChange={this.handleLocationChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <TextField
                    id="officeZipCode"
                    name="officeZipCode"
                    floatingLabelText="รหัสไปรษณีย์"
                    value={officeZipCode}
                    onChange={e => this.handleChange(e, true)}
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
                    id="isSameAddress"
                    name="isSameAddress"
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
                <div className="col" >
                  <TextField
                    id="workTel2"
                    name="workTel2"
                    floatingLabelText="เบอร์โทรศัพท์มือถือ"
                    value={workTel2}
                    onChange={e => this.handleChange(e, true)}
                    maxLength="10"
                    fullWidth
                    disabled
                  />
                </div>
                <div className="col" >
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
                <div className="col" >
                  <TextField
                    id="email"
                    name="email"
                    floatingLabelText="อีเมล"
                    value={email}
                    errorText={emailmsg}
                    onChange={e => this.handleEmailChange(e, true)}
                    maxLength="100"
                    fullWidth
                  />
                </div>
              </div>
              <div className="row">
                <div className="col" >
                  <AddressStatus
                    id="detailRent"
                    name="detailRent"
                    value={detailRent}
                    label="สถานภาพที่อยู่อาศัย"
                    required
                    onSelectItem={this.handleLookupChange}
                  />
                </div>
                {this.renderDetailRent()}
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
  history: PropTypes.object.isRequired,
  data: PropTypes.object,
  completePersonalInfo: PropTypes.func.isRequired,
  // saveDraft: PropTypes.func.isRequired,
};

PersonalInfo.defaultProps = {
  data: null,
};

export default withRouter(PersonalInfo);
