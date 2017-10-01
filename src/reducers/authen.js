import Immutable, { Record } from 'immutable';
import {
  LOGIN_OTP_SUCCESS,
  LOGIN_SUCCESS,
  CLEAR_STATE,
  NOTIFY,
  notify,
  loginOtpSuccess,
  loginSuccess,
} from '../actions/authen';
// import { getDraft } from '../reducers/lead';
import { portalUrl, getJson, postJson } from '../libs/request';
import { loadingTime } from '../libs/config';

const State = Record({
  otp: '',
  message: '',
  username: '',
  isAdmin: false,
  loading: false,
  authenticated: false,
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
        const { token } = data;

        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('isAdmin', true);

        dispatch(notify('เข้าสู่ระบบเสร็จสมบูรณ์'));
        setTimeout(() => {
          dispatch(notify(''));
          dispatch(loginSuccess(username));

          if (callback) {
            callback();
          }
        }, loadingTime);
      })
      .catch(error => {
        console.log('login.error: ', error);
        dispatch(notify('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'));
        setTimeout(() => dispatch(notify('')), loadingTime);
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
        const { token } = data;

        localStorage.setItem('token', token);
        localStorage.setItem('username', mobile);

        dispatch(notify('เข้าสู่ระบบเสร็จสมบูรณ์'));
        // dispatch(getDraft());

        setTimeout(() => {
          dispatch(notify(''));
          dispatch(loginOtpSuccess(mobile));

          if (callback) {
            callback();
          }
        }, loadingTime);
      })
      .catch(error => {
        console.log('>>> loginOtp.error: ', error);
        dispatch(notify('เกิดข้อผิดพลาด กรุณาขอ OTP ใหม่อีกครั้ง'));
        setTimeout(() => dispatch(notify('')), loadingTime);
      });
  };
}

export function getOtp(username) {
  return () => {
    const ref = Math.random(7);
    const url = portalUrl(`/api/work/otp?mobile=${username}&ref=${ref}`);
    console.log(url);

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

  switch (action.type) {
    case LOGIN_OTP_SUCCESS:
      _state = Immutable.fromJS({
        username: action.mobile,
        isAdmin: action.isAdmin,
        authenticated: true,
      });

      return state.merge(_state);

    case LOGIN_SUCCESS:
      _state = Immutable.fromJS({
        username: action.username,
        isAdmin: action.isAdmin,
        authenticated: true,
      });

      return state.merge(_state);

    case NOTIFY:
      _state = Immutable.fromJS({
        message: action.message,
      });

      return state.merge(_state);

    case CLEAR_STATE:
      _state = Immutable.fromJS({
        otp: '',
        message: '',
        username: '',
        isAdmin: false,
        loading: false,
        authenticated: false,
      });

      return state.merge(_state);

    default:
      return state;
  }
};

export default lead;
