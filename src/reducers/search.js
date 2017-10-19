

import moment from 'moment';

const HANDLE_CHANGE = 'HANDLE_CHANGE';
export const handleChange = (name, value) => ({
  type: HANDLE_CHANGE,
  name,
  value,
});

export const handleDateChange = (name, value) => ({
  type: HANDLE_CHANGE,
  name,
  value: value ? moment(value).format('YYYY-MM-DD') : null,
});

const initialState = {
  orderBy: 'id',
  orderType: 'desc',
  firstName: '',
  idcard: '',
  page: 1,
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_CHANGE:
      console.log(HANDLE_CHANGE, action);
      return Object.assign(state, { [action.name]: action.value });

    default:
      return state;
  }
};

export default search;
