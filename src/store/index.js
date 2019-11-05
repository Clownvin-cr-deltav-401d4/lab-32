import { createStore, combineReducers } from 'redux';

import listReducer from './todo-list';
import detailsReducer from './details';

const reducer = combineReducers({
  listReducer,
  detailsReducer,
});

export default () => createStore(reducer);
