import { combineReducers } from 'redux';
import { reducer } from './actions';

const rootReducers = combineReducers({
  newReducer: reducer
});

export default rootReducers;