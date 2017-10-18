const UPDATE_PAGINATION = 'UPDATE_PAGINATION';
export const updatePagination = (total, pages, page) => ({
  type: UPDATE_PAGINATION,
  total,
  pages,
  page,
});

const HANDLE_PAGE_CHANGE = 'HANDLE_PAGE_CHANGE';
export const handlePageChange = page => ({
  type: HANDLE_PAGE_CHANGE,
  page,
});

const initialState = {
  total: 0,
  pages: 1,
  page: 1,
};

const pagination = (state = initialState, action) => {
  switch (action.type) {

    case UPDATE_PAGINATION:
      return {
        total: action.total,
        pages: action.pages,
        page: action.page,
      };

    case HANDLE_PAGE_CHANGE:
      console.log(HANDLE_PAGE_CHANGE, action);
      return Object.assign(state, { page: action.page });

    default:
      return state;
  }
};

export default pagination;
