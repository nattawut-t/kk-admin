import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { Card, CardHeader, CardText } from 'material-ui/Card';

import PrefixTh from '../shared/PrefixTh';
import Relationship from '../shared/Relationship';

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

class AdditionalInfo extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    data: PropTypes.object,
    completeAdditionalInfo: PropTypes.func.isRequired,
  };

  static defaultProps = {
    data: null,
  };

  state = {
    ref1Prefix: '',
    ref1PrefixMsg: '',
    ref1Firstname: 'xx',
    ref1FirstnameMsg: '',
    ref1Lastname: 'xx',
    ref1LastnameMsg: '',
    ref1Relationship: '',
    ref1Mobile: '0670000000',
    ref1MobileMsg: '',
    ref1WorkTelephone: '020000000',
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

  componentWillMount() {
    const { data } = this.props;
    if (data) {
      this.setState(data);
    }
    this.initialState();
    this.validate();
  }

  validate = () => {
    const keys = [
      'ref1Prefix',
      // 'ref1PrefixMsg',
      'ref1Firstname',
      // 'ref1FirstnameMsg',
      'ref1Lastname',
      // 'ref1LastnameMsg',
      'ref1Relationship',
      'ref1Mobile',
      // 'ref1MobileMsg',
      'ref1WorkTelephone',
      // 'ref1WorkTelephoneMsg',
      'ref1HomeTelephone',
      // 'ref1HomeTelephoneMsg',
      'ref2Prefix',
      // 'ref2PrefixMsg',
      'ref2Firstname',
      // 'ref2FirstnameMsg',
      'ref2Lastname',
      // 'ref2LastnameMsg',
      'ref2Relationship',
      'ref2Mobile',
      // 'ref2MobileMsg',
      'ref2WorkTelephone',
      // 'ref2WorkTelephoneMsg',
      'ref2HomeTelephone',
      // 'ref2HomeTelephoneMsg',
      'conjugalPrefix',
      // 'conjugalPrefixMsg',
      'conjugalFirstname',
      // 'conjugalFirstnameMsg',
      'conjugalLastname',
      // 'conjugalLastnameMsg',
      'conjugalOccupation',
      // 'conjugalOccupationMsg',
      'conjugalIncome',
      // 'conjugalIncomeMsg',
      'children',
      // 'childrenMsg',
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
  };

  initialState = () => {
    const keys = [
      'ref1Prefix',
      'ref1Firstname',
      'ref1Lastname',
      // 'ref1Relationship',
      'ref1Mobile',
      'ref1WorkTelephone',
      // 'ref1HomeTelephone',
      // 'ref2Prefix',
      // 'ref2Firstname',
      // 'ref2Lastname',
      // 'ref2Relationship',
      // 'ref2Mobile',
      // 'ref2WorkTelephone',
      // 'ref2HomeTelephone',
      // 'conjugalPrefix',
      // 'conjugalFirstname',
      // 'conjugalLastname',
      // 'conjugalOccupation',
      // 'conjugalIncome',
      // 'children',
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
    console.log('>>> handleLookupChange: ', value, name, id);
    this.setState({ [id]: value }, () => {
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
    const { completeAdditionalInfo } = this.props;
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
    } = this.state;

    completeAdditionalInfo({
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
    });

    // const { history } = this.props;
    // history.push('/loan-info');
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
                  />
                </div>
                <div className="col-3">
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
                <div className="col-3">
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
                <div className="col-3">
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

              <div className="row">
                <div className="col-12">
                  <span>บุคคลอ้างอิง 2</span>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <PrefixTh
                    id="ref2Prefix"
                    name="ref2Prefix"
                    value={ref2Prefix}
                    label="คำนำหน้าชื่อ (TH)"
                    required
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
                    required
                    onSelectItem={this.handleLookupChange}
                  />
                </div>
                <div className="col-3">
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
                <div className="col-3">
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
                <div className="col-3">
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
                <div className="col-4">
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

// AdditionalInfo.propTypes = {
//   loading: PropTypes.bool,
// };

// AdditionalInfo.defaultProps = {
//   loading: false,
// };

export default withRouter(AdditionalInfo);
