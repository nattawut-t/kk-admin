export const NOTIFY = 'NOTIFY';
export const notify = (message = '') => ({
  type: NOTIFY,
  message,
});

export const LOADING = 'LOADING';
export const loading = (loading = false) => ({
  type: LOADING,
  loading,
});

const initialState = {
  message: '',
};

const notificatiion = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFY:
      return { message: action.message };

    default:
      return state;
  }
};

export default notificatiion;
