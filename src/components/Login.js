import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { grey500, white } from 'material-ui/styles/colors';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Help from 'material-ui/svg-icons/action/help';
import TextField from 'material-ui/TextField';
import { withRouter } from 'react-router';

const Login = ({ login, getOtp }) => {
  let username;
  let password;
  let otp;

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

  return (
    <div className="row" style={{ padding: '33px 0' }}>
      <div style={styles.loginContainer}>
        <h4>เข้าสู่ระบบ</h4>
        <Paper style={styles.paper}>

          <form>
            <TextField
              hintText="เบอร์โทรศัพท์มือถือ"
              floatingLabelText="เบอร์โทรศัพท์มือถือ"
              fullWidth
              ref={input => {
                username = input.input;
              }}
            />
            <FlatButton
              label="ขอรับรหัส OTP"
              style={styles.loginBtn}
              primary
              onClick={() => {
                console.log(username);
                if (username) {
                  otp = getOtp(username);
                  console.log(otp);
                }
              }}
            />
            <TextField
              hintText="OTP"
              floatingLabelText="รหัส OTP"
              fullWidth
              type="password"
              ref={input => {
                password = input.input;
              }}
            />

            <div>

              <a href="/product-info">
                <RaisedButton
                  label="เข้าสู่ระบบ"
                  primary
                  style={styles.loginBtn}
                />
              </a>
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
            disabled={username && password}
            onClick={() => {
              console.log(username, password);
              if (username && password) {
                login(username.value, password.value);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  getOtp: PropTypes.func.isRequired,
};

Login.defaultProps = {
  username: '',
  notiMessage: '',
};

export default withRouter(Login);
