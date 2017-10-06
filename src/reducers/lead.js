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
  SET_LOADING,
  setLoading,
  setSortInfo,
  cancelSelection,
  loadNextPageSuccess,
  searchSuccess,
  setSearchInfo,
  loadDocumentsSuccess,
  selectDataSuccess,
  EDIT_SUCCESS,
  SAVE_SUCCESS,
  LOAD_DOCUMENTS_SUCCESS,
  SELECT_DATA_SUCCESS,
  CANCEL_SELECTION,
  GET_DRAFT_SUCCESS,
  SET_SORT_INFO,
} from '../actions/lead';
import {
  portalUrl,
  getJson,
} from '../libs/request';
import {
  pageSize,
  loadingTime,
  // dateFormat,
  // isAdmin,
} from '../libs/config';
import { parseLeadIn as parseIn } from '../libs/lead';
import { parseLeadsIn } from '../libs/leads';
import { handleError } from '../handlers/api';

import agreement from '../libs/agreement';
import personalInfo from '../libs/personalInfo';
import loanInfo from '../libs/loanInfo';
import additionalInfo from '../libs/additionalInfo';

const State = Record({
  id: 0,
  //
  agreement: agreement.data(),
  personalInfo: personalInfo.data(),
  loanInfo: loanInfo.data(),
  additionalInfo: additionalInfo.data(),
  //
  lead: null,
  data: null,
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
  documents: [],
  //
  editing: false,
});

const initialState = new State();

// const uploadUrl = () => portalUrl('/api/work/leads/doc');
const url = (postfix = '') => portalUrl(`/admin/leads${postfix}`);

