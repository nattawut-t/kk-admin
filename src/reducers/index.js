import { combineReducers } from 'redux';

import lead from './lead';
import authen from './authen';
import test from './test';

const rootReducer = combineReducers({
  lead,
  authen,
  test,
});

export default rootReducer;
