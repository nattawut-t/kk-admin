import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import moment from 'moment';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import DatePicker from 'material-ui/DatePicker';
import Checkbox from 'material-ui/Checkbox';
import Snackbar from 'material-ui/Snackbar';
import { Card, CardHeader, CardText } from 'material-ui/Card';

import areIntlLocalesSupported from 'intl-locales-supported';
import IntlPolyfill from 'intl';
import 'intl/locale-data/jsonp/th-TH';

import PrefixTh from '../shared/PrefixTh';
import PrefixEn from '../shared/PrefixEn';
// import Identity from '../shared/Identity';
import MaritalStatus from '../shared/MaritalStatus';
import AddressStatus from '../shared/AddressStatus';
import Location from '../shared/Location';
import Tel from '../shared/Tel';
// import {
//   // dateFormat,
//   isAdmin,
// } from '../../libs/config';
import { data as parse } from '../../libs/personalInfo';

let DateTimeFormat;

/**
 * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
 */
if (areIntlLocalesSupported(['th', 'th-TH'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
}

const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const telRegex = /^\d{9,10}$/;
const idcardNoRegex = /^\d{13}$/;

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
    borderRadius: '6px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.16)',
  },
  sectionTitle: {
    backgroundColor: '#019ac9',
    borderTopLeftRadius: '6px',
    borderTopRightRadius: '6px',
  },
  TitleText: {
    color: 'white',
  },
};

const emptyInputMessage = 'กรุณากรอกข้อมูล';
// const requiredMessage = (required, value) => (required && !value) ? emptyInputMessage : '';

const validateBirthDate = value => {
  const age = moment().diff(value, 'years');

  if (!value) {
    return emptyInputMessage;
  } else if ((age < 20) || (age > 60)) {
    return 'ผู้สมัครต้องมีอายุระหว่าง 20 - 60 ปี';
  }

  return '';
};

const validateDateExp = value => {
  const diff = moment().diff(value, 'days');

  if (!value) {
    return emptyInputMessage;
  } else if (diff >= 0) {
    return 'วันหมดอายุบัตรประชาชนไม่ถูกต้อง';
  }

  return '';
};

const validateEmploymentDate = value => {
  const diff = moment().diff(value, 'days');

  // if (!value) {
  //   return emptyInputMessage;
  // } else if (diff < 0) {
  //   return 'วันที่เริ่มงานไม่ถูกต้อง';
  // }

  return (value && diff < 0) ? 'วันที่เริ่มงานไม่ถูกต้อง' : '';
};

const validateSalary = value => {
  const salary = Number.parseFloat(value) || 0;

  if (!salary) {
    return emptyInputMessage;
  } else if (salary < 8000) {
    return 'เงินเดือนต้องไม่ต่ำกว่า 8,000 บาท';
  }

  return '';
};

const validateEmail = value => {
  if (!value) {
    return emptyInputMessage;
  } else if (!emailRegex.test(value)) {
    return 'รูปแบบอีเมลไม่ถูกต้อง';
  }
  return '';
};

const validateTel = (value, required = false) => {
  if (required && !value) {
    return emptyInputMessage;
  }

  if (value && !telRegex.test(value)) {
    return 'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง';
  }

  return '';
};

const validateIdcardNo = value => {
  if (!value) {
    return emptyInputMessage;
  } else if (!idcardNoRegex.test(value)) {
    return 'รูปแบบเลขบัตรประชาชนไม่ถูกต้อง';
  }
  return '';
};

const rentalFeeTypes = ['เช่าอยู่', 'กำลังผ่อนชำระ'];
const validateRentalFee = (value, type) => {
  const rentalFee = Number.parseFloat(value) || 0;

  if (rentalFeeTypes.indexOf(type) > -1 && !rentalFee) {
    return emptyInputMessage;
  }

  return '';
};

const etcTypes = ['อื่นๆ'];
const validateEtc = (value, type) => {
  if (etcTypes.indexOf(type) > -1 && !value) {
    return emptyInputMessage;
  }
  return '';
};

