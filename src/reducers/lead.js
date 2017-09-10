import Immutable, { Record } from 'immutable';
import {
  ACCEPT_AGREEMENT_SUCCESS,
  COMPLETE_PERSONAL_INFO_SUCCESS,
  COMPLETE_LOAN_INFO_SUCCESS,
  COMPLETE_ADDITIONAL_INFO_SUCCESS,
  UPLOAD_DOCUMENT_SUCCESS,
  acceptAgreementSuccess,
  completePersonalInfoSuccess,
  completeLoanInfoSuccess,
  completeAdditionalInfoSuccess,
  uploadDocumentSuccess,
} from '../actions/lead';
import { portalUrl, post } from '../libs/request';

const State = Record({
  isConsent: false,
  personalInfo: null,
  loanInfo: null,
  additionalInfo: null,
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

export function completeLoanInfo(data) {
  return dispatch => dispatch(completeLoanInfoSuccess(data));
}

export function completeAdditionalInfo(data) {
  return dispatch => dispatch(completeAdditionalInfoSuccess(data));
}

export function uploadDocument(name, data, docType) {
  return dispatch => {
    const _url = portalUrl('/api/work/leads/doc');

    console.log('>>> actionCreater.uploadDocument: ', _url, data, name);

    post(_url, data, false)
      .then(response => {
        const { data: { id, filename } } = response;

        console.log('>>> uploadFile.response: ', name, id, filename);

        return dispatch(uploadDocumentSuccess(name, id, filename, docType));
      })
      .catch(error => {
        console.log('>>> uploadFile.error: ', error);
        // Toaster.show({ message: err.message, intent: Intent.DANGER });
      });
  };
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

    case COMPLETE_LOAN_INFO_SUCCESS:
      _state = Immutable.fromJS({
        loanInfo: action.data,
      });
      console.log('>>> COMPLETE_LOAN_INFO_SUCCESS', action.data);
      return state.merge(_state);

    case COMPLETE_ADDITIONAL_INFO_SUCCESS:
      _state = Immutable.fromJS({
        additionalInfo: action.data,
      });
      console.log('>>> COMPLETE_ADDITIONAL_INFO_SUCCESS', action.data);
      return state.merge(_state);

    case UPLOAD_DOCUMENT_SUCCESS:
      _state = Immutable.fromJS({
        [action.docType]: {
          fileName: action.fileName,
          id: action.id,
          name: action.name,
        },
      });

      console.log('>>> COMPLETE_ADDITIONAL_INFO_SUCCESS', _state);

      return state.merge(_state);

    default:
      return state;
  }
};

export default lead;
