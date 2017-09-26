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

class ContactInfo extends Component {
  state = {
    workTel2: '',
    homeTel2: '',
    email: '',
    detailRent: '',
  };

  componentWillMount() {
    const { data } = this.props;
    if (data) {
      this.setState(data);
    }
  }

  handleChange = () => {
  };

  render() {
    const {
      workTel2,
      homeTel2,
      email,
      detailRent,
    } = this.state;
    return (
      <Card style={styles.marginBottom}>
        <div style={styles.sectionTitle}>
          <CardHeader
            title="ข้อมูลติดต่อ"
            titleStyle={styles.TitleText}
          />
        </div>
        <CardText>
          <div className="row">
            <div className="col" >
              <TextField
                id="workTel2"
                name="workTel2"
                floatingLabelText="เบอร์โทรศัพท์มือถือ"
                value={workTel2}
                onChange={e => this.handleChange(e)}
                fullWidth
                readOnly
              />
            </div>
            <div className="col" >
              <TextField
                id="homeTel2"
                name="homeTel2"
                floatingLabelText="เบอร์โทรศัพท์บ้าน"
                value={homeTel2}
                onChange={e => this.handleChange(e)}
                readOnly
              />
            </div>
            <div className="col" >
              <TextField
                id="email"
                name="email"
                floatingLabelText="อีเมล"
                value={email}
                onChange={e => this.handleChange(e)}
                readOnly
              />
            </div>
          </div>
          <div className="row">
            <div className="col" >
              <TextField
                id="detailRent"
                name="detailRent"
                floatingLabelText="สถานภาพที่อยู่อาศัย"
                value={detailRent}
                onChange={e => this.handleChange(e)}
                readOnly
              />
            </div>
          </div>
        </CardText>
      </Card>
    );
  }
}

ContactInfo.propTypes = {
  data: PropTypes.object,
};

ContactInfo.defaultProps = {
  data: null,
};

export default withRouter(ContactInfo);
