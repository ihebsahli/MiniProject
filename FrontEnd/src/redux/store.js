// import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
// import { alert } from "./reducer/alert";
// import reservation from "./reducer/reservation";

// const reducer = combineReducers({
//   alert,reservation
// })
// const initialState ={}
// const middleware={thunk}
 
// const store= createStore(
//     reducer,
//     initialState,
//     composeWithDevTools(applyMiddleware(...Object.values   ( middleware)))

// )
// export default store;

import thunk from "redux-thunk" 
import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from './rootReducers';


const middleware = [thunk];
const devtools = window.REDUX_DEVTOOLS_EXTENSION
  ? window.REDUX_DEVTOOLS_EXTENSION()
  : (f) => f;

const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middleware), devtools)
);


export default store;