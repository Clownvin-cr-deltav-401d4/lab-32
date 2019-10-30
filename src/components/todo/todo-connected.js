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

// const getTodoItems = () => {
//   const _updateState = data => this.setState({ todoList: data.results });
//   this.callAPI( todoAPI, 'GET', undefined, _updateState );
// };

function reducer(state, action) {
  let item;
  switch (action.type) {
    case 'input': //change: {[name]: value}});
      state.item = {...state.item, ...action.change};
      break;
    case 'add': //, item });
      if (!action.followUp) {
        callAPI( todoAPI, 'POST', state.item, item => action.dispatch({ ...action, item, followUp: true }) );
      } else {
        state.todoList.push(action.item);
      }
      break;
    case 'delete': //, id });
      if (!action.followUp) {
        callAPI( `${todoAPI}/${action.id}`, 'DELETE', null, () => action.dispatch({...action, followUp: true}) );
      } else {
        state.todoList = state.todoList.filter(item => item._id !== action.id);
      }
      break;
    case 'save': //, item });
      if (!action.followUp) {
        callAPI( `${todoAPI}/${action.item._id}`, 'PUT', action.item, action.dispatch({...action, followUp: true}) );
      } else {
        state.todoList = state.todoList.map(item =>
          item._id === action.item._id ? action.item : item
        );
      }
      break;
    case 'toggleComplete': //, id });
      if (!action.followUp) {
        const item = state.todoList.find(item => item.id === action.id);
        callAPI( `${todoAPI}/${action.id}`, 'PUT', {...item, completed: !item.completed}, action.dispatch({...action, followUp: true}) );
      } else {
        state.todoList = state.todoList.map(item =>
          item._id === action.id ? {
            ...item,
            complete: !item.complete,
          } : item
        );
      }
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
    <ToDo reducer={reducer} />
  );
}

export default ToDoConnected;
