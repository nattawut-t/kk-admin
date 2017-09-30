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

const requiredMessage = (required, value) =>
  (required && !value) ? 'กรุณากรอกข้อมูล' : '';

const validationKeys = [
  'ref1Prefix',
  'ref1Firstname',
  'ref1Lastname',
  'ref1Relationship',
  'ref1Mobile',
  'ref1HomeTelephone',
  // 'fileName0',
  'isConsent2',
];

const messageKeys = [
  'ref1Prefix',
  'ref1Firstname',
  'ref1Lastname',
  'ref1Relationship',
  'ref1Mobile',
  'ref1HomeTelephone',
  // 'isConsent2',
];

class AdditionalInfo extends Component {

  componentWillMount() {
    window.scrollTo(0, 0);
    console.log('ai.componentWillMount');
    const { getDraft } = this.props;
    getDraft();
  }

  componentDidMount() {
    const { data } = this.props;

    console.log('ai.componentDidMount', data);

    this.setState(data,
      () => {
        this.initialMessage();
        const valid = this.validate();
        this.setState({ valid });
      });
  }

  validate = () => {
    const invalid = validationKeys
      .map(key => ({
        key,
        value: this.state[key],
      }))
      .find(({ value }) => !value);

    return !invalid;
  };

  initialMessage = () => {
    messageKeys
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

        if (this.shippingLocation) {
          this.shippingLocation.initialize();
        }

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
          //
          officeNumber,
          officeMoo,
          officeVillage,
          officeFloor,
          officeSoi,
          officeRoad,
          officeProvince,
          officeAmphurCode,
          officeTambolCode,
          officeProvinceName,
          officeAmphurCodeName,
          officeTambolCodeName,
          officeZipCode,
          } = this.state;

        const message = 'กรุณากรอกข้อมูล';

