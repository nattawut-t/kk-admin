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

class WorkingInfo extends Component {

  componentWillMount() {
    const { data } = this.props;
    if (data) {
      this.setState(data);
    }
  }

  handleDateChange = () => { };

  render() {
    const {
      jobCompanyName,
      department,
      position,
      employmentDate,
      salary,
      officeTel,
      officeTelExt,
      officeNumber,
      officeMoo,
      officeVillage,
      officeSoi,
      officeRoad,
      officeProvinceName,
      officeAmphurCodeName,
      officeTambolCodeName,
      officeZipCode,
    } = this.state;

    return (
      <Card style={styles.marginBottom}>
        <div style={styles.sectionTitle}>
          <CardHeader
            title="ข้อมูลการทำงาน"
            titleStyle={styles.TitleText}
          />
        </div>
        <CardText>
          <div className="row">
            <div className="col-12">
              <TextField
                id="jobCompanyName"
                name="jobCompanyName"
                value={jobCompanyName}
                floatingLabelText="ชื่อบริษัท"
                fullWidth
                readOnly
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <TextField
                id="department"
                name="department"
                value={department}
                floatingLabelText="แผนก / ฝ่าย"
                fullWidth
                readOnly
              />
            </div>
            <div className="col-6">
              <TextField
                id="position"
                name="position"
                value={position}
                floatingLabelText="ตำแหน่ง"
                fullWidth
                readOnly
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <DatePicker
                id="employmentDate"
                name="employmentDate"
                mode="landscape"
                floatingLabelText="วันที่เริ่มทำงาน"
                value={employmentDate}
                onChange={this.handleDateChange}
                DateTimeFormat={DateTimeFormat}
                locale="th-TH"
                disabled
              />
            </div>
            <div className="col-6">
              <TextField
                id="salary"
                name="salary"
                value={salary}
                floatingLabelText="เงินเดือน"
                fullWidth
                readOnly
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <TextField
                id="officeTel"
                name="officeTel"
                value={officeTel}
                floatingLabelText="เบอร์โทรศัพท์"
                fullWidth
                readOnly
              />
            </div>
            <div className="col-6">
              <TextField
                id="officeTelExt"
                name="officeTelExt"
                value={officeTelExt}
                floatingLabelText="เบอร์ต่อ"
                fullWidth
                readOnly
              />
            </div>
          </div>
          <div className="row">
            <div className="col-2">
              <TextField
                id="officeNumber"
                name="officeNumber"
                value={officeNumber}
                floatingLabelText="เลขที่"
                fullWidth
                readOnly
              />
            </div>
            <div className="col-2">
              <TextField
                id="officeMoo"
                name="officeMoo"
                value={officeMoo}
                floatingLabelText="หมู่"
                fullWidth
                readOnly
              />
            </div>
            <div className="col-8">
              <TextField
                id="officeVillage"
                name="officeVillage"
                value={officeVillage}
                floatingLabelText="หมู่บ้าน / อาคาร"
                fullWidth
                readOnly
              />
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <TextField
                id="officeSoi"
                name="officeSoi"
                value={officeSoi}
                floatingLabelText="ซอย"
                fullWidth
                readOnly
              />
            </div>
            <div className="col-8">
              <TextField
                id="officeRoad"
                name="officeRoad"
                value={officeRoad}
                floatingLabelText="ถนน"
                fullWidth
                readOnly
              />
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <TextField
                id="officeProvinceName"
                name="officeProvinceName"
                value={officeProvinceName}
                floatingLabelText="จังหวัด"
                fullWidth
                readOnly
              />
            </div>
            <div className="col-4">
              <TextField
                id="officeAmphurCodeName"
                name="officeAmphurCodeName"
                value={officeAmphurCodeName}
                floatingLabelText="อำเภอ"
                fullWidth
                readOnly
              />
            </div>
            <div className="col-4">
              <TextField
                id="officeTambolCodeName"
                name="officeTambolCodeName"
                value={officeTambolCodeName}
                floatingLabelText="ตำบล"
                fullWidth
                readOnly
              />
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <TextField
                id="officeZipCode"
                name="officeZipCode"
                value={officeZipCode}
                floatingLabelText="รหัสไปรษณีย์"
                fullWidth
                readOnly
              />
            </div>
            <div className="col-6" />
          </div>
        </CardText>
      </Card>
    );
  }
}

WorkingInfo.propTypes = {
  data: PropTypes.object,
  // readOnly: PropTypes.bool,
};

WorkingInfo.defaultProps = {
  data: null,
  // readOnly: false,
};

export default withRouter(WorkingInfo);
