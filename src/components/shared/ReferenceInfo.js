import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

import { Card, CardHeader, CardText } from 'material-ui/Card';

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

class ReferenceInfo extends Component {
  state = {
    prefix: '',
    firstName: '',
    lastName: '',
    relationship: '',
    mobile: '',
    workTel: '',
    homeTel: '',
  };

  componentWillMount() {
    const { data } = this.props;
    if (data) {
      this.setState(data);
    }
  }

  handleChange = () => { };

  render() {
    const {
      prefix,
      firstName,
      lastName,
      relationship,
      mobile,
      workTel,
      homeTel,
    } = this.state;

    return (
      <Card style={styles.marginBottom}>
        <div style={styles.sectionTitle}>
          <CardHeader
            title="บุคคลอ้างอิง"
            titleStyle={styles.TitleText}
          />
        </div>
        <CardText>
          <div className="row">
            <div className="col-4">
              <TextField
                id="prefix"
                name="prefix"
                value={prefix}
                floatingLabelText="คำนำหน้าชื่อ (TH)"
                onChange={e => this.handleChange(e)}
                fullWidth
                readOnly
              />
            </div>
            <div className="col-4">
              <TextField
                id="firstName"
                name="firstName"
                value={firstName}
                floatingLabelText="ชื่อ (TH)"
                onChange={e => this.handleChange(e)}
                fullWidth
                readOnly
              />
            </div>
            <div className="col-4">
              <TextField
                id="lastName"
                name="lastName"
                value={lastName}
                floatingLabelText="นามสกุล (TH)"
                onChange={e => this.handleChange(e, true)}
                fullWidth
                readOnly
              />
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              <TextField
                id="relationship"
                name="relationship"
                value={relationship}
                floatingLabelText="ความสัมพันธ์"
                onChange={e => this.handleChange(e)}
                fullWidth
                readOnly
              />
            </div>
            <div className="col-3">
              <TextField
                id="mobile"
                name="mobile"
                value={mobile}
                floatingLabelText="เบอร์โทรศัพท์มือถือ"
                onChange={e => this.handleChange(e)}
                fullWidth
                readOnly
              />
            </div>
            <div className="col-3">
              <TextField
                id="workTel"
                name="workTel"
                value={workTel}
                floatingLabelText="เบอร์โทรศัพท์ที่ทำงาน"
                onChange={e => this.handleChange(e)}
                fullWidth
                readOnly
              />
            </div>
            <div className="col-3">
              <TextField
                id="homeTel"
                name="homeTel"
                value={homeTel}
                floatingLabelText="เบอร์โทรศัพท์บ้าน"
                onChange={e => this.handleChange(e)}
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

ReferenceInfo.propTypes = {
  data: PropTypes.object,
};

ReferenceInfo.defaultProps = {
  data: null,
};

export default withRouter(ReferenceInfo);