        switch (value) {
          case 'current':
            this.setState({
              shippingHouseNo: number,
              shippingMoo: moo,
              shippingVillage: village,
              shippingFloor: 1,
              shippingSoi: soi,
              shippingRoad: road,
              shippingProvinceCode: province,
              shippingAmphurCode: amphurCode,
              shippingTambolCode: tambolCode,
              shippingProvinceCodeName: provinceName,
              shippingAmphurCodeName: amphurCodeName,
              shippingTambolCodeName: tambolCodeName,
              shippingPostalCode: zipCode,
            });
            break;

          case 'office':
            this.setState({
              shippingHouseNo: officeNumber,
              shippingMoo: officeMoo,
              shippingVillage: officeVillage,
              shippingFloor: officeFloor,
              shippingSoi: officeSoi,
              shippingRoad: officeRoad,
              shippingProvinceCode: officeProvince,
              shippingAmphurCode: officeAmphurCode,
              shippingTambolCode: officeTambolCode,
              shippingProvinceCodeName: officeProvinceName,
              shippingAmphurCodeName: officeAmphurCodeName,
              shippingTambolCodeName: officeTambolCodeName,
              shippingPostalCode: officeZipCode,
            });
            break;

          default:
            this.setState({
              shippingHouseNoMsg: message,
              shippingMooMsg: message,
              shippingVillageMsg: message,
              shippingSoiMsg: message,
              shippingRoadMsg: message,
              // shippingProvinceCode: officeProvince,
              // shippingAmphurCode: officeAmphurCode,
              // shippingTambolCode: officeTambolCode,
              // shippingProvinceCodeName: officeProvinceName,
              // shippingAmphurCodeName: officeAmphurCodeName,
              // shippingTambolCodeName: officeTambolCodeName,
              shippingPostalCodeMsg: message,
            });
            break;
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

  handleFileChange = (e, required = false, docType, fileName) => {
    const { target: { files, name, value } } = e;

    if (files && files.length > 0) {
      const { uploadFile } = this.props;
      const file = files[0];
      const _fileName = value.split('\\').pop().split('/').pop();
      const formData = new FormData();

      formData.append('filename', _fileName);
      formData.append('file', file);
      formData.append('docType', docType);

      console.log(fileName);
      // this.setState({ [fileName]: value });

      uploadFile(name, value, _fileName, formData, docType, _file => {
        console.log('callback: ', docType, _file, fileName, value);
        this.setState({
          [docType]: _file,
          [fileName]: _fileName,
        });
      });
    }
  };

  handleNumberChange = (name, value, errorMessage = '') => {
    const msgKey = `${name}Msg`;

    this.setState({
      [name]: value,
      [msgKey]: errorMessage,
      [`${name}Valid`]: !errorMessage,
    }, () => {
      const valid = this.validate();
      this.setState({ valid });
    });
  };

  save = path => {
    const {
      ref1Prefix,
      ref1Firstname,
      ref1Lastname,
      ref1Relationship,
      ref1Mobile,
      ref1WorkTelephone,
      ref1HomeTelephone,
      //
      ref2Prefix,
      ref2Firstname,
      ref2Lastname,
      ref2Relationship,
      ref2Mobile,
      ref2WorkTelephone,
      ref2HomeTelephone,
      //
      conjugalPrefix,
      conjugalFirstname,
      conjugalLastname,
      conjugalOccupation,
      conjugalIncome,
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
      identity,
      account,
      household_registration,
      payslip,
      statement_1,
      statement_2,
      statement_3,
      //
      fileName0,
      fileName1,
      fileName2,
      fileName3,
      fileName4,
      fileName5,
      fileName6,
      //
      isConsent2,
      //
    } = this.state;

    let files = [];
    files.push(identity);
    files.push(account);
    files.push(household_registration);
    files.push(payslip);
    files.push(statement_1);
    files.push(statement_2);
    files.push(statement_3);
    files = files.filter(file => file);

    const data = {
      ref1Prefix,
      ref1Firstname,
      ref1Lastname,
      ref1Relationship,
      ref1Mobile,
      ref1WorkTelephone,
      ref1HomeTelephone,
      //
      ref2Prefix,
      ref2Firstname,
      ref2Lastname,
      ref2Relationship,
      ref2Mobile,
      ref2WorkTelephone,
      ref2HomeTelephone,
      //
      conjugalPrefix,
      conjugalFirstname,
      conjugalLastname,
      conjugalOccupation,
      conjugalIncome,
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
      files,
      //
      identity,
      account,
      household_registration,
      payslip,
      statement_1,
      statement_2,
      statement_3,
      //
      fileName0,
      fileName1,
      fileName2,
      fileName3,
      fileName4,
      fileName5,
      fileName6,
    };

    console.log('ai.handleNextClick.data: ', data);

    const { saveDraft, history } = this.props;
    saveDraft(data, () => history.push(path));
  }

  handleBackClick = e => {
    e.preventDefault();
    this.save('/loan-info');
  };

  handleNextClick = e => {
    e.preventDefault();
    this.save('/summary');
  };

  handleFileNameChange = () => { };

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
      //
      shippingHouseNoMsg,
      shippingMooMsg,
      shippingVillageMsg,
      shippingSoiMsg,
      shippingRoadMsg,
      shippingPostalCodeMsg,
    } = this.state;

    console.log('shippingFloor: ', shippingFloor);

