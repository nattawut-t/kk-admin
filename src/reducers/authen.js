import Immutable, { Record } from 'immutable';
import {
  LOGIN_SUCCESS,
  NOTIFY,
  notify,
} from '../actions/authen';
import { portalUrl, getJson, postJson } from '../libs/request';

const State = Record({
  otp: '',
  message: '',
  loading: false,
});
const initialState = new State();

export function login(username, password) {
  return dispatch => {
    const data = { mobile_no: username, pin: password };
    const _url = portalUrl('/api/work/otp');

    console.log('>>> actionCreater.data: ', data);

    postJson(_url, data, false)
      .then(response => {
        const { data } = response;

        console.log('>>> login.response: ', data);

        dispatch(notify('เข้าสู่ระบบเสร็จสมบูรณ์'));
        setTimeout(() => {
          dispatch(notify(''));
          window.location.href = '/product-info';
        }, 2000);
      })
      .catch(error => {
        console.log('>>> login.error: ', error);
        dispatch(notify('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'));
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

  switch (action.type) {
    case LOGIN_SUCCESS:

      // _state = Immutable.fromJS({
      //   isConsent: action.isConsent,
      // });
      // // console.log('>>> ACCEPT_AGREEMENT_SUCCESS', action.isConsent);
      // return state.merge(_state);

      return state;

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
