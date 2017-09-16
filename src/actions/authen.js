export const LOGIN_OTP_SUCCESS = 'authen/LOGIN_OTP_SUCCESS';
export const LOGIN_SUCCESS = 'authen/LOGIN_SUCCESS';
export const CLEAR_STATE = 'authen/CLEAR_STATE';
export const NOTIFY = 'authen/NOTIFY';

export const notify = message => ({
  type: NOTIFY,
  message,
});

export const loginOtpSuccess = mobile => ({
  type: LOGIN_OTP_SUCCESS,
  mobile,
  isAdmin: false,
});

export const loginSuccess = username => ({
  type: LOGIN_SUCCESS,
  username,
  isAdmin: true,
});

export const clearState = () => ({
  type: CLEAR_STATE,
});
