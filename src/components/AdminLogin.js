import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
// import RaisedButton from 'material-ui/RaisedButton';
import { grey500, white } from 'material-ui/styles/colors';
// import TextField from 'material-ui/TextField';
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

class AdminLogin extends Component {
  state = {
    username: '',
    password: '',
  };

  handleChange = (e, name) => {
    const { target: { value } } = e;
    this.setState({ [name]: value });
  }

  handleLoginClick = () => {
    const { username, password } = this.state;

    if (username && password) {
      const { login, history } = this.props;
      login(username, password, () => {
        history.push('/admin/leads');
      });
    }
  };

  render() {
    const { username, password } = this.state;
    const { message } = this.props;

    return (
      <div className="app-login">
        <div className="row" style={{ padding: '33px 0' }}>
          <div style={styles.loginContainer}>
            <span className="section-header header">ยินดีต้อนรับสู่ มันนี่เทเบิล</span>
            <span className="section-header sub-header">เข้าสู่ระบบด้วยชื่อผู้ใช้ของคุณ</span>
            <Paper style={styles.paper} zDepth={2}>

              <form>
                <div className="col-12">&nbsp;</div>
                <div className="col-12">
                  <input
                    type="text"
                    className="custom-textfield"
                    placeholder="ชื่อผู้ใช้"
                    value={username}
                    onChange={e => this.handleChange(e, 'username')}
                    maxLength={10}
                  />
                </div>
                <div className="col-12">&nbsp;</div>
                <div className="col-12">
                  <input
                    type="password"
                    placeholder="ใส่รหัสผ่าน"
                    className="custom-textfield"
                    value={password}
                    onChange={e => this.handleChange(e, 'password')}
                  />
                </div>
                <div className="col-12">&nbsp;</div>
                <div>
                  <div className="col-12">
                    <button
                      value="เข้าสู่ระบบ่"
                      className="btn btn-login"
                      onClick={e => this.handleLoginClick(e)}
                      disabled={!username || !password}
                    >
                      เข้าสู่ระบบ
                    </button>
                  </div>
                </div>
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

AdminLogin.propTypes = {
  history: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  message: PropTypes.string,
};

AdminLogin.defaultProps = {
  message: '',
};

export default withRouter(AdminLogin);
