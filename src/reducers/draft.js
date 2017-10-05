import {
  portalUrl,
  getJson,
} from '../libs/request';

import agreement from '../libs/agreement';
import personalInfo from '../libs/personalInfo';
import loanInfo from '../libs/loanInfo';
import additionalInfo from '../libs/additionalInfo';

import { loadingTime } from '../libs/config';
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
      console.log('EDIT_SUCCESS');
      return _state;

    case SAVE_SUCCESS:

      _state = {
        data: Object.assign(state.data, action.data),
      };
      return _state;


    default:
      return state;
  }
};

export default draft;
