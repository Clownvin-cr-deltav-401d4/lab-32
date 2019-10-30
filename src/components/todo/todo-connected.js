import React from 'react';

import ToDo from './todo';

import './todo.scss';

const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

const callAPI = (url, method='get', body, handler, errorHandler) => {

  return fetch(url, {
    method: method,
    mode: 'cors',
    cache: 'no-cache',
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  })
    .then(response => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then(data => typeof handler === 'function' ? handler(data) : null )
    .catch( (e) => typeof errorHandler === 'function' ? errorHandler(e) : console.error(e)  );
};

function reducerFollowUp(state, action) {
  switch (action.type) {
    case 'add': //, item });
      state.todoList.push(action.item);
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
    default:
      console.error('Uncaught action.type:', action.type);
  }
  return {...state};
}

function reducer(state, action) {
  if (action.followUp) {
    return reducerFollowUp(state, action);
  }
  let item;
  switch (action.type) {
    case 'setTodo':
      state.todoList = action.todoList;
      break;
    case 'input': //change: {[name]: value}});
      state.item = {...state.item, ...action.change};
      break;
    case 'add': //, item });
      callAPI( todoAPI, 'POST', state.item, item => action.dispatch({ ...action, item, followUp: true }) );
      break;
    case 'delete': //, id });
      callAPI( `${todoAPI}/${action.id}`, 'DELETE', null, () => action.dispatch({...action, followUp: true}) );
      break;
    case 'save': //, item });
      callAPI( `${todoAPI}/${action.item._id}`, 'PUT', action.item, action.dispatch({...action, followUp: true}) );
      break;
    case 'toggleComplete': //, id });
      item = state.todoList.find(item => item._id === action.id);
      if (!item) {
        break;
      }
      callAPI( `${todoAPI}/${action.id}`, 'PUT', {...item, completed: !item.completed}, action.dispatch({...action, followUp: true}) );
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

function ToDoConnected() {
  return (
    <ToDo reducer={reducer} getTodoList={(dispatch) => {
      callAPI( todoAPI, 'GET', null, data => dispatch({type: 'setTodo', todoList: data.results}) );
    }}/>
  );
}

export default ToDoConnected;
