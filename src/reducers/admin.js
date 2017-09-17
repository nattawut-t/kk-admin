import Immutable, { Record } from 'immutable';
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
} from '../actions/admin';
import { portalUrl, postJson, getJson } from '../libs/request';

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
  //
  dataList: [],
  total: 0,
  pages: 0,
  page: 0,
  //
  keyword: '',
  sortField: '',
  sortDesc: false,
  loading: false,
});
const initialState = new State();
const endpoint = '/admin/leads';

const transformIn = entries => {
  if (entries) {
    return entries
      .map(({
        ID,
        CreatedAt,
        UpdatedAt,
        DeletedAt,
        UserID,
        Email,
        IDCard,
        MobileNo,
        BirthDate,
        TicketID,
        Status,
        ReferenceID,
        Data,
      }) => {
        let entry = JSON.parse(Data) || {};
        const { prefixTH, firstNameTH, lastNameTH } = entry;
        const nameTH = `${prefixTH || ''} ${firstNameTH || ''} ${lastNameTH || ''}`.trim();

        // Object.defineProperty(entry, 'nameTH', nameTH);
        entry = Object.assign({
          ID,
          CreatedAt,
          UpdatedAt,
          DeletedAt,
          UserID,
          Email,
          IDCard,
          MobileNo,
          BirthDate,
          TicketID,
          Status,
          ReferenceID,
        },
          entry,
          { nameTH },
        );

        console.log('>>> data: ', entry);

        return entry;
      });
  }
  return {};
};

function _searchData(offset = 1) {
  return dispatch => {
    console.log('>>>>> _searchData');
    dispatch(setLoading(true));
    dispatch(cancelSelection());

    // const state = getState().admin;
    // const keyword = state.get('keyword');
    // const sortField = state.get('sortField');
    // const sortDesc = state.get('sortDesc');
    // const sortDirection = sortDesc ? 'desc' : 'asc';

    const _endpoint = `${endpoint}?page=${offset}`;

    // if (keyword) {
    //   path += `&search=${keyword}`;
    // }

    // if (sortField) {
    //   path += `&sortBy=${sortField}&orderBy=${sortDirection}`;
    // }

    const url = portalUrl(_endpoint);
    const promise = getJson(url);

    console.log('>>> url: ', url);

    setTimeout(() =>
      promise.then(response => {
        const { data } = response;
        const {
          count,
          entries,
          numOfPages,
          page,
        } = data;

        console.log('>>> response: ', entries);

        const dataList = transformIn(entries);

        dispatch(searchSuccess(dataList, count, numOfPages, page));
        return dispatch(setLoading(false));
      })
        .catch(error => {
          console.log('>>> error: ', error);
          dispatch(setLoading(false));
        })
      , loadingTime);
  };
}

function _loadNextPage(offset = limit) {
  return (dispatch, getState) => {
    dispatch(setLoading(true));
    dispatch(cancelSelection());

    const state = getState().admin;
    const total = state.get('total') || 0;

    if (offset < total) {
      const keyword = state.get('keyword');
      const sortField = state.get('sortField');
      const sortDesc = state.get('sortDesc');
      const sortDirection = sortDesc ? 'desc' : 'asc';

      let path = `${endpoint}?page=${offset}&pageSize=${limit}`;
      if (keyword) {
        path += `&search=${keyword}`;
      }
      if (sortField) {
        path += `&sortBy=${sortField}&orderBy=${sortDirection}`;
      }
      const url = portalUrl(path);
      const promise = getJson(url);

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

export function approve(id) {
  return dispatch => {
    dispatch(setLoading(true));

    const path = `${endpoint}/${id}/approve`;
    const url = portalUrl(path);
    const options = {
      method: 'post',
      data: {
        id,
        status: 'verified',
      },
    };
    const promise = postJson(url, options);

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
  };
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
    const state = getState().admin;
    const dataList = state.get('dataList');
    const offset = (dataList) ? dataList.count() : 0;
    return dispatch(_loadNextPage(offset));
  };
}

export function selectData(rowIndex) {
  return (dispatch, getState) => {
    const state = getState().admin;
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

const admin = (state = initialState, action) => {
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

export default admin;
