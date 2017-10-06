import moment from 'moment';

import {
  portalUrl,
  getJson,
  putJson,
  postJson,
} from '../libs/request';

import agreement from '../libs/agreement';
import personalInfo from '../libs/personalInfo';
import loanInfo from '../libs/loanInfo';
import additionalInfo from '../libs/additionalInfo';

import { loadingTime, dateFormat } from '../libs/config';
import { handleError } from '../handlers/api';
import { notify, loading } from './notification';
import { parseLeadIn as parseIn, split } from '../libs/lead';

export const GET_SUCCESS = 'draft/GET_SUCCESS';
export const getSuccess = data => ({
  type: GET_SUCCESS,
  data,
});

export const SAVE_FAILED = 'draft/SAVE_FAILED';
export const getFailed = () => ({
  type: SAVE_FAILED,
  // data,
});

export const SAVE_SUCCESS = 'draft/SAVE_SUCCESS';
export const saveSuccess = data => ({
  type: SAVE_SUCCESS,
  data,
});

export const EDIT_SUCCESS = 'draft/EDIT_SUCCESS';
export const editSuccess = (id, data) => ({
  type: EDIT_SUCCESS,
  id,
  data,
});

export const SUBMIT_SUCCESS = 'draft/SUBMIT_SUCCESS';
export const submitSuccess = () => ({
  type: SUBMIT_SUCCESS,
});

const url = (postfix = '') => portalUrl(`/admin/leads${postfix}`);
const parse = (raw = {}) =>
  Object.assign(
    agreement.data(raw),
    personalInfo.data(raw),
    loanInfo.data(raw),
    additionalInfo.data(raw),
  );

const initialState = {
  id: '',
  editing: false,
  data: parse(),
};

export const get = callback =>
  async dispatch => {
    dispatch(getSuccess({}));

    if (callback) {
      callback();
    }
  };

export const save = (_data, callback) =>
  async dispatch => {
    dispatch(saveSuccess(_data));

    if (callback) {
      callback();
    }
  };

export const submit = callback =>
  async (dispatch, getState) => {
    dispatch(loading(true));

    const _state = getState().draft;
    const id = _state.id;
    const editing = _state.editing;
    const data = _state.data;

    console.log('editing: ', editing);
    console.log('data: ', data);

    const _dateReq = moment(data.dateReq, dateFormat).toDate();
    data.dateReq = moment(_dateReq).format();
    data.birthDate = moment(data.birthDate).format();
    data.dateExp = moment(data.dateExp).format();
    data.employmentDate = moment(data.employmentDate).format();

    console.log('save.date: ', data.dateReq, data.birthDate, data.dateExp, data.employmentDate);

    const _url = editing ? url(`/${id}`) : url();
    const request = editing ? putJson : postJson;

    request(_url, data)
      .then(() => {
        dispatch(notify('บันทึกข้อมูลเสร็จสมบูรณ์'));
        dispatch(submitSuccess());

        setTimeout(() => {
          if (callback) {
            callback();
          }

          dispatch(notify());
          dispatch(loading());
        }, loadingTime);
      })
      .catch(error => {
        dispatch(notify('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'));

        setTimeout(() => {
          dispatch(notify());
          dispatch(loading());
        }, loadingTime);

        handleError(error);
      });
  };

export const edit = (id, callback) =>
  async dispatch => {
    dispatch(loading(true));

    const _url = url(`/${id}`);

    try {
      const { data } = await getJson(_url);

      console.log('edit.data: ', data);

      setTimeout(() => {
        const lead = parseIn(data);
        const {
          personalInfo,
          loanInfo,
          additionalInfo,
        } = split(lead);

        dispatch(editSuccess(
          id,
          Object.assign(
            { isConsent: true },
            personalInfo,
            loanInfo,
            additionalInfo,
          ),
        ));

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
  };

const draft = (state = initialState, action) => {
  let _state;
  // let _data;
  // let mobile;

  switch (action.type) {
    // case GET_SUCCESS:

    //   mobile = localStorage.getItem('username') || '';
    //   _data = Object.assign(action.data, { workTel2: mobile });
    //   _state = Object.assign(
    //     state,
    //     {
    //       data: _data,
    //     },
    //   );

    //   return _state;

    case EDIT_SUCCESS:

      _state = {
        id: action.id,
        data: action.data,
        editing: true,
      };
      console.log('EDIT_SUCCESS', _state);
      return _state;

    case SAVE_SUCCESS:

      _state = Object.assign(
        state,
        {
          data: Object.assign(state.data, action.data),
        },
      );
      console.log(SAVE_SUCCESS, _state);
      return _state;

    case SUBMIT_SUCCESS:
      return {
        id: '',
        editing: false,
        data: parse(),
      };

    default:
      return state;
  }
};

export default draft;
