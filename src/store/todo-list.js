'use strict';

import uuid from 'uuid/v4';

export default function reducer(state = {todoList: []}, action) {
  let item;
  let defaults;
  switch (action.type) {
  case 'add': //, item });
    defaults = { _id: uuid(), complete:false };
    item = Object.assign({}, action.item, defaults);
    return {...state, todoList: [...state.todoList, item]};
  case 'delete': //, id });
    return {...state, todoList: state.todoList.filter(item => item._id !== action.id)};
  case 'save': //, item });
    return {...state, todoList: state.todoList.map(item =>
      item._id === action.item._id ? action.item : item,
    )};
  case 'toggleComplete': //, id });
    return {...state, todoList: state.todoList.map(item =>
      item._id === action.id ? {
        ...item,
        complete: !item.complete,
      } : item,
    )};
  }
  return state;
}
