import { createStore, combineReducers } from 'redux';

import listReducer from './todo-list';
import detailsReducer from './details';
import formReducer from './form';

const reducer = combineReducers({
  listReducer,
  detailsReducer,
  formReducer,
});

export default () => createStore(reducer);
