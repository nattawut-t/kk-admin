export const ACCEPT_AGREEMENT_SUCCESS = 'lead/ACCEPT_AGREEMENT_SUCCESS';
export const COMPLETE_PERSONAL_INFO_SUCCESS = 'lead/COMPLETE_PERSONAL_INFO_SUCCESS';
export const COMPLETE_LOAN_INFO_SUCCESS = 'lead/COMPLETE_LOAN_INFO_SUCCESS';
export const COMPLETE_ADDITIONAL_INFO_SUCCESS = 'lead/COMPLETE_ADDITIONAL_INFO_SUCCESS';
export const UPLOAD_DOCUMENT_SUCCESS = 'lead/UPLOAD_DOCUMENT_SUCCESS';
export const NOTIFY = 'lead/NOTIFY';
export const SET_LOADING = 'lead/SET_LOADING';
//
export const LOAD_NEXT_PAGE_SUCCESS = 'lead/LOAD_NEXT_PAGE_SUCCESS';
export const SET_SEARCH_INFO = 'lead/SET_SEARCH_INFO';
export const CANCEL_SELECTION = 'lead/CANCEL_SELECTION';
export const SEARCH_SUCCESS = 'lead/SEARCH_SUCCESS';
export const SAVE_DRAFT_SUCCESS = 'lead/SAVE_DRAFT_SUCCESS';
export const EDIT_SUCCESS = 'lead/EDIT_SUCCESS';
export const SAVE_SUCCESS = 'lead/SAVE_SUCCESS';
export const LOAD_DOCUMENTS_SUCCESS = 'lead/LOAD_DOCUMENTS_SUCCESS';

export const acceptAgreementSuccess = isConsent => ({
  type: ACCEPT_AGREEMENT_SUCCESS,
  isConsent,
});

export const setLoading = loading => ({
  type: SET_LOADING,
  loading,
});

export const completePersonalInfoSuccess = data => ({
  type: COMPLETE_PERSONAL_INFO_SUCCESS,
  data,
});

export const completeLoanInfoSuccess = data => ({
  type: COMPLETE_LOAN_INFO_SUCCESS,
  data,
});

export const completeAdditionalInfoSuccess = data => ({
  type: COMPLETE_ADDITIONAL_INFO_SUCCESS,
  data,
});

export const uploadDocumentSuccess = (field, path, name, docType) => ({
  type: UPLOAD_DOCUMENT_SUCCESS,
  field,
  path,
  name,
  docType,
});

export const notify = message => ({
  type: NOTIFY,
  // notify,
  message,
});

export const loadNextPageSuccess = (dataList, total, pages, page) => ({
  type: LOAD_NEXT_PAGE_SUCCESS,
  dataList,
  total,
  pages,
  page,
});

export const setSearchInfo = (keyword = '') => ({
  type: SET_SEARCH_INFO,
  keyword,
});

export const cancelSelection = () => ({
  type: CANCEL_SELECTION,
});

export const searchSuccess = (dataList, total, pages, page) => ({
  type: SEARCH_SUCCESS,
  dataList,
  total,
  pages,
  page,
});

export const saveDraftSuccess = data => ({
  type: SAVE_DRAFT_SUCCESS,
  data,
});

export const editSuccess = (id, personalInfo, loanInfo, additionalInfo) => ({
  type: EDIT_SUCCESS,
  id,
  personalInfo,
  loanInfo,
  additionalInfo,
});

export const saveSuccess = () => ({
  type: SAVE_SUCCESS,
});

export const loadDocumentsSuccess = documents => ({
  type: LOAD_DOCUMENTS_SUCCESS,
  documents,
});
