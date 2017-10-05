import {
  approveSuccess,
  rejectSuccess,
} from '../actions/admin';
import { searchData } from './lead';
import { notify, loading } from './notification';
import {
  portalUrl,
  postJson,
  putJson,
} from '../libs/request';
import { loadingTime } from '../libs/config';
import { handleError } from '../handlers/api';

const url = (postfix = '') => portalUrl(`/admin/leads${postfix}`);

export const approve = (id, callback) =>
  async dispatch => {
    dispatch(loading(true));

    const _url = url(`/${id}/approve`);
    const options = {
      method: 'post',
      data: {
        id,
        status: 'verified',
      },
    };

    try {
      await postJson(_url, options);

      dispatch(notify('อนุมัติคำขอกู้แล้ว'));
      dispatch(approveSuccess());
      dispatch(searchData());

      setTimeout(() => {
        if (callback) {
          callback();
        }

        dispatch(notify());
        dispatch(loading());
      }
        , loadingTime);
    } catch (error) {
      dispatch(notify('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'));

      setTimeout(() => {
        dispatch(notify());
        dispatch(loading());
      }, loadingTime);

      handleError(error);
    }
  };

export const reject = (id, remark, callback) =>
  async dispatch => {
    dispatch(loading(true));

    const _url = url(`/${id}/rejected`);
    const options = {
      method: 'put',
      data: { remark },
    };

    try {
      await putJson(_url, options);

      dispatch(notify('ปฏิเสธคำขอกู้แล้ว'));
      dispatch(rejectSuccess());
      dispatch(searchData());

      setTimeout(() => {
        if (callback) {
          callback();
        }

        dispatch(notify());
        dispatch(loading());
      }
        , loadingTime);
    } catch (error) {
      dispatch(notify('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'));

      setTimeout(() => {
        dispatch(notify());
        dispatch(loading());
      }, loadingTime);

      handleError(error);
    }
  };


const admin = (state = {}, action) => {
  // let _state;
  // let _dataList;

  switch (action.type) {
    // case APPROVE_SUCCESS:

    //   _dataList = state.dataList.filter(data =>
    //     Number.parseInt(data.get('id'), 10) !== Number.parseInt(action.id, 10),
    //   );
    //   _state = Immutable.fromJS({
    //     id: '',
    //     message: action.message,
    //     dataList: _dataList,
    //   });
    //   return state.merge(_state);

    // case REJECT_SUCCESS:

    //   _dataList = state.dataList.filter(data =>
    //     Number.parseInt(data.get('id'), 10) !== Number.parseInt(action.id, 10),
    //   );
    //   _state = Immutable.fromJS({
    //     id: '',
    //     message: action.message,
    //     dataList: _dataList,
    //   });
    //   console.log('>>> REJECT_SUCCESS');
    //   return state.merge(_state);

    // case CANCEL_SELECTION:
    //   _state = Immutable.fromJS({
    //     id: '',
    //     data: null,
    //   });
    //   return state.merge(_state);

    default:
      return state;
  }
};

export default admin;
