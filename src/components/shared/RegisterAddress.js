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

class RegisterAddress extends Component {
  state = {
    number2: '',
    moo2: '',
    village2: '',
    soi2: '',
    road2: '',
    province2Name: '',
    amphurCode2Name: '',
    tambolCode2Name: '',
    zipCode2: '',
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
      number2,
      moo2,
      village2,
      soi2,
      road2,
      province2Name,
      amphurCode2Name,
      tambolCode2Name,
      zipCode2,
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
            <div className="col-4">
              <TextField
                id="number2"
                name="number2"
                floatingLabelText="บ้านเลขที่"
                value={number2}
                onChange={e => this.handleChange(e)}
                maxLength="10"
                fullWidth
                readOnly
              />
            </div>
            <div className="col-4">
              <TextField
                id="moo2"
                name="moo2"
                floatingLabelText="หมู่ที่"
                value={moo2}
                onChange={e => this.handleChange(e, true)}
                maxLength="3"
                fullWidth
                readOnly
              />
            </div>
            <div className="col-4">
              <TextField
                id="village2"
                name="village2"
                floatingLabelText="ชื่อหมู่บ้าน / อาคาร"
                value={village2}
                onChange={e => this.handleChange(e, true)}
                maxLength="100"
                fullWidth
                readOnly
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
                maxLength="100"
                fullWidth
                readOnly
              />
            </div>
            <div className="col-4">
              <TextField
                id="road2"
                name="road2"
                floatingLabelText="ถนน"
                value={road2}
                onChange={e => this.handleChange(e, true)}
                maxLength="100"
                fullWidth
                readOnly
              />
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <TextField
                id="province2Name"
                name="province2Name"
                floatingLabelText="จังหวัด"
                value={province2Name}
                onChange={e => this.handleChange(e, true)}
                fullWidth
                readOnly
              />
            </div>
            <div className="col-4">
              <TextField
                id="amphurCode2Name"
                name="amphurCode2Name"
                floatingLabelText="อำเภอ"
                value={amphurCode2Name}
                onChange={e => this.handleChange(e, true)}
                fullWidth
                readOnly
              />
            </div>
            <div className="col-4">
              <TextField
                id="tambolCode2Name"
                name="tambolCode2Name"
                floatingLabelText="ตำบล"
                value={tambolCode2Name}
                onChange={e => this.handleChange(e, true)}
                fullWidth
                readOnly
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
                maxLength="5"
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

RegisterAddress.propTypes = {
  data: PropTypes.object,
  // readOnly: PropTypes.bool,
};

RegisterAddress.defaultProps = {
  data: null,
  // readOnly: false,
};

export default withRouter(RegisterAddress);
