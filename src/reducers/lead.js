import Immutable, { Record } from 'immutable';

import {
  LOAD_NEXT_PAGE_SUCCESS,
  SEARCH_SUCCESS,
  // setLoading,
  // setSearchInfo,
  // setSortInfo,
  cancelSelection,
  loadNextPageSuccess,
  searchSuccess,
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
  // pageSize,
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
  // notify: false,
  // message: '',
  // loading: false,
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

export const loadNextPage = (keyword = '', sortBy = 'id', sortType = 'desc') =>
  async (dispatch, getState) => {
    // dispatch(loading(true));
    dispatch(cancelSelection());

    const state = getState().lead;
    const total = state.get('total') || 0;
    const dataList = state.get('dataList').toJS();
    const page = state.get('page') || 1;

    if (dataList.length < total) {
      const params = {
        orderBy: sortBy,
        orderType: sortType,
        page: page + 1,
      };

      try {
        const { data } = await getJson(url(), true, params);
        const { count, entries, numOfPages, page } = data;
        const dataList = entries ? parseLeadsIn(entries) : [];

        dispatch(loadNextPageSuccess(dataList, count, numOfPages, page));
      } catch (error) {
        dispatch(notify('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'));

        setTimeout(() => {
          dispatch(notify());
          // dispatch(loading());
        }, loadingTime);

        handleError(error);
      }
    }

    dispatch(notify());
    // dispatch(loading());
  };

export const searchData = (keyword = '', sortBy = 'id', sortType = 'desc') =>
  async dispatch => {
    dispatch(loading(true));
    dispatch(cancelSelection());

    const _url = url();
    const params = {
      orderBy: sortBy,
      orderType: sortType,
    };
    console.log('url: ', _url, params);
    const promise = getJson(_url, true, params);

    setTimeout(() =>
      promise
        .then(({ data }) => {
          const { count, entries, numOfPages, page } = data;
          const dataList = entries ? parseLeadsIn(entries) : [];

          // console.log('searchData: ', entries);

          dispatch(searchSuccess(dataList, count, numOfPages, page));
          dispatch(loading());
        })
        .catch(error => handleError(error))
      , loadingTime);
  };

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

    default:
      return state;
  }
};

export default lead;
