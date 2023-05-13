import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';

import farmMeatReducer from './reducers/farmMeatReducer';
const rootReducer = combineReducers({farmMeatReducer});
export const store = createStore(rootReducer, applyMiddleware(thunk));
