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

export const DOWNLOAD_DOCUMENTS_SUCCESS = 'document/DOWNLOAD_DOCUMENTS_SUCCESS';
export const downloadDocumentsSuccess = documents => ({
  type: DOWNLOAD_DOCUMENTS_SUCCESS,
  documents,
});

const initialState = {
  files: [],
};

const url = (postfix = '') => portalUrl(`/api/work/leads/doc${postfix}`);

export const uploadDocument = (field, path, name, data, docType, callback) =>
  async dispatch => {
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

      dispatch(notify('อัพโหลดเอกสารแล้ว'));
      setTimeout(() => dispatch(notify('')), loadingTime);
    } catch (error) {
      console.log('uploadDocument.error: ', error);

      dispatch(notify('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'));
      setTimeout(() => dispatch(notify('')), loadingTime);
      handleError(error);
    }
  };

export function downloadDocuments(id, callback) {
  return dispatch => {
    dispatch(loading(true));

    const url = portalUrl(`/admin/leads/${id}/media`);

    getJson(url)
      .then(response => {
        const { data } = response;

        console.log('documents: ', data);

        dispatch(downloadDocumentsSuccess(data));
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

// /api/work/media/<mediaID>/url

const document = (state = initialState, action) => {
  switch (action.type) {
    // case NOTIFY:
    //   return { message: action.message };

    default:
      return state;
  }
};

export default document;
