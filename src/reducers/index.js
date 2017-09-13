import { combineReducers } from 'redux';

import lead from './lead';
import authen from './authen';

const rootReducer = combineReducers({
  lead,
  authen,
});

export default rootReducer;