const validationKeys = [
  // 'dateReq',
  'prefixTH',
  'firstNameTH',
  'lastNameTH',
  'prefixEN',
  'firstNameEN',
  'lastNameEN',
  'idCard',
  // 'dateExp',
  'status',
  // 'workTel2',
  // 'homeTel2',
  // 'workTel',
  'detailRent',
  'jobCompanyName',
  // 'birthDate',
  // 'email',
  // 'employmentDate',
  // 'jobSalary',
];
// const messageKeys = [
//   'prefixTH',
//   'firstNameTH',
//   'lastNameTH',
//   'prefixEN',
//   'firstNameEN',
//   'lastNameEN',
//   'idCard',
//   'dateExp',
//   'status',
//   'workTel2',
//   'homeTel2',
//   'workTel',
//   'telExtension',
//   'jobCompanyName',
//   'birthDate',
//   'email',
//   'employmentDate',
//   'jobSalary',
// ];

class PersonalInfo extends Component {

  componentWillMount() {
    window.scrollTo(0, 0);
    console.log('pi.componentWillMount');
    const { getDraft } = this.props;
    getDraft();
  }

  componentDidMount() {
    const { data } = this.props;
    this.setState(data, () => this.validate());
  }

  validate = () => {
    validationKeys
      .map(key => ({
        key,
        value: this.state[key],
      }))
      .forEach(({ key, value }) => this.setState({
        [`${key}msg`]: !value ? emptyInputMessage : '',
      }));

    const {
      email,
      jobSalary,
      birthDate,
      dateExp,
      employmentDate,
      workTel,
      workTel2,
      homeTel2,
      //
      detailRent,
      etc,
      rentalFee,
      //
      idCard,
    } = this.state;

    this.setState({
      birthDatemsg: validateBirthDate(birthDate),
      dateExpmsg: validateDateExp(dateExp),
      jobSalarymsg: validateSalary(jobSalary),
      emailmsg: validateEmail(email),
      employmentDatemsg: validateEmploymentDate(employmentDate),
      workTelmsg: validateTel(workTel, true),
      workTel2msg: validateTel(workTel2, true),
      homeTel2msg: validateTel(homeTel2, true),
      etcmsg: validateEtc(etc, detailRent),
      rentalFeemsg: validateRentalFee(rentalFee, detailRent),
      idCardmsg: validateIdcardNo(idCard),
    }, () => {
      const {
        prefixTHmsg,
        firstNameTHmsg,
        lastNameTHmsg,
        prefixENmsg,
        firstNameENmsg,
        lastNameENmsg,
        statusmsg,
        //
        idCardmsg,
        //
        workTel2msg,
        homeTel2msg,
        workTelmsg,
        //
        detailRentmsg,
        etcmsg,
        rentalFeemsg,
        //
        jobCompanyNamemsg,
        birthDatemsg,
        dateExpmsg,
        emailmsg,
        employmentDatemsg,
        jobSalarymsg,
      } = this.state;

      const message = [
        prefixTHmsg,
        firstNameTHmsg,
        lastNameTHmsg,
        //
        prefixENmsg,
        firstNameENmsg,
        lastNameENmsg,
        statusmsg,
        //
        idCardmsg,
        //
        workTel2msg,
        homeTel2msg,
        workTelmsg,
        //
        detailRentmsg,
        etcmsg,
        rentalFeemsg,
        //
        jobCompanyNamemsg,
        birthDatemsg,
        dateExpmsg,
        emailmsg,
        employmentDatemsg,
        jobSalarymsg,
      ].find(msg => msg);

      console.log('errorMessage: ', message);

      this.setState({ valid: !message });
    });
  }

  handleChange = e => {
    const { target: { name, value } } = e;
    this.setState({ [name]: value }, () => this.validate());
  };

  handleSalaryChange = e => {
    const { target: { name, value } } = e;
    this.setState({ [name]: Number.parseFloat(value) || 0 }, () => this.validate());
  };