    switch (type) {
      case 'current':
        _render = <div>

          <div className="col-3">
            <TextField
              id="shippingHouseNo"
              name="shippingHouseNo"
              floatingLabelText="บ้านเลขที่"
              value={shippingHouseNo}
              readOnly
              fullWidth
            />
          </div>
          <div className="col-3">
            <TextField
              id="shippingMoo"
              name="shippingMoo"
              floatingLabelText="หมู่ที่"
              value={shippingMoo}
              readOnly
              fullWidth
            />
          </div>
          <div className="col-6">
            <TextField
              id="shippingVillage"
              name="shippingVillage"
              floatingLabelText="ชื่อหมู่บ้าน / อาคาร"
              value={shippingVillage}
              fullWidth
              readOnly
            />
          </div>
          <div className="col-6">
            <TextField
              id="shippingSoi"
              name="shippingSoi"
              floatingLabelText="ซอย"
              value={shippingSoi}
              readOnly
              fullWidth
            />
          </div>
          <div className="col-6">
            <TextField
              id="shippingRoad"
              name="shippingRoad"
              floatingLabelText="ถนน"
              value={shippingRoad}
              maxLength="100"
              readOnly
              fullWidth
            />
          </div>
          <div className="col-4">
            <TextField
              id="shippingPostalCode"
              name="shippingPostalCode"
              floatingLabelText="จังหวัด"
              value={shippingProvinceCodeName}
              readOnly
              fullWidth
            />
          </div>
          <div className="col-4">
            <TextField
              id="shippingPostalCode"
              name="shippingPostalCode"
              floatingLabelText="อำเภอ / เขต"
              value={shippingAmphurCodeName}
              readOnly
              fullWidth
            />
          </div>
          <div className="col-4">
            <TextField
              id="shippingPostalCode"
              name="shippingPostalCode"
              floatingLabelText="ตำบล / แขวง"
              value={shippingTambolCodeName}
              readOnly
              fullWidth
            />
          </div>
          <div className="col-4">
            <TextField
              id="shippingPostalCode"
              name="shippingPostalCode"
              floatingLabelText="รหัสไปรษณีย์"
              value={shippingPostalCode}
              readOnly
              fullWidth
            />
          </div>
        </div>;
        break;

      case 'office':
        _render = <div>

          <div className="col-3">
            <TextField
              id="shippingHouseNo"
              name="shippingHouseNo"
              floatingLabelText="บ้านเลขที่"
              value={shippingHouseNo}
              readOnly
              fullWidth
            />
          </div>
          <div className="col-3">
            <TextField
              id="shippingMoo"
              name="shippingMoo"
              floatingLabelText="หมู่ที่"
              value={shippingMoo}
              readOnly
              fullWidth
            />
          </div>
          <div className="col-6">
            <TextField
              id="shippingVillage"
              name="shippingVillage"
              floatingLabelText="ชื่อหมู่บ้าน / อาคาร"
              value={shippingVillage}
              fullWidth
              readOnly
            />
          </div>
          <div className="col-2">
            <TextField
              id="shippingSoi"
              name="shippingSoi"
              floatingLabelText="ชั้น"
              value={shippingFloor}
              readOnly
              fullWidth
            />
          </div>
          <div className="col-4">
            <TextField
              id="shippingSoi"
              name="shippingSoi"
              floatingLabelText="ซอย"
              value={shippingSoi}
              readOnly
              fullWidth
            />
          </div>
          <div className="col-6">
            <TextField
              id="shippingRoad"
              name="shippingRoad"
              floatingLabelText="ถนน"
              value={shippingRoad}
              readOnly
              fullWidth
            />
          </div>
          <div className="col-4">
            <TextField
              id="shippingPostalCode"
              name="shippingPostalCode"
              floatingLabelText="จังหวัด"
              value={shippingProvinceCodeName}
              readOnly
              fullWidth
            />
          </div>
          <div className="col-4">
            <TextField
              id="shippingPostalCode"
              name="shippingPostalCode"
              floatingLabelText="อำเภอ / เขต"
              value={shippingAmphurCodeName}
              readOnly
              fullWidth
            />
          </div>
          <div className="col-4">
            <TextField
              id="shippingPostalCode"
              name="shippingPostalCode"
              floatingLabelText="ตำบล / แขวง"
              value={shippingTambolCodeName}
              readOnly
              fullWidth
            />
          </div>
          <div className="col-4">
            <TextField
              id="shippingPostalCode"
              name="shippingPostalCode"
              floatingLabelText="รหัสไปรษณีย์"
              value={shippingPostalCode}
              readOnly
              fullWidth
            />
          </div>
        </div>;
        break;

      default:
        _render = <div>
          <div className="col-3">
            <TextField
              id="shippingHouseNo"
              name="shippingHouseNo"
              floatingLabelText="บ้านเลขที่"
              value={shippingHouseNo}
              errorText={shippingHouseNoMsg}
              onChange={e => this.handleChange(e, true)}
              maxLength="10"
              fullWidth
            />
          </div>
          <div className="col-3">
            <TextField
              id="shippingMoo"
              name="shippingMoo"
              floatingLabelText="หมู่ที่"
              value={shippingMoo}
              errorText={shippingMooMsg}
              onChange={e => this.handleChange(e, true)}
              maxLength="3"
              fullWidth
            />
          </div>
          <div className="col-6">
            <TextField
              id="shippingVillage"
              name="shippingVillage"
              floatingLabelText="ชื่อหมู่บ้าน / อาคาร"
              value={shippingVillage}
              errorText={shippingVillageMsg}
              onChange={e => this.handleChange(e, true)}
              maxLength="100"
              fullWidth
            />
          </div>
          <div className="col-2">
            <TextField
              id="shippingFloor"
              name="shippingFloor"
              floatingLabelText="ชั้น"
              value={shippingFloor}
              onChange={({ target: { value } }) =>
                this.setState({
                  shippingFloor: Number.parseFloat(value) || 0,
                })
              }
              maxLength="3"
              fullWidth
            />
          </div>
          <div className="col-4">
            <TextField
              id="shippingSoi"
              name="shippingSoi"
              floatingLabelText="ซอย"
              value={shippingSoi}
              errorText={shippingSoiMsg}
              onChange={e => this.handleChange(e, true)}
              maxLength="100"
              fullWidth
            />
          </div>
          <div className="col-6">
            <TextField
              id="shippingRoad"
              name="shippingRoad"
              floatingLabelText="ถนน"
              value={shippingRoad}
              errorText={shippingRoadMsg}
              onChange={e => this.handleChange(e, true)}
              maxLength="100"
              fullWidth
            />
          </div>
          <div className="col-12">
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
              ref={node => {
                this.shippingLocation = node;
              }}
            />
          </div>
          <div className="col-4">
            <TextField
              id="shippingPostalCode"
              name="shippingPostalCode"
              floatingLabelText="รหัสไปรษณีย์"
              value={shippingPostalCode}
              errorText={shippingPostalCodeMsg}
              onChange={e => this.handleChange(e, true)}
              maxLength="10"
              fullWidth
            />
          </div>
        </div>;
    }

