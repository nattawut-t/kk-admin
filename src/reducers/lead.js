import Immutable, { Record } from 'immutable';

import {
  ACCEPT_AGREEMENT_SUCCESS,
  COMPLETE_PERSONAL_INFO_SUCCESS,
  COMPLETE_LOAN_INFO_SUCCESS,
  COMPLETE_ADDITIONAL_INFO_SUCCESS,
  LOAD_NEXT_PAGE_SUCCESS,
  SEARCH_SUCCESS,
  setLoading,
  setSortInfo,
  cancelSelection,
  loadNextPageSuccess,
  searchSuccess,
  setSearchInfo,
  // loadDocumentsSuccess,
  selectDataSuccess,
  EDIT_SUCCESS,
  SAVE_SUCCESS,
  SELECT_DATA_SUCCESS,
  CANCEL_SELECTION,
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

import { notify, loading } from './notification';
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

const url = (postfix = '') => portalUrl(`/admin/leads${postfix}`);

const _loadNextPage = (currentPage = 1, nextPage = 2) =>
  async (dispatch, getState) => {
    dispatch(loading(true));
    dispatch(cancelSelection());

    const state = getState().lead;
    const total = state.get('total') || 0;

    if ((currentPage * pageSize) < total) {
      const _url = url(`?page=${nextPage}`);

      try {
        const { data } = await getJson(_url);
        console.log(data);
        const { count, entries, numOfPages, page } = data;
        console.log(count, entries, numOfPages, page);
        const dataList = entries ? parseLeadsIn(entries) : [];

        dispatch(loadNextPageSuccess(dataList, count, numOfPages, page));
      } catch (error) {
        dispatch(notify('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'));

        setTimeout(() => {
          dispatch(notify());
          dispatch(loading());
        }, loadingTime);

        handleError(error);
      }
    }

    dispatch(notify());
    dispatch(loading());
  };

function _searchData() {
  return dispatch => {
    dispatch(loading(true));
    dispatch(cancelSelection());

    const _url = url();
    const promise = getJson(_url);

    setTimeout(() =>
      promise
        .then(({ data }) => {
          const { count, entries, numOfPages, page } = data;
          const dataList = entries ? parseLeadsIn(entries) : [];

          dispatch(searchSuccess(dataList, count, numOfPages, page));
          dispatch(loading());
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

export const select = (id, callback) =>
  async (dispatch, getState) => {
    dispatch(loading(true));

    const state = getState().lead;
    const oldId = state.get('id');

    console.log('select: ', id);

    if (id !== oldId) {
      const _url = url(`/${id}`);

      try {
        const { data } = await getJson(_url);

        setTimeout(() => {
          const raw = parseIn(data);
          const { ID } = raw;
          const _data = Object.assign(
            agreement.data(raw),
            personalInfo.data(raw),
            loanInfo.data(raw),
            additionalInfo.data(raw),
          );

          dispatch(selectDataSuccess(`${ID}`, _data));

          if (callback) {
            callback();
          }

          dispatch(notify());
          dispatch(loading());
        }, loadingTime);
      } catch (error) {
        dispatch(notify('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'));

        setTimeout(() => {
          dispatch(notify());
          dispatch(loading());
        }, loadingTime);

        handleError(error);
      }
    } else {
      dispatch(cancelSelection());
    }
  };

const lead = (state = initialState, action) => {
  let _state;
  let personalInfo;
  let loanInfo;
  let additionalInfo;
  let data;

  switch (action.type) {
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

    default:
      return state;
  }
};

export default lead;
