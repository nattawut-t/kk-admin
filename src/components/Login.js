import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { grey500, white } from 'material-ui/styles/colors';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Help from 'material-ui/svg-icons/action/help';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

const styles = {
  loginContainer: {
    minWidth: 320,
    maxWidth: 400,
    height: 'auto',
    position: 'absolute',
    top: '20%',
    left: 0,
    right: 0,
    margin: 'auto',
    textAlign: 'center',
  },
  paper: {
    padding: 20,
    overflow: 'auto',
  },
  buttonsDiv: {
    textAlign: 'center',
    padding: 10,
  },
  flatButton: {
    color: grey500,
  },
  loginBtn: {
    float: 'right',
  },
  btn: {
    background: '#4f81e9',
    color: white,
    padding: 7,
    borderRadius: 2,
    margin: 2,
    fontSize: 13,
  },
};

class Login extends Component {
  state = {
    username: '',
    otp: '',
  };

  componentWillMount() {
    const { clearState } = this.props;
    clearState();
  }

  handleChange = (e, name) => {
    const { target: { value } } = e;
    this.setState({ [name]: value });
  }

  handleOtpClick = username => {
    if (username) {
      const { getOtp } = this.props;
      getOtp(username);
    }
  };

  handleLoginClick = () => {
    const { username, otp } = this.state;

    if (username && otp) {
      const { login, history } = this.props;
      login(username, otp, () => {
        history.push('/product-info');
      });
    }
  };

  render() {
    const { username, otp } = this.state;
    const { message } = this.props;

    return (
      <div className="row" style={{ padding: '33px 0' }}>
        <div style={styles.loginContainer}>
          <h4>เข้าสู่ระบบ</h4>
          <Paper style={styles.paper}>

            <form>
              <TextField
                floatingLabelText="เบอร์โทรศัพท์มือถือ"
                fullWidth
                value={username}
                onChange={e => this.handleChange(e, 'username')}
              />
              <FlatButton
                label="ขอรับรหัส OTP"
                style={styles.loginBtn}
                primary
                onClick={() => this.handleOtpClick(username)}
                disabled={!username}
              />
              <TextField
                floatingLabelText="รหัส OTP"
                fullWidth
                value={otp}
                onChange={e => this.handleChange(e, 'otp')}
                type="password"
              />

              <div>
                <RaisedButton
                  label="เข้าสู่ระบบ"
                  primary
                  style={styles.loginBtn}
                  onClick={this.handleLoginClick}
                  disabled={!username || !otp}
                />
              </div>
            </form>
          </Paper>

          <div style={styles.buttonsDiv}>
            <FlatButton
              label="ลงทะเบียน"
              href="/"
              style={styles.flatButton}
              icon={<PersonAdd />}
            />

            <FlatButton
              label="ลืมรหัสผ่าน?"
              href="/"
              style={styles.flatButton}
              icon={<Help />}
              disabled
            />
          </div>
        </div>
        <Snackbar
          open={message !== ''}
          message={message}
          autoHideDuration={4000}
        />
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  getOtp: PropTypes.func.isRequired,
  clearState: PropTypes.func.isRequired,
  message: PropTypes.string,
};

Login.defaultProps = {
  message: '',
};

export default withRouter(Login);
