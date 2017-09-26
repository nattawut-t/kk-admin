import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import FontIcon from 'material-ui/FontIcon';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
import Snackbar from 'material-ui/Snackbar';

import PrefixTh from '../shared/PrefixTh';
import Relationship from '../shared/Relationship';
import Location from '../shared/Location';
import Mobile from '../shared/Mobile';
import Tel from '../shared/Tel';

const styles = {
  button: {
    margin: 12,
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

const requiredMessage = (required, value) => (required && !value) ? 'กรุณากรอกข้อมูล' : '';

class AdditionalInfo extends Component {

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
          ref1Prefix: 'MR',
          ref1PrefixMsg: '',
          ref1Firstname: 'Panit',
          ref1FirstnameMsg: '',
          ref1Lastname: 'Tamm',
          ref1LastnameMsg: '',
          ref1Relationship: 'คู่สมรส',
          ref1Mobile: '0627609997',
          ref1MobileMsg: '',
          ref1WorkTelephone: '021112222',
          ref1WorkTelephoneMsg: '',
          ref1HomeTelephone: '020001111',
          ref1HomeTelephoneMsg: '',
          ref2Prefix: 'MRS',
          ref2PrefixMsg: '',
          ref2Firstname: 'Jira',
          ref2FirstnameMsg: '',
          ref2Lastname: 'Tamm',
          ref2LastnameMsg: '',
          ref2Relationship: 'พี่น้อง',
          ref2Mobile: '0840001111',
          ref2MobileMsg: '',
          ref2WorkTelephone: '021112222',
          ref2WorkTelephoneMsg: '',
          ref2HomeTelephone: '022223333',
          ref2HomeTelephoneMsg: '',
          conjugalPrefix: '',
          conjugalPrefixMsg: '',
          conjugalFirstname: '',
          conjugalFirstnameMsg: '',
          conjugalLastname: '',
          conjugalLastnameMsg: '',
          conjugalOccupation: '',
          conjugalOccupationMsg: '',
          conjugalIncome: '',
          conjugalIncomeMsg: '',
          children: '',
          childrenMsg: '',
          isConsent2: false,
          shippingHouseNo: '',
          shippingMoo: '',
          shippingVillage: '',
          shippingFloor: '',
          shippingSoi: '',
          shippingRoad: '',
          shippingPostalCode: '',
          shippingProvinceCode: '',
          shippingAmphurCode: '',
          shippingTambolCode: '',
          shippingProvinceCodeName: '',
          shippingAmphurCodeName: '',
          shippingTambolCodeName: '',
          // not to send
          shippingAddress: 'current',
          valid: false,
          // not to send
        };

        break;

      default:
        this.state = {
          ref1Prefix: '',
          ref1PrefixMsg: '',
          ref1Firstname: '',
          ref1FirstnameMsg: '',
          ref1Lastname: '',
          ref1LastnameMsg: '',
          ref1Relationship: '',
          ref1Mobile: '',
          ref1MobileMsg: '',
          ref1WorkTelephone: '',
          ref1WorkTelephoneMsg: '',
          ref1HomeTelephone: '',
          ref1HomeTelephoneMsg: '',
          ref2Prefix: '',
          ref2PrefixMsg: '',
          ref2Firstname: '',
          ref2FirstnameMsg: '',
          ref2Lastname: '',
          ref2LastnameMsg: '',
          ref2Relationship: '',
          ref2Mobile: '',
          ref2MobileMsg: '',
          ref2WorkTelephone: '',
          ref2WorkTelephoneMsg: '',
          ref2HomeTelephone: '',
          ref2HomeTelephoneMsg: '',
          conjugalPrefix: '',
          conjugalPrefixMsg: '',
          conjugalFirstname: '',
          conjugalFirstnameMsg: '',
          conjugalLastname: '',
          conjugalLastnameMsg: '',
          conjugalOccupation: '',
          conjugalOccupationMsg: '',
          conjugalIncome: '',
          conjugalIncomeMsg: '',
          children: '',
          childrenMsg: '',
          isConsent2: false,
          shippingHouseNo: '',
          shippingMoo: '',
          shippingVillage: '',
          shippingFloor: '',
          shippingSoi: '',
          shippingRoad: '',
          shippingPostalCode: '',
          shippingProvinceCode: '',
          shippingAmphurCode: '',
          shippingTambolCode: '',
          shippingProvinceCodeName: '',
          shippingAmphurCodeName: '',
          shippingTambolCodeName: '',
          // not to send
          shippingAddress: 'current',
          valid: false,
          // not to send
        };
        break;
    }
  };

  validate = () => {
    const keys = [
      'ref1Prefix',
      'ref1Firstname',
      'ref1Lastname',
      'ref1Relationship',
      'ref1Mobile',
      'ref1HomeTelephone',
      // 'fileName0',
      'isConsent2',
    ];

    const invalid = keys
      .map(key => ({
        key,
        value: this.state[key],
      }))
      .find(({ value }) => !value);

    // console.log('invalid: ', invalid);

    return !invalid;
  };

  initialRequireMessage = () => {
    const keys = [
      'ref1Prefix',
      'ref1Firstname',
      'ref1Lastname',
      'ref1Relationship',
      'ref1Mobile',
      'ref1HomeTelephone',
      // 'isConsent2',
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

    const { shippingAddress } = this.state;
    this.handleShippingAddressChange({
      target: {
        value: shippingAddress,
      },
    });
  };

  handleChange = (e, required = false) => {
    const { name, value } = e.target;
    const msgKey = `${name}Msg`;

    this.setState({
      [name]: value,
      [msgKey]: requiredMessage(required, value),
      [`${name}Valid`]: !required || (required && value),
    }, () => {
      const valid = this.validate();
      this.setState({ valid });
    });
  };

  handleLookupChange = (value, name, id) => {
    this.setState({ [id]: value }, () => {
      const valid = this.validate();
      this.setState({ valid });
    });
  };

  handleShippingAddressChange = e => {
    const { target: { value } } = e;

    this.setState({ shippingAddress: value },
      () => {
        this.setState({
          shippingHouseNo: '',
          shippingMoo: '',
          shippingVillage: '',
          shippingFloor: '',
          shippingSoi: '',
          shippingRoad: '',
          shippingPostalCode: '',
          shippingProvinceCode: '',
          shippingAmphurCode: '',
          shippingTambolCode: '',
          shippingProvinceCodeName: '',
          shippingAmphurCodeName: '',
          shippingTambolCodeName: '',
        });

        const { personalInfo } = this.props;

        if (value === 'current' && personalInfo) {
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
          } = personalInfo;

          this.setState({
            shippingHouseNo: number,
            shippingMoo: moo,
            shippingVillage: village,
            shippingSoi: soi,
            shippingRoad: road,
            shippingPostalCode: zipCode,
            shippingProvinceCode: province,
            shippingAmphurCode: amphurCode,
            shippingTambolCode: tambolCode,
            shippingProvinceCodeName: provinceName,
            shippingAmphurCodeName: amphurCodeName,
            shippingTambolCodeName: tambolCodeName,
          });
        }
      },
    );
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

  handleIsConsent2Change = () => {
    const { isConsent2 } = this.state;
    this.setState({ isConsent2: !isConsent2 },
      () => {
        const valid = this.validate();
        this.setState({ valid });
      },
    );
  };

  handleFileChange = (e, required = false, docType) => {
    const { target: { files, name, value } } = e;

    if (files && files.length > 0) {
      const { uploadFile } = this.props;
      const file = files[0];
      const fileName = value.split('\\').pop().split('/').pop();
      const formData = new FormData();

      formData.append('filename', fileName);
      formData.append('file', file);
      formData.append('docType', docType);

      uploadFile(name, value, fileName, formData, docType);
    }
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

  handleBack = () => {
    const { history } = this.props;
    history.push('/loan-info');
  };

  handleNext = e => {
    e.preventDefault();

    const {
      ref1Prefix,
      ref1PrefixMsg,
      ref1Firstname,
      ref1FirstnameMsg,
      ref1Lastname,
      ref1LastnameMsg,
      ref1Relationship,
      ref1Mobile,
      ref1MobileMsg,
      ref1WorkTelephone,
      ref1WorkTelephoneMsg,
      ref1HomeTelephone,
      ref1HomeTelephoneMsg,
      ref2Prefix,
      ref2PrefixMsg,
      ref2Firstname,
      ref2FirstnameMsg,
      ref2Lastname,
      ref2LastnameMsg,
      ref2Relationship,
      ref2Mobile,
      ref2MobileMsg,
      ref2WorkTelephone,
      ref2WorkTelephoneMsg,
      ref2HomeTelephone,
      ref2HomeTelephoneMsg,
      conjugalPrefix,
      conjugalPrefixMsg,
      conjugalFirstname,
      conjugalFirstnameMsg,
      conjugalLastname,
      conjugalLastnameMsg,
      conjugalOccupation,
      conjugalOccupationMsg,
      conjugalIncome,
      conjugalIncomeMsg,
      children,
      //
      shippingHouseNo,
      shippingMoo,
      shippingVillage,
      shippingFloor,
      shippingSoi,
      shippingRoad,
      shippingPostalCode,
      shippingProvinceCode,
      shippingAmphurCode,
      shippingTambolCode,
      shippingProvinceCodeName,
      shippingAmphurCodeName,
      shippingTambolCodeName,
      shippingAddress,
      //
      isConsent2,
    } = this.state;

    const data = {
      ref1Prefix,
      ref1PrefixMsg,
      ref1Firstname,
      ref1FirstnameMsg,
      ref1Lastname,
      ref1LastnameMsg,
      ref1Relationship,
      ref1Mobile,
      ref1MobileMsg,
      ref1WorkTelephone,
      ref1WorkTelephoneMsg,
      ref1HomeTelephone,
      ref1HomeTelephoneMsg,
      ref2Prefix,
      ref2PrefixMsg,
      ref2Firstname,
      ref2FirstnameMsg,
      ref2Lastname,
      ref2LastnameMsg,
      ref2Relationship,
      ref2Mobile,
      ref2MobileMsg,
      ref2WorkTelephone,
      ref2WorkTelephoneMsg,
      ref2HomeTelephone,
      ref2HomeTelephoneMsg,
      conjugalPrefix,
      conjugalPrefixMsg,
      conjugalFirstname,
      conjugalFirstnameMsg,
      conjugalLastname,
      conjugalLastnameMsg,
      conjugalOccupation,
      conjugalOccupationMsg,
      conjugalIncome,
      conjugalIncomeMsg,
      children,
      //
      shippingHouseNo,
      shippingMoo,
      shippingVillage,
      shippingFloor,
      shippingSoi,
      shippingRoad,
      shippingPostalCode,
      shippingProvinceCode,
      shippingAmphurCode,
      shippingTambolCode,
      shippingProvinceCodeName,
      shippingAmphurCodeName,
      shippingTambolCodeName,
      shippingAddress,
      //
      isConsent2,
    };

    console.log(data);

    const { completeAdditionalInfo, history } = this.props;

    completeAdditionalInfo(data, () => history.push('/summary'));
    // const { history } = this.props;
    // history.push('/summary');
  };

  renderShippingAddress = type => {
    let _render;

    const {
      shippingHouseNo,
      shippingMoo,
      shippingVillage,
      shippingFloor,
      shippingSoi,
      shippingRoad,
      shippingPostalCode,
      shippingProvinceCode,
      shippingAmphurCode,
      shippingTambolCode,
      shippingProvinceCodeName,
      shippingAmphurCodeName,
      shippingTambolCodeName,
    } = this.state;

    switch (type) {
      case 'current':
        _render = <div className="col-12">
          <div className="row">
            <div className="col-4">
              <TextField
                id="shippingHouseNo"
                name="shippingHouseNo"
                floatingLabelText="บ้านเลขที่"
                value={shippingHouseNo}
                maxLength="10"
                disabled
                fullWidth
              />
            </div>
            <div className="col-4">
              <TextField
                id="shippingMoo"
                name="shippingMoo"
                floatingLabelText="หมู่ที่"
                value={shippingMoo}
                maxLength="3"
                disabled
                fullWidth
              />
            </div>
            <div className="col-4">
              <TextField
                id="shippingVillage"
                name="shippingVillage"
                floatingLabelText="ชื่อหมู่บ้าน / อาคาร"
                value={shippingVillage}
                maxLength="100"
                fullWidth
                disabled
              />
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <TextField
                id="shippingSoi"
                name="shippingSoi"
                floatingLabelText="ซอย"
                value={shippingSoi}
                maxLength="100"
                disabled
                fullWidth
              />
            </div>
            <div className="col">
              <TextField
                id="shippingRoad"
                name="shippingRoad"
                floatingLabelText="ถนน"
                value={shippingRoad}
                maxLength="100"
                disabled
                fullWidth
              />
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <TextField
                id="shippingPostalCode"
                name="shippingPostalCode"
                floatingLabelText="จังหวัด"
                value={shippingProvinceCodeName}
                maxLength="5"
                disabled
                fullWidth
              />
            </div>
            <div className="col-4">
              <TextField
                id="shippingPostalCode"
                name="shippingPostalCode"
                floatingLabelText="อำเภอ / เขต"
                value={shippingAmphurCodeName}
                maxLength="5"
                disabled
                fullWidth
              />
            </div>
            <div className="col-4">
              <TextField
                id="shippingPostalCode"
                name="shippingPostalCode"
                floatingLabelText="ตำบล / แขวง"
                value={shippingTambolCodeName}
                maxLength="5"
                disabled
                fullWidth
              />
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <TextField
                id="shippingPostalCode"
                name="shippingPostalCode"
                floatingLabelText="รหัสไปรษณีย์"
                value={shippingPostalCode}
                maxLength="5"
                disabled
                fullWidth
              />
            </div>
          </div>
        </div>;
        break;

      default:
        _render = <div className="col-10">
          <div className="row">
            <div className="col">
              <TextField
                id="shippingHouseNo"
                name="shippingHouseNo"
                floatingLabelText="บ้านเลขที่"
                value={shippingHouseNo}
                onChange={e => this.handleChange(e, true)}
                maxLength="10"
                fullWidth
              />
            </div>
            <div className="col">
              <TextField
                id="shippingMoo"
                name="shippingMoo"
                floatingLabelText="หมู่ที่"
                value={shippingMoo}
                onChange={e => this.handleChange(e, true)}
                maxLength="3"
                fullWidth
              />
            </div>
            <div className="col">
              <TextField
                id="shippingFloor"
                name="shippingFloor"
                floatingLabelText="ชั้น"
                value={shippingFloor}
                onChange={e => this.handleChange(e, true)}
                maxLength="3"
                fullWidth
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <TextField
                id="shippingVillage"
                name="shippingVillage"
                floatingLabelText="ชื่อหมู่บ้าน / อาคาร"
                value={shippingVillage}
                onChange={e => this.handleChange(e, true)}
                maxLength="100"
                fullWidth
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <TextField
                id="shippingSoi"
                name="shippingSoi"
                floatingLabelText="ซอย"
                value={shippingSoi}
                onChange={e => this.handleChange(e, true)}
                maxLength="100"
                fullWidth
              />
            </div>
            <div className="col">
              <TextField
                id="shippingRoad"
                name="shippingRoad"
                floatingLabelText="ถนน"
                value={shippingRoad}
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
                provinceValueField="shippingProvinceCode"
                provinceNameField="shippingProvinceCodeName"
                amphurValueField="shippingAmphurCode"
                amphurNameField="shippingAmphurCodeName"
                tambolValueField="shippingTambolCode"
                tambolNameField="shippingTambolCodeName"
                provinceValue={shippingProvinceCode}
                amphurValue={shippingAmphurCode}
                tambolValue={shippingTambolCode}
                provinceName={shippingProvinceCodeName}
                amphurName={shippingAmphurCodeName}
                tambolName={shippingTambolCodeName}
                handleChange={this.handleLocationChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <TextField
                id="shippingPostalCode"
                name="shippingPostalCode"
                floatingLabelText="รหัสไปรษณีย์"
                value={shippingPostalCode}
                onChange={e => this.handleChange(e, true)}
                maxLength="5"
                fullWidth
              />
            </div>
          </div>
        </div>;
    }

    return _render;
  };

  render() {
    const {
      ref1Prefix,
      ref1Firstname,
      ref1FirstnameMsg,
      ref1Lastname,
      ref1LastnameMsg,
      ref1Relationship,
      ref1Mobile,
      ref1MobileMsg,
      ref1WorkTelephone,
      ref1WorkTelephoneMsg,
      ref1HomeTelephone,
      ref1HomeTelephoneMsg,
      ref2Prefix,
      ref2Firstname,
      ref2FirstnameMsg,
      ref2Lastname,
      ref2LastnameMsg,
      ref2Relationship,
      ref2Mobile,
      ref2MobileMsg,
      ref2WorkTelephone,
      ref2WorkTelephoneMsg,
      ref2HomeTelephone,
      ref2HomeTelephoneMsg,
      conjugalPrefix,
      conjugalPrefixMsg,
      conjugalFirstname,
      conjugalFirstnameMsg,
      conjugalLastname,
      conjugalLastnameMsg,
      conjugalOccupation,
      conjugalOccupationMsg,
      conjugalIncome,
      conjugalIncomeMsg,
      children,
      childrenMsg,
      shippingAddress,
      fileName0Msg,
      fileName1Msg,
      fileName2Msg,
      fileName3Msg,
      fileName4Msg,
      fileName5Msg,
      fileName6Msg,
      isConsent2,
      valid,
    } = this.state;

    const { personalInfo, message } = this.props;
    const status = personalInfo ? personalInfo.status : '';

    return (
      <div>
        <form className="crud-form">
          <Card style={styles.marginBottom}>
            <div style={styles.sectionTitle}>
              <CardHeader
                title="บุคคลอ้างอิง 1"
                titleStyle={styles.TitleText}
              />
            </div>
            <CardText>
              <div className="row">
                <div className="col-4">
                  <PrefixTh
                    id="ref1Prefix"
                    name="ref1Prefix"
                    value={ref1Prefix}
                    label="คำนำหน้าชื่อ (TH)"
                    required
                    onSelectItem={this.handleLookupChange}
                  />
                </div>
                <div className="col-4">
                  <TextField
                    id="ref1Firstname"
                    name="ref1Firstname"
                    value={ref1Firstname}
                    floatingLabelText="ชื่อ (TH)"
                    errorText={ref1FirstnameMsg}
                    onChange={e => this.handleChange(e, true)}
                    fullWidth
                  />
                </div>
                <div className="col-4">
                  <TextField
                    id="ref1Lastname"
                    name="ref1Lastname"
                    value={ref1Lastname}
                    floatingLabelText="นามสกุล (TH)"
                    errorText={ref1LastnameMsg}
                    onChange={e => this.handleChange(e, true)}
                    fullWidth
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <Relationship
                    id="ref1Relationship"
                    name="ref1Relationship"
                    value={ref1Relationship}
                    floatingLabelText="ความสัมพันธ์"
                    label="ความสัมพันธ์"
                    required
                    onSelectItem={this.handleLookupChange}
                    single={status === 'โสด'}
                  />
                </div>
                <div className="col-3">
                  <Tel
                    id="ref1Mobile"
                    name="ref1Mobile"
                    label="เบอร์โทรศัพท์มือถือ"
                    value={ref1Mobile}
                    handleChange={this.handleNumberChange}
                    errorText={ref1MobileMsg}
                    required
                  />
                </div>
                <div className="col-3">
                  <Tel
                    id="ref1WorkTelephone"
                    name="ref1WorkTelephone"
                    value={ref1WorkTelephone}
                    label="เบอร์โทรศัพท์ที่ทำงาน"
                    errorText={ref1WorkTelephoneMsg}
                    handleChange={this.handleNumberChange}
                    fullWidth
                  />
                </div>
                <div className="col-3">
                  <Tel
                    id="ref1HomeTelephone"
                    name="ref1HomeTelephone"
                    value={ref1HomeTelephone}
                    label="เบอร์โทรศัพท์บ้าน"
                    errorText={ref1HomeTelephoneMsg}
                    handleChange={this.handleNumberChange}
                    fullWidth
                    required
                  />
                </div>
              </div>
            </CardText>
          </Card>

          <Card style={styles.marginBottom}>
            <div style={styles.sectionTitle}>
              <CardHeader
                title="บุคคลอ้างอิง 2"
                titleStyle={styles.TitleText}
              />
            </div>
            <CardText>
              <div className="row">
                <div className="col-4">
                  <PrefixTh
                    id="ref2Prefix"
                    name="ref2Prefix"
                    value={ref2Prefix}
                    label="คำนำหน้าชื่อ (TH)"
                    onSelectItem={this.handleLookupChange}
                  />
                </div>
                <div className="col-4">
                  <TextField
                    id="ref2Firstname"
                    name="ref2Firstname"
                    value={ref2Firstname}
                    floatingLabelText="ชื่อ (TH)"
                    errorText={ref2FirstnameMsg}
                    onChange={e => this.handleChange(e, true)}
                    fullWidth
                  />
                </div>
                <div className="col-4">
                  <TextField
                    id="ref2Lastname"
                    name="ref2Lastname"
                    value={ref2Lastname}
                    floatingLabelText="นามสกุล (TH)"
                    errorText={ref2LastnameMsg}
                    onChange={e => this.handleChange(e, true)}
                    fullWidth
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <Relationship
                    id="ref2Relationship"
                    name="ref2Relationship"
                    value={ref2Relationship}
                    floatingLabelText="ความสัมพันธ์"
                    label="ความสัมพันธ์"
                    onSelectItem={this.handleLookupChange}
                    required={false}
                    single={status === 'โสด'}
                  />
                </div>
                <div className="col-3">
                  <Mobile
                    id="ref2Mobile"
                    name="ref2Mobile"
                    value={ref2Mobile}
                    label="เบอร์โทรศัพท์มือถือ"
                    errorText={ref2MobileMsg}
                    onChange={this.handleLookupChange}
                    fullWidth
                  />
                </div>
                <div className="col-3">
                  <Tel
                    id="ref2WorkTelephone"
                    name="ref2WorkTelephone"
                    value={ref2WorkTelephone}
                    label="เบอร์โทรศัพท์ที่ทำงาน"
                    errorText={ref2WorkTelephoneMsg}
                    handleChange={this.handleLookupChange}
                    fullWidth
                  />
                </div>
                <div className="col-3">
                  <Tel
                    id="ref2HomeTelephone"
                    name="ref2HomeTelephone"
                    value={ref2HomeTelephone}
                    label="เบอร์โทรศัพท์บ้าน"
                    errorText={ref2HomeTelephoneMsg}
                    handleChange={this.handleLookupChange}
                    fullWidth
                  />
                </div>
              </div>
            </CardText>
          </Card>

          {(status !== 'โสด')
            ? <Card style={styles.marginBottom}>
              <div style={styles.sectionTitle}>
                <CardHeader
                  title="ข้อมูลคู่สมรส"
                  titleStyle={styles.TitleText}
                />
              </div>
              <CardText>
                <div className="row">
                  <div className="col-4">
                    <PrefixTh
                      id="conjugalPrefix"
                      name="conjugalPrefix"
                      value={conjugalPrefix}
                      label="คำนำหน้าชื่อ"
                      onSelectItem={this.handleLookupChange}
                      errorText={conjugalPrefixMsg}
                    />
                  </div>
                  <div className="col-4">
                    <TextField
                      id="conjugalFirstname"
                      name="conjugalFirstname"
                      value={conjugalFirstname}
                      floatingLabelText="ชื่อ"
                      errorText={conjugalFirstnameMsg}
                      onChange={e => this.handleChange(e, true)}
                      fullWidth
                    />
                  </div>
                  <div className="col-4">
                    <TextField
                      id="conjugalLastname"
                      name="conjugalLastname"
                      value={conjugalLastname}
                      floatingLabelText="นามสกุล"
                      errorText={conjugalLastnameMsg}
                      onChange={e => this.handleChange(e, true)}
                      fullWidth
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-3">
                    <TextField
                      id="conjugalOccupation"
                      name="conjugalOccupation"
                      value={conjugalOccupation}
                      floatingLabelText="อาชีพ"
                      errorText={conjugalOccupationMsg}
                      onChange={e => this.handleChange(e, true)}
                      fullWidth
                    />
                  </div>
                  <div className="col-3">
                    <TextField
                      id="conjugalIncome"
                      name="conjugalIncome"
                      value={conjugalIncome}
                      floatingLabelText="รายได้ต่อเดือน"
                      errorText={conjugalIncomeMsg}
                      onChange={e => this.handleChange(e, true)}
                      fullWidth
                    />
                  </div>
                  <div className="col-3">
                    <TextField
                      id="children"
                      name="children"
                      value={children}
                      floatingLabelText="จำนวนบุตร/ธิดา"
                      errorText={childrenMsg}
                      onChange={e => this.handleChange(e, true)}
                      fullWidth
                    />
                  </div>
                  <div className="col-3">
                    <TextField
                      id="children"
                      name="children"
                      value={children}
                      floatingLabelText="จำนวนบุตร/ธิดา"
                      errorText={childrenMsg}
                      onChange={e => this.handleChange(e, true)}
                      fullWidth
                    />
                  </div>
                </div>
              </CardText>
            </Card>
            : <div />
          }


          <Card style={styles.marginBottom}>
            <div style={styles.sectionTitle}>
              <CardHeader
                title="สถานที่จัดส่งเอกสาร"
                titleStyle={styles.TitleText}
              />
            </div>
            <CardText>
              <div className="row">
                <div className="col-12">
                  <RadioButtonGroup
                    name="shippingAddress"
                    defaultSelected={shippingAddress}
                    onChange={e => this.handleShippingAddressChange(e)}
                  >
                    <RadioButton
                      value="current"
                      label="ที่อยู่ปัจจุบัน"
                    />
                    <RadioButton
                      value="office"
                      label="ที่อยู่ที่ทำงาน"
                    />
                    <RadioButton
                      value="others"
                      label="อื่นๆ"
                    />
                  </RadioButtonGroup>
                </div>
                {this.renderShippingAddress(shippingAddress)}
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
                <div className="col-3">
                  <label htmlFor="fileName0">สำเนาบัตรประชาชน</label>
                </div>
                <div className="col-9">
                  <TextField
                    type="file"
                    id="fileName0"
                    name="fileName0"
                    errorText={fileName0Msg}
                    onChange={e => this.handleFileChange(e, true, 'identity')}
                    fullWidth
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <label htmlFor="fileName1">สลิปเงินเดือน (เดือนล่าสุด)</label>
                </div>
                <div className="col-9">
                  <TextField
                    type="file"
                    id="fileName1"
                    name="fileName1"
                    errorText={fileName1Msg}
                    onChange={e => this.handleFileChange(e, true, 'payslip')}
                    fullWidth
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <label htmlFor="fileName2">สำเนาหน้าแรกสมุดบัญชีเงินฝากที่ใช้รับเงินเดือน</label>
                </div>
                <div className="col-9">
                  <TextField
                    type="file"
                    id="fileName2"
                    name="fileName2"
                    errorText={fileName2Msg}
                    onChange={e => this.handleFileChange(e, true, 'account')}
                    fullWidth
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-3">
                  <label htmlFor="fileName3">ทะเบียนบ้าน</label>
                </div>
                <div className="col-9">
                  <TextField
                    type="file"
                    id="fileName3"
                    name="fileName3"
                    errorText={fileName3Msg}
                    onChange={e => this.handleFileChange(e, true, 'household_registration')}
                    fullWidth
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-3">
                  <label htmlFor="fileName4">แบงค์ Statement บัญชีเงินเดือน (ย้อนหลัง 6 เดือน) #1</label>
                </div>
                <div className="col-9">
                  <TextField
                    type="file"
                    id="fileName4"
                    name="fileName4"
                    errorText={fileName4Msg}
                    onChange={e => this.handleFileChange(e, true, 'statement_1')}
                    fullWidth
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-3">
                  <label htmlFor="fileName5">แบงค์ Statement บัญชีเงินเดือน (ย้อนหลัง 6 เดือน) #2</label>
                </div>
                <div className="col-9">
                  <TextField
                    type="file"
                    id="fileName5"
                    name="fileName5"
                    errorText={fileName5Msg}
                    onChange={e => this.handleFileChange(e, true, 'statement_2')}
                    fullWidth
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-3">
                  <label htmlFor="fileName6">แบงค์ Statement บัญชีเงินเดือน (ย้อนหลัง 6 เดือน) #3</label>
                </div>
                <div className="col-9">
                  <TextField
                    type="file"
                    id="fileName6"
                    name="fileName6"
                    errorText={fileName6Msg}
                    onChange={e => this.handleFileChange(e, true, 'statement_3')}
                    fullWidth
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  รายละเอียดเอกสารที่ต้องแนบ <br />
                  - สำเนาเอกสารที่แนบต้องไม่มีการลงนามรับรองสำเนาถูกต้อง
                  โดยทาง ธนาคารจะจัดเตรียมเอกสารเพื่อให้ท่านทำการลงนามอีกครั้งในภายหลัง <br />
                  - สำเนาเอกสารต้องชัดเจน ไม่ซีดจางหรือเข้มดำ <br />
                  - สำเนาบัตรประชาชน
                  ต้องเป็นสำเนาของบัตรประชาชนที่เป็นปัจจุบันและไม่หมดอายุ <br />
                  - สำเนาทะเบียนบ้านต้องประกอบด้วยหน้าแรกที่มีที่อยู่
                  และหน้าที่มีชื่อของผู้ขอสินเชื่อ <br />
                  - สลิปเงินเดือนต้องเป็นสลิปเงินเดือนล่าสุด
                  มีชื่อผู้ขอสินเชื่อ วันที่ และชื่อบริษัทที่สังกัดชัดเจน <br />
                  - สำเนาบัญชีเงินฝากที่ใช้รับเงินเดือน
                  แสดงรายได้ย้อนหลัง 6 เดือนนับจากปัจจุบัน
                    จะต้องแสดงรายละเอียดของเงินเข้าออก
                    และแสดงรายได้ที่มาจากเงินเดือนครบทั้ง 6 เดือน โดยสามารถใช้ <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;- สำเนาจากสมุดบัญชีเล่มจริง หรือ <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;- สำเนารายการเดินบัญชีจากระบบ
                    online (online statement)
                      โดยจะต้องมีระบุ ชื่อบัญชี เลขที่บัญชี และธนาคารชัดเจน <br />
                  - กรณีลูกค้าได้รับอนุมัติสินเชื่อ ธนาคารจะนำส่งเงินหลัง
                    หักค่าอากรแสตมป์ติดสัญญาและค่าใช้จ่ายอื่นๆตามที่ธนาคารประะกาศ
                    /กำหนด เข้าบัญชีตามสำเนาหน้าแรกสมุดบัญชีเงินฝากที่ใช้รับเงินเดือน
                    และใช้บัญชีเงินฝากดังกล่าวในการสมัครบริการหักบัญชีเงินฝากอัตโนมัติ
                    เพื่อชำระสินเชื่อรายเดือน <br />
                  - ธนาคารขอสงวนสิทธิ์ในการขอเอกสารประกอบการพิจารณาสินเชื่อเพิ่มเติมในบางกรณี
                </div>
              </div>
            </CardText>
          </Card>

          <div className="row">
            <div className="col">
              <Checkbox
                label="ฉันยินยอมข้อตกลงและเงื่อนไขการใช้บริการ"
                style={styles.checkbox}
                value={isConsent2}
                checked={isConsent2}
                onCheck={this.handleIsConsent2Change}
              />
            </div>
          </div>

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
                onClick={this.handleNext}
              />
            </div>
          </div>
        </form>
        <Snackbar
          open={message !== ''}
          message={message}
          autoHideDuration={4000}
        />
      </div >
    );
  }
}

AdditionalInfo.propTypes = {
  history: PropTypes.object.isRequired,
  data: PropTypes.object,
  personalInfo: PropTypes.object,
  uploadFile: PropTypes.func.isRequired,
  completeAdditionalInfo: PropTypes.func.isRequired,
  message: PropTypes.string,
};

AdditionalInfo.defaultProps = {
  data: null,
  personalInfo: null,
  message: '',
};

export default withRouter(AdditionalInfo);
