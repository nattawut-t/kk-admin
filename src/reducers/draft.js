import {
  portalUrl,
  putJson,
} from '../libs/request';

import agreement from '../libs/agreement';
import personalInfo from '../libs/personalInfo';
import loanInfo from '../libs/loanInfo';
import additionalInfo from '../libs/additionalInfo';

import { isAdmin } from '../libs/config';
import { handleError } from '../handlers/api';

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

export const SAVE_PERSONAL_INFO_SUCCESS = 'draft/SAVE_PERSONAL_INFO_SUCCESS';
export const savePersonalInfoSuccess = data => ({
  type: SAVE_PERSONAL_INFO_SUCCESS,
  data,
});

const url = (postfix = '') => portalUrl(`/api/work/leads${postfix}`);
const parse = (raw = {}) =>
  Object.assign(
    agreement.data(raw),
    personalInfo.data(raw),
    loanInfo.data(raw),
    additionalInfo.data(raw),
  );

const initialState = {
  data: parse(),
};

export const get = callback =>
  dispatch => {
    if (!isAdmin()) {
      putJson(url(), {})
        .then(response => {
          const { data: { data } } = response;
          const _draft = JSON.parse(data);

          dispatch(getSuccess(parse(_draft)));

          if (callback) {
            callback();
          }
        })
        .catch(error => handleError(error));
    }
  };


export const save = (_data, callback) =>
  async (dispatch, getState) => {
    try {
      const draft = getState().draft.data;
      const _draft = Object.assign(draft, _data);
      const { data: { data } } = await putJson(url(), _draft);

      dispatch(savePersonalInfoSuccess(data));

      if (callback) {
        callback();
      }
    } catch (error) {
      console.log('error: ', error);
      handleError(error);
    }
  };


const draft = (state = initialState, action) => {
  let _state;
  let _data;
  let mobile;

  switch (action.type) {
    case GET_SUCCESS:

      mobile = localStorage.getItem('username') || '';
      _data = Object.assign(action.data, { workTel2: mobile });
      _state = Object.assign(
        state,
        {
          data: _data,
        },
      );

      return _state;

    default:
      return state;
  }
};

export default draft;
