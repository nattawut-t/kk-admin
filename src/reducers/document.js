import {
  portalUrl,
  postForm,
  getJson,
} from '../libs/request';
import { notify, loading } from './notification';
import { handleError } from '../handlers/api';
import { loadingTime } from '../libs/config';

export const UPLOAD_DOCUMENT_SUCCESS = 'document/UPLOAD_DOCUMENT_SUCCESS';
export const uploadDocumentSuccess = (field, path, name, docType) => ({
  type: UPLOAD_DOCUMENT_SUCCESS,
  field,
  path,
  name,
  docType,
});

export const LOAD_DOCUMENTS_SUCCESS = 'document/DOWNLOAD_DOCUMENTS_SUCCESS';
export const loadDocumentsSuccess = documents => ({
  type: LOAD_DOCUMENTS_SUCCESS,
  documents,
});

// export const GET_URL_SUCCESS = 'GET_URL_SUCCESS';
// export const getUrlSuccess = (key, url) => ({
//   type: GET_URL_SUCCESS,
//   key,
//   url,
// });

const initialState = {
  documents: [],
};

const url = (postfix = '') => portalUrl(`/admin/leads/doc${postfix}`);

export const uploadDocument = (field, path, name, data, docType, callback) =>
  async dispatch => {
    dispatch(loading(true));
    const _url = url();

    try {
      const { data: { id, filename } } = await postForm(_url, data, false);
      dispatch(uploadDocumentSuccess(field, path, filename, docType));

      if (callback) {
        callback({
          id,
          filename,
          docType,
          path,
        });
      }

      // dispatch(notify('อัพโหลดเอกสารแล้ว'));
      setTimeout(() => {
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

export function loadDocuments(id, callback) {
  return dispatch => {
    dispatch(loading(true));

    const url = portalUrl(`/admin/leads/${id}/media`);

    getJson(url)
      .then(response => {
        const { data } = response;

        console.log('documents: ', data);

        dispatch(loadDocumentsSuccess(data));
        if (callback) {
          callback();
        }
        setTimeout(() => dispatch(loading(false)), loadingTime);
      })
      .catch(error => {
        console.log('>>> edit.error: ', error);
        dispatch(loading());
      });
  };
}

export function downloadDocument(id, callback) {
  return dispatch => {
    dispatch(loading(true));

    const url = portalUrl(`/admin/media/${id}`);
    console.log('url: ', url);

    getJson(url)
      .then(response => {
        const { data } = response;

        console.log('document: ', data);

        // const contentType = headers['x-content-type'];
        // const mediaSrc = window.URL.createObjectURL(new Blob([data], { type: contentType }));

        // dispatch(loadDocumentSuccess(data));
        if (callback) {
          callback({});
        }
        // setTimeout(() => dispatch(loading(false)), loadingTime);
        dispatch(loading());
      })
      .catch(error => {
        console.log('>>> edit.error: ', error);
        dispatch(loading());
      });
  };
}

export const getUrl = (id, callback) =>
  async dispatch => {
    dispatch(loading(true));
    const _url = portalUrl(`/admin/media/${id}/url`);

    try {
      const { data: { url } } = await getJson(_url);

      // dispatch(notify('โหลดไฟล์เอกสาร'));
      setTimeout(() => {
        dispatch(notify());
        dispatch(loading());

        if (callback) {
          callback(url);
        }
      }, loadingTime);
    } catch (error) {
      // console.log('uploadDocument.error: ', error);

      dispatch(notify('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'));

      setTimeout(() => {
        dispatch(notify());
        dispatch(loading());
      }, loadingTime);

      handleError(error);
    }
  };

export const deleteDocument = (id, callback) =>
  async dispatch => {
    dispatch(loading(true));
    const _url = portalUrl(`/admin/media/${id}/url`);

    try {
      const { data: { url } } = await getJson(_url);

      // dispatch(notify('โหลดไฟล์เอกสาร'));
      setTimeout(() => {
        dispatch(notify());
        dispatch(loading());

        if (callback) {
          callback(url);
        }
      }, loadingTime);
    } catch (error) {
      // console.log('uploadDocument.error: ', error);

      dispatch(notify('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'));

      setTimeout(() => {
        dispatch(notify());
        dispatch(loading());
      }, loadingTime);

      handleError(error);
    }
  };

const document = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_DOCUMENTS_SUCCESS:
      return { documents: action.documents };

    default:
      return state;
  }
};

export default document;
