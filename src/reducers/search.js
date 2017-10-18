

const HANDLE_SEARCH_CHANGE = 'HANDLE_SEARCH_CHANGE';
export const handleSearchChange = ({ target: { name, value } }) => ({
  type: HANDLE_SEARCH_CHANGE,
  name,
  value,
});

const HANDLE_SORT_CHANGE = 'HANDLE_SORT_CHANGE';
export const handleSortChange = ({ orderBy, orderType }) => ({
  type: HANDLE_SORT_CHANGE,
  orderBy,
  orderType,
});

const HANDLE_PAGE_CHANGE = 'HANDLE_PAGE_CHANGE';
export const handlePageChange = page => ({ type: HANDLE_PAGE_CHANGE, page });

const initialState = {
  orderBy: 'id',
  orderType: 'desc',
  firstName: '',
  idcard: '',
  page: 1,
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_SEARCH_CHANGE:
      console.log(HANDLE_SEARCH_CHANGE, action);
      return Object.assign(state, { [action.name]: action.value });

    case HANDLE_SORT_CHANGE:
      console.log(HANDLE_SORT_CHANGE, action);
      return Object.assign(state, {
        orderBy: action.orderBy,
        orderType: action.orderType,
      });

    case HANDLE_PAGE_CHANGE:
      console.log(HANDLE_PAGE_CHANGE, action);
      return Object.assign(state, { page: action.page });

    default:
      return state;
  }
};

export default search;
