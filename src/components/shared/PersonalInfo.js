import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
// import DatePicker from 'material-ui/DatePicker';
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

class PersonalInfo extends Component {
  state = {
    id: '',
    dateReq: '',
    nameTH: '',
    nameEN: '',
  };

  componentWillMount() {
    const { data } = this.props;
    console.log('>>> componentWillMount.data: ', data);
    if (data) {
      this.setState(data);
    }
  }

  render() {
    const {
      dateReq,
      nameTH,
      nameEN,
      // prefixTH,
      // firstNameTH,
      // firstNameTHmsg,
      // lastNameTH,
      // lastNameTHmsg,
      // prefixEN,
      // firstNameEN,
      // firstNameENmsg,
      // lastNameEN,
      // lastNameENmsg,
      // idCard,
      // idCardmsg,
      // dateExp,
      // dateExpmsg,
      // status,
      // birthDate,
      // birthDatemsg,
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
              <TextField
                id="dateReq"
                name="dateReq"
                value={dateReq}
                floatingLabelText="วันที่คำขอ"
                fullWidth
                readOnly
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <TextField
                id="nameTH"
                name="nameTH"
                value={nameTH}
                floatingLabelText="ชื่อ / นามสกุล (TH)"
                fullWidth
                readOnly
              />
            </div>
            <div className="col-6">
              <TextField
                id="nameEN"
                name="nameEN"
                value={nameEN}
                floatingLabelText="ชื่อ / นามสกุล (EN)"
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
