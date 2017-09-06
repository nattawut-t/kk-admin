import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';

import rootReducer from './reducers';
import { saveState } from './libs/state';

export const store = createStore(
  rootReducer,
  // loadState(),
  applyMiddleware(thunk),
);

store.subscribe(throttle(() => saveState(store.getState()), 1000));
