import { combineReducers } from 'redux';

import lead from './lead';
import authen from './authen';
import test from './test';
import admin from './admin';
import draft from './draft';
import notification from './notification';

const rootReducer = combineReducers({
  lead,
  authen,
  test,
  admin,
  draft,
  notification,
});

export default rootReducer;
