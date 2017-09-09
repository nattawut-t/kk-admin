import Immutable, { Record } from 'immutable';
import {
  ACCEPT_AGREEMENT_SUCCESS,
  COMPLETE_PERSONAL_INFO_SUCCESS,
  acceptAgreementSuccess,
  completePersonalInfoSuccess,
} from '../actions/lead';

const State = Record({
  isConsent: false,
  personalInfo: null,
  loading: false,
});
const initialState = new State();

export function acceptAgreement(isConsent = false) {
  // console.log('>>> reducer: ', isConsent);
  return dispatch => dispatch(acceptAgreementSuccess(isConsent));
}

export function completePersonalInfo(data) {
  return dispatch => dispatch(completePersonalInfoSuccess(data));
}

const lead = (state = initialState, action) => {
  let _state;

  switch (action.type) {
    case ACCEPT_AGREEMENT_SUCCESS:

      _state = Immutable.fromJS({
        isConsent: action.isConsent,
      });
      // console.log('>>> ACCEPT_AGREEMENT_SUCCESS', action.isConsent);
      return state.merge(_state);

    case COMPLETE_PERSONAL_INFO_SUCCESS:
      _state = Immutable.fromJS({
        personalInfo: action.data,
      });
      console.log('>>> COMPLETE_PERSONAL_INFO_SUCCESS', action.data);
      return state.merge(_state);

    default:
      return state;
  }
};

export default lead;