    return _render;
  };

  render() {
    if (!this.state) {
      return <div className="loader" />;
    }

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
      //
      fileName0,
      fileName1,
      fileName2,
      fileName3,
      fileName4,
      fileName5,
      fileName6,
      //
      fileName0Msg,
      fileName1Msg,
      fileName2Msg,
      fileName3Msg,
      fileName4Msg,
      fileName5Msg,
      fileName6Msg,
      //
      isConsent2,
      //
      valid,
      //
      status,
    } = this.state;

    const { message } = this.props;
    // const status = personalInfo ? personalInfo.status : '';

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
                  <Tel
                    id="ref2Mobile"
                    name="ref2Mobile"
                    value={ref2Mobile}
                    label="เบอร์โทรศัพท์มือถือ"
                    handleChange={this.handleNumberChange}
                    errorText={ref2MobileMsg}
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
                    handleChange={this.handleNumberChange}
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
                    handleChange={this.handleNumberChange}
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
                <div className="col-7">
                  <TextField
                    id="fileName0"
                    name="fileName0"
                    value={fileName0}
                    onChange={e => this.handleFileNameChange(e)}
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col-2">
                  <TextField
                    type="file"
                    id="fileName0"
                    name="fileName0"
                    errorText={fileName0Msg}
                    onChange={e => this.handleFileChange(e, true, 'identity', 'fileName0')}
                    style={{ width: '105px' }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <label htmlFor="fileName1">สลิปเงินเดือน (เดือนล่าสุด)</label>
                </div>
                <div className="col-7">
                  <TextField
                    id="fileName1"
                    name="fileName1"
                    value={fileName1}
                    onChange={e => this.handleFileNameChange(e)}
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col-2">
                  <TextField
                    type="file"
                    id="fileName1"
                    name="fileName1"
                    errorText={fileName1Msg}
                    onChange={e => this.handleFileChange(e, true, 'payslip', 'fileName1')}
                    style={{ width: '105px' }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <label htmlFor="fileName2">สำเนาหน้าแรกสมุดบัญชีเงินฝากที่ใช้รับเงินเดือน</label>
                </div>
                <div className="col-7">
                  <TextField
                    id="fileName2"
                    name="fileName2"
                    value={fileName2}
                    onChange={e => this.handleFileNameChange(e)}
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col-2">
                  <TextField
                    type="file"
                    id="fileName2"
                    name="fileName2"
                    errorText={fileName2Msg}
                    onChange={e => this.handleFileChange(e, true, 'account', 'fileName2')}
                    style={{ width: '105px' }}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-3">
                  <label htmlFor="fileName3">ทะเบียนบ้าน</label>
                </div>
                <div className="col-7">
                  <TextField
                    id="fileName3"
                    name="fileName3"
                    value={fileName3}
                    onChange={e => this.handleFileNameChange(e)}
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col-2">
                  <TextField
                    type="file"
                    id="fileName3"
                    name="fileName3"
                    errorText={fileName3Msg}
                    onChange={e => this.handleFileChange(e, true, 'household_registration', 'fileName3')}
                    style={{ width: '105px' }}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-3">
                  <label htmlFor="fileName4">แบงค์ Statement บัญชีเงินเดือน (ย้อนหลัง 6 เดือน) #1</label>
                </div>
                <div className="col-7">
                  <TextField
                    id="fileName4"
                    name="fileName4"
                    value={fileName4}
                    onChange={e => this.handleFileNameChange(e)}
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col-2">
                  <TextField
                    type="file"
                    id="fileName4"
                    name="fileName4"
                    errorText={fileName4Msg}
                    onChange={e => this.handleFileChange(e, true, 'statement_1', 'fileName4')}
                    style={{ width: '105px' }}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-3">
                  <label htmlFor="fileName5">แบงค์ Statement บัญชีเงินเดือน (ย้อนหลัง 6 เดือน) #2</label>
                </div>
                <div className="col-7">
                  <TextField
                    id="fileName5"
                    name="fileName5"
                    value={fileName5}
                    onChange={e => this.handleFileNameChange(e)}
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col-2">
                  <TextField
                    type="file"
                    id="fileName5"
                    name="fileName5"
                    errorText={fileName5Msg}
                    onChange={e => this.handleFileChange(e, true, 'statement_2', 'fileName5')}
                    style={{ width: '105px' }}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-3">
                  <label htmlFor="fileName6">แบงค์ Statement บัญชีเงินเดือน (ย้อนหลัง 6 เดือน) #3</label>
                </div>
                <div className="col-7">
                  <TextField
                    id="fileName6"
                    name="fileName6"
                    value={fileName6}
                    onChange={e => this.handleFileNameChange(e)}
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col-2">
                  <TextField
                    type="file"
                    id="fileName6"
                    name="fileName6"
                    errorText={fileName6Msg}
                    onChange={e => this.handleFileChange(e, true, 'statement_3', 'fileName6')}
                    style={{ width: '105px' }}
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
                onClick={this.handleNextClick}
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

// AdditionalInfo.propTypes = {
//   history: PropTypes.object.isRequired,
//   data: PropTypes.object,
//   personalInfo: PropTypes.object,
//   uploadFile: PropTypes.func.isRequired,
//   save: PropTypes.func.isRequired,
//   message: PropTypes.string,
// };

// AdditionalInfo.defaultProps = {
//   data: null,
//   personalInfo: null,
//   message: '',
// };

AdditionalInfo.propTypes = {
  message: PropTypes.string,
  history: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  getDraft: PropTypes.func.isRequired,
  saveDraft: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
};

AdditionalInfo.defaultProps = {
  message: '',
};

export default withRouter(AdditionalInfo);
