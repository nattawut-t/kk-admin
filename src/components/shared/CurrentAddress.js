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
    backgroundColor: '#019ac9',
  },
  TitleText: {
    color: 'white',
  },
};

class CurrentAddress extends Component {
  state = {
    moo: '',
    village: '',
    soi: '',
    road: '',
    provinceName: '',
    amphurCodeName: '',
    tambolCodeName: '',
    zipCode: '',
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
      number,
      moo,
      village,
      soi,
      road,
      provinceName,
      amphurCodeName,
      tambolCodeName,
      zipCode,
    } = this.state;

    return (
      <Card style={styles.marginBottom}>
        <div style={styles.sectionTitle}>
          <CardHeader
            title="ที่อยู่ปัจจุบัน"
            titleStyle={styles.TitleText}
          />
        </div>
        <CardText>
          <div className="row">
            <div className="col-4">
              <TextField
                id="number"
                name="number"
                floatingLabelText="บ้านเลขที่"
                value={number}
                onChange={e => this.handleChange(e, true)}
                maxLength="10"
                fullWidth
                readOnly
              />
            </div>
            <div className="col-4">
              <TextField
                id="moo"
                name="moo"
                floatingLabelText="หมู่ที่"
                value={moo}
                onChange={e => this.handleChange(e, true)}
                maxLength="3"
                fullWidth
                readOnly
              />
            </div>
            <div className="col-4">
              <TextField
                id="village"
                name="village"
                floatingLabelText="ชื่อหมู่บ้าน / อาคาร"
                value={village}
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
                id="soi"
                name="soi"
                floatingLabelText="ซอย"
                value={soi}
                onChange={e => this.handleChange(e, true)}
                maxLength="100"
                fullWidth
                readOnly
              />
            </div>
            <div className="col-4">
              <TextField
                id="road"
                name="road"
                floatingLabelText="ถนน"
                value={road}
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
                id="provinceName"
                name="provinceName"
                floatingLabelText="จังหวัด"
                value={provinceName}
                onChange={e => this.handleChange(e, true)}
                fullWidth
                readOnly
              />
            </div>
            <div className="col-4">
              <TextField
                id="amphurCodeName"
                name="amphurCodeName"
                floatingLabelText="อำเภอ"
                value={amphurCodeName}
                onChange={e => this.handleChange(e, true)}
                fullWidth
                readOnly
              />
            </div>
            <div className="col-4">
              <TextField
                id="tambolCodeName"
                name="tambolCodeName"
                floatingLabelText="ตำบล"
                value={tambolCodeName}
                onChange={e => this.handleChange(e, true)}
                fullWidth
                readOnly
              />
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <TextField
                id="zipCode"
                name="zipCode"
                floatingLabelText="รหัสไปรษณีย์"
                value={zipCode}
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

CurrentAddress.propTypes = {
  data: PropTypes.object,
};

CurrentAddress.defaultProps = {
  data: null,
};

export default withRouter(CurrentAddress);
