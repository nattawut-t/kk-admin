import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
// import SelectField from 'material-ui/SelectField';
// import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
// import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { Card, CardHeader, CardText } from 'material-ui/Card';

import PrefixTh from '../shared/PrefixTh';
import Relationship from '../shared/Relationship';
// import PrefixEn from '../shared/PrefixEn';
// import Identity from '../shared/Identity';

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

class AdditionalInfo extends Component {
  state = {
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
    valid: false,
  };

  validate = () => {
    const { ref1Prefix } = this.state;
    console.log('>>> ref1Prefix: ', ref1Prefix);

    const keys = [
      'ref1Prefix',
      'ref1PrefixMsg',
      'ref1Firstname',
      'ref1FirstnameMsg',
      'ref1Lastname',
      'ref1LastnameMsg',
      'ref1Relationship',
      'ref1Mobile',
      'ref1MobileMsg',
      'ref1WorkTelephone',
      'ref1WorkTelephoneMsg',
      'ref1HomeTelephone',
      'ref1HomeTelephoneMsg',
      'ref2Prefix',
      'ref2PrefixMsg',
      'ref2Firstname',
      'ref2FirstnameMsg',
      'ref2Lastname',
      'ref2LastnameMsg',
      'ref2Relationship',
      'ref2Mobile',
      'ref2MobileMsg',
      'ref2WorkTelephone',
      'ref2WorkTelephoneMsg',
      'ref2HomeTelephone',
      'ref2HomeTelephoneMsg',
      'conjugalPrefix',
      'conjugalPrefixMsg',
      'conjugalFirstname',
      'conjugalFirstnameMsg',
      'conjugalLastname',
      'conjugalLastnameMsg',
      'conjugalOccupation',
      'conjugalOccupationMsg',
      'conjugalIncome',
      'conjugalIncomeMsg',
      'children',
      'childrenMsg',
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
      valid,
    } = this.state;

    return (
      <div>
        <div className="row">
          <div className="col">
            <h3>ข้อมูลเพิ่มเติมเพื่อการกู้</h3>
          </div>
        </div>
        <form className="crud-form">
          <Card style={styles.marginBottom}>
            <div style={styles.sectionTitle}>
              <CardHeader
                title="ข้อมูลบุคคลอ้างอิง"
                titleStyle={styles.TitleText}
              />
            </div>
            <CardText>
              <div className="row">
                <div className="col">
                  <span>บุคคลอ้างอิง 1</span>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <PrefixTh
                    id="ref1Prefix"
                    name="ref1Prefix"
                    value={ref1Prefix}
                    label="คำนำหน้าชื่อ (TH)"
                    required
                    onSelectItem={this.handleLookupChange}
                  />
                </div>
                <div className="col">
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
                <div className="col">
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
                <div className="col-4">
                  <Relationship
                    id="ref1Relationship"
                    name="ref1Relationship"
                    value={ref1Relationship}
                    floatingLabelText="ความสัมพันธ์"
                    label="ความสัมพันธ์"
                    required
                    onSelectItem={this.handleLookupChange}
                  />
                </div>
                <div className="col-8">
                  <div className="row">
                    <div className="col">
                      <TextField
                        id="ref1Mobile"
                        name="ref1Mobile"
                        value={ref1Mobile}
                        floatingLabelText="เบอร์โทรศัพท์มือถือ"
                        errorText={ref1MobileMsg}
                        onChange={e => this.handleChange(e, true)}
                        fullWidth
                      />
                    </div>
                    <div className="col">
                      <TextField
                        id="ref1WorkTelephone"
                        name="ref1WorkTelephone"
                        value={ref1WorkTelephone}
                        floatingLabelText="เบอร์โทรศัพท์ที่ทำงาน"
                        errorText={ref1WorkTelephoneMsg}
                        onChange={e => this.handleChange(e, true)}
                        fullWidth
                      />
                    </div>
                    <div className="col">
                      <TextField
                        id="ref1HomeTelephone"
                        name="ref1HomeTelephone"
                        value={ref1HomeTelephone}
                        floatingLabelText="เบอร์โทรศัพท์บ้าน"
                        errorText={ref1HomeTelephoneMsg}
                        onChange={e => this.handleChange(e, true)}
                        fullWidth
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <span>บุคคลอ้างอิง 2</span>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <PrefixTh
                    id="ref2Prefix"
                    name="ref2Prefix"
                    value={ref2Prefix}
                    label="คำนำหน้าชื่อ (TH)"
                    required
                    onSelectItem={this.handleLookupChange}
                  />
                </div>
                <div className="col">
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
                <div className="col">
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
                <div className="col-4">
                  <Relationship
                    id="ref2Relationship"
                    name="ref2Relationship"
                    value={ref2Relationship}
                    floatingLabelText="ความสัมพันธ์"
                    label="ความสัมพันธ์"
                    required
                    onSelectItem={this.handleLookupChange}
                  />
                </div>
                <div className="col-8">
                  <div className="row">
                    <div className="col">
                      <TextField
                        id="ref2Mobile"
                        name="ref2Mobile"
                        value={ref2Mobile}
                        floatingLabelText="เบอร์โทรศัพท์มือถือ"
                        errorText={ref2MobileMsg}
                        onChange={e => this.handleChange(e, true)}
                        fullWidth
                      />
                    </div>
                    <div className="col">
                      <TextField
                        id="ref2WorkTelephone"
                        name="ref2WorkTelephone"
                        value={ref2WorkTelephone}
                        floatingLabelText="เบอร์โทรศัพท์ที่ทำงาน"
                        errorText={ref2WorkTelephoneMsg}
                        onChange={e => this.handleChange(e, true)}
                        fullWidth
                      />
                    </div>
                    <div className="col">
                      <TextField
                        id="ref2HomeTelephone"
                        name="ref2HomeTelephone"
                        value={ref2HomeTelephone}
                        floatingLabelText="เบอร์โทรศัพท์บ้าน"
                        errorText={ref2HomeTelephoneMsg}
                        onChange={e => this.handleChange(e, true)}
                        fullWidth
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardText>
          </Card>

          <Card style={styles.marginBottom}>
            <div style={styles.sectionTitle}>
              <CardHeader
                title="ข้อมูลคู่สมรส"
                titleStyle={styles.TitleText}
              />
            </div>
            <CardText>
              <div className="row">
                <div className="col">
                  <PrefixTh
                    id="conjugalPrefix"
                    name="conjugalPrefix"
                    value={conjugalPrefix}
                    label="คำนำหน้าชื่อ"
                    required
                    onSelectItem={this.handleLookupChange}
                    errorText={conjugalPrefixMsg}
                  />
                </div>
                <div className="col">
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
                <div className="col">
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
                <div className="col">
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
                <div className="col">
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
                <div className="col">
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
                <div className="col">
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

          <Card style={styles.marginBottom}>
            <div style={styles.sectionTitle}>
              <CardHeader
                title=""
                titleStyle={styles.TitleText}
              />
            </div>
            <CardText>
              s
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
              s
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

// AdditionalInfo.propTypes = {
//   loading: PropTypes.bool,
// };

// AdditionalInfo.defaultProps = {
//   loading: false,
// };

export default AdditionalInfo;
