import Immutable, { Record } from 'immutable';
import {
  ACCEPT_AGREEMENT_SUCCESS,
  acceptAgreementSuccess,
} from '../actions/lead';

const State = Record({
  isConsent: false,
  loading: false,
});
const initialState = new State();

export function acceptAgreement(isConsent = false) {
  // console.log('>>> reducer: ', isConsent);
  return dispatch => dispatch(acceptAgreementSuccess(isConsent));
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

    default:
      return state;
  }
};

export default lead;
