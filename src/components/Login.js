import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
// import RaisedButton from 'material-ui/RaisedButton';
// import FlatButton from 'material-ui/FlatButton';
import { grey500, white } from 'material-ui/styles/colors';
// import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

const styles = {
  loginContainer: {
    minWidth: 320,
    maxWidth: 400,
    height: 'auto',
    position: 'absolute',
    top: '10%',
    left: 0,
    right: 0,
    margin: 'auto',
    textAlign: 'center',
  },
  paper: {
    padding: '25px 0',
    overflow: 'auto',
    margin: '0 16px',
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
    const env = process.env.NODE_ENV;
    this.state = {
      OTPactive: false,
    };
    switch (env) {
      case 'test':
        this.state = {
          username: '0627609997',
          otp: '',
        };
        break;

      default:
        this.state = {
          username: '',
          otp: '',
        };
        break;
    }
  }

  handleChange = (e, name) => {
    const { target: { value } } = e;
    this.setState({ [name]: value });
  }

  handleOtpClick = (e, username) => {
    e.preventDefault();
    if (username) {
      const { getOtp } = this.props;
      getOtp(username);
      this.setState({ OTPactive: true });
    }
  };

  handleLoginClick = e => {
    e.preventDefault();
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
      <div className="login-page">
        <div className="row" style={{ padding: '33px 0' }}>
          <div style={styles.loginContainer}>
            <span className="header">ยินดีต้อนรับสู่ มันนี่เทเบิล</span>
            <span className="sub-header">เข้าสู่ระบบด้วยเบอร์โทรศัพท์ของคุณ</span>
            <Paper style={styles.paper} zDepth={2}>

              <form>
                <div className="col-12">
                  <label htmlFor="username" className="custom-label">
                    เบอร์โทรศัพท์ของคุณ
                  </label>
                </div>
                <div className="col-12">
                  <input
                    type="text"
                    className="custom-textfield"
                    placeholder="เบอร์โทรศัพท์ของคุณ"
                    value={username}
                    onChange={e => this.handleChange(e, 'username')}
                    maxLength={10}
                  />
                </div>
                <div className="col-12">
                  <button
                    value="ขอรับรหัส OTP ใหม่"
                    className={`btn-otp ${!username ? 'disabled' : ''}`}
                    onClick={e => this.handleOtpClick(e, username)}
                    disabled={!username}
                  >
                    ขอรหัส OTP
                  </button>
                </div>
                {
                  (!this.state.OTPactive)
                  || <span>
                    <div className="col-12">
                      <div className="display-status">
                        ระบบได้ส่ง OTP ไปที่ {this.state.username}
                      </div>
                    </div>
                    <div className="col-12">
                      <label htmlFor="otp" className="custom-label">
                        ใส่รหัส OTP
                      </label>
                    </div>
                    <div className="col-12">
                      <input
                        type="password"
                        placeholder="ใส่รหัส OTP 6 หลัก"
                        className="custom-textfield"
                        value={otp}
                        onChange={e => this.handleChange(e, 'otp')}
                      />
                    </div>
                    <div>
                      <div className="col-12">
                        <button
                          value="เข้าสู่ระบบ่"
                          className="btn-login"
                          onClick={e => this.handleLoginClick(e)}
                          disabled={!username || !otp}
                        >
                          เข้าสู่ระบบ
                        </button>
                      </div>
                    </div>
                  </span>
                }
              </form>
            </Paper>
          </div>
          <Snackbar
            open={message !== ''}
            message={message}
            autoHideDuration={4000}
          />
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  getOtp: PropTypes.func.isRequired,
  message: PropTypes.string,
};

Login.defaultProps = {
  message: '',
};

export default withRouter(Login);
