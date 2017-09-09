export const ACCEPT_AGREEMENT_SUCCESS = 'lead/ACCEPT_AGREEMENT_SUCCESS';
export const COMPLETE_PERSONAL_INFO_SUCCESS = 'lead/COMPLETE_PERSONAL_INFO_SUCCESS';
export const COMPLETE_LOAN_INFO_SUCCESS = 'lead/COMPLETE_LOAN_INFO_SUCCESS';
export const SET_LOADING = 'lead/SET_LOADING';

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
