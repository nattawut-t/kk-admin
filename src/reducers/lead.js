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
  documents: {},
  notify: false,
  message: '',
  loading: false,
  identity: {},
  account: {},
  statement_1: {},
  statement_2: {},
  statement_3: {},
});
const initialState = new State();

// const uploadUrl = () => 'http://localhost:3000/api/doc';
const uploadUrl = () => portalUrl('/api/work/leads/doc');
const saveUrl = () => portalUrl('/api/work/leads');

export function save() {
  return (dispatch, getState) => {
    const _state = getState().lead;
    const personalInfo = _state.get('personalInfo').toJS();
    const loanInfo = _state.get('loanInfo').toJS();
    const additionalInfo = _state.get('additionalInfo').toJS();
    const data = Object.assign(personalInfo, loanInfo, additionalInfo);
    const _url = saveUrl();
    const _notify = _state.get('notify');

    postJson(_url, data, false)
      .then(response => {
        const { data } = response;

        console.log('>>> save.response: ', data);

        dispatch(notify(!_notify, 'บันทึกข้อมูลเสร็จสมบูรณ์'));
        setTimeout(() => {
          dispatch(notify(!_notify, ''));
          window.location.href = '/product-info';
        }, 2000);
      })
      .catch(error => {
        console.log('>>> save.error: ', error);
        dispatch(notify(!_notify, 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'));
        setTimeout(() => dispatch(notify(!_notify, '')), 2000);
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

export function uploadDocument(field, path, name, data, docType) {
  return (dispatch, getState) => {
    const _state = getState().lead;
    const _notify = _state.get('notify');
    const _url = uploadUrl();

    console.log('>>> uploadUrl: ', _url, docType);

    postForm(_url, data, false)
      .then(response => {
        const { data } = response;
        const { id, filename } = data;

        console.log('>>> uploadFile.response: ', data, id, filename);

        dispatch(uploadDocumentSuccess(field, path, filename, docType));
        dispatch(notify(!_notify, 'อัพโหลดเอกสารแล้ว'));
        setTimeout(() => dispatch(notify(!_notify, '')), 2000);
      })
      .catch(error => {
        console.log('>>> uploadFile.error: ', error);
        dispatch(notify(!_notify, 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'));
        setTimeout(() => dispatch(notify(!_notify, '')), 2000);
      });
  };
}

const lead = (state = initialState, action) => {
  let _state;
  let personalInfo;
  let loanInfo;
  let additionalInfo;
  let data;
  let documents;

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

      documents = state.get('documents');
      documents = Object.assign(documents, {
        [action.docType]: {
          field: action.field,
          path: action.path,
          name: action.name,
        },
      });
      _state = Immutable.fromJS({ documents });

      console.log('>>> UPLOAD_DOCUMENT_SUCCESS', documents, _state);

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
