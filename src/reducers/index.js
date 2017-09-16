import { combineReducers } from 'redux';

import lead from './lead';
import authen from './authen';
import test from './test';
import admin from './admin';

const rootReducer = combineReducers({
  lead,
  authen,
  test,
  admin,
});

export default rootReducer;
