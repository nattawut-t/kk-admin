export const ACCEPT_AGREEMENT_SUCCESS = 'lead/ACCEPT_AGREEMENT_SUCCESS';
export const SET_LOADING = 'lead/SET_LOADING';

export const acceptAgreementSuccess = isConsent => ({
  type: ACCEPT_AGREEMENT_SUCCESS,
  isConsent,
});

export const setLoading = loading => ({
  type: SET_LOADING,
  loading,
});
