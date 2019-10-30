import React from 'react';
import uuid from 'uuid/v4';
import ToDo from './todo';

import './todo.scss';

function reducer(state, action) {
  let item;
  switch (action.type) {
    case 'input': //change: {[name]: value}});
      state.item = {...state.item, ...action.change};
      break;
    case 'add': //, item });
      const defaults = { _id: uuid(), complete:false };
      item = Object.assign({}, state.item, defaults);
      state.todoList.push(item);
      break;
    case 'delete': //, id });
      state.todoList = state.todoList.filter(item => item._id !== action.id);
      break;
    case 'save': //, item });
      state.todoList = state.todoList.map(item =>
        item._id === action.item._id ? action.item : item
      );
      break;
    case 'toggleComplete': //, id });
      state.todoList = state.todoList.map(item =>
        item._id === action.id ? {
          ...item,
          complete: !item.complete,
        } : item
      );
      break;
    case 'toggleDetails': //, id });
        item = state.todoList.find(item => item._id === action.id);
        state.details = item || {};
        state.showDetails = !!item;
      break;
    default:
      console.error('Uncaught action.type:', action.type);
  }
  return {...state};
}

function ToDoLocal() {
  return (
    <ToDo reducer={reducer} />
  );
}

export default ToDoLocal;
