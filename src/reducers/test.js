import Immutable, { Record } from 'immutable';
import {
  SET_STATE_SUCCESS,
  setStateSuccess,
} from '../actions/test';

const State = Record({
  data: '',
});
const initialState = new State();

export function setState(data) {
  return dispatch => dispatch(setStateSuccess(data));
}

const lead = (state = initialState, action) => {
  let _state;

  switch (action.type) {
    case SET_STATE_SUCCESS:
      _state = Immutable.fromJS({
        data: action.data,
      });

      console.log('>>> SET_STATE_SUCCESS', _state.toJS(), action);

      return state.merge(_state);

    default:
      return state;
  }
};

export default lead;
