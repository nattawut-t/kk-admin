import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';

import areIntlLocalesSupported from 'intl-locales-supported';
import IntlPolyfill from 'intl';
import 'intl/locale-data/jsonp/th-TH';

import { Card, CardHeader, CardText } from 'material-ui/Card';

let DateTimeFormat;

/**
 * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
 */
if (areIntlLocalesSupported(['th', 'th-TH'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
}

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
    backgroundColor: '#019ac9',
  },
  TitleText: {
    color: 'white',
  },
};

class PersonalInfo extends Component {
  state = {
    id: '',
    dateReq: '',
    //
    prefixTH: '',
    firstNameTH: '',
    lastNameTH: '',
    //
    prefixEN: '',
    firstNameEN: '',
    lastNameEN: '',
    //
    idcardExpiry: '',
    birthDate: '',
    status: '',
  };

  componentWillMount() {
    const { data } = this.props;
    if (data) {
      this.setState(data);
    }
  }

  handleDateChange = () => {
  };

  render() {
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
      birthDate,
      status,
    } = this.state;

    return (
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
              <DatePicker
                id="dateReq"
                name="dateReq"
                mode="landscape"
                floatingLabelText="วันที่คำขอ"
                value={dateReq}
                onChange={this.handleDateChange}
                DateTimeFormat={DateTimeFormat}
                locale="th-TH"
                disabled
              />
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <TextField
                id="prefixTH"
                name="prefixTH"
                value={prefixTH}
                floatingLabelText="คำนำหน้าชื่อ (TH)"
                fullWidth
                readOnly
              />
            </div>
            <div className="col-4">
              <TextField
                id="firstNameTH"
                name="firstNameTH"
                value={firstNameTH}
                floatingLabelText="ชื่อ (TH)"
                fullWidth
                readOnly
              />
            </div>
            <div className="col-4">
              <TextField
                id="lastNameTH"
                name="lastNameTH"
                value={lastNameTH}
                floatingLabelText="นามสกุล (TH)"
                fullWidth
                readOnly
              />
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <TextField
                id="prefixEN"
                name="prefixEN"
                value={prefixEN}
                floatingLabelText="คำนำหน้าชื่อ (EN)"
                fullWidth
                readOnly
              />
            </div>
            <div className="col-4">
              <TextField
                id="firstNameEN"
                name="firstNameEN"
                value={firstNameEN}
                floatingLabelText="ชื่อ (EN)"
                fullWidth
                readOnly
              />
            </div>
            <div className="col-4">
              <TextField
                id="lastNameEN"
                name="lastNameEN"
                value={lastNameEN}
                floatingLabelText="นามสกุล (EN)"
                fullWidth
                readOnly
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <TextField
                id="idCard"
                name="idCard"
                value={idCard}
                floatingLabelText="เลขบัตรประชาชน"
                fullWidth
                readOnly
              />
            </div>
            <div className="col-6">
              <DatePicker
                id="dateExp"
                name="dateExp"
                mode="landscape"
                floatingLabelText="วันหมดอายุ"
                value={dateExp}
                onChange={this.handleDateChange}
                DateTimeFormat={DateTimeFormat}
                locale="th-TH"
                disabled
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <DatePicker
                id="birthDate"
                name="birthDate"
                mode="landscape"
                floatingLabelText="วันเกิด"
                value={birthDate}
                onChange={this.handleDateChange}
                DateTimeFormat={DateTimeFormat}
                locale="th-TH"
                disabled
              />
            </div>
            <div className="col-6">
              <TextField
                id="status"
                name="status"
                value={status}
                floatingLabelText="สถานภาพสมรส"
                fullWidth
                readOnly
              />
            </div>
          </div>
        </CardText>
      </Card>
    );
  }
}

PersonalInfo.propTypes = {
  data: PropTypes.object,
  // readOnly: PropTypes.bool,
};

PersonalInfo.defaultProps = {
  data: null,
  // readOnly: false,
};

export default withRouter(PersonalInfo);
