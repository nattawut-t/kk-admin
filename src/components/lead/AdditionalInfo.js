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
    prefixTH: '',
    prefixTHMsg: '',
    firstnameTH: '',
    firstnameTHMsg: '',
    lastnameTH: '',
    lastnameTHMsg: '',
    relationship: '',
    valid: false,
  };

  validate = () => {
    const { prefixTH } = this.state;
    console.log('>>> prefixTH: ', prefixTH);

    const keys = [
      'prefixTH',
      'prefixTHMsg',
      'firstNameTH',
      'firstNameTHmsg',
      'lastNameTH',
      'lastNameTHmsg',
      'relationship',
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
      prefixTH,
      firstNameTH,
      firstNameTHmsg,
      lastNameTH,
      lastNameTHmsg,
      relationship,
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
              <span>บุคคลอ้างอิง 1</span>
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
                  <Relationship
                    id="relationship"
                    name="relationship"
                    value={relationship}
                    floatingLabelText="ความสัมพันธ์"
                    label="ความสัมพันธ์"
                    required
                    onSelectItem={this.handleLookupChange}
                    fullwitdh
                  />
                </div>
              </div>
            </CardText>
          </Card>

          <Card style={styles.marginBottom}>
            <div style={styles.sectionTitle}>
              <CardHeader
                title="ประวัติการชำระหนี้"
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
