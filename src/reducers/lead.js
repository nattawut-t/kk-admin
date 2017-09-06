import Immutable, { Record } from 'immutable';
import { adminUrl, APIRequest } from '../libs/request';
import { limit, loadingTime } from './config';
import {
  approveSuccess,
  searchSuccess,
  loadNextPageSuccess,
  setLoading,
  selectDataSuccess,
  cancelSelection,
  setSortInfo,
  setSearchInfo,
  SELECT_DATA_SUCCESS,
  APPROVE_SUCCESS,
  SEARCH_SUCCESS,
  CANCEL_SELECTION,
  LOAD_NEXT_PAGE_SUCCESS,
  SET_LOADING,
  SET_SORT_INFO,
  SET_SEARCH_INFO,
} from '../actions/lead';

const apiPath = '/api/bank_account';
const State = Record({
  id: '',
  accountNo: '',
  accountName: '',
  idcardNo: '',
  partnerName: '',
  bankCode: '',
  bankName: '',
  branchName: '',
  notiMessage: '',
  // info, success, warning, error
  notiType: '',
  total: 100,
  dataList: [],
  keyword: '',
  sortField: '',
  sortDesc: false,
  loading: false,
});
const initialState = new State();

function _searchData(offset = 1) {
  return (dispatch, getState) => {
    console.log('>>>>> _searchData');
    dispatch(setLoading(true));
    dispatch(cancelSelection());

    const state = getState().bankAccountVerification;
    const keyword = state.get('keyword');
    const sortField = state.get('sortField');
    const sortDesc = state.get('sortDesc');
    const sortDirection = sortDesc ? 'desc' : 'asc';

    let path = `${apiPath}?page=${offset}&pageSize=${limit}`;
    if (keyword) {
      path += `&search=${keyword}`;
    }
    if (sortField) {
      path += `&sortBy=${sortField}&orderBy=${sortDirection}`;
    }
    const url = adminUrl(path);
    const promise = APIRequest(url);

    setTimeout(() =>
      promise.then(response => {
        let { data } = response;
        // const { total } = data;
        data = (data || {}).data;

        dispatch(searchSuccess(data, 100));
        return dispatch(setLoading(false));
      })
        .catch(() => dispatch(setLoading(false)))
      , loadingTime);
  };
}

function _loadNextPage(offset = limit) {
  return (dispatch, getState) => {
    dispatch(setLoading(true));
    dispatch(cancelSelection());

    const state = getState().bankAccountVerification;
    const total = state.get('total') || 0;

    if (offset < total) {
      const keyword = state.get('keyword');
      const sortField = state.get('sortField');
      const sortDesc = state.get('sortDesc');
      const sortDirection = sortDesc ? 'desc' : 'asc';

      let path = `${apiPath}?page=${offset}&pageSize=${limit}`;
      if (keyword) {
        path += `&search=${keyword}`;
      }
      if (sortField) {
        path += `&sortBy=${sortField}&orderBy=${sortDirection}`;
      }
      const url = adminUrl(path);
      const promise = APIRequest(url);

      setTimeout(() =>
        promise.then(response => {
          let { data } = response;
          const { total } = response;
          data = (data || {}).data;
          dispatch(loadNextPageSuccess(data, total));
          return dispatch(setLoading(false));
        })
          .catch(() => dispatch(setLoading(false)))
        , loadingTime);
    }

    dispatch(setLoading(false));
  };
}

export function approve(dispatch, id) {
  dispatch(setLoading(true));

  const path = `${apiPath}/${id}/approve`;
  const url = adminUrl(path);
  const options = {
    method: 'post',
    data: {
      id,
      status: 'verified',
    },
  };
  const promise = APIRequest(url, options);

  setTimeout(() =>
    promise.then(() => {
      // const { status } = response;
      const notiMessage = 'Data approved successfully';
      const notiType = 'success';
      dispatch(approveSuccess(id, notiMessage, notiType));
      return dispatch(setLoading(false));
    })
      .catch(() => dispatch(setLoading(false)))
    , loadingTime);
}

export function searchData(keyword) {
  return dispatch => {
    dispatch(setSearchInfo(keyword));
    return dispatch(_searchData());
  };
}

export function sortData(field, desc) {
  return dispatch => {
    dispatch(setSortInfo(field, desc));
    return dispatch(_searchData());
  };
}

export function loadNextPage() {
  return (dispatch, getState) => {
    const state = getState().bankAccountVerification;
    const dataList = state.get('dataList');
    const offset = (dataList) ? dataList.count() : 0;
    return dispatch(_loadNextPage(offset));
  };
}

export function selectData(rowIndex) {
  return (dispatch, getState) => {
    const state = getState().bankAccountVerification;
    const oldId = state.get('id');
    const dataList = state.get('dataList');

    if (dataList) {
      const data = dataList.get(rowIndex);

      if (data) {
        const newId = `${data.get('id') || ''}`;

        if (newId !== oldId) {
          const accountNo = data.get('accountNo');
          const accountName = data.get('accountName');
          const idcardNo = data.get('idcardNo');
          const partnerName = data.get('partnerName');
          const bankCode = data.get('bankCode');
          const bankName = data.get('bankName');
          const branchName = data.get('branchName');

          dispatch(selectDataSuccess(
            newId,
            accountNo,
            accountName,
            idcardNo,
            partnerName,
            bankCode,
            bankName,
            branchName));
        } else {
          dispatch(cancelSelection());
        }
      }
    }
  };
}

const bankAccountVerification = (state = initialState, action) => {
  let _state;
  let _dataList;

  switch (action.type) {
    case SELECT_DATA_SUCCESS:

      _state = Immutable.fromJS({
        id: action.id,
        accountNo: action.accountNo,
        accountName: action.accountName,
        idcardNo: action.idcardNo,
        partnerName: action.partnerName,
        bankCode: action.bankCode,
        bankName: action.bankName,
        branchName: action.branchName,
      });
      return state.merge(_state);

    case APPROVE_SUCCESS:

      _dataList = state.dataList.filter(data =>
        Number.parseInt(data.get('id'), 10) !== Number.parseInt(action.id, 10),
      );
      _state = Immutable.fromJS({
        id: '',
        notiMessage: action.notiMessage,
        notiType: action.notiType,
        dataList: _dataList,
      });

      return state.merge(_state);
    case SEARCH_SUCCESS:

      _state = Immutable.fromJS({
        total: action.total,
        dataList: [
          ...action.dataList,
        ],
      });
      return state.merge(_state);

    case LOAD_NEXT_PAGE_SUCCESS:

      _state = Immutable.fromJS({
        total: action.total,
        dataList: [
          ...state.dataList,
          ...action.dataList,
        ],
      });

      return state.merge(_state);

    case CANCEL_SELECTION:
      _state = Immutable.fromJS({
        id: '',
        accountNo: '',
        accountName: '',
        idcardNo: '',
        partnerName: '',
        bankCode: '',
        bankName: '',
        branchName: '',
      });
      return state.merge(_state);

    case SET_LOADING:
      _state = Immutable.fromJS({
        loading: action.loading,
      });
      return state.merge(_state);

    case SET_SEARCH_INFO:
      _state = Immutable.fromJS({
        keyword: action.keyword,
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

export default bankAccountVerification;