  handleMoneyChange = e => {
    const { target: { name, value } } = e;
    this.setState({ [name]: Number.parseFloat(value) || 0 }, () => this.validate());
  };

  handleEmailChange = e => {
    const { target: { name, value } } = e;
    this.setState({ [name]: value }, () => this.validate());
  };

  handleIdcardNoChange = e => {
    const { target: { value } } = e;
    this.setState({ idCard: value }, () => this.validate());
  };

  handleDateExpChange = (e, value) => {
    this.setState({ dateExp: value }, () => this.validate());
  };

  handleEmploymentDateChange = (e, value) => {
    this.setState({ employmentDate: value }, () => this.validate());
  };

  handleBirthDateChange = (e, value) => {
    this.setState({ birthDate: value }, () => this.validate());
  };

  handleNumberChange = (name, value) => {
    this.setState({ [name]: value }, () => this.validate());
  };

  handleLocationChange = (valueField, nameField, value, name) => {
    this.setState({
      [valueField]: value,
      [nameField]: name,
    }, () => this.validate());
  };

  handleLookupChange = (value, name, id) => {
    this.setState({ [id]: value }, () => this.validate());
  };

  handleDetailRentChange = (value, name, key) => {
    console.log(value, name, key);
    const { rentalFee, etc } = this.state;
    let messageKey = '';
    let messageValue = '';

    switch (value) {
      case 'อื่นๆ':
        messageKey = 'etcmsg';
        messageValue = !etc ? 'กรุณากรอกข้อมูล' : '';
        console.log(1);
        break;

      case 'เช่าอยู่':
      case 'กำลังผ่อนชำระ':
        messageKey = 'rentalFeemsg';
        messageValue = !rentalFee ? 'กรุณากรอกข้อมูล' : '';
        console.log(2);
        break;

      default:
        console.log(3);
        break;
    }

    if (messageValue) {
      this.setState({ [messageKey]: messageValue });
    }

    // console.log(messageKey, messageValue, rentalFee, etc);

    this.setState({ [key]: value }, () => this.validate());
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

  save = path => {
    // const {
    //   prefixTH,
    //   firstNameTH,
    //   lastNameTH,
    //   prefixEN,
    //   firstNameEN,
    //   lastNameEN,
    //   idCard,
    //   status,
    //   //
    //   department,
    //   position,
    //   workTel2,
    //   homeTel2,
    //   detailRent,
    //   workTel,
    //   // workTelValid,
    //   telExtension,
    //   //
    //   number,
    //   moo,
    //   village,
    //   soi,
    //   road,
    //   //
    //   province,
    //   amphurCode,
    //   tambolCode,
    //   //
    //   provinceName,
    //   amphurCodeName,
    //   tambolCodeName,
    //   zipCode,
    //   //
    //   number2,
    //   moo2,
    //   village2,
    //   soi2,
    //   road2,
    //   zipCode2,
    //   province2,
    //   amphurCode2,
    //   tambolCode2,
    //   province2Name,
    //   amphurCode2Name,
    //   tambolCode2Name,
    //   //
    //   isSameAddress,
    //   jobCompanyName,
    //   email,
    //   jobSalary,
    //   ot,
    //   //
    //   officeNumber,
    //   officeMoo,
    //   officeVillage,
    //   officeSoi,
    //   officeRoad,
    //   officeProvince,
    //   officeAmphurCode,
    //   officeTambolCode,
    //   officeProvinceName,
    //   officeAmphurCodeName,
    //   officeTambolCodeName,
    //   officeZipCode,
    //   //
    //   rentalFee,
    //   etc,
    // } = this.state;

    // let {
    //   dateReq,
    //   birthDate,
    //   dateExp,
    //   employmentDate,
    // } = this.state;

    // dateReq = moment(dateReq, 'DD/MM/YYYY').toDate();
    // birthDate = moment(birthDate, 'DD/MM/YYYY').toDate();
    // dateExp = moment(dateExp, 'DD/MM/YYYY').toDate();
    // employmentDate = moment(employmentDate, 'DD/MM/YYYY').toDate();

    // const data = {
    //   dateReq,
    //   prefixTH,
    //   firstNameTH,
    //   lastNameTH,
    //   prefixEN,
    //   firstNameEN,
    //   lastNameEN,
    //   idCard,
    //   dateExp,
    //   status,
    //   //
    //   department,
    //   position,
    //   workTel2,
    //   homeTel2,
    //   detailRent,
    //   workTel,
    //   // workTelValid,
    //   telExtension,
    //   //
    //   number,
    //   moo,
    //   village,
    //   soi,
    //   road,
    //   //
    //   province,
    //   amphurCode,
    //   tambolCode,
    //   //
    //   provinceName,
    //   amphurCodeName,
    //   tambolCodeName,

    //   zipCode,
    //   //
    //   number2,
    //   moo2,
    //   village2,
    //   soi2,
    //   road2,
    //   province2,
    //   amphurCode2,
    //   tambolCode2,
    //   province2Name,
    //   amphurCode2Name,
    //   tambolCode2Name,
    //   zipCode2,
    //   //
    //   isSameAddress,
    //   jobCompanyName,
    //   birthDate,
    //   email,
    //   employmentDate,
    //   jobSalary,
    //   ot,
    //   //
    //   officeNumber,
    //   officeMoo,
    //   officeVillage,
    //   officeSoi,
    //   officeRoad,
    //   officeProvince,
    //   officeAmphurCode,
    //   officeTambolCode,
    //   officeProvinceName,
    //   officeAmphurCodeName,
    //   officeTambolCodeName,
    //   officeZipCode,
    //   //
    //   rentalFee,
    //   etc,
    // };

    const data = parse(this.state);
    const { saveDraft, history } = this.props;

    saveDraft(data, () => history.push(path));
  };

  handleBackClick = e => {
    e.preventDefault();
    const { history } = this.props;
    history.push('/leads');
  };

  handleNextClick = e => {
    e.preventDefault();
    this.save('/loan-info');
  };

  handleLookupChange = (value, name, id) => {
    this.setState({ [id]: value }, () => this.validate());
  };

  renderDetailRent() {
    const {
      detailRent,
      etc,
      rentalFee,
      etcmsg,
      rentalFeemsg,
    } = this.state;

    if (detailRent === 'อื่นๆ') {
      return (
        <div className="col-sm-4">
          <TextField
            id="etc"
            name="etc"
            floatingLabelText="โปรดระบุเหตุผลอื่นๆ"
            value={etc}
            onChange={e => this.handleChange(e, true)}
            errorText={etcmsg}
            maxLength="100"
            fullWidth
          />
        </div>
      );
    } else if (detailRent === 'กำลังผ่อนชำระ' || detailRent === 'เช่าอยู่') {
      return (
        <div className="col-sm-4">
          <TextField
            id="rentalFee"
            name="rentalFee"
            floatingLabelText="ผ่อนชำระ / ค่าเช่าต่อเดือน"
            value={rentalFee}
            onChange={e => this.handleMoneyChange(e, true)}
            errorText={rentalFeemsg}
            maxLength="10"
            fullWidth
          />
        </div>
      );
    }
    return '';
  }

  render() {
    if (!this.state) {
      return <div className="loader" />;
    }

    const {
      dateReq,
      //
      prefixTH,
      firstNameTH,
      firstNameTHmsg,
      lastNameTH,
      lastNameTHmsg,
      //
      prefixEN,
      firstNameEN,
      firstNameENmsg,
      lastNameEN,
      lastNameENmsg,
      //
      idCard,
      idCardmsg,
      dateExp,
      dateExpmsg,
      status,
      birthDate,
      birthDatemsg,
      email,
      emailmsg,
      //
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
      //
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
      //
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
      //
      isSameAddress,
      jobCompanyName,
      jobCompanyNamemsg,
      employmentDate,
      employmentDatemsg,
      jobSalary,
      jobSalarymsg,
      ot,
      otmsg,
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

    const { message } = this.props;
    // const _isAdmin = isAdmin();

    return (
      <div>
        <form onSubmit={this.handleNextClick}>
          <Card style={styles.marginBottom}>
            <div style={styles.sectionTitle}>
              <CardHeader
                title="ข้อมูลทั่วไป"
                titleStyle={styles.TitleText}
                style={{ backgroundColor: '#019bc9', borderTopLeftRadius: '6px', borderTopRightRadius: '6px' }}
              />
            </div>
            <CardText>
              <div className="row" >
                <div
                  className="col-sm-12"
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <DatePicker
                    id="dateReq"
                    name="dateReq"
                    mode="landscape"
                    floatingLabelText="วันที่คำขอ"
                    value={dateReq}
                    onChange={this.handleDateExpChange}
                    DateTimeFormat={DateTimeFormat}
                    locale="th-TH"
                    disabled
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-4">
                  <PrefixTh
                    id="prefixTH"
                    name="prefixTH"
                    value={prefixTH}
                    label="คำนำหน้าชื่อ (TH)"
                    onSelectItem={this.handleLookupChange}
                    required
                  />
                </div>
                <div className="col-sm-4">
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
                <div className="col-sm-4">
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
                <div className="col-sm-4">
                  <PrefixEn
                    id="prefixEN"
                    name="prefixEN"
                    value={prefixEN}
                    label="คำนำหน้าชื่อ (EN)"
                    required
                    onSelectItem={this.handleLookupChange}
                  />
                </div>
                <div className="col-sm-4">
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
                <div className="col-sm-4">
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
                <div className="col-sm-6">
                  <TextField
                    id="idCard"
                    name="idCard"
                    value={idCard}
                    floatingLabelText="เลขบัตรประชาชน"
                    errorText={idCardmsg}
                    onChange={this.handleIdcardNoChange}
                    fullWidth
                  />
                </div>
                <div className="col-sm-6">
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
                    DateTimeFormat={DateTimeFormat}
                    locale="th-TH"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
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
                    DateTimeFormat={DateTimeFormat}
                    locale="th-TH"
                  />
                </div>
                <div className="col-sm-6">
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
                <div className="col-sm-4">
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
                <div className="col-sm-4">
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
                <div className="col-sm-4">
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
                <div className="col-sm-4">
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
                    DateTimeFormat={DateTimeFormat}
                    locale="th-TH"
                  />
                </div>
                <div className="col-sm-4">
                  <TextField
                    id="jobSalary"
                    name="jobSalary"
                    value={jobSalary}
                    floatingLabelText="เงินเดือน"
                    onChange={e => this.handleSalaryChange(e, true)}
                    errorText={jobSalarymsg}
                    fullWidth
                  />
                </div>
                <div className="col-sm-4">
                  <TextField
                    id="ot"
                    name="ot"
                    value={ot}
                    floatingLabelText="OT, COM, โบนัส"
                    onChange={e => this.handleMoneyChange(e)}
                    errorText={otmsg}
                    fullWidth
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
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
                <div className="col-sm-4">
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
                <div className="col-sm-3">
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
                <div className="col-sm-3">
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
                <div className="col-sm-6">
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
                <div className="col-sm-4">
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
                <div className="col-sm-4">
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
                    handleChange={(valueField, nameField, value, name) => this.handleLocationChange(
                      valueField,
                      nameField,
                      value,
                      name,
                    )}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-4">
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
                <div className="col-sm-4">
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
                <div className="col-sm-4">
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
                <div className="col-sm-4">
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
                <div className="col-sm-4">
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
                <div className="col-sm-4">
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
                    handleChange={(valueField, nameField, value, name) => this.handleLocationChange(
                      valueField,
                      nameField,
                      value,
                      name,
                    )}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-4">
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
                <div className="col-sm-4">
                  <TextField
                    id="number2"
                    name="number2"
                    floatingLabelText="บ้านเลขที่"
                    value={number2}
                    onChange={e => this.handleChange(e, true)}
                    readOnly={isSameAddress}
                    maxLength="10"
                    fullWidth
                  />
                </div>
                <div className="col-sm-4">
                  <TextField
                    id="moo2"
                    name="moo2"
                    floatingLabelText="หมู่ที่"
                    value={moo2}
                    onChange={e => this.handleChange(e, true)}
                    readOnly={isSameAddress}
                    maxLength="3"
                    fullWidth
                  />
                </div>
                <div className="col-sm-4">
                  <TextField
                    id="village2"
                    name="village2"
                    floatingLabelText="ชื่อหมู่บ้าน / อาคาร"
                    value={village2}
                    onChange={e => this.handleChange(e, true)}
                    readOnly={isSameAddress}
                    maxLength="100"
                    fullWidth
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-4">
                  <TextField
                    id="soi2"
                    name="soi2"
                    floatingLabelText="ซอย"
                    value={soi2}
                    onChange={e => this.handleChange(e, true)}
                    readOnly={isSameAddress}
                    maxLength="100"
                    fullWidth
                  />
                </div>
                <div className="col-sm-4">
                  <TextField
                    id="road2"
                    name="road2"
                    floatingLabelText="ถนน"
                    value={road2}
                    onChange={e => this.handleChange(e, true)}
                    readOnly={isSameAddress}
                    maxLength="100"
                    fullWidth
                  />
                </div>
              </div>
              {isSameAddress
                ? <div className="row">
                  <div className="col-4">
                    <TextField
                      floatingLabelText="จังหวัด"
                      value={province2Name}
                      readOnly
                      fullWidth
                    />
                  </div>
                  <div className="col-4">
                    <TextField
                      floatingLabelText="อำเภอ / เขต"
                      value={amphurCode2Name}
                      readOnly
                      fullWidth
                    />
                  </div>
                  <div className="col-4">
                    <TextField
                      floatingLabelText="ตำบล / แขวง"
                      value={tambolCode2Name}
                      readOnly
                      fullWidth
                    />
                  </div>
                </div>
                : <div className="row">
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
                      handleChange={(valueField, nameField, value, name) =>
                        this.handleLocationChange(
                          valueField,
                          nameField,
                          value,
                          name,
                        )}
                      disabled={isSameAddress}
                    />
                  </div>
                </div>
              }
              <div className="row">
                <div className="col-sm-4">
                  <TextField
                    id="zipCode2"
                    name="zipCode2"
                    floatingLabelText="รหัสไปรษณีย์"
                    value={zipCode2}
                    onChange={e => this.handleChange(e, true)}
                    readOnly={isSameAddress}
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
                <div className="col-sm-4" >
                  {/* <TextField
                    id="workTel2"
                    name="workTel2"
                    floatingLabelText="เบอร์โทรศัพท์มือถือ"
                    value={workTel2}
                    errorText={workTel2msg}
                    onChange={this.handleNumberChange}
                    maxLength="10"
                    fullWidth
                  /> */}

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
                <div className="col-sm-4" >
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
                <div className="col-sm-4" >
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
                    onSelectItem={this.handleDetailRentChange}
                  />
                </div>
                {this.renderDetailRent()}
              </div>
            </CardText>
          </Card>
          <div className="row">
            <div className="col-12" style={{ textAlign: 'right' }}>
              <RaisedButton
                label="ยกเลิก"
                labelPosition="before"
                style={styles.button}
                containerElement="label"
                onClick={this.handleBackClick}
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

PersonalInfo.propTypes = {
  message: PropTypes.string,
  history: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  getDraft: PropTypes.func.isRequired,
  saveDraft: PropTypes.func.isRequired,
};

PersonalInfo.defaultProps = {
  message: '',
};

export default withRouter(PersonalInfo);
