export const ADD_DATA_SUCCESS = 'admin/ADD_DATA_SUCCESS';
export const SELECT_DATA_SUCCESS = 'admin/SELECT_DATA_SUCCESS';
export const APPROVE_SUCCESS = 'admin/APPROVE_SUCCESS';
export const SEARCH_SUCCESS = 'admin/SEARCH_SUCCESS';
export const CANCEL_SELECTION = 'admin/CANCEL_SELECTION';
export const LOAD_NEXT_PAGE_SUCCESS = 'admin/LOAD_NEXT_PAGE_SUCCESS';
export const SET_LOADING = 'admin/SET_LOADING';
export const SET_SORT_INFO = 'admin/SET_SORT_INFO';
export const SET_SEARCH_INFO = 'admin/SET_SEARCH_INFO';

export const addDataSuccess = (id, name) => ({
  type: ADD_DATA_SUCCESS,
  id,
  name,
});

export const selectDataSuccess = (
  id,
  accountNo,
  accountName,
  idcardNo,
  partnerName,
  bankCode,
  bankName,
  branchName,
) => ({
  type: SELECT_DATA_SUCCESS,
  id,
  accountNo,
  accountName,
  idcardNo,
  partnerName,
  bankCode,
  bankName,
  branchName,
});

export const approveSuccess = (id, notiMessage, notiType) => ({
  type: APPROVE_SUCCESS,
  id,
  notiMessage,
  notiType,
});

export const searchSuccess = (dataList, total, pages, page) => ({
  type: SEARCH_SUCCESS,
  dataList,
  total,
  pages,
  page,
});

export const loadNextPageSuccess = (dataList, total, pages, page) => ({
  type: LOAD_NEXT_PAGE_SUCCESS,
  dataList,
  total,
  pages,
  page,
});

export const cancelSelection = () => ({
  type: CANCEL_SELECTION,
});

export const setLoading = loading => ({
  type: SET_LOADING,
  loading,
});

export const setSortInfo = (field = '', desc = false) => ({
  type: SET_SORT_INFO,
  field,
  desc,
});

export const setSearchInfo = (keyword = '') => ({
  type: SET_SEARCH_INFO,
  keyword,
});
