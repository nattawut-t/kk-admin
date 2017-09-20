import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
// import { grey500, white } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

// const styles = {
//   smallIcon: {
//     width: 36,
//     height: 36,
//     color: 'white',
//   },
//   mediumIcon: {
//     width: 48,
//     height: 48,
//   },
//   largeIcon: {
//     width: 60,
//     height: 60,
//   },
//   small: {
//     width: 72,
//     height: 72,
//     padding: 16,
//   },
//   medium: {
//     width: 96,
//     height: 96,
//     padding: 24,
//   },
//   large: {
//     width: 120,
//     height: 120,
//     padding: 30,
//   },
// };

const Login = ({ message }) =>
  <div className="row" style={{ padding: '33px 0' }}>
    <div>
      <h4>ยินดีต้อนรับสู่ มันนี่เทเบิล</h4>
      <h2>เข้าสู่ระบบด้วยเบอร์โทรศัพท์ของคุณ</h2>
      <Paper>

        <form>
          <TextField
            floatingLabelText="เบอร์โทรศัพท์ของคุณ"
            hintText="เบอร์โทรศัพท์ของคุณ"
            fullWidth
          />
          <FlatButton
            label="ขอรหัส OTP ใหม่"
            primary
          />
          <TextField
            floatingLabelText="ใส่รหัส OTP"
            hintText="รหัส OTP 6 หลัก"
            fullWidth
            type="password"
          />

          <div>
            <RaisedButton
              label="เข้าสู่ระบบ"
              primary
            />
          </div>
        </form>
      </Paper>
    </div>
    <Snackbar
      open={message !== ''}
      message={message}
      autoHideDuration={4000}
    />
  </div>;

Login.propTypes = {
  message: PropTypes.string,
};

Login.defaultProps = {
  message: '',
};

export default withRouter(Login);
