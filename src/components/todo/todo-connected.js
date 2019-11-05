import React, {useReducer, useEffect} from 'react';
import { When } from '../if';
import Modal from '../modal';

import ConnectedHeader from '../header/connected';
import Form from '../form/form';
import TodoList from '../todo-list/todo-list';
import TodoDetails from '../todo-details/todo-details';

import './todo.scss';

import { Auth } from '../../context/authorization';

import useLogin from '../../hooks/useLogin';

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
    case 'add': //, item });
      callAPI( todoAPI, 'POST', action.item, item => action.dispatch({ ...action, item, followUp: true }) );
      break;
    case 'delete': //, id });
      callAPI( `${todoAPI}/${action.id}`, 'DELETE', null, () => action.dispatch({...action, followUp: true}) );
      break;
    case 'save': //, item });
      callAPI( `${todoAPI}/${action.item._id}`, 'PUT', action.item, () => action.dispatch({...action, followUp: true}) );
      break;
    case 'toggleComplete': //, id });
      item = state.todoList.find(item => item._id === action.id);
      if (!item) {
        break;
      }
      callAPI( `${todoAPI}/${action.id}`, 'PUT', {...item, complete: !item.complete}, () => action.dispatch({...action, followUp: true}) );
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

function ToDoConnected(props) {
  const loginContext = useLogin();
  const [state, dispatchFunc] = useReducer(reducer, {
    todoList: [],
    item: {},
    showDetails: false,
    details: {},
  });

  const dispatch = (action) => {
    dispatchFunc({...action, dispatch});
  }

  if(!state.todoList) {
    dispatch({type: 'initialize'});
  }

  const addItem = (item) => {
    dispatch({ type: 'add', item});
  };

  const deleteItem = id => {

    dispatch({ type: 'delete', id });

  };

  useEffect(() => {
    callAPI( todoAPI, 'GET', null, data => dispatch({type: 'setTodo', todoList: data.results}) );
  }, []);

  // const saveItem = item => {

  //   dispatch({ type: 'save', item });

  // };

  const toggleComplete = id => {

    dispatch({ type: 'toggleComplete', id });
  };

  const toggleDetails = id => {
    dispatch({ type: 'toggleDetails', id });
  }
  
  return (
    <>
      <ConnectedHeader count={state.todoList ? state.todoList.filter( item => !item.complete ).length : 0} />
      <When condition={loginContext.hasCapability('read')}>
        <>
          <section className="todo">
            <Auth type="create">
              <Form addItem={addItem} />
            </Auth>
            <TodoList 
              todoList={state.todoList} 
              toggleComplete={loginContext.hasCapability('update') ? toggleComplete : null}
              toggleDetails={toggleDetails}
              deleteItem={loginContext.hasCapability('delete') ? deleteItem : null}
            />
          </section>

          <When condition={state.showDetails}> 
            <Modal title="To Do Item" close={toggleDetails}>
              <TodoDetails item={state.details} />
            </Modal>
          </When> 
        </>
      </When>
    </>
  );
}

export default ToDoConnected;
