import Immutable, { Record } from 'immutable';
import {
  ACCEPT_AGREEMENT_SUCCESS,
  COMPLETE_PERSONAL_INFO_SUCCESS,
  COMPLETE_LOAN_INFO_SUCCESS,
  COMPLETE_ADDITIONAL_INFO_SUCCESS,
  UPLOAD_DOCUMENT_SUCCESS,
  NOTIFY,
  LOAD_NEXT_PAGE_SUCCESS,
  SEARCH_SUCCESS,
  //
  acceptAgreementSuccess,
  completePersonalInfoSuccess,
  completeLoanInfoSuccess,
  completeAdditionalInfoSuccess,
  uploadDocumentSuccess,
  notify,
  //
  setLoading,
  cancelSelection,
  loadNextPageSuccess,
  searchSuccess,
  setSearchInfo,
} from '../actions/lead';
import {
  portalUrl,
  postForm,
  postJson,
  getJson,
} from '../libs/request';
import {
  pageSize,
  loadingTime,
  // dateFormat,
} from '../libs/config';
// import { parseLeadIn } from '../libs/lead';
import { parseLeadsIn } from '../libs/leads';

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
  //
  dataList: [],
  total: 0,
  pages: 0,
  page: 0,
  //
});
const initialState = new State();
// const endpoint = '/admin/leads';
const searchUrl = (page = 1) => portalUrl(`/api/work/leads?page=${page}`);
const uploadUrl = () => portalUrl('/api/work/leads/doc');
const saveUrl = () => portalUrl('/api/work/leads');

function _loadNextPage(currentPage = 1, nextPage = 2) {
  console.log('>>> _loadNextPage: ', nextPage);

  return (dispatch, getState) => {
    dispatch(setLoading(true));
    dispatch(cancelSelection());

    const state = getState().admin;
    const total = state.get('total') || 0;

    if ((currentPage * pageSize) < total) {
      // const _endpoint = searchUrl();
      const url = searchUrl(nextPage);
      const promise = getJson(url);

      console.log('>>> url: ', url);

      setTimeout(() =>
        promise.then(response => {
          const { data } = response;

          console.log('>>> data: ', data);
          const dataList = data ? parseLeadsIn(data) : [];

          dispatch(loadNextPageSuccess(dataList, 0, 0, 0));
          return dispatch(setLoading(false));
        })
          .catch(error => {
            console.log('>>> error: ', error);
            dispatch(setLoading(false));
          })
        , loadingTime);
    }

    dispatch(setLoading(false));
  };
}

function _searchData(page = 1) {
  return dispatch => {
    dispatch(setLoading(true));
    dispatch(cancelSelection());

    // const _endpoint = searchUrl(page);
    const url = searchUrl(page);
    const promise = getJson(url);

    setTimeout(() =>
      promise.then(response => {
        const { data } = response;

        console.log('>>> data: ', data);
        const dataList = data ? parseLeadsIn(data) : [];

        dispatch(searchSuccess(dataList, 0, 0, 0));
        return dispatch(setLoading(false));
      })
        .catch(error => {
          console.log('>>> error: ', error);
          dispatch(setLoading(false));
        })
      , loadingTime);
  };
}

export function searchData(keyword) {
  console.log('>>> lead: ', keyword);
  return dispatch => {
    dispatch(setSearchInfo(keyword));
    return dispatch(_searchData());
  };
}

export function loadNextPage() {
  console.log('>>> lead');
  return (dispatch, getState) => {
    const state = getState().admin;
    const loading = state.get('loading');

    if (!loading) {
      const page = state.get('page') || 1;
      return dispatch(_loadNextPage(page, page + 1));
    }

    return dispatch(setLoading(false));
  };
}

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
      .then(() => {
        // const { data } = response;

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

    postForm(_url, data, false)
      .then(response => {
        const { data } = response;
        const { filename } = data;

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
    case SEARCH_SUCCESS:

      _state = Immutable.fromJS({
        total: action.total,
        pages: action.pages,
        page: action.page,
        dataList: [
          ...action.dataList,
        ],
      });
      return state.merge(_state);

    case LOAD_NEXT_PAGE_SUCCESS:

      _state = Immutable.fromJS({
        total: action.total,
        pages: action.pages,
        page: action.page,
        dataList: [
          ...state.dataList,
          ...action.dataList,
        ],
      });
      return state.merge(_state);

    case ACCEPT_AGREEMENT_SUCCESS:

      _state = Immutable.fromJS({
        isConsent: action.isConsent,
      });
      return state.merge(_state);

    case COMPLETE_PERSONAL_INFO_SUCCESS:

      _state = Immutable.fromJS({
        personalInfo: action.data,
      });
      return state.merge(_state);

    case COMPLETE_LOAN_INFO_SUCCESS:

      _state = Immutable.fromJS({
        loanInfo: action.data,
      });
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

      return state.merge(_state);

    case NOTIFY:
      _state = Immutable.fromJS({
        notify: action.notify,
        message: action.message,
      });

      return state.merge(_state);

    default:
      return state;
  }
};

export default lead;
