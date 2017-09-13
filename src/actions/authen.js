export const LOGIN_SUCCESS = 'authen/LOGIN_SUCCESS';
export const NOTIFY = 'authen/NOTIFY';

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS,
});

export const notify = message => ({
  type: NOTIFY,
  message,
});
