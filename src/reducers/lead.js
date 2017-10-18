import Immutable, { Record } from 'immutable';

import { updatePagination, handlePageChange } from './pagination';
import { portalUrl, getJson } from '../libs/request';
import { loadingTime } from '../libs/config';

import { notify, loading } from './notification';
import { parseLeadIn as parseIn } from '../libs/lead';
import { parseLeadsIn } from '../libs/leads';
import { handleError } from '../handlers/api';

import agreement from '../libs/agreement';
import personalInfo from '../libs/personalInfo';
import loanInfo from '../libs/loanInfo';
import additionalInfo from '../libs/additionalInfo';

const SEARCH_SUCCESS = 'lead/SEARCH_SUCCESS';
export const searchSuccess = dataList => ({
  type: SEARCH_SUCCESS,
  dataList,
});

const LOAD_NEXT_PAGE_SUCCESS = 'lead/LOAD_NEXT_PAGE_SUCCESS';
export const loadNextPageSuccess = dataList => ({
  type: LOAD_NEXT_PAGE_SUCCESS,
  dataList,
});

const SELECT_DATA_SUCCESS = 'lead/SELECT_DATA_SUCCESS';
export const selectDataSuccess = (id, data) => ({
  type: SELECT_DATA_SUCCESS,
  id,
  data,
});

const CANCEL_SELECTION = 'lead/CANCEL_SELECTION';
export const cancelSelection = () => ({
  type: CANCEL_SELECTION,
});

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
  //
  dataList: [],
  params: {},
  //
  documents: [],
  //
  editing: false,
});

const initialState = new State();

const url = (postfix = '') => portalUrl(`/admin/leads${postfix}`);

export const loadNextPage = () =>
  async (dispatch, getState) => {
    // dispatch(loading(true));
    dispatch(cancelSelection());

    const { total, page } = getState().pagination;
    const dataList = getState().lead.get('dataList').toJS();

    if (dataList.length < total) {
      dispatch(handlePageChange(page + 1));
      const params = { ...getState().search };

      try {
        const { data } = await getJson(url(), true, params);
        const { count, entries, numOfPages, page } = data;
        const dataList = entries ? parseLeadsIn(entries) : [];

        dispatch(updatePagination(count, numOfPages, page));
        dispatch(loadNextPageSuccess(dataList));
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

export const searchData = () =>
  async (dispatch, getState) => {
    dispatch(loading(true));
    dispatch(cancelSelection());

    const _url = url();
    const params = { ...getState().search };

    delete params.page;

    try {
      const { data } = await getJson(_url, true, params);
      const { count, entries, numOfPages, page } = data;
      const dataList = entries ? parseLeadsIn(entries) : [];

      setTimeout(() => {
        dispatch(updatePagination(count, numOfPages, page));
        dispatch(searchSuccess(dataList));
        dispatch(loading());
      }, 1000);
    } catch (error) {
      dispatch(notify('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'));

      setTimeout(() => {
        dispatch(notify());
        dispatch(loading());
      }, loadingTime);

      handleError(error);
    }
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

    case SEARCH_SUCCESS:

      _state = Immutable.fromJS({
        dataList: [
          ...action.dataList,
        ],
      });
      return state.merge(_state);

    case LOAD_NEXT_PAGE_SUCCESS:

      _state = Immutable.fromJS({
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