function _loadNextPage(currentPage = 1, nextPage = 2) {
  return (dispatch, getState) => {
    dispatch(setLoading(true));
    dispatch(cancelSelection());

    const state = getState().lead;
    const total = state.get('total') || 0;

    if ((currentPage * pageSize) < total) {
      const _url = url(nextPage);
      const promise = getJson(_url);

      setTimeout(() =>
        promise.then(response => {
          const { data } = response;
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

function _searchData() {
  return dispatch => {
    dispatch(setLoading(true));
    dispatch(cancelSelection());

    const _url = url();
    const promise = getJson(_url);

    setTimeout(() =>
      promise
        .then(({ data }) => {
          const _data = data.entries;
          const dataList = _data ? parseLeadsIn(_data) : [];

          dispatch(searchSuccess(dataList, 0, 0, 0));
          dispatch(setLoading(false));
        })
        .catch(error => handleError(error))
      , loadingTime);
  };
}

export function searchData(keyword) {
  return dispatch => {
    dispatch(setSearchInfo(keyword));
    return dispatch(_searchData());
  };
}

export function loadNextPage() {
  return (dispatch, getState) => {
    const state = getState().lead;
    const loading = state.get('loading');

    console.log('loadNextPage');

    if (!loading) {
      const page = state.get('page') || 1;
      return dispatch(_loadNextPage(page, page + 1));
    }

    return dispatch(setLoading(false));
  };
}

export function sortData(field, desc) {
  return dispatch => {
    dispatch(setSortInfo(field, desc));
    return dispatch(_searchData());
  };
}

// export function uploadDocument(field, path, name, data, docType, callback) {
//   return dispatch => {
//     const _url = uploadUrl();

//     postForm(_url, data, false)
//       .then(response => {
//         const { data } = response;
//         const { id, filename } = data;

//         // {
//         //   filename: "Free Fall Desktop Wallpapers - HD Wallpapers.jpg"
//         //   id: 1087
//         //   docType,
//         //   path,
//         // }

//         console.log(data, path);

//         dispatch(uploadDocumentSuccess(field, path, filename, docType));

//         if (callback) {
//           callback({
//             id,
//             filename,
//             docType,
//             path,
//           });
//         }

//         dispatch(notify('อัพโหลดเอกสารแล้ว'));
//         setTimeout(() => dispatch(notify('')), loadingTime);
//       })
//       .catch(error => {
//         console.log('>>> uploadFile.error: ', error);
//         dispatch(notify('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'));
//         setTimeout(() => dispatch(notify('')), loadingTime);
//       });
//   };
// }

export function loadDocuments(id, callback) {
  console.log('loadDocuments');
  return dispatch => {
    dispatch(setLoading(true));

    const _url = url(`/${id}/media`);

    getJson(_url)
      .then(response => {
        const { data } = response;

        console.log('documents: ', data);

        dispatch(loadDocumentsSuccess(data));
        if (callback) {
          callback();
        }
        setTimeout(() => dispatch(setLoading(false)), loadingTime);
      })
      .catch(error => {
        console.log('>>> edit.error: ', error);
        dispatch(setLoading(false));
      });
  };
}

export function loadDocument(id, callback) {
  return dispatch => {
    dispatch(setLoading(true));

    const _url = portalUrl(`/admin/media/${id}`);
    console.log('url: ', _url);

    getJson(_url)
      .then(response => {
        const { data } = response;

        console.log('document: ', data);

        // const contentType = headers['x-content-type'];
        // const mediaSrc = window.URL.createObjectURL(new Blob([data], { type: contentType }));

        // dispatch(loadDocumentSuccess(data));
        if (callback) {
          callback({});
        }
        // setTimeout(() => dispatch(setLoading(false)), loadingTime);
        dispatch(setLoading(false));
      })
      .catch(error => {
        console.log('>>> edit.error: ', error);
        dispatch(setLoading(false));
      });
  };
}

export function selectData(rowIndex) {
  return (dispatch, getState) => {
    dispatch(setLoading(true));

    const state = getState().lead;
    const oldId = state.get('id');
    const dataList = state.get('dataList') || [];

    if (dataList) {
      const data = dataList.get(rowIndex);

      if (data) {
        const newId = `${data.get('ID') || ''}`;

        if (newId !== oldId) {
          const _endpoint = `/admin/leads/${newId}`;
          const url = portalUrl(_endpoint);
          const promise = getJson(url);

          setTimeout(() =>
            promise.then(response => {
              const { data } = response;
              const raw = parseIn(data);
              const { ID } = raw;
              const _data = Object.assign(
                agreement.data(raw),
                personalInfo.data(raw),
                loanInfo.data(raw),
                additionalInfo.data(raw),
              );

              dispatch(selectDataSuccess(`${ID}`, _data));
              return dispatch(setLoading(false));
            })
              .catch(error => {
                console.log('>>> selectData.error: ', error);
                dispatch(setLoading(false));
              })
            , loadingTime);
        } else {
          dispatch(cancelSelection());
        }
      }
    }
  };
}

const lead = (state = initialState, action) => {
  let _state;
  let personalInfo;
  let loanInfo;
  let additionalInfo;
  let data;
  let documents;
  // let lead;

  switch (action.type) {
    case GET_DRAFT_SUCCESS:

      _state = Immutable.fromJS({
        agreement: action.agreement,
        personalInfo: action.personalInfo,
        loanInfo: action.loanInfo,
        additionalInfo: action.additionalInfo,
      });
      return state.merge(_state);

    case CANCEL_SELECTION:

      _state = Immutable.fromJS({
        id: '',
        data: null,
      });
      return state.merge(_state);

    case SELECT_DATA_SUCCESS:

      _state = Immutable.fromJS({
        id: action.id,
        data: action.data,
      });
      return state.merge(_state);

    case LOAD_DOCUMENTS_SUCCESS:

      _state = Immutable.fromJS({
        documents: action.documents,
      });
      return state.merge(_state);

    case SAVE_SUCCESS:

      _state = Immutable.fromJS({
        id: 0,
        editing: false,
        //
        // agreement: agreement.data(),
        // personalInfo: personalInfo.data(),
        // loanInfo: loanInfo.data(),
        // additionalInfo: additionalInfo.data(),
      });
      return state.merge(_state);

    case EDIT_SUCCESS:

      _state = Immutable.fromJS({
        id: action.id,
        editing: true,
        //
        agreement: agreement.data({ isConsent: true }),
        personalInfo: action.personalInfo,
        loanInfo: action.loanInfo,
        additionalInfo: action.additionalInfo,
      });
      return state.merge(_state);

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
        agreement: action.data,
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
        // notify: action.notify,
        message: action.message,
      });

      return state.merge(_state);

    case SET_LOADING:
      _state = Immutable.fromJS({
        loading: action.loading,
      });
      return state.merge(_state);

    case SET_SORT_INFO:
      _state = Immutable.fromJS({
        sortField: action.field,
        sortDesc: action.desc,
      });
      return state.merge(_state);

    default:
      return state;
  }
};

export default lead;
