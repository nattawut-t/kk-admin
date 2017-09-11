import { Record } from 'immutable';
import {
  LOGIN_SUCCESS,
  otpSuccess,
} from '../actions/authen';
// import { portalUrl, getJson } from '../libs/request';
import { portalUrl, getJson, postJson } from '../libs/request';

const State = Record({
  otp: '',
  loading: false,
});
const initialState = new State();

export function save(username, password) {
  console.log('>>> actionCreater.login: ', username, password);
  const data = { mobile_no: username, pin: password };
  console.log('>>> actionCreater.data: ', data);

  const _url = portalUrl('/api/work/otp');
  // console.log('>>> actionCreater.save: ', _url);
  //
  postJson(_url, data, false)
    .then(response => {
      const { data } = response;
      console.log('>>> save.response: ', data);
      window.location.href = '/product-info';
    })
    .catch(error => {
      console.log('>>> save.error: ', error);
    });
}

export function getOtp(username) {
  console.log(username, 'username');
  return dispatch => {
    const _url = portalUrl(`/api/work/otp?mobile=${username}`);
    getJson(_url)
    .then(response => {
      const { data } = response;
      console.log('>>> save.response: ', data);

      return dispatch(otpSuccess());
    })
    .catch(error => {
      console.log('>>> save.error: ', error);
    });
  };
}

const lead = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:

      // _state = Immutable.fromJS({
      //   isConsent: action.isConsent,
      // });
      // // console.log('>>> ACCEPT_AGREEMENT_SUCCESS', action.isConsent);
      // return state.merge(_state);

      return state;

    default:
      return state;
  }
};

export default lead;
