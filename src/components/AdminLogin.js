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

class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleChange = (e, name) => {
    const { target: { value } } = e;
    this.setState({ [name]: value });
  }

  handleLoginClick = () => {
    const { username, password } = this.state;

    if (username && password) {
      const { login, history } = this.props;
      login(username, password, () => {
        history.push('/product-info');
      });
    }
  };

  render() {
    const { username, password } = this.state;
    const { message } = this.props;

    return (
      <div className="row" style={{ padding: '33px 0' }}>
        <div style={styles.loginContainer}>
          <h4>เข้าสู่ระบบ</h4>
          <Paper style={styles.paper}>

            <form>
              <TextField
                floatingLabelText="ชื่อผู้ใช้"
                fullWidth
                value={username}
                onChange={e => this.handleChange(e, 'username')}
              />
              <TextField
                floatingLabelText="รหัสผ่าน"
                fullWidth
                value={password}
                onChange={e => this.handleChange(e, 'password')}
                type="password"
              />

              <div>
                <RaisedButton
                  label="เข้าสู่ระบบ"
                  primary
                  style={styles.loginBtn}
                  onClick={this.handleLoginClick}
                  disabled={!username || !password}
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
              disabled
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

AdminLogin.propTypes = {
  history: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  message: PropTypes.string,
};

AdminLogin.defaultProps = {
  message: '',
};

export default withRouter(AdminLogin);
