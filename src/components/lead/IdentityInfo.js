import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import TextField from 'material-ui/TextField';
// import SelectField from 'material-ui/SelectField';
// import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
// import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardHeader, CardText } from 'material-ui/Card';

// import Bank from '../shared/Bank';

const styles = {
  button: {
    margin: 12,
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

class IdentityInfo extends Component {

  state = {
    identity: '',
    back: false,
  };

  componentWillMount() {
    window.scrollTo(0, 0);
    const { getDraft } = this.props;
    getDraft();
  }

  componentDidMount() {
    // const { data } = this.props;
    // this.setState(Object.assign(this.state, data));
  }

  save = callback => {
    const { saveDraft, data } = this.props;
    saveDraft(data, callback);
  };

  handleChange = e => {
    const { target: { name, value } } = e;
    this.setState({ [name]: value });
  };

  handleDialogClick = () => {
    const { history } = this.props;
    this.setState({ back: false },
      () => history.push('/product-info'));
  };

  handleBackClick = e => {
    e.preventDefault();
    console.log('handleBackClick');
    // const { history } = this.props;
    this.save(() => this.setState({ back: true }));
  };

  handleNextClick = e => {
    e.preventDefault();
    this.save('/additional-info');
  };

  render() {
    if (!this.state) {
      return <div className="loader" />;
    }

    const { identity, back } = this.state;
    const { message } = this.props;

    // if (data) {
    // }

    const actions = [
      <FlatButton
        label="กลับหน้าแรก"
        primary
        keyboardFocused
        onClick={this.handleDialogClick}
      />,
    ];

    return (
      <div>
        <form onSubmit={this.handleNextClick}>
          <Card style={styles.marginBottom}>
            <div style={styles.sectionTitle}>
              <CardHeader
                title="Upload บัตรประชาชน"
                titleStyle={styles.TitleText}
              />
            </div>
            <CardText>
              <div className="row">
                <div className="col-10">
                  <TextField
                    id="fakeIdentity"
                    name="fakeIdentity"
                    value={identity}
                    errorText={!identity ? 'กรุณาเลือกรูปเพื่ออัพโหลด' : ''}
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col-2">
                  <TextField
                    type="file"
                    id="identity"
                    name="identity"
                    onChange={this.handleChange}
                    style={{ width: '105px' }}
                  />
                </div>
              </div>
            </CardText>
          </Card>
          <div className="row">
            <div className="col-12" style={{ textAlign: 'right' }}>
              <RaisedButton
                label="กู้ภายหลัง"
                labelPosition="before"
                style={styles.button}
                containerElement="label"
                disabled={!identity}
                onClick={e => this.handleBackClick(e)}
              />
              <RaisedButton
                type="submit"
                label="กู้ทันที"
                labelPosition="before"
                primary
                style={styles.button}
                disabled={!identity}
                icon={<FontIcon className="muidocs-icon-custom-github" />}
              />
            </div>
          </div>
        </form>
        <Dialog
          title="ขอบคุณสำหรับการลงทะเบียน"
          actions={actions}
          modal={false}
          open={back}
          onRequestClose={this.handleDialogClick}
        >
          <span>รูปบัตรประชาชนของคุณถูกบันทึกลงฐานข้อมูลแล้ว</span><br />
          <span>คุณสามารถกลับเข้ามากรอกข้อมูลการกู้ได้ในภายหลัง</span>
        </Dialog>
        <Snackbar
          open={message !== ''}
          message={message}
          autoHideDuration={4000}
        />
      </div>
    );
  }
}

IdentityInfo.propTypes = {
  message: PropTypes.string,
  history: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  getDraft: PropTypes.func.isRequired,
  saveDraft: PropTypes.func.isRequired,
};

IdentityInfo.defaultProps = {
  message: '',
};

export default withRouter(IdentityInfo);
