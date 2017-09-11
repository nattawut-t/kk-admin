import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { grey500, white } from 'material-ui/styles/colors';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Help from 'material-ui/svg-icons/action/help';
import TextField from 'material-ui/TextField';
import { withRouter } from 'react-router';

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
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      otp: null,
      password: null,
    };
    console.log(this.props, 'this.props');
  }
  onInputChange(e, name) {
    this.setState({ [name]: e.target.value });
  }
  render() {
    const { username, otp } = this.state;
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
                onChange={e => this.onInputChange(e, 'username')}
                // ref={input => {
                //   username = input.input;
                // }}
              />
              <FlatButton
                label="ขอรับรหัส OTP"
                style={styles.loginBtn}
                primary
                onClick={() => {
                  if (username) {
                    this.props.getOtp(username);
                  }
                }}
              />
              <TextField
                floatingLabelText="รหัส OTP"
                fullWidth
                value={otp}
                onChange={e => this.onInputChange(e, 'otp')}
                type="password"
                // ref={input => {
                //   password = input.input;
                // }}
              />

              <div>
                <RaisedButton
                  label="เข้าสู่ระบบ"
                  primary
                  style={styles.loginBtn}
                  onClick={() => {
                    if (username && otp) {
                      this.props.login(this.state.username, this.state.otp);
                    }
                  }}
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
              disabled={username && otp}
              onClick={() => {
                if (username && otp) {
                  this.props.login(this.state.username, this.state.otp);
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  getOtp: PropTypes.func.isRequired,
};

Login.defaultProps = {
  username: '',
  notiMessage: '',
};

export default withRouter(Login);
