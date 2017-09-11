import Immutable, { Record } from 'immutable';
import {
  ACCEPT_AGREEMENT_SUCCESS,
  COMPLETE_PERSONAL_INFO_SUCCESS,
  COMPLETE_LOAN_INFO_SUCCESS,
  COMPLETE_ADDITIONAL_INFO_SUCCESS,
  UPLOAD_DOCUMENT_SUCCESS,
  NOTIFY,
  acceptAgreementSuccess,
  completePersonalInfoSuccess,
  completeLoanInfoSuccess,
  completeAdditionalInfoSuccess,
  uploadDocumentSuccess,
  notify,
} from '../actions/lead';
import { portalUrl, postForm, postJson } from '../libs/request';

const State = Record({
  isConsent: false,
  personalInfo: null,
  loanInfo: null,
  additionalInfo: null,
  data: null,
  notify: false,
  message: '',
  loading: false,
});
const initialState = new State();

export function save() {
  return (dispatch, getState) => {
    const _state = getState().lead;
    const personalInfo = _state.get('personalInfo').toJS();
    const loanInfo = _state.get('loanInfo').toJS();
    const additionalInfo = _state.get('additionalInfo').toJS();

    console.log('>>> actionCreater._state: ', personalInfo, loanInfo, additionalInfo);

    const data = Object.assign(personalInfo, loanInfo, additionalInfo);
    console.log('>>> actionCreater.data: ', data);

    const _url = portalUrl('/api/work/leads');
    console.log('>>> actionCreater.save: ', _url);

    const _notify = _state.get('notify');

    postJson(_url, data, false)
      .then(response => {
        const { data } = response;
        console.log('>>> save.response: ', data);
        return dispatch(notify(!_notify, 'บันทึกข้อมูลเสร็จสมบูรณ์'));
      })
      .catch(error => {
        console.log('>>> save.error: ', error);
        dispatch(notify(!_notify, 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'));
      });
  };
}

export function acceptAgreement(isConsent = false) {
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

    postForm(_url, data, false)
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
  let personalInfo;
  let loanInfo;
  let additionalInfo;
  let data;

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

      personalInfo = state.get('personalInfo').toJS();
      loanInfo = state.get('loanInfo').toJS();
      additionalInfo = action.data;
      data = Object.assign(personalInfo, loanInfo, additionalInfo);

      _state = Immutable.fromJS({
        additionalInfo,
        data,
      });

      console.log('>>> COMPLETE_ADDITIONAL_INFO_SUCCESS', additionalInfo, data);

      return state.merge(_state);

    case UPLOAD_DOCUMENT_SUCCESS:
      _state = Immutable.fromJS({
        [action.docType]: {
          fileName: action.fileName,
          id: action.id,
          name: action.name,
        },
      });

      console.log('>>> UPLOAD_DOCUMENT_SUCCESS', _state);

      return state.merge(_state);

    case NOTIFY:
      _state = Immutable.fromJS({
        notify: action.notify,
        message: action.message,
      });

      console.log('>>> NOTIFY', _state.toJS(), action);

      return state.merge(_state);

    default:
      return state;
  }
};

export default lead;
