import Immutable, { Record } from 'immutable';
import { pageSize, loadingTime } from './config';
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
  // accountNo: '',
  // accountName: '',
  // idcardNo: '',
  // partnerName: '',
  // bankCode: '',
  // bankName: '',
  // branchName: '',
  notiMessage: '',
  // info, success, warning, error
  notiType: '',
  //
  data: null,
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

const parseLeadIn = ({
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

  return entry;
};

const parseLeadsIn = entries =>
  entries ? entries.map(entry => parseLeadIn(entry)) : {};

function _searchData(page = 1) {
  return dispatch => {
    dispatch(setLoading(true));
    dispatch(cancelSelection());

    const _endpoint = `${endpoint}?page=${page}`;
    const url = portalUrl(_endpoint);
    const promise = getJson(url);

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

        const dataList = parseLeadsIn(entries);

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

function _loadNextPage(currentPage = 1, nextPage = 2) {
  return (dispatch, getState) => {
    dispatch(setLoading(true));
    dispatch(cancelSelection());

    const state = getState().admin;
    const total = state.get('total') || 0;

    if ((currentPage * pageSize) < total) {
      const _endpoint = `${endpoint}?page=${nextPage}`;
      const url = portalUrl(_endpoint);
      const promise = getJson(url);

      setTimeout(() =>
        promise.then(response => {
          const { data } = response;
          const {
            count,
            entries,
            numOfPages,
            page,
          } = data;

          const dataList = parseLeadsIn(entries);

          dispatch(loadNextPageSuccess(dataList, count, numOfPages, page));
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
    const loading = state.get('loading');

    if (!loading) {
      const page = state.get('page') || 1;
      return dispatch(_loadNextPage(page, page + 1));
    }

    return dispatch(setLoading(false));
  };
}

export function selectData(rowIndex) {
  return (dispatch, getState) => {
    dispatch(setLoading(true));

    const state = getState().admin;
    const oldId = state.get('id');
    const dataList = state.get('dataList');

    if (dataList) {
      const data = dataList.get(rowIndex);

      if (data) {
        const newId = `${data.get('ID') || ''}`;

        console.log('>>> selectData: ', oldId, newId);

        if (newId !== oldId) {
          const _endpoint = `${endpoint}/${newId}`;
          const url = portalUrl(_endpoint);
          const promise = getJson(url);

          setTimeout(() =>
            promise.then(response => {
              const { data } = response;

              console.log('>>> selectData.response: ', data);

              const {
                ID,
                dateReq,
                prefixTH,
                firstNameTH,
                lastNameTH,
                prefixEN,
                firstNameEN,
                lastNameEN,
              } = parseLeadIn(data);
              const entry = {
                id: ID,
                dateReq,
                nameTH: `${prefixTH} ${firstNameTH} ${lastNameTH}`.trim(),
                nameEN: `${prefixEN} ${firstNameEN} ${lastNameEN}`.trim(),
              };

              console.log('>>> selectData.entry: ', entry);

              dispatch(selectDataSuccess(`${ID}`, entry));
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

const admin = (state = initialState, action) => {
  let _state;
  let _dataList;

  switch (action.type) {
    case SELECT_DATA_SUCCESS:

      _state = Immutable.fromJS({
        id: action.id,
        data: action.data,
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
      console.log('>>> SEARCH_SUCCESS: ', _state, action);
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
      console.log('>>> LOAD_NEXT_PAGE_SUCCESS: ', _state, action);
      return state.merge(_state);

    case CANCEL_SELECTION:
      _state = Immutable.fromJS({
        id: '',
        // accountNo: '',
        // accountName: '',
        // idcardNo: '',
        // partnerName: '',
        // bankCode: '',
        // bankName: '',
        // branchName: '',
        data: null,
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
