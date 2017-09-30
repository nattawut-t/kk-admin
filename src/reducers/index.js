import { combineReducers } from 'redux';

import lead from './lead';
import authen from './authen';
import test from './test';
import admin from './admin';
import draft from './draft';

const rootReducer = combineReducers({
  lead,
  authen,
  test,
  admin,
  draft,
});

export default rootReducer;
