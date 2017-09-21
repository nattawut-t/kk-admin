import Immutable, { Record } from 'immutable';
import moment from 'moment';
import {
  approveSuccess,
  rejectSuccess,
  searchSuccess,
  loadNextPageSuccess,
  setLoading,
  selectDataSuccess,
  cancelSelection,
  setSortInfo,
  setSearchInfo,
  SELECT_DATA_SUCCESS,
  APPROVE_SUCCESS,
  REJECT_SUCCESS,
  SEARCH_SUCCESS,
  CANCEL_SELECTION,
  LOAD_NEXT_PAGE_SUCCESS,
  SET_LOADING,
  SET_SORT_INFO,
  SET_SEARCH_INFO,
} from '../actions/admin';
import {
  portalUrl,
  postJson,
  putJson,
  getJson,
} from '../libs/request';
import {
  pageSize,
  loadingTime,
  dateFormat,
} from '../libs/config';
import { parseLeadIn } from '../libs/lead';
import { parseLeadsIn } from '../libs/leads';

const State = Record({
  id: '',
  message: '',
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

// const parseLeadIn = ({
//   ID,
//   CreatedAt,
//   UpdatedAt,
//   DeletedAt,
//   UserID,
//   Email,
//   IDCard,
//   MobileNo,
//   BirthDate,
//   TicketID,
//   Status,
//   ReferenceID,
//   Data,
// }) => {
//   let entry = JSON.parse(Data) || {};
//   const { prefixTH, firstNameTH, lastNameTH } = entry;
//   const nameTH = `${prefixTH || ''} ${firstNameTH || ''} ${lastNameTH || ''}`.trim();

//   entry = Object.assign({
//     ID,
//     CreatedAt,
//     UpdatedAt,
//     DeletedAt,
//     UserID,
//     Email,
//     IDCard,
//     MobileNo,
//     BirthDate,
//     TicketID,
//     Status,
//     ReferenceID,
//   },
//     entry,
//     { nameTH },
//   );

//   return entry;
// };

// const parseLeadsIn = entries =>
//   entries ? entries.map(entry => parseLeadIn(entry)) : {};

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

        console.log('>>> entries: ', entries);
        const dataList = entries ? parseLeadsIn(entries) : [];

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

          console.log('>>> entries: ', entries);
          const dataList = entries ? parseLeadsIn(entries) : [];

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
        const message = 'อนุมัติคำขอกู้แล้ว';
        dispatch(approveSuccess(id, message));
        return dispatch(setLoading(false));
      })
        .catch(error => {
          console.log('>>> error: ', error);
          dispatch(setLoading(false));
        })
      , loadingTime);
  };
}

export function reject(id, remark, callback) {
  return dispatch => {
    dispatch(setLoading(true));

    const path = `${endpoint}/${id}/rejected`;
    const url = portalUrl(path);
    const options = {
      method: 'put',
      data: { remark },
    };
    const promise = putJson(url, options);

    setTimeout(() =>
      promise.then(() => {
        const message = 'ปฏิเสธคำขอกู้แล้ว';
        dispatch(rejectSuccess(id, message));
        dispatch(setLoading(false));
        if (callback) {
          callback();
        }
      })
        .catch(error => {
          console.log('>>> error: ', error);
          dispatch(setLoading(false));
        })
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
  console.log('>>> admin');
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

        if (newId !== oldId) {
          const _endpoint = `${endpoint}/${newId}`;
          const url = portalUrl(_endpoint);
          const promise = getJson(url);

          setTimeout(() =>
            promise.then(response => {
              const { data } = response;

              const {
                ID,
                Status,
                //
                dateReq,
                prefixTH,
                firstNameTH,
                lastNameTH,
                prefixEN,
                firstNameEN,
                lastNameEN,
                idCard,
                dateExp,
                birthDate,
                status,
                //
                jobCompanyName,
                department,
                position,
                employmentDate,
                jobSalary,
                workTel,
                telExtension,
                officeNumber,
                officeMoo,
                officeVillage,
                officeSoi,
                officeRoad,
                officeProvinceName,
                officeAmphurCodeName,
                officeTambolCodeName,
                officeZipCode,
              } = parseLeadIn(data);
              const entry = {
                id: ID,
                status: Status,
                //
                dateReq: dateReq ? moment(dateReq).format(dateFormat) : '',
                nameTH: `${prefixTH || ''} ${firstNameTH || ''} ${lastNameTH || ''}`.trim(),
                nameEN: `${prefixEN || ''} ${firstNameEN || ''} ${lastNameEN || ''}`.trim(),
                idcardNo: idCard,
                idcardExpiry: dateExp ? moment(dateExp).format(dateFormat) : '',
                birthDate: birthDate ? moment(birthDate).format(dateFormat) : '',
                maritalStatus: status,
                //
                companyName: jobCompanyName,
                department,
                position,
                employmentDate: employmentDate ? moment(employmentDate).format(dateFormat) : '',
                salary: jobSalary,
                officeTel: workTel,
                officeTelExt: telExtension,
                officeNumber,
                officeMoo,
                officeVillage,
                officeSoi,
                officeRoad,
                officeProvinceName,
                officeAmphurCodeName,
                officeTambolCodeName,
                officeZipCode,
              };

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
        message: action.message,
        dataList: _dataList,
      });
      return state.merge(_state);

    case REJECT_SUCCESS:

      _dataList = state.dataList.filter(data =>
        Number.parseInt(data.get('id'), 10) !== Number.parseInt(action.id, 10),
      );
      _state = Immutable.fromJS({
        id: '',
        message: action.message,
        dataList: _dataList,
      });
      console.log('>>> REJECT_SUCCESS');
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

    case CANCEL_SELECTION:
      _state = Immutable.fromJS({
        id: '',
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
