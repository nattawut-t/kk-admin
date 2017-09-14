import Immutable, { Record } from 'immutable';
import {
  LOGIN_OTP_SUCCESS,
  LOGIN_SUCCESS,
  NOTIFY,
  notify,
  loginOtpSuccess,
  loginSuccess,
} from '../actions/authen';
import { portalUrl, getJson, postJson } from '../libs/request';

const State = Record({
  otp: '',
  message: '',
  username: '',
  isAdmin: false,
  loading: false,
});
const initialState = new State();

export function login(username, password, callback) {
  return dispatch => {
    const data = {
      username,
      password,
    };
    const _url = portalUrl('/admin/login');

    postJson(_url, data, false)
      .then(response => {
        const { data } = response;

        console.log('>>> login.response: ', data);

        dispatch(notify('เข้าสู่ระบบเสร็จสมบูรณ์'));
        dispatch(loginSuccess(username));

        setTimeout(() => {
          dispatch(notify(''));
          if (callback) {
            callback();
          }
        }, 2000);
      })
      .catch(error => {
        console.log('>>> login.error: ', error);
        dispatch(notify('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'));
        setTimeout(() => dispatch(notify('')), 2000);
      });
  };
}

export function loginOtp(mobile, otp, callback) {
  return dispatch => {
    const data = {
      mobile_no: mobile,
      pin: otp,
    };
    const _url = portalUrl('/api/work/otp');

    postJson(_url, data, false)
      .then(response => {
        const { data } = response;

        console.log('>>> loginOtp.response: ', data);

        dispatch(notify('เข้าสู่ระบบเสร็จสมบูรณ์'));
        dispatch(loginOtpSuccess(mobile));

        setTimeout(() => {
          dispatch(notify(''));
          if (callback) {
            callback();
          }
        }, 2000);
      })
      .catch(error => {
        console.log('>>> loginOtp.error: ', error);
        dispatch(notify('เกิดข้อผิดพลาด กรุณาขอ OTP ใหม่อีกครั้ง'));
        setTimeout(() => dispatch(notify('')), 2000);
      });
  };
}

export function getOtp(username) {
  return () => {
    const url = portalUrl(`/api/work/otp?mobile=${username}`);

    getJson(url)
      .then(response => {
        const { data } = response;
        console.log('>>> save.response: ', data);
      })
      .catch(error => {
        console.log('>>> save.error: ', error);
      });
  };
}

const lead = (state = initialState, action) => {
  let _state;
  // let callback;

  switch (action.type) {
    case LOGIN_OTP_SUCCESS:
      _state = Immutable.fromJS({
        username: action.mobile,
        isAdmin: action.isAdmin,
      });

      console.log('>>> LOGIN_OTP_SUCCESS', _state.toJS(), action);

      return state.merge(_state);

    case LOGIN_SUCCESS:
      _state = Immutable.fromJS({
        username: action.username,
        isAdmin: action.isAdmin,
      });

      console.log('>>> LOGIN_SUCCESS', _state.toJS(), action);

      return state.merge(_state);

    case NOTIFY:
      _state = Immutable.fromJS({
        message: action.message,
      });

      console.log('>>> NOTIFY', _state.toJS(), action);

      return state.merge(_state);

    default:
      return state;
  }
};

export default lead;
