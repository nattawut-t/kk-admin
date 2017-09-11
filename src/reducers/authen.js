import { Record } from 'immutable';
import {
  LOGIN_SUCCESS,
  // loginSuccess,
} from '../actions/authen';
// import { portalUrl, postForm, postJson } from '../libs/request';

const State = Record({
  otp: '',
  loading: false,
});
const initialState = new State();

export function login(username, password) {
  console.log('>>> actionCreater.login: ', username, password);

  // return dispatch => dispatch(loginSuccess(username, ))
  // const _state = getState().lead;
  // const personalInfo = _state.get('personalInfo').toJS();
  // const loanInfo = _state.get('loanInfo').toJS();
  // const additionalInfo = _state.get('additionalInfo').toJS();

  // console.log('>>> actionCreater._state: ', personalInfo, loanInfo, additionalInfo);

  // const data = Object.assign(personalInfo, loanInfo, additionalInfo);
  // console.log('>>> actionCreater.data: ', data);

  // const _url = portalUrl('/api/work/leads');
  // console.log('>>> actionCreater.save: ', _url);

  // postJson(_url, data, false)
  //   .then(response => {
  //     const { data } = response;

  //     console.log('>>> save.response: ', data);

  //     return dispatch(saveSuccess());
  //   })
  //   .catch(error => {
  //     console.log('>>> save.error: ', error);
  //   });
  // };
}

export function getOtp(username) {
  console.log('>>> actionCreater.getOtp', username);
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
